# Quant Finance AGH — production and maintenance handoff

For the **Quant Development Lead**, responsible for choosing hosting, deploying and maintaining the website. PR #3 is merged; the verified main baseline is `16c679f4049eff6cca90f0a7cbafe56031796feb`. The approved design/content, official branding, bilingual homepage and four Exploring initiatives are complete. This handoff changes documentation only: no deployment, recruitment/configuration change or form creation.

**Website recruitment remains closed.** On 14 October 2026, the existing Google Form was independently observed as published and accepting responses, with a public respondent page returning HTTP 200. Its privacy section still contains review wording and unresolved fields. Publication therefore does **not** establish privacy approval or a fully approved recruitment operation. Resolve the approval gap before exposing Apply to Join; the Board should also review the already-enabled Google collection setting. No Google setting was changed during this verification.

[Shareable handoff summary](handoff-summary.md) · [Review/screenshots](projects-and-membership-review.md) · [Existing-form procedure](membership/google-forms-setup.md).

## Architecture and source map

A client-rendered static website: **React 19**, **TypeScript 6**, **Vite 8**, CSS and native browser navigation. There is no backend, database, routing library or production Node process. Google Forms is an external application service; the frontend does not call Google APIs or read responses.

| Location | Responsibility |
| --- | --- |
| `index.html`, `src/main.tsx` | HTML metadata and React entry point. |
| `src/App.tsx` | Homepage composition, language preferences and lazy Projects page. Only `/projects` or `/projects/` selects Projects; other paths select the homepage if the host serves the app. |
| `src/components/` | Shared header/footer, hero track panel, Research/Development, Approach, Community, Recruitment and Projects. |
| `src/content.ts` | EN/PL homepage, navigation and recruitment copy. |
| `src/projects.ts` | Short project-page copy in both languages, public statuses and verified outbound links. |
| `src/projectProposals.ts` | Full bilingual proposals and stable project IDs/indices/technical metadata; separate from public progress status. |
| `src/recruitmentConfig.ts` | Build-time recruitment state and public respondent URL validation. |
| `src/styles.css`, `src/hooks/useReveal.ts` | Approved tokens, layout/responsiveness, glass header and reveal behavior. |
| `public/` | Logo, favicons and other static files copied to the build root. |
| `scripts/copy-projects-entry.mjs` | Generates a real `dist/projects/index.html` after Vite builds, with Projects metadata. |
| `scripts/google-forms/` | Existing-form updater/audit and manifest; not part of the deployed frontend. |
| `tests/*.test.mjs` | Node regression tests for recruitment rendering/URL guards and Apps Script service doubles. |

English is the first-visit default. PL/EN choice is stored in browser localStorage under `agh-qf:preferences:v1`; switching still works if storage is unavailable. Homepage links from Projects use `/#paths`, `/#approach`, `/#community` and `/#recruitment`. Projects navigation is same-tab. Join Us targets the recruitment section, not a `/join` page.

## Prerequisites and local commands

Use **Node 22.12+** and **npm 10.x** as the handoff baseline; verified here with **Node 22.22.2 / npm 10.9.7**. The installed Vite requires Node `^20.19.0 || >=22.12.0`, but the existing Node tests import TypeScript using Node's stripping support, so use the Node 22 baseline for all checks. The repository has no npm engine pin; other npm versions have not been certified here. Commit and respect `package-lock.json`; do not replace `npm ci` with an incidental dependency upgrade.

From a fresh clone of the [repository](https://github.com/AGH-Quant-Finance/webpage):

```bash
git switch main
git pull --ff-only
npm ci
npm run dev
```

Vite prints its local development URL, normally `http://localhost:5173`. Stop with Ctrl+C. Run the release checks from the repository root:

```bash
npm run lint
npm test
npm run build
git diff --check
```

`npm test` runs the existing Node regression suite. All 12 tests pass at the verified baseline. Apps Script tests use local doubles; they do not prove current Google authorization, privacy approval or collection behavior.

`npm run build` runs TypeScript checks, Vite and the Projects-entry copy script. Output is **`dist/`**, including `index.html`, `projects/index.html`, hashed `assets/*`, `brand/*` and favicons. Deploy all of it together; do not publish source or `node_modules`.

For a quick bundled preview:

```bash
npm run preview -- --host 127.0.0.1 --port 4173
```

For a plain static directory-index test (Python 3 is optional, for this test only):

```bash
python3 -m http.server 5190 --bind 127.0.0.1 --directory dist
```

Open `http://127.0.0.1:5190/` and directly load/refresh `http://127.0.0.1:5190/projects`. A Vite preview alone can mask host fallback problems. Neither preview server is a production service.

## Hosting, routing and release

Choose a static host that supports HTTPS, root-domain hosting, directory indexes or equivalent internal rewrites, and complete artifact releases. No provider or target is selected in this repository. If the host builds from Git, configure install **`npm ci`**, build **`npm run build`**, output **`dist`**, and the Node version above. If it accepts uploaded artifacts, build the reviewed commit locally and upload the complete `dist/` to a new release. Keep the prior release before promoting the new one.

| Request | Required file/behavior |
| --- | --- |
| `/` | `dist/index.html`. |
| `/projects`, `/projects/` | `dist/projects/index.html`; a `/projects` → `/projects/` redirect is valid. |
| `/assets/*`, `/brand/*`, favicons | Serve actual files with correct MIME types, not HTML fallbacks. |

An internal rewrite must preserve the visible pathname `/projects` or `/projects/`. **Do not redirect to `/projects/index.html`**: that pathname selects the homepage. A global SPA fallback is unnecessary; configure unknown-route/404 behavior intentionally. Root-relative assets and links require deployment at the domain root. GitHub Pages-style repository subpaths require a separately reviewed base-path/routing change; they are not supported by the present configuration.

Release sequence: identify the reviewed commit, run checks, retain its full artifact and the previous release, publish to the host's staging/release slot if available, run smoke tests, then promote via the host's normal procedure. Record commit, artifact, release time and rollback target privately. GitHub Actions validates pull requests with lint, tests and build; it does not deploy or publish artifacts. No Pages configuration is present. External hosting integrations must be confirmed with the repository/hosting owners before assuming push-to-main deployment behavior.

## Domain, DNS, HTTPS and environment

Obtain the approved domain, canonical hostname, hosting target and domain/DNS access from the society. Apply only the hosting provider's issued A/AAAA/CNAME/nameserver records, account for DNS propagation, and issue/verify HTTPS certificates. Decide any apex/www and HTTP→HTTPS redirects with the host; preserve paths and fragments. Do not alter unrelated mail records. Domain, IPs, DNS values and credentials are not supplied here.

Revalidate HTML so releases/configuration changes appear promptly. Hashed assets may use long immutable caching; retain assets referenced by old HTML during release transitions. Check for cached HTML/CDN content after changing recruitment.

No frontend environment variables, `.env`, Google credentials or API keys are required. Recruitment/project settings are source files compiled into the artifact, so changes require review, rebuild and deployment. The response spreadsheet is not a frontend environment requirement. Keep internal editor/sheet/project URLs, account authorization material, access lists and applicant data outside source, build artifacts and public CI logs. Hosting credentials and private society resources must be handed over through an approved private channel.

## Google Forms and recruitment operation

The existing public respondent URL is already in [recruitmentConfig.ts](../src/recruitmentConfig.ts). Reuse that form and its current response destination; do not create another form/spreadsheet.

- **Closed or invalid URL:** How to Join / Jak dołączyć opens the existing information dialog; no active application link is exposed. Keyboard containment, Escape, focus return and body scroll lock are retained. This is a website state, not a Google collection switch.
- **Open with a valid URL:** Apply to Join / Dołącz do koła opens Google Forms in a new tab with `noopener noreferrer` and an accessible notice. The obsolete preview/dialog is not rendered. Header Join Us still targets Get Involved.
- Accepted URL syntax: HTTPS `forms.gle` short links or `docs.google.com/forms/d/(e/)?…/viewform`, without credentials or an explicit port; editor/sheet/other-host URLs are rejected. Syntax validation does not verify service availability. The site does not poll Google.

### Current evidence and remaining approvals

The 14 October read-only check observed Published, Accepting responses enabled and Anyone with the link. A signed-out HTTP fetch returned the correct respondent page, title and question text with HTTP 200. No application was submitted. Settings show no added Google-email identity collection or one-response sign-in requirement, and View results summary is off. The linked response-sheet sharing panel shows Restricted, society owner only. Private file links/access lists were not copied into documentation.

**The published form still has a privacy review draft and unresolved fields.** No Board/institutional approval record for a final notice, controller/legal basis or Google arrangements was supplied or independently verified. Current [bilingual notice](membership/privacy-notice-draft.md) and [legitimate-interest assessment](membership/legitimate-interest-assessment.md) remain proposals. Required approvals include final wording, controller/basis assessment, Google processing/transfer arrangements and implemented retention/deletion rules, including separate register and unresolved-application policies. Public accessibility is not approval. Website `state: "closed"` stays unchanged in this handoff.

### Update the existing form

Use the society's existing Google Form and Apps Script project, located through the authorized owner's private records. Preserve all saved IDs, seven questions, six required/one optional flags, validations, choices, destination and ownership. The repository's updater and `inspectMembershipDraft` **require an unpublished form with responses off**; inspection of the presently published form will intentionally reject it. Do not clear IDs or bypass the guard.

For an approved privacy update, the authorized owner first disables responses and unpublishes the existing form, then applies the exact approved bilingual text through `updateMembershipApplication` as described in the [existing-form procedure](membership/google-forms-setup.md). It replaces the existing privacy section idempotently and never publishes or enables collection. Never run the creator. Recheck the actual form/settings/destination afterwards. Store approvals and internal account details privately; remove all draft/review wording before the approved launch. The setup document's earlier closed-state observations are historical; this handoff records the newer published-state observation.

### Activate after approval, or close

1. Have the Board/institutional owner approve the notice, basis/controller, provider arrangements and retention implementation. Update the existing form as above.
2. Publish that approved form and intentionally enable responses. In a signed-out/private session, verify the configured URL displays the intended form, final bilingual notice and original questions without editor privileges or unintended sign-in. Check that summaries remain off and both editor/sheet sharing remain restricted. Do not submit real applicant data just to test. If testing a response is necessary, use an explicitly authorized synthetic test and remove it through the owner's normal process.
3. In a focused reviewed change, set `state: "open"` in the existing configuration, retain the verified respondent URL, run checks, rebuild and release. Test both CTA languages, correct new-tab destination and absence of the preview. This handoff does not perform activation.

To close: disable Google responses first, set website `state: "closed"`, review/rebuild/release, then verify How to Join and absence of Apply to Join. Closing the website alone does not stop a direct form link. Unpublish as well when preparing a privacy update. Coordinate Google state with any website rollback.

## Projects and bilingual maintenance

All four public entries currently have `status: "exploring"` in `projectPublications` in [projects.ts](../src/projects.ts):

| Stable ID | Index / group |
| --- | --- |
| `volatility-forecasting` | 01 / research |
| `imperfect-volatility-hedging` | 02 / research |
| `order-book-engine` | 03 / development |
| `matching-engine` | 04 / development |

Public status values: `exploring` (Exploring / Rozpoznanie), `in-progress` (In Progress / W realizacji), `released` (Released / Udostępniony). Obtain the project leader's verified status and review the change; adding a GitHub link does not itself advance status. The proposals' separate `status: "proposed"` describes their retained scope, not current public progress. Do not change it merely to update the badge.

For the relevant publication entry, add `repository`, `documentation` or `publication` as `{ url: "<verified public HTTPS URL>", verifiedOn: "<YYYY-MM-DD>" }`, replacing placeholders with checked values. Verify signed-out access and project relevance; the date records manual verification. Rendering checks HTTPS/no URL credentials and the date's format, not whether the date or destination is true. Links open securely in new tabs with bilingual labels. No links are currently configured; leave unknown ones absent.

Update short public titles/descriptions in both `projectsCopy.en.summaries[id]` and `projectsCopy.pl.summaries[id]` in `src/projects.ts`. Full proposal changes belong in both languages of [projectProposals.ts](../src/projectProposals.ts) and need project review. Preserve matching IDs, indices/order, research/development kinds/groups, question/objective, methods/scope/evaluation, deliverables and proposed scope metadata. Shared homepage/navigation/recruitment copy is in `src/content.ts`. Run checks and review both page languages after content changes; do not invent achievements, releases or partnerships.

## Production verification checklist

Repeat on the actual public host after release; local checks cannot certify production DNS, TLS, routing or caching:

- Direct-load and refresh `/`, `/projects` and `/projects/`; confirm the Projects heading/four entries and correct asset MIME types. Check JS/CSS/logo/favicon requests, image decoding, console/network errors and absence of horizontal overflow.
- EN/PL at desktop and 375px; first-visit English, saved preference, shared header/footer hierarchy, mobile menu links/Escape/focus return, same-tab Projects, Back to home and cross-page section anchors.
- Keyboard skip link and Research/Development Arrow/Home/End controls; closed recruitment dialog Tab/Shift+Tab/Escape/close/focus return. Check reduced motion/transparency and readable fallbacks.
- Verify the release's recruitment state. Closed: no active form link, working How to Join. Approved open release: both Apply to Join labels, intended secure new-tab URL, approved public form/response settings and no preview dialog.
- Four reviewed descriptions/statuses and any configured public project links; HTTPS/canonical redirects/path preservation; fresh HTML and consistent hashed assets after reload.

Record actual host, commit and results privately. No real-host deployment smoke test has been performed in this handoff.

## Rollback and troubleshooting

Retain the previous complete artifact/release and its commit before replacing production. If checks fail, use the chosen host's release switch to restore that artifact, or rebuild the recorded known-good commit in an isolated checkout with `npm ci` and `npm run build`, then publish its entire `dist/`. Restore HTML and assets as one release, revalidate cached HTML and rerun route/asset/language/recruitment checks. Do not edit generated files or force-push main to roll back. A website rollback does not revert Google publication, collection, privacy text or sharing; keep collection disabled when approval is absent and coordinate the configuration accordingly.

| Symptom | Check / remedy |
| --- | --- |
| Install/engine error | Check Node/npm versions, run `npm ci` against the committed lockfile and retain its error. Do not fix by deleting/changing the lockfile blindly. |
| No `npm test` command | Check that the checkout includes the CI maintenance change; older revisions use `node --experimental-strip-types --test tests/*.test.mjs`. |
| `/projects` fails only on direct load/refresh | Confirm `dist/projects/index.html` was generated and uploaded, directory-index/internal rewrite behavior and visible pathname. |
| Projects shows the homepage | Avoid `/projects/index.html` redirects; use `/projects` or `/projects/`. |
| Blank page, JS MIME error or missing logo | Inspect asset status/content type, domain-root deployment, stale HTML and mixed-release assets. Serve files rather than HTML fallback. |
| Old copy/state after deployment | Verify the deployed commit, rebuild after source changes, inspect CDN/browser HTML caching and release promotion. |
| How to Join still appears | Check compiled state and allowed respondent URL; open Google by itself does not change the website. Review pending approvals before activating. |
| Apply to Join leads to sign-in/closed form | Test signed out, verify publication/response audience/collection and URL, close website recruitment until resolved. |
| Updater/audit rejects the published form | Expected safeguard: disable responses and unpublish through the authorized owner before a privacy update; preserve saved IDs. |
| Wrong language on repeat visit | Inspect saved preference or test in a fresh profile; English is the default, not a forced override of PL. |

## Verification record and ownership of remaining work

Latest main at the baseline above: `npm ci`, lint, all 12 tests, build and `git diff --check` pass. The production output is tested on a plain loopback static server: direct `/projects`/`/projects/`, refresh, EN/PL descriptions, assets/internal URLs and keyboard skip link; EN/PL at 375/1440px verifies hero controls, navigation and closed recruitment/modal behavior. These are local Chromium checks, not Firefox/Safari or live deployment certification. No source/config/deployment-setting changes are made.

Quant Dev Lead: select host/domain, obtain private access, configure routing/DNS/TLS/cache/release/rollback and perform public-host smoke tests. Board/institutional owner: resolve privacy/processing/basis/retention approval and review the already-enabled form collection; provide approved final wording and authorized access privately. Later reviewed activation changes website configuration only after approved live-form verification. Neither privacy review nor recruitment closure blocks deploying the completed website.
