import { useState } from "react";
import styles from './locationDrawer.module.css';
import crosswordStyles from './crossword.module.css';
import Link from "next/link";
import Image from "next/image";
import Socials from "./Socials";

const AdventSubmitForm = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [solution, setSolution] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [comment, setComment] = useState('');
  const [teamSize, setTeamSize] = useState('');

  const handleSubmit = async () => {
    if (!email) {
      alert("Vyplňte prosím svůj e-mail.");
      return;
    }
    if (!solution) {
      alert("Vyplňte prosím tajenku.");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("https://formspree.io/f/mnnvygak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          message: `Adventní kalendář - Tajenka: ${solution}`,
          comment,
          teamSize,
        }),
      });

      if (response.ok) {
        setStatus("sent");
        setFirstName("");
        setLastName("");
        setEmail("");
        setSolution("");
        setComment("");
        setTeamSize('');
      } else {
        setStatus("error");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <>
    <div className={styles.form} style={{ margin: '2rem 0' }}>
      <p className={styles.question}>Vyluštili jste tajenku? Napište nám ji zde:</p>
      <div>
        <input
          type="text"
          placeholder="Tajenku zapište sem"
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          className={styles.input}
        />
      </div>
      <div>
        <input
          type="text"
          value={firstName}
          placeholder="Jméno"
          onChange={(e) => setFirstName(e.target.value)}
          className={styles.input}
        />
      </div>

      <div>
        <input
          type="text"
          value={lastName}
          placeholder="Příjmení"
          onChange={(e) => setLastName(e.target.value)}
          className={styles.input}
        />
      </div>

      <div>
        <input
          type="email"
          placeholder="Váš e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="Kolik vás luštilo?"
          value={teamSize}
          onChange={(e) => setTeamSize(e.target.value)}
          className={styles.input}
        />
      </div>
      <div>
        <textarea
          placeholder="Chcete nám něco vzkázat?"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className={styles.input}
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={status === "sending"}
        className={styles.button}
        style={{ marginTop: '1rem' }}
      >
        Odeslat tajenku
      </button>
      {status === "sent" && <p style={{ color: "green" }}>✅ Odesláno!</p>}
      {status === "error" && <p style={{ color: "red" }}>❌ Chyba při odesílání.</p>}
    </div>
    <div className={crosswordStyles.logosWrapper}>
          <div className={crosswordStyles.logoContainer}>
            <Link href="/" rel="noopener noreferrer" aria-label="Homepage">
              <Image src="/logo_orange.svg" alt="Logo" width={100} height={100} className={crosswordStyles.logo} />
            </Link>
          </div>
          <Socials />
          <div className={crosswordStyles.logoContainer}>
            <a href="https://www.nadacevia.cz" target="_blank" rel="noopener noreferrer" aria-label="Nadace Via">
              <Image src="/bile-logo-via.png" alt="Logo" width={150} height={80} className={crosswordStyles.logo} />
            </a>
          </div>
        </div>
        <div className={crosswordStyles.logosWrapper_mobile}>
          <Socials />
          <div className={crosswordStyles.wrapper}>
            <Link href="/" rel="noopener noreferrer" aria-label="Homepage">
              <Image src="/logo_orange.svg" alt="Logo" width={100} height={100} className={crosswordStyles.logo} style={{ marginLeft: '0.8rem' }} />
            </Link>
            <div className={crosswordStyles.logoContainer}>
              <a href="https://www.nadacevia.cz" target="_blank" rel="noopener noreferrer" aria-label="Nadace Via">
                <Image src="/bile-logo-via.png" alt="Logo" width={150} height={80} className={crosswordStyles.logo} style={{ marginLeft: '0.5rem' }} />
              </a>
            </div>
          </div>
        </div>
        </>
  );
};

export default AdventSubmitForm;
