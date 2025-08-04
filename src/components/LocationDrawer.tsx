"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { SwipeableDrawer, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import styles from "./locationDrawer.module.css";

export interface Location {
  number: number;
  position: [number, number];
  name: string;
  description: string;
  question: string;
  index: number;
}


interface Props {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  location: Location | undefined;
  savedAnswer: string;
  onAnswerSave: (locationId: number, answer: string) => void;
}

const LocationDetailDrawer = ({
  open,
  onClose,
  onOpen,
  location,
  savedAnswer,
  onAnswerSave,
}: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [structure, setStructure] = useState<Record<number, { length: number; spaceIndexes: number[] }>>({});

  useEffect(() => {
    fetch("/api/answer-structure")
      .then((res) => res.json())
      .then((data) => setStructure(data));
  }, []);

  useEffect(() => {
    setInput("");
    setStatus("idle");
  }, [location]);

  if (!location) return null;

  const handleSubmit = async () => {
    const normalizedInput = input.trim().toUpperCase();
    try {
      const response = await fetch("/api/check-answers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: location.number,
          userAnswer: normalizedInput.toUpperCase(),
        })
      });

      const data = await response.json();

      if (data.correct) {
        setStatus("correct");
        setInput("");
        onAnswerSave(location.number, normalizedInput);
      } else {
        setStatus("wrong");
      }
    } catch (error) {
      console.error("Chyba při odesílání odpovědi:", error);
      setStatus("wrong");
    }
  };

  const meta = structure[location.number];

if (!meta) return null;
const answerLength = meta.length;
const spaceIndexes = meta.spaceIndexes;
const base = (savedAnswer || input.toUpperCase()).slice(0, answerLength);

const padded = base.padEnd(answerLength, " ");

const displayChars = padded.split("").map((char, idx) => ({
  display: char,
  isRealSpace: spaceIndexes.includes(idx),
}));



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
            maxHeight: "100%",
            overflowY: "auto",
            padding: 3,
          },
        },
      }}
    >

      <h2 className={styles.title}>{location.name}</h2>
      <p className={styles.question}>
        <strong>Otázka:</strong> {location.question}
      </p>
      {savedAnswer ? (
        <>
          <p className={styles.correct}>✅ Odpověď správně vyplněna!</p>
          <Link href="/sifra#krizovka" scroll={true} style={{ textDecoration: 'underline', fontSize: '1.1rem' }} onClick={onClose}>K tajence! <FontAwesomeIcon icon={faArrowRightLong} /></Link>
        </>
      ) : (
        <div className={styles.inputWrapper}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
            placeholder="Vaše odpověď"
            className={styles.input}
          />
          <button onClick={handleSubmit} className={styles.button}>
            Odeslat
          </button>
          {status === "wrong" && (
            <p className={styles.wrong}>❌ Odpověď není správná.</p>
          )}
        </div>
      )}
      {!savedAnswer && (
        <div className={styles.preview}>
          {displayChars.map((cell, idx) =>
            cell.isRealSpace ? (
              <div key={idx} className={styles.break}></div>
            ) : (
              <div key={idx} className={styles.box}>{cell.display}</div>
            )
          )}
        </div>
      )}
      <div className={styles.description}>
        <strong>Legenda:</strong>
        <p >{location.description}</p>
      </div>
    </SwipeableDrawer>
  );
};

export default LocationDetailDrawer;
