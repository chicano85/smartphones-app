import { ColorOption } from '@/types/phone';
import styles from './PhoneDetail.module.scss';

interface ColorSelectorProps {
  options: ColorOption[];
  selectedColor: string;
  onSelect: (color: string) => void;
}

export const ColorSelector = ({ options, selectedColor, onSelect }: ColorSelectorProps) => {
  return (
    <div className={styles.optionSection}>
      <h3 className={styles.optionTitle}>COLOR. CHOOSE YOUR FAVORITE.</h3>
      <div className={styles.colorOptions}>
        {options.map(option => (
          <button
            key={option.name}
            className={`${styles.colorOption} ${selectedColor === option.name ? styles.selected : ''}`}
            style={{ backgroundColor: option.hexCode }}
            onClick={() => onSelect(option.name)}
            title={option.name}
          />
        ))}
      </div>
      <div className={styles.selectedColorName}>{selectedColor}</div>
    </div>
  );
}; 