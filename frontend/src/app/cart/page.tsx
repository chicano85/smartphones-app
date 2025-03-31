'use client';

import { CartEmpty } from '@/components/Cart/CartEmpty';
import { CartFooter } from '@/components/Cart/CartFooter';
import { CartItem } from '@/components/Cart/CartItem';
import { Navbar } from '@/components/Navbar/Navbar';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.scss';

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart } = useCart();
  const [isClient, setIsClient] = useState(false);

  // Asegurarse de que el renderizado del carrito ocurra solo en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Calcular el total del carrito
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  };

  // Si estamos en el servidor o el carrito está cargando, mostramos un estado de carga
  if (!isClient) {
    return (
      <main>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.loading}>Loading cart...</div>
        </div>
      </main>
    );
  }

  const handleContinueShopping = () => {
    router.push('/');
  };

  return (
    <main>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>CART ({cart.length})</h1>

        {cart.length === 0 ? (
          <CartEmpty onContinueShopping={handleContinueShopping} />
        ) : (
          <>
            <div className={styles.cartItems}>
              {cart.map((item, index) => (
                <CartItem 
                  key={`${item.phoneId}-${item.color}-${item.storage}-${index}`}
                  item={item}
                  index={index}
                  onRemove={removeFromCart}
                />
              ))}
            </div>
            <CartFooter 
              total={calculateTotal()}
              itemCount={cart.length}
              onContinueShopping={handleContinueShopping}
            />
          </>
        )}
      </div>
    </main>
  );
} 