"use client";
import styles from './style.module.css';

import MapComponent from "@/components/MapComponent";

export default function Page() {
  return (
    <main>
      <MapComponent />
      <h1 className={styles.title}>Letní berounská šifrovačka</h1>
    </main>
  );
}
