import { Navbar } from '@/components/Navbar/Navbar';
import { PhoneDetailClient } from '@/components/PhoneDetail/PhoneDetailClient';
import styles from './page.module.scss';

// Desactivar caché para esta página
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PhoneDetailPage({ params }: { params: { id: string } }) {
  // Esperar a que los parámetros estén disponibles
  const id = await params.id;
  
  console.log('Page: Phone ID from params:', id);
  
  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.container}>
        <PhoneDetailClient phoneId={id} />
      </div>
    </main>
  );
} 