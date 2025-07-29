const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Mock data for development
const mockProducts = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    slug: 'premium-wireless-headphones',
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
    price: 299.99,
    originalPrice: 399.99,
    discount: 25,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    ],
    category: 'Electronics',
    categorySlug: 'electronics',
    brand: 'AudioTech',
    sku: 'AT-WH-001',
    stock: 50,
    rating: 4.8,
    reviewCount: 124,
    isNew: true,
    isFeatured: true,
    tags: ['wireless', 'noise-cancelling', 'premium'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    slug: 'smart-fitness-watch',
    description: 'Advanced fitness tracking with heart rate monitoring and GPS.',
    price: 199.99,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    ],
    category: 'Electronics',
    categorySlug: 'electronics',
    brand: 'FitTech',
    sku: 'FT-SW-002',
    stock: 30,
    rating: 4.6,
    reviewCount: 89,
    isFeatured: true,
    tags: ['fitness', 'smartwatch', 'health'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  // Add more mock products...
];

export async function fetchProducts(params?: any) {
  try {
    // In production, this would be a real API call
    // const response = await fetch(`${API_BASE_URL}/products`, {
    //   method: 'GET',
    //   headers: { 'Content-Type': 'application/json' },
    // });
    // return response.json();
    
    // For now, return mock data
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    return mockProducts;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
}

export async function fetchFeaturedProducts() {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockProducts.filter(product => product.isFeatured);
  } catch (error) {
    console.error('Failed to fetch featured products:', error);
    throw error;
  }
}

export async function fetchProduct(slug: string) {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockProducts.find(product => product.slug === slug);
  } catch (error) {
    console.error('Failed to fetch product:', error);
    throw error;
  }
}

export async function searchProducts(query: string) {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
  } catch (error) {
    console.error('Failed to search products:', error);
    throw error;
  }
}

export async function fetchCategories() {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      {
        id: '1',
        name: 'Electronics',
        slug: 'electronics',
        description: 'Latest electronic devices and gadgets',
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        productCount: 150,
      },
      {
        id: '2',
        name: 'Clothing',
        slug: 'clothing',
        description: 'Fashion and apparel for all occasions',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        productCount: 200,
      },
      // Add more categories...
    ];
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    throw error;
  }
}