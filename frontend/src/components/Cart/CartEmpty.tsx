import styles from '../../app/cart/page.module.scss';

interface CartEmptyProps {
  onContinueShopping: () => void;
}

export const CartEmpty = ({ onContinueShopping }: CartEmptyProps) => {
  return (
    <div className={styles.emptyCart}>
      <p className={styles.emptyMessage}>Your cart is empty</p>
      <button onClick={onContinueShopping} className={styles.continueButton}>
        CONTINUE SHOPPING
      </button>
    </div>
  );
}; 