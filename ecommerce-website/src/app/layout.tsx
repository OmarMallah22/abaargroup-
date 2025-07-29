import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Premium E-commerce Store | Quality Products Online',
    template: '%s | Premium E-commerce Store',
  },
  description: 'Discover premium quality products at unbeatable prices. Fast shipping, secure checkout, and exceptional customer service.',
  keywords: ['ecommerce', 'online shopping', 'premium products', 'fast shipping', 'secure checkout'],
  authors: [{ name: 'Premium E-commerce Store' }],
  creator: 'Premium E-commerce Store',
  publisher: 'Premium E-commerce Store',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://your-domain.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    title: 'Premium E-commerce Store | Quality Products Online',
    description: 'Discover premium quality products at unbeatable prices. Fast shipping, secure checkout, and exceptional customer service.',
    siteName: 'Premium E-commerce Store',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Premium E-commerce Store',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premium E-commerce Store | Quality Products Online',
    description: 'Discover premium quality products at unbeatable prices. Fast shipping, secure checkout, and exceptional customer service.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}