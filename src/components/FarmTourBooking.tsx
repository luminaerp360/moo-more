import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FARM_INFO } from '../data/farmData';
import { 
  Calendar, 
  Users, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  Sparkles,
  Award,
  Send
} from 'lucide-react';

export const FarmTourBooking: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    groupType: 'Family' as 'Family' | 'School' | 'Corporate' | 'Individual' | 'Farmers Cooperative',
    groupSize: '4',
    timeSlot: 'Morning (9:00 AM – 11:30 AM)',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const bookingMessage = 
      `*FARM TOUR BOOKING REQUEST — MOO & MORE DAIRY FARM*\n` +
      `------------------------------------\n` +
      `*Visitor Name:* ${formData.name}\n` +
      `*Email:* ${formData.email}\n` +
      `*Phone Number:* ${formData.phone}\n` +
      `*Preferred Date:* ${formData.date}\n` +
      `*Time Slot:* ${formData.timeSlot}\n` +
      `*Group Type:* ${formData.groupType}\n` +
      `*Group Size:* ${formData.groupSize} attendees\n` +
      (formData.notes ? `*Special Notes:* ${formData.notes}\n` : '') +
      `------------------------------------\n` +
      `Please confirm tour availability for Dadira Farm.`;

    const encoded = encodeURIComponent(bookingMessage);
    window.open(`https://wa.me/254711320959?text=${encoded}`, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  const tourFeatures = [
    {
      title: 'Guided Walking Tour',
      desc: 'Led by our experienced farm managers through our open green paddocks and clean barns.'
    },
    {
      title: 'Hands-on Cow & Calf Feeding',
      desc: 'Get close to our gentle Holstein Friesians, learn how we prepare fodder silage, and bottle-feed calves.'
    },
    {
      title: 'Modern Milking Parlour Demo',
      desc: 'See our automated milking equipment, rapid chill storage, and rigorous hygiene protocols in action.'
    },
    {
      title: 'Fresh Milk & Yoghurt Tasting',
      desc: 'Enjoy complimentary tasting cups of morning-chilled cow milk and freshly churned fruit yoghurts.'
    },
    {
      title: 'Livestock Science & Genetics',
      desc: 'Educational presentations on Artificial Insemination (AI), selective breeding, and calf nutrition.'
    },
    {
      title: 'School & Group Friendly',
      desc: 'Structured curricula for primary/secondary schools, university agriculture students, and corporate groups.'
    }
  ];

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header - Compact & Animated */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-3xl mx-auto mb-8 sm:mb-10"
      >
        <span className="font-script text-[#15803D] text-xl sm:text-2xl font-bold block mb-1">
          Experience Countryside Dairy Farming
        </span>
        <h1 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F3020] tracking-tight">
          Book a Guided Farm Tour
        </h1>
        <p className="mt-2 text-stone-600 text-xs sm:text-sm leading-relaxed">
          Step into our Dadira pastures, 7km off Bumala Centre on the Kisumu–Busia Highway. Discover how we produce fresh quality milk every day with love and modern scientific care.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
        {/* Left Side: What Visitors Experience */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs">
            <h3 className="font-serif-heading text-xl font-bold text-[#0F3020] mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#15803D]" />
              <span>What Your Tour Includes</span>
            </h3>

            <div className="space-y-4">
              {tourFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">{feat.title}</h4>
                    <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-stone-100 space-y-2.5 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0F3020] shrink-0" />
                <span>Dadira, 7km off Bumala Centre, Kisumu–Busia Highway</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#0F3020] shrink-0" />
                <span>Tour Slots: Mon–Sat 9:00 AM &amp; 2:00 PM (Duration: ~2 hours)</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#0F3020] shrink-0" />
                <span>Complimentary chilled fresh milk and yoghurt tasting included</span>
              </div>
            </div>
          </div>

          {/* Direct Support Card */}
          <div className="bg-[#0F3020] text-white rounded-2xl p-6 shadow-sm">
            <h4 className="font-serif-heading font-bold text-lg mb-2">Need a Custom School or Corporate Itinerary?</h4>
            <p className="text-xs text-stone-200 mb-4 leading-relaxed">
              We arrange bespoke educational modules, catering, and bus parking for large student groups and institutional visits.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={FARM_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#25D366] text-white text-xs font-bold rounded-lg hover:bg-[#20ba59] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Tour Desk</span>
              </a>
              <a
                href={`tel:${FARM_INFO.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/10 text-white text-xs font-semibold rounded-lg hover:bg-white/20 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call {FARM_INFO.phone}</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Interactive Booking Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="lg:col-span-7"
        >
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-stone-200 shadow-md">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif-heading text-2xl font-bold text-[#0F3020]">
                  Tour Request Prepared!
                </h3>
                <p className="text-stone-600 text-sm max-w-md mx-auto">
                  Your reservation request has been transmitted to our Dadira farm desk. We will confirm your preferred date and send arrival driving directions.
                </p>
                <div className="pt-4 flex items-center justify-center gap-3">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold rounded-lg"
                  >
                    Book Another Date
                  </button>
                  <a
                    href={FARM_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-[#0F3020] text-white text-xs font-bold rounded-lg hover:bg-[#0A2015]"
                  >
                    View Map Directions
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-stone-100 pb-3">
                  <h3 className="font-serif-heading text-xl font-bold text-[#0F3020]">
                    Reserve Your Visit Date
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    No upfront payment required. Instant confirmation via WhatsApp or phone.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Samuel Mutua"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#15803D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +254 711 320959"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#15803D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. samuel@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#15803D]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#15803D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Preferred Tour Time Slot
                    </label>
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#15803D]"
                    >
                      <option value="Morning (9:00 AM – 11:30 AM)">Morning (9:00 AM – 11:30 AM)</option>
                      <option value="Afternoon (2:00 PM – 4:30 PM)">Afternoon (2:00 PM – 4:30 PM)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Group Type
                    </label>
                    <select
                      value={formData.groupType}
                      onChange={(e) => setFormData({ ...formData, groupType: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#15803D]"
                    >
                      <option value="Family">Family / Friends Group</option>
                      <option value="School">School / Educational Field Trip</option>
                      <option value="Farmers Cooperative">Farmers Cooperative / Smallholders</option>
                      <option value="Corporate">Corporate Retreat / Team Building</option>
                      <option value="Individual">Individual / Couple</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Estimated Number of Visitors
                    </label>
                    <input
                      type="number"
                      min="1"
                      placeholder="e.g. 5"
                      value={formData.groupSize}
                      onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#15803D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Special Requests or Questions (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us if you have dietary preferences for the tasting session or specific farming topics of interest..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#15803D]"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="w-full py-3.5 px-6 bg-[#15803D] hover:bg-[#166534] text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
                >
                  <Send className="w-5 h-5" />
                  <span>Submit Tour Reservation (via WhatsApp/Email)</span>
                </motion.button>

                <p className="text-center text-[11px] text-stone-500">
                  By submitting, you agree to our visiting guidelines. All tours comply with farm biosecurity and animal welfare hygiene standards.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
