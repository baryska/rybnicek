"use client";
import { SwipeableDrawer, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { AdventLocation } from "@/data/adventLocations";
import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import styles from "./adventDrawer.module.css";

interface Props {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  location: AdventLocation | undefined;
  savedLetter: string;
  onLetterSave: (locationId: number, letter: string) => void;
}

const AdventLocationDrawer = ({
  open,
  onClose,
  onOpen,
  location,
  savedLetter,
  onLetterSave,
}: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [letterInput, setLetterInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  if (!location) return null;

  const handleLetterSubmit = () => {
    const normalizedLetter = letterInput.trim().toUpperCase();
    if (normalizedLetter.length === 1 && /^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]$/i.test(normalizedLetter)) {
      onLetterSave(location.number, normalizedLetter);
      setLetterInput("");
      setIsEditing(false);
    }
  };

  const handleEdit = () => {
    setLetterInput(savedLetter);
    setIsEditing(true);
  };

  return (
    <SwipeableDrawer
      anchor={isMobile ? "bottom" : "left"}
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      transitionDuration={{ enter: 500, exit: 500 }}
      slotProps={{
        paper: {
          sx: {
            width: isMobile ? "100%" : 500,
            maxHeight: isMobile ? "85vh" : "100%",
            overflowY: "auto",
            padding: 3,
            backgroundColor: "white",
          },
        },
      }}
    >
      <div className={styles.dayNumber}>{location.number}</div>
      <h2 className={styles.title}>{location.name}</h2>
      <div className={styles.description}>
        {location.description.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <div className={styles.letterSection}>
        <h3 className={styles.letterTitle}>Písmeno do tajenky:</h3>
        {savedLetter && !isEditing ? (
          <div className={styles.letterSaved}>
            <div className={styles.letterBox}>{savedLetter}</div>
            <p className={styles.letterConfirm}>✅ Písmeno uloženo!</p>
            <button
              onClick={handleEdit}
              className={styles.letterEditButton}
            >
              Upravit písmeno
            </button>
            <Link
              href="#sesbirana-pismena"
              className={styles.letterLink}
              onClick={onClose}
            >
              K tajence! <FontAwesomeIcon icon={faArrowRightLong} />
            </Link>
          </div>
        ) : (
          <div className={styles.letterInput}>
            <p className={styles.letterHint}>Našli jste písmeno? Zapište ho zde:</p>
            <div className={styles.letterInputWrapper}>
              <input
                type="text"
                value={letterInput}
                onChange={(e) => {
                  const value = e.target.value.toUpperCase();
                  if (value.length <= 1 && /^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]*$/i.test(value)) {
                    setLetterInput(value);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleLetterSubmit();
                }}
                placeholder="A-Ž"
                className={styles.letterField}
                maxLength={1}
              />
              <button
                onClick={handleLetterSubmit}
                className={styles.letterButton}
                disabled={letterInput.length !== 1}
              >
                Uložit
              </button>
            </div>
          </div>
        )}
      </div>
    </SwipeableDrawer>
  );
};

export default AdventLocationDrawer;
