import { describe, expect, it } from "vitest";
import { stations } from "@/data/povesti";
import { STATION_COUNT } from "./progress";
import { collectedLetters, TAJENKA_LENGTH } from "./tajenka";

describe("obsah zastavení (konzistence dat)", () => {
  it("má přesně 10 zastavení s pořadím 1–10", () => {
    expect(stations).toHaveLength(STATION_COUNT);
    expect(stations.map((s) => s.order).sort((a, b) => a - b)).toEqual(
      Array.from({ length: STATION_COUNT }, (_, i) => i + 1)
    );
  });

  it("id zastavení jsou unikátní", () => {
    const ids = stations.map((s) => s.id);
    expect(new Set(ids).size).toBe(stations.length);
  });

  it("každé zastavení má neprázdné texty", () => {
    for (const s of stations) {
      expect(s.legend.trim()).not.toBe("");
      expect(s.task.trim()).not.toBe("");
      expect(s.unlockMessage.trim()).not.toBe("");
      expect(s.answerHashes.length).toBeGreaterThan(0);
      for (const hash of s.answerHashes) {
        expect(hash).toMatch(/^[0-9a-f]{64}$/);
      }
    }
  });

  // pozn.: testy záměrně neobsahují znění tajenky ani pozice písmen —
  // ověřuje se jen přesmyčka (multiset písmen)
  it("po projití všech zastavení jdou z písmen složit dvě slova tajenky", () => {
    const all = collectedLetters(stations, STATION_COUNT + 1);
    expect(all).toHaveLength(TAJENKA_LENGTH);
    expect([...all].sort().join("")).toBe("CDENRRSVÉĚ");
  });
});

describe("collectedLetters", () => {
  it("na startu nemá hráč žádné písmeno", () => {
    expect(collectedLetters(stations, 1)).toEqual([]);
  });

  it("vrací písmena v pořadí zastavení", () => {
    expect(collectedLetters(stations, 4)).toEqual(["E", "N", "C"]);
  });

  it("každé zastavení dává právě jedno velké písmeno", () => {
    for (const s of stations) {
      expect(s.tajenkaLetter).toMatch(/^[A-ZĚÉ]$/u);
    }
  });
});
