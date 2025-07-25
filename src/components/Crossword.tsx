"use client";
import { Location } from "./LocationDrawer";
import styles from './crossword.module.css';
import Image from "next/image";
import Socials from "./Socials";
import Link from "next/link";

interface Props {
  locations: Location[];
  answers: Record<number, string>;
  onClear: () => void;
}

const Crossword = ({ locations, answers, onClear }: Props) => {
  const sortedLocations = [...locations].sort((a, b) => a.number - b.number);
  const maxIndex = Math.max(...sortedLocations.map((loc) => loc.index));

  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <p className={styles.title}>Vítejte na <strong>Berounské letní šifrovačce!</strong></p>
        <p>Zjistěte <strong>tajenku</strong> a vyhrajte jednu z <strong>tematických cen</strong>.</p>
        <p>Každá z <strong>berounských lokalit</strong> na mapě má u sebe <strong>otázku</strong>, na níž musíte odpovědět.</p>
        <p><strong>Odpovědi</strong> si můžete zapisovat po staru na papír (ke stažení zde), nebo je můžete vyplňovat přímo tady na webu.
        </p>
        <p>Odpovědi na některé otázky zjistíte snadno z domova, ale u některých se budete
          muset <strong>vydat přímo na místo</strong>, případně se zeptat místních.
        </p>
        <p>Není nutné vyluštit všechna slova, podstatné je odevzdat <strong>správně vyluštěnou tajenku</strong>.</p>
        <p>Ten, kdo vyluští <strong>všech 31 lokalit</strong>, však může vyhrát zvláštní cenu.</p>
        <p>Soutěž probíhá do <strong>konce srpna</strong>, správnou tajenku odešlete ve formuláři pod křížovkou nebo nám ji i se svým jménem a příjmením pošlete na email:</p>
        <p style={{ textAlign: 'center' }}><strong className={styles.email}>info@berounskyrybnicek.cz</strong></p>
        <p>Všechny výherce budeme losovat v <strong>prvním zářijovém týdnu</strong>, sledujte náš IG a FB!</p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className={styles.logoContainer}>
            <Link
              href="/"
              rel="noopener noreferrer"
              aria-label="Homepage"
            >
              <Image src="/logo_orange.svg" alt="Logo" width={100} height={100} className={styles.logo} />
            </Link>
          </div>
          <Socials />
          <div className={styles.logoContainer}>
            <a
              href="https://www.nadacevia.cz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nadace Via"
            >
              <Image src="/via.png" alt="Logo" width={150} height={80} className={styles.logo} />
            </a>
          </div>
        </div>
      </div>
      <p className={styles.note}>(Křížovku vyplňte kliknutím na konkrétní místo přímo v mapě.)</p>
      <button
        onClick={onClear}
        className={styles.button}
      >
        Vymazat křížovku
      </button>
      <div className={styles.crossword}>
        {sortedLocations.map((loc) => {
          const storedAnswer = answers[loc.number]?.toUpperCase() || "";
          const fullAnswer = storedAnswer.padEnd(loc.answer.length, " ");

          const leftPad = maxIndex - loc.index;

          const displayChars = [
            ...Array(leftPad).fill({ char: "", isPadding: true }),
            ...fullAnswer.split("").map((c, idx) => ({
              char: c,
              isPadding: false,
              isRealSpace: loc.answer[idx] === " ",
            })),
          ];

          return (
            <div key={loc.number} className={styles.row}>
              <div className={styles.number}>{loc.number}</div>
              <div className={styles.cells}>
                {displayChars.map((cell, i) => {
                  if (cell.isPadding || cell.isRealSpace) {
                    return <div key={i} className={styles.empty}></div>;
                  }

                  const isTajenky = i === maxIndex;

                  return (
                    <div
                      key={i}
                      className={`${styles.cell} ${isTajenky ? styles.tajenky : ""
                        }`}
                    >
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
