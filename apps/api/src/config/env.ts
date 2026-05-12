import { loadEnv } from "@/config/loadEnv";

loadEnv();

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
  LOG_LEVEL: process.env.LOG_LEVEL ?? "info"
} as const;
