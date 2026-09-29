import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ProductItem } from '../types';

export interface CartItem {
  id: string; // key: `${product.id}-${selectedSize}`
  product: ProductItem;
  selectedSize: string;
  quantity: number;
  unitPrice: number;
}

interface CartContextValue {
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  checkoutItem: CartItem | null; // If buying a single product directly
  openCart: () => void;
  closeCart: () => void;
  openCheckout: (directProduct?: { product: ProductItem; selectedSize?: string; quantity?: number }) => void;
  closeCheckout: () => void;
  addToCart: (product: ProductItem, selectedSize?: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  setQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const CART_STORAGE_KEY = 'moomore_cart_items';

export function calculateItemPrice(product: ProductItem, size?: string): number {
  const base = product.price || 100;
  if (!size) return base;

  const s = size.toLowerCase();
  if (s.includes('50l') || s.includes('50 litre') || s.includes('dispenser')) {
    return Math.round(base * 38);
  }
  if (s.includes('20l') || s.includes('20 litre') || s.includes('jerrycan')) {
    return Math.round(base * 16);
  }
  if (s.includes('10l') || s.includes('10 litre')) {
    return Math.round(base * 8.5);
  }
  if (s.includes('5l') || s.includes('5 litre')) {
    return Math.round(base * 4.4);
  }
  if (s.includes('2l') || s.includes('2 litre')) {
    return Math.round(base * 1.9);
  }
  if (s.includes('1l') || s.includes('1 litre') || s.includes('1000ml')) {
    return Math.round(base * 1.0);
  }
  if (s.includes('500ml') || s.includes('pouch')) {
    return Math.round(base * 0.55);
  }
  if (s.includes('250ml')) {
    return Math.round(base * 0.35);
  }
  return base;
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutItem, setCheckoutItem] = useState<CartItem | null>(null);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const addToCart = useCallback(
    (product: ProductItem, selectedSize?: string, quantity: number = 1) => {
      const size = selectedSize || product.sizes[0] || 'Standard';
      const itemId = `${product.id}-${size}`;
      const unitPrice = calculateItemPrice(product, size);

      setCart((prev) => {
        const existingIdx = prev.findIndex((item) => item.id === itemId);
        if (existingIdx > -1) {
          const next = [...prev];
          next[existingIdx] = {
            ...next[existingIdx],
            quantity: next[existingIdx].quantity + quantity,
          };
          return next;
        }
        return [
          ...prev,
          {
            id: itemId,
            product,
            selectedSize: size,
            quantity,
            unitPrice,
          },
        ];
      });

      // Auto open cart drawer for immediate visual confirmation
      setIsCartOpen(true);
    },
    [],
  );

  const openCheckout = useCallback(
    (directProduct?: { product: ProductItem; selectedSize?: string; quantity?: number }) => {
      if (directProduct) {
        const size = directProduct.selectedSize || directProduct.product.sizes[0] || '1 Litre';
        const qty = directProduct.quantity || 1;
        addToCart(directProduct.product, size, qty);
      }
      setIsCartOpen(false);
      setIsCheckoutOpen(true);
    },
    [addToCart],
  );

  const closeCheckout = useCallback(() => {
    setIsCheckoutOpen(false);
    setCheckoutItem(null);
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null),
    );
  }, []);

  const setQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item)),
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        isCheckoutOpen,
        checkoutItem,
        openCart,
        closeCart,
        openCheckout,
        closeCheckout,
        addToCart,
        removeFromCart,
        updateQuantity,
        setQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
};
