import { NextRequest, NextResponse } from 'next/server';
import { findOffer, bestSeller } from '@/lib/catalog';
import { successResponse, errorResponse, ApiError } from '@/lib/api-response';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => ({}))) as { sku?: string };
    const source = (body.sku && findOffer(body.sku)) || bestSeller();
    const clone = {
      sku: `${source.sku}-clone`,
      name: `${source.name} (réplica)`,
      stripeProductId: source.stripeProductId,
      priceUsd: source.priceUsd,
      interval: source.interval,
      paymentLink: source.paymentLink,
      stream: source.stream,
      replicateOf: source.sku,
    };
    return NextResponse.json(successResponse({ source, clone }), { status: 201 });
  } catch {
    return NextResponse.json(
      errorResponse(new ApiError('REPLICATE_FAILED', 'No se pudo clonar', 500)),
      { status: 500 }
    );
  }
}
