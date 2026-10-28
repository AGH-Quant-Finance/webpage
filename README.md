# AGH Quant Finance

Anglojęzyczna strona koła AGH Quant Finance, zbudowana w React, TypeScript i Vite. Przedstawia badania i inżynierię, sposób pracy, społeczność oraz możliwości dołączenia. Osobna strona `/projects` prezentuje cztery kierunki eksploracji.

## Uruchomienie

```bash
npm ci
npm run dev
```

Vite wyświetli lokalny adres aplikacji, domyślnie `http://localhost:5173`.

## Kontrola jakości

```bash
npm run lint
npm test
npm run build
```

## Struktura

- `src/components/` — komponenty poszczególnych sekcji,
- `src/content.ts` — angielskie teksty strony i dane ścieżek,
- `src/projectProposals.ts` — cztery pełne propozycje projektowe po angielsku; zwięzłe podsumowania na stronie `/projects` są w `src/projects.ts`,
- `src/styles.css` — tokeny, layout, responsywność i motion.

Panel Research / Development korzysta ze wspólnych wierszy CSS Grid: przełączanie zakładek zachowuje wysokość panelu i położenie opisów, tagów oraz treści poniżej przy dowolnej szerokości. Nieaktywny panel jest niewidoczny, ma `aria-hidden` i `inert`.

## Przed uruchomieniem rekrutacji

- zatwierdzić finalną klauzulę prywatności, administratora/podstawę prawną, zasady Google i wdrożenie retencji,
- zaktualizować istniejący formularz bez tworzenia duplikatu i sprawdzić publiczny dostęp oraz prywatność odpowiedzi,
- dopiero potem osobno zatwierdzić zmianę konfiguracji rekrutacji i wdrożenie. Adres dla respondentów jest już zapisany; samo opublikowanie formularza nie otwiera naboru na stronie.

## Identyfikacja wizualna — Phase 1

Jasny system wizualny oparty na oficjalnym symbolu QFC: niebieskie akcenty, czytelna typografia systemowa i szkło ograniczone do nawigacji. Navbar i hero są po angielsku. Przełącznik języka i obsługa zapisanego wyboru PL/EN zostały usunięte.

[Decyzje projektowe i wyniki weryfikacji](docs/phase-1-review.md).

Historyczne podglądy wersji dwujęzycznej: [PL desktop](docs/screenshots/pl-desktop.png), [PL mobile](docs/screenshots/pl-mobile.png), [EN desktop](docs/screenshots/en-desktop.png), [EN mobile](docs/screenshots/en-mobile.png).

## Minimalistyczna strona główna — Phase 2

Strona główna ma pięć sekcji: hero z panelem ścieżek, Research & Development, podejście Define → Build → Challenge → Share, społeczność i informacje o dołączeniu. Nawigacja oraz główne CTA prowadzą do aktualnych sekcji. Strona jest dostępna wyłącznie po angielsku, także dla osób z dawniej zapisanym wyborem PL.

Katalog projektów nie jest renderowany na stronie głównej. `src/projectProposals.ts` zachowuje bez zmian pełne opisy Volatility Forecasting, Hedging with Imperfect Volatility Information, Order Book Engine i Matching Engine po angielsku: metodologię, cele techniczne, zakres, kryteria oceny, oczekiwane rezultaty i proponowane metadane. Dane i strona `/projects` są ładowane w osobnym module, poza stroną główną.

[Przegląd projektu, weryfikacja i pełne zrzuty strony](docs/phase-2-review.md).

## Projekty i członkostwo

`/projects` (także `/projects/`) korzysta ze wspólnego anglojęzycznego nagłówka i stopki. Nawigacja informacyjna ma kolejność Paths → Approach → Community → Projects; Join Us jest osobnym CTA na desktopie i ostatnią wyróżnioną pozycją menu mobilnego oraz stopki. Strona projektów zawiera link Back to home. Cztery inicjatywy mają status Exploring, a pełne propozycje pozostają w `src/projectProposals.ts`. `src/projects.ts` zawiera krótkie opisy i ręcznie aktualizowany status oraz opcjonalne publiczne linki z datą ich weryfikacji. Obecnie żadne linki projektów nie są podane.

Build tworzy `dist/projects/index.html`, korzystając z istniejącej aplikacji i bez zależności routingu. Hosting powinien serwować cały `dist` z katalogowymi plikami `index.html`; przekierowanie `/projects` → `/projects/` jest dopuszczalne. Nie wymaga to globalnego SPA rewrite. Jeśli wybrana platforma obsługuje wyłącznie pojedynczy punkt wejścia, należy uzgodnić mapowanie `/projects` do tego pliku. Brak publicznego hostingu oznacza, że test na docelowej platformie jest nadal do wykonania. Nie zmieniono ustawień wdrożenia.

Rekrutacja pozostaje zamknięta: `src/recruitmentConfig.ts` ma `state: "closed"` oraz podany przez koło adres dla respondentów, który nie jest wyświetlany jako aktywny link. Działające Jak dołączyć pozostaje dostępne. Dopiero po zatwierdzeniu formularza i klauzuli prywatności przez Zarząd, publikacji za wyraźną zgodą oraz sprawdzeniu dostępu do właściwego formularza można ustawić `state: "open"`. Brak lub nieprawidłowy adres zachowuje istniejący podgląd. Strona nie sprawdza automatycznie dostępności Google ani nie otwiera naboru.

Formularz i arkusz już istnieją na koncie koła. W przeglądarce konta koła zaktualizowano tytuł i dwujęzyczny wstęp oraz sprawdzono pytania, walidację, ustawienia i ograniczony dostęp. W istniejącym projekcie Google Apps Script uruchomiono aktualizację i audyt bez tworzenia nowych zasobów. Projekt klauzuli w obu językach zawiera propozycje administratora, podstawy prawnej i terminów 90 dni od decyzji, wycofania lub przyjęcia; przechowywanie ewidencji członków wymaga odrębnej polityki. Propozycja wymaga przeglądu Zarządu i AGH. Weryfikacja z 14 października 2026 potwierdza, że formularz został opublikowany i przyjmuje odpowiedzi; strona dla respondentów zwraca HTTP 200 bez uprawnień edytora. Nadal zawiera jednak projekt klauzuli i nierozstrzygnięte pola. Publikacja nie potwierdza zatwierdzenia prywatności. Arkusz pozostaje prywatny, a publiczne podsumowanie odpowiedzi jest wyłączone. Konfiguracja strony pozostaje zamknięta; Zarząd powinien zweryfikować już włączone zbieranie odpowiedzi. Funkcja `updateMembershipApplication` może ponownie zastosować zatwierdzoną treść do zapisanych ID bez tworzenia plików, ale wymaga wcześniejszego wyłączenia odpowiedzi i cofnięcia publikacji istniejącego formularza. Nie uruchamiać procedury tworzenia ani nie zerować ID. Klauzula prywatności i uruchomienie naboru wymagają zatwierdzenia:

- [Weryfikacja istniejącego formularza i kroki zatwierdzenia naboru](docs/membership/google-forms-setup.md).
- [Projekt klauzuli prywatności do zatwierdzenia przez Zarząd](docs/membership/privacy-notice-draft.md).
- [Weryfikacja i zrzuty ekranu](docs/projects-and-membership-review.md).

Dodatkowe testy stanu rekrutacji i zabezpieczeń skryptu (zalecany Node 22.12+ i npm 10.x dla całego projektu; bez nowych zależności):

```bash
npm test
```

Testy skryptu używają atrap usług; nie potwierdzają rzeczywistej własności konta ani wykonania w Google.

GitHub Actions uruchamia lint, testy i build dla pull requestów do `main`, z Node 22 i zależnościami z lockfile. Workflow służy do walidacji; nie publikuje strony ani nie zmienia konfiguracji wdrożenia.

## Przekazanie do wdrożenia

[Instrukcja dla Quant Dev Leada](docs/deployment-handoff.md) obejmuje build, routing `/projects`, domenę/DNS, konfigurację, uruchamianie i zamykanie rekrutacji, publiczne linki projektów oraz testy po wdrożeniu. Frontend jest gotowy niezależnie od zatwierdzenia klauzuli; nabór pozostaje zamknięty.

[Krótkie podsumowanie do udostępnienia](docs/handoff-summary.md) · [Proponowana ocena prawnie uzasadnionego interesu](docs/membership/legitimate-interest-assessment.md).
