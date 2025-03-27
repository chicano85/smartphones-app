'use client';

import { Navbar } from '@/components/Navbar/Navbar';
import { PhoneList } from '@/components/PhoneList/PhoneList';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { phoneService } from '@/services/api';
import { Phone } from '@/types/phone';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.scss';

export default function Home() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  
  const [phones, setPhones] = useState<Phone[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        setLoading(true);
        const response = await phoneService.getPhones(search);
        setPhones(response.phones);
        setTotalResults(response.total);
        setError('');
      } catch (err) {
        console.error('Error fetching phones:', err);
        setError('Failed to load phones. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPhones();
  }, [search]);

  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.container}>
        <SearchBar totalResults={totalResults} />
        
        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <PhoneList phones={phones} />
        )}
      </div>
    </main>
  );
}
