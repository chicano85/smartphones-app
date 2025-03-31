import styles from '@/app/cart/page.module.scss';
import Link from 'next/link';

interface CartFooterProps {
  total: number;
  itemCount: number;
  onContinueShopping: () => void;
}

export const CartFooter = ({ total, itemCount, onContinueShopping }: CartFooterProps) => {
  return (
    <div className={styles.cartFooter}>
      <Link href="/" className={styles.continueShoppingButton}>
        CONTINUE SHOPPING
      </Link>
      <div className={styles.paymentSection}>
        <div className={styles.total}>
          <span>TOTAL</span>
          <span>{total} EUR</span>
        </div>
        <button className={styles.payButton} disabled={itemCount === 0}>
          PAY
        </button>
      </div>
    </div>
  );
}; 