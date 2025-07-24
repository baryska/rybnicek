import Link from "next/link";
import styles from "./floatingLink.module.css";

const FloatingLink = () =>{
  return (
    <Link href="/sifra" className={styles.floatingLink}>
      Berounská letní šifrovačka
    </Link>
  );
}

export default FloatingLink;
