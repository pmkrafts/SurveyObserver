import dotenv from "dotenv";

dotenv.config();

function readPort(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  if (Number.isInteger(parsed) && parsed > 0) {
    return parsed;
  }
  return fallback;
}

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: readPort(process.env.PORT, 4000),
  LOG_LEVEL: process.env.LOG_LEVEL ?? "info",
  DATABASE_URL: process.env.DATABASE_URL ?? "postgresql://api_user:api_password@localhost:5432/api_db",
  REDIS_URL: process.env.REDIS_URL ?? "redis://:redis_password@localhost:6379"
} as const;
