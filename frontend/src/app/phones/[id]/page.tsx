import { Navbar } from '@/components/Navbar/Navbar';
import { PhoneDetailClient } from '@/components/PhoneDetail/PhoneDetailClient';
import styles from './page.module.scss';

// Desactivar caché para esta página
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Usar una función asíncrona para la página
export default async function PhoneDetailPage({ params }: { params: { id: string } }) {
  // Esperar a que los parámetros estén disponibles usando Promise.resolve
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams.id;
  
  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.container}>
        <PhoneDetailClient phoneId={id} />
      </div>
    </main>
  );
} 