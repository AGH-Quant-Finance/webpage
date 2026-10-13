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

The hero contains only the introductory label, academic headline, supporting paragraph and interactive Quant Research / Quant Development panel. Both hero CTAs and the caption strip have been removed, with their unused markup, translation fields and styles. The existing grid centers the introduction against the panel on desktop; the mobile paragraph-to-panel gap remains 40px, with no empty action container. Research & Development, Our Approach, Community, footer copy and the existing recruitment heading/description/supporting note remain unchanged. No proposal descriptions were inserted into the homepage. There are no new decorative cards, charts or glass surfaces.

## Routing and hosting

`npm run build` also generates `dist/projects/index.html` from the built entry. A plain static server can serve `/projects` (with an optional directory redirect to `/projects/`) and refresh it without any SPA fallback. Assets use the existing root-relative paths. Serve the entire `dist` directory at the domain root, preserving directory index handling. A host that requires explicit mapping should map `/projects` and `/projects/` to `projects/index.html`; subpath hosting needs separately reviewed base-path configuration.

No deployment configuration was changed. The user confirmed there is **no public hosting URL yet**, so actual-platform verification remains pending. The generated output was tested against a plain Python static server, not merely Vite's development/SPA fallback. No deployment was performed.

## Recruitment and Google Forms

The website's central configuration is `src/recruitmentConfig.ts`, delivered as `state: "closed"` with the society-supplied respondent URL saved for a later approved launch. That URL is never rendered as an application link while closed. The existing accessible How to Join dialog remains functional. Missing, invalid, editor or spreadsheet URLs fail back to that flow. An explicitly open state with a verified live Google respondent URL renders Apply to Join / Dołącz do koła, a secure new-tab link and no preview/dialog. The site does not poll Google or automatically open recruitment.

The existing form and linked response spreadsheet were created by the society before this final setup pass. On 13 October 2026, authenticated browser access under the official account permitted a direct update to **Join Quant Finance AGH**, the supplied subtitle, welcoming bilingual introduction, cobalt accent and neutral background. The original seven questions, six required flags, optional profile and email/URL validations were inspected and preserved. No duplicate form, publication, response submission or activation occurred.

Account-level UI review confirms the society owner and Restricted owner-only access for form editors and the supplied response sheet; the configured responder audience is Anyone with the link but the form remains unpublished. Google email collection, one-response sign-in requirement, quiz and response summaries are off. A Board-review confirmation message avoids automatic acceptance. The tested updater was installed and successfully executed in the existing society-owned Google project, preserving saved IDs and the prior recovery function. The live audit verifies the exact saved response destination and closed seven-question configuration; the setup project has zero installed triggers. The latest proposed controller/contact, conditional legitimate-interest basis and 90-day decision/withdrawal/admission deadlines are included in the repository review notice. It supersedes the earlier unpublished form review copy; the approved-notice updater will replace that copy after approval. AGH/controller confirmation, balancing assessment, unresolved-application deadlines and the separate membership-register policy, Google arrangements and deletion implementation remain pending. Future signed-out respondent access, account triggers and institutional policies must be rechecked at launch. No private editor/spreadsheet links or access lists are stored here.

- [Existing-form verification and exact approval/publication/activation steps](membership/google-forms-setup.md).
- [Idempotent presentation/privacy updater and audit](../scripts/google-forms/MembershipApplication.gs); uses existing private Script properties, checks the official account and audits before writes. It never creates files, edits question settings or publishes. The earlier recovery function was preserved in the Google project; its creator must not be rerun for this form. Private project IDs and full execution reports are excluded from the public repository.
- [Bilingual privacy review draft with the society's proposed controller/basis/90-day policy](membership/privacy-notice-draft.md) and [the earlier unpublished form review capture](screenshots/membership-privacy-review-draft.jpg).
- [Updated unpublished form presentation](screenshots/membership-form-draft.jpg); the capture contains no editor URLs, response-sheet URLs, account lists or applicant data.

Review the society-proposed controller/contact and conditional Article 6(1)(f) basis with AGH, approve the balancing assessment and proposed 90-day decision/withdrawal/admission retention rules, and resolve Google arrangements/transfers, unresolved-application deadlines and the separate membership-register policy and deletion implementation; approve the bilingual notice and restricted Board access; then obtain explicit recruitment-launch approval. Publish/verify the existing respondent form first, and separately review website `state: "open"` plus release authorization. This task leaves both the form and website closed.

## Verification

- `npm ci`, `npm run lint`, `npm run build`, `git diff --check`: passed. No added dependencies or lockfile changes. Installation reports two inherited development-dependency advisories; no unrelated dependency updates were made.
- Twelve automated tests pass using Node's test runner: saved respondent URL remains hidden while closed, both language CTA variants, secure open-state link/preview removal, rejection of editor/sheet URLs and wrong accounts, private draft/response destination, duplicate/partial-setup safeguards, repeatable update preservation, settings/choice drift and privacy-placeholder rejection.
- Apps Script tests use service doubles; they verify local syntax/control flow, **not actual Google execution or account ownership**.
- Chromium production-output tests pass in EN/PL at **375, 768, 1440 and 1920px**: direct `/projects`, refresh, four statuses, correct groups/indices, no invented project links, shared navigation/footer links, cross-page section focus/clearance, language persistence and brand-home links.
- Skip link, keyboard Enter navigation, mobile menu initial focus/Escape restoration and closed recruitment dialog Tab/Shift+Tab containment, Escape/close/backdrop dismissal, body scroll lock and focus restoration pass. Tests include reduced motion.
- The final navigation refinement is checked on both pages in EN/PL at 375, 768, 1101, 1440 and 1920px. The 1101px desktop threshold fits all header items, including the Polish Join Us label. Every header/menu/footer destination, same-tab Projects navigation, cross-page section focus, Back to home, language persistence and Escape/menu closure are verified.
- No horizontal document overflow, JavaScript/console errors or failed requests in the viewport/language runs. Visual review covers desktop and mobile in both languages.
- Normal-motion and browser-storage failure checks also pass; the retained hero tab controls still support Arrow/Home/End navigation. Solid reduced-transparency styles are preserved unchanged.

Firefox/Safari, the actual future hosting platform, future signed-out respondent access, independent Google triggers and institutional policies have not been independently verified. Google ownership and the visible editor settings/sharing were checked in the authenticated society browser; local script tests remain separate from live service execution. These limits are separate from the passing local site checks.

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

Earlier homepage comparison captures, before the secondary hero CTA removal: [EN desktop](screenshots/projects-and-membership/en-home-1440.png), [EN mobile](screenshots/projects-and-membership/en-home-375.png), [PL desktop](screenshots/projects-and-membership/pl-home-1440.png), [PL mobile](screenshots/projects-and-membership/pl-home-375.png).

### Hero without CTAs

The hero introduces the society and its two interactive tracks without action links or a caption strip. The distinct navbar Join Us action and Get Involved's existing How to Join interaction remain intact, including the closed recruitment preview and its keyboard behavior. The shared primary-button styles remain in use by recruitment. No navigation, official branding, recruitment functionality or other section changed.

Lint, build and all twelve tests pass. Chromium verification at 1440px and 375px in English and Polish covers absence of hero links/unused containers, Research/Development click and Arrow/Home/End keyboard switching, retained navigation hierarchy, mobile menu Escape/focus restoration, recruitment dialog opening/Tab/Escape/focus restoration, Projects routing/language persistence and absence of horizontal overflow or browser errors. Removing the action and caption rows contracts the hero naturally; existing responsive grid spacing is preserved.

| Language | Desktop · 1440px | Mobile · 375px |
| --- | --- | --- |
| English | [Hero](screenshots/projects-and-membership/en-home-hero-1440.png) | [Hero](screenshots/projects-and-membership/en-home-hero-375.png) |
| Polish | [Hero](screenshots/projects-and-membership/pl-home-hero-1440.png) | [Hero](screenshots/projects-and-membership/pl-home-hero-375.png) |

No merge, form publication or production deployment is included.

## Deployment handoff

[Quant Dev Lead handoff](deployment-handoff.md) records build/publish commands, root-domain routing for `/projects`, domain/DNS decisions, public configuration, the three-step approved recruitment launch, closing, public project links and final production smoke tests. The latest bilingual privacy proposal includes 90 days from decision/withdrawal/admission, a separate register policy and the right to complain to the President of UODO. The idempotent approved-notice procedure preserves the existing form and stays closed. Frontend runtime/design/project data remain unchanged; production hosting and privacy approvals are separate pending decisions.

## Final merge verification — 14 October 2026

The user authorizes squash-merging PR #3 into `main` with recruitment closed while final privacy, basis and processing approvals remain pending. The [concise bilingual notice](membership/privacy-notice-draft.md) now uses the supplied society controller/contact and policy. A [proposed legitimate-interest assessment](membership/legitimate-interest-assessment.md) records purpose, necessity of the seven fields, balancing, safeguards and unresolved decisions; it does not certify approval. The notice is not installed as approved wording in Google.

- Fresh `npm ci`, lint, build, all 12 automated tests and `git diff --check`: pass. Two existing build-tool dependencies receive patch updates only: `brace-expansion` 5.0.9 → 5.0.12 and `source-map-js` 1.2.1 → 1.2.2. `npm audit` now reports zero vulnerabilities. No dependencies are added; frontend source, branding, configuration and project descriptions/statuses are unchanged in this final pass. See the [brace-expansion advisory](https://github.com/advisories/GHSA-qhr7-859c-m2p7) and [source-map-js advisory](https://github.com/advisories/GHSA-68fv-2mgg-jv7q).
- Current production-output browser checks pass in EN/PL at 375, 768, 1101, 1440 and 1920px: both pages, every header/menu/footer destination, same-tab Projects, direct load/refresh, cross-page anchor focus, language persistence, Back to home, Join Us and closed How to Join dialog. The test waits for the mobile menu's scheduled initial focus before selecting another destination. No page/console errors, failed requests or horizontal overflow occur.
- Additional EN/PL 375/1440 checks pass for hero Research/Development click and Arrow/Home/End controls, dialog focus/Tab/Shift+Tab/Escape/body scroll lock and return focus. Both pages retain their approved responsive composition.
- A separate normal-motion smoke test verifies `/`, `/projects`, `/projects/`, reloads, internal link HTTP status, decoded logo images, exact four translated project descriptions, skip-link focus and absence of HTTP/browser errors. All four statuses remain Exploring / Rozpoznanie. No project repositories are invented.
- The read-only live Google audit completes under the official society account: unpublished, responses disabled, summaries hidden, original seven questions with six required/one optional, private owned files and existing destination. The editor shows zero responses; a signed-out HTTP request to the respondent URL returns 401. Public respondent access remains a future post-approval launch check, not a passed activation test.

The existing form is neither duplicated nor published. `src/recruitmentConfig.ts` remains `state: "closed"` with the supplied respondent URL. The current review draft supersedes the older Google draft and requires the existing approved-notice update procedure before collection. Controller/legal-basis confirmation, approved notice, provider/transfer arrangements, register/unresolved-application retention and deletion implementation remain pending. These do not block the website merge or deployment handoff.

The branch contains the current remote `main` without conflicts. No required checks are reported by GitHub. No GitHub Actions workflows, Pages configuration or recorded deployments were found; unknown external hosting connections are not ruled out. Production deployment is left to the Quant Dev Lead and the [handoff](deployment-handoff.md). Prior statements above about no merge describe the earlier draft phases.
