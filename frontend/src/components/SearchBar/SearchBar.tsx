'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  totalResults: number;
}

export const SearchBar = ({ totalResults }: SearchBarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        router.push(`/?search=${encodeURIComponent(searchTerm)}`);
      } else {
        router.push('/');
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, router]);

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search for a smartphone..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className={styles.resultsCount}>
        {totalResults} RESULTS
      </div>
    </div>
  );
}; 