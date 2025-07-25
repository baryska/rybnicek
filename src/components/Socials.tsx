import React from 'react';
import styles from './Socials.module.css';
import { FaInstagram, FaFacebook } from 'react-icons/fa';

const Socials = () => {
  return (
    <section className={styles.socialIcons}>
      <a
        href="https://www.instagram.com/berounsky_rybnicek/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
      >
        <FaInstagram className={styles.icon} />
      </a>

      <a
        href="https://www.facebook.com/berounsky.rybnicek"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
      >
        <FaFacebook className={styles.icon} />
      </a>
    </section>
  )
}

export default Socials
