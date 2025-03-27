import Image from 'next/image';
import styles from './PhoneDetail.module.scss';

interface PhoneImageSectionProps {
  image: string;
  name: string;
  color: string;
}

export const PhoneImageSection = ({ image, name, color }: PhoneImageSectionProps) => {
  return (
    <div className={styles.phoneImage}>
      <Image
        src={image}
        alt={`${name} - ${color}`}
        width={400}
        height={400}
        className={styles.image}
      />
    </div>
  );
}; 