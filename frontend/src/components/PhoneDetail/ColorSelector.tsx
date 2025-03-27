import styles from './PhoneDetail.module.scss';

interface ColorSelectorProps {
  colors: string[];
  selectedColor: string;
  onSelect: (color: string) => void;
}

export const ColorSelector = ({ colors, selectedColor, onSelect }: ColorSelectorProps) => {
  // Función auxiliar para convertir nombres de colores a códigos hexadecimales
  const getColorCode = (colorName: string): string => {
    const colorMap: Record<string, string> = {
      'Space Black': '#2E2E2E',
      'Phantom Black': '#2E2E2E',
      'Silver': '#C0C0C0',
      'Gold': '#D4AF37',
      'Deep Purple': '#5C2751',
      'Cream': '#FFFDD0',
      'Green': '#228B22',
      'Lavender': '#E6E6FA',
      // Añadir más colores según sea necesario
    };
    
    return colorMap[colorName] || '#CCCCCC'; // Color gris por defecto
  };

  return (
    <div className={styles.optionSection}>
      <h3 className={styles.optionTitle}>COLOR. PICK YOUR FAVOURITE.</h3>
      <div className={styles.colorOptions}>
        {colors.map(color => (
          <button
            key={color}
            className={`${styles.colorOption} ${selectedColor === color ? styles.selected : ''}`}
            onClick={() => onSelect(color)}
            aria-label={color}
            style={{ backgroundColor: getColorCode(color) }}
          />
        ))}
      </div>
    </div>
  );
}; 