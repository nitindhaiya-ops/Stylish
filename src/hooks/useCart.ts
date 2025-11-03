// src/hooks/useCart.ts
import { useState } from 'react';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  image?: any;
  size: string;
  color: string;
  quantity: number;
  inStock: boolean;
};

const INITIAL_CART: CartItem[] = [
  {
    id: 'c1',
    name: 'Classic Tee',
    price: 799,
    originalPrice: 999,
    discount: '20% OFF',
    image: require('../assets/img/products/p1.png'),
    size: 'M',
    color: 'Black',
    quantity: 1,
    inStock: true,
  },
  {
    id: 'c2',
    name: 'Bomber Jacket',
    price: 4599,
    originalPrice: 5999,
    discount: '23% OFF',
    image: require('../assets/img/products/p4.png'),
    size: 'L',
    color: 'Navy Blue',
    quantity: 1,
    inStock: true,
  },
  {
    id: 'c3',
    name: 'Floral Dress',
    price: 2599,
    originalPrice: 3299,
    discount: '21% OFF',
    image: require('../assets/img/products/p5.png'),
    size: 'S',
    color: 'Pink',
    quantity: 2,
    inStock: false,
  },
];

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART);

  const updateQuantity = (id: string, quantity: number) => {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
    );
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setItems([]);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 99 : 0;
  const total = subtotal + shipping;
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    shipping,
    total,
    totalItems,
  };
};