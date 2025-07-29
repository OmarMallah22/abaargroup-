import { Metadata } from 'next';
import { HeroSection } from '@/components/home/hero-section';
import { FeaturedProducts } from '@/components/home/featured-products';
import { CategoryGrid } from '@/components/home/category-grid';
import { TestimonialsSection } from '@/components/home/testimonials-section';
import { NewsletterSection } from '@/components/home/newsletter-section';
import { generateStructuredData } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Premium E-commerce Store | Quality Products Online',
  description: 'Discover premium quality products at unbeatable prices. Fast shipping, secure checkout, and exceptional customer service.',
  openGraph: {
    title: 'Premium E-commerce Store | Quality Products Online',
    description: 'Discover premium quality products at unbeatable prices. Fast shipping, secure checkout, and exceptional customer service.',
    url: 'https://your-domain.com',
    siteName: 'Premium E-commerce Store',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Premium E-commerce Store',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premium E-commerce Store | Quality Products Online',
    description: 'Discover premium quality products at unbeatable prices. Fast shipping, secure checkout, and exceptional customer service.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://your-domain.com',
  },
};

export default function HomePage() {
  const structuredData = generateStructuredData({
    type: 'WebSite',
    name: 'Premium E-commerce Store',
    url: 'https://your-domain.com',
    description: 'Discover premium quality products at unbeatable prices. Fast shipping, secure checkout, and exceptional customer service.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://your-domain.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen">
        <HeroSection />
        <FeaturedProducts />
        <CategoryGrid />
        <TestimonialsSection />
        <NewsletterSection />
      </div>
    </>
  );
}