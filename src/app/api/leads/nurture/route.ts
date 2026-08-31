import { NextRequest, NextResponse } from 'next/server';
import { bestSeller } from '@/lib/catalog';
import { successResponse, errorResponse, ApiError } from '@/lib/api-response';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { name?: string; temperature?: string };
    const offer = bestSeller();
    const name = body.name || 'amiga';
    const temp = body.temperature || 'cold';
    const seq =
      temp === 'hot'
        ? [
            `Hola ${name}, tu cupo de ${offer.name} sigue abierto: ${offer.paymentLink}`,
            `Si pagas hoy arrancas el protocolo esta noche.`,
          ]
        : [
            `Hola ${name}, te guardé ${offer.name} ($${offer.priceUsd}).`,
            `Mañana te mando el checklist. Si quieres ahora: ${offer.paymentLink}`,
          ];
    return NextResponse.json(successResponse({ temperature: temp, sequence: seq, sku: offer.sku }));
  } catch {
    return NextResponse.json(
      errorResponse(new ApiError('NURTURE_FAILED', 'Secuencia no generada', 500)),
      { status: 500 }
    );
  }
}
