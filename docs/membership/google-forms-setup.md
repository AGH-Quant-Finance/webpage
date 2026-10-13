# Finalize the existing society membership application

## Current status and verification

The society has already created its form and linked response spreadsheet. **Do not create another form, rerun the creator or clear the existing Script properties.** Internal editor/spreadsheet links and IDs, access lists, execution reports and applicant records belong outside this public repository.

On 13 October 2026, the available browser was signed in to the official society account. The existing Google Form was edited directly:

- Visible title and document name: **Join Quant Finance AGH**.
- Description starts with **Membership Application / Zgłoszenie do koła naukowego**, followed by the concise English introduction and natural Polish equivalent maintained in `MEMBERSHIP_DESCRIPTION` in [MembershipApplication.gs](../../scripts/google-forms/MembershipApplication.gs).
- Seven original questions remain. The six required controls and optional profile control were inspected; email validation is Text → Email and optional profile validation is Text → URL. Existing track and project-interest choices remain unchanged.
- Theme uses the existing website accent **#1245b9**, a neutral gray background and plain Roboto typography, without decorative header images.
- The editor shows **Publish** and the Responses view says publication is needed before responses can be accepted; zero responses are present. No form was published or activated and no applicant data was submitted.
- Settings show **Do not collect** email addresses, **Limit to 1 response off**, **quiz off**, **response editing off**, **response summaries off** and a confirmation message explaining Board review rather than automatic acceptance. The configured responder audience is **Anyone with the link**, gated by publication; publication has not happened.
- Form editor sharing and the supplied response spreadsheet sharing were inspected: society owner, **Restricted**, owner only. No collaborators or permissions were added. The form shows a linked Sheets destination; the supplied sheet contains the existing response tab. Recheck the exact linked destination and both sharing panels at launch.

An unauthenticated request to the supplied respondent URL returned HTTP 401, consistent with access not being publicly available; this is not a post-publication availability check. These are account-level browser observations, distinct from local script tests. Independent Apps Script triggers, organization policies and future signed-out respondent access are not certified by these UI checks. The privacy section still contains the deliberately marked draft. **It must be replaced with approved wording before publication.**

Google Drive discovery did not expose a dedicated Forms editing connector. Authenticated browser access was obtained after the user signed in; Drive connection alone was not treated as Forms authorization.

## Reapply presentation or insert an approved notice, without creating anything

Direct presentation edits above are complete. For a later repeatable update:

1. Open the **existing** Apps Script setup project under the official society account, not a new project or a personal account. Preserve `MEMBERSHIP_FORM_ID`, `MEMBERSHIP_SHEET_ID` and `MEMBERSHIP_SETUP_STATE: complete` exactly as saved by the successful setup. Do not put their values in this repository.
2. Replace the script source with [MembershipApplication.gs](../../scripts/google-forms/MembershipApplication.gs); preserve project settings and the existing [manifest](../../scripts/google-forms/appsscript.json). `SOCIETY_ACCOUNT_EMAIL` must identify the official account; the script now also checks that identity against the account confirmed in the brief. It never asks for passwords or tokens.
3. Run **inspectMembershipDraft** for a read-only account-level audit. Its execution report contains private resource links: keep it in the account, not in GitHub. It verifies ownership/restricted sharing, saved response destination, unpublished/closed settings, seven question types and required flags, choice values, no quiz/additional email collection/one-response sign-in setting, and reports unresolved privacy placeholders. Google responder access and field validation still require editor checks.
4. Select **updateMembershipApplication**, not `createMembershipApplication`. It only opens saved IDs, audits before any write and sets the title/description. It adds no questions or files, changes no validation/required flags/choices/sharing/destination, and never publishes or enables responses. Missing/incomplete IDs, open/published settings, wrong ownership, question/choice drift or an unexpected privacy section stop the update. Repeated runs produce the same presentation.
5. Once the Board has approved a complete bilingual notice, set the private `APPROVED_PRIVACY_NOTICE` Script property to that exact text. The updater replaces the existing privacy section; bracketed fields/draft markers are rejected before writing. Without this property, the existing privacy section remains untouched. A marker-free notice is not evidence of legal approval.
6. Review the actual saved form and both sharing panels after running. The older creator is retained for setup history and local regression fixtures; **it is not part of this existing-form workflow and must not be run**. Do not clear IDs to bypass an error.

If editing manually, change only the form title/description and, after approval, the existing privacy section. Keep the original seven questions and their settings. Google Forms has no separate subtitle field in this workflow: the requested subtitle is the first description paragraph. Theme customization is performed in the editor; the updater does not change it.

## Approval and launch steps — perform only after explicit authorization

1. **Approve the legal notice.** Resolve every item in [privacy-notice-draft.md](privacy-notice-draft.md), consulting the appropriate AGH data-protection contact as needed. Confirm controller identity/authority, legal basis, privacy contact, Google roles/terms/transfers, recipients, retention/deletion and applicable rights. Record the final bilingual text and approval privately; do not publish placeholders or add a cosmetic consent checkbox.
2. **Approve access and settings.** Confirm the society still owns both files; editor and response-sheet access remains Restricted. Add only specifically authorized Board members through the normal Google sharing workflow, with a privately recorded list. Check editor resharing, any installed scripts/triggers, exact linked response destination and deletion responsibilities. Keep quiz/scoring/automatic acceptance and response summaries off; preserve six required answers, optional profile, validations and existing choices.
3. **Review the closed draft.** Replace its privacy section with the approved notice. Preview wording and layout without submitting personal information. Confirm there are no CV uploads, additional mandatory questions or forced Google identity collection. In `inspectMembershipDraft`, optional `AUTHORIZED_BOARD_EMAILS` records the privately approved audit list; it does not invite users.
4. **Obtain explicit recruitment-launch approval.** Only then publish the existing form using the approved responder audience. Confirm response collection is enabled intentionally; publishing may affect that setting. Do not change editor or spreadsheet access to public. Verify the exact supplied respondent URL in a signed-out/private browser: correct form, readable approved notice, no forced sign-in and no exposed response summary. No real applicant data is needed for this check.
5. **Activate the website separately.** The supplied respondent URL is already saved in [recruitmentConfig.ts](../../src/recruitmentConfig.ts), with `state: "closed"`. After successful live respondent verification, review a change to `state: "open"`; run lint/build/tests and obtain the separately required release authorization. This renders **Apply to Join / Dołącz do koła**, securely opens a new tab and omits the obsolete preview/dialog. The navbar still points to Get Involved.
6. **Close recruitment when required.** Disable response collection in Google and set the website state back to `"closed"`. The functional How to Join preview returns, with no active application link. The website does not poll Google; a syntactically valid URL alone never proves the form is available.

No publication, recruitment activation, merge or production deployment is authorized by this setup task.

## References and verification limits

Google documents [form settings, publication and response destinations](https://developers.google.com/apps-script/reference/forms/form), [Drive ownership/sharing](https://developers.google.com/apps-script/reference/drive/file) and [text validation](https://developers.google.com/apps-script/reference/forms/text-validation-builder). The updater uses saved IDs and supported inspection methods; deprecated login methods are avoided. Responder permissions and a future signed-out launch check complement the one-response/email settings audit.

Local service doubles test preservation, wrong-account/missing-ID rejection, settings drift and privacy-marker rejection without calling Google. They do not certify live execution, legal approval, account triggers or institutional policy.
