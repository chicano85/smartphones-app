import { Phone } from '@/types/phone';
import styles from './PhoneDetail.module.scss';

interface PhoneSpecificationsProps {
  phone: Phone;
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
            <td className={styles.specValue}>
              El {phone.brand} {phone.name} es un smartphone de gama alta con una 
              pantalla {phone.specifications.screen}, procesador {phone.specifications.processor}, 
              y un avanzado sistema de cámara con inteligencia artificial.
            </td>
          </tr>
          <tr>
            <td className={styles.specLabel}>SCREEN</td>
            <td className={styles.specValue}>{phone.specifications.screen}</td>
          </tr>
          <tr>
            <td className={styles.specLabel}>RESOLUTION</td>
            <td className={styles.specValue}>3120 x 1440 pixels</td>
          </tr>
          <tr>
            <td className={styles.specLabel}>PROCESSOR</td>
            <td className={styles.specValue}>{phone.specifications.processor}</td>
          </tr>
          <tr>
            <td className={styles.specLabel}>MAIN CAMERA</td>
            <td className={styles.specValue}>{phone.specifications.camera}</td>
          </tr>
          <tr>
            <td className={styles.specLabel}>SELFIE CAMERA</td>
            <td className={styles.specValue}>12 MP</td>
          </tr>
          <tr>
            <td className={styles.specLabel}>BATTERY</td>
            <td className={styles.specValue}>{phone.specifications.battery}</td>
          </tr>
          <tr>
            <td className={styles.specLabel}>OS</td>
            <td className={styles.specValue}>{phone.specifications.os}</td>
          </tr>
          <tr>
            <td className={styles.specLabel}>SCREEN REFRESH RATE</td>
            <td className={styles.specValue}>120 Hz</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}; 