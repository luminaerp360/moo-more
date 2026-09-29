import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart, CartItem } from '../context/CartContext';
import { useSiteContent } from '../context/ContentContext';
import { ordersApi } from '../services/cms';
import {
  X,
  ShoppingBag,
  CheckCircle2,
  ShieldCheck,
  Truck,
  Building,
  CreditCard,
  Phone,
  MapPin,
  Loader2,
  AlertCircle,
  ArrowRight,
  Printer,
  MessageCircle,
  Info,
  Clock,
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  preselectedProductId?: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen: propIsOpen,
  onClose: propOnClose,
  preselectedProductId,
}) => {
  const {
    cart,
    cartSubtotal,
    isCheckoutOpen,
    closeCheckout,
    checkoutItem,
    clearCart,
  } = useCart();

  const { productItems } = useSiteContent();

  const isModalOpen = Boolean(propIsOpen || isCheckoutOpen);
  const handleClose = () => {
    if (propOnClose) propOnClose();
    closeCheckout();
  };

  // Determine active checkout items:
  // 1. Direct product selected via prop
  // 2. Direct product selected via openCheckout(directProduct)
  // 3. Or all items in the cart
  const [activeItems, setActiveItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (preselectedProductId) {
      const prod = productItems.find((p) => p.id === preselectedProductId) || productItems[0];
      if (prod) {
        setActiveItems([
          {
            id: `${prod.id}-${prod.sizes[0] || 'Default'}`,
            product: prod,
            selectedSize: prod.sizes[0] || '1 Litre',
            quantity: 1,
            unitPrice: prod.price || 120,
          },
        ]);
        return;
      }
    }

    if (checkoutItem) {
      setActiveItems([checkoutItem]);
    } else if (cart.length > 0) {
      setActiveItems(cart);
    } else if (productItems.length > 0) {
      const defaultProd = productItems[0];
      setActiveItems([
        {
          id: `${defaultProd.id}-${defaultProd.sizes[0] || 'Default'}`,
          product: defaultProd,
          selectedSize: defaultProd.sizes[0] || '1 Litre',
          quantity: 1,
          unitPrice: defaultProd.price || 120,
        },
      ]);
    }
  }, [preselectedProductId, checkoutItem, cart, productItems]);

  // Form Fields
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerType, setCustomerType] = useState<'individual' | 'business'>('individual');
  const [businessName, setBusinessName] = useState('');
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [deliveryTown, setDeliveryTown] = useState('Bumala / Dadira');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'cash' | 'card'>('mpesa');
  const [orderNotes, setOrderNotes] = useState('');

  // Submission & Confirmation state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [placedOrder, setPlacedOrder] = useState<any | null>(null);

  const deliveryFee = deliveryType === 'pickup' ? 0 : 150;
  const itemsSubtotal = activeItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const grandTotal = itemsSubtotal + deliveryFee;

  const updateItemQty = (id: string, delta: number) => {
    setActiveItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null),
    );
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !customerPhone.trim()) {
      setErrorMessage('Please provide your full name and a contact phone number.');
      return;
    }

    if (activeItems.length === 0) {
      setErrorMessage('Your order basket has no items. Please select a product.');
      return;
    }

    if (deliveryType === 'delivery' && !deliveryAddress.trim()) {
      setErrorMessage('Please provide a delivery street, landmark, or location.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      const formattedShippingAddress = `${customerName.trim()} | Phone: ${customerPhone.trim()} | Email: ${
        customerEmail.trim() || 'N/A'
      } | ${
        deliveryType === 'pickup'
          ? 'Farm Pickup at Dadira, Moo & More Gate'
          : `Delivery to ${deliveryTown}: ${deliveryAddress.trim()}`
      }${orderNotes ? ` | Note: ${orderNotes.trim()}` : ''}`;

      const resolveProductId = (product: any): string => {
        const isMongoHex = (val?: string) => Boolean(val && /^[0-9a-fA-F]{24}$/.test(val));
        if (isMongoHex(product?.id)) return product.id;
        if (isMongoHex(product?._id)) return product._id;
        const matched = productItems.find(
          (p) => isMongoHex(p.id) && (p.name.toLowerCase() === (product?.name || '').toLowerCase())
        );
        if (matched && isMongoHex(matched.id)) return matched.id;
        const anyValid = productItems.find((p) => isMongoHex(p.id));
        if (anyValid && isMongoHex(anyValid.id)) return anyValid.id;
        return '6ab5332555982e0b68013043';
      };

      const payload = {
        items: activeItems.map((item) => ({
          productId: resolveProductId(item.product),
          quantity: item.quantity,
          price: item.unitPrice,
          notes: `${item.product.name} (${item.selectedSize})`,
          pricingTier: customerType === 'business' ? 'wholesale' : 'retail',
        })),
        customerType,
        businessName: customerType === 'business' ? businessName : undefined,
        shippingAddress: formattedShippingAddress,
        paymentMethod,
      };

      const result = await ordersApi.create(payload);

      setPlacedOrder({
        id: result._id || (result as any).id || `ORD-${Date.now().toString().slice(-6)}`,
        items: activeItems,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        deliveryType,
        deliveryTown,
        deliveryAddress: deliveryAddress.trim(),
        totalAmount: grandTotal,
        paymentMethod,
        createdAt: new Date().toISOString(),
      });

      // If user checked out the general cart, clear it now
      if (!checkoutItem && !preselectedProductId) {
        clearCart();
      }
    } catch (err: any) {
      console.error('Failed to create order on API:', err);
      setErrorMessage(
        err?.message || 'Could not place your order. Please check your network and try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setPlacedOrder(null);
    setErrorMessage(null);
    handleClose();
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl border border-stone-200 overflow-hidden my-6 flex flex-col max-h-[92vh]"
      >
        {/* Modal Top Header */}
        <div className="bg-[#0F3020] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-emerald-300">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-heading text-lg font-bold">
                {placedOrder ? 'Order Confirmation' : 'Farm-Fresh Dairy Checkout'}
              </h3>
              <p className="text-[11px] text-emerald-200">
                {placedOrder
                  ? 'Your order is recorded and being prepared for fulfillment'
                  : 'Fast doorstep delivery or free Dadira farm gate pickup • Busia County'}
              </p>
            </div>
          </div>

          <button
            onClick={resetAndClose}
            className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7">
          {placedOrder ? (
            /* ------------------------------------------------------------- */
            /* 1. ORDER CONFIRMATION / RECEIPT SCREEN                        */
            /* ------------------------------------------------------------- */
            <div className="space-y-6 max-w-2xl mx-auto py-2">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#15803D] flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="font-serif-heading text-2xl font-bold text-[#0F3020]">
                  Thank You, {placedOrder.customerName}!
                </h4>
                <p className="text-xs text-stone-600 max-w-md mx-auto">
                  Your order has been officially placed with <strong>Moo &amp; More Dairy Farm</strong>.
                  Our dispatch manager has received your request and is packing your fresh dairy.
                </p>
              </div>

              {/* Order Reference Badge Strip */}
              <div className="bg-[#F4F7F4] border border-stone-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-bold tracking-wider">
                    Order Reference ID
                  </span>
                  <span className="font-mono font-bold text-sm text-[#0F3020]">
                    #{String(placedOrder.id).slice(-8).toUpperCase()}
                  </span>
                </div>

                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-bold tracking-wider">
                    Order Status
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full text-[11px]">
                    <Clock className="w-3 h-3" />
                    Confirmed &amp; Queued
                  </span>
                </div>

                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-bold tracking-wider">
                    Fulfillment Method
                  </span>
                  <span className="font-semibold text-stone-800">
                    {placedOrder.deliveryType === 'pickup'
                      ? 'Farm Pickup (Dadira)'
                      : `Delivery to ${placedOrder.deliveryTown}`}
                  </span>
                </div>
              </div>

              {/* Items Table */}
              <div className="border border-stone-200 rounded-xl overflow-hidden text-xs">
                <div className="bg-stone-50 px-4 py-2.5 font-bold text-stone-700 border-b border-stone-200 flex justify-between">
                  <span>Ordered Items</span>
                  <span>Amount</span>
                </div>
                <div className="divide-y divide-stone-100 p-2">
                  {placedOrder.items.map((item: CartItem) => (
                    <div
                      key={item.id}
                      className="px-2 py-2.5 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-10 h-10 rounded-lg object-cover border border-stone-200"
                        />
                        <div>
                          <div className="font-bold text-stone-900">{item.product.name}</div>
                          <div className="text-[11px] text-stone-500">
                            {item.selectedSize} × {item.quantity}
                          </div>
                        </div>
                      </div>
                      <span className="font-bold text-stone-800">
                        KSh {(item.unitPrice * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="bg-stone-50/70 px-4 py-3 border-t border-stone-200 space-y-1 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Delivery Fee:</span>
                    <span>
                      {placedOrder.deliveryType === 'pickup'
                        ? 'FREE (Farm Pickup)'
                        : `KSh ${deliveryFee.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-[#0F3020] pt-1 border-t border-stone-200">
                    <span>Total Amount:</span>
                    <span className="text-[#15803D] text-base">
                      KSh {placedOrder.totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Instructions Box */}
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-xs text-amber-950 space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <CreditCard className="w-4 h-4 text-amber-700" />
                  <span>Payment Instructions</span>
                </div>
                {placedOrder.paymentMethod === 'mpesa' ? (
                  <div className="space-y-1 text-stone-700">
                    <p>
                      Please pay via <strong>Lipa Na M-Pesa (Buy Goods &amp; Services)</strong>:
                    </p>
                    <div className="inline-block bg-white px-3 py-1.5 rounded-lg border border-amber-300 font-mono text-xs font-bold text-[#0F3020]">
                      Till Number: <span className="text-[#15803D] text-sm">5424564</span> • Moo &amp;
                      More Dairy
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1">
                      Our dispatch rider will verify your payment SMS upon delivery, or you can present
                      the SMS when picking up at Dadira farm.
                    </p>
                  </div>
                ) : (
                  <p className="text-stone-700">
                    You selected <strong>Cash on Delivery / Pickup</strong>. Please have the exact
                    amount of <strong>KSh {placedOrder.totalAmount.toLocaleString()}</strong> ready upon
                    receipt.
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="w-full sm:w-auto px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>

                <a
                  href={`https://wa.me/254711320959?text=${encodeURIComponent(
                    `Hello Moo & More Farm, I just placed order #${String(placedOrder.id)
                      .slice(-8)
                      .toUpperCase()} for ${placedOrder.customerName} (KSh ${placedOrder.totalAmount.toLocaleString()}). Please confirm dispatch schedule.`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>

                <button
                  onClick={resetAndClose}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#0F3020] hover:bg-[#15803D] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            /* ------------------------------------------------------------- */
            /* 2. ECOMMERCE CHECKOUT FORM (2-COLUMN MODERN LAYOUT)           */
            /* ------------------------------------------------------------- */
            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* LEFT COLUMN: Customer, Shipping & Payment (7 Cols) */}
              <div className="lg:col-span-7 space-y-5 text-left">
                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* 1. Customer Type Pill Selector */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    1. Account / Order Type
                  </label>
                  <div className="grid grid-cols-2 gap-2 bg-stone-100 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setCustomerType('individual')}
                      className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                        customerType === 'individual'
                          ? 'bg-white text-[#0F3020] shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      Individual / Home Family
                    </button>
                    <button
                      type="button"
                      onClick={() => setCustomerType('business')}
                      className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                        customerType === 'business'
                          ? 'bg-white text-[#0F3020] shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      Commercial / Wholesale
                    </button>
                  </div>
                </div>

                {/* 2. Contact Information */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-stone-700">
                    2. Contact Details
                  </label>

                  {customerType === 'business' && (
                    <div>
                      <input
                        type="text"
                        required
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="Business or Cafe Name (e.g., Acacia Coffee Lounge)"
                        className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#15803D]/20 focus:border-[#15803D]"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Kennedy Ochieng"
                        className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#15803D]/20 focus:border-[#15803D]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                        Phone / M-Pesa Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="0712 345 678"
                        className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#15803D]/20 focus:border-[#15803D]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                      Email Address (Optional, for instant receipt)
                    </label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="kennedy@example.com"
                      className="w-full px-3.5 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#15803D]/20 focus:border-[#15803D]"
                    />
                  </div>
                </div>

                {/* 3. Fulfillment Option */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-stone-700">
                    3. How would you like to receive your dairy?
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <label
                      onClick={() => setDeliveryType('delivery')}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        deliveryType === 'delivery'
                          ? 'border-[#15803D] bg-emerald-50/50 ring-1 ring-[#15803D]'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="fulfillment"
                        checked={deliveryType === 'delivery'}
                        onChange={() => setDeliveryType('delivery')}
                        className="mt-0.5 text-[#15803D] focus:ring-[#15803D]"
                      />
                      <div>
                        <div className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                          <Truck className="w-3.5 h-3.5 text-[#15803D]" />
                          Doorstep Delivery
                        </div>
                        <div className="text-[11px] text-stone-500 mt-0.5">
                          Cold courier dispatch (+KSh 150)
                        </div>
                      </div>
                    </label>

                    <label
                      onClick={() => setDeliveryType('pickup')}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        deliveryType === 'pickup'
                          ? 'border-[#15803D] bg-emerald-50/50 ring-1 ring-[#15803D]'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="fulfillment"
                        checked={deliveryType === 'pickup'}
                        onChange={() => setDeliveryType('pickup')}
                        className="mt-0.5 text-[#15803D] focus:ring-[#15803D]"
                      />
                      <div>
                        <div className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                          <Building className="w-3.5 h-3.5 text-stone-700" />
                          Dadira Farm Pickup
                        </div>
                        <div className="text-[11px] text-emerald-700 font-bold mt-0.5">
                          FREE • Dadira Gate, Bumala
                        </div>
                      </div>
                    </label>
                  </div>

                  {deliveryType === 'delivery' ? (
                    <div className="space-y-2.5 pt-1">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                            Town / Region
                          </label>
                          <select
                            value={deliveryTown}
                            onChange={(e) => setDeliveryTown(e.target.value)}
                            className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#15803D]/20 focus:border-[#15803D] bg-white"
                          >
                            <option value="Bumala / Dadira">Bumala / Dadira (Local)</option>
                            <option value="Busia Town">Busia Town &amp; Environs</option>
                            <option value="Kisumu">Kisumu City &amp; Suburbs</option>
                            <option value="Kakamega">Kakamega Town</option>
                            <option value="Eldoret">Eldoret &amp; Uasin Gishu</option>
                            <option value="Nairobi Delivery Route">Nairobi Regional Depot</option>
                            <option value="Other Kenyan Town">Other (Specified in address)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                            Street, Estate or Landmark *
                          </label>
                          <input
                            type="text"
                            required={deliveryType === 'delivery'}
                            value={deliveryAddress}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
                            placeholder="e.g. Near Bumala Market, House 12"
                            className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#15803D]/20 focus:border-[#15803D]"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-600 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#15803D] shrink-0" />
                      <span>
                        Pick up directly at Moo &amp; More Farm, Dadira, 7km off Bumala Centre,
                        Kisumu–Busia Highway. Open Mon–Sat 7:00 AM – 6:00 PM.
                      </span>
                    </div>
                  )}
                </div>

                {/* 4. Payment Method */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-bold text-stone-700">
                    4. Payment Method
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <label
                      onClick={() => setPaymentMethod('mpesa')}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                        paymentMethod === 'mpesa'
                          ? 'border-[#15803D] bg-emerald-50/50 ring-1 ring-[#15803D]'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'mpesa'}
                        onChange={() => setPaymentMethod('mpesa')}
                        className="text-[#15803D] focus:ring-[#15803D]"
                      />
                      <span className="font-bold text-xs text-stone-900">
                        Lipa na M-Pesa (Till)
                      </span>
                    </label>

                    <label
                      onClick={() => setPaymentMethod('cash')}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                        paymentMethod === 'cash'
                          ? 'border-[#15803D] bg-emerald-50/50 ring-1 ring-[#15803D]'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'cash'}
                        onChange={() => setPaymentMethod('cash')}
                        className="text-[#15803D] focus:ring-[#15803D]"
                      />
                      <span className="font-bold text-xs text-stone-900">
                        Cash on Delivery / Pickup
                      </span>
                    </label>
                  </div>

                  {paymentMethod === 'mpesa' && (
                    <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl text-xs text-emerald-950 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#15803D] shrink-0" />
                        <span>
                          Buy Goods Till: <strong>5424564</strong> (Moo &amp; More Farm)
                        </span>
                      </div>
                      <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-emerald-300 font-semibold text-emerald-800">
                        Instant
                      </span>
                    </div>
                  )}
                </div>

                {/* 5. Special Notes */}
                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                    Order / Delivery Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="e.g. Please call before reaching Dadira junction, or pack in cooler box."
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#15803D]/20 focus:border-[#15803D] resize-none"
                  />
                </div>
              </div>

              {/* RIGHT COLUMN: Order Summary & Placement (5 Cols) */}
              <div className="lg:col-span-5 bg-[#F4F7F4] p-5 rounded-2xl border border-stone-200 flex flex-col justify-between text-left space-y-4">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                    <h4 className="font-serif-heading font-bold text-sm text-[#0F3020]">
                      Order Summary ({activeItems.length}{' '}
                      {activeItems.length === 1 ? 'variety' : 'varieties'})
                    </h4>
                  </div>

                  {/* Items List inside Checkout */}
                  <div className="divide-y divide-stone-200/70 max-h-60 overflow-y-auto pr-1 my-3">
                    {activeItems.map((item) => (
                      <div key={item.id} className="py-2.5 flex items-center justify-between gap-2.5">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-12 h-12 rounded-lg object-cover border border-stone-200 bg-white shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-bold text-xs text-stone-900 truncate">
                            {item.product.name}
                          </h5>
                          <span className="text-[10px] text-stone-500 font-medium">
                            {item.selectedSize}
                          </span>
                          <div className="text-xs font-bold text-[#15803D]">
                            KSh {(item.unitPrice * item.quantity).toLocaleString()}
                          </div>
                        </div>

                        {/* Stepper */}
                        <div className="flex items-center gap-1 bg-white border border-stone-200 rounded-md p-0.5">
                          <button
                            type="button"
                            onClick={() => updateItemQty(item.id, -1)}
                            className="w-5 h-5 flex items-center justify-center text-stone-600 hover:text-black"
                          >
                            -
                          </button>
                          <span className="w-5 text-center text-xs font-bold">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateItemQty(item.id, 1)}
                            className="w-5 h-5 flex items-center justify-center text-stone-600 hover:text-black"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Calculations */}
                  <div className="border-t border-stone-200 pt-3 space-y-2 text-xs">
                    <div className="flex justify-between text-stone-600">
                      <span>Items Subtotal:</span>
                      <span className="font-semibold text-stone-800">
                        KSh {itemsSubtotal.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between text-stone-600">
                      <span>Fulfillment / Delivery:</span>
                      <span className="font-semibold text-stone-800">
                        {deliveryType === 'pickup' ? (
                          <span className="text-emerald-700 font-bold">FREE (Farm Gate)</span>
                        ) : (
                          `KSh ${deliveryFee.toLocaleString()}`
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-stone-600">
                      <span>Cold Chain Packaging:</span>
                      <span className="text-emerald-700 font-bold">Included</span>
                    </div>

                    <div className="pt-2 border-t border-stone-300 flex justify-between items-baseline">
                      <span className="font-bold text-sm text-[#0F3020]">Total Amount:</span>
                      <span className="font-black text-xl text-[#15803D]">
                        KSh {grandTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button & Security Badges */}
                <div className="space-y-2.5 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || activeItems.length === 0}
                    className="w-full py-3.5 bg-[#0F3020] hover:bg-[#15803D] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Confirming &amp; Placing Order...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 text-emerald-300" />
                        <span>Place Order (KSh {grandTotal.toLocaleString()})</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-3 text-[10px] text-stone-500 text-center">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      Guaranteed Fresh
                    </span>
                    <span>•</span>
                    <span>Direct Farm Dispatch</span>
                    <span>•</span>
                    <span>Fast Delivery</span>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
