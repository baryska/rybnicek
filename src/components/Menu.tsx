'use client';
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "./menu.module.css";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.menuContainer}>
        <Link href="/" className={styles.logoLink}>
          <Image
            src="/logo_orange.svg"
            alt="Berounský rybníček logo"
            width={70}
            height={70}
            className={styles.logo}
          />
        </Link>
        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={`${styles.menuList} ${isOpen ? styles.open : ''}`}>
          <li>
            <Link href="/advent" onClick={() => setIsOpen(false)}>
              Adventní kalendář
            </Link>
          </li>
          <li>
            <Link href="/sifra" onClick={() => setIsOpen(false)}>
              Letní šifrovačka
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
