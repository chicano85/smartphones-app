import { PhoneDetail } from '@/types/phone';
import { ColorSelector } from './ColorSelector';
import styles from './PhoneDetail.module.scss';
import { StorageSelector } from './StorageSelector';

interface PhoneInfoSectionProps {
  phone: PhoneDetail;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  selectedStorage: string;
  setSelectedStorage: (storage: string) => void;
  finalPrice: number;
  onAddToCart: () => void;
}

export const PhoneInfoSection = ({
  phone,
  selectedColor,
  setSelectedColor,
  selectedStorage,
  setSelectedStorage,
  finalPrice,
  onAddToCart,
}: PhoneInfoSectionProps) => {
  // Verificar si el botón debe estar habilitado
  const isAddToCartDisabled = !selectedColor || !selectedStorage;

  return (
    <div className={styles.phoneInfo}>
      <h1 className={styles.phoneName}>{phone.name.toUpperCase()}</h1>
      <div className={styles.priceSection}>
        <div className={styles.price}>From {finalPrice} EUR</div>
      </div>

      <StorageSelector
        options={phone.storageOptions}
        selectedStorage={selectedStorage}
        onSelect={setSelectedStorage}
      />

      <ColorSelector
        options={phone.colorOptions}
        selectedColor={selectedColor}
        onSelect={setSelectedColor}
        data-testid="color-option"
      />

      {isAddToCartDisabled ? (
        <button className={styles.disabledButton} disabled={true}>
          ADD TO CART
        </button>
      ) : (
        <button className={styles.addToCartButton} onClick={onAddToCart}>
          ADD TO CART
        </button>
      )}
    </div>
  );
};
