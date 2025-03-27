'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import styles from './Navbar.module.scss';

export const Navbar = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.length;

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>MBST</span>
        </Link>
        
        <Link href="/cart" className={styles.cartLink}>
          <span className={styles.cartIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </span>
          {totalItems > 0 && (
            <span className={styles.cartCount}>{totalItems}</span>
          )}
        </Link>
      </div>
    </nav>
  );
}; 