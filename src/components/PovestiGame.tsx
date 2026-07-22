"use client";

import { useEffect, useState } from "react";
import { povestiWelcome, povestiIntro, stations, getStationByOrder } from "@/data/povesti";
import { collectedLetters } from "@/lib/povesti/tajenka";
import {
  POVESTI_STORAGE_KEY,
  STATION_COUNT,
  PovestiProgress,
  parseProgress,
  serializeProgress,
  defaultProgress,
  unlockNext,
  isFinaleUnlocked,
} from "@/lib/povesti/progress";
import PovestiMap from "./PovestiMap";
import PovestiModal from "./PovestiModal";
import PovestiStationCard from "./PovestiStationCard";
import PovestiFinale from "./PovestiFinale";
import PovestiText from "./PovestiText";
import styles from "./povesti.module.css";

const FINALE_ORDER = STATION_COUNT + 1;

const PovestiGame = () => {
  const [progress, setProgress] = useState<PovestiProgress | null>(null);
  // 1–7 = zastavení otevřené v modálu, 8 = finále, null = zavřeno
  const [modalOrder, setModalOrder] = useState<number | null>(null);

  useEffect(() => {
    setProgress(parseProgress(localStorage.getItem(POVESTI_STORAGE_KEY)));
  }, []);

  const save = (next: PovestiProgress) => {
    setProgress(next);
    try {
      localStorage.setItem(POVESTI_STORAGE_KEY, serializeProgress(next));
    } catch {
      // localStorage nedostupné (soukromé okno apod.) — hra běží dál v paměti
    }
  };

  const handleReset = () => {
    if (confirm("Opravdu chcete začít znovu? Celý postup stezkou se smaže.")) {
      save(defaultProgress());
      setModalOrder(null);
      window.scrollTo({ top: 0 });
    }
  };

  if (progress === null) {
    return <div className={styles.loading}>Načítání…</div>;
  }

  const solvedCount = Math.min(progress.unlockedOrder - 1, STATION_COUNT);
  const letters = collectedLetters(stations, progress.unlockedOrder);
  const modalStation =
    modalOrder !== null && modalOrder <= STATION_COUNT
      ? getStationByOrder(modalOrder)
      : undefined;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Berounský poklad</h1>
      </header>

      <PovestiText text={povestiWelcome} className={styles.welcome} />

      <PovestiText text={povestiIntro} className={styles.intro} />

      <PovestiMap
        unlockedOrder={progress.unlockedOrder}
        finished={progress.finished}
        onSelect={setModalOrder}
      />
      <p className={styles.mapCaption}>
        Klepněte na odemčené zastavení a přečtěte si jeho pověst a úkol.
      </p>

      {modalStation && (
        <PovestiModal
          title={`Zastavení ${modalStation.order}/${STATION_COUNT}`}
          onClose={() => setModalOrder(null)}
        >
          <PovestiStationCard
            key={modalStation.id}
            station={modalStation}
            solved={modalStation.order < progress.unlockedOrder}
            onCorrect={() => save(unlockNext(progress, modalStation.order))}
            onContinue={() => setModalOrder(null)}
          />
        </PovestiModal>
      )}

      {modalOrder === FINALE_ORDER && isFinaleUnlocked(progress) && (
        <PovestiModal title="Finále" onClose={() => setModalOrder(null)}>
          <PovestiFinale
            finished={progress.finished}
            letters={letters}
            onFinished={() => save({ ...progress, finished: true })}
          />
        </PovestiModal>
      )}

      <div className={styles.resetContainer}>
        <button className={styles.resetLink} onClick={handleReset}>
          začít znovu
        </button>
      </div>
    </div>
  );
};

export default PovestiGame;
