import { PhoneDetail } from '@/types/phone';
import styles from './PhoneDetail.module.scss';

interface PhoneSpecificationsProps {
  phone: PhoneDetail;
}

export const PhoneSpecifications = ({ phone }: PhoneSpecificationsProps) => {
  return (
    <div className={styles.specifications}>
      <h2 className={styles.specificationsTitle}>SPECIFICATIONS</h2>
      <table className={styles.specsTable}>
        <tbody>
          <tr>
            <td className={styles.specLabel}>BRAND</td>
            <td className={styles.specValue}>{phone.brand}</td>
          </tr>
          <tr>
            <td className={styles.specLabel}>NAME</td>
            <td className={styles.specValue}>{phone.name}</td>
          </tr>
          <tr>
            <td className={styles.specLabel}>DESCRIPTION</td>
            <td className={styles.specValue}>{phone.description}</td>
          </tr>
          <tr>
            <td className={styles.specLabel}>SCREEN</td>
            <td className={styles.specValue}>{phone.specs.screen}</td>
          </tr>
          <tr>
            <td className={styles.specLabel}>RESOLUTION</td>
            <td className={styles.specValue}>{phone.specs.resolution}</td>
          </tr>
          <tr>
            <td className={styles.specLabel}>PROCESSOR</td>
            <td className={styles.specValue}>{phone.specs.processor}</td>
          </tr>
          <tr>
            <td className={styles.specLabel}>MAIN CAMERA</td>
            <td className={styles.specValue}>{phone.specs.mainCamera}</td>
          </tr>
          <tr>
            <td className={styles.specLabel}>SELFIE CAMERA</td>
            <td className={styles.specValue}>{phone.specs.selfieCamera}</td>
          </tr>
          <tr>
            <td className={styles.specLabel}>BATTERY</td>
            <td className={styles.specValue}>{phone.specs.battery}</td>
          </tr>
          <tr>
            <td className={styles.specLabel}>OS</td>
            <td className={styles.specValue}>{phone.specs.os}</td>
          </tr>
          <tr>
            <td className={styles.specLabel}>SCREEN REFRESH RATE</td>
            <td className={styles.specValue}>{phone.specs.screenRefreshRate}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}; 