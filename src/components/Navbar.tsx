import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavPage } from '../types';
import { FARM_INFO } from '../data/farmData';
import { BrandLogo } from './BrandLogo';
import { 
  Phone, 
  Clock, 
  MapPin, 
  Menu, 
  X, 
  ShoppingBag, 
  Calendar,
  MessageCircle,
  ChevronRight
} from 'lucide-react';

interface NavbarProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  onOpenOrder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenOrder,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; page: NavPage }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Shop', page: 'shop' },
    { label: 'Products', page: 'products' },
    { label: 'About Us', page: 'about' },
    { label: 'Our Farm', page: 'farm' },
    { label: 'Blog', page: 'blog' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: NavPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.header 
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all"
    >
      {/* Slim Top Utility Bar with Contact & Hours */}
      <div className="bg-[#0F3020] text-stone-200 text-[11px] py-1 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/40 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <a 
              href={`tel:${FARM_INFO.phoneRaw}`} 
              className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors"
              title="Call Moo & More Dairy Farm"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>{FARM_INFO.phone}</span>
            </a>
            <a 
              href={FARM_INFO.whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3 h-3 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
            <div className="flex items-center gap-1.5 text-stone-300">
              <Clock className="w-3 h-3 text-emerald-400" />
              <span>{FARM_INFO.hours}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-stone-300">
            <a 
              href={FARM_INFO.googleMapsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <MapPin className="w-3 h-3 text-emerald-400" />
              <span className="truncate max-w-xs">{FARM_INFO.shortLocation}</span>
            </a>
            <span className="hidden xl:inline-flex items-center gap-1.5 text-emerald-300 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Fresh Daily Cold-Chain Delivery
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar: Compact, Elegant & Space-Efficient */}
      <nav className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-200 ${
        scrolled ? 'py-1.5 shadow-sm' : 'py-2'
      }`}>
        <div className="flex items-center justify-between gap-3">
          {/* Logo brand - Compact header variant without verbose tagline */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D] rounded-lg transition-transform hover:scale-[1.02] shrink-0"
          >
            <BrandLogo size="sm" showTagline={false} />
          </button>

          {/* Desktop Navigation Links - Compact & Sleek */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <motion.button
                  key={item.page}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleNavClick(item.page)}
                  className={`px-2.5 py-1.5 text-xs xl:text-sm font-semibold rounded-lg transition-all relative ${
                    isActive 
                      ? 'text-[#15803D] bg-emerald-50/90 shadow-2xs font-bold' 
                      : 'text-stone-700 hover:text-[#15803D] hover:bg-stone-100/70'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#15803D] rounded-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Desktop Actions - Streamlined */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenOrder}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-[#15803D] hover:bg-[#166534] rounded-lg transition-all shadow-xs hover:shadow"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Order Milk</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleNavClick('booking')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0F3020] border border-[#0F3020]/25 hover:border-[#0F3020] hover:bg-[#0F3020]/5 rounded-lg transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-[#15803D]" />
              <span>Book Tour</span>
            </motion.button>
          </div>

          {/* Mobile Menu & Quick Order Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onOpenOrder}
              className="px-3 py-1 text-xs font-bold text-white bg-[#15803D] hover:bg-[#166534] rounded-md transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <ShoppingBag className="w-3 h-3" />
              <span>Order</span>
            </motion.button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-[#0F3020] hover:bg-stone-100 rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-white border-b border-stone-200 shadow-xl overflow-hidden px-4 py-4"
          >
            <div className="grid grid-cols-2 gap-1.5 mb-4">
              {navItems.map((item) => {
                const isActive = currentPage === item.page;
                return (
                  <button
                    key={item.page}
                    onClick={() => handleNavClick(item.page)}
                    className={`flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg text-left transition-colors ${
                      isActive 
                        ? 'bg-[#0F3020] text-white' 
                        : 'text-stone-800 hover:bg-stone-100'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-stone-200 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenOrder();
                  }}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#15803D] text-white text-xs font-bold rounded-lg shadow-xs"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Order Products</span>
                </button>

                <button
                  onClick={() => handleNavClick('booking')}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 border border-[#0F3020] text-[#0F3020] text-xs font-semibold rounded-lg"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#15803D]" />
                  <span>Book Tour</span>
                </button>
              </div>

              <div className="pt-2 grid grid-cols-2 gap-2 text-xs">
                <a
                  href={`tel:${FARM_INFO.phoneRaw}`}
                  className="flex items-center justify-center gap-1.5 p-2 bg-stone-100 rounded-md text-[#0F3020] font-semibold text-[11px]"
                >
                  <Phone className="w-3 h-3 text-[#15803D]" />
                  <span>{FARM_INFO.phone}</span>
                </a>
                <a
                  href={FARM_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 p-2 bg-emerald-50 text-emerald-800 rounded-md font-semibold text-[11px]"
                >
                  <MessageCircle className="w-3 h-3 text-[#15803D]" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
