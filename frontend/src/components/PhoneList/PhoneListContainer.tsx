'use client';

import { Phone } from '@/types/phone';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import pageStyles from '../../app/page.module.scss';
import { PhoneList } from './PhoneList';

export const PhoneListContainer = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        setLoading(true);
        
        // URL de la API
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://prueba-tecnica-api-tienda-moviles.onrender.com';
        const timestamp = new Date().getTime();
        const queryParams = searchQuery ? `?search=${encodeURIComponent(searchQuery)}&_=${timestamp}` : `?_=${timestamp}`;
        const url = `${apiUrl}/products${queryParams}`;
        
        console.log('Client: Fetching phones from URL:', url);
        
        // Usar fetch directamente para asegurarnos de que se vea en Network
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': '87909682e6cd74208f41a6ef39fe4191',
            'Cache-Control': 'no-cache, no-store, must-revalidate'
          }
        });
        
        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Client: Phones received:', data);
        setPhones(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching phones:', err);
        setError('Failed to load phones. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPhones();
  }, [searchQuery]);

  if (loading) {
    return <div className={pageStyles.loading}>Loading...</div>;
  }

  if (error) {
    return (
      <div className={pageStyles.error}>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (phones.length === 0) {
    return <div className={pageStyles.noResults}>No phones found</div>;
  }

  return <PhoneList phones={phones} />;
}; 