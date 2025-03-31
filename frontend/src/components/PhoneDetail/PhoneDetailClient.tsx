'use client';

import { PhoneDetail as PhoneDetailType } from '@/types/phone';
import { useEffect, useState } from 'react';
import { PhoneDetail } from './PhoneDetail';
import styles from './PhoneDetail.module.scss';

interface PhoneDetailClientProps {
  phoneId: string;
}

export const PhoneDetailClient = ({ phoneId }: PhoneDetailClientProps) => {
  const [phone, setPhone] = useState<PhoneDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhoneDetails = async () => {
      try {
        setLoading(true);
        
        // URL de la API
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://prueba-tecnica-api-tienda-moviles.onrender.com';
        const timestamp = new Date().getTime();
        const url = `${apiUrl}/products/${phoneId}?_=${timestamp}`;
        
        console.log('Client: Fetching from URL:', url);
        
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
        console.log('Client: Phone details received:', data);
        setPhone(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching phone details:', err);
        setError('Failed to load phone details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (phoneId) {
      fetchPhoneDetails();
    }
  }, [phoneId]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error || !phone) {
    return (
      <div className={styles.error}>
        <h1>Error</h1>
        <p>{error || 'Failed to load phone details. Please try again later.'}</p>
      </div>
    );
  }

  return <PhoneDetail phone={phone} />;
}; 