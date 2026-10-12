import type { Language } from "./content";

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

export type ProjectProposalCopy = {
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

// Retained proposals for a future Projects/Research page; not imported by the homepage.
export const projectProposals: Record<Language, ProjectProposalCopy> = {
  pl: {
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
  en: {
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
};
