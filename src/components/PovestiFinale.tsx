"use client";

import { useState } from "react";
import {
  povestiFinaleIntro,
  povestiFinaleReveal,
} from "@/data/povesti";
import PovestiText from "./PovestiText";
import styles from "./povesti.module.css";


const FORM_URL =
  process.env.NEXT_PUBLIC_POVESTI_FORM_URL ?? "https://formspree.io/f/mnnvygak";

const PovestiFinale = ({
  finished,
  letters,
  onFinished,
}: {
  finished: boolean;
  letters: string[];
  onFinished: () => void;
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [solution, setSolution] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !name.trim() ||
      !email.includes("@") ||
      !solution.trim() ||
      !consent ||
      status === "sending"
    )
      return;

    setStatus("sending");
    try {
      const response = await fetch(FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: name,
          email,
          message: `Berounský poklad — Tajenka: ${solution}`,
          consent:
            "Souhlasím se zpracováním osobních údajů pro účely slosování.",
        }),
      });
      if (response.ok) {
        setStatus("sent");
        onFinished();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className={styles.cardContent}>
      <h2 className={styles.finaleTitle}>Purkmistrův poklad</h2>

      {finished || status === "sent" ? (
        <>
          <PovestiText
            text={povestiFinaleReveal}
            className={styles.finaleText}
          />
          <p className={styles.sent}>
            Vaše přihláška do slosování je odeslaná. Držíme palce a
            děkujeme, že jste prošli celou stezku!
          </p>
        </>
      ) : (
        <>
          <PovestiText
            text={povestiFinaleIntro}
            className={styles.finaleText}
          />
          <p className={styles.lettersLabel}>
            Vaše posbíraná písmena (v pořadí zastavení):
          </p>
          <div className={styles.letters}>
            {letters.map((letter, i) => (
              <span key={i} className={styles.letterTile}>
                {letter}
              </span>
            ))}
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.fieldLabel}>
              Dokončení věty (dvě slova, každé má 5 písmen)
              <input
                type="text"
                className={styles.input}
                placeholder="Největším pokladem města je vaše..."
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                required
              />
            </label>
            <input
              type="text"
              className={styles.input}
              placeholder="Jméno"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              className={styles.input}
              placeholder="Váš e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className={styles.consentLabel}>
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
              />
              <span>
                Souhlasím se zpracováním osobních údajů (jméno a e-mail) pro
                účely slosování.
              </span>
            </label>
            <button
              type="submit"
              className={styles.button}
              disabled={
                status === "sending" ||
                !name.trim() ||
                !email.includes("@") ||
                !solution.trim() ||
                !consent
              }
            >
              {status === "sending" ? "Odesílám…" : "Přihlásit se do slosování"}
            </button>
            {status === "error" && (
              <p className={styles.error} role="alert">
                ❌ Odeslání se nepovedlo. Zkontrolujte připojení a zkuste to
                znovu.
              </p>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default PovestiFinale;
