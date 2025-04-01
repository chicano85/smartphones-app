'use client';

import { Phone } from '@/types/phone';
import Link from 'next/link';
import { useRef } from 'react';
import styles from './PhoneDetail.module.scss';

interface SimilarItemsProps {
  similarProducts: Phone[];
}

export const SimilarItems = ({ similarProducts }: SimilarItemsProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filtrar productos duplicados basándonos en el ID
  const uniqueProducts = similarProducts.filter((product, index, self) =>
    index === self.findIndex((p) => p.id === product.id)
  );

  if (!uniqueProducts || uniqueProducts.length === 0) {
    return null;
  }

  return (
    <div className={styles.similarItems}>
      <h2 className={styles.similarTitle}>SIMILAR ITEMS</h2>

      <div className={styles.carouselWrapper}>
        <div className={styles.carouselContainer} ref={scrollContainerRef}>
          {uniqueProducts.map((product) => (
            <Link
              href={`/phones/${product.id}`}
              key={product.id}
              className={styles.similarProduct}
            >
              <div className={styles.similarProductImage}>
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={`${product.brand} ${product.name}`}
                  />
                ) : (
                  <div className={styles.placeholderImage}>
                    {product.brand} {product.name}
                  </div>
                )}
              </div>
              <div className={styles.similarProductInfo}>
                <div className={styles.similarProductBrand}>
                  {product.brand.toUpperCase()}
                </div>
                <div className={styles.similarProductName}>
                  {product.name.toUpperCase()}
                </div>
                <div className={styles.similarProductPrice}>
                  {product.basePrice} EUR
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.divider}></div>
    </div>
  );
};
