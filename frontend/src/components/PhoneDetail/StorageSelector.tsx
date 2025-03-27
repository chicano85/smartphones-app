import { StorageOption } from '@/types/phone';
import styles from './PhoneDetail.module.scss';

interface StorageSelectorProps {
  options: StorageOption[];
  selectedStorage: string;
  onSelect: (storage: string) => void;
}

export const StorageSelector = ({ options, selectedStorage, onSelect }: StorageSelectorProps) => {
  return (
    <div className={styles.optionSection}>
      <h3 className={styles.optionTitle}>STORAGE. CHOOSE THE CAPACITY.</h3>
      <div className={styles.storageOptions}>
        {options.map(option => (
          <button
            key={option.capacity}
            className={`${styles.storageOption} ${selectedStorage === option.capacity ? styles.selected : ''}`}
            onClick={() => onSelect(option.capacity)}
          >
            {option.capacity}
            {option.price > 0 && ` (+${option.price} EUR)`}
          </button>
        ))}
      </div>
    </div>
  );
}; 