# Abaar Group Website

A modern, responsive website for Abaar Group - a leading Egyptian company specializing in groundwater well drilling, maintenance, and solar energy solutions.

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd abaar-group-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons

## 📱 Features

- **Bilingual Support** - Arabic (RTL) and English (LTR)
- **Responsive Design** - Mobile-first approach
- **E-commerce Store** - Complete product catalog with shopping cart
- **Performance Optimized** - Lazy loading, code splitting, image optimization
- **SEO Friendly** - Meta tags, structured data, semantic HTML
- **Error Handling** - Comprehensive error boundaries and fallbacks

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── context/            # React context providers
├── assets/             # Static assets
└── main.tsx           # Application entry point
```

## 🌐 Pages

- **Homepage** - Company overview and hero section
- **About** - Company history and team
- **Services** - Detailed service offerings
- **Projects** - Portfolio and case studies
- **Store** - E-commerce product catalog
- **Partners** - Business partnerships
- **Contact** - Contact information and forms

## 🛒 Store Features

- **Product Categories** - Pumps, Motors, Cables, Pipes, Solar Equipment
- **Advanced Filtering** - Filter by brand, material, specifications
- **Search Functionality** - Real-time product search
- **Shopping Cart** - Add/remove items, quantity management
- **WhatsApp Integration** - Request quotes via WhatsApp

## 🎨 Design System

- **Colors** - Blue-based palette with gold accents
- **Typography** - Cairo and Tajawal fonts for Arabic, Inter for English
- **Components** - Consistent design patterns and animations
- **Responsive** - Mobile-first with breakpoints for all devices

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_APP_TITLE=Abaar Group
VITE_WHATSAPP_NUMBER=201211110240
```

### Vite Configuration
The project uses Vite for fast development and optimized builds. Configuration includes:
- Code splitting for better performance
- Image optimization
- CSS minification
- TypeScript support

## 📦 Build and Deployment

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

The build output will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   npm run dev -- --port 3001
   ```

2. **Module not found errors**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **TypeScript errors**
   ```bash
   npm run build
   ```

### Performance Tips

- Images are lazy-loaded by default
- Components are code-split for optimal loading
- Use the production build for testing performance
- Enable gzip compression on your server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary and confidential. All rights reserved by Abaar Group.

## 📞 Support

For technical support or questions:
- Email: info@abaargroup.com
- Phone: +20 121 111 0240#   a b a a r g r o u p -  
 