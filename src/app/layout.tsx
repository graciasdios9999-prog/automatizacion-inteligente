import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/providers';

export const metadata: Metadata = {
  title: {
    default: 'Midlife Reset Lab | Guía, Membresía y Bundle',
    template: '%s | Midlife Reset Lab',
  },
  description:
    'Recupera energía, sueño y claridad después de los 40. Guía Reset Hormonal 21 días ($47), membresía ($27/mes) y bundle ($147). Pago seguro con Stripe. YouTube @michelgonzalez-q4o.',
  keywords: [
    'midlife reset',
    'reset hormonal',
    'menopausia',
    'perimenopausia',
    'energía después de los 40',
    'bienestar midlife',
    'Michel Gonzalez',
  ],
  authors: [{ name: 'Michel Gonzalez', url: 'https://www.youtube.com/@michelgonzalez-q4o' }],
  openGraph: {
    title: 'Midlife Reset Lab',
    description:
      'Sistema práctico de bienestar midlife: guía $47, membresía $27/mes, bundle $147.',
    locale: 'es_ES',
    type: 'website',
    siteName: 'Midlife Reset Lab',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Midlife Reset Lab',
    description: 'Guía, membresía y bundle para tu reset midlife. Stripe + Amazon #ad.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://hotpink-quail-769272.hostingersite.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased bg-[#faf7f5] text-stone-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
