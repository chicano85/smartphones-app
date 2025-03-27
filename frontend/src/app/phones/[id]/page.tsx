import { Navbar } from '@/components/Navbar/Navbar';
import { PhoneDetail } from '@/components/PhoneDetail/PhoneDetail';
import { phoneService } from '@/services/api';
import styles from './page.module.scss';

export default async function PhoneDetailPage({ params }: { params: { id: string } }) {
  try {
    const phone = await phoneService.getPhoneById(params.id);
    
    return (
      <main className={styles.main}>
        <Navbar />
        <div className={styles.container}>
          <PhoneDetail phone={phone} />
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error fetching phone:', error);
    return (
      <main className={styles.main}>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.error}>Failed to load phone details. Please try again later.</div>
        </div>
      </main>
    );
  }
} 