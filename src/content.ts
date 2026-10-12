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
    approach: string;
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
      approach: "Podejście",
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
      primaryAction: "Nasze podejście",
      secondaryAction: "Jak dołączyć",
      consoleLabel: "Dwie ścieżki. Wspólny kierunek.",
      skillsLabel: "Obszary pracy",
      signature: "Ludzie. Modele. Rynki.",
      skipLink: "Przejdź do treści",
      targetPath: "Wybrana ścieżka",
      semesterOutput: "Efekt semestru",
    },
    disciplines: {
      eyebrow: "Dwie uzupełniające się dziedziny",
      title: "Research & Development.",
      research: "Formułuje i weryfikuje hipotezy ilościowe.",
      development: "Tworzy niezawodne narzędzia eksperymentalne i infrastrukturę rynkową.",
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
    recruitment: {
      eyebrow: "Dołącz do nas",
      title: "Rozwijaj swój warsztat we wspólnej pracy.",
      description: "Wybierz Research lub Development, aby uczestniczyć w pracy zespołowej i dyskusjach technicznych. Doświadczenie w finansach nie jest wymagane. Zanim uruchomimy nabór, możesz zapoznać się z informacjami potrzebnymi do zgłoszenia.",
      formLabel: "Formularz zostanie opublikowany po formalnym uruchomieniu naboru.",
      previewAction: "Jak dołączyć",
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
      approach: "Approach",
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
      primaryAction: "Our Approach",
      secondaryAction: "How to Join",
      consoleLabel: "Two paths. A shared direction.",
      skillsLabel: "Areas of work",
      signature: "People. Models. Markets.",
      skipLink: "Skip to content",
      targetPath: "Selected path",
      semesterOutput: "Semester output",
    },
    disciplines: {
      eyebrow: "Two complementary disciplines",
      title: "Research & Development.",
      research: "Develops and tests quantitative hypotheses.",
      development: "Builds reliable tools for experiments and market infrastructure.",
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
    recruitment: {
      eyebrow: "Get involved",
      title: "Develop your practice through shared work.",
      description: "Choose Research or Development to participate in team work and technical discussions. Finance experience is not required. Before applications open, you can review the information to prepare for joining.",
      formLabel: "The form will be published when recruitment formally opens.",
      previewAction: "How to Join",
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
    },
    footer: {
      description: "A student research and project initiative at AGH University in Kraków.",
      location: "AGH · Kraków",
      navigation: "Navigation",
      status: "Circle in formation",
    },
  },
};
