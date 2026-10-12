# Brand redesign — Phase 1 review

Baseline: `agent/react-signal-desk`, commit `182b467`. Review branch: `design/brand-redesign-phase-1`.

## Design decisions

- Light, editorial composition with a strong institutional research statement, comfortable paragraph lengths, and generous spacing. System sans-serif avoids extra font requests; monospace is limited to technical metadata.
- Official QFC symbol in the header and footer, with PNG and ICO favicons. The supplied transparent `qfc-symbol.png` was cropped to its existing artwork and resized with Lanczos resampling, preserving the artwork and gradients. The header asset is approximately 25 KB instead of 475 KB; no substitute logo was drawn. PNG favicons retain the original colors.
- Blue tokens derive from the logo: deep blue `#1245B9`, cobalt `#3477E8`, soft blue `#8FB5F5`, ice blue `#DCE9FC`; off-white `#F7F9FC` and ink `#101827`. Shared spacing, border, radius, and shadow tokens live in `src/styles.css`.
- Glass is limited to the floating navigation surface and language control. Solid white is the default material. An explicit feature query enables backdrop blur; reduced-transparency and increased-contrast preferences restore opaque navigation.
- PL/EN hero copy introduces research and engineering, with working anchors to projects and recruitment. The research/development selector is retained as a quiet supporting panel. Arbitrary numeric skill strengths and animated bars were removed; topics are descriptive.
- Lower sections retain their components, copy, anchor destinations, and grid structure. Changes there align colors, type scale, borders, and spacing with the new foundations. Recruitment remains a preparation preview rather than an active application form.

## Verification

- `npm ci`: passed; dependency manifest and lockfile unchanged.
- `npm run lint`: passed.
- `npm run build`: passed (TypeScript and Vite).
- `git diff --check`: passed.
- Chromium browser checks in both languages at **375, 768, 1440, and 1920 CSS px**: no document or visible-element horizontal overflow; logo loaded; no JavaScript runtime errors.
- Track tabs: click, ArrowRight, Home, selection state, panel association, and roving tab focus checked.
- Mobile menu: opening focuses the first link; Escape closes and restores trigger focus; project navigation closes the menu and reaches the intended anchor.
- Language: switch updates the document language, copy, and active indicator; preference survives reload.
- Recruitment dialog: opens with close-button focus, traps Tab, closes with Escape, and restores trigger focus.
- Skip link reaches the main content; visible keyboard focus styles are present.
- Reduced motion: browser emulation confirms transitions are disabled. Reduced transparency: browser emulation confirms a solid white header and no backdrop blur.
- Text token contrast on the lightest blue panel surface: body **5.82:1**, metadata **4.66:1**, blue accent **7.45:1**. White on the primary button: **8.15:1**.
- Unsupported-backdrop behavior reviewed in CSS: opaque defaults precede the `@supports` enhancement. Browser checks used Chromium; Firefox/Safari were not independently tested.

`npm ci` reports two pre-existing high-severity audit findings in development dependencies (`brace-expansion` and `source-map-js`). `npm audit --omit=dev` reports zero vulnerabilities. Dependency upgrades are outside this visual phase.

## Screenshots

Captured from the running Vite site at 1440 × 1000 and 375 × 1000, showing the header and hero. The mobile page continues below the viewport.

| Language | Desktop | Mobile |
| --- | --- | --- |
| Polish | [Desktop](screenshots/pl-desktop.png) | [Mobile](screenshots/pl-mobile.png) |
| English | [Desktop](screenshots/en-desktop.png) | [Mobile](screenshots/en-mobile.png) |

![English desktop preview](screenshots/en-desktop.png)

Phase 2 remains pending review.
