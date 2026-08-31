import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/providers';

export const metadata: Metadata = {
  title: 'MiroAgente - Automatización Inteligente',
  description: 'Agente de IA para contenido, leads y checkout Stripe',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased bg-white dark:bg-slate-950">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
