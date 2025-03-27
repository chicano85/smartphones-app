import { Phone } from '@/types/phone';
import Image from 'next/image';
import Link from 'next/link';
import styles from './PhoneCard.module.scss';

interface PhoneCardProps {
  phone: Phone;
}

export const PhoneCard = ({ phone }: PhoneCardProps) => {
  // Obtener la primera imagen disponible
  const firstColorKey = Object.keys(phone.images)[0];
  const imageUrl = phone.images[firstColorKey];

  return (
    <Link href={`/phones/${phone._id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={imageUrl}
          alt={phone.name}
          width={200}
          height={200}
          className={styles.image}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.brand}>{phone.brand.toUpperCase()}</div>
        <div className={styles.namePrice}>
          <div className={styles.name}>{phone.name}</div>
          <div className={styles.price}>{phone.basePrice} EUR</div>
        </div>
      </div>
    </Link>
  );
}; 