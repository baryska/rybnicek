"use client";
import { Location } from "./LocationDrawer";
import styles from './crossword.module.css'

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
        <p style={{ fontSize: '3rem' }}>Vítejte na <strong>Berounské letní šifrovačce!</strong></p>
        <p>Zjistěte <strong>tajenku</strong> a vyhrajte jednu z <strong>tematických cen</strong>.</p>
        <p>Každá z <strong>berounských lokalit</strong> na mapě má u sebe <strong>otázku</strong>, na níž musíte odpovědět.</p>
        <p><strong>Odpovědi</strong> si můžete zapisovat po staru na papír (ke stažení zde), nebo je můžete vyplňovat přímo tady.
        </p>
        <p>Odpovědi na některé otázky zjistíte snadno z domova, ale u některých se budete
          muset <strong>vydat přímo na místo</strong>, případně se zeptat místních.
        </p>
        <p>Zvláštní cenu dostane i ten, kdo vyluští <strong>všech 31 lokalit</strong>, a speciální
          odměna čeká i na úspěšného luštitele <strong>bonusové noční otázky</strong>.
        </p>
        <p>Soutěž probíhá do <strong>konce srpna</strong>, správnou tajenku nám pošlete na email <strong style={{ fontSize: '1.7rem' }}>tajenka@berounskyrybnicek.cz</strong></p>
        <p>Všechny výherce budeme losovat v <strong>prvním zářijovém týdnu</strong>, sledujte náš IG a FB!</p>
      </div>
      <p>(Křížovku vyplňte kliknutím na konkrétní místo přímo v mapě.)</p>
      <button
        onClick={onClear}
        className={styles.button}
      >
        Vymazat křížovku
      </button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          marginTop: "1rem"
        }}
      >
        {sortedLocations.map((loc) => {
          const storedAnswer = answers[loc.number]?.toUpperCase() || "";
          const fullAnswer = storedAnswer.padEnd(loc.answer.length, " ");

          const leftPad = maxIndex - (loc.index);

          const displayChars = [
            ...Array(leftPad).fill({ char: "", isPadding: true }),
            ...fullAnswer.split("").map((c, idx) => ({
              char: c,
              isPadding: false,
              // pokud v loc.answer je mezera na této pozici, je to vizuální mezera
              isRealSpace: loc.answer[idx] === " "
            }))
          ];


          return (
            <div
              key={loc.number}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <div
                style={{
                  width: "20px",
                  textAlign: "right",
                  fontWeight: "bold"
                }}
              >
                {loc.number}
              </div>

              <div style={{ display: "flex", gap: "0.25rem" }}>
                {displayChars.map((cell, i) => {
                  if (cell.isPadding) {
                    return (
                      <div
                        key={i}
                        style={{
                          width: "30px",
                          height: "30px"
                        }}
                      ></div>
                    );
                  }

                  if (cell.isRealSpace) {
                    return (
                      <div
                        key={i}
                        style={{
                          width: "30px",
                          height: "30px"
                        }}
                      ></div>
                    );
                  }

                  const isTajenky = i === maxIndex;

                  return (
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
                        backgroundColor: isTajenky ? "#90caf9" : "#f0f0f0"
                      }}
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
