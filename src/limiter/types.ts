export type LimiterMode = "token_bucket" | "sliding_window";

export interface ClientConfig {
  clientKey: string;
  rateLimit: number;
  burstSize: number;
  windowMs: number;
  mode: LimiterMode;
  createdAt: Date;
  updatedAt: Date;
}

export interface TokenBucketState {
  clientKey: string;
  tokens: number;
  lastRefillAt: Date;
}

export interface RateLimitHeaders {
  limit: number;
  remaining: number;
  reset: number;
}

export interface CheckResult {
  allowed: boolean;
  headers: RateLimitHeaders;
}
