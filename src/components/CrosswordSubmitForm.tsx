import { useEffect, useState } from "react";
import { locations } from "@/data/locations";
import styles from './locationDrawer.module.css'


const CrosswordSubmitForm = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("")
  const [manualSolution, setManualSolution] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [solution, setSolution] = useState<string | null>(null);
  const data = localStorage.getItem("answers");

  useEffect(() => {
    if (!data) {
      return;
    }
    try {
      const parsed = JSON.parse(data);

      const hasAllAnswers = locations.every(loc => {
        const key = String(loc.number);
        return parsed.hasOwnProperty(key) && parsed[key].trim() !== "";
      });
      setSolution(hasAllAnswers ? 'Štiky a mřenky' : null);
    } catch (e) {
      console.error("Chyba při načítání uložených odpovědí:", e);
    }
  }, [data]);

  const handleSubmit = async () => {
    const finalSolution = solution !== null ? solution : manualSolution;

    if (!email) {
      alert("Vyplňte prosím svůj e-mail.");
      return;
    }
    if (solution === null && !manualSolution) {
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
          message: `Tajenka: ${finalSolution}`,
        }),
      });

      if (response.ok) {
        setStatus("sent");
        setFirstName("");
        setLastName("");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
      console.log(err);
    }
  };

  return (
    <div className={styles.form}>
      {solution === null ? (
        <p>Tajenku jste nevyplnili kompletně. Pokud jste ji i tak uhádli, vyplňte ji níže:</p>
      ) : (
        <p>Gratulujeme! Odpověděli jste správně na všechny otázky.</p>
      )}
      <div>
        <input
          type="text"
          placeholder="Tajenku zapište sem"
          value={solution !== null ? solution : manualSolution}
          onChange={(e) => setManualSolution(e.target.value)}
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
      <button
        onClick={handleSubmit}
        disabled={status === "sending"}
        className={styles.button}
        style={{marginTop: '1rem'}}
      >
        Odeslat tajenku
      </button>
      {status === "sent" && <p style={{ color: "green" }}>✅ Odesláno!</p>}
      {status === "error" && <p style={{ color: "red" }}>❌ Chyba při odesílání.</p>}
    </div>
  );
};

export default CrosswordSubmitForm;
