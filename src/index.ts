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

    app.listen(config.port, () => {
      console.log(`Rate limiter service running on port ${config.port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

main();
