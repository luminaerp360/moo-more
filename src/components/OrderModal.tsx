import React, { useState } from 'react';
import { PRODUCTS, FARM_INFO } from '../data/farmData';
import { X, ShoppingBag, Send, Phone, CheckCircle2, MapPin } from 'lucide-react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProductId?: string;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  preselectedProductId
}) => {
  const [selectedProduct, setSelectedProduct] = useState(preselectedProductId || PRODUCTS[0].id);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const currentProduct = PRODUCTS.find(p => p.id === selectedProduct) || PRODUCTS[0];

  const handleWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const sizeChoice = selectedSize || currentProduct.sizes[0];
    const message = 
      `*NEW ORDER — MOO & MORE DAIRY FARM*\n` +
      `------------------------------------\n` +
      `*Product:* ${currentProduct.name}\n` +
      `*Packaging/Size:* ${sizeChoice}\n` +
      `*Quantity:* ${quantity}\n` +
      `*Order Type:* ${deliveryType === 'delivery' ? 'Home/Business Delivery' : 'Farm Pickup (Dadira)'}\n` +
      `*Customer Name:* ${customerName || 'Customer'}\n` +
      `*Phone Number:* ${customerPhone || 'Not provided'}\n` +
      `*Delivery Location:* ${deliveryLocation || 'Dadira / Local Area'}\n` +
      (additionalNotes ? `*Notes:* ${additionalNotes}\n` : '') +
      `------------------------------------\n` +
      `Please confirm availability, price, and estimated delivery time.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/254711320959?text=${encoded}`, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#F4F7F4] border border-stone-200 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-[#0F3020] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="font-serif-heading text-xl font-bold">
                Order Farm-Fresh Dairy
              </h3>
              <p className="text-xs text-emerald-200 mt-0.5">
                Direct dispatch from Dadira, 7km off Bumala Centre • Mon–Sat
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="font-serif-heading text-2xl font-bold text-[#0F3020]">
              Order Transmitted to WhatsApp!
            </h4>
            <p className="text-stone-600 text-sm max-w-md mx-auto">
              Your dairy order details have been prepared for our Dadira dispatch office. Our team will verify stock and reply to confirm delivery arrangements.
            </p>
            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-800 text-sm font-semibold rounded-lg"
              >
                Place Another Order
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-[#0F3020] hover:bg-[#0A2015] text-white text-sm font-bold rounded-lg"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleWhatsAppOrder} className="p-6 space-y-5 text-sm">
            {/* Step 1: Select Product */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                1. Select Product
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PRODUCTS.map(product => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => {
                      setSelectedProduct(product.id);
                      setSelectedSize(product.sizes[0]);
                    }}
                    className={`flex items-start gap-3 p-3 text-left rounded-xl border transition-all ${
                      selectedProduct === product.id
                        ? 'border-[#0F3020] bg-[#0F3020]/5 ring-2 ring-[#0F3020]/20'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-12 h-12 rounded-lg object-cover shrink-0" 
                    />
                    <div className="min-w-0">
                      <div className="font-bold text-stone-900 text-xs truncate">
                        {product.name}
                      </div>
                      <div className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">
                        {product.unitNote}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Size & Quantity */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Package / Size
                </label>
                <select
                  value={selectedSize || currentProduct.sizes[0]}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#15803D]"
                >
                  {currentProduct.sizes.map((s, idx) => (
                    <option key={idx} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Quantity
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 bg-white border border-stone-300 rounded-l-lg font-bold text-stone-700 hover:bg-stone-100"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full h-10 border-y border-stone-300 text-center font-bold text-stone-900 focus:outline-none bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 bg-white border border-stone-300 rounded-r-lg font-bold text-stone-700 hover:bg-stone-100"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Step 3: Fulfillment Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Delivery Preference
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryType('delivery')}
                  className={`p-3 rounded-lg border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    deliveryType === 'delivery'
                      ? 'border-[#0F3020] bg-[#0F3020] text-white'
                      : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>Doorstep / Shop Delivery</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryType('pickup')}
                  className={`p-3 rounded-lg border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    deliveryType === 'pickup'
                      ? 'border-[#0F3020] bg-[#0F3020] text-white'
                      : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Farm Gate Pickup (Dadira)</span>
                </button>
              </div>
            </div>

            {/* Step 4: Contact & Destination */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grace Achieng"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#15803D]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +254 712 345 678"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#15803D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                {deliveryType === 'delivery' ? 'Delivery Address / Town / Landmark *' : 'Pickup Date & Approximate Time'}
              </label>
              <input
                type="text"
                required
                placeholder={deliveryType === 'delivery' ? 'e.g. Bumala Town, Near Main Stage or Kisumu Milimani' : 'e.g. Tomorrow 9:00 AM at Dadira Farm'}
                value={deliveryLocation}
                onChange={(e) => setDeliveryLocation(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#15803D]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Special Instructions (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Daily morning standing order / wholesale pricing request"
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#15803D]"
              />
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-stone-200">
              <a
                href={`tel:${FARM_INFO.phoneRaw}`}
                className="inline-flex items-center gap-2 text-xs text-stone-600 hover:text-[#0F3020] font-semibold"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Prefer to call? {FARM_INFO.phone}</span>
              </a>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold rounded-lg shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Confirm Order via WhatsApp</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
