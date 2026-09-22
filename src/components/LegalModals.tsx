import React from 'react';
import { FARM_INFO } from '../data/farmData';
import { ShieldCheck, FileText, X } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto border border-stone-200 shadow-2xl p-6 sm:p-10 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-2 rounded-lg hover:bg-stone-100"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'privacy' ? (
          <div className="space-y-6 text-stone-700 text-sm leading-relaxed">
            <div className="flex items-center gap-3 border-b border-stone-200 pb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif-heading text-2xl font-bold text-[#0F3020]">
                  Privacy Policy
                </h2>
                <p className="text-xs text-stone-500">
                  Last Updated: 2026 • Moo &amp; More Dairy Farm Limited, Kenya
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-stone-900 text-base mb-1">1. Information We Collect</h3>
              <p>
                When you interact with Moo &amp; More Dairy Farm through our website, contact forms, farm tour bookings, or WhatsApp order channels, we may collect your name, phone number, email address, physical delivery address, and order preferences.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-stone-900 text-base mb-1">2. How We Use Your Data</h3>
              <p>
                Your personal details are used strictly to:
              </p>
              <ul className="list-disc pl-5 mt-1 space-y-1 text-stone-600">
                <li>Coordinate and fulfill doorstep fresh milk and dairy product deliveries.</li>
                <li>Confirm farm tour bookings, school educational visits, and transport directions.</li>
                <li>Respond to customer support inquiries and wholesale quotations.</li>
                <li>Comply with Kenyan agricultural, food safety, and trade regulations.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-stone-900 text-base mb-1">3. Kenyan Data Protection Act Compliance</h3>
              <p>
                We adhere to the provisions of the Kenya Data Protection Act, 2019. We never sell, rent, or lease your personal information to third-party marketing companies. Data is stored securely and accessed only by authorized farm logistics and customer service personnel.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-stone-900 text-base mb-1">4. Contacting Our Data Officer</h3>
              <p>
                For questions regarding your data or to request removal from our subscription delivery records, please contact our administrative desk at{' '}
                <a href={`mailto:${FARM_INFO.email}`} className="text-[#0F3020] underline font-medium">
                  {FARM_INFO.email}
                </a>{' '}
                or by phone at {FARM_INFO.phone}.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6 text-stone-700 text-sm leading-relaxed">
            <div className="flex items-center gap-3 border-b border-stone-200 pb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#0F3020] flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif-heading text-2xl font-bold text-[#0F3020]">
                  Terms of Service
                </h2>
                <p className="text-xs text-stone-500">
                  Last Updated: 2026 • Moo &amp; More Dairy Farm Limited
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-stone-900 text-base mb-1">1. Commercial Overview</h3>
              <p>
                Moo &amp; More Dairy Farm Limited operates a licensed commercial dairy enterprise located in Dadira, 7km off Bumala Centre, along the Kisumu–Busia Highway, Kenya. By purchasing our dairy products or booking farm visits, you agree to these terms.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-stone-900 text-base mb-1">2. Perishable Goods &amp; Cold Chain Care</h3>
              <p>
                Our 100% pure fresh cow milk and handcrafted yoghurts are natural, preservative-free perishable goods. We guarantee unbroken cold-chain storage below 4°C until delivery. Upon receipt, customers must promptly refrigerate products below 4°C to ensure optimal freshness and shelf-life.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-stone-900 text-base mb-1">3. Orders, Wholesale, &amp; Subscriptions</h3>
              <p>
                Prices and packaging sizes are subject to seasonal agricultural adjustments. Wholesale supply contracts are governed by individual delivery schedules and agreed payment terms. Standing subscriptions can be modified or paused with 24 hours advance notice via our WhatsApp dispatch desk.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-stone-900 text-base mb-1">4. Farm Visits &amp; Biosecurity Rules</h3>
              <p>
                To safeguard the health and wellbeing of our dairy herd, all visitors to our Dadira farm must follow guide instructions, use designated foot-bath disinfectant stations upon entry, and treat animals gently. Children must be accompanied by adults at all times.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-stone-900 text-base mb-1">5. Governing Law</h3>
              <p>
                These terms are governed by and construed in accordance with the laws of Kenya. Any disputes shall be subject to the jurisdiction of the courts of Kenya.
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 pt-4 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#0F3020] text-white font-bold text-xs rounded-lg hover:bg-[#0A2015]"
          >
            I Understand &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
};
