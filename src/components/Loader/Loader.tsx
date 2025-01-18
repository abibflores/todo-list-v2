import styles from './Loader.module.css';
import { LoaderProps } from './Loader.types';

export const Loader= ({ message = 'Cargando...' }: LoaderProps) => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.message}>{message}</p>
    </div>
  );
}
