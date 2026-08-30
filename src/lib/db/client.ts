import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

let pool: Pool | null = null;

export function getPool(): Pool | null {
  if (!process.env.DATABASE_URL) return null;
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 5,
    });
  }
  return pool;
}

export function getDb() {
  const p = getPool();
  if (!p) return null;
  return drizzle(p);
}

export const db = new Proxy(
  {},
  {
    get(_target, prop) {
      const real = getDb();
      if (!real) {
        throw new Error("DATABASE_URL is not set");
      }
      return (real as unknown as Record<string | symbol, unknown>)[prop];
    },
  }
);
