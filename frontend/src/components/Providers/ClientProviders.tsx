'use client';

import { CartProvider } from '@/context/CartContext';
import { ReactNode } from 'react';

export const ClientProviders = ({ children }: { children: ReactNode }) => {
  return <CartProvider>{children}</CartProvider>;
};
