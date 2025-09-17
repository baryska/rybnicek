"use client";
import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { subscribeToNewsletter, type FormState } from "@/app/actions";
import styles from './newsletterForm.module.css';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={styles.submitButton}>
      {pending ? "Odesílám..." : "Přihlásit se"}
    </button>
  );
}

const initialState: FormState = {
  message: "",
  error: false,
  success: false,
};

export default function NewsletterForm() {
  const [state, formAction] = useActionState(subscribeToNewsletter, initialState);

  const formRef = useRef<HTMLFormElement>(null); // Přidáváme typ pro ref

  // Pokud bylo odeslání úspěšné, vymažeme formulář
  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Přihlaste se k odběru sousedského občasníku!</h2>
      <p className={styles.subtitle}>Ať víte, co se kde v našem rybníčku šustne a co pro vás chystáme.</p>

      <form ref={formRef} action={formAction}>
        <div className={styles.inputGroup}>
          <input
            type="email"
            name="email"
            placeholder="vas@email.cz"
            required
            className={styles.input}
          />
          <SubmitButton />
        </div>

        {state.message && (
          <p className={`${styles.statusMessage} ${state.error ? styles.error : styles.success}`}>
            {state.message}
          </p>
        )}
      </form>
    </div>
  );
}
