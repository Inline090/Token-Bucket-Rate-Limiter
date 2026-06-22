export const config = {
  port: parseInt(process.env.PORT || "3000", 10),
  databaseUrl:
    process.env.DATABASE_URL ||
    "postgresql://postgres:postgres@localhost:5432/ratelimit",
  defaultRateLimit: parseInt(process.env.DEFAULT_RATE_LIMIT || "10", 10),
  defaultBurstSize: parseInt(process.env.DEFAULT_BURST_SIZE || "20", 10),
  defaultWindowMs: parseInt(process.env.DEFAULT_WINDOW_MS || "60000", 10),
};
