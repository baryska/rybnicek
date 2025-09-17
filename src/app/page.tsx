'use client';
import styles from './page.module.css';
import { profiles } from '../data/profiles';
import ProfileCard from './profileCard';
import FadeInOnScroll from './fadeInScroll';
import FloatingLink from '@/components/FloatingLink';
import Socials from '@/components/Socials';
import NewsletterForm from '@/components/NewsletterForm';


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
          <Socials />
          <NewsletterForm />
        </FadeInOnScroll>
        <section className={styles.profiles}>
          {profiles.map((profile) => (
            <FadeInOnScroll key={profile.name}>
              <ProfileCard key={profile.name} profile={profile} />
            </FadeInOnScroll>
          ))}
        </section>
      </main>

    </>
  );
}

