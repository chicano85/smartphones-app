'use client';

import { phoneService } from '@/services/api';
import { Phone } from '@/types/phone';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './PhoneDetail.module.scss';

export const SimilarItems = () => {
  const { id } = useParams();
  const [similarPhones, setSimilarPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilarPhones = async () => {
      try {
        setLoading(true);
        // Obtener todos los teléfonos y filtrar los similares
        const phones = await phoneService.getPhones();
        // Excluir el teléfono actual y limitar a 5 teléfonos
        const filtered = phones
          .filter(phone => phone.id !== id)
          .slice(0, 5);
        
        setSimilarPhones(filtered);
      } catch (error) {
        console.error('Error fetching similar phones:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarPhones();
  }, [id]);

  if (loading || similarPhones.length === 0) {
    return null;
  }

  return (
    <div className={styles.similarItems}>
      <h2 className={styles.similarTitle}>SIMILAR ITEMS</h2>
      <div className={styles.similarGrid}>
        {similarPhones.map(phone => (
          <div key={phone.id} className={styles.similarItem}>
            <Link href={`/phones/${phone.id}`}>
              <div className={styles.similarImageContainer}>
                <img
                  src={phone.imageUrl}
                  alt={`${phone.brand} ${phone.name}`}
                  className={styles.similarImage}
                />
              </div>
              <div className={styles.similarInfo}>
                <h3 className={styles.similarName}>{phone.brand}</h3>
                <p className={styles.similarModel}>{phone.name}</p>
                <p className={styles.similarPrice}>{phone.basePrice} EUR</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}; 