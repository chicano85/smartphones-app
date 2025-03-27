'use client';

import { Phone } from '@/types/phone';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styles from './PhoneDetail.module.scss';

interface SimilarItemsProps {
  similarProducts: Phone[];
}

export const SimilarItems = ({ similarProducts }: SimilarItemsProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    const checkScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10); // 10px de margen
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      // Comprobar inicialmente
      checkScroll();
      
      // Comprobar después de que las imágenes se carguen
      window.addEventListener('load', checkScroll);
      window.addEventListener('resize', checkScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('load', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  if (!similarProducts || similarProducts.length === 0) {
    return null;
  }

  return (
    <div className={styles.similarItems}>
      <h2 className={styles.similarTitle}>SIMILAR ITEMS</h2>
      
      <div className={styles.carouselWrapper}>
        {showLeftArrow && (
          <button className={`${styles.carouselArrow} ${styles.carouselArrowLeft}`} onClick={scrollLeft}>
            &lt;
          </button>
        )}
        
        <div className={styles.carouselContainer} ref={scrollContainerRef}>
          {similarProducts.map(product => (
            <Link href={`/phones/${product.id}`} key={product.id} className={styles.similarProduct}>
              <div className={styles.similarProductImage}>
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={`${product.brand} ${product.name}`} />
                ) : (
                  <div className={styles.placeholderImage}>
                    {product.brand} {product.name}
                  </div>
                )}
              </div>
              <div className={styles.similarProductInfo}>
                <div className={styles.similarProductBrand}>{product.brand.toUpperCase()}</div>
                <div className={styles.similarProductName}>{product.name.toUpperCase()}</div>
                <div className={styles.similarProductPrice}>{product.basePrice} EUR</div>
              </div>
            </Link>
          ))}
        </div>
        
        {showRightArrow && (
          <button className={`${styles.carouselArrow} ${styles.carouselArrowRight}`} onClick={scrollRight}>
            &gt;
          </button>
        )}
      </div>
      
      <div className={styles.divider}></div>
    </div>
  );
}; 