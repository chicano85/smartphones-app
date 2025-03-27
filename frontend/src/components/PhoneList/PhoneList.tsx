import { Phone } from '@/types/phone';
import { PhoneCard } from '../PhoneCard/PhoneCard';
import styles from './PhoneList.module.scss';

interface PhoneListProps {
  phones: Phone[];
}

export const PhoneList = ({ phones }: PhoneListProps) => {
  if (!phones || phones.length === 0) {
    return <div className={styles.noPhones}>No phones available</div>;
  }

  return (
    <div className={styles.grid}>
      {phones.map((phone, index) => (
        <PhoneCard key={`${phone.id}-${index}`} phone={phone} />
      ))}
    </div>
  );
}; 