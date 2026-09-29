import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    isCartOpen,
    closeCart,
    openCheckout,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const freeDeliveryThreshold = 2500;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeDeliveryThreshold) * 100));
  const amountToFreeDelivery = Math.max(0, freeDeliveryThreshold - cartSubtotal);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-stone-200"
            >
              {/* Drawer Header */}
              <div className="px-5 py-4 border-b border-stone-200 bg-[#F4F7F4] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#0F3020] text-emerald-300 flex items-center justify-center shadow-xs">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif-heading font-bold text-base text-[#0F3020]">
                      Your Dairy Basket
                    </h3>
                    <p className="text-[11px] text-stone-500 font-medium">
                      {cartCount} {cartCount === 1 ? 'item' : 'items'} ready for fresh dispatch
                    </p>
                  </div>
                </div>

                <button
                  onClick={closeCart}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors cursor-pointer"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Delivery Incentive Bar */}
              <div className="px-5 py-2.5 bg-emerald-50/70 border-b border-emerald-100 text-xs text-emerald-950">
                <div className="flex items-center justify-between text-[11px] font-semibold mb-1">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#15803D]" />
                    {amountToFreeDelivery > 0 ? (
                      <span>
                        Add <strong>KSh {amountToFreeDelivery.toLocaleString()}</strong> more for{' '}
                        <span className="text-[#15803D] font-bold">Free Regional Delivery</span>
                      </span>
                    ) : (
                      <span className="text-[#15803D] font-bold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        You've unlocked Free Regional Delivery!
                      </span>
                    )}
                  </span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="w-full bg-emerald-200/60 h-1.5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="bg-[#15803D] h-full rounded-full"
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                {cart.length === 0 ? (
                  <div className="py-20 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                      <ShoppingBag className="w-8 h-8 stroke-1" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif-heading font-bold text-base text-[#0F3020]">
                        Your basket is empty
                      </h4>
                      <p className="text-xs text-stone-500 max-w-xs mx-auto">
                        Explore our farm-fresh raw milk, pasteurized whole milk, live yoghurts, and dairy cattle feeds.
                      </p>
                    </div>
                    <button
                      onClick={closeCart}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0F3020] hover:bg-[#15803D] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      <span>Explore Dairy Products</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-2xs hover:border-emerald-500/30 transition-all flex items-center gap-3"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-14 h-14 rounded-lg object-cover border border-stone-200 shrink-0 bg-stone-50"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs text-stone-900 truncate">
                          {item.product.name}
                        </h4>
                        <div className="inline-block px-2 py-0.5 mt-0.5 rounded-md bg-stone-100 text-[10px] font-semibold text-stone-600">
                          {item.selectedSize}
                        </div>
                        <div className="mt-1 flex items-baseline gap-1.5">
                          <span className="text-xs font-bold text-[#15803D]">
                            KSh {(item.unitPrice * item.quantity).toLocaleString()}
                          </span>
                          {item.quantity > 1 && (
                            <span className="text-[10px] text-stone-400">
                              (KSh {item.unitPrice.toLocaleString()} each)
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1 bg-[#F4F7F4] border border-stone-200 rounded-lg p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-white rounded transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-white rounded transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer shrink-0"
                        title="Remove product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Drawer Footer & Checkout CTA */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-stone-200 bg-[#F4F7F4] space-y-3.5">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-stone-600">
                      <span>Subtotal ({cartCount} items):</span>
                      <span className="font-semibold text-stone-900">
                        KSh {cartSubtotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-stone-600">
                      <span>Cold-Chain Packing:</span>
                      <span className="text-emerald-700 font-semibold">Included Free</span>
                    </div>
                    <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
                      <span className="font-bold text-sm text-[#0F3020]">Total Amount:</span>
                      <span className="font-black text-lg text-[#15803D]">
                        KSh {cartSubtotal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => openCheckout()}
                      className="w-full py-3 bg-[#0F3020] hover:bg-[#15803D] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-300" />
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>

                    <button
                      onClick={closeCart}
                      className="w-full py-2 text-center text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                    >
                      Continue Shopping
                    </button>
                  </div>

                  <div className="pt-1 flex items-center justify-center gap-3 text-[10px] text-stone-500">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      M-Pesa Verified
                    </span>
                    <span>•</span>
                    <span>Direct Farm Dispatch</span>
                    <span>•</span>
                    <span>Doorstep Delivery</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
