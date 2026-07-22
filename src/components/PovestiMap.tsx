"use client";

import { getStationByOrder } from "@/data/povesti";
import { STATION_COUNT } from "@/lib/povesti/progress";
import styles from "./povesti.module.css";

const FINALE_ORDER = STATION_COUNT + 1;

/** Pozice zastavení na stylizované mapě (viewBox 400 × 800). */
const POSITIONS: Record<number, { x: number; y: number }> = {
  1: { x: 70, y: 78 },
  2: { x: 302, y: 118 },
  3: { x: 104, y: 188 },
  4: { x: 312, y: 250 },
  5: { x: 96, y: 318 },
  6: { x: 300, y: 382 },
  7: { x: 102, y: 448 },
  8: { x: 308, y: 512 },
  9: { x: 98, y: 580 },
  10: { x: 296, y: 644 },
  [FINALE_ORDER]: { x: 160, y: 726 },
};

const EMOJIS: Record<number, string> = {
  1: "🔨",
  2: "👣",
  3: "👑",
  4: "🗝️",
  5: "🕯️",
  6: "🔥",
  7: "🐻",
  8: "🎣",
  9: "🦅",
  10: "💧",
  [FINALE_ORDER]: "💰",
};

/** Krátké popisky pro mapu (plný název je v modálu). */
const MAP_LABELS: Record<number, string> = {
  1: "Klepáček",
  2: "Na Klášteře",
  3: "U tří korun",
  4: "Bílá paní",
  5: "Mše mrtvých",
  6: "Ohnivý Beha",
  7: "Založení Berouna",
  8: "Rybář od brodu",
  9: "Na Ptáku",
  10: "U Boží vody",
  [FINALE_ORDER]: "Purkmistrův poklad",
};

/** Zvlněná cesta mezi dvěma body — zatáčí střídavě doleva a doprava. */
function legPath(
  a: { x: number; y: number },
  b: { x: number; y: number },
  index: number
): string {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const offset = (index % 2 === 0 ? 1 : -1) * 30;
  const cx = mx + (-dy / len) * offset;
  const cy = my + (dx / len) * offset;
  return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`;
}

type Props = {
  unlockedOrder: number;
  finished: boolean;
  onSelect: (order: number) => void;
};

const PovestiMap = ({ unlockedOrder, finished, onSelect }: Props) => {
  const nodes = Array.from({ length: FINALE_ORDER }, (_, i) => i + 1);

  return (
    <div className={styles.mapWrapper}>
      <svg
        className={styles.mapSvg}
        viewBox="0 0 400 800"
        role="group"
        aria-label="Mapa stezky s deseti zastaveními a pokladem"
      >
        <defs>
          <radialGradient id="povesti-node-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e5816d" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#e5816d" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="povesti-gold-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f0c069" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#f0c069" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* dekorace — kopce, řeka, hvězdy, kompas */}
        <g className={styles.mapDeco} aria-hidden="true">
          <path d="M -10 780 Q 60 740 130 775 Q 200 805 270 772 Q 340 742 410 780" />
          <path d="M -10 745 Q 80 710 170 742" />
          <path d="M 225 -10 Q 200 90 245 190 Q 290 290 230 400 Q 175 500 235 610 Q 268 670 250 740 Q 244 770 250 810" className={styles.mapRiver} />
          <circle cx="40" cy="640" r="1.6" className={styles.mapStar} />
          <circle cx="360" cy="60" r="1.6" className={styles.mapStar} />
          <circle cx="190" cy="28" r="1.3" className={styles.mapStar} />
          <circle cx="350" cy="330" r="1.3" className={styles.mapStar} />
          <circle cx="28" cy="260" r="1.3" className={styles.mapStar} />
          <circle cx="205" cy="470" r="1.3" className={styles.mapStar} />
          <circle cx="42" cy="512" r="1.4" className={styles.mapStar} />
          <circle cx="356" cy="586" r="1.4" className={styles.mapStar} />
          <g className={styles.mapCompass} transform="translate(352, 736)">
            <circle r="20" />
            <path d="M 0 -14 L 4 4 L 0 0 L -4 4 Z" className={styles.mapCompassNeedle} />
            <text y="-24" textAnchor="middle">S</text>
          </g>
        </g>

        {/* cesta mezi zastaveními */}
        {nodes.slice(0, -1).map((order) => {
          const solved = unlockedOrder > order;
          return (
            <path
              key={`leg-${order}`}
              d={legPath(POSITIONS[order], POSITIONS[order + 1], order)}
              className={solved ? styles.legSolved : styles.legLocked}
            />
          );
        })}

        {/* zastavení + poklad */}
        {nodes.map((order) => {
          const pos = POSITIONS[order];
          const isFinale = order === FINALE_ORDER;
          const unlocked = order <= unlockedOrder;
          const solved = isFinale ? finished : order < unlockedOrder;
          const current = unlocked && !solved;
          const station = getStationByOrder(order);
          const label = unlocked ? MAP_LABELS[order] : "???";

          return (
            <g
              key={order}
              transform={`translate(${pos.x}, ${pos.y})`}
              className={`${styles.marker} ${unlocked ? styles.markerUnlocked : styles.markerLocked}`}
              role={unlocked ? "button" : undefined}
              tabIndex={unlocked ? 0 : undefined}
              aria-label={
                unlocked
                  ? isFinale
                    ? "Otevřít finále"
                    : `Otevřít zastavení ${order}: ${station?.title}`
                  : "Zamčené zastavení"
              }
              onClick={unlocked ? () => onSelect(order) : undefined}
              onKeyDown={
                unlocked
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onSelect(order);
                      }
                    }
                  : undefined
              }
            >
              {current && (
                <circle
                  r="34"
                  className={styles.halo}
                  fill={`url(#povesti-${isFinale ? "gold" : "node"}-glow)`}
                />
              )}
              <circle
                r="24"
                className={
                  solved
                    ? styles.nodeSolved
                    : current
                      ? isFinale
                        ? styles.nodeFinale
                        : styles.nodeCurrent
                      : styles.nodeLocked
                }
              />
              <text className={styles.markerEmoji} y="8" textAnchor="middle">
                {unlocked ? EMOJIS[order] : "?"}
              </text>
              {solved &&
                (isFinale ? (
                  <g transform="translate(17, -17)">
                    <circle r="9" className={styles.checkBadge} />
                    <text
                      y="3.5"
                      textAnchor="middle"
                      className={styles.checkMark}
                    >
                      ✓
                    </text>
                  </g>
                ) : (
                  // získané písmeno tajenky — vidět přímo u vyřešeného místa
                  <g transform="translate(18, -18)">
                    <circle r="11" className={styles.letterBadge} />
                    <text
                      y="4.5"
                      textAnchor="middle"
                      className={styles.letterBadgeText}
                    >
                      {station?.tajenkaLetter}
                    </text>
                  </g>
                ))}
              {!isFinale && (
                <text y="-30" textAnchor="middle" className={styles.markerNumber}>
                  {order}
                </text>
              )}
              <text y="44" textAnchor="middle" className={styles.markerLabel}>
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default PovestiMap;
