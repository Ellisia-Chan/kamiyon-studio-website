/**
 * Optional `.env` / `.env.local` loader for the seed CLI (no dotenv dep).
 * Does not override variables already set in the process environment.
 */

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

function stripQuotes(value: string): string {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

/** Parse KEY=VALUE lines into a map (comments / blanks ignored). */
export function parseEnvFile(contents: string): Record<string, string> {
  const result: Record<string, string> = {};

  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }

    const eq = line.indexOf("=");
    if (eq <= 0) {
      continue;
    }

    const key = line.slice(0, eq).trim();
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) {
      continue;
    }

    const value = stripQuotes(line.slice(eq + 1).trim());
    result[key] = value;
  }

  return result;
}

/**
 * Load `.env` then `.env.local` from `cwd` into `process.env` when unset.
 * Returns paths that were loaded.
 */
export function loadEnvFiles(cwd: string = process.cwd()): string[] {
  const loaded: string[] = [];

  for (const name of [".env", ".env.local"] as const) {
    const filePath = resolve(cwd, name);
    if (!existsSync(filePath)) {
      continue;
    }

    const parsed = parseEnvFile(readFileSync(filePath, "utf8"));
    for (const [key, value] of Object.entries(parsed)) {
      if (process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
    loaded.push(filePath);
  }

  return loaded;
}
