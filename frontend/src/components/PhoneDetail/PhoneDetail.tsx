'use client';

import { useCart } from '@/context/CartContext';
import { PhoneDetail as PhoneDetailType } from '@/types/phone';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './PhoneDetail.module.scss';
import { PhoneImageSection } from './PhoneImageSection';
import { PhoneInfoSection } from './PhoneInfoSection';
import { PhoneSpecifications } from './PhoneSpecifications';
import { SimilarItems } from './SimilarItems';

interface PhoneDetailProps {
  phone: PhoneDetailType;
}

export const PhoneDetail = ({ phone }: PhoneDetailProps) => {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedStorage, setSelectedStorage] = useState<string>('');
  const [currentImage, setCurrentImage] = useState<string>('');
  const [finalPrice, setFinalPrice] = useState<number>(phone.basePrice);
  const { addToCart } = useCart();

  // Inicializar valores por defecto al cargar el componente
  useEffect(() => {
    if (phone.colorOptions && phone.colorOptions.length > 0) {
      setSelectedColor(phone.colorOptions[0].name);
      setCurrentImage(phone.colorOptions[0].imageUrl);
    }
    
    if (phone.storageOptions && phone.storageOptions.length > 0) {
      setSelectedStorage(phone.storageOptions[0].capacity);
      // Calcular precio inicial
      const initialStorageOption = phone.storageOptions[0];
      setFinalPrice(phone.basePrice + (initialStorageOption.price || 0));
    }
  }, [phone]);

  // Actualizar imagen cuando cambia el color seleccionado
  useEffect(() => {
    const colorOption = phone.colorOptions.find(c => c.name === selectedColor);
    if (colorOption) {
      setCurrentImage(colorOption.imageUrl);
    }
  }, [selectedColor, phone.colorOptions]);

  // Actualizar precio cuando cambia el almacenamiento seleccionado
  useEffect(() => {
    const storageOption = phone.storageOptions.find(s => s.capacity === selectedStorage);
    if (storageOption) {
      setFinalPrice(phone.basePrice + (storageOption.price || 0));
    } else {
      setFinalPrice(phone.basePrice);
    }
  }, [selectedStorage, phone.basePrice, phone.storageOptions]);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleStorageSelect = (storage: string) => {
    setSelectedStorage(storage);
  };

  const handleAddToCart = () => {
    if (phone && selectedColor && selectedStorage) {
      const colorOption = phone.colorOptions.find(c => c.name === selectedColor);
      
      addToCart({
        phoneId: phone.id,
        name: phone.name,
        brand: phone.brand,
        color: selectedColor,
        storage: selectedStorage,
        price: finalPrice,
        image: colorOption?.imageUrl || ''
      });
      
      // Opcional: mostrar confirmación o redirigir al carrito
      alert('Product added to cart!');
    }
  };

  return (
    <div>
      <div className={styles.backLink}>
        <button onClick={() => router.back()} className={styles.backButton}>BACK</button>
      </div>
      
      <div className={styles.topSection}>
        <PhoneImageSection 
          image={currentImage} 
          name={phone.name} 
          color={selectedColor} 
        />
        
        <PhoneInfoSection 
          phone={phone}
          selectedColor={selectedColor}
          setSelectedColor={handleColorSelect}
          selectedStorage={selectedStorage}
          setSelectedStorage={handleStorageSelect}
          finalPrice={finalPrice}
          onAddToCart={handleAddToCart}
        />
      </div>
      
      <PhoneSpecifications phone={phone} />
      
      {phone.similarProducts && phone.similarProducts.length > 0 && (
        <SimilarItems similarProducts={phone.similarProducts} />
      )}
    </div>
  );
}; 