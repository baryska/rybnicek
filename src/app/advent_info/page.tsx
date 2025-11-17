import React from 'react';
import styles from './style.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Socials from '@/components/Socials';

const Advent = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.description}>
          <p className={styles.title}>Sousedský <strong>adventní kalendář</strong> v oknech a výlohách Berouna</p>
          <p className={styles.subtitle}><strong>Informace pro účastníky</strong></p>
          <p>Děkujeme, že se chcete zapojit do berounského adventního kalendáře! Společně rozsvítíme město a vytvoříme živý adventní
            kalendář, který potěší sousedy, kolemjdoucí i ty, co se mezi svátky vydají na procházku.</p>
          <p className={styles.subsubtitle}><strong>Jak to funguje</strong></p>
          <p>Každý den od 1. do 24. prosince se rozsvítí jedno nové číslo – adventní okno, dveře nebo výloha. Kdo má dané číslo, rozsvítí ho v den, na kterém se pevně domluvíme, a od té chvíle svítí až do 31. prosince. Číslo by se mělo rozsvítit v daný den hned ráno, nebo při otevření provozovny. Číslo <strong>musí být vidět</strong> z ulice nebo jiného veřejného místa.</p>
          <p className={styles.subsubtitle}><strong>Co je potřeba</strong></p>
          <p className={styles.paragraph}>Viditelné <strong>svítící adventní číslo</strong> (např. vystřižené z kartonu, papíru, vytvarované ze světýlek, malbou na okně...)</p>
          <p className={styles.paragraph}>Cedulku s písmenkem do křížovky (tu dostanete od nás, umístěte ji tak, aby si hledači světýlek mohli písmenko přečíst.)</p>
          <p className={styles.paragraph}>Světlo v okně nebo výloze <strong>každý den od vámi vybraného čísla (= adventního data) cca do 21:00</strong> (nebo nepřetržitě).</p>
          <p className={styles.paragraph}>Dodat nám krátký příběh o sobě nebo o svém podniku, který zveřejníme na webu – kdo jste, co děláte, proč se zapojujete.</p>

          <p className={styles.subsubtitle}><strong>Můžete (ale nemusíte) navíc</strong></p>
          <p className={styles.paragraph}>Udělat z rozsvícení malý sousedský moment – koledy, svařák, perníčky, úsměv...</p>
          <p className={styles.paragraph}>Připravit malou radost pro sousedy: slevu, dáreček, pozdrav...</p>
          <p className={styles.paragraph}>Nabídnout cenu do závěrečného slosování – rády se s vámi domluvíme.</p>

          <p className={styles.subsubtitle}><strong>Na webu a sociálních sítích</strong></p>
          <p className={styles.paragraph}>Na webu Berounského rybníčku bude mapa a přehled všech čísel.</p>
          <p className={styles.paragraph}>Každý den zveřejníme na Instagramu a Facebooku malou nápovědu, kde hledat nové číslo.</p>
          <p className={styles.paragraph}>Budeme sdílet i vaše fotky, nápady, výzdoby a příběhy.</p>

          <p className={styles.subsubtitle}><strong>Termíny a organizace</strong></p>
          <p className={styles.paragraph}>Do <strong>20. listopadu</strong> potřebujeme vědět, kdo se zapojí a jaké číslo bude mít.</p>
          <p className={styles.paragraph}>Od 1. prosince začínáme rozsvěcet.</p>
          <p className={styles.paragraph}>Svítíme až do Silvestra – ať se lidé můžou projít i mezi svátky.</p>

          <p className={styles.subsubtitle}><strong>Praktické rady z adventních akcí v jiných městech</strong></p>
          <p className={styles.paragraph}>Když se číslo nerozsvítí a lidé ho nenajdou, budou zklamaní, raději si nastavte upomínku nebo časovač.</p>
          <p className={styles.paragraph}>Zajistěte výzdobu proti větru a dešti.</p>
          <p className={styles.paragraph}>Sledujte naše příspěvky a reagujte. Komentáře a fotky dělají advent živým.</p>
          <p className={styles.paragraph}>Hledači světýlek nosí často čelovky nebo chodí s baterkami. Nebojte se jim zamávat.</p>
          <p className={styles.subsubtitle}><strong>Jak mohou čísla vypadat:</strong></p>
          <div className={styles.galleryContainer}>
            <div className={styles.galleryGrid}>
              <div className={styles.galleryItem}>
                <Image src="/advnet_15.PNG" alt="Obrázek 1" width={300} height={200} className={styles.galleryImage} />
              </div>
              <div className={styles.galleryItem}>
                <Image src="/advent_12.PNG" alt="Obrázek 2" width={300} height={200} className={styles.galleryImage} />
              </div>
              <div className={styles.galleryItem}>
                <Image src="/advent_23.PNG" alt="Obrázek 3" width={300} height={200} className={styles.galleryImage} />
              </div>
              <div className={styles.galleryItem}>
                <Image src="/advent_24.PNG" alt="Obrázek 4" width={300} height={200} className={styles.galleryImage} />
              </div>
              <div className={styles.galleryItem}>
                <Image src="/advnet_21.PNG" alt="Obrázek 5" width={300} height={200} className={styles.galleryImage} />
              </div>
              <div className={styles.galleryItem}>
                <Image src="/advent_11.PNG" alt="Obrázek 6" width={300} height={200} className={styles.galleryImage} />
              </div>
              <div className={styles.galleryItem}>
                <Image src="/advent_8.PNG" alt="Obrázek 7" width={300} height={200} className={styles.galleryImage} />
              </div>
              <div className={styles.galleryItem}>
                <Image src="/advent_3.PNG" alt="Obrázek 8" width={300} height={200} className={styles.galleryImage} />
              </div>
            </div>
          </div>
          <div className={styles.logosWrapper}>
            <div className={styles.logoContainer}>
              <Link href="/" rel="noopener noreferrer" aria-label="Homepage">
                <Image src="/logo_orange.svg" alt="Logo" width={100} height={100} className={styles.logo} />
              </Link>
            </div>
            <Socials />
            <div className={styles.logoContainer}>
              <a href="https://www.nadacevia.cz" target="_blank" rel="noopener noreferrer" aria-label="Nadace Via">
                <Image src="/via.png" alt="Logo" width={150} height={80} className={styles.logo} />
              </a>
            </div>
          </div>

          <div className={styles.logosWrapper_mobile}>
            <Socials />
            <div className={styles.wrapper}>
              <Link href="/" rel="noopener noreferrer" aria-label="Homepage">
                <Image src="/logo_orange.svg" alt="Logo" width={80} height={80} className={styles.logo} style={{ marginLeft: '0.8rem' }} />
              </Link>
              <div className={styles.logoContainer}>
                <a href="https://www.nadacevia.cz" target="_blank" rel="noopener noreferrer" aria-label="Nadace Via">
                  <Image src="/via.png" alt="Logo" width={150} height={80} className={styles.logo} style={{ marginLeft: '0.5rem' }} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <Image
          src="/rukavice.png"
          alt="Popis obrázku"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>


    </main>
  );
}

export default Advent;
