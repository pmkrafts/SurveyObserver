import dotenv from "dotenv";
import path from "path";

let isLoaded = false;

export function loadEnv(): void {
  if (isLoaded) {
    return;
  }

  const cwd = process.cwd();
  const candidates = [
    path.resolve(cwd, ".env"),
    path.resolve(cwd, "../../.env"),
    path.resolve(__dirname, "../../.env"),
    path.resolve(__dirname, "../../../.env"),
    path.resolve(__dirname, "../../../../.env")
  ];

  for (const envPath of candidates) {
    const result = dotenv.config({ path: envPath, override: false });
    if (!result.error) {
      isLoaded = true;
      return;
    }
  }

  // Fallback to dotenv default behavior if no candidate path resolves.
  dotenv.config();
  isLoaded = true;
}