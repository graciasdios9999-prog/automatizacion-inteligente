import { NextResponse } from "next/server";
import { getPool } from "@/lib/db/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const started = Date.now();
  let database: "ok" | "skipped" | "failing" = "skipped";

  const pool = getPool();
  if (pool) {
    try {
      await pool.query("SELECT 1");
      database = "ok";
    } catch {
      database = "failing";
    }
  }

  const healthy = database !== "failing";
  const body = {
    success: healthy,
    data: {
      status: healthy ? "healthy" : "degraded",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      checks: {
        app: "ok",
        database,
        grok: process.env.GROK_API_KEY ? "configured" : "missing",
      },
      responseTimeMs: Date.now() - started,
    },
  };

  return NextResponse.json(body, { status: healthy ? 200 : 503 });
}
