import { Navbar } from '@/components/Navbar/Navbar';
import styles from '@/components/PhoneDetail/PhoneDetail.module.scss';
import { PhoneDetailClient } from '@/components/PhoneDetail/PhoneDetailClient';

export default async function PhoneDetailPage({ 
  params,
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  
  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.container}>
        <PhoneDetailClient phoneId={id} />
      </div>
    </main>
  );
}