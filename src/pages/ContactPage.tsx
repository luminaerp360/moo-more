import React from 'react';
import { motion } from 'motion/react';
import { ContactSection } from '../components/ContactSection';
import { NavPage } from '../types';
import { MapPin, Phone, MessageCircle, Clock } from 'lucide-react';
import { FARM_INFO } from '../data/farmData';

interface ContactPageProps {
  onNavigate: (page: NavPage) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-0">
      {/* 1. Header Hero - Scenic Dadira Office */}
      <section className="bg-[#0F3020] text-white py-10 sm:py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=2000&q=80"
            alt="Moo & More Dairy Farm Contact"
            className="w-full h-full object-cover"
          />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative max-w-4xl mx-auto text-center space-y-3"
        >
          <span className="font-script text-emerald-300 text-lg sm:text-xl font-bold block">
            Get In Touch • We'd Love to Hear from You
          </span>
          <h1 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Contact Moo &amp; More Farm
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Reach out for daily milk delivery orders, bulk wholesale distribution, student farm visits, or veterinary consultancy.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-stone-200">
            <a 
              href={`tel:${FARM_INFO.phoneRaw}`} 
              className="inline-flex items-center gap-1.5 hover:text-emerald-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{FARM_INFO.phone}</span>
            </a>
            <a 
              href={FARM_INFO.whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 hover:text-emerald-300 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Direct WhatsApp Chat</span>
            </a>
            <div className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{FARM_INFO.hours}</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. Contact Section Details */}
      <ContactSection onNavigate={onNavigate} />
    </div>
  );
};
