# Quant Finance AGH — deployment handoff

For the Quant Dev Lead: the reviewed website is delivered through PR #3 into `main`. Design/content are approved. Deploy the resulting main commit through the normal release process. Recruitment remains **closed** while privacy approvals are pending; these do not block the website merge or deployment handoff.

## Build and deployment

Node **22.12+**, npm and the committed lockfile; verified with Node **22.22.2**:

```bash
npm ci
npm run lint
node --experimental-strip-types --test tests/*.test.mjs
npm run build
git diff --check
```

Publish the **entire `dist/` directory at the domain root**. Static-host settings: install `npm ci`, build `npm run build`, output `dist`. No production Node process is needed. Dev/preview servers are local tools.

For an approved SSH static host, set these variables to real host details and upload to a release directory; use the host's normal release switch and keep the previous release for rollback:

```bash
rsync -av dist/ "${QFC_DEPLOY_USER:?set approved SSH user}@${QFC_DEPLOY_HOST:?set approved host}:${QFC_DEPLOY_RELEASE_DIR:?set approved release directory}/"
```

Managed hosts use their own publish workflow. No provider/server/domain has been selected; the Lead records actual deployment targets before release.

## Routing, domain and DNS

- `/` → `dist/index.html`; `/projects` and `/projects/` → generated `dist/projects/index.html`. Directory-index handling and `/projects` → `/projects/` are supported; no global SPA fallback is required.
- A rewrite must keep the visible URL `/projects` or `/projects/`. Do not redirect to `/projects/index.html`: the app selects the page by pathname.
- Serve `/assets/*` and `/brand/*` directly with correct MIME types. Root-relative assets require domain-root hosting; a repository subpath needs a separate reviewed base-path change.
- Select the production host/domain and canonical hostname, obtain DNS access, apply the **provider-issued DNS records**, configure HTTPS/TLS and any agreed hostname redirect. Domain, IP, CNAME and nameserver values remain unspecified.
- Revalidate HTML; hashed assets can use immutable caching. Keep the complete release's assets available.

## Environment and configuration

No frontend environment variables, backend/database or Google API credentials are required. Internal IDs and authorization stay in the society's existing Apps Script project; keep credentials, editor/sheet URLs and Board access lists out of source/build/CI logs.

[recruitmentConfig.ts](../src/recruitmentConfig.ts) stores the public respondent URL and `state: "closed"`. Closed mode hides the application link and retains the accessible How to Join dialog. English is the first-visit default; saved PL/EN preferences persist.

## Privacy update and recruitment

Before launch, approve the [concise bilingual notice](membership/privacy-notice-draft.md), actual controller/basis and [proposed legitimate-interest assessment](membership/legitimate-interest-assessment.md), retention rules, separate register policy, Google service/transfer arrangements and Board access. The society has supplied its controller identity and recruitment responsibilities; legal/institutional clearance is still pending. The notice remains a **proposal** and supersedes the earlier Google draft; complete provider information and remove review wording before publication.

Under the society account in the **existing** script project, preserve all saved IDs. Set private `APPROVED_PRIVACY_NOTICE` to the exact approved bilingual text, run `updateMembershipApplication`, then `inspectMembershipDraft`. Repeated updates replace one existing privacy section and preserve seven questions, validations, choices, six required/one optional settings, destination, ownership and unpublished/closed state. Never run the creator or clear IDs. [Exact procedure](membership/google-forms-setup.md).

Opening recruitment requires only:

1. Publish the approved existing form and deliberately enable responses; retain restricted editor/sheet sharing and hidden summaries.
2. Verify its respondent URL signed out: correct form/notice, seven questions, no mandatory Google sign-in or exposed summary. No real applicant data is needed.
3. Update the existing website configuration to `state: "open"` with that verified HTTPS URL; rebuild/release. Bilingual Apply to Join opens securely in a new tab and replaces the preview. Invalid/editor/sheet URLs retain the fallback.

To close, disable responses in Google first, set website state to `"closed"`, rebuild/release. How to Join returns. The site does not poll Google. For a later privacy update, also unpublish the form: the updater requires both unpublished and responses off.

## Public project GitHub links

In [projects.ts](../src/projects.ts), add `repository: { url: "<verified public GitHub URL>", verifiedOn: "<YYYY-MM-DD>" }` to the relevant `projectPublications` entry, replacing placeholders after checking public signed-out access. Optional documentation/publication links use the same shape. The date records manual verification; it does not perform it.

Preserve IDs, descriptions, statuses and [proposal data](../src/projectProposals.ts). A repository link does not change status. Rebuild/review; labels are bilingual and links use secure new tabs.

## Smoke tests and remaining approvals

Preview generated output on a plain static server, then repeat these tests on the real HTTPS host:

```bash
python3 -m http.server 5190 --bind 127.0.0.1 --directory dist
```

- Direct-load/refresh `/`, `/projects`, `/projects/`; check JS/CSS/logo assets, console errors and overflow.
- EN/PL at desktop and 375px; first-visit English and saved preference. Check nav/footer hierarchy, Join Us, Back to home and cross-page homepage anchors.
- Keyboard track tabs; mobile menu Escape/focus restoration; closed dialog Tab/Shift+Tab/Escape/focus restoration.
- Closed: no active application link or acceptance claim. After approved launch: verified secure respondent link, bilingual Apply to Join and no obsolete preview.
- Public project links, canonical-domain redirects, TLS and HTML/asset caching.

Pending: production host/domain/DNS/release access; Board/institutional controller/basis/notice/Google-arrangement approval; register/unresolved-application retention and actual deletion procedure; live signed-out form and production-host checks. [Verification and screenshots](projects-and-membership-review.md). No duplicate form, publication or response collection is performed by this handoff. Production deployment belongs to the Quant Dev Lead. At merge review, the repository had no GitHub Actions workflows, GitHub Pages configuration or recorded GitHub deployments; separately connected external hosting was not confirmed.
