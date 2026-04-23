import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nathanael Santoso | Developer, Web3, AI, Community',
  description:
    'Digital namecard and portfolio for Nathanael Santoso covering product work, Web3, AI, speaking, and community leadership.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body className="bg-background text-foreground antialiased font-sans">
        <main>{children}</main>
      </body>
    </html>
  );
}
