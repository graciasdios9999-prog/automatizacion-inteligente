import { NextResponse } from 'next/server';
import { OFFERS, CHANNELS } from '@/lib/catalog';
import { successResponse } from '@/lib/api-response';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(
    successResponse({
      offers: OFFERS,
      channels: CHANNELS,
      count: OFFERS.length,
      hostFallback: ['render', 'fly', 'cloudflare'],
    })
  );
}
