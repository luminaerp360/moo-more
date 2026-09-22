import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, FARM_INFO } from '../data/farmData';
import { ProductItem, NavPage, CartItem } from '../types';
import { 
  ShoppingBag, 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  Sparkles,
  MessageCircle,
  X,
  Clock
} from 'lucide-react';

interface ShopPageProps {
  onNavigate: (page: NavPage) => void;
  onOpenOrder: (productId?: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ onNavigate, onOpenOrder }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    'fresh-milk': '1 Litre Pouch / Bottle',
    'handcrafted-yoghurt': '500ml Tub',
    'maziwa-mala': '500ml Bottle',
    'dairy-meal': '50kg Commercial Sack',
    'artisan-butter-cream': '500g Tub'
  });

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'milk', label: 'Fresh Milk' },
    { id: 'yoghurt', label: 'Probiotic Yoghurt' },
    { id: 'mala', label: 'Maziwa Mala' },
    { id: 'feed', label: 'Dairy Feeds' },
    { id: 'artisan', label: 'Butter & Cream' },
  ];

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSizeChange = (productId: string, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleAddToCart = (product: ProductItem) => {
    const size = selectedSizes[product.id] || product.sizes[0];
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(
        item => item.product.id === product.id && item.selectedSize === size
      );
      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += 1;
        return newCart;
      } else {
        return [...prevCart, { product, quantity: 1, selectedSize: size }];
      }
    });
    setIsCartDrawerOpen(true);
  };

  const updateQuantity = (index: number, delta: number) => {
    setCart(prevCart => {
      const newCart = [...prevCart];
      newCart[index].quantity += delta;
      if (newCart[index].quantity <= 0) {
        return newCart.filter((_, i) => i !== index);
      }
      return newCart;
    });
  };

  const removeFromCart = (index: number) => {
    setCart(prevCart => prevCart.filter((_, i) => i !== index));
  };

  const cartTotalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const cartEstimatedTotal = cart.reduce((total, item) => {
    return total + (item.product.price || 100) * item.quantity;
  }, 0);

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    const itemsText = cart
      .map((item, idx) => `${idx + 1}. ${item.product.name} (${item.selectedSize}) x ${item.quantity}`)
      .join('%0A');
    const message = `Hello Moo & More Farm,%0A%0AI would like to place an order from your online farm shop:%0A${itemsText}%0A%0AEstimated Subtotal: KSh ${cartEstimatedTotal.toLocaleString()}%0A%0APlease confirm delivery availability to my location.`;
    window.open(`https://wa.me/254711320959?text=${message}`, '_blank');
  };

  return (
    <div className="space-y-0">
      {/* 1. Header Hero */}
      <section className="bg-[#0F3020] text-white py-10 sm:py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=2000&q=80"
            alt="Moo & More Farm Dairy Shop"
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
            Farm to Doorstep • Fresh Daily
          </span>
          <h1 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Moo &amp; More Farm Shop
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Order pristine cow milk, artisanal probiotic yoghurts, traditional maziwa mala, and high-yield cattle feeds straight from our Dadira pastures.
          </p>

          {/* Quick Trust Highlights */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-stone-200">
            <span className="inline-flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              Morning Dispatch in Busia &amp; Kisumu
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              Bottled Under 12 Hours
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Lab Tested Purity
            </span>
          </div>
        </motion.div>
      </section>

      {/* 2. Shop Controls: Search, Category Filters, Cart Button */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-stone-200">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search milk, yoghurt, mala..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#15803D] focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center flex-wrap justify-center gap-1.5 sm:gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#0F3020] text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:border-emerald-500 hover:bg-stone-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Cart Drawer Trigger */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsCartDrawerOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold rounded-lg shadow-xs transition-colors shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Farm Cart</span>
            {cartTotalItems > 0 && (
              <span className="bg-amber-400 text-stone-900 px-2 py-0.5 rounded-full text-[10px] font-black">
                {cartTotalItems}
              </span>
            )}
          </motion.button>
        </div>

        {/* 3. Product Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-8">
          {filteredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Product Image & Badge */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-stone-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-stone-950 shadow-xs">
                      {product.badge}
                    </span>
                  )}

                  <span className="absolute bottom-3 left-3 text-xs font-bold text-white bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded">
                    {product.unitNote}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif-heading font-bold text-lg sm:text-xl text-[#0F3020] leading-tight">
                      {product.name}
                    </h3>
                    <div className="text-right shrink-0">
                      <span className="text-base sm:text-lg font-black text-[#15803D]">
                        {product.priceNote || `KSh ${product.price?.toLocaleString()}`}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                    {product.shortDesc}
                  </p>

                  {/* Size Selector */}
                  <div className="pt-2">
                    <label className="text-[11px] font-bold text-stone-700 block mb-1">
                      Select Package Size:
                    </label>
                    <select
                      value={selectedSizes[product.id] || product.sizes[0]}
                      onChange={(e) => handleSizeChange(product.id, e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-[#15803D]"
                    >
                      {product.sizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Feature Bullets */}
                  <ul className="space-y-1 pt-1 text-[11px] text-stone-600">
                    {product.features.slice(0, 2).map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 border-t border-stone-100 flex items-center gap-2 mt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 py-2.5 bg-[#0F3020] hover:bg-[#15803D] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onOpenOrder(product.id)}
                  className="px-3 py-2.5 bg-stone-100 hover:bg-stone-200 text-[#0F3020] text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  title="Quick Direct Order"
                >
                  Order Direct
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-16 text-center text-stone-500">
            <p className="text-base font-semibold">No products found matching your search.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-3 text-xs font-bold text-[#15803D] hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* 4. Slide-Over Cart Drawer */}
      <AnimatePresence>
        {isCartDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartDrawerOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-xs"
            />

            {/* Slide-out Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-white z-50 shadow-2xl flex flex-col justify-between border-l border-stone-200"
            >
              {/* Drawer Header */}
              <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#0F3020]" />
                  <h3 className="font-serif-heading font-bold text-base text-[#0F3020]">
                    Your Farm Cart ({cartTotalItems})
                  </h3>
                </div>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="p-1 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {cart.length === 0 ? (
                  <div className="py-16 text-center text-stone-400 space-y-2">
                    <ShoppingBag className="w-10 h-10 mx-auto stroke-1 opacity-40" />
                    <p className="text-sm font-medium">Your farm cart is empty.</p>
                    <p className="text-xs text-stone-400">Add fresh milk, yoghurt, or feeds to begin.</p>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}`}
                      className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200/80 gap-3"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-lg object-cover border border-stone-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs text-stone-900 truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-stone-500 truncate">
                          {item.selectedSize}
                        </p>
                        <p className="text-xs font-bold text-[#15803D]">
                          KSh {((item.product.price || 100) * item.quantity).toLocaleString()}
                        </p>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-md border border-stone-200">
                        <button
                          onClick={() => updateQuantity(idx, -1)}
                          className="text-stone-600 hover:text-black p-0.5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold px-1">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(idx, 1)}
                          className="text-stone-600 hover:text-black p-0.5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(idx)}
                        className="text-stone-400 hover:text-red-600 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer / Checkout */}
              {cart.length > 0 && (
                <div className="p-4 border-t border-stone-200 bg-stone-50 space-y-3">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-stone-600 font-medium">Estimated Total:</span>
                    <span className="text-base font-black text-[#0F3020]">
                      KSh {cartEstimatedTotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleWhatsAppCheckout}
                      className="w-full py-3 bg-[#15803D] hover:bg-[#166534] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-200" />
                      <span>Order via WhatsApp Direct</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsCartDrawerOpen(false);
                        onOpenOrder();
                      }}
                      className="w-full py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      <span>Fill Delivery Order Form</span>
                    </motion.button>
                  </div>

                  <p className="text-[10px] text-center text-stone-500">
                    Payment via M-Pesa Till upon delivery or confirmation.
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
