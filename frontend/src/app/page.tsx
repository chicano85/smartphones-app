import { PhoneListContainer } from '@/components/PhoneList/PhoneListContainer';
import { Suspense } from 'react';
import styles from './page.module.scss';

export default function Home() {
  return (
    <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
      <PhoneListContainer />
    </Suspense>
  );
}