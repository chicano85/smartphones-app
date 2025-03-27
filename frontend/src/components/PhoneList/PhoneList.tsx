import { Phone } from '@/types/phone';
import { PhoneCard } from '../PhoneCard/PhoneCard';
import styles from './PhoneList.module.scss';

interface PhoneListProps {
  phones: Phone[];
}

export const PhoneList = ({ phones }: PhoneListProps) => {
  return (
    <div className={styles.grid}>
      {phones.map((phone) => (
        <PhoneCard key={phone._id} phone={phone} />
      ))}
    </div>
  );
}; 