import { ClerkProvider } from '@clerk/nextjs';

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
