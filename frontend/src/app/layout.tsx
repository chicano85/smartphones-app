import { ClientProviders } from '@/components/Providers/ClientProviders';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Phone Catalog',
  description: 'A catalog of mobile phones',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
