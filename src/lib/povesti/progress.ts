/**
 * Postup hráče Stezkou berounských pověstí — čisté funkce nad schématem
 * ukládaným do localStorage (klíč POVESTI_STORAGE_KEY).
 */

export const POVESTI_STORAGE_KEY = "povesti-2026";
export const STATION_COUNT = 10;

export type PovestiProgress = {
  version: 1;
  /** Nejvyšší odemčené pořadí; STATION_COUNT + 1 = odemčené finále. */
  unlockedOrder: number;
  finished: boolean;
};

export function defaultProgress(): PovestiProgress {
  return { version: 1, unlockedOrder: 1, finished: false };
}

/**
 * Načte postup ze surové hodnoty localStorage. Nevalidní obsah
 * (cizí data, stará verze, poškozený JSON) v klidu resetuje na výchozí stav.
 */
export function parseProgress(raw: string | null): PovestiProgress {
  if (raw === null) return defaultProgress();
  try {
    const data: unknown = JSON.parse(raw);
    if (typeof data !== "object" || data === null) return defaultProgress();
    const p = data as Record<string, unknown>;
    if (p.version !== 1) return defaultProgress();
    if (
      typeof p.unlockedOrder !== "number" ||
      !Number.isInteger(p.unlockedOrder) ||
      p.unlockedOrder < 1 ||
      p.unlockedOrder > STATION_COUNT + 1
    ) {
      return defaultProgress();
    }
    if (typeof p.finished !== "boolean") return defaultProgress();
    return {
      version: 1,
      unlockedOrder: p.unlockedOrder,
      finished: p.finished,
    };
  } catch {
    return defaultProgress();
  }
}

export function serializeProgress(progress: PovestiProgress): string {
  return JSON.stringify(progress);
}

/** Odemkne zastavení následující po `order` (po posledním finále). */
export function unlockNext(
  progress: PovestiProgress,
  order: number
): PovestiProgress {
  return {
    ...progress,
    unlockedOrder: Math.max(progress.unlockedOrder, order + 1),
  };
}

export function isFinaleUnlocked(progress: PovestiProgress): boolean {
  return progress.unlockedOrder > STATION_COUNT;
}
