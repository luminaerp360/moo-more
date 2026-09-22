import React from 'react';
import { motion } from 'motion/react';
import { FARM_INFO } from '../data/farmData';
import { useSiteContent } from '../context/ContentContext';
import { NavPage } from '../types';
import { TestimonialSection } from '../components/TestimonialSection';
import { 
  ShoppingBag, 
  ArrowRight, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  Leaf, 
  Users, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock,
  ExternalLink,
  ChevronRight,
  Milk,
  Award
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: NavPage) => void;
  onOpenOrder: (productId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenOrder }) => {
  const content = useSiteContent();

  // Live API content with graceful fallback to the static site copy
  const hero = content.hero;
  const heroTitle = hero?.title || null;
  const heroDescription = hero?.description || null;
  const heroImage = hero?.imageUrl || null;
  const primaryBtnText = hero?.primaryButtonText || 'Shop With Us Now';
  const secondaryBtnText = hero?.secondaryButtonText || 'Our Products';

  const fallbackStats = [
    { value: FARM_INFO.stats.yearsInBusiness, label: FARM_INFO.stats.yearsLabel },
    { value: FARM_INFO.stats.customersCount, label: FARM_INFO.stats.customersLabel },
    { value: FARM_INFO.stats.dailyProduction, label: FARM_INFO.stats.dailyProductionLabel },
    { value: FARM_INFO.stats.productsCount, label: FARM_INFO.stats.productsLabel },
  ];
  const homeStats =
    content.statsCounters.length > 0
      ? content.statsCounters.slice(0, 4).map((s) => ({ value: `${s.value}+`, label: s.title }))
      : fallbackStats;

  const valueIcons = [ShieldCheck, Leaf, Heart, Users];
  const valueColors = [
    'bg-emerald-100 text-[#15803D]',
    'bg-emerald-100 text-[#15803D]',
    'bg-amber-100 text-amber-800',
    'bg-emerald-100 text-[#0F3020]',
  ];
  const homeValues =
    content.companyValues.length > 0
      ? content.companyValues.map((v) => ({ title: v.title, desc: v.description }))
      : FARM_INFO.values;

  const missionText =
    content.mission?.description || FARM_INFO.mission;

  const featuredProducts = content.productItems.slice(0, 2);
  const services = content.serviceItems;
  const blogPosts = content.blogPosts;

  return (
    <div className="space-y-0">
      {/* 1. HERO SECTION - Streamlined, Balanced & Animated */}
      <section className="relative bg-[#0A2216] text-white overflow-hidden">
        {/* Background Image with Warm Pastoral Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage || "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=2000&q=80"}
            alt="Moo & More Dairy Farm Pastures in Dadira, Kenya"
            className="w-full h-full object-cover object-center filter brightness-40 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A2216]/95 via-[#0A2216]/85 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A2216] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content Column */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="lg:col-span-7 space-y-4 sm:space-y-5"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 text-[11px] sm:text-xs font-semibold text-emerald-300"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Green Pastures • Dadira, Kenya</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.15 }}
                className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight"
              >
                {heroTitle ? (
                  heroTitle
                ) : (
                  <>
                    Welcome to <br className="hidden sm:inline" />
                    <span className="text-emerald-400">Moo &amp; More</span> Dairy Farm
                  </>
                )}
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 }}
                className="text-sm sm:text-base text-stone-200 leading-relaxed max-w-xl"
              >
                {heroDescription || "Farm-fresh milk and wholesome dairy products straight from our happy, pasture-fed cows to your family table."}
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.25 }}
                className="pt-1 flex flex-wrap items-center gap-3"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onNavigate('shop')}
                  className="px-5 py-2.5 sm:py-3 bg-[#15803D] hover:bg-[#166534] text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2 text-xs sm:text-sm group cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{primaryBtnText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onNavigate('products')}
                  className="px-5 py-2.5 sm:py-3 bg-white/15 hover:bg-white/25 text-white font-bold border border-white/30 rounded-lg transition-all text-xs sm:text-sm backdrop-blur-xs cursor-pointer"
                >
                  {secondaryBtnText}
                </motion.button>
              </motion.div>

              {/* Quick Farm Badges */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5 border-t border-white/15 text-[11px] sm:text-xs text-stone-200"
              >
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Same-Day Cold Chain</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Zero Preservatives</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Quality Tested Daily</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column: Floating Interactive Highlight Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-5 hidden lg:block"
            >
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl space-y-4"
              >
                <div className="flex items-center justify-between border-b border-white/15 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">Live Farm Status</span>
                  </div>
                  <span className="text-[11px] text-stone-300">Today in Dadira</span>
                </div>

                <div className="space-y-3 text-xs text-stone-200">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2.5">
                      <Milk className="w-4 h-4 text-emerald-300" />
                      <span>Morning Milking</span>
                    </div>
                    <span className="font-bold text-emerald-300">Complete (Chilled &lt; 4°C)</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2.5">
                      <Award className="w-4 h-4 text-emerald-300" />
                      <span>Butterfat Density</span>
                    </div>
                    <span className="font-bold text-emerald-300">4.2% Premium Cream</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-emerald-300" />
                      <span>Dispatch Zone</span>
                    </div>
                    <span className="font-bold text-emerald-300">Busia • Kisumu • Western</span>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <button 
                    onClick={() => onOpenOrder('fresh-milk')}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors shadow-sm"
                  >
                    Reserve Today's Fresh Batch
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. STATS STRIP 1 - Animated on View */}
      <section className="bg-[#0F3020] text-white py-8 px-4 sm:px-6 lg:px-8 border-y border-emerald-900/60 shadow-inner">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
          {homeStats.map((stat, idx) => (
            <motion.div 
              key={idx}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 15 }}
              viewport={{ once: true }}
              whileHover={{ y: -3, scale: 1.02 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-emerald-300">
                {stat.value}
              </div>
              <div className="text-[11px] sm:text-xs font-semibold text-stone-200 uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 2b. SPECIAL OFFERS FROM LIVE CMS */}
      {content.specialOffers.length > 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="font-script text-[#15803D] text-xl sm:text-2xl font-bold block mb-1">
              Fresh From the Farm
            </span>
            <h2 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F3020]">
              Special Offers
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.specialOffers.map((offer) => (
              <motion.div
                key={offer._id || offer.title}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all"
              >
                <div className="h-44 overflow-hidden">
                  <img
                    src={offer.imageUrl}
                    alt={offer.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-serif-heading font-bold text-lg text-[#0F3020]">
                    {offer.title}
                  </h3>
                  <p className="text-sm text-stone-600 mt-2 line-clamp-3">{offer.description}</p>
                  <button
                    onClick={() => onNavigate('shop')}
                    className="mt-4 px-4 py-2 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    {offer.buttonText}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 3. ABOUT TEASER & MISSION BLOCK - Animated */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-center">
          {/* Visual Grid */}
          <motion.div 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -30 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-6 relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.img
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                src="https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=700&q=80"
                alt="Happy dairy cows grazing in Kenya"
                className="rounded-2xl shadow-md h-56 sm:h-72 w-full object-cover"
              />
              <motion.img
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                src="https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=700&q=80"
                alt="Fresh farm milk bottles ready for delivery"
                className="rounded-2xl shadow-md h-56 sm:h-72 w-full object-cover mt-6 sm:mt-8"
              />
            </div>
            <motion.div 
              whileHover={{ y: -3 }}
              className="absolute -bottom-4 left-4 bg-[#0F3020] text-white p-4 sm:p-5 rounded-2xl shadow-xl max-w-xs hidden sm:block border border-white/15"
            >
              <span className="font-script text-amber-300 text-lg block leading-none">
                Est. 2023 in Dadira
              </span>
              <p className="text-xs text-stone-200 mt-1 font-medium">
                7km off Bumala Centre on the Kisumu–Busia Highway
              </p>
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 30 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-6 space-y-4 sm:space-y-6"
          >
            <span className="font-script text-[#15803D] text-xl sm:text-2xl font-bold block">
              About Our Dairy Farm
            </span>
            <h2 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F3020] tracking-tight leading-tight">
              Delivering the freshest dairy products with care for our animals, environment, and your health since 2023.
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Moo &amp; More Dairy Farm was established in Dadira with a clear objective: to bring wholesome, unadulterated farm-fresh milk to Kenyan families. Our herd of healthy, well-nourished cows graze on lush Kenyan pastures, producing rich milk of exceptional quality every single day.
            </p>

            {/* Mission Statement Box */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#F4F7F4] border border-stone-200/90 shadow-xs">
              <h4 className="font-serif-heading text-xs uppercase tracking-wider font-extrabold text-[#15803D] mb-1">
                Our Farm Mission
              </h4>
              <p className="text-stone-800 text-xs sm:text-sm italic font-serif leading-relaxed">
                "{missionText}"
              </p>
            </div>

            <div className="pt-2">
              <motion.button
                whileHover={{ x: 3 }}
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#15803D] hover:text-[#166534] group transition-colors"
              >
                <span>Learn More About Our Farm &amp; Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. CORE VALUES SECTION (4 Animated Cards) */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-stone-200/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="font-script text-[#15803D] text-xl sm:text-2xl font-bold block mb-1">
              Grounded in Principles
            </span>
            <h2 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F3020]">
              Our Core Farm Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {homeValues.map((value, idx) => {
              const ValueIcon = valueIcons[idx % valueIcons.length];
              return (
                <motion.div 
                  key={value.title}
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  className="p-6 rounded-2xl bg-[#F4F7F4] border border-stone-200/80 space-y-3 shadow-2xs hover:shadow-md transition-shadow"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${valueColors[idx % valueColors.length]}`}>
                    <ValueIcon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif-heading text-lg sm:text-xl font-bold text-[#0F3020]">
                    {value.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {value.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. FEATURED PRODUCTS (2 Cards from Brief) - Animated */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="font-script text-[#15803D] text-xl sm:text-2xl font-bold block mb-1">
            Pure &amp; Wholesome
          </span>
          <h2 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F3020] tracking-tight">
            Featured Farm Products
          </h2>
          <p className="mt-2 sm:mt-3 text-stone-600 text-sm sm:text-base">
            From dawn collection in Dadira to your doorstep — taste the natural richness of authentic dairy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {featuredProducts.map((product, idx) => (
            <motion.div 
              key={product.id}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 25 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col sm:flex-row group"
            >
              <div className="sm:w-1/2 h-56 sm:h-auto relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-[#15803D] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                    {product.badge}
                  </span>
                )}
              </div>

              <div className="sm:w-1/2 p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-[#0F3020] mb-2">
                    {product.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                    {product.fullDesc || product.shortDesc}
                  </p>
                  <div className="space-y-1.5 text-xs text-stone-700 mb-6">
                    {(product.features || []).slice(0, 3).map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="line-clamp-1">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onOpenOrder(product.id)}
                  className="w-full py-2.5 sm:py-3 px-4 bg-[#0F3020] hover:bg-[#0A2015] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{product.priceNote || 'Order Now'}</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. STATS STRIP 2 (Repeat/Reinforce from Brief) - Animated */}
      <section className="bg-[#F4F7F4] border-y border-stone-200/80 py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
          <motion.div 
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="p-3 sm:p-4 rounded-xl hover:bg-white transition-colors"
          >
            <div className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F3020]">
              80+ Animals
            </div>
            <div className="text-[11px] sm:text-xs text-stone-600 uppercase tracking-wider font-semibold mt-1">
              Free-Range Healthy Herd
            </div>
          </motion.div>

          <motion.div 
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.08 }}
            className="p-3 sm:p-4 rounded-xl hover:bg-white transition-colors"
          >
            <div className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F3020]">
              500+ Litres
            </div>
            <div className="text-[11px] sm:text-xs text-stone-600 uppercase tracking-wider font-semibold mt-1">
              Produced Every Morning
            </div>
          </motion.div>

          <motion.div 
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.16 }}
            className="p-3 sm:p-4 rounded-xl hover:bg-white transition-colors"
          >
            <div className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F3020]">
              1,200+ Customers
            </div>
            <div className="text-[11px] sm:text-xs text-stone-600 uppercase tracking-wider font-semibold mt-1">
              Served Across Kenya
            </div>
          </motion.div>

          <motion.div 
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.24 }}
            className="p-3 sm:p-4 rounded-xl hover:bg-white transition-colors"
          >
            <div className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F3020]">
              15+ Products
            </div>
            <div className="text-[11px] sm:text-xs text-stone-600 uppercase tracking-wider font-semibold mt-1">
              Fresh Value-Added Dairy
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. FARM SERVICES TEASER - Animated */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="font-script text-[#15803D] text-xl sm:text-2xl font-bold block mb-1">
            Comprehensive Agricultural Services
          </span>
          <h2 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F3020]">
            What We Do at Moo &amp; More
          </h2>
          <p className="mt-2 text-stone-600 text-xs sm:text-sm">
            Beyond fresh bottled milk, we operate full-scale commercial dairy supply, agricultural education, and livestock genetics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {services.map((srv, idx) => (
            <motion.div
              key={srv.id}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.35, delay: idx * 0.07 }}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="h-40 sm:h-44 w-full overflow-hidden">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-serif-heading font-bold text-base sm:text-lg text-[#0F3020] mb-1.5">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed mb-3 line-clamp-3">
                    {srv.shortDesc}
                  </p>
                  <ul className="space-y-1 text-[11px] text-stone-600">
                    {srv.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-[#15803D] shrink-0" />
                        <span className="line-clamp-1">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-5 pt-0">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate('services')}
                  className="w-full py-2 px-3 border border-[#0F3020] text-[#0F3020] hover:bg-[#0F3020] hover:text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 8. TEAM TEASER - Animated */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 25 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="bg-[#F4F7F4] rounded-3xl p-6 sm:p-10 lg:p-12 border border-stone-200 shadow-xs"
          >
            <div className="max-w-3xl mx-auto text-center space-y-3 sm:space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#15803D]">
                Meet Our Team
              </span>
              <h2 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F3020] leading-snug">
                Dedicated to Healthy Cows &amp; Exceptional Quality
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                At Moo &amp; More, we are passionate about providing fresh, high-quality dairy products. Our dedicated team works tirelessly to ensure our cows are well cared for and our customers receive the best farm-fresh milk and dairy delights.
              </p>
              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-[#0F3020] hover:bg-[#0A2015] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-xs"
                >
                  <span>Meet Our Farm Team</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 8. OUR FARM & GALLERY PREVIEW TEASER */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-stone-50 border-t border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Farm Preview Card */}
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden shadow-md bg-white border border-stone-200 group"
            >
              <div className="h-64 sm:h-72 relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=80"
                  alt="Our Farm Pastures in Dadira"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-700/80 px-2.5 py-1 rounded-md">
                    Dadira Countryside
                  </span>
                  <h3 className="font-serif-heading text-2xl font-bold">
                    Experience Our Farm &amp; Pastures
                  </h3>
                  <p className="text-xs text-stone-200 line-clamp-2">
                    Tour our automated milking parlour, learn about sustainable silage fodder agronomy, and see our biogas eco-cycle.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => onNavigate('farm')}
                      className="px-4 py-2 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Explore Our Farm</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Gallery Preview Card */}
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative rounded-3xl overflow-hidden shadow-md bg-white border border-stone-200 group"
            >
              <div className="h-64 sm:h-72 relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=1200&q=80"
                  alt="Farm & Product Gallery"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-600/80 px-2.5 py-1 rounded-md">
                    Visual Showcase
                  </span>
                  <h3 className="font-serif-heading text-2xl font-bold">
                    Photo &amp; Activity Gallery
                  </h3>
                  <p className="text-xs text-stone-200 line-clamp-2">
                    Browse authentic photography of our pedigree heifers, artisanal yoghurt incubation batches, and visitor tours.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => onNavigate('gallery')}
                      className="px-4 py-2 bg-white text-stone-900 hover:bg-stone-100 text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>View Full Gallery</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS CAROUSEL & GRID (15 Verified Quotes) */}
      <TestimonialSection />

      {/* 10. BLOG TEASER (2 Verified Posts) - Animated */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <span className="font-script text-[#15803D] text-xl sm:text-2xl font-bold block mb-1">
              Farm Journal &amp; Articles
            </span>
            <h2 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F3020]">
              Latest News from the Farm
            </h2>
          </div>
          <motion.button
            whileHover={{ x: 3 }}
            onClick={() => onNavigate('blog')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F3020] hover:text-[#15803D] group"
          >
            <span>Read All Journal Posts</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {blogPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.35, delay: idx * 0.1 }}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 sm:h-56 object-cover"
                />
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>By {post.author}</span>
                  </div>
                  <h3 className="font-serif-heading font-bold text-lg sm:text-xl text-[#0F3020] mb-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0">
                <motion.button
                  whileHover={{ x: 2 }}
                  onClick={() => onNavigate('blog')}
                  className="text-xs font-bold text-[#15803D] hover:text-[#166534] flex items-center gap-1"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 10b. NEWSLETTER FROM LIVE CMS */}
      {content.newsletter && (
        <section className="py-12 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto bg-[#0F3020] rounded-3xl p-8 sm:p-12 text-center text-white border border-emerald-900/50">
            <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold">
              {content.newsletter.title}
            </h2>
            <p className="text-sm text-stone-300 mt-3 leading-relaxed max-w-xl mx-auto">
              {content.newsletter.description}
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.open(
                  `https://wa.me/254711320959?text=${encodeURIComponent(
                    'Hello! I would like to subscribe to the Moo & More newsletter.'
                  )}`,
                  '_blank',
                  'noopener,noreferrer'
                );
              }}
              className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                placeholder={content.newsletter.placeholderText}
                className="flex-1 px-4 py-3 rounded-lg text-sm text-stone-900 bg-white border border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-[#15803D] hover:bg-[#166534] text-white text-sm font-bold rounded-lg transition-colors"
              >
                {content.newsletter.buttonText}
              </button>
            </form>
          </div>
        </section>
      )}

      {/* 11. CONTACT STRIP BEFORE FOOTER - Animated */}
      <section className="bg-white border-t border-stone-200/80 py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-stone-700 text-xs">
          <motion.div 
            whileHover={{ y: -3 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-[#F4F7F4] border border-stone-200/70"
          >
            <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold text-stone-900 block text-xs">Phone &amp; WhatsApp</span>
              <a href={`tel:${FARM_INFO.phoneRaw}`} className="text-stone-600 hover:text-emerald-700">
                {FARM_INFO.phone}
              </a>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-[#F4F7F4] border border-stone-200/70"
          >
            <Mail className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="truncate">
              <span className="font-bold text-stone-900 block text-xs">Email Desk</span>
              <a href={`mailto:${FARM_INFO.email}`} className="text-stone-600 hover:text-emerald-700 truncate block">
                {FARM_INFO.email}
              </a>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-[#F4F7F4] border border-stone-200/70"
          >
            <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold text-stone-900 block text-xs">Farm Location</span>
              <span className="text-stone-600 block line-clamp-1">Dadira, 7km off Bumala Centre</span>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-[#F4F7F4] border border-stone-200/70"
          >
            <Clock className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold text-stone-900 block text-xs">Working Hours</span>
              <span className="text-stone-600 block">{FARM_INFO.hours}</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
