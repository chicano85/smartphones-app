'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Cart, CartItem } from '../types/cart';

interface CartContextType {
  cart: Cart;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (phoneId: string, color: string, storage: number) => void;
  clearCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart>({ items: [], totalPrice: 0 });
  const [itemCount, setItemCount] = useState(0);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
        setItemCount(parsedCart.items.reduce((total: number, item: CartItem) => total + item.quantity, 0));
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    setItemCount(cart.items.reduce((total, item) => total + item.quantity, 0));
  }, [cart]);

  // Añadir item al carrito
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(prevCart => {
      // Buscar si el item ya existe en el carrito
      const existingItemIndex = prevCart.items.findIndex(
        cartItem => 
          cartItem.phoneId === item.phoneId && 
          cartItem.color === item.color && 
          cartItem.storage === item.storage
      );

      let newItems;
      
      if (existingItemIndex >= 0) {
        // Si existe, incrementar cantidad
        newItems = [...prevCart.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + 1
        };
      } else {
        // Si no existe, añadir nuevo item
        newItems = [...prevCart.items, { ...item, quantity: 1 }];
      }

      // Calcular nuevo precio total
      const newTotalPrice = newItems.reduce(
        (total, item) => total + (item.price * item.quantity), 
        0
      );

      return {
        items: newItems,
        totalPrice: newTotalPrice
      };
    });
  };

  // Eliminar item del carrito
  const removeFromCart = (phoneId: string, color: string, storage: number) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(
        item => 
          !(item.phoneId === phoneId && 
            item.color === color && 
            item.storage === storage)
      );
      
      const newTotalPrice = newItems.reduce(
        (total, item) => total + (item.price * item.quantity), 
        0
      );

      return {
        items: newItems,
        totalPrice: newTotalPrice
      };
    });
  };

  // Limpiar carrito
  const clearCart = () => {
    setCart({ items: [], totalPrice: 0 });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 