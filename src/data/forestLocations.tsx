export interface ForestTask {
  taskNumber: number;
  question: string;
  descriptionAbove?: string;
  description?: string;
  options: { text: string; letter: string }[];
  hasImage: boolean;
  imageUrl?: string | string[];
  descriptionImageUrl?: string;
}

export interface ForestStation {
  number: number;
  name: string;
  position: [number, number];
  coordinatesDisplay: string;
  intro?: string;
  tasks: ForestTask[];
}

export const forestStations: ForestStation[] = [
  {
    number: 1,
    name: "Start",
    position: [49.96508, 14.04736],
    coordinatesDisplay: "49°57,90489'N, 14°2,84164'E",
    tasks: [
      {
        taskNumber: 1,
        question:
          "Stojíš na konci ulice K Dědu. Za sebou máš výšlap po asfaltové silnici, ale těš se, další krok už povede na lesní cestu do stínu stromů. Najdi pěšinu, rozhlédni se kolem sebe a rozhodni, o jaký les se jedná:",
        options: [
          {
            text: "Listnatý – vidíš kolem sebe hlavně akáty, javory a další listnaté stromy, žádné jehličnaté",
            letter: "C",
          },
          {
            text: "Jehličnatý – vysoko nad vším ční modříny, které tady tomu vládnou, proto je les jehličnatý",
            letter: "A",
          },
          {
            text: "Smíšený – druhy stromů se tu mísí, ať jsou mladé nebo staré, vysoké či nízké, jehličnaté i listnaté",
            letter: "Q",
          },
        ],
        hasImage: true,
        imageUrl: "/task-1.png",
      },
    ],
  },
  {
    number: 2,
    name: "Kalamita",
    position: [49.9652628, 14.046495],
    coordinatesDisplay: "49.9652628N, 14.0464950E",
    tasks: [
      {
        taskNumber: 2,
        question:
          "Pokračuj cestou do lesa, dokud u ní neuvidíš alespoň tři vývraty (vyvrácené kořeny stromů). Přijde ti to jako náhoda? Co myslíš, že to způsobilo?",
        descriptionAbove:
          "Nejdřív ale najdi klacík a polož ho na některý z vývratů, které jsi objevil. Bude to důkaz, že jsi to našel!",
        options: [
          {
            text: "Praděd – obrovský strážce lesa, který při své cestě občas porazí strom, aby mohl projít, když tudy jednou za sto let prochází",
            letter: "A",
          },
          {
            text: 'Ptactvo – stromy bohužel přetěžují překrmení ptáčkové a je jich z města stále víc a některý strom nevydrží. Proto je také v Berouně známá kampaň „Čeho je moc, toho je příliš: NEKRMTE HOLUBY“',
            letter: "Q",
          },
          {
            text: "Podloží a druh stromů – mělké kořeny se ve zdejším břidličném podloží snadno vyvrátí",
            letter: "H",
          },
        ],
        hasImage: true,
        imageUrl: "/task-2.png",
      },
    ],
  },
  {
    number: 3,
    name: "Dračí teritorium",
    position: [49.96534, 14.0461],
    coordinatesDisplay: "49°57,92068'N, 14°2,76592'E",
    intro: "Jsi na 3. stanovišti a čekají tě zde tři úkoly!",
    tasks: [
      {
        taskNumber: 3,
        question:
          "Napravo od cesty najdi trojitý strom. Do jaké skupiny stromů tento strom patří?",
        options: [
          {
            text: "Začarovaných – byl to tříhlavý drak, který byl ve strom proměněn kouzlem. Přitom tři vysoké kmeny značí tři vysoké krky dračí",
            letter: "K",
          },
          {
            text: "Jehličnatých trojstromů",
            letter: "J",
          },
          {
            text: "Listnatých, kdy jde o výmladkový strom, takzvanou pařezinu",
            letter: "O",
          },
        ],
        hasImage: true,
        imageUrl: "/task-3.png",
      },
      {
        taskNumber: 4,
        question:
          "V kopci na levé straně za trojitým stromem hledej něco, co se skrývá výše v lese. Co to je, co bys v lese nečekal?",
        options: [
          {
            text: "Dračí sluj v nadzemním provedení",
            letter: "C",
          },
          {
            text: "Přístřešek, který nechalo město Beroun zbudovat pro zlobivé děti",
            letter: "R",
          },
          {
            text: "Příkrmiště pro lesní zvěř (myslivci tomuto provedení říkají zásyp)",
            letter: "M",
          },
        ],
        hasImage: true,
        imageUrl: "/task-4.png",
      },
      {
        taskNumber: 5,
        question: `Posuň se na půl cesty k dalšímu
          stanovišti (zasadili jsme na to místo do
          cesty pařez) a po pravé straně hledej „dračí
          stromy“. Zastáváme totiž pohádkami
          ověřený názor, že kouzlem pro záchranu
          Berouna byli zdejší draci proměněni ve
          stromy. Nápověda pro hledání: Každou
          hlavu dračí jeden kmen jednoho stromu
          značí. Tedy, čím více hlav drak měl, tím více
          má strom kmenů. Kolik hlav měl drak
          s nejvíce hlavami?`,
        options: [
          { text: "Dvě", letter: "K" },
          { text: "Tři", letter: "N" },
          { text: "Čtyři", letter: "A" },
        ],
        hasImage: true,
        imageUrl: "/task-5.png",
      },
    ],
  },
  {
    number: 4,
    name: "První rozcestí",
    position: [49.96517, 14.0451],
    coordinatesDisplay: "49°57,91046'N, 14°2,70587'E",
    tasks: [
      {
        taskNumber: 6,
        question:
          `Na levé straně cesty najdeš strom,
          který jako by chtěl vstoupit do cesty. Poznáš
          podle tohoto stromu, kde je sever a kde jih? Je to
          důležité, protože dál musíš najít cestu, která
          povede na jih`,
        options: [
          {
            text: "Na straně, na které je strom nejteplejší, tam je jih, zkus to",
            letter: "K",
          },
          {
            text: "Podle toho, kde na stromě nejvíc rostou mechy, tam je sever",
            letter: "N",
          },
          {
            text: "Podle toho, kam vidíš vést nejvíc kořenů od stromu, tam je západ",
            letter: "O",
          },
        ],
        hasImage: true,
        imageUrl: "/task-6.png",
      },
    ],
  },
  {
    number: 5,
    name: "Mezi kameny rostoucími ze země",
    position: [49.96492, 14.04517],
    coordinatesDisplay: "49°57,89519'N, 14°2,71028'E",
    tasks: [
      {
        taskNumber: 7,
        description: `Možná jsi při hledání našel malé lesní stavby.
          Jestli máš chuť si také nějakou postavit, použij
          suché větvičky, listy, kameny (jen ne ty hraniční
          zakopané v zemi :) a svoji fantazii. Udělej fotku
          a poděl se s námi o ní. `,
        question:
          "Postav se na stanovišti ve směru, jak si po cestě sem přišel. Přibližně 25 čapích kroků doleva a dvojnásobek čapích kroků doprava, se nalézá kámen vystupující ze země. Zkus najít oba. Co je na nich napsáno a co to asi znamená?",
        options: [
          {
            text: "M3 – značka vzdálenosti od centra nejbližšího města v kilometrech",
            letter: "C",
          },
          {
            text: "MB – je připomínka odkud kam se rozpínal největší medvědí brloh na Berounsku",
            letter: "R",
          },
          {
            text: "MB – hranice pozemků Města Berouna",
            letter: "M",
          },
        ],
        hasImage: true,
        imageUrl: "/task-7.png",
        descriptionImageUrl: "/task-7-domecek.png",
      },
    ],
  },
  {
    number: 6,
    name: "Třetí z kamenů",
    position: [49.96482, 14.04459],
    coordinatesDisplay: "49°57,88928'N, 14°2,67548'E",
    intro: "Jsi u třetího kamene a čekají tě tři úkoly.",
    tasks: [
      {
        taskNumber: 8,
        question:
          `Hledej v okolí velký
            betonový prvek, který v lese působí nezvykle. K
            čemu asi sloužil?`,
        options: [
          {
            text: "Základna obranné věže na ochranu Berouna",
            letter: "K",
          },
          {
            text: "Startovací místo pro draky",
            letter: "P",
          },
          {
            text: "Základna pro stožár elektrického vedení",
            letter: "I",
          },
        ],
        hasImage: true,
        imageUrl: "/task-8-9.png",
      },
      {
        taskNumber: 9,
        question:
          `Pod betonovým základem
            je ďolík. Co se zde dříve mohlo
            nacházet?`,
        options: [
          {
            text: "Trilobiti (zkameněliny), ví se, že Beroun na ně byl bohatý a tady jich bylo minimálně tolik, kolik tu bylo draků",
            letter: "C",
          },
          {
            text: "Voda – tůňka spojená se studnou výše v lese, ale když přišla studna o vodu, přišla o ní i tato tůňka",
            letter: "V",
          },
          {
            text: "Lanýže, ale rychle se vysbíraly",
            letter: "B",
          },
        ],
        hasImage: true,
        imageUrl: "/task-8-9.png",
      },
      {
        taskNumber: 10,
        question:
          "Přes cestu uvidíš výběhy. Už to bude skoro 30 let, co k této oblasti patří koně a výběhy pro koně. Věděl bys, co se z dále uvedených možností nesmí u koní dělat?",
        description:
          "Poznal jsi, že správná odpověď jsou hned dvě z uvedených možností? Tak to jsi zkušený! Každopádně doplň jen jedno písmeno na pozici 10 tajenky.",
        options: [
          {
            text: "Zamávat na koně – protože by mu bylo líto, že nemůže zamávat zpátky ",
            letter: "R",
          },
          {
            text: "Vstupovat do ohrad, protože v ohradách jsou koně, kteří si zaslouží svůj bezpečný prostor a s jejich váhou i kolem 500 kg mohou nepříjemně překvapit",
            letter: "A",
          },
          {
            text: "Krmit koně, protože mohou být alergičtí – stejně jako lidé – a například i obyčejná mrkev, nebo pečivo je může zabít",
            letter: "A",
          },
        ],
        hasImage: true,
        imageUrl: "/task-10.png",
      },
    ],
  },
  {
    number: 7,
    name: "Památný dub",
    position: [49.9648061, 14.0434572],
    coordinatesDisplay: "49.9648061N, 14.0434572E",
    tasks: [
      {
        taskNumber: 11,
        question:
          "Blížíme se k památnému dubu, který poznáš podle značky Památný strom. Jak starý tento dub přibližně je? Řeknu ti jen, že památným stromem byl tento dub vyhlášen v roce 1978.",
        options: [
          { text: "100 let", letter: "M" },
          { text: "250 let", letter: "V" },
          { text: "500 let", letter: "I" },
        ],
        hasImage: true,
        imageUrl: "/task-11.png",
      },
      {
        taskNumber: 12,
        question:
          "Stoupni si k dubu, a když vás bude víc, zkuste ho obejmout. Pak se otoč, uvidíš kládu na sezení. Nad ní vede cesta shora, která kládu obchází z obou stran. Věř nebo ne, na té cestě nahoru je mnoho překážek a vede až na Děd. K čemu asi slouží?",
        options: [
          {
            text: "Bobování, jen ale když dost nasněží a jsi dost odvážný",
            letter: "W",
          },
          {
            text: "Závodnímu houbaření. Protože houbařů je stále více a hub méně, tak se tady běhá známý berounský závod s houbařským košíkem",
            letter: "V",
          },
          {
            text: "Cyklokrosové sjezdy. Terén si oblíbili cyklokrosaři, výše vybudovali překážky a sjíždí z Dědu. Dávej pozor, aby tě nezaskočilo letící kolo!",
            letter: "P",
          },
        ],
        hasImage: true,
        imageUrl: "/task-12.png",
      },
      {
        taskNumber: 13,
        question:
          "Tady u památného dubu je již po staletí křižovatka cest mezi městem, statkem a Dědem. Víš, odkdy je na tomto místě statek, který dnes podle místa nese jméno Statek U Dubu?",
        options: [
          {
            text: "Od roku 1926",
            letter: "M",
          },
          {
            text: "Od roku 1800",
            letter: "U",
          },
          {
            text: "Je pravděpodobné, že zde statek byl již před třicetiletou válkou (tedy před rokem 1618), každopádně již dříve zde bylo zázemí pro zdejší vinice, od kterých pochází také název této lokality",
            letter: "V",
          },
        ],
        hasImage: true,
        imageUrl: "/task-13.png",
      },
    ],
  },
];
