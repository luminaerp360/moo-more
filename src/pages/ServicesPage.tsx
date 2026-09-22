import React from 'react';
import { motion } from 'motion/react';
import { FARM_INFO } from '../data/farmData';
import { useSiteContent } from '../context/ContentContext';
import { NavPage } from '../types';
import { 
  CheckCircle2, 
  ShoppingBag, 
  Calendar, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  Truck, 
  Sparkles
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: NavPage) => void;
  onOpenOrder: (productId?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, onOpenOrder }) => {
  const content = useSiteContent();
  const services = content.serviceItems;
  const products = content.productItems;

  return (
    <div className="space-y-0">
      {/* 1. Hero Header - Compact & Balanced */}
      <section className="bg-[#0F3020] text-white py-10 sm:py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=2000&q=80"
            alt="Dairy farm operations in Kenya"
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
            Quality Guaranteed • Farm to Table
          </span>
          <h1 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            Our Dairy Services &amp; Products
          </h1>
          <p className="text-xs sm:text-sm text-stone-200 max-w-2xl mx-auto leading-relaxed">
            From daily doorstep raw and pasteurized milk deliveries to institutional bulk supplies, value-added yoghurts, and educational farm tours.
          </p>

          <div className="pt-2 flex items-center justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onOpenOrder()}
              className="px-5 py-2.5 sm:px-6 sm:py-3 bg-[#15803D] hover:bg-[#166534] text-white font-bold rounded-lg transition-colors shadow-md text-xs sm:text-sm flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order Dairy Products</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate('booking')}
              className="px-5 py-2.5 sm:px-6 sm:py-3 bg-white/10 hover:bg-white/20 text-white font-bold border border-white/20 rounded-lg transition-colors text-xs sm:text-sm flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-emerald-300" />
              <span>Book a Farm Tour</span>
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* 2. Four Core Services Cards (Detailed in Brief) - Animated */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="font-script text-[#15803D] text-xl sm:text-2xl font-bold block mb-1">
            What We Do
          </span>
          <h2 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F3020]">
            Core Agricultural Capabilities
          </h2>
          <p className="mt-2 text-stone-600 text-xs sm:text-sm">
            Every service is backed by strict veterinary oversight, temperature-controlled transit, and authentic farm integrity.
          </p>
        </div>

        <div className="space-y-8 sm:space-y-12">
          {services.map((srv, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <motion.div
                key={srv.id}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 25 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all grid grid-cols-1 lg:grid-cols-12 group"
              >
                {/* Image (5 cols) */}
                <div className={`lg:col-span-5 h-64 lg:h-auto relative overflow-hidden ${isReversed ? 'lg:order-2' : ''}`}>
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-xs text-white text-xs font-bold uppercase rounded-lg tracking-wider">
                      Service 0{index + 1}
                    </span>
                  </div>
                </div>

                {/* Content (7 cols) */}
                <div className={`lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between ${isReversed ? 'lg:order-1' : ''}`}>
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="font-serif-heading text-xl sm:text-2xl lg:text-3xl font-bold text-[#0F3020]">
                      {srv.title}
                    </h3>
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                      {srv.fullDesc}
                    </p>

                    <div className="pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-2.5">
                        Key Service Highlights:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {srv.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                            <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-stone-100 flex flex-wrap items-center gap-3">
                    {srv.id === 'fresh-milk-supply' && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onOpenOrder('fresh-milk')}
                        className="px-5 py-2.5 bg-[#0F3020] hover:bg-[#0A2015] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2 shadow-xs"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Order Fresh Milk</span>
                      </motion.button>
                    )}

                    {srv.id === 'dairy-products' && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onOpenOrder('handcrafted-yoghurt')}
                        className="px-5 py-2.5 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2 shadow-xs"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Order Dairy Delights</span>
                      </motion.button>
                    )}

                    {srv.id === 'farm-visits' && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onNavigate('booking')}
                        className="px-5 py-2.5 bg-[#0F3020] hover:bg-[#0A2015] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2 shadow-xs"
                      >
                        <Calendar className="w-4 h-4 text-emerald-300" />
                        <span>Book Guided Tour</span>
                      </motion.button>
                    )}

                    {srv.id === 'wholesale-supply' && (
                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={`https://wa.me/254711320959?text=${encodeURIComponent('Hello Moo & More Farm, I would like to request wholesale milk supply terms for my business.')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 bg-[#0F3020] hover:bg-[#0A2015] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2 shadow-xs"
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-400" />
                        <span>Request Wholesale Quote</span>
                      </motion.a>
                    )}

                    <a
                      href={`tel:${FARM_INFO.phoneRaw}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-[#0F3020]"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Inquire: {FARM_INFO.phone}</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. Detailed Product Catalogue - Animated */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F4F7F4] border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className="font-script text-[#15803D] text-xl sm:text-2xl font-bold block mb-1">
              Farm Pantry &amp; Feeds
            </span>
            <h2 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F3020]">
              Our Complete Product Range
            </h2>
            <p className="mt-2 text-stone-600 text-xs sm:text-sm">
              All dairy items are prepared under sterile food-grade environments using only fresh milk from our Dadira herd.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {products.map((prod, idx) => (
              <motion.div
                key={prod.id}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="h-44 sm:h-48 w-full overflow-hidden relative">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-bold text-stone-800 uppercase tracking-wider shadow-xs">
                      {prod.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="font-serif-heading font-bold text-base sm:text-lg text-[#0F3020]">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {prod.fullDesc}
                    </p>

                    <div className="pt-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                        Available Sizes:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {prod.sizes.map((sz, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 text-[11px] font-mono"
                          >
                            {sz}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onOpenOrder(prod.id)}
                    className="w-full py-2.5 px-3 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Order Now</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Cold Chain & Delivery Guarantee Strip - Animated */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.97 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-[#0F3020] text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6 text-emerald-300" />
              </div>
              <div>
                <h4 className="font-serif-heading font-bold text-base sm:text-lg mb-1">
                  Daily Cold-Chain Fleet
                </h4>
                <p className="text-xs text-stone-200 leading-relaxed">
                  Insulated transit vans maintain milk strictly below 4°C, preserving taste, natural vitamins, and extended shelf freshness.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-emerald-300" />
              </div>
              <div>
                <h4 className="font-serif-heading font-bold text-base sm:text-lg mb-1">
                  100% Purity Certified
                </h4>
                <p className="text-xs text-stone-200 leading-relaxed">
                  Every batch is tested with lactometers and fat testers for purity and density. Zero chemical stabilizers or water adulteration.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-emerald-300" />
              </div>
              <div>
                <h4 className="font-serif-heading font-bold text-base sm:text-lg mb-1">
                  Flexible Subscriptions
                </h4>
                <p className="text-xs text-stone-200 leading-relaxed">
                  Enjoy daily or alternate-day milk delivered to your door with simplified monthly billing and pause-anytime flexibility.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
