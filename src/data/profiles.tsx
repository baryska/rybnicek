import { ReactNode } from 'react';
import styles from '../app/profileCard.module.css';

export type Profile = {
  name: string;
  image: string;
  slides: ReactNode[];
};

export const profiles: Profile[] = [
  {
    name: 'Bára',
    image: '/bara.png',
    slides: [
      <>
        <p>
          Je  programátorka, která miluje saunu a nesnáší telefonování.
          Do Berouna přinesla kousek Finska. Hrdá
          obyvatelka Hostíma.
        </p>
        <p>
          Má dům bez vodovodu a to ji přivedlo do politiky .
        </p>
        <p>
          Berounská zastupitelka, která nečeká, že se věci stanou samy.
        </p>
        <p>
          Každé léto mění klávesnici za  pádlo a odjíždí na vodácký tábor .
        </p>
        <p> Dvě dcery, manžel a pes.</p>
      </>,
      <>
        <p className={styles.strong}>
          Bára říká:
        </p>
        <p>
          Beroun je místo, kde je radost se vynořit!
        </p>
        <p>Město má obrovský potenciál
          a já jsem tu potkala spoustu skvělých lidí.
          Ti také tvoří to, co se mi na Berounu nejvíc líbí:
        </p>
        <p>
          Městská knihovna, Talichův Beroun,
          nebo Berounská zeleň. Besedy a koncerty
          v hospůdce U Krobiána v Hostímě
          nebo jazz v Ateliéru 57 na Zavadilce.
          Taky kulturní akce v Jiné kávě a spousta
          dalších věcí.
        </p>
      </>,
      <>
        <p className={styles.strong}>Bářino rybniční bahýnko:</p>
        <p>Žádný vodovod?
          Tak trochu středověk.
        </p>
        <p>
          Školy. Citlivé téma z mnoha důvodů.
        </p>
        <p>
          Šlendrián ve veřejném prostoru.
          A jak se všechno nekonečně táhne.
        </p>
        <p>
          Komunikace radnice s občany. Radniční list opravdu nestačí.
        </p>
      </>,
      <>
        <p>V rybníčku je Bára takzvaná náplava.</p>
        <p>Sleduje trendy, ptá se nahlas
          a mluví za ty, co nejsou slyšet.
        </p>
        <p>
          Technická podpora.
        </p>
        <p>
          Těší se na sousedské akce. Kulturní,
          swapové, setkávací.
        </p>
      </>,
    ],
  },
  {
    name: 'Jana',
    image: '/jana.png',
    slides: [
      <>
        <p>
          Práci lektorky a mentorky
          ve zdravotnictví Jana doplňuje
          s textilní a bytovou tvorbou.
          V Rybníčku už chystá letní merch.
        </p>
        <p>
          Miluje přírodu a chce, aby byl Beroun
          jako město uprostřed ní hezčí
          i na pohled. I to i v tak náročném prostoru,
          kterému se říká veřejný.
        </p>
        <p>
          Žila v Curychu a návrat do Berouna byl pro ni ve znamení “vizuálního smutku”.
          Přitom potenciál Berouna je obrovský!
        </p>
      </>,
      <>
        <p className={styles.strong}>
          Jana říká:
        </p>
        <p>
          Tady voda šeptá, že krajina
          pamatuje víc, než si myslíme.
        </p>
        <p>Místa jako Tetín, Svatý Jan pod Skalou,
          Stradonice, Nižbor, Křivoklát, Skryje
          nebo Velíz mají svoji atmosféru.
          Karlštejn nad Berounkou majestát.
        </p>
        <p>
          Krajina a příroda kolem Berouna vypráví
          příběhy, které často neslyšíme.
          A je to škoda.
        </p>
      </>,
      <>
        <p className={styles.strong}>Jana
          v mlze nad Rybníčkem:</p>
        <p>Příjezd do Berouna ověšený
          reklamou, kterou ani nikdo nestíhá
          za jízdy číst? I ta vybledlá jen dráždí oči.
        </p>
        <p>
          Romantické zátarasy na náměstí?
          Jasně, červenobílá páska je přeci taková
          vánoční.
        </p>
        <p>
          Buď se na to všechno snese milosrdná mlha,
          nebo s tím něco uděláme.
        </p>
      </>,
      <>
        <p>Jana je starousedlík.
          V Rybníčku říkáme usazenina. </p>
        <p>Spolupracuje s odborníky ve zdravotnictví
          a ve státní správě. Zapojuje se do projektů
          z oblasti zdravotnictví a sociální péče.
        </p>
        <p>
          Přináší inspiraci ze života v zahraničí.
        </p>
        <p>
          V Rybníčku je její parketou vizuál.
          Těší se na sousedské akce, tematické
          procházky a rozhovory se štikami v rybníce.

        </p>
      </>,
    ],
  },
  {
    name: 'Lucka',
    image: '/lucka.png',
    slides: [
      <>
        <p>
          Lucka mohla být
          ekonomka nebo diplomatka.
          A nakonec je markeťačka
          v technologických firmách.
        </p>
        <p>
          Do Berouna připlula proti proudu Berounky.
        </p>
        <p>
          Miluje jógu, zahradu a zelený čaj, na který
          nejraději chodí do Jiné Kávy.
        </p>
      </>,
      <>
        <p className={styles.strong}>
          Lucka říká:
        </p>
        <p>
          V Berouně jsem zakotvila
          kvůli jeho ideální poloze!
        </p>
        <p>Stěhování z Prahy Lucka s manželem
          naplánovala v excelu. A Beroun vyšel pěkně.
        </p>
        <p>
          V realitě tady trochu chybí události, projekty,
          setkávání se sousedy. Často měla pocit,
          že je sama, kdo to chce změnit. S Rybníčkem
          je nás víc!
        </p>
        <p>
          Lucka chce město, kde se krásně prochází
          s kočárkem a se psem.
        </p>
      </>,
      <>
        <p className={styles.strong}>Lucčiny
          Rybníčkové
          sítě:</p>
        <p>Digitální nebo mezilidské.
        </p>
        <p>
          Vede instagram @zijuvberoune,
          kde ukazuje město z jiného úhlu než
          Radniční listy. Ví, kdo byla Marie
          Poštová nebo básník Chmelenský.
        </p>
        <p>
          Ráda by zasíťovala i sousedy z Berouna
          do fungující Rybníčkové komunity.
          I s medvědem, nebo Cibulkou.
        </p>
      </>,
      <>
        <p>Lucka je naplavenina. Taková,
          co už zná každý kámen na břehu.</p>
        <p>U Rybníčku drží vlasce a ví, kde co plave.
          Plánuje, propojuje, připomíná.
          Když ztratíme přehled, Lucka má tabulku.
        </p>
        <p>
          Na město se teď dívá přes korbu kočárku.
          Vidí kopec, chybějící lavičku nebo kavárnu u vody.
        </p>
        <p>
          A v hlavě už má plány, jak to vylepšit.
        </p>
      </>,
    ],
  },
];
