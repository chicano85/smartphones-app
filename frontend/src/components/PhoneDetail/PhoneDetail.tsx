'use client';

import { useCart } from '@/context/CartContext';
import { Phone } from '@/types/phone';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './PhoneDetail.module.scss';
import { PhoneImageSection } from './PhoneImageSection';
import { PhoneInfoSection } from './PhoneInfoSection';

import { PhoneSpecifications } from './PhoneSpecifications';
import { SimilarItems } from './SimilarItems';

interface PhoneDetailProps {
  phone: Phone;
}

export const PhoneDetail = ({ phone }: PhoneDetailProps) => {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState<string>(phone.colors[0] || '');
  const [selectedStorage, setSelectedStorage] = useState<number>(phone.storage[0]?.capacity || 0);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (phone && selectedColor && selectedStorage) {
      const storageOption = phone.storage.find(s => s.capacity === selectedStorage);
      const price = (phone.basePrice + (storageOption?.price || 0));
      
      addToCart({
        phoneId: phone._id,
        name: phone.name,
        brand: phone.brand,
        color: selectedColor,
        storage: selectedStorage,
        price: price,
        image: phone.images[selectedColor]
      });
    }
  };

  // Calcular el precio con el almacenamiento seleccionado
  const storageOption = phone.storage.find(s => s.capacity === selectedStorage);
  const finalPrice = phone.basePrice + (storageOption?.price || 0);

  return (
    <div>
      <div className={styles.backLink}>
        <button onClick={() => router.back()} className={styles.backButton}>← BACK</button>
      </div>
      
      <div className={styles.topSection}>
        <PhoneImageSection 
          image={phone.images[selectedColor] || Object.values(phone.images)[0]} 
          name={phone.name} 
          color={selectedColor} 
        />
        
        <PhoneInfoSection 
          phone={phone}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          selectedStorage={selectedStorage}
          setSelectedStorage={setSelectedStorage}
          finalPrice={finalPrice}
          onAddToCart={handleAddToCart}
        />
      </div>
      
      <PhoneSpecifications phone={phone} />
      
      <SimilarItems />
    </div>
  );
}; 