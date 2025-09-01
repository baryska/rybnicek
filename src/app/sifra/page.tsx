import MapClientPage from "../../components/MapClientPage";
import Image from 'next/image';
import styles from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Page() {
  const isPlaceholder = true;
  if (isPlaceholder) {
    return (
      <main className={styles.main_placeholder}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className={styles.placeholderText}>Berounská letní šifrovačka</div>
          <div className={styles.placeholderThankyou}>
            <div className={styles.placeholderSmallText}>Děkujeme všem za účast a krásné vzkazy </div>
            <FontAwesomeIcon icon={faHeart} size="lg" beat />
          </div>
          <div className={styles.placeholderSmallText}>Výherce cen budeme losovat <strong>7. září</strong>, sledujte naše sociální sítě!</div>
          <Image src="/logo_orange.svg" alt="Logo" width={200}
            height={200} className={styles.logo} />
        </div>
      </main>
    )
  }
  else {
    return (
      <main className={styles.main}>
        <MapClientPage showCrossword={true} />
      </main>
    );
  }
}
