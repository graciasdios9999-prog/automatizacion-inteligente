import { NextResponse } from 'next/server';
import { CHANNELS, OFFERS } from '@/lib/catalog';
import { successResponse } from '@/lib/api-response';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(
    successResponse({
      channels: CHANNELS,
      distribution: CHANNELS.map((channel) => ({
        channel,
        defaultSku: OFFERS[0].sku,
        endpoint: '/api/broadcast',
      })),
    })
  );
}
