import { NextRequest, NextResponse } from "next/server";
import { generateContentSchema } from "@/lib/validation";
import { successResponse, errorResponse, ApiError } from "@/lib/api-response";
import { logger } from "@/lib/logger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const parsed = generateContentSchema.safeParse(json);
    if (!parsed.success) {
      throw new ApiError(
        "INVALID_INPUT",
        parsed.error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join("; "),
        400
      );
    }

    const input = parsed.data;
    const apiKey = process.env.GROK_API_KEY;

    if (!apiKey) {
      const fallback = {
        platform: input.platform,
        category: input.category,
        topic: input.topic,
        title: `${input.topic} — ${input.platform}`,
        content: `Borrador listo para ${input.platform} sobre "${input.topic}". Conecta GROK_API_KEY en Vercel para generar con IA.`,
        hooks: [
          `Esto cambia cómo ves ${input.topic}`,
          `Nadie te dice esto sobre ${input.topic}`,
          `3 pasos para ${input.topic}`,
        ],
        cta: "Guarda este post y comenta QUIERO.",
        hashtags: input.includeHashtags
          ? ["#finanzas", "#libertadfinanciera", "#zeus"]
          : [],
        mode: "fallback-no-grok-key",
      };
      logger.warn("content.generate fallback", { module: "content" });
      return NextResponse.json(successResponse(fallback));
    }

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.NEXT_PUBLIC_GROK_MODEL || "grok-2",
        temperature: 0.8,
        messages: [
          {
            role: "system",
            content:
              "Eres un copywriter de finanzas personales. Responde SOLO JSON válido con keys title, content, hooks, cta, hashtags.",
          },
          {
            role: "user",
            content: JSON.stringify(input),
          },
        ],
      }),
    });

    if (!res.ok) {
      throw new ApiError("GROK_ERROR", `Grok HTTP ${res.status}`, 502);
    }

    const payload = await res.json();
    const text = payload?.choices?.[0]?.message?.content || "";
    let generated: Record<string, unknown>;
    try {
      const match = String(text).match(/\{[\s\S]*\}/);
      generated = match ? JSON.parse(match[0]) : { content: text };
    } catch {
      generated = { content: text };
    }

    return NextResponse.json(
      successResponse({
        ...generated,
        platform: input.platform,
        category: input.category,
        topic: input.topic,
        mode: "grok",
      })
    );
  } catch (error) {
    logger.error("content.generate failed", error, { module: "content" });
    if (error instanceof ApiError) {
      return NextResponse.json(errorResponse(error), { status: error.statusCode });
    }
    return NextResponse.json(
      errorResponse(new ApiError("INTERNAL_ERROR", "No se pudo generar contenido", 500)),
      { status: 500 }
    );
  }
}
