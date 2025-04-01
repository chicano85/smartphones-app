import { ColorOption } from '@/types/phone';
import styles from './PhoneDetail.module.scss';

interface ColorSelectorProps {
  options: ColorOption[];
  selectedColor: string;
  onSelect: (color: string) => void;
}

export const ColorSelector = ({
  options,
  selectedColor,
  onSelect,
}: ColorSelectorProps) => {
  return (
    <div>
      <p>COLOR. PICK YOUR FAVORITE.</p>
      <div className={styles.colorOptions}>
        {options.map((option) => (
          <div
            key={option.name}
            className={`${styles.colorOption} ${selectedColor === option.name ? styles.selected : ''}`}
            style={{ backgroundColor: option.hexCode }}
            onClick={() => onSelect(option.name)}
          />
        ))}
      </div>
      {selectedColor && (
        <div className={styles.selectedColorName}>{selectedColor}</div>
      )}
    </div>
  );
};
