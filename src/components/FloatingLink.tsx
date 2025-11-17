import Link from "next/link";
import styles from "./floatingLink.module.css";

const FloatingLink = () =>{
  return (
    <Link href="/advent" className={styles.floatingLink}>
      Berounský adventní kalendář
    </Link>
  );
}

export default FloatingLink;
