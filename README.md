# AGH Quant Finance

Dwujęzyczna strona koła AGH Quant Finance, zbudowana w React, TypeScript i Vite. Przedstawia badania i inżynierię, sposób pracy, społeczność oraz możliwości dołączenia.

## Uruchomienie

```bash
npm ci
npm run dev
```

Vite wyświetli lokalny adres aplikacji, domyślnie `http://localhost:5173`.

## Kontrola jakości

```bash
npm run lint
npm run build
```

## Struktura

- `src/components/` — komponenty poszczególnych sekcji,
- `src/content.ts` — komplet tekstów PL/EN i dane ścieżek,
- `src/projectProposals.ts` — cztery pełne propozycje PL/EN zachowane dla przyszłej strony projektów,
- `src/styles.css` — tokeny, layout, responsywność i motion.

## Przed uruchomieniem rekrutacji

- podłączyć właściwy formularz,
- dodać oficjalne dane kontaktowe,
- zatwierdzić listę projektów pierwszego cyklu,
- potwierdzić formalną nazwę koła oraz zasady użycia identyfikacji AGH.

## Identyfikacja wizualna — Phase 1

Jasny system wizualny oparty na oficjalnym symbolu QFC: niebieskie akcenty, czytelna typografia systemowa i szkło ograniczone do nawigacji. Navbar i hero są dwujęzyczne; nowi użytkownicy zaczynają od wersji EN, a zapisany wybór PL/EN jest zachowany; struktura i treść pozostałych sekcji zostały zachowane.

[Decyzje projektowe i wyniki weryfikacji](docs/phase-1-review.md).

Podglądy: [PL desktop](docs/screenshots/pl-desktop.png), [PL mobile](docs/screenshots/pl-mobile.png), [EN desktop](docs/screenshots/en-desktop.png), [EN mobile](docs/screenshots/en-mobile.png).

## Minimalistyczna strona główna — Phase 2

Strona główna ma pięć sekcji: hero z panelem ścieżek, Research & Development, podejście Define → Build → Challenge → Share, społeczność i informacje o dołączeniu. Nawigacja oraz główne CTA prowadzą do aktualnych sekcji. Nowi użytkownicy zaczynają od EN; zapisany wybór PL/EN jest zachowany.

Katalog projektów nie jest renderowany na stronie głównej. `src/projectProposals.ts` zachowuje bez zmian pełne opisy Volatility Forecasting, Hedging with Imperfect Volatility Information, Order Book Engine i Matching Engine w obu językach: metodologię, cele techniczne, zakres, kryteria oceny, oczekiwane rezultaty i proponowane metadane. Dane nie są importowane przez stronę główną; osobna strona projektów nie została jeszcze wdrożona.

[Przegląd projektu, weryfikacja i pełne zrzuty strony](docs/phase-2-review.md).
