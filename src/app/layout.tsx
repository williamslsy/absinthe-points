import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import PointsDistributionProvider from '@/context/PointsDistributionContext';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Absinthe Points UI',
  description: 'a simple utility that allows projects input their api key and insert the points for an address manually',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PointsDistributionProvider>{children}</PointsDistributionProvider>
        <Toaster />
      </body>
    </html>
  );
}
