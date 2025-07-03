"use client";
import { Location } from "./LocationDetail";

interface Props {
  locations: Location[];
  answers: Record<number, string>;
  onClear: () => void;
}

const Crossword = ({ locations, answers, onClear }: Props) => {
  const sortedLocations = [...locations].sort((a, b) => a.number - b.number);

  return (
    <div style={{ padding: "1rem", border: "1px solid #ddd" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Křížovka</h1>
        <button
          onClick={onClear}
          style={{
            padding: "0.25rem 0.5rem",
            cursor: "pointer",
            fontSize: "0.9rem",
          }}
        >
          Vymazat křížovku
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
        {sortedLocations.map((loc) => {
          const storedAnswer = answers[loc.number] || "";
          const letters = storedAnswer.padEnd(loc.answer.length, " ");

          return (
            <div key={loc.number} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ width: "20px", textAlign: "right", fontWeight: "bold" }}>{loc.number}</div>
              <div style={{ display: "flex", gap: "0.25rem" }}>
                {letters.split("").map((char, i) => (
                  <div
                    key={i}
                    style={{
                      width: "30px",
                      height: "30px",
                      border: "1px solid #aaa",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      fontSize: "16px",
                      backgroundColor: char.trim() ? "#f0f0f0" : "#fff"
                    }}
                  >
                    {char.trim()}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Crossword;
