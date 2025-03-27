import { Storage } from '@/types/phone';
import styles from './PhoneDetail.module.scss';

interface StorageSelectorProps {
  options: Storage[];
  selectedStorage: number;
  onSelect: (storage: number) => void;
}

export const StorageSelector = ({ options, selectedStorage, onSelect }: StorageSelectorProps) => {
  return (
    <div className={styles.optionSection}>
      <h3 className={styles.optionTitle}>STORAGE. ¿HOW MUCH SPACE DO YOU NEED?</h3>
      <div className={styles.storageOptions}>
        {options.map(option => (
          <button
            key={option.capacity}
            className={`${styles.storageOption} ${selectedStorage === option.capacity ? styles.selected : ''}`}
            onClick={() => onSelect(option.capacity)}
          >
            {option.capacity} GB
          </button>
        ))}
      </div>
    </div>
  );
}; 