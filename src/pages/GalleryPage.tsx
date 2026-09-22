import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FARM_INFO } from '../data/farmData';
import { useSiteContent } from '../context/ContentContext';
import { GalleryItem, NavPage } from '../types';
import { 
  Camera, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Calendar, 
  MapPin,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface GalleryPageProps {
  onNavigate: (page: NavPage) => void;
  onOpenOrder: (productId?: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate, onOpenOrder }) => {
  const content = useSiteContent();
  const galleryItems = content.galleryItems;
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'herd', label: 'Dairy Herd' },
    { id: 'milk', label: 'Milking & Cold Chain' },
    { id: 'products', label: 'Artisan Dairy' },
    { id: 'pasture', label: 'Pastures & Fields' },
    { id: 'tours', label: 'Farm Tours' },
  ];

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredItems.length);
  };

  const prevPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  const currentPhoto = selectedPhotoIndex !== null ? filteredItems[selectedPhotoIndex] : null;

  return (
    <div className="space-y-0">
      {/* 1. Header Hero - Compact & Scenic */}
      <section className="bg-[#0F3020] text-white py-10 sm:py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=2000&q=80"
            alt="Moo & More Farm Gallery"
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
            Life at Dadira • A Visual Journey
          </span>
          <h1 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Farm &amp; Product Gallery
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Take a visual tour through our daily milking routines, green rolling paddocks, calf nursery, small-batch yoghurt churning, and visiting school delegations.
          </p>

          <div className="pt-1 flex items-center justify-center gap-2 text-xs text-stone-300">
            <Camera className="w-3.5 h-3.5 text-emerald-400" />
            <span>Captured live on site in Dadira, Bumala, Busia County</span>
          </div>
        </motion.div>
      </section>

      {/* 2. Filter Navigation Pills */}
      <section className="py-6 bg-white border-b border-stone-200 sticky top-14 z-20 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSelectedPhotoIndex(null);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#0F3020] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Photos Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              onClick={() => openLightbox(index)}
              className="group relative rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-xs cursor-pointer aspect-4/3 flex flex-col justify-end"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Tag & Zoom Icon */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 text-stone-900 backdrop-blur-xs shadow-2xs">
                  {item.categoryLabel}
                </span>
                <span className="w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Caption & Title */}
              <div className="relative p-4 text-white space-y-1">
                <h3 className="font-serif-heading text-sm sm:text-base font-bold leading-snug">
                  {item.title}
                </h3>
                <p className="text-[11px] text-stone-200 line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>
                {item.date && (
                  <span className="text-[10px] text-emerald-300 font-medium block pt-0.5">
                    {item.date}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visit in Person Callout */}
        <div className="mt-14 p-8 rounded-3xl bg-emerald-50/70 border border-emerald-200/80 text-center space-y-3 max-w-3xl mx-auto">
          <span className="font-script text-[#15803D] text-lg font-bold block">
            See It with Your Own Eyes
          </span>
          <h3 className="font-serif-heading text-2xl font-bold text-[#0F3020]">
            Book an In-Person Farm Tour
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-xl mx-auto">
            Nothing compares to tasting milk straight after the morning chilling or watching our dairy cows graze in the fresh breeze.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => onNavigate('farm')}
              className="px-5 py-2.5 bg-[#0F3020] hover:bg-[#15803D] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Learn More &amp; Book Tour
            </button>
            <button
              onClick={() => onNavigate('shop')}
              className="px-5 py-2.5 bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Order Farm Products
            </button>
          </div>
        </div>
      </section>

      {/* 4. Lightbox Modal */}
      <AnimatePresence>
        {currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-stone-300 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Photo */}
            <button
              onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Photo */}
            <button
              onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Photo Card Container */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl max-h-[85vh] bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 shadow-2xl flex flex-col"
            >
              <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={currentPhoto.image}
                  alt={currentPhoto.title}
                  className="max-h-[65vh] w-auto object-contain mx-auto"
                />
              </div>

              <div className="p-4 sm:p-5 bg-stone-900 border-t border-stone-800 text-white space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                    {currentPhoto.categoryLabel}
                  </span>
                  {currentPhoto.date && (
                    <span className="text-[10px] text-stone-400">
                      {currentPhoto.date}
                    </span>
                  )}
                </div>

                <h3 className="font-serif-heading text-base sm:text-lg font-bold">
                  {currentPhoto.title}
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {currentPhoto.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
