import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import ShoppingCart from './components/ShoppingCart';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import ErrorBoundary from './components/ErrorBoundary';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Homepage = lazy(() => import('./pages/Homepage'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const Store = lazy(() => import('./pages/Store'));
const Articles = lazy(() => import('./pages/Articles'));

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <div className="min-h-screen bg-white">
              <Header />
              <main>
                <Suspense fallback={<div className="flex justify-center items-center h-screen font-arabic text-xl">جاري التحميل...</div>}>
                  <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contact" element={<Contact />} />
                    
                    {/* هنا المهم */}
                    <Route path="/store/:category?/:subcategory?" element={<Store />} />

                    <Route path="/articles" element={<Articles />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
              <ShoppingCart />
            </div>
          </Router>
        </CartProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
