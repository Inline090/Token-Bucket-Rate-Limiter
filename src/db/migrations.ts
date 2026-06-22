import { pool } from "./connection";

export async function runMigrations(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS clients (
      client_key VARCHAR(255) PRIMARY KEY,
      rate_limit INT NOT NULL DEFAULT 10,
      burst_size INT NOT NULL DEFAULT 20,
      window_ms INT NOT NULL DEFAULT 60000,
      mode VARCHAR(20) NOT NULL DEFAULT 'token_bucket'
        CHECK (mode IN ('token_bucket', 'sliding_window')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS token_buckets (
      client_key VARCHAR(255) PRIMARY KEY REFERENCES clients(client_key) ON DELETE CASCADE,
      tokens DOUBLE PRECISION NOT NULL,
      last_refill_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS request_logs (
      id BIGSERIAL PRIMARY KEY,
      client_key VARCHAR(255) NOT NULL REFERENCES clients(client_key) ON DELETE CASCADE,
      timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      allowed BOOLEAN NOT NULL
    );
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_request_logs_client_key
      ON request_logs (client_key, timestamp DESC);
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_request_logs_timestamp
      ON request_logs (timestamp DESC);
  `);
}
