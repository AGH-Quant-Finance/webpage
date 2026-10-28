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
    approach: string;
    community: string;
    joinAction: string;
    status: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    lead: string;
    consoleLabel: string;
    skillsLabel: string;
    skipLink: string;
    targetPath: string;
    semesterOutput: string;
  };
  disciplines: {
    eyebrow: string;
    title: string;
    research: string;
    development: string;
    relationship: string;
  };
  paths: Path[];
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
    pillars: Array<{ title: string; description: string }>;
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
      approach: "Podejście",
      community: "Społeczność",
      joinAction: "Dołącz do nas",
      status: "Formularz wkrótce",
      openMenu: "Otwórz menu",
      closeMenu: "Zamknij menu",
    },
    hero: {
      eyebrow: "Koło naukowe · AGH w Krakowie",
      title: "Rozwijamy finanse ilościowe",
      accent: "przez badania i inżynierię.",
      lead: "Studenckie koło naukowe przy AGH w Krakowie. Łączymy rzetelne badania ilościowe, odtwarzalne eksperymenty i budowę wydajnych systemów finansowych.",
      consoleLabel: "Dwie ścieżki. Wspólny kierunek.",
      skillsLabel: "Obszary pracy",
      skipLink: "Przejdź do treści",
      targetPath: "Wybrana ścieżka",
      semesterOutput: "Efekt semestru",
    },
    disciplines: {
      eyebrow: "Dwie uzupełniające się dziedziny",
      title: "Research & Development.",
      research: "Formułuje i weryfikuje hipotezy ilościowe.",
      development: "Sekcja Development zajmuje się projektowaniem i tworzeniem oprogramowania dla finansów ilościowych. Pracujemy nad systemami transakcyjnymi, symulacjami rynku i wysokowydajnymi obliczeniami, kładąc nacisk na nowoczesny C++, architekturę systemów i praktyczne umiejętności inżynierskie. Chcemy przekładać wiedzę techniczną na praktyczne zastosowania, ucząc się i rozwijając jako programiści.",
      relationship: "Pytania badawcze wyznaczają kierunek prac inżynieryjnych. Narzędzia pozwalają testować hipotezy i odtwarzać wyniki.",
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
          { name: "Walidacja modeli", level: "applied" },
        ],
      },
      {
        id: "development",
        code: "QD / 02",
        label: "Development",
        title: "Quant Development",
        description: "Zamieniaj złożone wyzwania w wydajne oprogramowanie. Zgłębiaj tematykę wysokowydajnych obliczeń, infrastruktury transakcyjnej i nowoczesnej inżynierii oprogramowania.",
        output: "specyfikacja → system → benchmark",
        skills: [
          { name: "C++", level: "core" },
          { name: "Python", level: "working" },
          { name: "System design", level: "mindset" },
          { name: "Benchmarki wydajności", level: "applied" },
          { name: "Data pipelines", level: "working" },
        ],
      },
    ],
    cycle: {
      eyebrow: "Jak pracujemy",
      title: "Od hipotezy do wyniku, który można obronić.",
      description: "Nasze podejście łączy precyzyjne pytania, odtwarzalne eksperymenty i wzajemną weryfikację. To wspólna podstawa badań i inżynierii.",
      outputLabel: "Rezultat",
      steps: [
        { index: "01", title: "Define", description: "Zaczynamy od pytania, które można zmierzyć, zakwestionować i sfalsyfikować.", output: "research brief" },
        { index: "02", title: "Build", description: "Budujemy eksperyment, model ML lub system z ustalonym benchmarkiem i kryteriami oceny.", output: "code + benchmark" },
        { index: "03", title: "Challenge", description: "Inny członek zespołu sprawdza założenia, implementację i interpretację wyniku.", output: "peer review" },
        { index: "04", title: "Share", description: "Przygotowujemy kod i raport, opisując wnioski, ograniczenia i to, czego nie udało się potwierdzić.", output: "repo + report" },
      ],
    },
    community: {
      eyebrow: "Społeczność",
      title: "Badania i inżynieria we współpracy.",
      description: "Tworzymy na AGH środowisko do wspólnej pracy nad pytaniami ilościowymi, wymiany wiedzy i technicznych dyskusji.",
      pillars: [
        { title: "Wspólna praca", description: "Zespołowe badania i prace inżynieryjne łączą różne umiejętności i perspektywy." },
        { title: "Peer review", description: "Wzajemnie sprawdzamy założenia, kod i wnioski. Dyskusja pomaga dostrzec ograniczenia." },
        { title: "Dialog z branżą", description: "Chcemy zapraszać praktyków finansów ilościowych do dyskusji i wymiany doświadczeń." },
      ],
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
      approach: "Approach",
      community: "Community",
      joinAction: "Join Us",
      status: "Form coming soon",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      eyebrow: "Science club · AGH University of Krakow",
      title: "Advancing quantitative finance",
      accent: "through research and engineering.",
      lead: "A student-led science club at AGH University of Krakow, dedicated to rigorous quantitative research, reproducible experiments, and high-performance financial systems.",
      consoleLabel: "Two paths. A shared direction.",
      skillsLabel: "Areas of work",
      skipLink: "Skip to content",
      targetPath: "Selected path",
      semesterOutput: "Semester output",
    },
    disciplines: {
      eyebrow: "Two complementary disciplines",
      title: "Research & Development.",
      research: "Develops and tests quantitative hypotheses.",
      development: "The Development Section focuses on designing and building software solutions for quantitative finance. We work on projects involving trading systems, market simulations, and high-performance computing, with an emphasis on modern C++ development, system architecture, and practical engineering skills. Our goal is to turn technical knowledge into real-world applications while learning and growing as developers.",
      relationship: "Research questions guide engineering. The tools make those questions testable and the results reproducible.",
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
          { name: "Model validation", level: "applied" },
        ],
      },
      {
        id: "development",
        code: "QD / 02",
        label: "Development",
        title: "Quant Development",
        description: "Turn complex challenges into efficient software. Explore high-performance computing, trading infrastructure, and modern software engineering.",
        output: "specification → system → benchmark",
        skills: [
          { name: "C++", level: "core" },
          { name: "Python", level: "working" },
          { name: "System design", level: "mindset" },
          { name: "Performance benchmarks", level: "applied" },
          { name: "Data pipelines", level: "working" },
        ],
      },
    ],
    cycle: {
      eyebrow: "How we work",
      title: "From a hypothesis to a result you can defend.",
      description: "Our approach combines precise questions, reproducible experiments and peer review. It provides a common foundation for research and engineering.",
      outputLabel: "Output",
      steps: [
        { index: "01", title: "Define", description: "We start with a question that can be measured, challenged and falsified.", output: "research brief" },
        { index: "02", title: "Build", description: "We build an experiment, ML model or system with a clear benchmark and evaluation criteria.", output: "code + benchmark" },
        { index: "03", title: "Challenge", description: "Another member checks the assumptions, implementation and interpretation of the result.", output: "peer review" },
        { index: "04", title: "Share", description: "We prepare code and a report explaining the conclusions, limitations and what we were unable to confirm.", output: "repo + report" },
      ],
    },
    community: {
      eyebrow: "Community",
      title: "Research and engineering through collaboration.",
      description: "We are forming a community at AGH for working on quantitative questions together, exchanging knowledge and discussing technical ideas.",
      pillars: [
        { title: "Collaborative work", description: "Team research and engineering bring together different skills and perspectives." },
        { title: "Peer review", description: "We examine each other’s assumptions, code and conclusions. Discussion helps identify limitations." },
        { title: "Industry dialogue", description: "We aim to engage quantitative finance practitioners in discussion and the exchange of experience." },
      ],
    },
    footer: {
      description: "A student research and project initiative at AGH University in Kraków.",
      location: "AGH · Kraków",
      navigation: "Navigation",
      status: "Circle in formation",
    },
  },
};
