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

export const siteCopy: SiteCopy = {
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
};
