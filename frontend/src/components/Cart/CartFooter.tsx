import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../../app/cart/page.module.scss';

interface CartFooterProps {
  total: number;
  itemCount: number;
  onContinueShopping: () => void;
}

export const CartFooter = ({ total, itemCount }: CartFooterProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 576); // $breakpoint-sm
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  if (isMobile) {
    return (
      <div className={styles.cartFooter}>
        <div className={styles.total}>
          <span>TOTAL</span>
          <span>{total} EUR</span>
        </div>
        <div className={styles.buttonContainer}>
          <Link href="/" className={styles.continueShoppingButton}>
            CONTINUE SHOPPING
          </Link>
          <button className={styles.payButton} disabled={itemCount === 0}>
            PAY
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartFooter}>
      <Link href="/" className={styles.continueShoppingButton}>
        CONTINUE SHOPPING
      </Link>
      <div className={styles.total}>
        <span>TOTAL</span> {total} EUR
      </div>
      <button className={styles.payButton} disabled={itemCount === 0}>
        PAY
      </button>
    </div>
  );
};
