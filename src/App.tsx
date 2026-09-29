import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavPage, ADMIN_PAGES } from './types';
import { useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { OrderModal } from './components/OrderModal';
import { CartDrawer } from './components/CartDrawer';
import { LegalModal } from './components/LegalModals';
import { AdminLayout } from './components/admin/AdminLayout';
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
import { LoginPage } from './pages/LoginPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { HomeContentManager } from './pages/admin/HomeContentManager';
import { AboutManager } from './pages/admin/AboutManager';
import { FarmServicesManager } from './pages/admin/FarmServicesManager';
import { GalleryManager } from './pages/admin/GalleryManager';
import { BlogsManager } from './pages/admin/BlogsManager';
import { TeamManager } from './pages/admin/TeamManager';
import { ProductsManager } from './pages/admin/ProductsManager';
import { CategoriesManager } from './pages/admin/CategoriesManager';
import { OrdersManager } from './pages/admin/OrdersManager';
import { MessagesManager } from './pages/admin/MessagesManager';
import { SettingsManager } from './pages/admin/SettingsManager';
import { ReviewsManager } from './pages/admin/ReviewsManager';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavPage>('home');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [preselectedProduct, setPreselectedProduct] = useState<string | undefined>(undefined);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  const { isAuthenticated, isAdmin } = useAuth();

  const isAdminPage = (page: NavPage) => ADMIN_PAGES.includes(page);
  const showPublicChrome = currentPage !== 'login' && !isAdminPage(currentPage);

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
        'booking',
        'login',
        ...ADMIN_PAGES,
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

  // Guard: bounce unauthenticated visitors away from admin pages
  useEffect(() => {
    if (isAdminPage(currentPage) && !isAuthenticated) {
      window.location.hash = 'login';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, isAuthenticated]);

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

  const renderAdminContent = () => {
    switch (currentPage) {
      case 'admin/home-content':
        return <HomeContentManager />;
      case 'admin/about':
        return <AboutManager />;
      case 'admin/farm-services':
        return <FarmServicesManager />;
      case 'admin/gallery':
        return <GalleryManager />;
      case 'admin/blogs':
        return <BlogsManager />;
      case 'admin/team':
        return <TeamManager />;
      case 'admin/products':
        return <ProductsManager />;
      case 'admin/categories':
        return <CategoriesManager />;
      case 'admin/orders':
        return <OrdersManager />;
      case 'admin/messages':
        return <MessagesManager />;
      case 'admin/settings':
        return <SettingsManager />;
      case 'admin/reviews':
        return <ReviewsManager />;
      default:
        return <AdminDashboard onNavigate={handleNavigate} />;
    }
  };

  const renderCurrentPage = () => {
    if (currentPage === 'login') {
      return <LoginPage onNavigate={handleNavigate} />;
    }

    if (isAdminPage(currentPage)) {
      if (!isAuthenticated) {
        return <LoginPage onNavigate={handleNavigate} />;
      }
      if (!isAdmin) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-[#F4F7F4] px-4">
            <div className="bg-white rounded-xl border border-stone-200 shadow-md p-8 max-w-md text-center">
              <h2 className="text-xl font-bold text-[#0F3020] font-serif-heading">Access Denied</h2>
              <p className="text-sm text-stone-500 mt-2">
                Your account does not have administrator privileges.
              </p>
              <button
                onClick={() => handleNavigate('home')}
                className="mt-5 px-4 py-2 bg-[#15803D] hover:bg-[#166534] text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Back to Website
              </button>
            </div>
          </div>
        );
      }
      return (
        <AdminLayout currentPage={currentPage} onNavigate={handleNavigate}>
          {renderAdminContent()}
        </AdminLayout>
      );
    }

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

  // 1. Full-screen dedicated Login page
  if (currentPage === 'login') {
    return <LoginPage onNavigate={handleNavigate} />;
  }

  // 2. Full-screen dedicated Admin dashboard & management portal
  if (isAdminPage(currentPage)) {
    if (!isAuthenticated) {
      return <LoginPage onNavigate={handleNavigate} />;
    }
    if (!isAdmin) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#F4F7F4] px-4">
          <div className="bg-white rounded-xl border border-stone-200 shadow-md p-8 max-w-md text-center">
            <h2 className="text-xl font-bold text-[#0F3020] font-serif-heading">Access Denied</h2>
            <p className="text-sm text-stone-500 mt-2">
              Your account does not have administrator privileges.
            </p>
            <button
              onClick={() => handleNavigate('home')}
              className="mt-5 px-4 py-2 bg-[#15803D] hover:bg-[#166534] text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Back to Website
            </button>
          </div>
        </div>
      );
    }
    return (
      <AdminLayout currentPage={currentPage} onNavigate={handleNavigate}>
        {renderAdminContent()}
      </AdminLayout>
    );
  }

  // 3. Public Website with Navbar, Animated Route transitions & Footer
  return (
    <div className="min-h-screen flex flex-col bg-white text-stone-900 font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
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

      <Footer
        onNavigate={handleNavigate}
        onOpenOrder={() => handleOpenOrder()}
      />

      <FloatingWhatsApp />

      {/* Slide-over eCommerce Cart Drawer */}
      <CartDrawer />

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
