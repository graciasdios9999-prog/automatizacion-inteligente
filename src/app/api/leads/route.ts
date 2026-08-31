import { NextRequest, NextResponse } from "next/server";
import { createLeadSchema } from "@/lib/validation";
import { successResponse, errorResponse, ApiError } from "@/lib/api-response";
import { logger } from "@/lib/logger";
import { getPool } from "@/lib/db/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const memoryLeads: Array<Record<string, unknown>> = [];

export async function GET() {
  const pool = getPool();
  if (pool) {
    try {
      const result = await pool.query(
        "SELECT id, email, platform, temperature, created_at FROM leads ORDER BY created_at DESC LIMIT 100"
      );
      return NextResponse.json(successResponse({ leads: result.rows, source: "db" }));
    } catch (error) {
      logger.warn("leads.list db failed, using memory", { module: "leads" });
    }
  }
  return NextResponse.json(successResponse({ leads: memoryLeads, source: "memory" }));
}

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const parsed = createLeadSchema.safeParse(json);
    if (!parsed.success) {
      throw new ApiError(
        "INVALID_INPUT",
        parsed.error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join("; "),
        400
      );
    }

    const lead = {
      ...parsed.data,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };

    const pool = getPool();
    if (pool) {
      try {
        const result = await pool.query(
          `INSERT INTO leads (user_id, platform, platform_user_id, username, email, temperature, notes)
           VALUES ($1,$2,$3,$4,$5,$6,$7)
           RETURNING id`,
          [
            "system",
            lead.platform,
            lead.email,
            lead.name,
            lead.email,
            lead.temperature,
            lead.source || null,
          ]
        );
        return NextResponse.json(
          successResponse({ ...lead, id: result.rows[0]?.id, source: "db" }),
          { status: 201 }
        );
      } catch (error) {
        logger.warn("leads.create db failed, using memory", { module: "leads" });
      }
    }

    memoryLeads.unshift(lead);
    return NextResponse.json(successResponse({ ...lead, source: "memory" }), { status: 201 });
  } catch (error) {
    logger.error("leads.create failed", error, { module: "leads" });
    if (error instanceof ApiError) {
      return NextResponse.json(errorResponse(error), { status: error.statusCode });
    }
    return NextResponse.json(
      errorResponse(new ApiError("INTERNAL_ERROR", "No se pudo crear el lead", 500)),
      { status: 500 }
    );
  }
}
