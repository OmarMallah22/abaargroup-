import { Metadata } from 'next';
import { ProductsGrid } from '@/components/products/products-grid';
import { ProductFilters } from '@/components/products/product-filters';
import { generateStructuredData } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'All Products | Premium E-commerce Store',
  description: 'Browse our complete collection of premium products. Find exactly what you\'re looking for with our advanced filtering options.',
  openGraph: {
    title: 'All Products | Premium E-commerce Store',
    description: 'Browse our complete collection of premium products. Find exactly what you\'re looking for with our advanced filtering options.',
  },
};

export default function ProductsPage() {
  const structuredData = generateStructuredData({
    type: 'WebSite',
    name: 'Premium E-commerce Store - Products',
    url: 'https://your-domain.com/products',
    description: 'Browse our complete collection of premium products.',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
          <p className="text-muted-foreground mt-2">
            Discover our complete collection of premium products
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <ProductFilters />
          </aside>
          <main className="lg:col-span-3">
            <ProductsGrid />
          </main>
        </div>
      </div>
    </>
  );
}