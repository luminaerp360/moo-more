import React from 'react';
import { motion } from 'motion/react';
import { BlogSection } from '../components/BlogSection';
import { NavPage } from '../types';
import { BookOpen, Sparkles, Feather } from 'lucide-react';

interface BlogPageProps {
  onNavigate: (page: NavPage) => void;
  onOpenOrder: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate, onOpenOrder }) => {
  return (
    <div className="space-y-0">
      {/* 1. Header Hero - Compact & Scenic */}
      <section className="bg-[#0F3020] text-white py-10 sm:py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=2000&q=80"
            alt="Moo & More Dairy Farm Journal"
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
            Field Notes • Nutrition Science • Farmer Guides
          </span>
          <h1 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Moo &amp; More Farm Blog
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Practical dairy guides, probiotic nutritional science, heifer management, and stories directly from our pastures in Dadira, Kenya.
          </p>
        </motion.div>
      </section>

      {/* 2. Blog Component */}
      <BlogSection 
        onNavigate={onNavigate} 
        onOpenOrder={onOpenOrder} 
        isStandalonePage 
      />
    </div>
  );
};
