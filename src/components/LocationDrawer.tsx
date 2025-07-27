"use client";

import { useState, useEffect } from "react";
import { SwipeableDrawer, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import styles from "./locationDrawer.module.css";

export interface Location {
  number: number;
  position: [number, number];
  name: string;
  description: string;
  question: string;
  answer: string;
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

  useEffect(() => {
    setInput("");
    setStatus("idle");
  }, [location]);

  if (!location) return null;

  const handleSubmit = () => {
    if (input.trim().toUpperCase() === location.answer.toUpperCase()) {
      onAnswerSave(location.number, location.answer.toUpperCase());
      setStatus("correct");
      setInput("");
    } else {
      setStatus("wrong");
    }
  };

  const displayChars = location.answer.split("").map((char, idx) => {
    const inputChar = (input[idx] ?? "").toUpperCase();
    return {
      expected: char,
      display: inputChar,
    };
  });

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
        <p className={styles.correct}>✅ Odpověď správně vyplněna!</p>
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
          {displayChars.map((cell, idx) => {
            if (cell.expected === " ") {
              return (
                <div key={idx} className={styles.break}></div>
              );
            }
            return (
              <div key={idx} className={styles.box}>
                {cell.display}
              </div>
            );
          })}
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
