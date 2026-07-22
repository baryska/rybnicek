"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Station } from "@/data/povesti";
import { checkAnswer } from "@/lib/povesti/normalize";
import PovestiText, { renderInline } from "./PovestiText";
import styles from "./povesti.module.css";

const PovestiPlaceMap = dynamic(() => import("./PovestiPlaceMap"), {
  ssr: false,
  loading: () => <p className={styles.placeMapLoading}>Načítám mapu…</p>,
});

type Props = {
  station: Station;
  solved: boolean;
  onCorrect: () => void;
  onContinue: () => void;
};

const PovestiStationCard = ({
  station,
  solved,
  onCorrect,
  onContinue,
}: Props) => {
  const [answer, setAnswer] = useState("");
  const [checking, setChecking] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [photoExpanded, setPhotoExpanded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (checking || answer.trim() === "") return;
    setChecking(true);
    const correct = await checkAnswer(answer, station.answerHashes);
    setChecking(false);
    if (correct) {
      setShowWrong(false);
      onCorrect();
    } else {
      setShowWrong(true);
    }
  };

  return (
    <div className={styles.cardContent}>
      <h2 className={styles.stationTitle}>
        {station.order}. {station.title}
      </h2>
      <button
        type="button"
        className={styles.placeMapToggle}
        onClick={() => setShowMap((v) => !v)}
      >
        {showMap ? "Skrýt mapu" : "🗺️ Kde to je? Ukázat na mapě"}
      </button>
      {showMap && (
        <PovestiPlaceMap coords={station.coords} label={station.title} />
      )}

      <div className={styles.legend}>
        <strong className={styles.sectionLabel}>Pověst</strong>
        {station.imageSlot && (
          <button
            type="button"
            className={`${styles.photo} ${
              photoExpanded ? styles.photoExpanded : ""
            }`}
            onClick={() => setPhotoExpanded((v) => !v)}
            aria-label={
              photoExpanded ? "Zmenšit fotografii" : "Zvětšit fotografii"
            }
          >
            <Image
              src={station.imageSlot}
              alt={station.title}
              fill
              sizes="(max-width: 768px) 90vw, 40rem"
              style={{ objectFit: "cover" }}
            />
          </button>
        )}
        <PovestiText text={station.legend} />
      </div>

      {solved ? (
        <>
          <div className={styles.unlockMessage}>
            <strong className={styles.unlockCheck}>✓ Vyřešeno!</strong>
            <br />
            {renderInline(station.unlockMessage)}
          </div>
          <div className={styles.letterReward}>
            <span className={styles.letterRewardLabel}>
              Získali jste písmeno tajenky:
            </span>
            <span className={styles.letterRewardTile}>
              {station.tajenkaLetter}
            </span>
          </div>
          <div className={styles.answerForm}>
            <button className={styles.button} onClick={onContinue}>
              Zpět na mapu →
            </button>
          </div>
        </>
      ) : (
        <>
          <p className={styles.task}>
            <strong>Úkol:</strong> {station.task}
          </p>
          <form className={styles.answerForm} onSubmit={handleSubmit}>
            <input
              type="text"
              className={styles.input}
              placeholder="Sem napište, co jste našli"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                setShowWrong(false);
              }}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
            />
            <button
              type="submit"
              className={styles.button}
              disabled={checking || answer.trim() === ""}
            >
              Odemknout další pověst
            </button>
            {showWrong && (
              <p className={styles.wrong} role="alert">
                To není správná odpověď — zkuste to znovu.
              </p>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default PovestiStationCard;
