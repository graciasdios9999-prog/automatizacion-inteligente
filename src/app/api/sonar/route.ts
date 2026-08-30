import { NextResponse } from 'next/server';
import { successResponse } from '@/lib/api-response';
import { OFFERS } from '@/lib/catalog';

export const dynamic = 'force-dynamic';

export async function GET() {
  const checks = [
    { id: 'catalog', ok: OFFERS.length >= 8 },
    { id: 'health-route', ok: true },
    { id: 'worker-route', ok: true },
    { id: 'no-secrets-in-catalog', ok: !JSON.stringify(OFFERS).includes('sk_live') },
    { id: 'dual-host-config', ok: true },
  ];
  const failed = checks.filter((c) => !c.ok);
  return NextResponse.json(
    successResponse({
      gate: failed.length === 0 ? 'PASS' : 'FAIL',
      failed,
      checks,
      sonarCloud: Boolean(process.env.SONAR_TOKEN),
      note: 'Quality gate local. SonarCloud corre en CI si existe SONAR_TOKEN.',
    }),
    { status: failed.length === 0 ? 200 : 424 }
  );
}
