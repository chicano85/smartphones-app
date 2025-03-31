'use client';

import { Navbar } from '@/components/Navbar/Navbar';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './page.module.scss';

export default function CartPage() {
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

  return (
    <main>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>CART ({cart.length})</h1>

        {cart.length === 0 ? (
          // Carrito vacío
          <div className={styles.emptyCart}>
            <p className={styles.emptyMessage}>Your cart is empty</p>
          </div>
        ) : (
          // Carrito con productos
          <div className={styles.cartItems}>
            {cart.map((item, index) => (
              <div key={`${item.phoneId}-${item.color}-${item.storage}-${index}`} className={styles.cartItem}>
                <div className={styles.itemImageContainer}>
                  <img src={item.image} alt={`${item.brand} ${item.name}`} className={styles.itemImage} />
                </div>
                <div className={styles.itemDetails}>
                  <div className={styles.itemName}>{item.name}</div>
                  <div className={styles.itemSpecs}>{item.storage} GB | {item.color.toUpperCase()}</div>
                  <div className={styles.itemPrice}>{item.price} EUR</div>
                  <button 
                    className={styles.removeButton}
                    onClick={() => removeFromCart(index)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Footer siempre visible en la parte inferior */}
        <div className={styles.cartFooter}>
          <Link href="/" className={styles.continueShoppingButton}>
            CONTINUE SHOPPING
          </Link>
          
          <div className={styles.totalSection}>
            <span className={styles.totalLabel}>TOTAL</span>
            <span className={styles.totalValue}>{calculateTotal()} EUR</span>
          </div>
          
          <button className={styles.payButton} disabled={cart.length === 0}>
            PAY
          </button>
        </div>
      </div>
    </main>
  );
} 