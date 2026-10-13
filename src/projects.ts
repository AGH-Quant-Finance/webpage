import type { Language } from "./content";

export type ProjectStatus = "exploring" | "in-progress" | "released";
export type VerifiedPublicLink = { url: string; verifiedOn: string };
export type ProjectPublication = {
  status: ProjectStatus;
  repository?: VerifiedPublicLink;
  documentation?: VerifiedPublicLink;
  publication?: VerifiedPublicLink;
};

// Update manually after verification; proposal scope remains in projectProposals.ts.
export const projectPublications: Record<string, ProjectPublication> = {
  "volatility-forecasting": { status: "exploring" },
  "imperfect-volatility-hedging": { status: "exploring" },
  "order-book-engine": { status: "exploring" },
  "matching-engine": { status: "exploring" },
};

export function publicProjectUrl(link: VerifiedPublicLink | undefined): string | null {
  if (!link || !/^\d{4}-\d{2}-\d{2}$/.test(link.verifiedOn)) return null;
  try {
    const url = new URL(link.url);
    return url.protocol === "https:" && !url.username && !url.password ? url.href : null;
  } catch {
    return null;
  }
}

type ProjectsCopy = {
  backHome: string;
  eyebrow: string;
  title: string;
  description: string;
  formationNote: string;
  statusLabels: Record<ProjectStatus, string>;
  linkLabels: Record<"repository" | "documentation" | "publication", string>;
  summaries: Record<string, { title: string; description: string }>;
};

export const projectsCopy: Record<Language, ProjectsCopy> = {
  en: {
    backHome: "← Back to home",
    eyebrow: "Projects",
    title: "What we're currently exploring.",
    description: "From empirical financial research to high-performance market infrastructure, our first initiatives explore the intersection of quantitative finance, mathematics, and software engineering.",
    formationNote: "We are beginning the process of forming project teams.",
    statusLabels: { exploring: "Exploring", "in-progress": "In Progress", released: "Released" },
    linkLabels: { repository: "GitHub repository", documentation: "Technical documentation", publication: "Publication or report" },
    summaries: {
      "volatility-forecasting": {
        title: "Volatility Forecasting",
        description: "Investigating whether nonlinear models provide more accurate volatility forecasts than traditional statistical approaches, particularly during periods of market stress.",
      },
      "imperfect-volatility-hedging": {
        title: "Imperfect Volatility Hedging",
        description: "Studying how delayed or inaccurate volatility information affects option hedging performance, transaction costs, and exposure to extreme losses.",
      },
      "order-book-engine": {
        title: "Order Book Engine",
        description: "Developing a high-performance C++ limit order book with efficient order management, price-time priority, and low-latency processing.",
      },
      "matching-engine": {
        title: "Matching Engine",
        description: "Building a deterministic order-matching system in C++, supporting order execution, partial fills, and performance evaluation under high market activity.",
      },
    },
  },
  pl: {
    backHome: "← Powrót na stronę główną",
    eyebrow: "Projekty",
    title: "Kierunki, które obecnie zgłębiamy.",
    description: "Od empirycznych badań finansowych po wydajną infrastrukturę rynkową — nasze pierwsze inicjatywy łączą finanse ilościowe, matematykę i inżynierię oprogramowania.",
    formationNote: "Rozpoczynamy tworzenie zespołów projektowych.",
    statusLabels: { exploring: "Rozpoznanie", "in-progress": "W realizacji", released: "Udostępniony" },
    linkLabels: { repository: "Repozytorium GitHub", documentation: "Dokumentacja techniczna", publication: "Publikacja lub raport" },
    summaries: {
      "volatility-forecasting": {
        title: "Prognozowanie zmienności",
        description: "Badamy, czy modele nieliniowe prognozują zmienność dokładniej niż tradycyjne metody statystyczne, zwłaszcza w okresach stresu rynkowego.",
      },
      "imperfect-volatility-hedging": {
        title: "Hedging przy niedoskonałej informacji o zmienności",
        description: "Badamy wpływ opóźnionej lub niedokładnej informacji o zmienności na skuteczność hedgingu opcji, koszty transakcyjne i ryzyko skrajnych strat.",
      },
      "order-book-engine": {
        title: "Order Book Engine",
        description: "Tworzymy wydajną księgę zleceń limitowanych w C++, z efektywnym zarządzaniem zleceniami, priorytetem ceny i czasu oraz przetwarzaniem o niskich opóźnieniach.",
      },
      "matching-engine": {
        title: "Matching Engine",
        description: "Budujemy deterministyczny system kojarzenia zleceń w C++, obsługujący realizację zleceń i częściowe wykonania oraz ocenę wydajności przy dużej aktywności rynkowej.",
      },
    },
  },
};
