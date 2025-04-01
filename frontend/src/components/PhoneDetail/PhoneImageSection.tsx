import styles from './PhoneDetail.module.scss';

interface PhoneImageSectionProps {
  image: string;
  name: string;
  color: string;
}

export const PhoneImageSection = ({
  image,
  name,
  color,
}: PhoneImageSectionProps) => {
  return (
    <div className={styles.imageSection}>
      <div className={styles.imageContainer}>
        {image ? (
          <img
            src={image}
            alt={`${name} - ${color}`}
            className={styles.phoneImage}
          />
        ) : (
          <div className={styles.placeholderImage}>{name}</div>
        )}
      </div>
    </div>
  );
};
