import React from 'react';
import { motion } from 'motion/react';
import { FARM_INFO, TIMELINE_MILESTONES } from '../data/farmData';
import { useSiteContent } from '../context/ContentContext';
import { NavPage } from '../types';
import { TestimonialSection } from '../components/TestimonialSection';
import { 
  ShieldCheck, 
  Leaf, 
  Heart, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Award, 
  Sparkles,
  UserCheck,
  UserRound
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: NavPage) => void;
  onOpenOrder: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenOrder }) => {
  const content = useSiteContent();

  const aboutHero = content.aboutHero;
  const missionText = content.mission?.description || FARM_INFO.mission;

  const fallbackStats = [
    { value: FARM_INFO.stats.yearsInBusiness, label: 'Years in Business' },
    { value: FARM_INFO.stats.customersCount, label: 'Happy Customers' },
    { value: FARM_INFO.stats.dailyProduction, label: 'Daily Milk Production' },
    { value: FARM_INFO.stats.productsCount, label: 'Dairy Products' },
  ];
  const aboutStats =
    content.companyStats.length > 0
      ? content.companyStats.slice(0, 4).map((s) => ({ value: s.value, label: s.label }))
      : fallbackStats;

  const valueIcons = [ShieldCheck, Leaf, Heart, Users];
  const valueColors = [
    'bg-emerald-100 text-[#0F3020]',
    'bg-emerald-100 text-[#15803D]',
    'bg-amber-100 text-amber-800',
    'bg-emerald-100 text-[#0F3020]',
  ];
  const aboutValues =
    content.companyValues.length > 0
      ? content.companyValues.map((v) => ({ title: v.title, desc: v.description }))
      : FARM_INFO.values;

  const milestones =
    content.milestones.length > 0
      ? content.milestones.map((m) => ({
          year: String(m.year),
          title: m.title,
          description: m.description,
        }))
      : TIMELINE_MILESTONES;

  const team = content.teamItems;

  return (
    <div className="space-y-0">
      {/* 1. Header Hero - Compact & Balanced */}
      <section className="bg-[#0F3020] text-white py-10 sm:py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src={aboutHero?.imageUrl || "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=2000&q=80"}
            alt="Lush green dairy pastures in Dadira"
            className="w-full h-full object-cover"
          />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative max-w-4xl mx-auto text-center space-y-2.5"
        >
          <span className="font-script text-emerald-300 text-lg sm:text-xl font-bold block">
            {aboutHero?.subtitle || 'Our Story & Agricultural Heritage'}
          </span>
          <h1 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            {aboutHero?.title || 'About Moo & More Dairy Farm'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-200 max-w-2xl mx-auto leading-relaxed">
            {aboutHero?.description || "Delivering the freshest dairy products with care for our animals, environment, and your health since 2023."}
          </p>
        </motion.div>
      </section>

      {/* 2. Our Story Section - Animated */}
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
              Founded in 2023
            </span>
            <h2 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F3020] leading-tight">
              A Modern Commercial Dairy Enterprise Rooted in Western Kenya
            </h2>
            <div className="space-y-3.5 text-stone-600 text-xs sm:text-sm leading-relaxed">
              <p>
                Founded in 2023, <strong>Moo &amp; More Dairy Farm Limited</strong> is committed to providing the freshest, most natural dairy products in Kenya. Operating from our farm in <strong>Dadira, 7km off Bumala Centre along the Kisumu–Busia Highway</strong>, we combine time-honoured animal husbandry with modern cold-chain infrastructure.
              </p>
              <p>
                Our herd of healthy, happy cows graze on lush Kenyan pastures, producing milk of exceptional quality every single day. We run zero-compromise hygiene testing at dawn, ensuring that by sunrise, pure unadulterated milk is packaged and rapidly dispatched directly to homes, cafes, and retailers across the region.
              </p>
              <p>
                As a progressive agricultural enterprise, we are dedicated to sustainability, responsible stewardship of Western Kenya’s fertile soil, and uplifting local smallholder farmers through training in artificial insemination and fodder preservation.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F4F7F4] border-l-4 border-[#0F3020] space-y-1">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#0F3020]">
                Our Farm Guarantee
              </h4>
              <p className="text-xs text-stone-700 italic">
                100% pure cow milk with nothing added and nothing taken away. Tested every morning for purity, butterfat density, and freshness.
              </p>
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
                src="https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=1000&q=80"
                alt="Holstein dairy cows on green pasture in Dadira"
                className="rounded-2xl shadow-xl w-full h-[360px] sm:h-[420px] object-cover"
              />
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="absolute -bottom-4 -right-2 sm:right-6 bg-white p-4 sm:p-5 rounded-2xl shadow-xl border border-stone-200 max-w-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-stone-900 text-xs sm:text-sm">
                      Dadira, Kenya
                    </h5>
                    <p className="text-[11px] text-stone-500">
                      Kisumu–Busia Highway, Western Kenya
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Stats Strip - Animated */}
      <section className="bg-[#0F3020] text-white py-8 sm:py-10 px-4 sm:px-6 lg:px-8 border-y border-emerald-900">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
          {aboutStats.map((stat, idx) => (
            <motion.div 
              key={idx}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 15 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="p-3 sm:p-4 rounded-xl bg-white/5"
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

      {/* 4. Mission & Values Section - Animated */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="font-script text-[#15803D] text-xl sm:text-2xl font-bold block mb-1">
            Our Purpose
          </span>
          <h2 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F3020]">
            Mission &amp; Core Operating Values
          </h2>
          <div className="mt-4 p-5 sm:p-6 bg-white rounded-2xl border border-stone-200 shadow-xs max-w-2xl mx-auto">
            <p className="font-serif italic text-stone-800 text-xs sm:text-sm leading-relaxed">
              "{missionText}"
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {aboutValues.map((value, idx) => {
            const ValueIcon = valueIcons[idx % valueIcons.length];
            return (
              <motion.div 
                key={value.title}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${valueColors[idx % valueColors.length]}`}>
                  <ValueIcon className="w-6 h-6" />
                </div>
                <h3 className="font-serif-heading text-lg sm:text-xl font-bold text-[#0F3020]">{value.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 5. "Our Journey" Timeline (2023 - 2026) - Animated */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F4F7F4] border-y border-stone-200/80">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="font-script text-[#15803D] text-xl sm:text-2xl font-bold block mb-1">
              Milestones &amp; Growth
            </span>
            <h2 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F3020]">
              Our Journey Over the Years
            </h2>
            <p className="mt-2 text-stone-600 text-xs sm:text-sm">
              From our first dairy barn in Dadira to a multi-product enterprise supplying Western Kenya.
            </p>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-8 md:before:left-1/2 before:-translate-x-px before:w-0.5 before:bg-stone-300">
            {milestones.map((m, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={m.year}
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`relative flex items-center md:justify-between ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Badge */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#0F3020] text-white flex items-center justify-center font-bold text-xs shadow-md border-4 border-[#F4F7F4] z-10">
                    <Calendar className="w-4 h-4" />
                  </div>

                  {/* Content Box */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="ml-16 md:ml-0 md:w-5/12 bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs"
                  >
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono mb-2">
                      {m.year}
                    </span>
                    <h3 className="font-serif-heading font-bold text-base sm:text-lg text-[#0F3020] mb-1">
                      {m.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {m.description}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Meet Our Team Section - Animated */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="font-script text-[#15803D] text-xl sm:text-2xl font-bold block mb-1">
            The People Behind the Milk
          </span>
          <h2 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F3020]">
            Meet Our Farm Team
          </h2>
          <p className="mt-2 sm:mt-3 text-stone-600 text-xs sm:text-sm leading-relaxed">
            At Moo &amp; More, we are passionate about providing fresh, high-quality dairy products. Our dedicated team works tirelessly to ensure our cows are well cared for and our customers receive the best farm-fresh milk and dairy delights.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {team.map((member, idx) => (
            <motion.div
              key={member.id}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all text-center"
            >
              <div className="h-52 sm:h-60 w-full overflow-hidden relative bg-emerald-50">
                {member.image ? (
                  <>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <span className="absolute bottom-3 left-4 text-xs font-semibold text-white">
                      {member.role}
                    </span>
                  </>
                ) : (
                  <>
                    <div className="w-full h-full flex items-center justify-center">
                      <UserRound className="w-16 h-16 sm:w-20 sm:h-20 text-emerald-600/30" />
                    </div>
                    <span className="absolute bottom-3 left-4 text-xs font-semibold text-[#15803D]">
                      {member.role}
                    </span>
                  </>
                )}
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-serif-heading font-bold text-base sm:text-lg text-[#0F3020]">
                  {member.name}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. Testimonials */}
      <TestimonialSection />

      {/* 8. Call to Action Banner - Animated */}
      <section className="bg-[#0F3020] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 text-center">
        <motion.div 
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.96 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto space-y-4 sm:space-y-6"
        >
          <h2 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold">
            Ready to Experience Fresh Countryside Quality?
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            Whether you need daily milk deliveries in Busia &amp; Kisumu or wish to arrange a guided educational tour of our farm, our team is ready to welcome you.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenOrder}
              className="px-5 py-3 sm:px-6 sm:py-3.5 bg-[#15803D] hover:bg-[#166534] text-white font-bold rounded-lg transition-colors shadow-md text-xs sm:text-sm"
            >
              Order Farm Milk Today
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate('contact')}
              className="px-5 py-3 sm:px-6 sm:py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold border border-white/20 rounded-lg transition-colors text-xs sm:text-sm"
            >
              Get in Touch with Us
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
