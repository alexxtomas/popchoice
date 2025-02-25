import type { Metadata } from 'next';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: 'PopChoice',
  description:
    'PopChoice is a platform that allows a group of people to make choices about which movie to watch.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en">
      <body>{children}</body>
      <Analytics />
    </html>
  );
}
