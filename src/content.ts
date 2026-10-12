export type Language = "pl" | "en";

export type Skill = {
  name: string;
  level: string;
};

export type Path = {
  id: "research" | "development";
  code: string;
  label: string;
  title: string;
  description: string;
  output: string;
  skills: Skill[];
};

type ProjectBase = {
  id: string;
  index: string;
  title: string;
  status: "proposed";
  deliverable: string;
};

export type ResearchProject = ProjectBase & {
  kind: "research";
  question: string;
  methods: string[];
  additionalBenchmarks?: string;
  proposedScope: { researchers: number; weeks: [number, number] };
};

export type DevelopmentProject = ProjectBase & {
  kind: "development";
  objective: string;
  scope: string[];
  evaluation: string[];
};

export type ProjectGroup = { title: string; description: string } & (
  | { id: "research"; projects: ResearchProject[] }
  | { id: "development"; projects: DevelopmentProject[] }
);

export type CycleStep = {
  index: string;
  title: string;
  description: string;
  output: string;
};

export type SiteCopy = {
  languageLabel: string;
  header: {
    navigationLabel: string;
    paths: string;
    projects: string;
    community: string;
    recruitment: string;
    status: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    lead: string;
    primaryAction: string;
    secondaryAction: string;
    consoleLabel: string;
    skillsLabel: string;
    signature: string;
    skipLink: string;
    targetPath: string;
    semesterOutput: string;
  };
  principle: {
    label: string;
    statement: string;
    accent: string;
  };
  paths: Path[];
  projects: {
    eyebrow: string;
    title: string;
    description: string;
    statusLabels: Record<"proposed", string>;
    labels: {
      question: string;
      objective: string;
      methods: string;
      scope: string;
      evaluation: string;
      deliverable: string;
      proposedScope: string;
      researchers: string;
      weeks: string;
      approximately: string;
    };
    groups: ProjectGroup[];
  };
  cycle: {
    eyebrow: string;
    title: string;
    description: string;
    outputLabel: string;
    steps: CycleStep[];
  };
  community: {
    eyebrow: string;
    title: string;
    description: string;
    networkLabel: string;
    networkTitle: string;
    networkDescription: string;
    sectors: string[];
    pillars: Array<{ title: string; description: string }>;
  };
  recruitment: {
    eyebrow: string;
    title: string;
    description: string;
    formLabel: string;
    previewAction: string;
    closePreview: string;
    sheetEyebrow: string;
    sheetTitle: string;
    sheetDescription: string;
    items: Array<{ index: string; title: string; description: string }>;
    requirementsTitle: string;
    researchTitle: string;
    researchRequirements: string;
    developmentTitle: string;
    developmentRequirements: string;
    footerNote: string;
  };
  footer: {
    description: string;
    location: string;
    navigation: string;
    status: string;
  };
};

export const siteCopy: Record<Language, SiteCopy> = {
  pl: {
    languageLabel: "Switch to English",
    header: {
      navigationLabel: "Główna nawigacja",
      paths: "Ścieżki",
      projects: "Projekty",
      community: "Społeczność",
      recruitment: "Rekrutacja",
      status: "Formularz wkrótce",
      openMenu: "Otwórz menu",
      closeMenu: "Zamknij menu",
    },
    hero: {
      eyebrow: "Koło naukowe · AGH w Krakowie",
      title: "Rozwijamy finanse ilościowe",
      accent: "przez badania i inżynierię.",
      lead: "Studenckie koło naukowe przy AGH w Krakowie. Łączymy rzetelne badania ilościowe, odtwarzalne eksperymenty i budowę wydajnych systemów finansowych.",
      primaryAction: "Poznaj projekty",
      secondaryAction: "Jak dołączyć",
      consoleLabel: "Dwie ścieżki. Wspólny kierunek.",
      skillsLabel: "Obszary pracy",
      signature: "Ludzie. Modele. Rynki.",
      skipLink: "Przejdź do treści",
      targetPath: "Wybrana ścieżka",
      semesterOutput: "Efekt semestru",
    },
    principle: {
      label: "Zasada działania / 00",
      statement: "Nie szukamy gotowych quantów.",
      accent: "Szukamy technicznych podstaw, ciekawości i konsekwencji w działaniu.",
    },
    paths: [
      {
        id: "research",
        code: "QR / 01",
        label: "Research",
        title: "Quant Research",
        description: "Formułuj hipotezy, buduj modele statystyczne i ML oraz testuj je z kontrolą bias, leakage i kosztów transakcyjnych.",
        output: "notebook → model → walidacja → raport",
        skills: [
          { name: "Machine learning", level: "core" },
          { name: "Statystyka", level: "core" },
          { name: "Python", level: "working" },
          { name: "Szeregi czasowe", level: "applied" },
          { name: "Prawdopodobieństwo", level: "core" },
        ],
      },
      {
        id: "development",
        code: "QD / 02",
        label: "Development",
        title: "Quant Development",
        description: "Zamieniaj pomysły w powtarzalne narzędzia: pipeline danych, backtester, symulator egzekucji i testowalny kod.",
        output: "specyfikacja → system → benchmark",
        skills: [
          { name: "Python", level: "core" },
          { name: "C++", level: "basics" },
          { name: "System design", level: "mindset" },
          { name: "Git / testy", level: "working" },
          { name: "Data pipelines", level: "working" },
        ],
      },
    ],
    projects: {
      eyebrow: "Pierwsze propozycje projektowe",
      title: "Projekty badawcze i inżynieryjne.",
      description: "Cztery propozycje badań empirycznych i infrastruktury rynkowej w C++. Poniższy zakres i rezultaty opisują planowane prace.",
      statusLabels: {
        proposed: "Propozycja"
      },
      labels: {
        question: "Pytanie badawcze",
        objective: "Cel techniczny",
        methods: "Główna metodologia",
        scope: "Zakres implementacji",
        evaluation: "Ocena",
        deliverable: "Oczekiwany rezultat",
        proposedScope: "Proponowany zakres",
        researchers: "badaczy",
        weeks: "tygodni",
        approximately: "ok."
      },
      groups: [
        {
          id: "research",
          title: "Quant Research",
          description: "Dwie propozycje badań nad prognozowaniem zmienności i hedgingiem przy niedoskonałej informacji.",
          projects: [
            {
              id: "volatility-forecasting",
              index: "01",
              kind: "research",
              status: "proposed",
              title: "Prognozowanie zmienności: kiedy pomaga złożoność modelu?",
              question: "Czy model nieliniowy poprawia prognozy wariancji na kolejny dzień względem modelu liniowego, gdy oba korzystają z tych samych informacji? Czy poprawa utrzymuje się w okresach stresu rynkowego?",
              methods: [
                "Pięciominutowe dane BTC/ETH i wariancja zrealizowana.",
                "HAR i XGBoost korzystające z tego samego zbioru informacji.",
                "Chronologiczna walidacja walk-forward, QLIKE i analiza okresów stresu rynkowego."
              ],
              additionalBenchmarks: "EWMA i GARCH mogą służyć jako dodatkowe modele referencyjne.",
              deliverable: "Odtwarzalne badanie empiryczne porównujące jakość prognoz oraz stabilność rankingów modeli w różnych warunkach rynkowych.",
              proposedScope: {
                researchers: 4,
                weeks: [
                  12,
                  14
                ]
              }
            },
            {
              id: "imperfect-volatility-hedging",
              index: "02",
              kind: "research",
              status: "proposed",
              title: "Hedging przy niedoskonałej informacji o zmienności",
              question: "Jak opóźniona lub niedokładna informacja o zmienności wpływa na skuteczność hedgingu, koszty transakcyjne i skrajne straty?",
              methods: [
                "Symulowany hedging europejskich opcji call, ze zmiennością stochastyczną (np. Heston) w głównym eksperymencie.",
                "Klasyczny delta hedging, pasma bez transakcji i modele referencyjne uwzględniające koszty transakcyjne.",
                "Niewielki model deep hedging; porównania przy różnych opóźnieniach informacji, kosztach transakcyjnych i warunkach rynkowych."
              ],
              deliverable: "Badanie porównawcze polityk hedgingowych przy różnych opóźnieniach informacji, kosztach transakcyjnych i warunkach rynkowych, obejmujące ocenę ryzyka skrajnych strat.",
              proposedScope: {
                researchers: 5,
                weeks: [
                  20,
                  24
                ]
              }
            }
          ]
        },
        {
          id: "development",
          title: "Quant Development",
          description: "Dwa odrębne komponenty C++ dla potencjalnej inicjatywy budowy infrastruktury giełdowej. Silnik dopasowywania zleceń może integrować się z silnikiem arkusza zleceń.",
          projects: [
            {
              id: "order-book-engine",
              index: "03",
              kind: "development",
              status: "proposed",
              title: "Silnik arkusza zleceń",
              objective: "Zaprojektowanie i implementacja wydajnego komponentu limit order book w C++.",
              scope: [
                "Zarządzanie zleceniami bid/ask, poziomy cenowe i priorytet ceny oraz czasu.",
                "Dodawanie, modyfikacja, anulowanie i wyszukiwanie zleceń.",
                "Wydajne struktury danych."
              ],
              evaluation: [
                "Poprawność funkcjonalna, przepustowość i opóźnienia operacji.",
                "Zachowanie pamięci i wydajność przy intensywnym przepływie zleceń."
              ],
              deliverable: "Przetestowany, zmierzony w benchmarkach i udokumentowany komponent C++ do integracji z szerszą platformą symulacji rynku."
            },
            {
              id: "matching-engine",
              index: "04",
              kind: "development",
              status: "proposed",
              title: "Silnik dopasowywania zleceń",
              objective: "Implementacja deterministycznego i wydajnego silnika dopasowywania zleceń do elektronicznej realizacji transakcji.",
              scope: [
                "Dopasowywanie zleceń kupna i sprzedaży, z częściową i pełną realizacją.",
                "Anulowanie zleceń i generowanie zdarzeń transakcyjnych.",
                "Deterministyczne przetwarzanie."
              ],
              evaluation: [
                "Poprawność dopasowywania, pokrycie testami i przepustowość.",
                "Rozkłady opóźnień i zachowanie przy dużym obciążeniu."
              ],
              deliverable: "Przetestowany komponent realizacji zleceń w C++, który może integrować się z silnikiem arkusza zleceń."
            }
          ]
        }
      ]
    },
    cycle: {
      eyebrow: "Jak pracujemy",
      title: "Od hipotezy do wyniku, który można obronić.",
      description: "Pracujemy w małych zespołach. Każdy projekt ma jasno postawione pytanie, kod podlegający review i rezultat, który można pokazać poza kołem.",
      outputLabel: "Rezultat",
      steps: [
        { index: "01", title: "Define", description: "Zaczynamy od pytania, które można zmierzyć, zakwestionować i sfalsyfikować.", output: "research brief" },
        { index: "02", title: "Build", description: "Budujemy eksperyment, model ML lub system z ustalonym benchmarkiem i kryteriami oceny.", output: "code + benchmark" },
        { index: "03", title: "Challenge", description: "Inny członek zespołu sprawdza założenia, implementację i interpretację wyniku.", output: "peer review" },
        { index: "04", title: "Share", description: "Publikujemy wnioski, ograniczenia i to, czego nie udało się potwierdzić.", output: "repo + report" },
      ],
    },
    community: {
      eyebrow: "Społeczność + branża",
      title: "Ambitni ludzie. Bliżej świata quant finance.",
      description: "Budujemy środowisko dla studentów, którzy chcą rozwijać się razem — przez wspólne projekty, techniczne dyskusje i uczciwy feedback.",
      networkLabel: "Industry network / in development",
      networkTitle: "Budujemy partnerstwa z globalnymi bankami, hedge fundami i firmami tradingowymi.",
      networkDescription: "Chcemy przekładać je na spotkania z praktykami, wsparcie projektów i realne możliwości rozwoju dla członków.",
      sectors: ["Global banks", "Hedge funds", "Trading firms"],
      pillars: [
        { title: "Peer review", description: "Ktoś sprawdza Twój tok myślenia, kod i wnioski. Ty robisz to samo dla innych." },
        { title: "Working sessions", description: "Regularnie spotykamy się, żeby rozwiązywać problemy, dzielić wiedzą i rozwijać projekty." },
        { title: "Like-minded network", description: "Poznajesz osoby, które równie serio traktują matematykę, technologię i wejście do branży." },
      ],
    },
    recruitment: {
      eyebrow: "Application form / next intake",
      title: "Pokaż nam, co budujesz i dlaczego chcesz robić to z nami.",
      description: "Rekrutacja zaczyna się od formularza. Nie musisz mieć doświadczenia w finansach — liczą się techniczne podstawy, motywacja i projekt, o którym potrafisz opowiedzieć uczciwie, także o błędach.",
      formLabel: "Formularz zostanie opublikowany po formalnym uruchomieniu naboru.",
      previewAction: "Zobacz, co przygotować",
      closePreview: "Zamknij",
      sheetEyebrow: "Przygotowanie zgłoszenia",
      sheetTitle: "Cztery rzeczy, które chcemy o Tobie wiedzieć.",
      sheetDescription: "To nie jest jeszcze aktywny formularz. Ta lista pozwala wcześniej przygotować najważniejsze informacje.",
      items: [
        { index: "01", title: "CV", description: "Krótko pokaż wykształcenie, umiejętności techniczne i dotychczasową aktywność." },
        { index: "02", title: "Kilka zdań o sobie", description: "Napisz, czym się interesujesz i czy bliżej Ci do Research, czy Development." },
        { index: "03", title: "Realizowane projekty", description: "Opisz problem, swój wkład, użyte narzędzia oraz najważniejszą lekcję." },
        { index: "04", title: "Motywacja", description: "Wyjaśnij, dlaczego chcesz dołączyć właśnie do AGH Quant Finance." },
      ],
      requirementsTitle: "Techniczne podstawy zależą od wybranej ścieżki",
      researchTitle: "Research",
      researchRequirements: "Python, statystyka, prawdopodobieństwo i podstawy machine learningu.",
      developmentTitle: "Development",
      developmentRequirements: "Python, Git, podstawy C++ i zainteresowanie budową niezawodnych systemów.",
      footerNote: "Motywacja jest konieczna. Nie zastępuje jednak podstaw potrzebnych do rozpoczęcia pracy w wybranej ścieżce.",
    },
    footer: {
      description: "Studencka inicjatywa badawczo-projektowa na AGH w Krakowie.",
      location: "AGH · Kraków",
      navigation: "Nawigacja",
      status: "Koło w organizacji",
    },
  },
  en: {
    languageLabel: "Przełącz na polski",
    header: {
      navigationLabel: "Primary navigation",
      paths: "Paths",
      projects: "Projects",
      community: "Community",
      recruitment: "Recruitment",
      status: "Form coming soon",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      eyebrow: "Scientific society · AGH University of Krakow",
      title: "Advancing quantitative finance",
      accent: "through research and engineering.",
      lead: "A student-led scientific society at AGH University of Krakow, dedicated to rigorous quantitative research, reproducible experiments, and high-performance financial systems.",
      primaryAction: "Explore Projects",
      secondaryAction: "How to Join",
      consoleLabel: "Two paths. A shared direction.",
      skillsLabel: "Areas of work",
      signature: "People. Models. Markets.",
      skipLink: "Skip to content",
      targetPath: "Selected path",
      semesterOutput: "Semester output",
    },
    principle: {
      label: "Operating principle / 00",
      statement: "We are not looking for finished quants.",
      accent: "We look for technical fundamentals, curiosity and consistent effort.",
    },
    paths: [
      {
        id: "research",
        code: "QR / 01",
        label: "Research",
        title: "Quant Research",
        description: "Form hypotheses, build statistical and ML models, and test them while controlling for bias, leakage and transaction costs.",
        output: "notebook → model → validation → report",
        skills: [
          { name: "Machine learning", level: "core" },
          { name: "Statistics", level: "core" },
          { name: "Python", level: "working" },
          { name: "Time series", level: "applied" },
          { name: "Probability", level: "core" },
        ],
      },
      {
        id: "development",
        code: "QD / 02",
        label: "Development",
        title: "Quant Development",
        description: "Turn ideas into repeatable tools: data pipelines, backtesters, execution simulators and testable code.",
        output: "specification → system → benchmark",
        skills: [
          { name: "Python", level: "core" },
          { name: "C++", level: "basics" },
          { name: "System design", level: "mindset" },
          { name: "Git / testing", level: "working" },
          { name: "Data pipelines", level: "working" },
        ],
      },
    ],
    projects: {
      eyebrow: "Initial project proposals",
      title: "Research and engineering projects.",
      description: "Four initial proposals for empirical research and C++ market infrastructure. The scope and deliverables below describe the planned work.",
      statusLabels: {
        proposed: "Proposed"
      },
      labels: {
        question: "Research question",
        objective: "Technical objective",
        methods: "Core methodology",
        scope: "Implementation scope",
        evaluation: "Evaluation",
        deliverable: "Expected deliverable",
        proposedScope: "Proposed scope",
        researchers: "researchers",
        weeks: "weeks",
        approximately: "approx."
      },
      groups: [
        {
          id: "research",
          title: "Quant Research",
          description: "Two proposed studies of volatility forecasting and hedging with imperfect information.",
          projects: [
            {
              id: "volatility-forecasting",
              index: "01",
              kind: "research",
              status: "proposed",
              title: "Volatility Forecasting: When Does Model Complexity Help?",
              question: "Does nonlinear modeling improve next-day variance forecasts over a linear model when both use the same information? Does any improvement persist during market stress?",
              methods: [
                "Five-minute BTC/ETH data and realized variance.",
                "HAR and XGBoost, using the same information set.",
                "Chronological walk-forward validation, QLIKE, and stress-period analysis."
              ],
              additionalBenchmarks: "EWMA and GARCH may serve as additional benchmarks.",
              deliverable: "A reproducible empirical study comparing forecasting performance and examining the stability of model rankings across market conditions.",
              proposedScope: {
                researchers: 4,
                weeks: [
                  12,
                  14
                ]
              }
            },
            {
              id: "imperfect-volatility-hedging",
              index: "02",
              kind: "research",
              status: "proposed",
              title: "Hedging with Imperfect Volatility Information",
              question: "How does delayed or inaccurate volatility information affect hedging performance, transaction costs, and extreme losses?",
              methods: [
                "Simulated hedging of European call options, with stochastic volatility (for example Heston) in the main experiment.",
                "Classical delta hedging, no-trade bands, and transaction-cost-aware benchmarks.",
                "A small deep-hedging model; comparisons across information delays, transaction costs, and market conditions."
              ],
              deliverable: "A comparative study of hedging policies across information delays, transaction costs, and market conditions, including tail-risk evaluation.",
              proposedScope: {
                researchers: 5,
                weeks: [
                  20,
                  24
                ]
              }
            }
          ]
        },
        {
          id: "development",
          title: "Quant Development",
          description: "Two independently identifiable C++ components for a potential exchange infrastructure initiative. The Matching Engine can integrate with the Order Book Engine.",
          projects: [
            {
              id: "order-book-engine",
              index: "03",
              kind: "development",
              status: "proposed",
              title: "Order Book Engine",
              objective: "Design and implement a high-performance limit order book component in C++.",
              scope: [
                "Bid/ask order management, price levels, and price-time priority.",
                "Insertion, modification, cancellation, and lookup.",
                "Efficient data structures."
              ],
              evaluation: [
                "Functional correctness, throughput, and operation latency.",
                "Memory behavior and performance under intensive order flow."
              ],
              deliverable: "A tested, benchmarked, documented C++ component suitable for integration into a broader market simulation platform."
            },
            {
              id: "matching-engine",
              index: "04",
              kind: "development",
              status: "proposed",
              title: "Matching Engine",
              objective: "Implement a deterministic and efficient matching engine for electronic order execution.",
              scope: [
                "Buy/sell order matching, with partial and complete fills.",
                "Cancellation and trade-event generation.",
                "Deterministic processing."
              ],
              evaluation: [
                "Matching correctness, test coverage, and throughput.",
                "Latency distributions and high-load behavior."
              ],
              deliverable: "A tested C++ execution component that can integrate with the Order Book Engine."
            }
          ]
        }
      ]
    },
    cycle: {
      eyebrow: "How we work",
      title: "From a hypothesis to a result you can defend.",
      description: "We work in small teams. Every project starts with a precise question, includes code review and ends with a result worth showing beyond the club.",
      outputLabel: "Output",
      steps: [
        { index: "01", title: "Define", description: "We start with a question that can be measured, challenged and falsified.", output: "research brief" },
        { index: "02", title: "Build", description: "We build an experiment, ML model or system with a clear benchmark and evaluation criteria.", output: "code + benchmark" },
        { index: "03", title: "Challenge", description: "Another member checks the assumptions, implementation and interpretation of the result.", output: "peer review" },
        { index: "04", title: "Share", description: "We publish the conclusions, limitations and what we were unable to confirm.", output: "repo + report" },
      ],
    },
    community: {
      eyebrow: "Community + industry",
      title: "Ambitious people. Closer to the industry.",
      description: "We are building an environment for students who want to grow together through collaborative projects, technical discussions and honest feedback.",
      networkLabel: "Industry network / in development",
      networkTitle: "We are building partnerships with global banks, hedge funds and trading firms.",
      networkDescription: "Our goal is to turn them into practitioner-led sessions, project support and meaningful development opportunities for members.",
      sectors: ["Global banks", "Hedge funds", "Trading firms"],
      pillars: [
        { title: "Peer review", description: "Someone checks your reasoning, code and conclusions. You do the same for others." },
        { title: "Working sessions", description: "We meet regularly to solve problems, exchange knowledge and move projects forward." },
        { title: "Like-minded network", description: "You meet people who take mathematics, technology and breaking into the industry just as seriously." },
      ],
    },
    recruitment: {
      eyebrow: "Application form / next intake",
      title: "Show us what you build and why you want to build with us.",
      description: "Recruitment starts with an application form. You do not need finance experience — technical fundamentals, motivation and a project you can discuss honestly, including its mistakes, matter most.",
      formLabel: "The form will be published when recruitment formally opens.",
      previewAction: "See what to prepare",
      closePreview: "Close",
      sheetEyebrow: "Application preparation",
      sheetTitle: "Four things we want to know about you.",
      sheetDescription: "This is not the active application form yet. The list helps you prepare the essential information in advance.",
      items: [
        { index: "01", title: "CV", description: "Briefly show your education, technical skills and relevant activity." },
        { index: "02", title: "A short introduction", description: "Tell us what interests you and whether Research or Development is a better fit." },
        { index: "03", title: "Projects", description: "Describe the problem, your contribution, the tools used and the most important lesson." },
        { index: "04", title: "Motivation", description: "Explain why you want to join AGH Quant Finance specifically." },
      ],
      requirementsTitle: "Technical fundamentals depend on the selected path",
      researchTitle: "Research",
      researchRequirements: "Python, statistics, probability and machine learning fundamentals.",
      developmentTitle: "Development",
      developmentRequirements: "Python, Git, C++ basics and an interest in building reliable systems.",
      footerNote: "Motivation is essential. It does not replace the foundations needed to start working in your selected path.",
    },
    footer: {
      description: "A student research and project initiative at AGH University in Kraków.",
      location: "AGH · Kraków",
      navigation: "Navigation",
      status: "Circle in formation",
    },
  },
};
