import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavPage } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { OrderModal } from './components/OrderModal';
import { LegalModal } from './components/LegalModals';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductsPage } from './pages/ProductsPage';
import { AboutPage } from './pages/AboutPage';
import { OurFarmPage } from './pages/OurFarmPage';
import { BlogPage } from './pages/BlogPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { ServicesPage } from './pages/ServicesPage';
import { LivestockPage } from './pages/LivestockPage';
import { CommunityPage } from './pages/CommunityPage';
import { FarmTourBooking } from './components/FarmTourBooking';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavPage>('home');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [preselectedProduct, setPreselectedProduct] = useState<string | undefined>(undefined);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validPages: string[] = [
        'home', 
        'shop', 
        'products', 
        'about', 
        'farm', 
        'blog', 
        'gallery', 
        'contact', 
        'services', 
        'livestock', 
        'community', 
        'booking'
      ];

      if (validPages.includes(hash)) {
        setCurrentPage(hash as NavPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'privacy' || hash === 'terms') {
        setLegalModalType(hash as 'privacy' | 'terms');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: NavPage) => {
    if (page === 'privacy' || page === 'terms') {
      setLegalModalType(page);
      return;
    }
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenOrder = (productId?: string) => {
    setPreselectedProduct(productId);
    setIsOrderModalOpen(true);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} onOpenOrder={handleOpenOrder} />;
      case 'shop':
        return <ShopPage onNavigate={handleNavigate} onOpenOrder={handleOpenOrder} />;
      case 'products':
        return <ProductsPage onNavigate={handleNavigate} onOpenOrder={handleOpenOrder} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} onOpenOrder={() => handleOpenOrder()} />;
      case 'farm':
        return <OurFarmPage onNavigate={handleNavigate} onOpenOrder={handleOpenOrder} />;
      case 'blog':
        return <BlogPage onNavigate={handleNavigate} onOpenOrder={() => handleOpenOrder()} />;
      case 'gallery':
        return <GalleryPage onNavigate={handleNavigate} onOpenOrder={handleOpenOrder} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      case 'services':
        return <ServicesPage onNavigate={handleNavigate} onOpenOrder={handleOpenOrder} />;
      case 'livestock':
        return <LivestockPage onNavigate={handleNavigate} onOpenOrder={() => handleOpenOrder()} />;
      case 'community':
        return <CommunityPage onNavigate={handleNavigate} onOpenOrder={() => handleOpenOrder()} />;
      case 'booking':
        return <FarmTourBooking />;
      default:
        return <HomePage onNavigate={handleNavigate} onOpenOrder={handleOpenOrder} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-stone-900 font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenOrder={() => handleOpenOrder()}
      />

      {/* Main Page Body with Animated Route Transitions */}
      <main className="flex-1 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            {renderCurrentPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Site Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenOrder={() => handleOpenOrder()}
      />

      {/* Persistent Floating WhatsApp Help & Order Widget */}
      <FloatingWhatsApp />

      {/* Interactive Order Milk / Product Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        preselectedProductId={preselectedProduct}
      />

      {/* Legal Disclaimers & Privacy Policy Modal */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
