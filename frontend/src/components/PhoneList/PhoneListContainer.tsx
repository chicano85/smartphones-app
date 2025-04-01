'use client';

import { Navbar } from '@/components/Navbar/Navbar';
import { Pagination } from '@/components/Pagination/Pagination';
import { PhoneList } from '@/components/PhoneList/PhoneList';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { phoneService } from '@/services/api';
import { Phone } from '@/types/phone';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '../../app/page.module.scss';

const ITEMS_PER_PAGE = 20;

export function PhoneListContainer() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

  const [phones, setPhones] = useState<Phone[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        setLoading(true);
        const allData = await phoneService.getPhones(search);
        setTotalResults(allData.length);

        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const paginatedData = allData.slice(startIndex, endIndex);

        setPhones(paginatedData);
        setError('');
      } catch (err) {
        console.error('Error fetching phones:', err);
        setError('Failed to load phones. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPhones();
  }, [search, currentPage]);

  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.container}>
        <SearchBar totalResults={totalResults} />

        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : phones.length > 0 ? (
          <>
            <PhoneList phones={phones} />
            <Pagination
              currentPage={currentPage}
              totalItems={totalResults}
              itemsPerPage={ITEMS_PER_PAGE}
              search={search}
            />
          </>
        ) : (
          <div className={styles.noResults}>No phones found</div>
        )}
      </div>
    </main>
  );
}
