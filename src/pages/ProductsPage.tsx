import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FARM_INFO } from '../data/farmData';
import { useSiteContent } from '../context/ContentContext';
import { ProductItem, NavPage } from '../types';
import { useCart, calculateItemPrice } from '../context/CartContext';
import { 
  CheckCircle2, 
  ShoppingBag, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Truck, 
  Leaf, 
  Award,
  ArrowRight,
  Info,
  ChevronDown,
  Check
} from 'lucide-react';

interface ProductsPageProps {
  onNavigate: (page: NavPage) => void;
  onOpenOrder: (productId?: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onNavigate, onOpenOrder }) => {
  const products = useSiteContent().productItems;
  const { addToCart, openCart, openCheckout } = useCart();
  const [activeTab, setActiveTab] = useState<'all' | 'milk' | 'yoghurt' | 'mala' | 'feed' | 'artisan'>('all');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [addedSuccess, setAddedSuccess] = useState<Record<string, boolean>>({});

  const getProductSelectedSize = (prod: ProductItem) => {
    return selectedSizes[prod.id] || prod.sizes[0] || '1 Litre';
  };

  const handleSelectSize = (productId: string, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleAddToCart = (product: ProductItem) => {
    const size = getProductSelectedSize(product);
    addToCart(product, size, 1);
    setAddedSuccess(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedSuccess(prev => ({ ...prev, [product.id]: false }));
    }, 2200);
  };

  const handleBuyNow = (product: ProductItem) => {
    const size = getProductSelectedSize(product);
    openCheckout({
      product,
      selectedSize: size,
      quantity: 1,
    });
  };

  const filtered = activeTab === 'all' 
    ? products 
    : products.filter(p => p.category === activeTab);

  // Nutritional & Quality Specs for Products
  const productSpecs: Record<string, { fat: string; protein: string; shelfLife: string; storage: string }> = {
    'fresh-milk': { fat: '3.8% – 4.2% Natural Butterfat', protein: '3.3g / 100ml', shelfLife: '5–7 days chilled below 4°C', storage: 'Keep refrigerated below 4°C immediately' },
    'handcrafted-yoghurt': { fat: '3.5% Whole Milk Fat', protein: '4.2g / 100g', shelfLife: '21 days chilled', storage: 'Store between 2°C – 6°C' },
    'maziwa-mala': { fat: '3.6% Natural Fat', protein: '3.5g / 100ml', shelfLife: '14 days chilled', storage: 'Refrigerate after opening' },
    'dairy-meal': { fat: '4.5% Ether Extract', protein: '16% – 18% Crude Protein', shelfLife: '3 months in dry conditions', storage: 'Store elevated off the ground in a cool dry shed' },
    'artisan-butter-cream': { fat: '82%+ Pure Milk Fat', protein: '0.8g / 100g', shelfLife: '60 days chilled / 6 months frozen', storage: 'Keep refrigerated below 4°C' }
  };

  return (
    <div className="space-y-0">
      {/* 1. Header Hero - Compact & Elegant */}
      <section className="bg-[#0F3020] text-white py-10 sm:py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=2000&q=80"
            alt="Moo & More Dairy Products"
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
            Purity • Nutrition • Transparency
          </span>
          <h1 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Our Dairy Product Line
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Every bottle and tub from Moo &amp; More Farm originates from our grass-fed Holstein Friesian and Jersey herd in Dadira, chilled immediately to preserve nature's finest nutrients.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-stone-200">
            <span className="inline-flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              100% Unadulterated Whole Milk
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Zero Preservatives or Chemical Additives
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              Cold Chain Maintained &lt;4°C
            </span>
          </div>
        </motion.div>
      </section>

      {/* 2. Category Filter Pills */}
      <section className="py-6 bg-white border-b border-stone-200 sticky top-14 z-20 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1 scrollbar-none">
            {[
              { id: 'all', label: 'All Products' },
              { id: 'milk', label: 'Fresh Milk' },
              { id: 'yoghurt', label: 'Handcrafted Yoghurt' },
              { id: 'mala', label: 'Maziwa Mala' },
              { id: 'feed', label: 'Livestock Feed' },
              { id: 'artisan', label: 'Butter & Cream' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#0F3020] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => onNavigate('shop')}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#15803D] hover:underline"
          >
            <span>Visit Quick Shop</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 3. Detailed Product Cards with Specifications */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        {filtered.map((product, idx) => {
          const specs = productSpecs[product.id];
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
                {/* Left: Product Imagery */}
                <div className="lg:col-span-5 h-64 sm:h-80 lg:h-full relative overflow-hidden bg-stone-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.badge && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-400 text-stone-900 shadow-sm">
                      {product.badge}
                    </span>
                  )}
                  <div className="absolute bottom-4 left-4 text-xs font-bold text-white bg-black/60 backdrop-blur-xs px-3 py-1 rounded-lg">
                    {product.unitNote}
                  </div>
                </div>

                {/* Right: Detailed Information */}
                {(() => {
                  const currentSize = getProductSelectedSize(product);
                  const currentPrice = calculateItemPrice(product, currentSize);
                  const isAdded = Boolean(addedSuccess[product.id]);

                  return (
                    <div className="lg:col-span-7 p-6 sm:p-8 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[11px] uppercase font-bold tracking-wider text-[#15803D] bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60">
                          {product.category}
                        </span>
                        <div className="text-right">
                          <span className="text-2xl font-black text-[#0F3020]">
                            KSh {currentPrice.toLocaleString()}
                          </span>
                          <span className="block text-[11px] text-stone-500 font-medium">
                            per {currentSize}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#0F3020]">
                        {product.name}
                      </h3>

                      <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                        {product.fullDesc}
                      </p>

                      {/* Quality & Nutritional Matrix */}
                      {specs && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
                          <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80">
                            <span className="text-[10px] text-stone-500 uppercase block font-semibold">Butterfat / Extract</span>
                            <span className="font-bold text-stone-900 text-xs">{specs.fat}</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80">
                            <span className="text-[10px] text-stone-500 uppercase block font-semibold">Crude Protein</span>
                            <span className="font-bold text-stone-900 text-xs">{specs.protein}</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80">
                            <span className="text-[10px] text-stone-500 uppercase block font-semibold">Freshness Life</span>
                            <span className="font-bold text-stone-900 text-xs">{specs.shelfLife}</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80">
                            <span className="text-[10px] text-stone-500 uppercase block font-semibold">Storage Rule</span>
                            <span className="font-bold text-stone-900 text-xs truncate" title={specs.storage}>{specs.storage}</span>
                          </div>
                        </div>
                      )}

                      {/* Interactive Size Selector */}
                      <div className="pt-1">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-stone-900">
                            Select Packaging Size:
                          </span>
                          <span className="text-[11px] text-[#15803D] font-semibold">
                            {currentSize}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {product.sizes.map((sz, sIdx) => {
                            const isSelected = currentSize === sz;
                            return (
                              <button
                                key={sIdx}
                                type="button"
                                onClick={() => handleSelectSize(product.id, sz)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                                  isSelected
                                    ? 'bg-[#0F3020] text-white border-[#0F3020] shadow-2xs ring-1 ring-[#0F3020]'
                                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-emerald-600 hover:bg-stone-100'
                                }`}
                              >
                                {sz}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Feature Checkpoints */}
                      <div className="pt-2 border-t border-stone-100">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                          {product.features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* eCommerce Actions: Buy Now & Add to Basket */}
                      <div className="pt-4 flex flex-wrap items-center gap-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleBuyNow(product)}
                          className="px-5 py-2.5 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold rounded-lg transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Buy Now • KSh {currentPrice.toLocaleString()}</span>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAddToCart(product)}
                          className={`px-4 py-2.5 text-xs font-bold rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
                            isAdded
                              ? 'bg-emerald-50 text-[#15803D] border-[#15803D]'
                              : 'bg-white hover:bg-stone-50 text-[#0F3020] border-stone-300'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#15803D]" />
                              <span>Added to Basket!</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Add to Basket</span>
                            </>
                          )}
                        </motion.button>

                        <button
                          onClick={() => onOpenOrder(product.id)}
                          className="text-xs font-semibold text-stone-500 hover:text-[#15803D] hover:underline cursor-pointer ml-auto"
                        >
                          Commercial / Bulk Inquiry
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* 4. Quality Standards Banner */}
      <section className="bg-[#0F3020] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold">
            Looking for Bulk Commercial Dairy Supplies?
          </h3>
          <p className="text-stone-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            We supply hotels, cafes, bakeries, boarding schools, and retail distributors with guaranteed morning cold-chain delivery of 50L to 500L+ batches daily.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => onOpenOrder('fresh-milk')}
              className="px-6 py-3 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold rounded-lg shadow-md transition-colors cursor-pointer"
            >
              Request Bulk B2B Pricing
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg border border-white/20 transition-colors cursor-pointer"
            >
              Talk with Our Farm Logistics Desk
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
