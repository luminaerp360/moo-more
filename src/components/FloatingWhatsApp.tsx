import React, { useState } from 'react';
import { FARM_INFO } from '../data/farmData';
import { useSiteContent } from '../context/ContentContext';
import { MessageCircle, X, Send } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { settings } = useSiteContent();
  const [isOpen, setIsOpen] = useState(false);
  const [userQuery, setUserQuery] = useState('');

  const quickMessages = [
    'Hello, I would like to order fresh milk for home delivery.',
    'Hi Moo & More, what are your bulk wholesale prices?',
    'Hello! How can I book a guided farm tour for my family?',
    'Hi, I would like to inquire about your dairy cattle breeding & AI services.'
  ];

  const rawPhone =
    settings?.socialSettings?.whatsapp ||
    settings?.social?.whatsapp ||
    settings?.generalSettings?.phone ||
    settings?.general?.supportPhone ||
    '254711320959';
  const cleanPhone = rawPhone.replace(/[^\d]/g, '') || '254711320959';

  const handleSendMessage = (textToSend?: string) => {
    const message = textToSend || userQuery || 'Hello Moo & More Dairy Farm, I would like to inquire about your products.';
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${cleanPhone}?text=${encoded}`, '_blank', 'noopener,noreferrer');
    setUserQuery('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Quick Chat Window */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden transition-all animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-[#0F3020] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 p-1 flex items-center justify-center shrink-0">
                <img src="/logo.svg" alt="Moo & More Farm" className="w-8 h-8 object-contain" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">Moo &amp; More Farm Help</h4>
                <p className="text-[11px] text-emerald-200 flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Typically replies within minutes • Dadira Farm
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-[#F4F7F4] space-y-3 max-h-72 overflow-y-auto text-xs">
            <div className="bg-white p-3 rounded-xl rounded-tl-none shadow-xs border border-stone-200/80 text-stone-700 leading-relaxed">
              Jambo! 👋 Welcome to <strong className="text-[#0F3020]">Moo &amp; More Dairy Farm</strong> in Dadira. How can our farm team assist you today?
            </div>

            <div className="pt-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 mb-2 block">
                Quick Inquiries:
              </span>
              <div className="space-y-1.5">
                {quickMessages.map((msg, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(msg)}
                    className="w-full text-left p-2 rounded-lg bg-white hover:bg-emerald-50 hover:border-emerald-300 border border-stone-200 text-stone-700 transition-colors text-xs flex items-center justify-between group"
                  >
                    <span className="line-clamp-1">{msg}</span>
                    <Send className="w-3 h-3 text-stone-400 group-hover:text-emerald-600 shrink-0 ml-1.5" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Input & Send */}
          <div className="p-3 bg-white border-t border-stone-200 flex items-center gap-2">
            <input
              type="text"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 text-xs px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:border-[#15803D]"
            />
            <button
              onClick={() => handleSendMessage()}
              className="bg-[#25D366] hover:bg-[#20ba59] text-white p-2 rounded-lg transition-colors shrink-0"
              title="Send to WhatsApp"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Floating WhatsApp Bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 group"
        aria-label="Chat on WhatsApp with Moo & More Dairy Farm"
      >
        <MessageCircle className="w-6 h-6 fill-current text-white" />
        <span className="font-bold text-sm hidden sm:inline tracking-wide">
          Chat on WhatsApp
        </span>
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
        </span>
      </button>
    </div>
  );
};
