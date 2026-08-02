import type { Metadata } from "next";
import PovestiGame from "@/components/PovestiGame";
import styles from "./style.module.css";

export const metadata: Metadata = {
  title: "Berounský poklad - stezka berounských pověstí | Berounský rybníček",
  description:
    "Deset zastavení, deset pověstí. Projděte Beroun po stopách strašidel, rozluštěte tajenku a vyhrajte v letním slosování (pro odpovědi odeslané do 31. srpna).",
};

export default function PovestiPage() {
  return (
    <main className={styles.main}>
      <PovestiGame />
    </main>
  );
}
