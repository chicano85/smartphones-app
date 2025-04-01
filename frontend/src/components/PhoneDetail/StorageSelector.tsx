import { StorageOption } from '@/types/phone';
import styles from './PhoneDetail.module.scss';

interface StorageSelectorProps {
  options: StorageOption[];
  selectedStorage: string;
  onSelect: (storage: string) => void;
}

export const StorageSelector = ({ options, selectedStorage, onSelect }: StorageSelectorProps) => {
  return (
    <div>
      <p>STORAGE. HOW MUCH STORAGE DO YOU NEED?</p>
      <div className={styles.storageOptions}>
        {options.map(option => (
          <div
            key={option.capacity}
            className={`${styles.storageOption} ${selectedStorage === option.capacity ? styles.selected : ''}`}
            onClick={() => onSelect(option.capacity)}
          >
            {option.capacity}
          </div>
        ))}
      </div>
    </div>
  );
}; 