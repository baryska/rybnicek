import MapClientPage from "../../components/MapClientPage";
import styles from './style.module.css';

export default function Page() {
  return (
    <main>
      <MapClientPage />
      <h1 className={styles.title}>Letní berounská šifrovačka</h1>
    </main>
  );
}
