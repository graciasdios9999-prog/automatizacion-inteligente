import { NextResponse } from "next/server";
import { getRuntimeSnapshot } from "@/lib/runtime-store";
import { getPool } from "@/lib/db/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      service: "mirolagente",
      branch: "chore/production-hardening",
      databaseConfigured: Boolean(process.env.DATABASE_URL),
      grokConfigured: Boolean(process.env.GROK_API_KEY),
      clerkConfigured: Boolean(process.env.CLERK_SECRET_KEY),
      poolReady: Boolean(getPool()),
      runtime: getRuntimeSnapshot(),
      endpoints: [
        "GET /api/health",
        "GET /api/status",
        "GET /api/worker/tick",
        "POST /api/content/generate",
        "GET|POST /api/leads",
      ],
    },
  });
}
