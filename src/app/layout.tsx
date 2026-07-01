import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { esES } from '@clerk/localizations';
import './globals.css';

export const metadata: Metadata = {
  title: 'MiroAgente - Automatización Inteligente de Redes Sociales',
  description: 'Agente de IA para generar contenido financiero y capturar leads automáticamente',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={esES}>
      <html lang="es">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body className="antialiased bg-white dark:bg-slate-950">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
