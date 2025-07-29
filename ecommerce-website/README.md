# Full-Stack E-commerce Website

A comprehensive e-commerce solution built with Next.js 13+, Node.js, Express, and MongoDB, featuring advanced SEO optimization and modern web development best practices.

## 🚀 Features

### Frontend (Next.js)
- **Server-Side Rendering (SSR)** for optimal SEO performance
- **App Router** with TypeScript for type safety
- **Responsive Design** with Tailwind CSS
- **Advanced Product Catalog** with filtering and search
- **Shopping Cart** with persistent state
- **Dynamic Meta Tags** and structured data
- **Image Optimization** with Next.js Image component
- **Performance Optimized** with Core Web Vitals in mind

### Backend (Node.js/Express)
- **RESTful API** with comprehensive endpoints
- **MongoDB** with Mongoose ODM
- **Input Validation** with express-validator
- **Security Middleware** (Helmet, CORS, Rate Limiting)
- **Error Handling** and logging
- **Image Processing** with Sharp
- **Caching** and compression

### SEO Optimization
- **Dynamic Metadata** per page
- **Structured Data** (JSON-LD) implementation
- **Canonical URLs** and meta tags
- **Dynamic Sitemap** generation
- **Robots.txt** configuration
- **Open Graph** and Twitter Card support

## 📁 Project Structure

```
ecommerce-website/
├── src/
│   ├── app/                    # Next.js App Router pages
│   ├── components/             # Reusable React components
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility functions and configurations
│   └── types/                  # TypeScript type definitions
├── backend/
│   ├── models/                 # MongoDB schemas
│   ├── routes/                 # API route handlers
│   ├── middleware/             # Custom middleware
│   └── utils/                  # Backend utilities
└── public/                     # Static assets
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 16+ 
- MongoDB 4.4+
- npm or yarn

### Frontend Setup
```bash
cd ecommerce-website
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Configure your environment variables
npm run dev
```

### Environment Variables

Create `.env` files in both frontend and backend directories:

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Backend (.env):**
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-jwt-secret
FRONTEND_URL=http://localhost:3000
```

## 🏗️ Architecture

### Frontend Architecture
- **Next.js 13+ App Router** for file-based routing
- **React Query** for server state management
- **Zustand** for client state management
- **Tailwind CSS** for styling
- **TypeScript** for type safety

### Backend Architecture
- **Express.js** REST API
- **MongoDB** with Mongoose ODM
- **JWT** authentication
- **Multer** for file uploads
- **Sharp** for image processing

### Database Schema

#### Products
```javascript
{
  name: String,
  slug: String,
  description: String,
  price: Number,
  images: [String],
  category: ObjectId,
  stock: Number,
  rating: Number,
  // ... more fields
}
```

#### Categories
```javascript
{
  name: String,
  slug: String,
  description: String,
  parentId: ObjectId,
  // ... more fields
}
```

## 🔍 SEO Implementation

### Meta Tags
- Dynamic title and description per page
- Open Graph tags for social sharing
- Twitter Card support
- Canonical URLs

### Structured Data
- Product schema markup
- Organization schema
- Breadcrumb navigation
- Website search action

### Performance
- Image optimization with Next.js Image
- Code splitting and lazy loading
- Compression and caching
- Core Web Vitals optimization

## 📊 API Endpoints

### Products
- `GET /api/products` - Get all products with filtering
- `GET /api/products/featured` - Get featured products
- `GET /api/products/search` - Search products
- `GET /api/products/:slug` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:slug` - Get single category
- `GET /api/categories/:slug/products` - Get category products
- `POST /api/categories` - Create category (admin)
- `PUT /api/categories/:id` - Update category (admin)
- `DELETE /api/categories/:id` - Delete category (admin)

## 🧪 Testing

### Frontend Testing
```bash
npm run test
npm run test:watch
npm run test:coverage
```

### Backend Testing
```bash
cd backend
npm test
npm run test:watch
```

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy to Vercel or your preferred platform
```

### Backend (Railway/Heroku)
```bash
cd backend
# Set environment variables
# Deploy to your preferred platform
```

### Environment Setup
1. Set up MongoDB Atlas or your preferred database
2. Configure environment variables for production
3. Set up image storage (AWS S3 or similar)
4. Configure domain and SSL certificates

## 📈 Performance Optimization

### Frontend
- Next.js Image optimization
- Code splitting with dynamic imports
- React Query for efficient data fetching
- Lazy loading for components
- Bundle analysis and optimization

### Backend
- Database indexing for faster queries
- Response compression
- Caching strategies
- Rate limiting
- Image optimization with Sharp

## 🔒 Security

### Frontend
- Input sanitization
- XSS protection
- CSRF protection
- Secure headers

### Backend
- Helmet.js for security headers
- Rate limiting
- Input validation
- JWT authentication
- CORS configuration

## 📝 Best Practices

### Code Quality
- TypeScript for type safety
- ESLint and Prettier configuration
- Consistent naming conventions
- Component composition patterns
- Error boundaries

### Performance
- Lazy loading
- Code splitting
- Image optimization
- Caching strategies
- Bundle optimization

### SEO
- Semantic HTML
- Structured data
- Meta tag optimization
- Sitemap generation
- Core Web Vitals optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API documentation

## 🔄 Updates

This project follows semantic versioning. Check the [CHANGELOG](CHANGELOG.md) for updates and breaking changes.