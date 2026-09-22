import React from 'react';
import { motion } from 'motion/react';
import { COMMUNITY_MODULES, FARM_INFO } from '../data/farmData';
import { NavPage } from '../types';
import { 
  GraduationCap, 
  Cpu, 
  Dna, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  Calendar, 
  ArrowRight,
  BookOpen,
  Award
} from 'lucide-react';

interface CommunityPageProps {
  onNavigate: (page: NavPage) => void;
  onOpenOrder: () => void;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({ onNavigate, onOpenOrder }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-7 h-7 text-[#0F3020]" />;
      case 'Cpu':
        return <Cpu className="w-7 h-7 text-[#15803D]" />;
      case 'Dna':
        return <Dna className="w-7 h-7 text-[#0F3020]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-7 h-7 text-amber-700" />;
      default:
        return <Users className="w-7 h-7 text-[#0F3020]" />;
    }
  };

  return (
    <div className="space-y-0">
      {/* 1. Hero - Compact & Balanced */}
      <section className="bg-[#0F3020] text-white py-10 sm:py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=2000&q=80"
            alt="Agricultural training at Moo & More Farm"
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
            Knowledge Transfer &amp; Innovation
          </span>
          <h1 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            Community Training &amp; Technology
          </h1>
          <p className="text-xs sm:text-sm text-stone-200 max-w-2xl mx-auto leading-relaxed">
            Empowering Western Kenya’s smallholder farmers through science-backed workshops, digital cattle monitoring, and accessible genetics.
          </p>
        </motion.div>
      </section>

      {/* 2. Four Pillar Cards - Animated */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="font-script text-[#15803D] text-xl sm:text-2xl font-bold block mb-1">
            Sustainable Agricultural Development
          </span>
          <h2 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F3020]">
            Four Pillars of Farm Modernization
          </h2>
          <p className="mt-2 text-stone-600 text-xs sm:text-sm">
            We operate our Dadira farm not as an isolated commercial facility, but as a living knowledge hub for Western Kenya's dairy ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {COMMUNITY_MODULES.map((mod, idx) => (
            <motion.div
              key={mod.id}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-xs hover:shadow-lg transition-all space-y-4 sm:space-y-5"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#F4F7F4] border border-stone-200 flex items-center justify-center shrink-0">
                  {getIcon(mod.icon)}
                </div>
                <div>
                  <h3 className="font-serif-heading font-bold text-lg sm:text-xl lg:text-2xl text-[#0F3020]">
                    {mod.title}
                  </h3>
                  <span className="text-xs text-[#15803D] font-semibold uppercase tracking-wider">
                    Community Initiative
                  </span>
                </div>
              </div>

              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                {mod.description}
              </p>

              <div className="pt-2 border-t border-stone-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-2">
                  Core Highlights &amp; Activities:
                </h4>
                <div className="space-y-2">
                  {mod.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-stone-700">
                      <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Technology Spotlight: Modern Milking & Cold-Chain - Animated */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F4F7F4] border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-center">
            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -25 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="lg:col-span-6 space-y-4 sm:space-y-5"
            >
              <span className="font-script text-[#15803D] text-xl sm:text-2xl font-bold block">
                Precision Agriculture
              </span>
              <h2 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F3020] leading-tight">
                Automated Milking &amp; Rapid Chill Systems
              </h2>
              <div className="space-y-3.5 text-stone-600 text-xs sm:text-sm leading-relaxed">
                <p>
                  At Moo &amp; More Dairy Farm, we embrace clean agricultural engineering to ensure zero cross-contamination. Our automated milking cluster units gently extract milk while logging yield volumes and cow health metrics.
                </p>
                <p>
                  Within 90 seconds of extraction, raw milk enters stainless-steel pipelines into direct-expansion cooling vats, dropping the temperature below 4°C. This immediate cooling halts bacterial proliferation and preserves the natural immunoglobulins, vitamins, and luscious creamy mouthfeel.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-xl bg-white border border-stone-200"
                >
                  <div className="font-serif-heading font-bold text-base sm:text-lg text-[#0F3020]">
                    &lt; 4°C Cold Storage
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                    Continuous digital temperature logging with backup solar generation.
                  </p>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-xl bg-white border border-stone-200"
                >
                  <div className="font-serif-heading font-bold text-base sm:text-lg text-[#0F3020]">
                    Zero Contact Milking
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                    Sterile closed-loop extraction directly to food-grade churns and bottles.
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
                  src="https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=1000&q=80"
                  alt="Modern clean dairy parlour and pasture management"
                  className="rounded-2xl shadow-xl w-full h-[360px] sm:h-[440px] object-cover"
                />
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="absolute -bottom-4 right-4 sm:right-6 bg-[#0F3020] text-white p-4 sm:p-5 rounded-2xl shadow-xl max-w-xs border border-white/10"
                >
                  <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase mb-1">
                    <Award className="w-4 h-4" />
                    <span>Hygiene First</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-stone-200 leading-relaxed">
                    Compliant with Kenya Bureau of Standards (KEBS) raw and pasteurized milk specifications.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Farmers Workshop Invitation - Animated */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.97 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-[#0F3020] text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl"
        >
          <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-5">
            <span className="font-script text-emerald-300 text-xl sm:text-2xl block">
              Farmer Outreach &amp; Capacity Building
            </span>
            <h3 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold">
              Join Our Next Dairy Demonstration Day in Dadira
            </h3>
            <p className="text-stone-200 text-xs sm:text-sm leading-relaxed">
              Are you a member of a local dairy cooperative, an aspiring livestock farmer, or an agricultural college student? Book a customized group session on silage making, cow housing design, and reproductive management.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate('booking')}
                className="px-5 py-3 sm:px-6 sm:py-3.5 bg-[#15803D] hover:bg-[#166534] text-white font-bold text-xs sm:text-sm rounded-lg transition-colors shadow-md flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Register Group for Farm Field Day</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate('contact')}
                className="px-5 py-3 sm:px-6 sm:py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 rounded-lg transition-colors"
              >
                Inquire on Cooperative Partnerships
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
