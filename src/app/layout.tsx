import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Header from '@/components/ui/brown-bear-components/header';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Brown Bear Effects',
  description: 'Handcrafted guitar effects pedals'
};

/**
 * Renders the application's root HTML layout including language, font variables, header, and page content.
 *
 * @param children - The page content to render inside the layout's body.
 * @returns The top-level HTML element (html > body) containing the Header and the provided `children`.
 */

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
