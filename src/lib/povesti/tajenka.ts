/**
 * Tajenka — každé zastavení odhaluje jedno písmeno (`tajenkaLetter`),
 * dvě slova z nich hráč skládá sám. Pozice písmen v tajence záměrně
 * v klientských datech nejsou, aby z bundlu nešla tajenka rekonstruovat.
 */

import type { Station } from "@/data/povesti";

export const TAJENKA_LENGTH = 10;

/** Posbíraná písmena v pořadí zastavení (bez pozic v tajence). */
export function collectedLetters(
  stations: Station[],
  unlockedOrder: number
): string[] {
  return stations
    .filter((station) => station.order < unlockedOrder)
    .map((station) => station.tajenkaLetter);
}
