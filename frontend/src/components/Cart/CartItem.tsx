import { CartItem as CartItemType } from '@/types/phone';
import styles from '../../app/cart/page.module.scss';

interface CartItemProps {
  item: CartItemType;
  onRemove: (index: number) => void;
  index: number;
}

export const CartItem = ({ item, onRemove, index }: CartItemProps) => {
  return (
    <div className={styles.cartItem}>
      <div className={styles.itemImageContainer}>
        <img
          src={item.image}
          alt={`${item.brand} ${item.name}`}
          className={styles.itemImage}
        />
      </div>
      <div className={styles.itemDetails}>
        <div className={styles.itemName}>{item.name}</div>
        <div className={styles.itemSpecs}>
          {item.storage} GB | {item.color.toUpperCase()}
        </div>
        <div className={styles.itemPrice}>{item.price} EUR</div>
        <button className={styles.removeButton} onClick={() => onRemove(index)}>
          Eliminar
        </button>
      </div>
    </div>
  );
};
