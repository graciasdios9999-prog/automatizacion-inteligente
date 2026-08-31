import { NextRequest, NextResponse } from "next/server";
import { recordTick, getRuntimeSnapshot } from "@/lib/runtime-store";
import { getPool } from "@/lib/db/client";
import { logger } from "@/lib/logger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function GET(request: NextRequest) {
  const started = Date.now();
  const actions: string[] = [];

  const heartbeat = recordTick("cron-tick");
  actions.push("heartbeat");

  const pool = getPool();
  if (pool) {
    try {
      await pool.query("SELECT 1");
      actions.push("db-ping");
    } catch (error) {
      logger.warn("worker.tick db ping failed", { module: "worker" });
      actions.push("db-ping-failed");
    }
  } else {
    actions.push("db-skipped");
  }

  logger.info("worker.tick", {
    module: "worker",
    duration: Date.now() - started,
    requestId: request.headers.get("x-request-id") || undefined,
  });

  return NextResponse.json({
    success: true,
    data: {
      status: "running",
      mode: pool ? "db" : "memory",
      heartbeat,
      actions,
      runtime: getRuntimeSnapshot(),
      responseTimeMs: Date.now() - started,
    },
  });
}

export async function POST(request: NextRequest) {
  return GET(request);
}
