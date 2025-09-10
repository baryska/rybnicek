"use client";
import { useEffect, useState } from "react";
import { Location } from "./LocationDrawer";
import styles from './crossword.module.css';
import Image from "next/image";
import Socials from "./Socials";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from "@fortawesome/free-solid-svg-icons";

interface Props {
  locations: Location[];
  answers: Record<number, string>;
  onClear: () => void;
}

interface StructureItem {
  length: number;
  spaceIndexes: number[];
}

const Crossword = ({ locations, answers, onClear }: Props) => {
  const [structure, setStructure] = useState<Record<number, StructureItem> | null>(null);

  useEffect(() => {
    const fetchStructure = async () => {
      const response = await fetch("/api/answer-structure");
      const data = await response.json();
      setStructure(data);
    };
    fetchStructure();
  }, []);

  const sortedLocations = [...locations].sort((a, b) => a.number - b.number);
  const maxIndex = Math.max(...sortedLocations.map((loc) => loc.index));

  if (!structure) return null;

  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <p className={styles.title}>Vítejte na <strong>Berounské letní šifrovačce!</strong></p>
        <p>Zjistěte <strong>zajímavosti o Berouně</strong> a vyluštěte <strong>tajenku</strong>.</p>
        <p>Každá z <strong>berounských lokalit</strong> na mapě má u sebe <strong>otázku</strong>, na níž musíte odpovědět.</p>
        <p><strong>Odpovědi</strong> si můžete zapisovat po staru na papír (ke stažení <a href="/Berounska letni sifrovacka.pdf" download style={{ textDecoration: 'underline' }}>zde</a>) nebo je můžete vyplňovat přímo <Link href="#krizovka" scroll={true} style={{ textDecoration: 'underline' }}>tady na webu</Link>.</p>
        <p>Odpovědi na některé otázky zjistíte snadno z domova, ale u některých se budete muset <strong>vydat přímo na místo</strong>, případně se zeptat místních.</p>
        {/* <p>Není nutné vyluštit všechna slova, podstatné je odevzdat <strong>správně vyluštěnou tajenku</strong>.</p>
        <p>Ten, kdo vyluští <strong>všech 31 lokalit</strong>, však může vyhrát zvláštní cenu.</p>
        <p>Soutěž probíhá do <strong>konce srpna</strong>, správnou tajenku odešlete ve formuláři pod křížovkou nebo nám ji i se svým jménem a příjmením pošlete na email:</p>
        <p style={{ textAlign: 'center' }}><strong className={styles.email}>info@berounskyrybnicek.cz</strong></p>
        <p>Všechny výherce budeme losovat v <strong>prvním zářijovém týdnu</strong>, sledujte náš IG a FB!</p> */}
        <p>Letní soutež o ceny už skončila, ale můžete luštit jen tak <strong>pro radost</strong><FontAwesomeIcon style={{ marginLeft: '0.5rem' }} icon={faHeart} size="lg" beat /></p>
        <div className={styles.logosWrapper}>
          <div className={styles.logoContainer}>
            <Link href="/" rel="noopener noreferrer" aria-label="Homepage">
              <Image src="/logo_orange.svg" alt="Logo" width={100} height={100} className={styles.logo} />
            </Link>
          </div>
          <Socials />
          <div className={styles.logoContainer}>
            <a href="https://www.nadacevia.cz" target="_blank" rel="noopener noreferrer" aria-label="Nadace Via">
              <Image src="/via.png" alt="Logo" width={150} height={80} className={styles.logo} />
            </a>
          </div>
        </div>
        <div className={styles.logosWrapper_mobile}>
          <Socials />
          <div className={styles.wrapper}>
            <Link href="/" rel="noopener noreferrer" aria-label="Homepage">
              <Image src="/logo_orange.svg" alt="Logo" width={100} height={100} className={styles.logo} style={{ marginLeft: '0.8rem' }} />
            </Link>
            <div className={styles.logoContainer}>
              <a href="https://www.nadacevia.cz" target="_blank" rel="noopener noreferrer" aria-label="Nadace Via">
                <Image src="/via.png" alt="Logo" width={150} height={80} className={styles.logo} style={{ marginLeft: '0.5rem' }} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <p className={styles.note}>(Křížovku vyplňte kliknutím na konkrétní místo přímo v mapě.)</p>
      <button onClick={onClear} className={styles.button} id="krizovka">
        Vymazat křížovku
      </button>
      <div className={styles.crossword}>
        {sortedLocations.map((loc) => {
          const meta = structure[loc.number];
          if (!meta) return null;

          const storedAnswer = answers[loc.number]?.toUpperCase() || "";
          const fullAnswer = storedAnswer.padEnd(meta.length, " ");

          const displayChars = fullAnswer.split("").map((char, idx) => ({
            char,
            isPadding: false,
            isRealSpace: meta.spaceIndexes.includes(idx),
          }));

          const leftPad = maxIndex - loc.index;
          const paddedChars = [
            ...Array(leftPad).fill({ char: "", isPadding: true }),
            ...displayChars,
          ];

          return (
            <div key={loc.number} className={styles.row}>
              <div className={styles.number}>{loc.number}</div>
              <div className={styles.cells}>
                {paddedChars.map((cell, i) => {
                  if (cell.isPadding || cell.isRealSpace) {
                    return <div key={i} className={styles.empty}></div>;
                  }

                  const isTajenky = i === maxIndex;

                  return (
                    <div key={i} className={`${styles.cell} ${isTajenky ? styles.tajenky : ""}`}>
                      {cell.char.trim()}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Crossword;
