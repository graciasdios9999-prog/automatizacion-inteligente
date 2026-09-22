import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/providers';

export const metadata: Metadata = {
  title: { default: 'Midlife Reset Lab | Cansancio hormonal y reset después de los 40', template: '%s | Midlife Reset Lab' },
  description: 'Protocolo Express 7 días $27 para mujeres 40-60 con cansancio hormonal. Guía Reset Hormonal 21 días $47 y catálogo Stripe completo.',
  keywords: ['cansancio hormonal','midlife reset','reset hormonal','menopausia','perimenopausia','energía después de los 40','mujeres 40-60'],
  authors: [{ name: 'Michel Gonzalez', url: 'https://www.youtube.com/@michelgonzalez-q4o' }],
  openGraph: { title: 'Midlife Reset Lab | Cansancio hormonal', description: 'Express 7 días $27 para mujeres 40-60.', locale: 'es_ES', type: 'website', siteName: 'Midlife Reset Lab' },
  twitter: { card: 'summary_large_image', title: 'Midlife Reset Lab', description: 'Express $27 + catálogo Stripe completo.' },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://hotpink-quail-769272.hostingersite.com' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="es"><body className="antialiased bg-[#fffaf7] text-stone-900"><Providers>{children}</Providers></body></html>;
}
