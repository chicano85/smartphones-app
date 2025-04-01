'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineShopping } from "react-icons/ai";
import styles from './Navbar.module.scss';

export const Navbar = () => {
  const { cart } = useCart();
  const totalItems = cart.length;

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image 
            src="/assets/header_logo.png"
            alt="MBST Logo"
            width={100}
            height={40}
            priority
          />
        </Link>
        
        <Link href="/cart" className={styles.cartLink}>
          <span className={styles.cartIcon}>
            <AiOutlineShopping size={24} />
          </span>
          {totalItems > 0 && (
            <span className={styles.cartCount}>{totalItems}</span>
          )}
        </Link>
      </div>
    </nav>
  );
}; 