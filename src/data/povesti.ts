/**
 * Obsah Stezky berounských pověstí, texty přeneseny 1:1 ze scénáře
 * (stezka-berounskych-povesti.md). Hodnoty `[MOCK: …]` se doplní/ověří
 * při obchůzce trasy.
 *
 * Výměna odpovědi = jediná změna zde: vygenerujte nové hashe příkazem
 *   node scripts/hash-answer.mjs "skutečná odpověď"
 * a nahraďte pole `answerHashes` u příslušného zastavení.
 * (U číselných odpovědí skript sám přidá slovní variantu, „3" i „tri".)
 *
 * Tajenka: každé zastavení odhaluje jedno písmeno (`tajenkaLetter`);
 * dvě slova z nich hráč skládá sám. Pozice písmen v tajence záměrně
 * v klientských datech nejsou, aby z bundlu nešla tajenka rekonstruovat.
 */

export type Station = {
  id: string;
  order: number; // 1–10
  title: string;
  legend: string; // odstavce oddělené prázdným řádkem, *kurzíva*
  task: string;
  answerHashes: string[]; // SHA-256 normalizovaných přijímaných odpovědí
  unlockMessage: string;
  tajenkaLetter: string; // písmeno tajenky odhalené tímto zastavením
  coords: [number, number]; // [lat, lng] pro mapku „kde to je"
  imageSlot?: string; // cesta k ilustraci (čtverec 1:1)
};

export const povestiWelcome = `Vítejte u další berounské letní šifrovačky, tentokrát na téma berounských pověstí a legend.`;

export const povestiIntro = `Beroun je město, kde se to strašidly jen hemží: skřítek na radnici, bílá paní na náměstí, ohnivý kočár v ulicích, povraždění mniši za rohem. 

**Deset skutečných berounských pověstí na vás čeká na deseti místech.** U každého si přečtete příběh a najdete na místě jeden údaj, ten vám odemkne cestu k dalšímu zastavení a jedno písmeno tajenky. Kdo posbírá všech deset písmen, rozluští, co vlastně střeží berounský Klepáček a může **vyhrát v letním slosování**.

**Hrát můžete kdykoli přes léto**, najednou i na etapy - web si váš postup pamatuje.

**Start: radnice na Husově náměstí.**`;

/**
 * Úvod finále, zobrazuje se před odesláním. Věta je záměrně nedokončená:
 * její konec (VĚRNÉ SRDCE) hráči doluští z posbíraných písmen.
 */
export const povestiFinaleIntro = `Prošli jste všech deset zastavení a posbírali deset písmen. Purkmistrova truhla je prázdná. Ale největším pokladem města není truhla s penězi, je to něco, co se nedá ukrást ani ztratit.

**Největším pokladem města je vaše…**

Dokončete větu, složte z posbíraných písmen dvě slova a přihlaste se do slosování.`;

/** Rozuzlení s dokončenou větou, zobrazí se až po odeslání přihlášky. */
export const povestiFinaleReveal = `**Největším pokladem města je vaše věrné srdce.**

Vzpomínáte na Klepáčka? Vojáci ho umučili kvůli pokladu, který nikdy nevydal a který dodnes nikdo nenašel. Možná proto, že ho celou dobu hledali špatně. To, co purkmistr bránil až do smrti, nebyla truhla: bylo to jeho město. Purkmistrův poklad jste našli cestou - je to věrné srdce, se kterým se člověk o své město stará.`;


export const stations: Station[] = [
  {
    id: "klepacek",
    order: 1,
    title: "Klepáček",
    legend: `Nejslavnější berounské strašidlo bydlí přímo na radnici. Říká se mu Klepáček, a když se ve městě děje nějaká nepravost, křivda nebo podvod, ohlásí svůj protest hlasitým klepáním na zeď. Trestá nepoctivé úředníky a řemeslníky, kteří rozkrádají obecní jmění nebo odvádějí špatnou práci, a přitom prý umí vyvádět i neuvěřitelné šprýmy. Nejčastěji na sebe bere podobu skřítka s kladívkem, ale zjevil se prý i jako zamračený chlupatý obr.

Za živa to byl berounský purkmistr. Když město za jedné z válek obsadili nepřátelští vojáci, chtěli na něm vyzvědět, kam ukryl obecní pokladnu. Bili ho a krutě mučili, ale purkmistr mlčel. Nakonec ho rozlícení vojáci přivázali za koně a vláčeli tak dlouho, až vypustil duši. Stalo se to v domě u Podlešských hned vedle radnice - a na dvoře prý dlouho zůstávaly krvavé skvrny, které nešly nijak smýt. Poklad se už nikdy neobjevil; zůstal zazděný kdesi ve sklepích radnice a duch poctivého purkmistra ho střeží dodnes. A při tom dohlíží na jednání konšelů, hádky, úplatky a intriky nesnáší ze všeho nejvíc.

Jeho plastiku najdete ve vstupní chodbě radnice.`,
    task: "Na budově radnice je vpravo od vchodu památná deska. Kolik občanů města Berouna bylo odsouzeno a uvězněno komunistickým režimem v politckých procesech?",
    answerHashes: [
      "eb1e33e8a81b697b75855af6bfcdbcbf7cbbde9f94962ceaec1ed8af21f5a50f", // 31
      "b41ed31b893063a07033718ad5757944c34492ba44196c7f8891a44cbf988a75", // trinact
    ],
    unlockMessage:
      "Správně! Klepáček zaklepal a dal vám první písmeno. **Teď se postavte zády k radnici a vydejte se ulicí po levé ruce, jmenuje se Na Klášteře.** A to jméno není náhoda.",
    tajenkaLetter: "E",
    coords: [49.9643561, 14.0746292], // radnice, Husovo nám. - orientační, ověřit
    imageSlot: "/1_poklad.jpg",
  },
  {
    id: "na-klastere",
    order: 2,
    title: "Přízraky Na Klášteře",
    legend: `V těchto místech při městských hradbách stával bohatý dominikánský klášter s kostelem Panny Marie a hřbitovem. Prvního dubna roku 1421, při takzvaném krvavém aprílu, dobyli husité zradou Beroun a jejich hněv dopadl především na nenáviděné mnichy: povraždili je a klášter vydrancovali, vypálili a rozbořili. Desítky let pak neštěstí připomínaly jen zříceniny zarostlé křovím, než městská rada začala pozemky přidělovat na stavbu nových domů. Mnohé z nich byly zabudovány přímo do zbytků klášterních zdí.

A od té doby se tu dějí podivné věci. Obyvatelé domu u Mandlů vídali záhadná zelená světélka poskakující po rozpadlých hradbách. O velkých církevních svátcích se po půlnoci z domu u Kloboučníků vynořovaly postavy kněze a ministranta v černém - a za nimi běžel černý pes s ohnivě svítícíma očima. Duch dominikánského převora se prý o svátcích modlívá přímo v kostele sv. Jakuba.

A jedna příhoda je dokonce zapsána ve farní kronice, rok 1727: nájemníkovi jednoho z domů se zdálo o pokladu skrytém v hradební zdi za jeho dvorkem. V noci vstal, vzal špičák a lucernu a začal do hradby bušit. Kamení se vyvalilo, objevil se výklenek - a z něj se na hledače pokladů šklebil stojící kostlivec ve zbytcích zpuchřelé mnišské kutny. Muž se z toho leknutí roznemohl a do několika dnů zemřel.`,
    task: "Kousek od hradeb jsou instalovány lavičky partnerství mezi městy Beroun a Goslar. Mají na sobě malé destičky se dvěma letopočty. Jaký je ten druhý?",
    answerHashes: [
      "1bea20e1df19b12013976de2b5e0e3d1fb4ba088b59fe53642c324298b21ffd9", // 2021
    ],
    unlockMessage:
      "Správně! A když už jsme u zazděných pokladů, jeden takový se má skrývat přímo na náměstí. **Hledejte dům U tří korun.**",
    tajenkaLetter: "N",
    coords: [49.9635564, 14.0752278], // ulice Na Klášteře - orientační, ověřit
    imageSlot: "/2_poklad.jpg",
  },
  {
    id: "u-tri-korun",
    order: 3,
    title: "Dům U tří korun",
    legend: `Už domovní znamení jako by naznačovalo skryté bohatství - a Berounští odedávna věřili, že v domě U tří korun bývala mincovna. Vypráví se ale ještě lepší příběh: někdy za třicetileté války, když se k městu blížilo nebezpečí, snesli měšťané do tohoto domu všechny své cennosti a peníze. Ukrýt je pověřili jednoho z radních, který platil za nejpoctivějšího muže ve městě. Ten svůj úkol splnil, poklad zazdil - a spěchal za ostatními na hradby bránit město. V bitvě však padl a nikomu nestačil říct, kam cennosti ukryl.

V existenci pokladu se pak věřilo po celé generace tak pevně, že se dům U tří korun vždy prodával s podmínkou: kdyby se něco našlo, polovina připadne prodávajícímu. A pamětníci dokládali, že ve sklepě býval velký plochý kámen přikrývající studniční šachtu, do níž sestupovaly schody - a z ní odbočovala chodba, pokračující kamsi pod dvůr…`,
    task: "Před domem je na ulici kovový poklop, na němž je několikrát vyraženo slovo Telecom. Kolikrát? (Odpovězte jen číslem)",
    answerHashes: [
      "4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce", // 3
      "cddd67830982a78cc83998c15c13e49e1cb6bea286c4507cb5510d9c6aba4ec3", // tri
    ],
    unlockMessage:
      "Správně! Pokladů už bylo dost, teď vás čeká nejkrásnější a zároveň nejsmutnější dům na náměstí. **Jenštejnský dům, dnes muzeum.**",
    tajenkaLetter: "C",
    coords: [49.9633378, 14.0722636],
    imageSlot: "/3_poklad.jpg",
  },
  {
    id: "bila-pani",
    order: 4,
    title: "Bílá paní z Jenštejnského domu",
    legend: `Nejhonosnější dům na náměstí si roku 1612 nechal postavit císařský rychtář a primátor Jindřich Čížek z Jenštejna - a nese dávnou kletbu. Vždy poslední den v roce jím bloudí naříkající bílá paní se svazkem klíčů v ruce.

Kdysi manželka bohatého majitele domu vyslechla varovné proroctví potulné cikánky: její děti se do roka utopí. Zděšená matka hned nakázala, že se děti nesmějí přiblížit k řece ani k rybníku, a hlídala je na každém kroku. Přišel poslední den roku, který se už tehdy slavil hojností jídla a pití, a v domě panoval velký ruch. Když šla služebná do sklepa pro pivo, nevšimla si, že za ní vklouzly i zvědavé děti. Při odchodu za sebou pečlivě zamkla, jak měla nakázáno. Děti zůstaly ve tmě, jejich volání v hluku oslavy nikdo neslyšel - a jak tápaly kolem stěn, přepadly přes roubení do hluboké studny. Krutá věštba se naplnila.

Služka byla za svou nedbalost odsouzena a popravena. A právě její prokletý duch od té doby bloudí koncem roku Jenštejnským domem, se svazkem klíčů, kterými tenkrát zamkla.`,
    task: "Nad vchodovými dveřmi je vlevo i vpravo latinský nápis. Jakým písmenem začíná nápis vlevo?",
    answerHashes: [
      "3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d", // b
    ],
    unlockMessage:
      "Správně! **Jen pár kroků odsud stojí kostel sv. Jakuba.** Za dne obyčejný kostel, ale jeho okna umí vyprávět.",
    tajenkaLetter: "D",
    coords: [49.9634547, 14.0727453],
    imageSlot: "/4_poklad.jpg",
  },
  {
    id: "mse-mrtvych",
    order: 5,
    title: "Mše mrtvých a ohnivá okna",
    legend: `Vždy o první adventní neděli, přesně o druhé hodině v noci, se prý z kostela sv. Jakuba ozývají varhany a za okny se míhají odlesky světélek, jako by uvnitř procházel zástup se svícemi v rukou. V tu hodinu je berounský chrám zasvěcen mrtvým předkům: mši jim slouží kněz, který jako poslední z řady duchovních správců v Berouně zemřel. Běda tomu, kdo by ze zvědavosti vešel a některému z přítomných se podíval do tváře, do tří dnů by zemřel. Berounští měšťané ještě v 19. století věřili, že předním osobám města chodí zemřelí příbuzní oznamovat konec života; ostatní slýchali jen podivné zvuky, praskot v trámech a klepání na okna a dveře.

A kostelní okna umí i varovat. Čtrnáct dní před nejničivějším požárem v dějinách města, roku 1735, měl berounský děkan Jiří František Procházka děsivý sen: viděl v něm planoucí Beroun tak živě, že při ranní pobožnosti prosil věřící, aby se modlili za odvrácení zhouby. Nikdo mu nevěřil - a požár přišel, dokonce vypukl přesně tam, kde ho děkan ve snu viděl. Snad právě odtud pochází pověst, že má-li Beroun postihnout požár, rozsvítí se po půlnoci všechna okna kostela, jako by uvnitř plály stovky svící, ačkoli je prázdný.`,
    task: "Ze strany od náměstí je na průčelí kostela socha ukřižovaného Krista. Pod ním je nápis s letopočtem v římských číslicích. Jaký je to letopočet?",
    // [MOCK: odpověď „2"]
    answerHashes: [
      "8ffe8459134b46975acd31df13a50c51dbeacf1c19a764bf1602ba7c73ffc8fb", // 1818
    ],
    unlockMessage:
      "Správně! A teď pozor, od tohoto kostela vyjíždí na svou objížďku nejohnivější berounské strašidlo. **Vydejte se směrem k Plzeňce, přesně po jeho trase.**",
    tajenkaLetter: "Ě",
    coords: [49.9638792, 14.0715733],
    imageSlot: "/5_poklad.jpg",
  },
  {
    id: "ohnivy-beha",
    order: 6,
    title: "Ohnivý Beha",
    legend: `Berounem se prý za nocí prohání děsivý přízrak: muž v hořícím kočáře, ulicemi, po střechách, ba i po nebi - a bičem z blesku pohání spřežení koní s plamennou hřívou. V určité dny koná objížďku od bývalého hřbitova při kostele sv. Jakuba k někdejšímu popravišti pod Městskou horou na Plzence, kde stával sloup Božích muk, a odtud se vrací k Behovskému domu u Horní, tedy Plzeňské brány. A kdo ho zahlédne, ví, že se blíží neštěstí: zjevení ohnivého Behy je předzvěstí požáru.

O tom, kdo Beha byl, se vyprávějí dvě verze. Podle první to byl berounský rychtář, který odsoudil k smrti nevinného mladíka - a když svůj strašlivý omyl prohlédl, oběsil se na půdě svého domu. Ve skutečnosti však Mates Rudolf zvaný Beha rychtářem nikdy nebyl: patřil k řeznickému cechu a po velkém požáru města roku 1735 zešílel a vzal si život. Jeho podivná smrt, spojovaná s nejničivějším ohněm, jaký kdy Beroun postihl, zapůsobila na měšťany tak mocně, že z ní vyrostla legenda o ohnivém jezdci.`,
    task: "Když projdete kolem Plzeňské brány vlevo kolem proslulého řeznictví, uvidíte nad sebou reklamní ceduli. Jaké je poslední slovo na ceduli (začíná velkým písmenem)?",
    // [MOCK: odpověď - čp. Behovského domu ověřit na místě; pokud dům nelze
    // jednoznačně určit, počítat objekty na trase. Bez konkrétní hodnoty
    // ve scénáři - placeholder „8"]
    answerHashes: [
      "ce0c1c30caf515d98f6489ee6fcd24951eba4299ae6df2a625fd5e7f83eedc4a", // studene
    ],
    unlockMessage:
      "Správně! Beha odjel do noci. **Vraťte se přes náměstí k Pražské bráně** - právě tam, u městské brány, začíná úplně první berounský příběh.",
    tajenkaLetter: "R",
    coords: [49.9635117, 14.0715411], // Plzeňka / Plzeňská brána - orientační, ověřit
    imageSlot: "/6_poklad.jpg",
  },
  {
    id: "zalozeni-berouna",
    order: 7,
    title: "Založení Berouna",
    legend: `Nejstarší pověst o založení města zaznamenal roku 1541 Václav Hájek z Libočan ve své Kronice české. Podle ní postavil první město u významného brodu přes řeku Mži Slavoš, manžel kněžny Tety z nedalekého hradiště Tetína - a tedy švagr slavné kněžny Libuše. Po zakladateli se městu říkalo Slavošov. Jenže je postihly povodně a mor, obyvatelé uprchli k hradu Hýskovu a ve vylidněných troskách se usadila jen divá zvěř a lupiči, kteří u brodu obírali pocestné o všechno, co měli. A tak se začalo říkat, že se Slavošov proměnil v hrozný „beroun".

A jak se do městského znaku dostal medvěd? Do zpustošeného města prý kdysi zavítal udatný rek jménem Tomák. Sotva prošel troskami městské brány, vyřítil se na něj obrovský rozzuřený medvěd. Tomák nemeškal, zvíře přemohl, loupežníky vyhnal a město znovu vystavěl. Na památku svého souboje si dal huňáče do znaku - a v něm medvěd kráčí dodnes.`,
    task: "Před Pražskou bránou (směrem k Berounce) je poklop kanálu a na něm nápis, který začíná písmeny DIN. Jaké je poslední trojčíslí tohoto nápisu?",
    // [MOCK: odpověď „3" - ověřit skutečnou podobu znaku]
    answerHashes: [
      "6affdae3b3c1aa6aa7689e9b6a7b3225a636aa1ac0025f490cca1285ceaf1487", // 124
    ],
    unlockMessage:
      "Správně! **Od brány je to kousek k řece, k místu, kde býval brod.** A u brodu kdysi stávala rybářova chatrč, ve které přespával budoucí světec.",
    tajenkaLetter: "V",
    coords: [49.9641406, 14.0753478], // Pražská brána - orientační, ověřit
    imageSlot: "/7_poklad.jpg",
  },
  {
    id: "rybar-od-brodu",
    order: 8,
    title: "Rybář od brodu",
    legend: `Když budoucí kníže Václav jezdíval z Tetína, kde ho vychovávala babička Ludmila, ke své matce Drahomíře do Prahy, musel po bouřkách a deštích často čekat, než voda v řece Mži opadne. Nocoval tehdy v chatrči starého rybáře u brodu - a rybář na sympatického mládence nezapomněl, ani když se z něj stal kníže.

Když se pak stařec dozvěděl, že byl jeho milovaný kníže zavražděn, rozhodl se přestavět svou dřevěnou chalupu na kapli a uctívat Václava jako světce. Téže noci měl živý sen: k jeho lůžku přistoupil kníže Václav v doprovodu muže v poutnickém oděvu, ukázal na něj a řekl, že rybáře svěřuje do ochrany tohoto strážce. Kněz z nedalekého Tetína, kterému stařec sen vylíčil, v neznámém poutníkovi rozpoznal svatého Jakuba. A tak na pahorku nad brodem vznikla malá kaple sv. Jakuba. Teprve o mnoho později u ní král Václav I. založil město Beroun - a prapůvodní rybářova kaple se začala přestavovat na městský kostel, který na náměstí stojí dodnes.`,
    task: "Pokud dojdete k bývalému brodu, po právé ruce budete mít budovu, na jejíž fasádě je napsaný letopočet - který?",
    answerHashes: [
      "7931aa2a1bed855457d1ddf6bc06ab4406a9fba0579045a4d6ff78f9c07c440f", // 2013
    ],
    unlockMessage:
      "Správně! **Předposlední zastavení vede za město, k ruině**, o které se v Berouně vypráví, že v ní nikdy není tak prázdno, jak vypadá. [MOCK: směr/přístup k usedlosti Na Ptáku]",
    tajenkaLetter: "É",
    coords: [49.9645761, 14.0773856], // Berounka u mostu - orientační, ověřit
    imageSlot: "/8_poklad.jpg",
  },
  {
    id: "na-ptaku",
    order: 9,
    title: "Usedlost Na Ptáku",
    legend: `Nad městem stával odedávna osamělý dvůr, kterému se říkalo různě, Záptačí, Bílý dvůr, nakonec prostě „Na Ptáku". Jméno dostal podle veselé tradice: po senosečích sem chodívali berounští měšťané na výroční kratochvíli, „střílení ptáka", velkého orla sestaveného z prkének na vysokém stojanu. Bývaly to slavnosti plné hudby a hodování.

Dnes z dvora zbývá ruina. A pověsti vyprávějí, že veselé časy vystřídaly tragédie: ve zdech usedlosti se mělo odehrát několik neštěstí i zločinů. Od té doby se prý z rozpadlého stavení ozývají kroky, ačkoli nikdo nejde, a hlasy, ačkoli je prázdné. Kdo prochází kolem za šera, ať prý zrychlí krok - a kdo za dne, ať se aspoň na chvíli zastaví a vzpomene si, že tu kdysi bývalo veselo.`,
    task: "Před usedlostí Na Ptáku je několik cedulí, jedná má na sobě velký nápis POZOR. Kolik živých bytostí je zobrazeno na ceduli?",
    answerHashes: [
      "ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d", // 5
      "bbba57318f71911354fdaab5d67ea8c352bfe113231e968a9ac1f4cf5b38e546", // pet
    ],
    unlockMessage:
      "Správně! Zbývá poslední zastavení - a je ze všech nejmírnější. **Nad městem, u kaple Panny Marie Bolestné, vyvěrá studánka U Boží vody.**",
    tajenkaLetter: "S",
    coords: [49.9770203, 14.0707678],
    imageSlot: "/9_poklad.jpg",
  },
  {
    id: "bozi-voda",
    order: 10,
    title: "Studánka U Boží vody",
    legend: `Roku 1723 spatřil místní ovčák u studánky nad městem poutníka, který si omýval zraněný bok. Než stačil promluvit, zjevení zmizelo. Mezi lidmi se rozneslo, že to byl svatý Ivan, první český poustevník, který žil v jeskyni v nedalekém Svatém Janu pod Skalou. Studánce se od té doby začala připisovat zázračná moc, místo dostalo jméno U Boží vody a někteří nemocní, kteří se sem vypravili, se skutečně uzdravili.

Nedlouho poté tu nechal berounský děkan postavit kapli Panny Marie Bolestné. A studánka vyvěrá dál - jako připomínka, že ne každé berounské zjevení straší. Některá uzdravují.`,
    task: "U kaple je tabule Naučné stezky Václava Talicha. Kolikrát je na ní Václav Talich vyfotografován? (Odpovězte jen číslem)",
    answerHashes: [
      "7902699be42c8a8e46fbbb4501726517e86b22c56a189f7625a6da49081b2451", // 7
      "de4a06565989c94e6cc1ac63879ae362c03eac003d19c9cc5bda7487ca911f4a", // sedm
    ],
    unlockMessage:
      "Správně! Posbírali jste všech deset písmen - tajenka je celá. **Čeká na vás finále.**",
    tajenkaLetter: "R",
    coords: [49.9715575, 14.0602947], // [MOCK: kaple U Boží vody - souřadnice ověřit]
    imageSlot: "/10_poklad.jpg",
  },
];

export function getStationByOrder(order: number): Station | undefined {
  return stations.find((s) => s.order === order);
}
