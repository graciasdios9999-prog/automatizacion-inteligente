import { NextResponse } from 'next/server';
import { bestSeller } from '@/lib/catalog';
import { successResponse } from '@/lib/api-response';
import { recordTick } from '@/lib/runtime-store';

export const dynamic = 'force-dynamic';

export async function POST() {
  const winner = bestSeller();
  const isoWeek = weekStamp();
  const draft = {
    sku: `${winner.sku}-wk${isoWeek}`,
    name: `${winner.name} — Edición semanal ${isoWeek}`,
    priceUsd: Math.max(17, Math.round(winner.priceUsd * 0.7)),
    interval: 'one_time' as const,
    stream: winner.stream,
    replicateOf: winner.sku,
    why: 'Replica el bestseller con ángulo semanal y precio de entrada para capturar no-compradores.',
    channels: ['instagram', 'whatsapp', 'email', 'tiktok'],
    createdAt: new Date().toISOString(),
    stripeAction: process.env.STRIPE_SECRET_KEY
      ? 'ready_to_create_via_secret_env'
      : 'draft_only_until_STRIPE_SECRET_KEY',
  };
  recordTick(`weekly-product:${draft.sku}`);
  return NextResponse.json(successResponse(draft), { status: 201 });
}

function weekStamp(): string {
  const now = new Date();
  const oneJan = new Date(now.getFullYear(), 0, 1);
  const week = Math.ceil(((now.getTime() - oneJan.getTime()) / 86400000 + oneJan.getDay() + 1) / 7);
  return `${now.getFullYear()}${String(week).padStart(2, '0')}`;
}
