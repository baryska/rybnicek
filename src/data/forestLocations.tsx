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
          { text: "Listnatý", letter: "C" },
          { text: "Jehličnatý", letter: "A" },
          { text: "Smíšený", letter: "Q" },
        ],
        description: "A pokračuj po pěšině do lesa…",
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
          "Až uvidíš pohromadě alespoň tři vyvrácené kořeny stromů, zamysli se. Přijde ti to jako náhoda? Co myslíš, že to způsobilo?",
        options: [
          {
            text: "Praděd – obrovský strážce lesa, který při své cestě občas porazí strom, aby mohl projít",
            letter: "A",
          },
          {
            text: "Ptactvo – stromy přetěžují překrmení městští ptáci",
            letter: "Q",
          },
          {
            text: "Břidličné podloží a druh stromů",
            letter: "H",
          },
        ],
        description:
          "NEZAPOMEŇ: Než půjdeš dál, najdi klacík a polož ho na některý z vývratů, které jsi objevil – zanecháš důkaz, že jsi úkol splnil! Pokračuj dál po cestě a po pravé straně hledej trojitý strom…",
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
        question: "Napravo od cesty najdi trojitý strom. O jaký strom jde?",
        options: [
          {
            text: "Začarovaný – byl to tříhlavý drak, který byl ve strom proměněn kouzlem. Přitom tři vysoké kmeny značí tři vysoké krky dračí",
            letter: "K",
          },
          {
            text: "Jehličnatý trojstrom",
            letter: "J",
          },
          {
            text: "Listnatý strom, tzv. pařežinu",
            letter: "O",
          },
        ],
        description: "NEODCHÁZEJ, čeká tě tu hned další úkol!",
        hasImage: true,
        imageUrl: "/task-3.png",
      },
      {
        taskNumber: 4,
        question: "Nalevo za trojitým stromem hledej stříšku. Co to je?",
        options: [
          {
            text: "Dračí sluj v nadzemním provedení",
            letter: "C",
          },
          {
            text: "Přístřešek pro zlobivé děti",
            letter: "Z",
          },
          {
            text: "Příkrmiště pro lesní zvěř",
            letter: "M",
          },
        ],
        hasImage: true,
        imageUrl: "/task-4.png",
      },
      {
        taskNumber: 5,
        question:
          "Posuň se po cestě kousek dál, až najdeš pařez v cestě. Na pravé straně cesty hledej „dračí stromy“. Pokud byli draci proměněni ve stromy, je to důkaz, že jich tu kdysi bylo víc. Čím více hlav drak měl, tím více má strom kmenů. Kolik hlav měl drak s nejvíce hlavami?",
        options: [
          { text: "Dvě", letter: "K" },
          { text: "Tři", letter: "N" },
          { text: "Čtyři", letter: "A" },
        ],
        description: "Až stromy prozkoumáš, pokračuj dál po cestě…",
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
          "Na levé straně cesty najdeš strom, který jako by chtěl vstoupit do cesty. Kterou pomůcku lidé v lese často používají při hledání severu?",
        options: [
          {
            text: "Jih je tam, kde je strom nejteplejší, zkus to",
            letter: "K",
          },
          {
            text: "Sever je tam, kde je na stromě nejvíc mechu",
            letter: "N",
          },
          {
            text: "Jih je tam, kam se kmen naklání",
            letter: "O",
          },
        ],
        description:
          "Až určíš jih, NEPŘEHLÉDNI hned pár kroků po cestě dál cestičku na jih a vydej se po ní.",
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
        descriptionAbove:
          "PRO TVOŘIVÉ PRŮZKUMNÍKY: Po pravé straně možná najdeš malé lesní domečky... Jestli máš chuť nějaký další postavit, použij suché větvičky, listy, kameny a svoji fantazii a vytvoř domeček pro lesního skřítka.",
        question:
          "Přibližně 50 m dál od stanoviště se nachází kámen vystupující ze země. Najdi ho. Na kameni je nápis. Co znamená?",
        options: [
          {
            text: "M3 – označení třetího sektoru mapy draků",
            letter: "C",
          },
          {
            text: "MB – Myslivecký bod. Odtud myslivci počítali zvěř",
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
    name: "Další z kamenů",
    position: [49.96482, 14.04459],
    coordinatesDisplay: "49°57,88928'N, 14°2,67548'E",
    intro: "Jsi u dalšího kamene a čekají tě tři úkoly.",
    tasks: [
      {
        taskNumber: 8,
        question:
          "Hledej v okolí velký betonový prvek. K čemu asi sloužil?",
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
          "Pod betonovým základem je ďolík. Co se zde dříve nacházelo?",
        options: [
          {
            text: "Trilobiti",
            letter: "C",
          },
          {
            text: "Voda. Byla zde tůňka spojená s dnes již vyschlou studnou výše v lese",
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
          "Přes cestu, když popojdeš z lesa ven, uvidíš výběhy. Už více než 30 let jsou součástí tohoto místa koně a jejich výběhy. Kterou z následujících věcí u koní můžeš dělat?",
        options: [
          {
            text: "Vstupovat do ohrad",
            letter: "R",
          },
          {
            text: "Krmit koně",
            letter: "C",
          },
          {
            text: "Pozorovat koně",
            letter: "A",
          },
        ],
        description:
          "Pokračuj po cestě z města dál do kopce a po chvíli odboč zpět do lesa k památnému dubu.",
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
    intro: "Jsi na posledním stanovišti a čekají tě opět tři úkoly.",
    tasks: [
      {
        taskNumber: 11,
        question:
          "Památný dub poznáš podle značky: PAMÁTNÝ STROM. Jak starý tento dub přibližně je?",
        options: [
          { text: "100 let", letter: "M" },
          { text: "250 let", letter: "V" },
          { text: "500 let", letter: "I" },
        ],
        description:
          "Stoupni si k dubu, a když vás bude víc, zkuste ho obejmout.",
        hasImage: true,
        imageUrl: "/task-11.png",
      },
      {
        taskNumber: 12,
        question:
          "Naproti dubu je kláda na sezení. Nad ní vede strmá cesta shora, která kládu obchází, k čemu slouží?",
        options: [
          {
            text: "Bobování, pro odvážné, když dost nasněží",
            letter: "W",
          },
          {
            text: "Závodnímu běhu houbařů",
            letter: "V",
          },
          {
            text: "Cyklokrosovým sjezdům. Pozor, aby tě nezaskočilo letící kolo!",
            letter: "P",
          },
        ],
        hasImage: true,
        imageUrl: "/task-12.png",
      },
      {
        taskNumber: 13,
        question:
          "Tady u památného dubu je již po staletí křižovatka cest mezi Berounem, statkem a Dědem. Víš, od kdy je na tomto místě statek, který dnes podle místa nese jméno Statek U Dubu?",
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
            text: "Od začátku 17. století",
            letter: "V",
          },
        ],
        hasImage: true,
        imageUrl: "/task-13.png",
      },
    ],
  },
];
