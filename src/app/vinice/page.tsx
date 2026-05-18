"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ForestMapClientPage from "@/components/ForestMapClientPage";
import styles from "./style.module.css";

const ACCESS_KEY = "vinice2026";

function VinicePage() {
  const searchParams = useSearchParams();
  const hasAccess = searchParams.get("pristup") === ACCESS_KEY;

  if (!hasAccess) {
    return (
      <main className={styles.main_placeholder}>
        <div>
          <p className={styles.placeholderText}>Lesní hra z Vinice</p>
          <p className={styles.placeholderSmallText}>Připravujeme pro vás...</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <ForestMapClientPage />
    </main>
  );
}

export default function VinicePageWrapper() {
  return (
    <Suspense
      fallback={
        <main className={styles.main_placeholder}>
          <div>
            <p className={styles.placeholderText}>Načítám...</p>
          </div>
        </main>
      }
    >
      <VinicePage />
    </Suspense>
  );
}
