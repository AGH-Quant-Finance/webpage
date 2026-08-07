export type Language = "pl" | "en";

export type Skill = {
  name: string;
  level: string;
  strength: number;
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

export type ProjectDirection = {
  index: string;
  category: string;
  mode: string;
  symbol: string;
  title: string;
  description: string;
};

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
    interactive: string;
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
    proposed: string;
    items: ProjectDirection[];
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
      eyebrow: "Research · Machine Learning · Development",
      title: "Poważny research.",
      accent: "Lepszy start w quant finance.",
      lead: "AGH Quant Finance to selektywna społeczność studentów, którzy chcą przekuć statystykę, machine learning, programowanie i ciekawość rynków w ambitne projekty, mocne portfolio oraz relacje z ludźmi o podobnych celach.",
      primaryAction: "Poznaj ścieżki",
      secondaryAction: "Jak wygląda rekrutacja",
      consoleLabel: "career_path.config",
      interactive: "interaktywny wybór",
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
          { name: "Machine learning", level: "core", strength: 90 },
          { name: "Statystyka", level: "core", strength: 88 },
          { name: "Python", level: "working", strength: 86 },
          { name: "Szeregi czasowe", level: "applied", strength: 82 },
          { name: "Prawdopodobieństwo", level: "core", strength: 80 },
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
          { name: "Python", level: "core", strength: 90 },
          { name: "C++", level: "basics", strength: 68 },
          { name: "System design", level: "mindset", strength: 80 },
          { name: "Git / testy", level: "working", strength: 74 },
          { name: "Data pipelines", level: "working", strength: 78 },
        ],
      },
    ],
    projects: {
      eyebrow: "Proponowane kierunki projektowe",
      title: "Projekty, które rozwijają kompetencje potrzebne w quant finance.",
      description: "To kierunki na pierwszy cykl projektowy, a nie lista ukończonych prac. Finalny zakres wybierze zespół założycielski na podstawie kompetencji nowej grupy.",
      proposed: "propozycja",
      items: [
        {
          index: "01",
          category: "Market microstructure",
          mode: "Research + Dev",
          symbol: "⌇",
          title: "Symulator limit order book",
          description: "Model zdarzeń, egzekucja zleceń i analiza wpływu opóźnienia oraz płynności na wynik strategii.",
        },
        {
          index: "02",
          category: "Signals / ML",
          mode: "Research + ML",
          symbol: "α",
          title: "Walidacja sygnałów i modeli ML",
          description: "Od prostego baseline'u do walk-forward testu z kosztami transakcyjnymi, kontrolą data snooping i interpretacją modelu.",
        },
        {
          index: "03",
          category: "Tooling",
          mode: "Development",
          symbol: "{ }",
          title: "Research toolkit",
          description: "Wspólny szkielet danych, eksperymentów i raportów, z którego skorzystają kolejne zespoły.",
        },
      ],
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
      eyebrow: "Research · Machine Learning · Development",
      title: "Serious research.",
      accent: "A stronger start in quant finance.",
      lead: "AGH Quant Finance is a selective community for students who want to turn statistics, machine learning, programming and curiosity about markets into ambitious projects, a strong portfolio and relationships with like-minded people.",
      primaryAction: "Explore paths",
      secondaryAction: "How recruitment works",
      consoleLabel: "career_path.config",
      interactive: "interactive selection",
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
          { name: "Machine learning", level: "core", strength: 90 },
          { name: "Statistics", level: "core", strength: 88 },
          { name: "Python", level: "working", strength: 86 },
          { name: "Time series", level: "applied", strength: 82 },
          { name: "Probability", level: "core", strength: 80 },
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
          { name: "Python", level: "core", strength: 90 },
          { name: "C++", level: "basics", strength: 68 },
          { name: "System design", level: "mindset", strength: 80 },
          { name: "Git / testing", level: "working", strength: 74 },
          { name: "Data pipelines", level: "working", strength: 78 },
        ],
      },
    ],
    projects: {
      eyebrow: "Proposed project directions",
      title: "Projects that build skills used in quantitative finance.",
      description: "These are directions for the first project cycle, not a list of completed work. The founding team will select the final scope based on the new cohort's skills.",
      proposed: "proposed",
      items: [
        {
          index: "01",
          category: "Market microstructure",
          mode: "Research + Dev",
          symbol: "⌇",
          title: "Limit order book simulator",
          description: "Event modelling, order execution and analysis of how latency and liquidity affect strategy outcomes.",
        },
        {
          index: "02",
          category: "Signals / ML",
          mode: "Research + ML",
          symbol: "α",
          title: "Signal and ML model validation",
          description: "From a simple baseline to walk-forward testing with transaction costs, data-snooping controls and model interpretation.",
        },
        {
          index: "03",
          category: "Tooling",
          mode: "Development",
          symbol: "{ }",
          title: "Research toolkit",
          description: "A shared data, experiment and reporting framework that future teams can build on.",
        },
      ],
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
