'use client';

import { CartItem } from '@/types/phone';
import { createContext, useContext, useEffect, useState } from 'react';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
}

// Valor por defecto para el contexto
const defaultCartContext: CartContextType = {
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
};

const CartContext = createContext<CartContextType>(defaultCartContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  // Inicializamos cart como un array vacío
  const [cart, setCart] = useState<CartItem[]>([]);

  // Cargar el carrito desde localStorage al iniciar
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        }
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }, []);

  // Guardar el carrito en localStorage cuando cambie
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }, [cart]);

  const addToCart = (item: CartItem) => {
    // Verificar si el producto ya está en el carrito con las mismas opciones
    const existingItemIndex = cart.findIndex(
      (cartItem) =>
        cartItem.phoneId === item.phoneId &&
        cartItem.color === item.color &&
        cartItem.storage === item.storage,
    );

    if (existingItemIndex !== -1) {
      // Si el producto ya existe, incrementar la cantidad
      const updatedCart = [...cart];
      const existingItem = updatedCart[existingItemIndex];
      updatedCart[existingItemIndex] = {
        ...existingItem,
        quantity: (existingItem.quantity || 1) + 1,
      };
      setCart(updatedCart);
    } else {
      // Si es un producto nuevo, añadirlo al carrito con cantidad 1
      setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (index: number) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      newCart.splice(index, 1);
      return newCart;
    });
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) return;

    setCart((prevCart) => {
      const newCart = [...prevCart];
      if (newCart[index]) {
        newCart[index] = { ...newCart[index], quantity };
      }
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
