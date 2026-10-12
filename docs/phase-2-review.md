# Phase 2 — Final institutional homepage

Branch: `codex/research-development-projects-phase-2`. Draft PR #2 targets the approved Phase 1.1 branch `design/brand-redesign-phase-1` (`c3babb7`).

## Composition

The homepage presents five sections: the approved academic hero and interactive track panel, a brief Research & Development introduction, Our Approach, Community, and Get Involved. The project catalogue has been removed from the homepage. The two disciplines are explained through their relationship rather than another list of skills or proposals.

Lower sections share aligned heading and text columns, a restrained type scale, and subtle separators. The Define → Build → Challenge → Share component uses open columns instead of enclosed cards; tablet and mobile reflow preserve the sequence. Section spacing and footer proportions have been tightened. The official logo, light cobalt/blue/slate palette, glass navigation, hero composition, and minimal motion remain intact.

Header and footer links are Paths / Approach / Community / Recruitment, with Polish equivalents. The hero's primary CTA is Our Approach (`#approach`); How to Join still leads to the recruitment preparation section. All section links resolve to focusable targets below the floating navigation. No active UI links to the removed project section.

Community focuses on collaborative research and engineering, peer review, discussion, and the ambition to engage practitioners. It makes no claim of established partnerships. Get Involved pairs a prominent heading with a short description, the bilingual How to Join button and application-status notice. The redundant path requirements, their copy fields and styles have been removed. The preparation dialog, its contents, focus containment/restoration, Escape handling and scroll lock are unchanged.

The final polish adds a slightly clearer translucent top edge and softer layered depth to the floating navbar. Its approved transparency and 16px blur remain unchanged, as do the solid material fallbacks. No additional glass surfaces or animations were introduced; all other sections and their bilingual copy are preserved.

English remains the default for new visitors. Explicit saved PL/EN preferences remain functional, including when browser storage is unavailable. No dependencies or routes were added.

## Preserved proposals

`src/projectProposals.ts` exports a typed bilingual dataset for future publication on a dedicated Projects/Research page. It is not imported by the homepage. The unused Projects component and its styles have been removed; no replacement catalogue or `/projects` route was introduced.

Every proposal field was compared directly with the previous Phase 2 dataset at `dfbf427`, and both language objects are identical. This includes section/group introductions and labels, IDs, titles, proposal status, scientific and technical content, expected deliverables, and research scope metadata.

| Proposal | Retained content |
| --- | --- |
| Volatility Forecasting | Five-minute BTC/ETH, realized variance, HAR/XGBoost with the same information, chronological walk-forward, QLIKE, stress-period analysis; optional EWMA/GARCH; reproducible study and ranking stability; proposed 4 researchers, approximately 12–14 weeks |
| Imperfect Volatility Hedging | European calls, simulated hedging, stochastic volatility such as Heston, delta hedging, no-trade bands, cost-aware benchmarks, small deep-hedging model; information delays, costs, market conditions and tail risk; proposed 5 researchers, approximately 20–24 weeks |
| Order Book Engine | C++ limit order book; bid/ask, price levels, price-time priority, insert/modify/cancel/lookup, efficient structures; correctness, throughput, operation latency, memory and intensive flow; tested, benchmarked, documented component as the expected outcome |
| Matching Engine | C++ execution; buy/sell matching, partial/full fills, cancellation, trade events, determinism; correctness, coverage, throughput, latency distributions and high load; tested component integrating with the Order Book Engine as the expected outcome |

Research and Development retain distinct types. Development records have no invented staffing or schedule fields. All four remain proposals, with no claims of completed or published work.

## Verification

- `npm ci`, `npm run lint`, `npm run build`, and `git diff --check`: passed. The lockfile and dependencies are unchanged. Installation reports two existing high-severity advisories in the development dependency tree; `npm audit --omit=dev` reports zero vulnerabilities.
- Production build served locally and checked in Chromium at 375, 768, 1440 and 1920px, in both languages.
- Language switching and persistence, fresh-visitor English, malformed preference fallback, and blocked-storage switching: passed.
- All header/mobile/footer and hero anchors tested with keyboard Enter; correct fragment, target focus and clearance below the floating navbar verified. No dangling anchors or rendered project catalogue.
- Mobile menu initial focus, Escape closure and focus restoration: passed.
- Hero tabs: ArrowLeft/ArrowRight/Home/End, selected panel and roving tab focus: passed.
- Recruitment preview: four preparation items, opening focus, Tab/Shift+Tab containment, Escape and close-button focus restoration: passed.
- Skip link, reduced motion and solid reduced-transparency navigation: passed.
- No horizontal document or visible-element overflow, broken images/favicon assets, failed requests, console errors or JavaScript runtime errors. Visible text is at least 12px.
- Approved hero text (except the requested primary CTA), track data, and recruitment preparation content compared with the previous version and retained.
- Full-page screenshots were captured after scrolling through all reveal sections and confirming every section was visible. Complete desktop and mobile compositions reviewed in both languages.

Firefox and Safari were not independently tested. This PR remains a draft; no merge or production deployment is part of the work.

## Screenshots and comparison

Full-page captures use 1440 × 1000 and 375 × 1000 browser viewports. Image height follows the complete page content.

| Language | Desktop full page | Mobile full page |
| --- | --- | --- |
| English | [Desktop](screenshots/final/en-desktop-full.png) | [Mobile](screenshots/final/en-mobile-full.png) |
| Polish | [Desktop](screenshots/final/pl-desktop-full.png) | [Mobile](screenshots/final/pl-mobile-full.png) |

Desktop after scrolling, with navigation glass over page content: [English](screenshots/final/en-desktop-scrolled.png) · [Polish](screenshots/final/pl-desktop-scrolled.png).

| Previous catalogue composition | Final institutional composition |
| --- | --- |
| [English desktop before](screenshots/phase-2/en-desktop-full.png) | [English desktop after](screenshots/final/en-desktop-full.png) |
| [English mobile before](screenshots/phase-2/en-mobile-full.png) | [English mobile after](screenshots/final/en-mobile-full.png) |

Earlier Phase 2 screenshots remain as historical comparisons. The `final/` captures show the current implementation.
