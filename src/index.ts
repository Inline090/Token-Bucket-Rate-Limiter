import express from "express";
import { pool } from "./db/connection";
import { runMigrations } from "./db/migrations";
import { config } from "./config";

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

async function main() {
  try {
    await runMigrations();
    console.log("Migrations applied successfully");

    const server = app.listen(config.port, () => {
      console.log(`Rate limiter service running on port ${config.port}`);
    });

    const shutdown = async (signal: string) => {
      console.log(`\nReceived ${signal}, shutting down gracefully...`);
      server.close();
      await pool.end();
      process.exit(0);
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

main();
