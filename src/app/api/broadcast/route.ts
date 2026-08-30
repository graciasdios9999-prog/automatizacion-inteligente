import { NextRequest, NextResponse } from 'next/server';
import { CHANNELS, findOffer, bestSeller } from '@/lib/catalog';
import { successResponse, errorResponse, ApiError } from '@/lib/api-response';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { sku?: string; angle?: string };
    const offer = (body.sku && findOffer(body.sku)) || bestSeller();
    const angle = body.angle || 'urgencia hormonal + resultado en 21 días';
    const packs = CHANNELS.map((channel) => ({
      channel,
      caption: channelPack(channel, offer.name, offer.priceUsd, offer.paymentLink || '', angle),
    }));
    return NextResponse.json(successResponse({ sku: offer.sku, packs }));
  } catch (error) {
    return NextResponse.json(
      errorResponse(new ApiError('BROADCAST_FAILED', 'No se pudo armar el pack', 500)),
      { status: 500 }
    );
  }
}

function channelPack(
  channel: string,
  name: string,
  price: number,
  link: string,
  angle: string
): string {
  const cta = link || 'pide el link';
  switch (channel) {
    case 'whatsapp':
      return `Hoy ${name} ($${price}). ${angle}. Link: ${cta}`;
    case 'email':
      return `Asunto: ${name} — $${price}\n\n${angle}\n\nComprar: ${cta}`;
    case 'x':
      return `${name} $${price}. ${angle} ${cta}`;
    default:
      return `${name} · $${price}\n${angle}\n${cta}`;
  }
}
