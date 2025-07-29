export interface StructuredDataProps {
  type: 'WebSite' | 'Product' | 'Organization' | 'BreadcrumbList';
  name?: string;
  url?: string;
  description?: string;
  image?: string;
  price?: number;
  currency?: string;
  availability?: string;
  brand?: string;
  sku?: string;
  rating?: {
    value: number;
    count: number;
  };
  potentialAction?: any;
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
}

export function generateStructuredData(props: StructuredDataProps) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': props.type,
  };

  switch (props.type) {
    case 'WebSite':
      return {
        ...baseData,
        name: props.name,
        url: props.url,
        description: props.description,
        potentialAction: props.potentialAction,
      };

    case 'Product':
      return {
        ...baseData,
        name: props.name,
        description: props.description,
        image: props.image,
        sku: props.sku,
        brand: {
          '@type': 'Brand',
          name: props.brand,
        },
        offers: {
          '@type': 'Offer',
          price: props.price,
          priceCurrency: props.currency || 'USD',
          availability: props.availability || 'https://schema.org/InStock',
          url: props.url,
        },
        aggregateRating: props.rating && {
          '@type': 'AggregateRating',
          ratingValue: props.rating.value,
          reviewCount: props.rating.count,
        },
      };

    case 'Organization':
      return {
        ...baseData,
        name: props.name,
        url: props.url,
        description: props.description,
        logo: props.image,
      };

    case 'BreadcrumbList':
      return {
        ...baseData,
        itemListElement: props.breadcrumbs?.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: crumb.url,
        })),
      };

    default:
      return baseData;
  }
}

export function generateMetaTags({
  title,
  description,
  image,
  url,
  type = 'website',
}: {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
}) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type,
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export function generateCanonicalUrl(path: string, baseUrl: string = 'https://your-domain.com') {
  return `${baseUrl}${path}`;
}

export function generateBreadcrumbs(segments: Array<{ name: string; href: string }>) {
  return segments.map((segment, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: segment.name,
    item: segment.href,
  }));
}