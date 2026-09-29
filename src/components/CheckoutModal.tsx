import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useSiteContent } from '../context/ContentContext';
import { ordersApi } from '../services/cms';
import { FARM_INFO } from '../data/farmData';
import { parsePaymentConfig } from '../types';
import {
  X,
  ShoppingBag,
  CheckCircle2,
  Building,
  Phone,
  MapPin,
  Loader2,
  AlertCircle,
  ArrowRight,
  Printer,
  MessageCircle,
  Clock,
  Plus,
  Minus,
  Trash2,
  ChevronLeft,
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  preselectedProductId?: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen: propIsOpen,
  onClose: propOnClose,
}) => {
  const {
    cart,
    cartSubtotal,
    isCheckoutOpen,
    closeCheckout,
    openCart,
    clearCart,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const { productItems, settings } = useSiteContent();
  const paymentConfig = parsePaymentConfig(settings);

  const isModalOpen = Boolean(propIsOpen || isCheckoutOpen);
  const handleClose = () => {
    if (propOnClose) propOnClose();
    closeCheckout();
  };

  // Form Fields
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerLocation, setCustomerLocation] = useState('');
  const [customerType, setCustomerType] = useState<'individual' | 'business'>('individual');
  const [businessName, setBusinessName] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  // Submission & Confirmation state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [placedOrder, setPlacedOrder] = useState<{
    id: string;
    items: typeof cart;
    customerName: string;
    customerPhone: string;
    customerLocation: string;
    totalAmount: number;
    whatsappUrl: string;
    createdAt: string;
  } | null>(null);

  const grandTotal = cartSubtotal;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!customerPhone.trim()) {
      setErrorMessage('Please enter your WhatsApp / phone number.');
      return;
    }

    if (cart.length === 0) {
      setErrorMessage('Your basket is empty. Please add items to your cart before ordering.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      // Resolve valid MongoDB ObjectId for backend schema
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

      const formattedShippingAddress = `${customerName.trim()} | Phone: ${customerPhone.trim()} | Location: ${
        customerLocation.trim() || 'Dadira / Local Pick up'
      }${orderNotes ? ` | Note: ${orderNotes.trim()}` : ''}`;

      const payload = {
        items: cart.map((item) => ({
          productId: resolveProductId(item.product),
          quantity: item.quantity,
          price: item.unitPrice,
          notes: `${item.product.name} (${item.selectedSize})`,
          pricingTier: customerType === 'business' ? 'wholesale' : 'retail',
        })),
        customerType,
        businessName: customerType === 'business' ? businessName : undefined,
        shippingAddress: formattedShippingAddress,
        paymentMethod: 'whatsapp-mpesa',
      };

      // 1. Submit to backend API so it appears in Admin Orders Manager
      const result = await ordersApi.create(payload);
      const orderId = result.id || (result as any)._id || `ORD-${Date.now().toString().slice(-6)}`;
      const refFormatted = `#${String(orderId).slice(-6).toUpperCase()}`;

      // 2. Generate formatted WhatsApp message text
      const itemsListText = cart
        .map(
          (item) =>
            `• ${item.quantity}x ${item.product.name} (${item.selectedSize}) — KSh ${(
              item.unitPrice * item.quantity
            ).toLocaleString()}`,
        )
        .join('\n');

      const paymentSummaryLine =
        paymentConfig.method === 'mpesa_till'
          ? `Lipa na M-Pesa Buy Goods Till: ${paymentConfig.tillNumber}${
              paymentConfig.businessName ? ` (${paymentConfig.businessName})` : ''
            }`
          : paymentConfig.method === 'mpesa_paybill'
          ? `M-Pesa Paybill: ${paymentConfig.paybillNumber} (Account: ${
              paymentConfig.accountNumber || customerName.trim()
            })`
          : paymentConfig.method === 'bank'
          ? `Bank Transfer (${paymentConfig.businessName})`
          : 'Cash on Delivery / Farm Pickup';

      const whatsappMessage = `🥛 *NEW ORDER - MOO & MORE DAIRY FARM*
━━━━━━━━━━━━━━━━━━━━━━
*Order ID:* ${refFormatted}
*Customer:* ${customerName.trim()}
*Phone:* ${customerPhone.trim()}
*Location / Area:* ${customerLocation.trim() || 'Dadira / Local'}
${customerType === 'business' && businessName ? `*Business:* ${businessName.trim()}\n` : ''}${
        orderNotes.trim() ? `*Special Notes:* ${orderNotes.trim()}\n` : ''
      }
*ORDER ITEMS (${cart.reduce((sum, it) => sum + it.quantity, 0)} total):*
${itemsListText}

*TOTAL AMOUNT:* KSh ${grandTotal.toLocaleString()}
*PAYMENT METHOD:* ${paymentSummaryLine}
${paymentConfig.instructions ? `*PAYMENT GUIDE:* ${paymentConfig.instructions}\n` : ''}━━━━━━━━━━━━━━━━━━━━━━
Hello Moo & More Farm, I have placed my order via your website. Kindly confirm packaging and fulfillment. Thank you!`;

      const rawWhatsapp =
        settings?.socialSettings?.whatsapp || settings?.social?.whatsapp || FARM_INFO.phoneRaw;
      const cleanPhone = rawWhatsapp.replace(/[^\d]/g, '');
      const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMessage)}`;

      // 3. Automatically launch WhatsApp in new tab
      window.open(whatsappUrl, '_blank');

      // 4. Update confirmation screen state
      setPlacedOrder({
        id: orderId,
        items: [...cart],
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerLocation: customerLocation.trim() || 'Dadira / Local',
        totalAmount: grandTotal,
        whatsappUrl,
        createdAt: new Date().toISOString(),
      });

      // 5. Clear cart
      clearCart();
    } catch (err: any) {
      console.error('Failed to create order on API:', err);
      setErrorMessage(
        err?.message || 'Could not place your order. Please check your connection and try again.',
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
                {placedOrder ? 'Order Confirmation' : 'Complete Your Farm Dairy Order'}
              </h3>
              <p className="text-[11px] text-emerald-200">
                {placedOrder
                  ? 'Your order is recorded and sent to WhatsApp'
                  : 'Add customer details and send directly to Moo & More on WhatsApp'}
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
                  Your order has been officially registered and sent to{' '}
                  <strong>Moo &amp; More Farm Dispatch</strong> via WhatsApp.
                </p>
              </div>

              {/* Order Reference Badge Strip */}
              <div className="bg-[#F4F7F4] border border-stone-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-bold tracking-wider">
                    Order Reference ID
                  </span>
                  <span className="font-mono font-bold text-sm text-[#0F3020]">
                    #{String(placedOrder.id).slice(-6).toUpperCase()}
                  </span>
                </div>

                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-bold tracking-wider">
                    Status
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full text-[11px]">
                    <Clock className="w-3 h-3" />
                    Sent to WhatsApp
                  </span>
                </div>

                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-bold tracking-wider">
                    Location / Area
                  </span>
                  <span className="font-semibold text-stone-800">
                    {placedOrder.customerLocation}
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
                  {placedOrder.items.map((item) => (
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
                      <div className="font-bold text-stone-900">
                        KSh {(item.unitPrice * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotals & Total */}
                <div className="bg-stone-50/80 px-4 py-3 border-t border-stone-200 space-y-1">
                  <div className="flex justify-between font-bold text-sm text-[#0F3020] pt-1">
                    <span>Grand Total:</span>
                    <span className="text-[#15803D] font-black text-base">
                      KSh {placedOrder.totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Instructions Card */}
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs space-y-2">
                <div className="font-bold text-amber-900 flex items-center justify-between">
                  <span>How to Pay for Your Order:</span>
                  {paymentConfig.businessName && (
                    <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-100 px-2 py-0.5 rounded-md">
                      {paymentConfig.businessName}
                    </span>
                  )}
                </div>
                {paymentConfig.instructions && (
                  <p className="text-amber-800 text-[11px] leading-relaxed">
                    {paymentConfig.instructions}
                  </p>
                )}
                {paymentConfig.method === 'mpesa_till' && paymentConfig.tillNumber && (
                  <div className="bg-white p-2.5 rounded-lg border border-amber-300 font-mono text-xs font-bold text-stone-800 flex items-center justify-between">
                    <span>Lipa na M-Pesa Buy Goods Till:</span>
                    <span className="text-emerald-700 font-black text-sm">
                      {paymentConfig.tillNumber}
                    </span>
                  </div>
                )}
                {paymentConfig.method === 'mpesa_paybill' && paymentConfig.paybillNumber && (
                  <div className="bg-white p-2.5 rounded-lg border border-amber-300 font-mono text-xs font-bold text-stone-800 flex items-center justify-between">
                    <span>M-Pesa Paybill Number:</span>
                    <span className="text-emerald-700 font-black text-sm">
                      {paymentConfig.paybillNumber} (Acc: {paymentConfig.accountNumber || placedOrder.customerName})
                    </span>
                  </div>
                )}
              </div>

              {/* Post-order Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={placedOrder.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Open WhatsApp Conversation Again</span>
                </a>

                <button
                  onClick={() => window.print()}
                  className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>

                <button
                  onClick={resetAndClose}
                  className="px-5 py-3 bg-[#0F3020] hover:bg-[#15803D] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Done / Order More Products
                </button>
              </div>
            </div>
          ) : (
            /* ------------------------------------------------------------- */
            /* 2. ECOMMERCE CHECKOUT & WHATSAPP DISPATCH FORM               */
            /* ------------------------------------------------------------- */
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {errorMessage && (
                <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Cannot place order: </span>
                    {errorMessage}
                  </div>
                </div>
              )}

              {/* Back to add more items shortcut */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    openCart();
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15803D] hover:underline cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>View &amp; Edit Basket Items</span>
                </button>

                <span className="text-xs text-stone-500 font-medium">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'} in your order
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                {/* LEFT COLUMN: Customer Information */}
                <div className="lg:col-span-7 space-y-5">
                  {/* Customer Type Selector */}
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-2">
                      Order Type:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setCustomerType('individual')}
                        className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          customerType === 'individual'
                            ? 'bg-[#0F3020] text-white border-[#0F3020] shadow-xs'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        Individual / Household
                      </button>
                      <button
                        type="button"
                        onClick={() => setCustomerType('business')}
                        className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          customerType === 'business'
                            ? 'bg-[#0F3020] text-white border-[#0F3020] shadow-xs'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        Business / Hotel / Bulk
                      </button>
                    </div>
                  </div>

                  {/* Business Name if commercial */}
                  {customerType === 'business' && (
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Business / Hotel / School Name:
                      </label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          placeholder="e.g. Bumala Sunrise Hotel"
                          className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-1 focus:ring-[#15803D] focus:outline-hidden"
                        />
                      </div>
                    </div>
                  )}

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Joseph Ochieng"
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-1 focus:ring-[#15803D] focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        WhatsApp / Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                        <input
                          type="tel"
                          required
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="e.g. 0711 320 959"
                          className="w-full pl-8 pr-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-1 focus:ring-[#15803D] focus:outline-hidden"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Location / Area / Landmark */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Town / Location / Area / Landmark *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={customerLocation}
                        onChange={(e) => setCustomerLocation(e.target.value)}
                        placeholder="e.g. Busia CBD near Post Office / Bumala Centre / Dadira"
                        className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-1 focus:ring-[#15803D] focus:outline-hidden"
                      />
                    </div>
                    <span className="text-[10px] text-stone-400 mt-1 block">
                      Tell us your town or estate so the farm driver knows where to route your dairy.
                    </span>
                  </div>

                  {/* Special Order Notes */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Special Order Notes / Instructions (Optional):
                    </label>
                    <textarea
                      rows={2}
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      placeholder="e.g. Deliver before 9 AM, chilled cold chain required"
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-1 focus:ring-[#15803D] focus:outline-hidden"
                    />
                  </div>

                  {/* Information Box: WhatsApp & Payment */}
                  <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs space-y-1.5 text-emerald-950">
                    <div className="font-bold flex items-center gap-1.5 text-emerald-900">
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      <span>Instant WhatsApp Dispatch</span>
                    </div>
                    <p className="text-[11px] text-emerald-800 leading-relaxed">
                      When you click <strong>Place Order</strong> below, your items will be recorded
                      in our farm database and a complete order message will immediately open on{' '}
                      <strong>WhatsApp</strong> to Moo &amp; More Farm for quick confirmation and
                      dispatch.
                    </p>
                    <div className="pt-1 text-[11px] font-semibold text-emerald-900">
                      {paymentConfig.method === 'mpesa_till' && (
                        <span>
                          💳 Pay via Lipa na M-Pesa Till: <strong>{paymentConfig.tillNumber}</strong>
                          {paymentConfig.businessName && ` (${paymentConfig.businessName})`}
                          {paymentConfig.acceptCash ? ' or Cash on delivery/pickup.' : '.'}
                        </span>
                      )}
                      {paymentConfig.method === 'mpesa_paybill' && (
                        <span>
                          💳 Pay via M-Pesa Paybill: <strong>{paymentConfig.paybillNumber}</strong>
                          {` (Acc: ${paymentConfig.accountNumber || 'Your Name'})`}
                          {paymentConfig.acceptCash ? ' or Cash.' : '.'}
                        </span>
                      )}
                      {paymentConfig.method === 'cash' && (
                        <span>💵 Pay Cash on Delivery / Farm Pickup.</span>
                      )}
                      {paymentConfig.method === 'bank' && (
                        <span>
                          🏦 Pay via Bank Transfer
                          {paymentConfig.businessName && ` (${paymentConfig.businessName})`}.
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: Order Items Summary */}
                <div className="lg:col-span-5 bg-stone-50 rounded-2xl p-4 sm:p-5 border border-stone-200 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                      <h4 className="font-serif-heading font-bold text-sm text-[#0F3020]">
                        Order Summary
                      </h4>
                      <span className="text-[11px] font-semibold text-stone-500">
                        {cart.length} {cart.length === 1 ? 'item' : 'items'}
                      </span>
                    </div>

                    {/* Items List */}
                    <div className="divide-y divide-stone-200/70 max-h-60 overflow-y-auto pr-1 mt-2">
                      {cart.length === 0 ? (
                        <div className="py-8 text-center text-xs text-stone-500">
                          Your basket is empty. Please add products to order.
                        </div>
                      ) : (
                        cart.map((item) => (
                          <div key={item.id} className="py-2.5 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-10 h-10 rounded-lg object-cover border border-stone-200 shrink-0"
                              />
                              <div className="min-w-0">
                                <h5 className="font-bold text-xs text-stone-900 truncate">
                                  {item.product.name}
                                </h5>
                                <div className="text-[10px] text-stone-500">
                                  {item.selectedSize} • KSh {item.unitPrice}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              {/* Quantity controls */}
                              <div className="flex items-center gap-1 bg-white border border-stone-200 rounded-md p-0.5">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="w-5 h-5 flex items-center justify-center text-stone-600 hover:text-stone-900 cursor-pointer"
                                >
                                  <Minus className="w-2.5 h-2.5" />
                                </button>
                                <span className="w-4 text-center text-xs font-bold text-stone-900">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="w-5 h-5 flex items-center justify-center text-stone-600 hover:text-stone-900 cursor-pointer"
                                >
                                  <Plus className="w-2.5 h-2.5" />
                                </button>
                              </div>

                              <span className="font-bold text-xs text-[#15803D] min-w-[55px] text-right">
                                KSh {(item.unitPrice * item.quantity).toLocaleString()}
                              </span>

                              <button
                                type="button"
                                onClick={() => removeFromCart(item.id)}
                                className="text-stone-400 hover:text-red-600 p-1 cursor-pointer"
                                title="Remove"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Financial Breakdown */}
                  <div className="space-y-3 pt-3 border-t border-stone-200">
                    <div className="space-y-1.5 text-xs text-stone-600">
                      <div className="flex justify-between">
                        <span>Items Subtotal:</span>
                        <span className="font-semibold text-stone-900">
                          KSh {cartSubtotal.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-[#15803D] font-semibold text-[11px]">
                        <span>Payment Terms:</span>
                        <span>
                          {paymentConfig.method === 'mpesa_till'
                            ? `M-Pesa Till ${paymentConfig.tillNumber}`
                            : paymentConfig.method === 'mpesa_paybill'
                            ? `Paybill ${paymentConfig.paybillNumber}`
                            : paymentConfig.method === 'bank'
                            ? 'Bank Transfer'
                            : 'Cash on Delivery'}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline">
                      <span className="font-serif-heading font-bold text-sm text-[#0F3020]">
                        Total Amount:
                      </span>
                      <span className="font-black text-xl text-[#15803D]">
                        KSh {grandTotal.toLocaleString()}
                      </span>
                    </div>

                    {/* WhatsApp Place Order CTA */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting || cart.length === 0}
                      className="w-full py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Recording Order &amp; Opening WhatsApp...</span>
                        </>
                      ) : (
                        <>
                          <MessageCircle className="w-4 h-4" />
                          <span>Place Order &amp; Send via WhatsApp</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>

                    <button
                      type="button"
                      onClick={() => {
                        handleClose();
                        openCart();
                      }}
                      className="w-full py-2 text-center text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                    >
                      + Add More Items to Basket
                    </button>
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
