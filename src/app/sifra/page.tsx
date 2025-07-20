import MapClientPage from "../../components/MapClientPage";
import Image from 'next/image';
import styles from './style.module.css';

export default function Page() {
  const isPlaceholder = true;
  if (isPlaceholder) {
    return (
      <main className={styles.main_placeholder}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className={styles.placeholderText}>Berounská letní šifrovačka</div>
          <div className={styles.placeholderSmallText}>Už se to chystá, vraťte se prosím 1. srpna!</div>
          <Image src="/logo_orange.svg" alt="Logo" width={200}
            height={200} className={styles.logo} />
        </div>
      </main>
    )
  }
  else {
    return (
      <main className={styles.main}>
        <MapClientPage />
      </main>
    );
  }

}
