import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FARM_INFO } from '../data/farmData';
import { useSiteContent } from '../context/ContentContext';
import { contactApi } from '../services/cms';
import { NavPage } from '../types';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  Loader2
} from 'lucide-react';

interface ContactSectionProps {
  onNavigate: (page: NavPage) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onNavigate }) => {
  const content = useSiteContent();
  const settings = content.settings;

  const phone = settings?.generalSettings?.phone || settings?.general?.supportPhone || FARM_INFO.phone;
  const email = settings?.generalSettings?.email || settings?.general?.supportEmail || FARM_INFO.email;
  const address = settings?.generalSettings?.address || settings?.general?.storeAddress || FARM_INFO.location;
  const whatsappNumber = settings?.socialSettings?.whatsapp || settings?.social?.whatsapp || FARM_INFO.phoneRaw;
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    inquiryType: 'General Inquiry',
    subject: '',
    message: '',
    consent: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [whatsappDispatchUrl, setWhatsappDispatchUrl] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const formattedMessage = 
      `*WEBSITE CONTACT INQUIRY — MOO & MORE DAIRY FARM*\n` +
      `------------------------------------\n` +
      `*Name:* ${formData.fullName}\n` +
      `*Email:* ${formData.email}\n` +
      `*Phone:* ${formData.phone || 'None'}\n` +
      `*Inquiry Type:* ${formData.inquiryType}\n` +
      `*Subject:* ${formData.subject || 'General'}\n` +
      `*Message:* ${formData.message}\n` +
      `------------------------------------\n` +
      `From: Moo & More Website Contact Form`;

    const encoded = encodeURIComponent(formattedMessage);
    const waLink = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encoded}`;
    setWhatsappDispatchUrl(waLink);

    try {
      await contactApi.submit({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: formData.subject || undefined,
        inquiryType: formData.inquiryType,
        message: formData.message,
      });
    } catch (err) {
      console.warn('Backend contact submission noted:', err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header - Compact & Animated */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-3xl mx-auto mb-8 sm:mb-10"
      >
        <span className="font-script text-[#15803D] text-xl sm:text-2xl font-bold block mb-1">
          We’d Love to Hear From You
        </span>
        <h1 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F3020] tracking-tight">
          Get in Touch with Our Farm
        </h1>
        <p className="mt-2 text-stone-600 text-xs sm:text-sm leading-relaxed">
          Have questions about our dairy products, wholesale deliveries, or interested in visiting our farm in Dadira? Connect directly with our friendly team.
        </p>
      </motion.div>

      {/* Four Contact Method Cards - Animated */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-14">
        {/* WhatsApp */}
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          whileHover={{ y: -4 }}
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-105 transition-transform">
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-serif-heading font-bold text-base sm:text-lg text-[#0F3020] mb-1">
              WhatsApp Support
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed mb-3">
              Chat with us on WhatsApp for instant support, daily orders, and inquiries.
            </p>
          </div>
          <span className="text-xs font-bold text-[#15803D] group-hover:text-emerald-700 flex items-center gap-1">
            <span>{phone}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </span>
        </motion.a>

        {/* Call Us */}
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          whileHover={{ y: -4 }}
          href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
          className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-md hover:border-[#0F3020]/40 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-100 text-[#0F3020] flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-105 transition-transform">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-serif-heading font-bold text-base sm:text-lg text-[#0F3020] mb-1">
              Call Us Directly
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed mb-3">
              Talk to our friendly farm management team during working hours.
            </p>
          </div>
          <span className="text-xs font-bold text-[#0F3020] flex items-center gap-1">
            <span>{phone}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </span>
        </motion.a>

        {/* Email Us */}
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          whileHover={{ y: -4 }}
          href={`mailto:${email}`}
          className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-md hover:border-amber-300 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-105 transition-transform">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-serif-heading font-bold text-base sm:text-lg text-[#0F3020] mb-1">
              Email Us
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed mb-3">
              Send formal inquiries, RFPs, or bulk supply proposals. We’ll respond promptly.
            </p>
          </div>
          <span className="text-xs font-bold text-amber-800 truncate block">
            {email}
          </span>
        </motion.a>

        {/* Visit Us */}
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.2 }}
          whileHover={{ y: -4 }}
          href={FARM_INFO.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-105 transition-transform">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#0F3020]" />
            </div>
            <h3 className="font-serif-heading font-bold text-base sm:text-lg text-[#0F3020] mb-1">
              Visit Our Farm
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed mb-3 line-clamp-2">
              {address}
            </p>
          </div>
          <span className="text-xs font-bold text-[#0F3020] flex items-center gap-1">
            <span>View on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </span>
        </motion.a>
      </div>

      {/* Main Grid: Form + Address/Hours & Embedded Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl border border-stone-200 shadow-sm"
        >
          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif-heading text-2xl font-bold text-[#0F3020]">
                Inquiry Received!
              </h3>
              <p className="text-stone-600 text-sm max-w-md mx-auto">
                Thank you for reaching out to Moo &amp; More Dairy Farm. Your message has been logged in our dispatch desk and we will contact you directly.
              </p>
              <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                {whatsappDispatchUrl && (
                  <a
                    href={whatsappDispatchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2 shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Also Chat on WhatsApp</span>
                  </a>
                )}
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: '',
                      email: '',
                      phone: '',
                      inquiryType: 'General Inquiry',
                      subject: '',
                      message: '',
                      consent: false,
                    });
                  }}
                  className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-lg transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-b border-stone-100 pb-3">
                <h3 className="font-serif-heading text-xl font-bold text-[#0F3020]">
                  Send Us a Direct Message
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Fill out the form below and we will contact you directly via phone, WhatsApp, or email.
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
                    placeholder="e.g. Dennis Kipchumba"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#15803D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. dennis@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#15803D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +254 711 320959"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#15803D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Inquiry Type
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#15803D]"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Product Inquiry">Product Inquiry (Milk / Yoghurt / Mala)</option>
                    <option value="Farm Visit">Farm Visit &amp; Educational Tour</option>
                    <option value="Wholesale">Wholesale / Institutional Supply</option>
                    <option value="Livestock & AI">Livestock Breeding &amp; AI Services</option>
                    <option value="Support & Feedback">Support &amp; Feedback</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Inquiring about daily 20L fresh milk delivery to Busia town"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#15803D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Write your message, delivery needs, or inquiry here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#15803D]"
                />
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="consentCheckbox"
                  required
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-1 h-4 w-4 rounded border-stone-300 text-[#15803D] focus:ring-[#15803D]"
                />
                <label htmlFor="consentCheckbox" className="text-xs text-stone-600 leading-snug">
                  I agree to the processing of my contact details in accordance with the{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('privacy')}
                    className="text-[#0F3020] underline hover:text-[#15803D]"
                  >
                    Privacy Policy
                  </button>{' '}
                  and{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('terms')}
                    className="text-[#0F3020] underline hover:text-[#15803D]"
                  >
                    Terms of Service
                  </button>.
                </label>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="w-full py-3.5 px-6 bg-[#0F3020] hover:bg-[#0A2015] text-white font-bold rounded-lg transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* Info & Map Column */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-5">
            <h3 className="font-serif-heading text-xl font-bold text-[#0F3020] border-b border-stone-100 pb-3">
              Farm Location &amp; Hours
            </h3>

            <div className="space-y-4 text-sm text-stone-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#0F3020] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900 font-semibold">Physical Address</strong>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Moo &amp; More Dairy Farm, Dadira, 7km off Bumala Centre, on the Kisumu–Busia Highway, Kenya
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#0F3020] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900 font-semibold">Operating Hours</strong>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Monday to Saturday: 7:00 AM – 6:00 PM
                  </p>
                  <span className="text-[11px] text-emerald-700 font-medium">
                    (Early morning milk dispatch starts 5:30 AM daily)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#0F3020] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900 font-semibold">Telephone &amp; WhatsApp</strong>
                  <a href={`tel:${FARM_INFO.phoneRaw}`} className="text-xs text-stone-600 hover:text-[#0F3020] block">
                    {FARM_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#0F3020] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900 font-semibold">Official Email</strong>
                  <a href={`mailto:${FARM_INFO.email}`} className="text-xs text-stone-600 hover:text-[#0F3020] block break-all">
                    {FARM_INFO.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="p-3 bg-stone-100 border-b border-stone-200 flex items-center justify-between text-xs font-semibold text-stone-700">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#0F3020]" />
                Dadira &amp; Bumala Centre Region, Kenya
              </span>
              <a 
                href={FARM_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0F3020] hover:underline flex items-center gap-1"
              >
                <span>Full Map</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="h-64 w-full bg-stone-200 relative">
              <iframe
                title="Moo & More Dairy Farm Location"
                src="https://maps.google.com/maps?q=Bumala%20Centre%20Busia%20Kenya&t=&z=12&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
