# AGH Quant Finance

Dwujęzyczna strona koła AGH Quant Finance, zbudowana w React, TypeScript i Vite. Przedstawia badania i inżynierię, sposób pracy, społeczność oraz możliwości dołączenia. Osobna strona `/projects` prezentuje cztery kierunki eksploracji.

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
- `src/projectProposals.ts` — cztery pełne propozycje PL/EN zachowane bez zmian; zwięzłe podsumowania na stronie `/projects` są w `src/projects.ts`,
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

Katalog projektów nie jest renderowany na stronie głównej. `src/projectProposals.ts` zachowuje bez zmian pełne opisy Volatility Forecasting, Hedging with Imperfect Volatility Information, Order Book Engine i Matching Engine w obu językach: metodologię, cele techniczne, zakres, kryteria oceny, oczekiwane rezultaty i proponowane metadane. Dane i strona `/projects` są ładowane w osobnym module, poza stroną główną.

[Przegląd projektu, weryfikacja i pełne zrzuty strony](docs/phase-2-review.md).

## Projekty i członkostwo

`/projects` (także `/projects/`) korzysta ze wspólnego nagłówka, stopki i zapisanego wyboru języka. Nawigacja informacyjna ma kolejność Paths → Approach → Community → Projects; Dołącz do nas jest osobnym CTA przy przełączniku języka na desktopie i ostatnią wyróżnioną pozycją menu mobilnego oraz stopki. Strona projektów zawiera link Powrót na stronę główną. Cztery inicjatywy mają status Exploring / Rozpoznanie, a pełne propozycje pozostają w `src/projectProposals.ts`. `src/projects.ts` zawiera krótkie opisy i ręcznie aktualizowany status oraz opcjonalne publiczne linki z datą ich weryfikacji. Obecnie żadne linki projektów nie są podane.

Build tworzy `dist/projects/index.html`, korzystając z istniejącej aplikacji i bez zależności routingu. Hosting powinien serwować cały `dist` z katalogowymi plikami `index.html`; przekierowanie `/projects` → `/projects/` jest dopuszczalne. Nie wymaga to globalnego SPA rewrite. Jeśli wybrana platforma obsługuje wyłącznie pojedynczy punkt wejścia, należy uzgodnić mapowanie `/projects` do tego pliku. Brak publicznego hostingu oznacza, że test na docelowej platformie jest nadal do wykonania. Nie zmieniono ustawień wdrożenia.

Rekrutacja jest zamknięta, a `src/recruitmentConfig.ts` ma `state: "closed"` i `applicationUrl: null`. Działające Jak dołączyć pozostaje dostępne. Dopiero po zatwierdzeniu formularza i klauzuli prywatności przez Zarząd oraz sprawdzeniu rzeczywistego adresu Google Forms można ustawić `state: "open"` i zweryfikowany URL. Brak lub nieprawidłowy adres zachowuje istniejący podgląd. Strona nie sprawdza automatycznie dostępności Google ani nie otwiera naboru.

Nie utworzono jeszcze formularza ani arkusza. Gotowy skrypt Apps Script tworzy siedem dwujęzycznych pytań, nieopublikowany formularz i prywatny arkusz po uruchomieniu na koncie koła:

- [Uruchomienie, autoryzacja konta koła i zatwierdzenie konfiguracji](docs/membership/google-forms-setup.md).
- [Projekt klauzuli prywatności do zatwierdzenia przez Zarząd](docs/membership/privacy-notice-draft.md).
- [Weryfikacja i zrzuty ekranu](docs/projects-and-membership-review.md).

Dodatkowe testy stanu rekrutacji i zabezpieczeń skryptu (Node 22.6+; bez nowych zależności):

```bash
node --experimental-strip-types --test tests/*.test.mjs
```

Testy skryptu używają atrap usług; nie potwierdzają rzeczywistej własności konta ani wykonania w Google.
