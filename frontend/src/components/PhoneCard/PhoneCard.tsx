import { Phone } from '@/types/phone';
import Link from 'next/link';
import { useState } from 'react';
import styles from './PhoneCard.module.scss';

interface PhoneCardProps {
  phone: Phone;
}

export const PhoneCard = ({ phone }: PhoneCardProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/phones/${phone.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        {phone.imageUrl && !imageError ? (
          <img
            src={phone.imageUrl}
            alt={`${phone.brand} ${phone.name}`}
            className={styles.image}
            onError={() => setImageError(true)}
            width="180"
            height="180"
          />
        ) : (
          <div className={styles.placeholderImage}>
            {phone.brand} {phone.name}
          </div>
        )}
      </div>
      <div className={styles.info}>
        <div className={styles.brand}>{phone.brand}</div>
        <div className={styles.nameAndPrice}>
          <h3 className={styles.name}>{phone.name}</h3>
          <p className={styles.price}>{phone.basePrice} EUR</p>
        </div>
      </div>
    </Link>
  );
};
