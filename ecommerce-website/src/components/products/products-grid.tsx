'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProductCard } from './product-card';
import { ProductCardSkeleton } from './product-card-skeleton';
import { fetchProducts } from '@/lib/api';
import { Grid, List, SlidersHorizontal } from 'lucide-react';

export function ProductsGrid() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', sortBy],
    queryFn: () => fetchProducts({ sortBy }),
  });

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Failed to load products</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {products?.length || 0} products
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input w-auto"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest First</option>
          </select>

          {/* View Mode */}
          <div className="flex border rounded-md">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${
                viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${
                viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className={viewMode === 'grid' ? 'grid-responsive' : 'space-y-4'}>
        {isLoading
          ? Array.from({ length: 12 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>

      {/* Load More */}
      {products && products.length > 0 && (
        <div className="text-center pt-8">
          <button className="btn-outline">
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
}