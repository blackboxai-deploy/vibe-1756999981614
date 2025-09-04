import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Android TV Remote Control',
  description: 'A comprehensive remote control app for Android TV with full functionality including navigation, media controls, volume control, and smart features.',
  keywords: ['Android TV', 'Remote Control', 'Smart TV', 'Media Control', 'TV Remote'],
  authors: [{ name: 'TV Remote App' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  themeColor: '#1f2937',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="TV Remote" />
        <meta name="application-name" content="TV Remote" />
        <meta name="msapplication-TileColor" content="#1f2937" />
        <meta name="theme-color" content="#1f2937" />
      </head>
      <body className={`${inter.className} antialiased bg-gray-900 text-white min-h-screen`}>
        <div className="relative min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}