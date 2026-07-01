import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Taskify Pro - Professional To-Do List',
  description: 'Advanced to-do list application with local storage, categories, and analytics',
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
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0284c7" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
