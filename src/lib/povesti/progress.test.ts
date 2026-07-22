import { describe, expect, it } from "vitest";
import {
  defaultProgress,
  isFinaleUnlocked,
  parseProgress,
  serializeProgress,
  unlockNext,
  STATION_COUNT,
} from "./progress";

describe("parseProgress", () => {
  it("chybějící záznam dá výchozí stav", () => {
    expect(parseProgress(null)).toEqual(defaultProgress());
  });

  it("načte platný uložený stav", () => {
    const stored = {
      version: 1,
      unlockedOrder: 3,
      finished: false,
    };
    expect(parseProgress(JSON.stringify(stored))).toEqual(stored);
  });

  it("poškozený JSON resetuje na výchozí stav", () => {
    expect(parseProgress("{{{nevalidni")).toEqual(defaultProgress());
  });

  it("neznámou verzi resetuje", () => {
    expect(
      parseProgress(JSON.stringify({ version: 2, unlockedOrder: 5 }))
    ).toEqual(defaultProgress());
  });

  it("nesmyslný unlockedOrder resetuje", () => {
    for (const bad of [0, -1, 99, 2.5, "3", null]) {
      expect(
        parseProgress(
          JSON.stringify({
            version: 1,
            unlockedOrder: bad,
            finished: false,
          })
        )
      ).toEqual(defaultProgress());
    }
  });

  it("přežije roundtrip přes serializeProgress", () => {
    const progress = unlockNext(defaultProgress(), 1);
    expect(parseProgress(serializeProgress(progress))).toEqual(progress);
  });
});

describe("odemykací logika", () => {
  it("výchozí stav zůstává na prvním zastavení", () => {
    expect(defaultProgress().unlockedOrder).toBe(1);
  });

  it("správná odpověď odemkne následující zastavení", () => {
    const progress = unlockNext(defaultProgress(), 1);
    expect(progress.unlockedOrder).toBe(2);
  });

  it("opakované vyřešení dřívějšího zastavení postup nevrací zpět", () => {
    let progress = unlockNext(defaultProgress(), 1);
    progress = unlockNext(progress, 2);
    progress = unlockNext(progress, 3);
    expect(unlockNext(progress, 1).unlockedOrder).toBe(4);
  });

  it("po posledním zastavení se odemkne finále", () => {
    let progress = defaultProgress();
    for (let order = 1; order <= STATION_COUNT; order++) {
      expect(isFinaleUnlocked(progress)).toBe(false);
      progress = unlockNext(progress, order);
    }
    expect(progress.unlockedOrder).toBe(STATION_COUNT + 1);
    expect(isFinaleUnlocked(progress)).toBe(true);
  });
});

describe("reset", () => {
  it("výchozí stav začíná na prvním zastavení", () => {
    const progress = defaultProgress();
    expect(progress.unlockedOrder).toBe(1);
    expect(progress.finished).toBe(false);
    expect(isFinaleUnlocked(progress)).toBe(false);
  });
});
