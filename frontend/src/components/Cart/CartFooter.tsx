import Link from 'next/link';
import styles from '../../app/cart/page.module.scss';

interface CartFooterProps {
  total: number;
  itemCount: number;
  onContinueShopping: () => void;
}

export const CartFooter = ({ total, itemCount }: CartFooterProps) => {
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