import Image from 'next/image';
import { useState, useRef } from 'react';
import { Profile } from '../data/profiles';
import styles from './profileCard.module.css';

export default function ProfileCard({ profile }: { profile: Profile }) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    const bounds = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const clickX = e.clientX - bounds.left;
    const half = bounds.width / 2;
    if (clickX < half) {
      setIndex((i) => (i - 1 + profile.slides.length) % profile.slides.length);
    } else {
      setIndex((i) => (i + 1) % profile.slides.length);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) setIndex((i) => (i + 1) % profile.slides.length);
      else setIndex((i) => (i - 1 + profile.slides.length) % profile.slides.length);
    }
    touchStartX.current = null;
  };

  return (
    <div className={styles.card} onClick={handleClick} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>

      <div className={styles.imageWrapper}>
        <Image src={profile.image}
          alt={profile.name}
          width={200}
          height={200}
          className={styles.image} />
      </div>
      <p className={styles.name}>{profile.name}</p>
      <div className={styles.slide} key={index}>
        {profile.slides[index]}
      </div>
      <div className={styles.dots}>
        {profile.slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === index ? styles.active : ''}`}
            onClick={(e) => {
              e.stopPropagation(); 
              setIndex(i);
            }}
            aria-label={`Zobrazit slajd ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
