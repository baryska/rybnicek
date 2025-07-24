'use client';
import styles from './page.module.css';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { profiles } from '../data/profiles';
import ProfileCard from './profileCard';
import FadeInOnScroll from './fadeInScroll';
import FloatingLink from '@/components/FloatingLink';


export default function HomePage() {
  return (
    <>
      <main className={styles.main}>
        <section className={styles.banner} style={{ position: "relative" }}>
          <picture>
            <source srcSet="/banner_mobil.png" media="(max-width: 768px)" />
            <img src="/banner.png" alt="Banner" className={styles.bannerImage} />
          </picture>
          <FloatingLink />
        </section>
        <section>
          <p className={`${styles.fadeIn} ${styles.gradientText}`}>Budujeme komunitu lidí, kteří se zajímají o dění v Berouně a okolí.</p>
        </section>
        <FadeInOnScroll>
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
        </FadeInOnScroll>
        <section className={styles.profiles}>
          {profiles.map((profile) => (
            <FadeInOnScroll key={profile.name}>
              <ProfileCard key={profile.name} profile={profile} />
            </FadeInOnScroll>
          ))}
        </section>
      </main>
      <footer className={styles.footer}>
        © {new Date().getFullYear()} Berounský rybníček
      </footer>
    </>

  );
}

