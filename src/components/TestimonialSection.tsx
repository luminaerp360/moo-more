import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { TESTIMONIALS } from '../data/farmData';
import { Testimonial } from '../types';
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck,
  MapPin,
  Calendar,
  ArrowRight,
  ShoppingBag
} from 'lucide-react';

export const TestimonialSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'distributor' | 'farmer' | 'business' | 'consumer' | 'hospitality'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const filtered: Testimonial[] = filter === 'all' 
    ? TESTIMONIALS 
    : TESTIMONIALS.filter(t => t.category === filter);

  // Safety fallback for index when filter changes
  const activeIndex = currentIndex % (filtered.length || 1);
  const currentReview = filtered[activeIndex] || TESTIMONIALS[0];

  // Derive previous and next items for the 3-card panoramic deck
  const prevIndex = (activeIndex - 1 + filtered.length) % filtered.length;
  const nextIndex = (activeIndex + 1) % filtered.length;
  const prevReview = filtered[prevIndex];
  const nextReview = filtered[nextIndex];

  // Auto-advance timer
  useEffect(() => {
    if (!isPlaying || isHovered || filtered.length <= 1) return;

    const intervalTime = 5500;
    const step = 50;
    const increment = (step / intervalTime) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setDirection(1);
          setCurrentIndex((idx) => (idx + 1) % filtered.length);
          return 0;
        }
        return prev + increment;
      });
    }, step);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, filtered.length, currentIndex]);

  useEffect(() => {
    setProgress(0);
  }, [currentIndex, filter]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % filtered.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    setProgress(0);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setCurrentIndex(index);
    setProgress(0);
  };

  const categories = [
    { id: 'all', label: 'All Reviews', count: TESTIMONIALS.length },
    { id: 'distributor', label: 'Wholesale & Vendors', count: TESTIMONIALS.filter(t => t.category === 'distributor').length },
    { id: 'farmer', label: 'Dairy Farmers', count: TESTIMONIALS.filter(t => t.category === 'farmer').length },
    { id: 'business', label: 'Cafes & Chefs', count: TESTIMONIALS.filter(t => t.category === 'business').length },
    { id: 'consumer', label: 'Families & Homes', count: TESTIMONIALS.filter(t => t.category === 'consumer').length },
    { id: 'hospitality', label: 'Hotels & Dining', count: TESTIMONIALS.filter(t => t.category === 'hospitality').length },
  ];

  // Sliding card variants
  const slideVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.94,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.94,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 },
      },
    }),
  };

  // Continuous ribbon rows
  const marqueeRowOne = [...TESTIMONIALS, ...TESTIMONIALS];
  const marqueeRowTwo = [...TESTIMONIALS.slice(6), ...TESTIMONIALS.slice(0, 6), ...TESTIMONIALS];

  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-[#F4F7F4] via-[#EEF4EE] to-[#F4F7F4] border-t border-stone-200/80 overflow-hidden relative">
      {/* Subtle organic pasture backdrop pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#0F3020 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. SECTION HEADER - Compact, Elegant & Balanced */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/90 text-emerald-900 text-xs font-semibold mb-2.5 border border-emerald-200/60 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#15803D]" />
            <span>Kenya's Trusted Fresh Dairy Reviews</span>
          </div>

          <h2 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F3020] tracking-tight">
            Loved by Farmers, Families &amp; Businesses
          </h2>
          <p className="mt-2 text-stone-600 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            Real feedback from distributors, barista cafes, dairy breeders, and mothers across Kenya who depend on our fresh cow milk, live yoghurts, and pedigree genetics.
          </p>

          {/* Trust Scorecard Strip */}
          <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 bg-white/80 backdrop-blur-xs px-4 sm:px-6 py-2 rounded-full border border-stone-200 shadow-xs text-xs">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-stone-900 text-sm">4.9 / 5.0</span>
            </div>
            <div className="h-3 w-px bg-stone-300 hidden sm:block" />
            <div className="flex items-center gap-1 text-stone-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Genuine Kenyan Reviews</span>
            </div>
            <div className="h-3 w-px bg-stone-300 hidden sm:block" />
            <div className="flex items-center gap-1 text-stone-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-medium">Unbroken Cold Chain Tested</span>
            </div>
          </div>
        </motion.div>

        {/* 2. CATEGORY PILLS & CAROUSEL CONTROL BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-8">
          {/* Category Filter Pills with Item Counts */}
          <div className="flex items-center flex-wrap justify-center gap-1.5 sm:gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setFilter(cat.id as any);
                  setCurrentIndex(0);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  filter === cat.id
                    ? 'bg-[#0F3020] text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:border-emerald-500/50 hover:bg-stone-50'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  filter === cat.id 
                    ? 'bg-white/20 text-white' 
                    : 'bg-stone-100 text-stone-600'
                }`}>
                  {cat.count}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Autoplay & Direction Controls */}
          <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-stone-200/90 shadow-xs shrink-0">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-1.5 rounded-full text-xs flex items-center gap-1.5 font-medium transition-colors cursor-pointer ${
                isPlaying 
                  ? 'text-emerald-700 hover:bg-emerald-50' 
                  : 'text-stone-500 hover:bg-stone-100'
              }`}
              title={isPlaying ? 'Pause auto-moving carousel' : 'Start auto-moving carousel'}
              aria-label={isPlaying ? 'Pause auto-moving carousel' : 'Start auto-moving carousel'}
            >
              {isPlaying ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                  </span>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span className="text-[11px] font-bold text-emerald-900">Auto-Moving</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span className="text-[11px] font-medium text-stone-600">Paused</span>
                </>
              )}
            </button>

            <div className="h-4 w-px bg-stone-200 mx-1"></div>

            <button
              onClick={handlePrev}
              className="p-1 rounded-full hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs font-mono font-medium text-stone-500 px-1">
              {activeIndex + 1}/{filtered.length}
            </span>

            <button
              onClick={handleNext}
              className="p-1 rounded-full hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3. 3D-STYLE PANORAMIC CAROUSEL DECK */}
        {filtered.length > 0 && (
          <div 
            className="relative max-w-5xl mx-auto mb-12"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Auto-Slide Thin Progress Indicator */}
            <div className="w-full bg-stone-200/90 h-1 rounded-full overflow-hidden mb-4">
              <motion.div 
                className="bg-[#15803D] h-full transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Desktop Flanking Peek Cards Container */}
            <div className="relative flex items-center justify-center">
              
              {/* Left Peek Card (Desktop Only) */}
              {prevReview && filtered.length > 2 && (
                <div 
                  onClick={handlePrev}
                  className="hidden lg:block absolute -left-12 xl:-left-20 w-80 transform -translate-x-8 scale-90 opacity-40 hover:opacity-75 transition-all duration-300 cursor-pointer pointer-events-auto z-10 blur-[0.5px] hover:blur-none"
                  title="Click to view previous review"
                >
                  <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm text-left">
                    <div className="flex items-center gap-2 mb-2 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-stone-600 italic line-clamp-2 mb-3">
                      "{prevReview.quote}"
                    </p>
                    <div className="flex items-center gap-2 text-xs font-bold text-stone-800">
                      <img 
                        src={prevReview.avatar} 
                        alt={prevReview.name}
                        className="w-7 h-7 rounded-full object-cover border border-emerald-600/30"
                      />
                      <span className="truncate">{prevReview.name}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Main Center Active Card */}
              <div className="w-full max-w-3xl relative z-20">
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={`${currentReview.id}-${activeIndex}`}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-stone-200/90 relative overflow-hidden transition-shadow hover:shadow-2xl"
                  >
                    {/* Top Decorative Forest Accent Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0F3020] via-[#15803D] to-[#16A34A]" />

                    {/* Watermark Quote Icon */}
                    <div className="absolute top-5 right-6 text-[#15803D] opacity-10 pointer-events-none">
                      <Quote className="w-24 h-24 stroke-1 fill-current" />
                    </div>

                    <div className="relative z-10 space-y-5">
                      
                      {/* Top Header Row: Rating Stars + Product Tag + Verified Badge */}
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                  i < currentReview.rating
                                    ? 'text-amber-400 fill-amber-400'
                                    : 'text-stone-200'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 font-bold text-xs border border-amber-200/60">
                            {currentReview.rating}.0 • Excellent
                          </span>
                        </div>

                        {/* Verified Partner Badge */}
                        <div className="inline-flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/70 font-semibold shadow-2xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Verified Kenyan Partner</span>
                        </div>
                      </div>

                      {/* Main Quote Text in Warm Elegant Serif */}
                      <blockquote className="font-serif italic text-lg sm:text-2xl text-[#0F3020] leading-snug sm:leading-relaxed pt-1">
                        "{currentReview.quote}"
                      </blockquote>

                      {/* Product Purchased Tag */}
                      {currentReview.product && (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F4F7F4] border border-stone-200/80 text-xs text-stone-700">
                          <ShoppingBag className="w-3.5 h-3.5 text-[#15803D]" />
                          <span className="font-semibold text-stone-900">Experience / Product:</span>
                          <span className="text-stone-600">{currentReview.product}</span>
                        </div>
                      )}

                      {/* Author Profile Footer */}
                      <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                          <div className="relative">
                            <img
                              src={currentReview.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80'}
                              alt={currentReview.name}
                              className="w-13 h-13 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-[#15803D]/60 shadow-sm"
                            />
                            <div className="absolute -bottom-1 -right-1 bg-[#15803D] text-white p-0.5 rounded-full ring-2 ring-white">
                              <CheckCircle2 className="w-3 h-3" />
                            </div>
                          </div>
                          <div>
                            <h4 className="font-serif-heading font-bold text-base sm:text-lg text-[#0F3020] leading-tight">
                              {currentReview.name}
                            </h4>
                            <p className="text-xs text-stone-500 flex items-center gap-1.5 mt-0.5">
                              <span className="font-semibold text-stone-800">{currentReview.role}</span>
                              <span>•</span>
                              <span className="flex items-center gap-0.5 text-stone-600">
                                <MapPin className="w-3 h-3 text-[#15803D]" />
                                {currentReview.location}, Kenya
                              </span>
                            </p>
                          </div>
                        </div>

                        {/* Category & Date Pills */}
                        <div className="flex items-center gap-2 self-start sm:self-center">
                          {currentReview.date && (
                            <span className="inline-flex items-center gap-1 text-[11px] text-stone-500 font-medium">
                              <Calendar className="w-3 h-3" />
                              {currentReview.date}
                            </span>
                          )}
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                            {currentReview.category}
                          </span>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Peek Card (Desktop Only) */}
              {nextReview && filtered.length > 2 && (
                <div 
                  onClick={handleNext}
                  className="hidden lg:block absolute -right-12 xl:-right-20 w-80 transform translate-x-8 scale-90 opacity-40 hover:opacity-75 transition-all duration-300 cursor-pointer pointer-events-auto z-10 blur-[0.5px] hover:blur-none"
                  title="Click to view next review"
                >
                  <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm text-left">
                    <div className="flex items-center gap-2 mb-2 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-stone-600 italic line-clamp-2 mb-3">
                      "{nextReview.quote}"
                    </p>
                    <div className="flex items-center gap-2 text-xs font-bold text-stone-800">
                      <img 
                        src={nextReview.avatar} 
                        alt={nextReview.name}
                        className="w-7 h-7 rounded-full object-cover border border-emerald-600/30"
                      />
                      <span className="truncate">{nextReview.name}</span>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Navigation Dots and Direction Arrow Buttons */}
            <div className="flex items-center justify-between mt-5 px-2">
              <button
                onClick={handlePrev}
                className="flex items-center gap-1 text-xs font-bold text-stone-600 hover:text-[#0F3020] transition-colors p-2 rounded-lg hover:bg-white/60 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              {/* Expanding Pagination Capsule Dots */}
              <div className="flex items-center justify-center gap-1.5">
                {filtered.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDotClick(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === activeIndex
                        ? 'w-7 bg-[#0F3020]'
                        : 'w-2 bg-stone-300 hover:bg-stone-400'
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="flex items-center gap-1 text-xs font-bold text-stone-600 hover:text-[#0F3020] transition-colors p-2 rounded-lg hover:bg-white/60 cursor-pointer"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* 4. CONTINUOUS ANIMATED PANORAMIC MOVING MARQUEE (DUAL TRACK) */}
        <div className="mt-12 sm:mt-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#15803D] block">
                Continuous Panoramic Stream
              </span>
              <h3 className="font-serif-heading text-base sm:text-lg font-bold text-[#0F3020]">
                All Verified Client Stories
              </h3>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs text-stone-500 bg-white/70 px-3 py-1 rounded-full border border-stone-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Hover over any card to pause stream • Click to feature</span>
            </div>
          </div>

          {/* Marquee Row 1 - Moving Left */}
          <div className="relative w-full overflow-hidden py-2 pause-on-hover">
            {/* Left and Right Edge Soft Fades */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#F4F7F4] via-[#F4F7F4]/90 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#F4F7F4] via-[#F4F7F4]/90 to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee-left flex gap-4">
              {marqueeRowOne.map((review, i) => (
                <motion.div
                  key={`m1-${review.id}-${i}`}
                  whileHover={{ y: -5, scale: 1.02 }}
                  onClick={() => {
                    const targetIndex = filtered.findIndex(t => t.id === review.id);
                    if (targetIndex !== -1) {
                      setCurrentIndex(targetIndex);
                    }
                  }}
                  className="w-[300px] sm:w-[360px] shrink-0 bg-white rounded-2xl p-5 border border-stone-200 shadow-xs hover:shadow-lg hover:border-emerald-500/60 transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(5)].map((_, s) => (
                          <Star
                            key={s}
                            className={`w-3.5 h-3.5 ${
                              s < review.rating ? 'fill-amber-400' : 'text-stone-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                        {review.location}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed line-clamp-3 mb-3 group-hover:text-stone-900 transition-colors">
                      "{review.quote}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img 
                        src={review.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80'}
                        alt={review.name}
                        className="w-8 h-8 rounded-full object-cover border border-[#15803D]/40"
                      />
                      <div>
                        <div className="text-xs font-bold text-stone-900 leading-tight">
                          {review.name}
                        </div>
                        <div className="text-[10px] text-stone-500">
                          {review.role}
                        </div>
                      </div>
                    </div>

                    <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                      {review.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Marquee Row 2 - Moving Right (Opposite Direction) */}
          <div className="relative w-full overflow-hidden py-2 pause-on-hover mt-3">
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#F4F7F4] via-[#F4F7F4]/90 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#F4F7F4] via-[#F4F7F4]/90 to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee-right flex gap-4">
              {marqueeRowTwo.map((review, i) => (
                <motion.div
                  key={`m2-${review.id}-${i}`}
                  whileHover={{ y: -5, scale: 1.02 }}
                  onClick={() => {
                    const targetIndex = filtered.findIndex(t => t.id === review.id);
                    if (targetIndex !== -1) {
                      setCurrentIndex(targetIndex);
                    }
                  }}
                  className="w-[300px] sm:w-[360px] shrink-0 bg-white rounded-2xl p-5 border border-stone-200 shadow-xs hover:shadow-lg hover:border-emerald-500/60 transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(5)].map((_, s) => (
                          <Star
                            key={s}
                            className={`w-3.5 h-3.5 ${
                              s < review.rating ? 'fill-amber-400' : 'text-stone-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                        {review.location}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed line-clamp-3 mb-3 group-hover:text-stone-900 transition-colors">
                      "{review.quote}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img 
                        src={review.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80'}
                        alt={review.name}
                        className="w-8 h-8 rounded-full object-cover border border-[#15803D]/40"
                      />
                      <div>
                        <div className="text-xs font-bold text-stone-900 leading-tight">
                          {review.name}
                        </div>
                        <div className="text-[10px] text-stone-500">
                          {review.role}
                        </div>
                      </div>
                    </div>

                    <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                      {review.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* 5. BOTTOM ENGAGEMENT BANNER: SHARE YOUR FARM EXPERIENCE */}
        <div className="mt-12 sm:mt-16 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif-heading font-bold text-base sm:text-lg text-[#0F3020]">
              Have you tasted our milk or visited our pastures?
            </h4>
            <p className="text-xs text-stone-600">
              We value direct feedback from families, retail vendors, cafe baristas, and dairy farmers.
            </p>
          </div>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="https://wa.me/254711320959?text=Hello%20Moo%20%26%20More%20Farm,%20I%20would%20like%20to%20submit%20a%20review%20of%20your%20dairy%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#0F3020] hover:bg-[#15803D] text-white text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0"
          >
            <span>Submit a Customer Review</span>
            <ArrowRight className="w-4 h-4 text-emerald-300" />
          </motion.a>
        </div>

      </div>
    </section>
  );
};
