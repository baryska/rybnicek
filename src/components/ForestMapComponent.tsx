"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngTuple } from "leaflet";
import { forestStations, ForestStation } from "@/data/forestLocations";
import { useState, useEffect } from "react";
import ForestLocationDrawer from "./ForestLocationDrawer";
import Link from "next/link";
import ForestSubmitForm from "./ForestSubmitForm";
import styles from "./forestMap.module.css";
import pageStyles from "../app/vinice/style.module.css";

const CIPHER_KEY_ALWAYS_VISIBLE = false;

const cipherMap: Record<string, string> = {
  A: "N", B: "O", C: "P", D: "Q", E: "R", F: "S", G: "T",
  H: "U", I: "V", J: "W", K: "X", L: "Y",
  N: "A", O: "B", P: "C", Q: "D", R: "E", S: "F", T: "G",
  U: "H", V: "I", W: "J", X: "K", Y: "L",
  M: " ",
};

const topRow = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
const bottomRow = ["N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", " "];

function decodeLetter(letter: string): string {
  return cipherMap[letter.toUpperCase()] || "?";
}

const ForestMapComponent = () => {
  const [activeStationId, setActiveStationId] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [collectedLetters, setCollectedLetters] = useState<Record<number, string>>({});
  const [decodedLetters, setDecodedLetters] = useState<Record<number, string>>({});
  const [mounted, setMounted] = useState(false);

  const activeStation: ForestStation | undefined = forestStations.find(
    (s) => s.number === activeStationId
  );

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("forestLetters");
    if (saved) {
      setCollectedLetters(JSON.parse(saved));
    }
    const savedDecoded = localStorage.getItem("forestDecoded");
    if (savedDecoded) {
      setDecodedLetters(JSON.parse(savedDecoded));
    }
  }, []);

  const handleLetterSave = (taskNumber: number, letter: string) => {
    const newLetters = { ...collectedLetters, [taskNumber]: letter };
    setCollectedLetters(newLetters);
    localStorage.setItem("forestLetters", JSON.stringify(newLetters));
  };

  const handleLetterChange = (taskNumber: number, letter: string) => {
    const upper = letter.toUpperCase();
    if (upper.length > 1) return;
    const newLetters = { ...collectedLetters };
    if (upper === "") {
      delete newLetters[taskNumber];
    } else {
      newLetters[taskNumber] = upper;
    }
    setCollectedLetters(newLetters);
    localStorage.setItem("forestLetters", JSON.stringify(newLetters));
  };

  const handleDecodedChange = (position: number, letter: string) => {
    const upper = letter.toUpperCase();
    if (upper.length > 1) return;
    const newDecoded = { ...decodedLetters };
    if (upper === "") {
      delete newDecoded[position];
    } else {
      newDecoded[position] = upper;
    }
    setDecodedLetters(newDecoded);
    localStorage.setItem("forestDecoded", JSON.stringify(newDecoded));
  };

  const handleClearAll = () => {
    if (window.confirm("Opravdu chcete vymazat všechna sesbíraná písmena?")) {
      setCollectedLetters({});
      setDecodedLetters({});
      localStorage.removeItem("forestLetters");
      localStorage.removeItem("forestDecoded");
    }
  };

  const handleStationClick = (stationId: number) => {
    setActiveStationId(stationId);
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setTimeout(() => setDrawerOpen(true), 600);
    } else {
      setDrawerOpen(true);
    }
  };

  if (!mounted) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Načítám mapu...</div>;
  }

  const center: LatLngTuple = [49.965, 14.045];
  const totalTasks = 13;
  const filledCount = Object.keys(collectedLetters).length;
  const showCipherKey = CIPHER_KEY_ALWAYS_VISIBLE || filledCount >= totalTasks;

  return (
    <>
      <div style={{ position: "relative" }}>
        <MapContainer center={center} zoom={18} className={styles.map}>
          <TileLayer
            attribution='&copy; <a href="https://www.cyclosm.org/">CyclOSM</a> &copy; OpenStreetMap contributors'
            url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
            maxZoom={20}
          />
          {forestStations.map((station) => {
            const iconUrl = `/${station.number}.png`;
            const numberedIcon = new L.Icon({
              iconUrl,
              iconSize: [60, 60],
              iconAnchor: [16, 32],
              popupAnchor: [0, -32],
            });
            return (
              <Marker
                key={station.number}
                position={station.position as LatLngTuple}
                icon={numberedIcon}
                eventHandlers={{
                  click: () => handleStationClick(station.number),
                }}
              >
                <Popup>{station.name}</Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      <h1 className={styles.title} style={{ textAlign: "center", margin: "3rem auto 1rem" }}>
        Lesní hra z Vinice
      </h1>

      <div className={styles.info}>
        <p className={styles.infoText}>
          Zveme vás na <strong>procházku lesem nad Berounem</strong>. Na cestě lesem vás čeká{" "}
          <strong>7 stanovišť a 13 úkolů</strong>. U každého úkolu vyberete správnou odpověď a
          odpovídající písmeno si zapíšete do tajenky.
        </p>
        <p className={styles.infoText}>
          Až projdete všechna stanoviště, vyjde vám <strong>zašifrovaná tajenka</strong>, která
          souvisí s tímto místem. Ještě budete potřebovat <strong>šifrovací klíč</strong>, který
          vám ukážeme, až budete mít všechna písmena sesbíraná.
        </p>
        <p className={styles.infoText}>
          Kliknutím na stanoviště v mapě si můžete přečíst úkoly. Odpověď se vám kliknutím automaticky zapíše do tajenky zde na webu, případně si ji vyplňte do své papírové tajenky.
        </p>
        <p className={styles.infoText} style={{ textAlign: "left", marginTop: "3rem" }}>
          Tato hra vznikla ve spolupráci s berounským spolkem{" "}
          <a
            href="https://www.facebook.com/profile.php?id=61585544017185"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#e5816d", textDecoration: "underline" }}
          >
            Vinice
          </a>.
        </p>

        <div className={styles.rulesSection}>
          <div className={styles.rulesTitle}>Pravidla v lese</div>
          <ul className={styles.rulesList}>
            <li>Nekřičíme (pokud to není o pomoc)</li>
            <li>Nepoškozujeme stromy (pokud nejsme zajíc, co potřebuje obrousit zuby)</li>
            <li>Nekrmíme žádná zvířata (kromě svých)</li>
            <li>Nenecháváme po sobě v lese odpadky</li>
          </ul>
        </div>

        <div id="tajenka" className={styles.tajenkaSection}>
          <div className={styles.tajenkaHeader}>
            <h2 className={styles.tajenkaTitle}>
              Tajenka ({filledCount}/{totalTasks})
            </h2>
            {filledCount > 0 && (
              <button onClick={handleClearAll} className={styles.clearButton}>
                Vymazat vše
              </button>
            )}
          </div>
          <p className={styles.tajenkaHint}>
            Zapište písmena z odpovědí na správné pozice
          </p>
          <div className={styles.tajenkaGrid}>
            {Array.from({ length: totalTasks }, (_, i) => i + 1).map((num) => (
              <div key={num} className={styles.tajenkaItem}>
                <div className={styles.tajenkaNumber}>{num}</div>
                <input
                  type="text"
                  maxLength={1}
                  value={collectedLetters[num] || ""}
                  onChange={(e) => handleLetterChange(num, e.target.value)}
                  className={`${styles.tajenkaInput} ${collectedLetters[num] ? styles.tajenkaInputFilled : ""}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.cipherSection}>
          <h2 className={styles.cipherTitle}>Šifrovací klíč</h2>
          {showCipherKey ? (
            <>
              <div className={styles.cipherTable}>
                <div className={styles.cipherRow}>
                  {topRow.map((letter, i) => (
                    <div key={i} className={`${styles.cipherCell} ${styles.cipherCellTop}`}>
                      {letter}
                    </div>
                  ))}
                </div>
                <div className={styles.cipherArrow}>↕</div>
                <div className={styles.cipherRow}>
                  {bottomRow.map((letter, i) => (
                    <div
                      key={i}
                      className={`${styles.cipherCell} ${styles.cipherCellBottom} ${
                        letter === " " ? styles.cipherCellSpace : ""
                      }`}
                    >
                      {letter === " " ? "mezera" : letter}
                    </div>
                  ))}
                </div>
              </div>
              <p style={{ textAlign: "center", color: "#346f70", fontSize: "1rem" }}>
                Každé písmeno v horní řadě odpovídá tomu pod ním a funguje to i opačně.
              </p>

              <div className={styles.decodedSection}>
                <div className={styles.decodedLabel}>Vyluštěná tajenka:</div>
                <p style={{ textAlign: "center", color: "#346f70", fontSize: "0.95rem", marginBottom: "1rem" }}>
                  Pomocí šifrovacího klíče převeďte svá písmena a zapište výsledek
                </p>
                <div className={styles.decodedGrid}>
                  {Array.from({ length: totalTasks }, (_, i) => i + 1).map((num) => (
                    <div key={num} className={styles.tajenkaItem}>
                      <div className={styles.tajenkaNumber}>{num}</div>
                      <input
                        type="text"
                        maxLength={1}
                        value={decodedLetters[num] || ""}
                        onChange={(e) => handleDecodedChange(num, e.target.value)}
                        className={`${styles.decodedInput} ${decodedLetters[num] ? styles.decodedInputFilled : ""}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className={styles.cipherHidden}>
              Šifrovací klíč vám ukážeme, až sesbíráte všechna písmena :)
            </div>
          )}
        </div>

        <ForestSubmitForm />

        <div className={pageStyles.instructionsLinkContainer}>
          <Link href="/" className={pageStyles.instructionsLink}>
            Zpět na hlavní stránku
          </Link>
        </div>
      </div>

      <ForestLocationDrawer
        open={drawerOpen}
        onOpen={() => setDrawerOpen(true)}
        onClose={() => setDrawerOpen(false)}
        station={activeStation}
        collectedLetters={collectedLetters}
        onLetterSave={handleLetterSave}
      />
    </>
  );
};

export default ForestMapComponent;
