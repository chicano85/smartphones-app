'use client';

import { phoneService } from '@/services/api';
import { PhoneDetail as PhoneDetailType } from '@/types/phone';
import { useEffect, useState } from 'react';
import styles from '../../app/page.module.scss';
import { PhoneDetail } from './PhoneDetail';

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
        const phoneData = await phoneService.getPhoneById(phoneId);
        setPhone(phoneData);
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
        <p>
          {error || 'Failed to load phone details. Please try again later.'}
        </p>
      </div>
    );
  }

  return <PhoneDetail phone={phone} />;
};
