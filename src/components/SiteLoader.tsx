import React from 'react';
import { motion } from 'motion/react';
import { BrandLogo } from './BrandLogo';
import { Sparkles, ShieldCheck } from 'lucide-react';

export const SiteLoader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F7F9F6] text-stone-800 select-none overflow-hidden"
    >
      {/* Ambient background glow circles */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
        {/* Animated Brand Emblem Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative mb-6"
        >
          {/* Subtle pulsating halo */}
          <div className="absolute -inset-3 rounded-3xl bg-emerald-500/15 blur-md animate-ping" style={{ animationDuration: '2.5s' }} />
          
          <div className="relative bg-white p-4 rounded-3xl shadow-xl border border-emerald-900/10">
            <BrandLogo size="lg" showTagline={true} />
          </div>
        </motion.div>

        {/* Animated Loading Bar */}
        <div className="w-56 h-1.5 bg-stone-200/80 rounded-full overflow-hidden mb-3 relative">
          <motion.div
            className="absolute top-0 bottom-0 bg-gradient-to-r from-[#0F3020] via-[#15803D] to-[#22C55E] rounded-full"
            initial={{ left: '-40%', width: '40%' }}
            animate={{ left: ['-40%', '100%'], width: ['40%', '50%'] }}
            transition={{
              repeat: Infinity,
              duration: 1.4,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Loading Description */}
        <p className="text-xs font-semibold text-stone-600 flex items-center justify-center gap-1.5 tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-[#15803D] animate-spin" style={{ animationDuration: '4s' }} />
          <span>Fetching farm-fresh dairy from Dadira...</span>
        </p>

        {/* Quality Guarantee Pill */}
        <div className="mt-8 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800/80 bg-emerald-50/80 border border-emerald-200/60 px-3 py-1 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Cold-Chain Guaranteed • 100% Pure Fresh Milk</span>
        </div>
      </div>
    </motion.div>
  );
};
