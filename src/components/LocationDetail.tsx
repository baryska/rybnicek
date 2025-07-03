"use client";

import { useState } from "react";

export interface Location {
  number: number;
  position: [number, number];
  name: string;
  description: string;
  question: string;
  answer: string;
}

interface Props {
  location: Location | null;
  savedAnswer: string;
  onAnswerSave: (locationId: number, answer: string) => void;
}

const LocationDetail: React.FC<Props> = ({ location, savedAnswer, onAnswerSave }) => {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");

  if (!location) {
    return (
      <div style={{ padding: "1rem", border: "1px solid #ddd" }}>
        <p>Vyberte místo na mapě.</p>
      </div>
    );
  }

  const handleSubmit = () => {
    if (input.trim().toUpperCase() === location.answer.toUpperCase()) {
      onAnswerSave(location.number, location.answer.toUpperCase());
      setStatus("correct");
      setInput("");
    } else {
      setStatus("wrong");
    }
  };

  return (
    <div style={{ padding: "1rem", border: "1px solid #ddd" }}>
      <h2>{location.name}</h2>
      <p>{location.description}</p>
      <p><strong>Otázka:</strong> {location.question}</p>

      {savedAnswer ? (
        <>
          <p style={{ color: "green" }}>✅ Odpověď správně vyplněna!</p>
        </>
      ) : (
        <>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
            placeholder="Vaše odpověď"
            style={{ padding: "0.5rem", width: "100%", marginTop: "0.5rem" }}
          />
          <button
            onClick={handleSubmit}
            style={{
              marginTop: "0.5rem",
              padding: "0.5rem 1rem",
              cursor: "pointer"
            }}
          >
            Odeslat
          </button>
          {status === "wrong" && (
            <p style={{ color: "red", marginTop: "0.5rem" }}>
              ❌ Odpověď není správná.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default LocationDetail;
