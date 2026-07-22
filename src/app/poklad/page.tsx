import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PovestiGame from "@/components/PovestiGame";
import styles from "./style.module.css";

// Dokud hra není veřejná, jde otevřít jen s tímto parametrem v URL:
//   /poklad?preview=rybnicek
// Až se má hra spustit pro všechny, stačí smazat kontrolu v PovestiPage níž.
const PREVIEW_KEY = "rybnicek";

export const metadata: Metadata = {
  title: "Berounský poklad - stezka berounských pověstí | Berounský rybníček",
  description:
    "Deset zastavení, deset pověstí. Projděte Beroun po stopách strašidel, rozluštěte tajenku a vyhrajte v letním slosování.",
};

export default async function PovestiPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  if (params.preview !== PREVIEW_KEY) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <PovestiGame />
    </main>
  );
}
