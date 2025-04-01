import { Navbar } from '@/components/Navbar/Navbar';
import styles from '@/components/PhoneDetail/PhoneDetail.module.scss';
import { PhoneDetailClient } from '@/components/PhoneDetail/PhoneDetailClient';

// Desactivar caché para esta página
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Usar una función asíncrona para la página
export default async function PhoneDetailPage({
  params,
}: {
  params: { id: string };
}) {
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
