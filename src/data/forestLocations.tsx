export interface ForestTask {
  taskNumber: number;
  question: string;
  description?: string;
  options: { text: string; letter: string }[];
  hasImage: boolean;
  imageUrl?: string;
}

export interface ForestStation {
  number: number;
  name: string;
  position: [number, number];
  coordinatesDisplay: string;
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
            text: "Smíšený – druhy stromů se tu mísí, ať jsou mladé nebo staré, vysoké či nízké",
            letter: "Q",
          },
        ],
        hasImage: false,
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
        description:
          "Najdi kamínek, nebo klacík a polož ho na největší z vývratů, které si tu objevil. Bude to důkaz, že si tento úkol splnil!",
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
      },
    ],
  },
  {
    number: 3,
    name: "Dračí teritorium",
    position: [49.96534, 14.0461],
    coordinatesDisplay: "49°57,92068'N, 14°2,76592'E",
    tasks: [
      {
        taskNumber: 3,
        question:
          "Hlídej si pravou stranu a za chvilku uvidíš trojitý strom. Do jaké skupiny stromů patří tento strom?",
        options: [
          {
            text: "Začarovaných – je to tříhlavý drak, který se ve strom proměnil kouzlem. Přitom tři vysoké kmeny značí tři vysoké krky dračí",
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
      },
      {
        taskNumber: 4,
        question:
          "O pár kroků výš, nad trojitým stromem, si všimni něčeho, co je v zimě vidět lépe než v létě, když se to skrývá za lesní zelení. Co to je, co bys v lese nečekal a dál od cesty napravo v kopci to můžeš zahlédnout?",
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
        hasImage: false,
      },
      {
        taskNumber: 5,
        question:
          'Na stejné straně cesty, alespoň 20 čapích kroků po ní dál, hledej další „dračí stromy“. Jsme totiž toho nevědeckého, ale pohádkami ověřeného názoru, že kouzlem pro záchranu Berouna byli ve své době zdejší draci proměněni ve stromy. Při hledání pamatuj: Každou hlavu dračí samostatný kmen jednoho stromu značí. Kolik hlav měl ten největší a nejvícehlavy?',
        options: [
          { text: "Dvě", letter: "K" },
          { text: "Tři", letter: "N" },
          { text: "Čtyři", letter: "A" },
        ],
        hasImage: false,
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
          "Jdi dál po cestě výš na další stanoviště, dávej ale pozor, na levé straně půjdeš okolo stromu, který jako by chtěl vstoupit do cesty. Podle toho jednoho stromu můžeš poznat, kde je sever a kde jih. Víš, podle čeho?",
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
      },
      {
        taskNumber: 7,
        question:
          "Jakmile určíš světové strany, dál buď už velmi pozorný … koukej, abyš nepřehlédl někde poblíž vyšlapanou cestičku vedoucí na jih. Co v této lokalitě lidé pěstovali před 500 lety?",
        options: [
          {
            text: "Dračí ovoce, protože co jiného v téhle oblasti plné draků pěstovat",
            letter: "N",
          },
          {
            text: "Pšenici, protože pšenice dává mouku, mouka dává chleba a chleba je základ naší stravy",
            letter: "A",
          },
          {
            text: "Vinnou révu, protože od doby Karla IV se i všechny jižní stráně nad Berounem, vč. této, osázely vinnou révou, aby byl dostatek vína, proto se tato oblast jmenuje Vinice",
            letter: "M",
          },
        ],
        hasImage: true,
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
        taskNumber: 8,
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
            letter: "I",
          },
        ],
        hasImage: true,
      },
    ],
  },
  {
    number: 6,
    name: "Druhý z kamenů",
    position: [49.96482, 14.04459],
    coordinatesDisplay: "49°57,88928'N, 14°2,67548'E",
    tasks: [
      {
        taskNumber: 9,
        description:
          "Na tomto stanovišti a v jeho okolí to musíš dobře prozkoumat. Možná si po cestě viděl nějaké malé lesní stavby pro skřítky, nebo jen tak pro radost.",
        question:
          "Po cestě od horního kamene dál do kopce najdi velký betonový prvek, který v lese působí nezvykle. K čemu myslíš, že sloužil?",
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
            letter: "V",
          },
        ],
        hasImage: true,
      },
      {
        taskNumber: 10,
        question:
          "Pod betonovým základem je ďolík, jáma nebo propadlina. Co se na tom místě mohlo dříve nacházet?",
        description:
          "A viděl si křížek na zemi a u něj svíčky? Naštěstí pouze na baterky a v uzavřených nádobách. Slyšeli jsme, že tady odpočívá pejsek, který tady často chodil a měl to tady rád.",
        options: [
          {
            text: "Trilobiti (zkameněliny), ví se, že Beroun na ně byl bohatý a tady jich bylo minimálně tolik, kolik tu bylo draků",
            letter: "C",
          },
          {
            text: "Voda – tůňka spojená se studnou výše v lese, ale když přišla studna o vodu, přišla o ní i tato tůňka",
            letter: "A",
          },
          {
            text: "Lanýže, ale rychle se vysbíraly",
            letter: "B",
          },
        ],
        hasImage: true,
      },
      {
        taskNumber: 11,
        question:
          "Přes cestu uvidíš výběhy. Už to bude skoro 30 let, co k této oblasti patří koně a výběhy pro koně. Věděl bys, co se z dále uvedených možností nesmí u koní dělat?",
        description:
          "Poznal si, že správná odpověď jsou hned dvě z uvedených možností? Tak to si zkušený! Každopádně doplň jen jedno písmeno na pozici 11 tajenky.",
        options: [
          {
            text: "Zamávat na koně, přestože koně neumí zamávat nazpět a bylo by to neslušné",
            letter: "R",
          },
          {
            text: "Vstupovat do ohrad, protože v ohradách jsou koně, kteří si zaslouží svůj bezpečný prostor a s jejich váhou i kolem 500 kg mohou nepříjemně překvapit",
            letter: "V",
          },
          {
            text: "Krmit koně, protože mohou být alergičtí – stejně jako lidé – a například i obyčejná mrkev, nebo pečivo je může také zabít",
            letter: "V",
          },
        ],
        hasImage: false,
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
        taskNumber: 12,
        question:
          "Blížíme se k památnému dubu, který poznáš podle značky Památný strom. Jak starý tento dub přibližně je? Řeknu ti jen, že památným stromem byl tento dub vyhlášen v roce 1978, tedy již tenkrát musel být starší než kdokoli z tvé rodiny.",
        options: [
          { text: "100 let", letter: "M" },
          { text: "250 let", letter: "P" },
          { text: "500 let", letter: "I" },
        ],
        hasImage: true,
      },
      {
        taskNumber: 13,
        question:
          "Stoupni si k dubu, a když vás bude víc, zkuste ho obejmout. Pak se otoč, uvidíš kládu na sezení. Nad ní vede cesta shora, která kládu obchází z obou stran. Věř nebo ne, na té cestě nahoru je mnoho překážek a vede až na Děd. K čemu asi slouží?",
        options: [
          {
            text: "Bobování, jen ale když dost nasněží a jsi dost odvážný",
            letter: "W",
          },
          {
            text: "Závodnímu houbaření. Protože houbařů je stále více a hub méně, tak se tady běhá známý berounský závod s houbařským košíkem",
            letter: "P",
          },
          {
            text: "Cyklokrosové sjezdy. Terén si oblíbili cyklokrosaři, výše vybudovali překážky a sjíždí z Dědu. Dávej pozor, aby tě nezaskočilo letící kolo!",
            letter: "V",
          },
        ],
        hasImage: true,
      },
    ],
  },
];
