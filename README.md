# Token Bucket Rate Limiter Service

A standalone API that rate-limits other APIs — not a feature, a product.

## Features

- Token bucket and sliding window rate limiting algorithms
- Per-client configurable limits (rate, burst, window size)
- Persistent state via PostgreSQL (survives restarts)
- Race-condition safe — no double-spending of tokens
- Standard rate-limit headers (`X-RateLimit-Limit`, `Remaining`, `Reset`)

## Tech Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Express
- **Database:** PostgreSQL

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment config and adjust if needed:
   ```bash
   cp .env.example .env
   ```

3. Ensure PostgreSQL is running and accessible. Default connection:
   ```
   postgresql://postgres:postgres@localhost:5432/ratelimit
   ```

4. Start the dev server:
   ```bash
   npm run dev
   ```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Health check |
| `POST` | `/api/check` | Check if a request is allowed |
| `PUT` | `/api/admin/config/:clientKey` | Set rate limit config for a client |
| `GET` | `/api/admin/config` | List all client configs |
| `GET` | `/api/admin/stats` | Get allow/deny stats per client |

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Server port |
| `DATABASE_URL` | `postgresql://postgres:postgres@localhost:5432/ratelimit` | PostgreSQL connection string |
| `DEFAULT_RATE_LIMIT` | `10` | Default requests per second |
| `DEFAULT_BURST_SIZE` | `20` | Default burst capacity |
| `DEFAULT_WINDOW_MS` | `60000` | Default window size in ms |
