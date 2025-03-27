import { Phone } from '@/types/phone';
import { ColorSelector } from './ColorSelector';
import styles from './PhoneDetail.module.scss';
import { StorageSelector } from './StorageSelector';

interface PhoneInfoSectionProps {
  phone: Phone;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  selectedStorage: number;
  setSelectedStorage: (storage: number) => void;
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
  onAddToCart
}: PhoneInfoSectionProps) => {
  return (
    <div className={styles.phoneInfo}>
      <h1 className={styles.phoneName}>{phone.name.toUpperCase()}</h1>
      
      <div className={styles.priceSection}>
        <div className={styles.price}>From {finalPrice} EUR</div>
      </div>
      
      <StorageSelector 
        options={phone.storage}
        selectedStorage={selectedStorage}
        onSelect={setSelectedStorage}
      />
      
      <ColorSelector 
        colors={phone.colors}
        selectedColor={selectedColor}
        onSelect={setSelectedColor}
      />
      
      <button className={styles.addToCartButton} onClick={onAddToCart}>
        AÑADIR
      </button>
    </div>
  );
}; 