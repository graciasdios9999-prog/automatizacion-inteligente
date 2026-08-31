import { NextResponse } from 'next/server';
import { OFFERS } from '@/lib/catalog';
import { successResponse } from '@/lib/api-response';

export const dynamic = 'force-dynamic';

export async function GET() {
  const potentialMrr = OFFERS.filter((o) => o.interval === 'month').reduce(
    (sum, o) => sum + o.priceUsd,
    0
  );
  const potentialOneTime = OFFERS.filter((o) => o.interval === 'one_time').reduce(
    (sum, o) => sum + o.priceUsd,
    0
  );
  return NextResponse.json(
    successResponse({
      offers: OFFERS.length,
      potentialMrrUsdIfOneSubEach: potentialMrr,
      catalogOneTimeUsd: potentialOneTime,
      liveStripe: Boolean(process.env.STRIPE_SECRET_KEY),
      next: 'Conectar STRIPE_SECRET_KEY para MRR real via GetBalanceTransactions',
    })
  );
}
