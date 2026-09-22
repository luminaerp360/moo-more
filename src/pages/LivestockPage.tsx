import React from 'react';
import { motion } from 'motion/react';
import { FARM_INFO } from '../data/farmData';
import { NavPage } from '../types';
import { 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  Dna, 
  Heart, 
  Award, 
  Activity,
  ArrowRight
} from 'lucide-react';

interface LivestockPageProps {
  onNavigate: (page: NavPage) => void;
  onOpenOrder: () => void;
}

export const LivestockPage: React.FC<LivestockPageProps> = ({ onNavigate, onOpenOrder }) => {
  return (
    <div className="space-y-0">
      {/* 1. Header Hero - Compact & Balanced */}
      <section className="bg-[#0F3020] text-white py-10 sm:py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=2000&q=80"
            alt="Holstein Friesian dairy cows grazing at Moo & More Farm"
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
            Superior Genetics • Scientific Nutrition • Herd Health
          </span>
          <h1 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            Livestock Management &amp; AI Breeding
          </h1>
          <p className="text-xs sm:text-sm text-stone-200 max-w-2xl mx-auto leading-relaxed">
            Pioneering dairy cattle genetics, progressive artificial insemination (AI), and holistic herd nutrition in Western Kenya.
          </p>

          <div className="pt-2 flex items-center justify-center gap-3">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={`https://wa.me/254711320959?text=${encodeURIComponent('Hello Moo & More Farm, I am inquiring about Artificial Insemination (AI) services and livestock breeding genetics.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 sm:px-6 sm:py-3 bg-[#15803D] hover:bg-[#166534] text-white font-bold rounded-lg transition-colors shadow-md text-xs sm:text-sm flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>Inquire on Breeding &amp; AI</span>
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate('booking')}
              className="px-5 py-2.5 sm:px-6 sm:py-3 bg-white/10 hover:bg-white/20 text-white font-bold border border-white/20 rounded-lg transition-colors text-xs sm:text-sm"
            >
              Tour Livestock Facilities
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* 2. Dairy Cattle Management Section - Animated */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-center">
          <motion.div 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -25 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-6 space-y-4 sm:space-y-5"
          >
            <span className="font-script text-[#15803D] text-xl sm:text-2xl font-bold block">
              Cattle Care &amp; Husbandry
            </span>
            <h2 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F3020] leading-tight">
              Dairy Cattle Management
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              At Moo &amp; More Dairy Farm in Dadira, healthy cows are the cornerstone of everything we do. We blend scientific husbandry, humane animal treatment, and continuous veterinary care to nurture a contented and vigorous dairy herd.
            </p>

            <div className="space-y-3 pt-2">
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-1"
              >
                <div className="flex items-center gap-2 text-stone-900 font-bold text-sm sm:text-base">
                  <Award className="w-5 h-5 text-[#0F3020]" />
                  <h4>High-Yield Dairy Breeds</h4>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed pl-7">
                  Our dairy herd comprises top-producing breeds like Holstein Friesian, selected for superior milk yield, docility, and overall vitality under equatorial conditions.
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-1"
              >
                <div className="flex items-center gap-2 text-stone-900 font-bold text-sm sm:text-base">
                  <Heart className="w-5 h-5 text-[#15803D]" />
                  <h4>Optimal Cow Nutrition</h4>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed pl-7">
                  Cows receive carefully balanced rations with high-protein feeds, mineral supplements, fresh fodder, and quality silage to support peak lactation and digestive longevity.
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-1"
              >
                <div className="flex items-center gap-2 text-stone-900 font-bold text-sm sm:text-base">
                  <Activity className="w-5 h-5 text-emerald-700" />
                  <h4>Expert Herd Care</h4>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed pl-7">
                  Our veterinary team conducts routine health checks, vaccinations, hoof trimming, and preventive care to keep every animal healthy and thriving throughout every lactation cycle.
                </p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 25 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-6"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=1000&q=80"
                alt="Well groomed healthy dairy cow in clean stable"
                className="rounded-2xl shadow-xl w-full h-[380px] sm:h-[460px] object-cover"
              />
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="absolute -bottom-4 left-4 sm:left-6 bg-[#0F3020] text-white p-4 sm:p-5 rounded-2xl shadow-xl max-w-xs border border-white/10"
              >
                <div className="font-serif-heading font-bold text-base sm:text-lg mb-1 text-emerald-300">
                  80+ Registered Cattle
                </div>
                <p className="text-[11px] sm:text-xs text-stone-200">
                  Individual digital ear-tag records tracking milk output, vaccination, and breeding genealogy.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Artificial Insemination & Breeding Section - Animated */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F4F7F4] border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-center">
            {/* Image (6 cols) */}
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 25 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="lg:col-span-6 order-2 lg:order-1"
            >
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=700&q=80"
                  alt="Dairy heifers on paddock"
                  className="rounded-2xl shadow-md h-52 sm:h-64 w-full object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=700&q=80"
                  alt="Lush green fodder farm for livestock nutrition"
                  className="rounded-2xl shadow-md h-52 sm:h-64 w-full object-cover mt-6 sm:mt-8"
                />
              </div>
            </motion.div>

            {/* Content (6 cols) */}
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 25 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="lg:col-span-6 order-1 lg:order-2 space-y-4 sm:space-y-5"
            >
              <span className="font-script text-[#15803D] text-xl sm:text-2xl font-bold block">
                Genetic Excellence
              </span>
              <h2 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F3020] leading-tight">
                Artificial Insemination &amp; Breeding
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                We believe that sustainable dairy profitability in Kenya begins with genetics. Through our selective breeding program, we partner with certified artificial insemination (AI) technicians to upgrade local herds and preserve top-tier milking bloodlines.
              </p>

              <div className="space-y-3 pt-2">
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-1"
                >
                  <div className="flex items-center gap-2 text-stone-900 font-bold text-sm sm:text-base">
                    <Dna className="w-5 h-5 text-[#0F3020]" />
                    <h4>Selective Breeding Programs</h4>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed pl-7">
                    We use elite dairy genetics and superior bulls to improve milk yield, udder conformation, and disease resistance across successive generations of heifers.
                  </p>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-1"
                >
                  <div className="flex items-center gap-2 text-stone-900 font-bold text-sm sm:text-base">
                    <Sparkles className="w-5 h-5 text-[#15803D]" />
                    <h4>Genetic Improvement</h4>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed pl-7">
                    Systematic AI breeding helps local farmers and our herd continually upgrade dairy traits, maternal temperament, and feed conversion efficiency.
                  </p>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-1"
                >
                  <div className="flex items-center gap-2 text-stone-900 font-bold text-sm sm:text-base">
                    <ShieldCheck className="w-5 h-5 text-emerald-700" />
                    <h4>Higher Dairy Production</h4>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed pl-7">
                    Offspring from our breeding program deliver consistently higher milk output, superior butterfat percentage, and longer productive lifespans.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Practical Breeding Advice & Consultations for Farmers - Animated */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.97 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-[#0F3020] text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl"
        >
          <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6">
            <span className="font-script text-emerald-300 text-xl sm:text-2xl block">
              Farmer Advisory Services
            </span>
            <h3 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold">
              Looking to Upgrade Your Dairy Herd in Busia &amp; Kisumu?
            </h3>
            <p className="text-stone-200 text-xs sm:text-sm leading-relaxed">
              Our veterinary officers and farm technicians offer practical consultations on heat detection timing, sire semen selection (Holstein Friesian, Ayrshire, Jersey), silage preparation, and heifer calf management.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={FARM_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 sm:px-6 sm:py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm rounded-lg transition-colors flex items-center gap-2 shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Talk with Our Breeding Specialist</span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={`tel:${FARM_INFO.phoneRaw}`}
                className="px-5 py-3 sm:px-6 sm:py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 rounded-lg transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call {FARM_INFO.phone}</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
