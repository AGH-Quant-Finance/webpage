# Projects & membership extension

Branch: `feat/projects-and-membership`, created from `main` at `1e6970f`. This is an extension of the approved homepage, not another redesign.

## Website

- `/projects` and `/projects/` present four concise bilingual entries in Quant Research and Quant Development groups. The English heading, introduction and summaries follow the supplied brief. All four display **Exploring / Rozpoznanie**, with a note that team formation is beginning.
- IDs, numbering and grouping come from `src/projectProposals.ts`. That complete file is byte-for-byte unchanged from main; scientific methods, technical scope, evaluation, deliverables and proposed staffing/durations remain preserved. The short presentation copy and manually maintained publication status live separately in `src/projects.ts`.
- Optional repository, documentation and publication/report links have a URL plus a required verification date. No links are configured or rendered. A date records manual verification; it does not automatically check a URL or advance status. Project status changes require a reviewed source change with verified evidence.
- Informational navigation follows Paths → Approach → Community → Projects (with Polish labels). Desktop Join Us ↗ / Dołącz do nas ↗ is a separate quiet blue action next to the PL/EN switcher. On mobile it is the final menu action, separated by a thin rule; the footer follows the same hierarchy and ends with Join Us. Projects always opens in the same tab. The existing glass material, logo and menu behavior remain unchanged. On Projects, homepage links use `/#...` and the active page is identified with `aria-current="page"`.
- Projects has a small ← Back to home / ← Powrót na stronę główną link above the introduction, pointing to `/` and retaining the saved language preference.
- Page changes use native links. No routing dependency was added; the Projects module loads separately. Explicit PL/EN preferences survive native page navigation and reloads. Fresh visitors start in English.
- A small initial-fragment effect scrolls/focuses homepage sections after React mounts, so cross-page section links work with keyboard navigation. Existing same-page links retain their behavior.

Hero, Research & Development, Our Approach, Community, footer copy and the existing recruitment heading/description/supporting note were compared against main and remain unchanged. No proposal descriptions were inserted into the homepage. There are no new decorative cards, charts or glass surfaces.

## Routing and hosting

`npm run build` also generates `dist/projects/index.html` from the built entry. A plain static server can serve `/projects` (with an optional directory redirect to `/projects/`) and refresh it without any SPA fallback. Assets use the existing root-relative paths. Serve the entire `dist` directory at the domain root, preserving directory index handling. A host that requires explicit mapping should map `/projects` and `/projects/` to `projects/index.html`; subpath hosting needs separately reviewed base-path configuration.

No deployment configuration was changed. The user confirmed there is **no public hosting URL yet**, so actual-platform verification remains pending. The generated output was tested against a plain Python static server, not merely Vite's development/SPA fallback. No deployment was performed.

## Recruitment and Google Forms

The website's central configuration is `src/recruitmentConfig.ts`, delivered as `state: "closed"` and `applicationUrl: null`. The existing accessible How to Join dialog remains functional. Missing, invalid or editor URLs fail back to that flow. With an explicitly open state and a verified Google respondent URL, the component displays Apply to Join / Dołącz do koła with a new-tab notice, `target="_blank"` and `rel="noopener noreferrer"`; the preview/scrim are omitted. It does not poll Google or automatically open recruitment.

The membership notice now explicitly covers both form submission and Discord not conferring automatic membership. Project participation remains separate, with Board approval under the regulations preserved.

**No Google Form or spreadsheet was created.** Discovery found no native Forms creation capability, and available Google Drive/Gmail/Calendar integrations were unconnected. The society account email and ownership have not been verified. Instead, the requested fallback is provided:

- [Apps Script and account/authorization instructions](membership/google-forms-setup.md).
- [Seven-question form creator](../scripts/google-forms/MembershipApplication.gs) and [manifest](../scripts/google-forms/appsscript.json).
- [Bilingual privacy notice draft for Board approval](membership/privacy-notice-draft.md).

The script rejects a missing/different effective account, creates a form unpublished from the outset, disables collection and response summaries, creates/links a private response spreadsheet, verifies ownership/sharing and prevents duplicate drafts. Six of seven questions are required; the profile URL is optional. Track choices include both and not sure yet; study help includes doctoral students. No uploads, additional mandatory questions, quiz, scoring, automatic acceptance, analytics or email triggers are added.

Manual steps remain: authorize/run under the verified society account; inspect real editor/respondent/spreadsheet URLs and Google settings; approve privacy/controller/contact/legal basis/retention and Board access; open recruitment in Google only after approval; verify respondent access; then review a website configuration change. No live application URL is present in the delivered site.

## Verification

- `npm ci`, `npm run lint`, `npm run build`, `git diff --check`: passed. No added dependencies or lockfile changes. Installation reports two inherited development-dependency advisories; no unrelated dependency updates were made.
- Eight automated tests pass using Node's test runner: URL/state fallback and both language CTA variants, secure external link/preview removal, wrong-account rejection, private closed draft/response destination, duplicate/partial-setup handling and settings drift rejection.
- Apps Script tests use service doubles; they verify local syntax/control flow, **not actual Google execution or account ownership**.
- Chromium production-output tests pass in EN/PL at **375, 768, 1440 and 1920px**: direct `/projects`, refresh, four statuses, correct groups/indices, no invented project links, shared navigation/footer links, cross-page section focus/clearance, language persistence and brand-home links.
- Skip link, keyboard Enter navigation, mobile menu initial focus/Escape restoration and closed recruitment dialog Tab/Shift+Tab containment, Escape/close/backdrop dismissal, body scroll lock and focus restoration pass. Tests include reduced motion.
- The final navigation refinement is checked on both pages in EN/PL at 375, 768, 1101, 1440 and 1920px. The 1101px desktop threshold fits all header items, including the Polish Join Us label. Every header/menu/footer destination, same-tab Projects navigation, cross-page section focus, Back to home, language persistence and Escape/menu closure are verified.
- No horizontal document overflow, JavaScript/console errors or failed requests in the viewport/language runs. Visual review covers desktop and mobile in both languages.
- Normal-motion and browser-storage failure checks also pass; the retained hero tab controls still support Arrow/Home/End navigation. Solid reduced-transparency styles are preserved unchanged.

Firefox/Safari, the actual future hosting platform and live Google ownership/settings/response destination have not been independently verified. These limits are separate from the passing local site checks.

## Screenshots

### Navigation refinement

| Language | Desktop header · homepage | Desktop header · Projects | Mobile menu · homepage | Mobile menu · Projects |
| --- | --- | --- | --- | --- |
| English | [Header](screenshots/projects-and-membership/en-home-desktop-navigation.png) | [Header and back link](screenshots/projects-and-membership/en-projects-desktop-navigation.png) | [Menu](screenshots/projects-and-membership/en-home-mobile-menu.png) | [Menu](screenshots/projects-and-membership/en-projects-mobile-menu.png) |
| Polish | [Header](screenshots/projects-and-membership/pl-home-desktop-navigation.png) | [Header and back link](screenshots/projects-and-membership/pl-projects-desktop-navigation.png) | [Menu](screenshots/projects-and-membership/pl-home-mobile-menu.png) | [Menu](screenshots/projects-and-membership/pl-projects-mobile-menu.png) |

### Complete pages

Projects captures use 375 × 812 or 768/1440/1920 × 1000 browser viewports; screenshot height follows the page content.

| Language | Mobile · 375px | Tablet · 768px | Desktop · 1440px | Wide · 1920px |
| --- | --- | --- | --- | --- |
| English | [Projects](screenshots/projects-and-membership/en-projects-375.png) | [Projects](screenshots/projects-and-membership/en-projects-768.png) | [Projects](screenshots/projects-and-membership/en-projects-1440.png) | [Projects](screenshots/projects-and-membership/en-projects-1920.png) |
| Polish | [Projekty](screenshots/projects-and-membership/pl-projects-375.png) | [Projekty](screenshots/projects-and-membership/pl-projects-768.png) | [Projekty](screenshots/projects-and-membership/pl-projects-1440.png) | [Projekty](screenshots/projects-and-membership/pl-projects-1920.png) |

Homepage comparison captures, including unchanged hero and closed recruitment state: [EN desktop](screenshots/projects-and-membership/en-home-1440.png), [EN mobile](screenshots/projects-and-membership/en-home-375.png), [PL desktop](screenshots/projects-and-membership/pl-home-1440.png), [PL mobile](screenshots/projects-and-membership/pl-home-375.png).

No merge, form publication or production deployment is included.
