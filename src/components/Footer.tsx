import React from 'react';
import { NavPage } from '../types';
import { FARM_INFO } from '../data/farmData';
import { BrandLogo } from './BrandLogo';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  ArrowUp
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: NavPage) => void;
  onOpenOrder: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenOrder }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A2216] text-stone-200 border-t border-emerald-950 relative">
      {/* Pre-footer Call to Action Band: "Experience Farm Life" */}
      <div className="bg-[#0F3020] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/60">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="font-script text-amber-300 text-xl md:text-2xl block mb-1">
              Visit our farm &amp; discover the joy of sustainable dairy farming
            </span>
            <h3 className="font-serif-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Experience Countryside Life in Dadira
            </h3>
            <p className="mt-2 text-stone-300 max-w-xl text-sm sm:text-base">
              Tour our modern milking parlour, feed our friendly calves, and taste farm-fresh milk straight from the source.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                onNavigate('booking');
                scrollToTop();
              }}
              className="px-6 py-3 bg-[#15803D] hover:bg-[#166534] text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <span>Book a Farm Tour</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenOrder}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold border border-white/20 rounded-lg transition-colors"
            >
              Order Dairy Products
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo size="lg" variant="dark" />
            <p className="text-stone-300 text-sm leading-relaxed mt-4">
              Moo &amp; More Dairy Farm is a premier dairy and livestock enterprise based in Dadira, Kenya. We produce pure, wholesome fresh cow milk, handcrafted artisanal yoghurts, and provide expert breeding &amp; livestock management services.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Certified Hygiene • Cold-Chain Guaranteed • Established 2023</span>
            </div>
            <div className="pt-3">
              <a
                href={FARM_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-700/80 hover:bg-emerald-600 text-white rounded-lg text-sm font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-300" />
                <span>Chat Directly on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-serif-heading font-bold text-base tracking-wide uppercase border-b border-emerald-800/60 pb-2">
              Explore Farm
            </h4>
            <ul className="space-y-2 text-sm text-stone-300">
              <li>
                <button 
                  onClick={() => { onNavigate('home'); scrollToTop(); }}
                  className="hover:text-emerald-300 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('shop'); scrollToTop(); }}
                  className="hover:text-emerald-300 transition-colors"
                >
                  Shop
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('products'); scrollToTop(); }}
                  className="hover:text-emerald-300 transition-colors"
                >
                  Products
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('about'); scrollToTop(); }}
                  className="hover:text-emerald-300 transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('farm'); scrollToTop(); }}
                  className="hover:text-emerald-300 transition-colors"
                >
                  Our Farm
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('blog'); scrollToTop(); }}
                  className="hover:text-emerald-300 transition-colors"
                >
                  Blog
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('gallery'); scrollToTop(); }}
                  className="hover:text-emerald-300 transition-colors"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('contact'); scrollToTop(); }}
                  className="hover:text-emerald-300 transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Products & Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-serif-heading font-bold text-base tracking-wide uppercase border-b border-emerald-800/60 pb-2">
              Fresh Products
            </h4>
            <ul className="space-y-2 text-sm text-stone-300">
              <li>
                <button onClick={onOpenOrder} className="hover:text-emerald-300 text-left transition-colors">
                  100% Pure Fresh Cow Milk
                </button>
              </li>
              <li>
                <button onClick={onOpenOrder} className="hover:text-emerald-300 text-left transition-colors">
                  Handcrafted Yoghurt (Strawberry, Vanilla, Plain)
                </button>
              </li>
              <li>
                <button onClick={onOpenOrder} className="hover:text-emerald-300 text-left transition-colors">
                  Traditional Maziwa Mala
                </button>
              </li>
              <li>
                <button onClick={onOpenOrder} className="hover:text-emerald-300 text-left transition-colors">
                  High-Protein Dairy Meal Feed
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('services'); scrollToTop(); }}
                  className="hover:text-emerald-300 text-left transition-colors"
                >
                  Wholesale &amp; Institutional Supply
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('livestock'); scrollToTop(); }}
                  className="hover:text-emerald-300 text-left transition-colors"
                >
                  Breeding Genetics &amp; AI Insemination
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-serif-heading font-bold text-base tracking-wide uppercase border-b border-emerald-800/60 pb-2">
              Farm Contacts
            </h4>
            <div className="space-y-3 text-sm text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                <span>
                  {FARM_INFO.location}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${FARM_INFO.phoneRaw}`} className="hover:text-white transition-colors">
                  {FARM_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${FARM_INFO.email}`} className="hover:text-white transition-colors truncate">
                  {FARM_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{FARM_INFO.hours}</span>
              </div>
              <div className="pt-2">
                <a
                  href={FARM_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-300 hover:text-white underline decoration-emerald-500 underline-offset-4"
                >
                  <span>Open on Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="mt-12 pt-8 border-t border-stone-700/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>
            &copy; {currentYear} {FARM_INFO.legalName}. All rights reserved. Registered farm enterprise in Kenya.
          </p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => { onNavigate('privacy'); scrollToTop(); }}
              className="hover:text-stone-200 transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-stone-600">•</span>
            <button
              onClick={() => { onNavigate('terms'); scrollToTop(); }}
              className="hover:text-stone-200 transition-colors"
            >
              Terms of Service
            </button>
            <span className="text-stone-600">•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-emerald-300 transition-colors"
              title="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
