import React from 'react';
import { motion } from 'motion/react';
import { FARM_INFO } from '../data/farmData';
import { useSiteContent } from '../context/ContentContext';
import { NavPage } from '../types';
import { FarmTourBooking } from '../components/FarmTourBooking';
import { 
  MapPin, 
  Clock, 
  Calendar, 
  Leaf, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  HeartHandshake, 
  ArrowRight,
  Sun,
  Droplets,
  CheckCircle2,
  ShoppingBag,
  Tractor,
  ChevronRight
} from 'lucide-react';

interface OurFarmPageProps {
  onNavigate: (page: NavPage) => void;
  onOpenOrder: (productId?: string) => void;
}

export const OurFarmPage: React.FC<OurFarmPageProps> = ({ onNavigate, onOpenOrder }) => {
  const content = useSiteContent();
  const services = content.serviceItems;

  const fallbackStats = [
    { value: '500+ L', label: 'Morning Milk Yield' },
    { value: '<4°C', label: 'Rapid Chilling Standard' },
    { value: '1,200+', label: 'Happy Homes & Cafes' },
    { value: '100%', label: 'Organic Pasture & Biogas' },
  ];
  const farmStats =
    content.companyStats.length > 0
      ? content.companyStats.slice(0, 4).map((s) => ({ value: s.value, label: s.label }))
      : fallbackStats;

  const farmPillars = [
    {
      title: 'Pedigree Herd Genetics',
      subtitle: 'Holstein Friesian & Jersey Crosses',
      desc: 'Selected for high butterfat, disease resistance in tropical conditions, and gentle temperament. Each cow has individualized identification and health records.',
      image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80',
      tag: 'Genetics & Welfare'
    },
    {
      title: 'Modern Milking & Cold-Chain',
      subtitle: 'Chilled <4°C in 15 Minutes',
      desc: 'Our automated stainless-steel milking system ensures zero direct human contact with raw milk, piping it instantly into our refrigerated bulk chilling vats.',
      image: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=800&q=80',
      tag: 'Hygiene & Technology'
    },
    {
      title: 'Nutritious Silage & Forage',
      subtitle: 'Napier Grass & Boma Rhodes',
      desc: 'We cultivate our own high-protein fodder and conserve corn silage in bunker silos, guaranteeing balanced nutrition across dry and rainy seasons alike.',
      image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80',
      tag: 'Pasture Management'
    },
    {
      title: 'Circular Biogas Ecology',
      subtitle: 'Zero-Waste Farming',
      desc: 'Animal manure is fed directly into our anaerobic bio-digester, generating clean renewable cooking fuel and nutrient-rich liquid organic fertilizer for our pastures.',
      image: 'https://images.unsplash.com/photo-1595085610896-fb31c7e64a9c?auto=format&fit=crop&w=800&q=80',
      tag: 'Sustainability'
    }
  ];

  return (
    <div className="space-y-0">
      {/* 1. Hero Header - Scenic Dadira Farm */}
      <section className="bg-[#0F3020] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=2000&q=80"
            alt="Moo & More Dairy Farm Pastures in Dadira"
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
            Dadira, Bumala • Busia County, Kenya
          </span>
          <h1 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Our Farm &amp; Pastures
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Welcome to the fertile countryside of Dadira, where healthy cattle, sustainable agronomy, and modern cold-chain dairy processing combine to set new standards in Kenyan agriculture.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-stone-200">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              7km off Bumala Centre, Kisumu–Busia Hwy
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              Open for Visits: Mon–Sat 7AM–6PM
            </span>
          </div>
        </motion.div>
      </section>

      {/* 2. Farm At A Glance Stats (from API / fallback) */}
      <section className="py-8 bg-stone-100 border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {farmStats.map((stat, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
                <span className={`font-serif-heading text-2xl sm:text-3xl font-black block ${idx % 2 === 0 ? 'text-[#0F3020]' : 'text-[#15803D]'}`}>
                  {stat.value}
                </span>
                <span className="text-[11px] text-stone-600 uppercase font-semibold tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Farm Services Section (Loaded live from /farm-services API) */}
      {services.length > 0 && (
        <section className="py-14 sm:py-18 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="font-script text-[#15803D] text-lg font-bold block">
              What We Do
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#0F3020]">
              Our Farm Services &amp; Operations
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
              Live agricultural services managed directly by Moo &amp; More Farm in Dadira.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((srv, idx) => (
              <motion.div
                key={srv.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="h-44 w-full overflow-hidden relative">
                    <img
                      src={srv.image}
                      alt={srv.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 bg-[#0F3020]/80 backdrop-blur-xs text-white text-[10px] font-bold uppercase rounded tracking-wider">
                        Service 0{idx + 1}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="font-serif-heading font-bold text-lg text-[#0F3020]">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                      {srv.fullDesc || srv.shortDesc}
                    </p>
                    {srv.features && srv.features.length > 0 && (
                      <ul className="pt-2 space-y-1 text-[11px] text-stone-600">
                        {srv.features.slice(0, 3).map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-[#15803D] shrink-0" />
                            <span className="line-clamp-1">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0">
                  {srv.id === 'fresh-milk-supply' ? (
                    <button
                      onClick={() => onOpenOrder('fresh-milk')}
                      className="w-full py-2 px-3 bg-[#0F3020] hover:bg-[#15803D] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Order Fresh Milk</span>
                    </button>
                  ) : srv.id === 'dairy-products' ? (
                    <button
                      onClick={() => onOpenOrder('handcrafted-yoghurt')}
                      className="w-full py-2 px-3 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Order Dairy Delights</span>
                    </button>
                  ) : srv.id === 'farm-visits' ? (
                    <button
                      onClick={() => onNavigate('booking')}
                      className="w-full py-2 px-3 bg-[#0F3020] hover:bg-[#15803D] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Book Guided Tour</span>
                    </button>
                  ) : (
                    <a
                      href={`https://wa.me/254711320959?text=${encodeURIComponent(`Hello Moo & More Farm, I am inquiring about ${srv.title}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 border border-[#0F3020] text-[#0F3020] hover:bg-[#0F3020] hover:text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Inquire on WhatsApp</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 4. Four Core Pillars of Dadira Farm */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="font-script text-[#15803D] text-lg font-bold block">
            How We Operate
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#0F3020]">
            Pillars of Excellence at Dadira
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            From the soil we cultivate to the gentle care of our heifers, every detail at Moo &amp; More Farm is designed for maximum quality, hygiene, and environmental respect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {farmPillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="h-56 relative overflow-hidden bg-stone-100">
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 text-[#0F3020] backdrop-blur-xs">
                  {pillar.tag}
                </span>
              </div>

              <div className="p-6 sm:p-7 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-emerald-700 block uppercase tracking-wider">
                    {pillar.subtitle}
                  </span>
                  <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-[#0F3020]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pt-2">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Farm Location & Directions */}
      <section className="bg-stone-50 py-12 px-4 sm:px-6 lg:px-8 border-y border-stone-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="font-script text-[#15803D] text-lg font-bold block">
              Getting Here
            </span>
            <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#0F3020]">
              Visit Us in Dadira, Bumala
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              We welcome visitors, student delegations, prospective commercial partners, and families! Located just 7 kilometres off Bumala Centre along the bustling Kisumu–Busia Highway.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-stone-700">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900">Physical Address</strong>
                  <span>Dadira, 7km off Bumala Centre, Kisumu–Busia Highway, Busia County, Kenya</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900">Visiting Hours</strong>
                  <span>Monday through Saturday: 7:00 AM – 6:00 PM (Prior tour booking recommended)</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Leaf className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900">Biosecurity &amp; Sanitation</strong>
                  <span>Visitors are provided with footbath sanitation upon entry to protect herd health.</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={FARM_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-[#0F3020] hover:bg-[#15803D] text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Open Google Maps Directions</span>
              </a>
              <button
                onClick={() => onNavigate('contact')}
                className="px-4 py-2.5 bg-white border border-stone-300 hover:bg-stone-100 text-stone-800 text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Contact Farm Desk
              </button>
            </div>
          </div>

          {/* Map Preview Embed */}
          <div className="rounded-2xl overflow-hidden border border-stone-300 shadow-sm h-72 sm:h-80 bg-stone-200">
            <iframe
              title="Moo & More Dairy Farm Location"
              src={FARM_INFO.embedMapUrl}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* 5. Book a Farm Tour Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <FarmTourBooking />
      </section>
    </div>
  );
};
