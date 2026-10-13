# Create the society membership application

## Current status

No Google Form or response spreadsheet has been created in this session. Plugin discovery found no native Google Forms creation tool; Google Drive/Gmail/Calendar were available but not installed or connected. No authenticated society account or ownership could be verified. There is no supported Forms connection flow here. The Apps Script fallback below is prepared for manual authorization by the society. No form URLs are configured or invented.

## Create an unpublished draft under the correct account

1. Use a browser profile signed in to the **official society Google account**. Open [Google Apps Script](https://script.google.com/) and check the account menu/email. Do not use your personal account. Create a new standalone project named `Quant Finance AGH — Membership Application Setup` in that account's My Drive.
2. Paste [MembershipApplication.gs](../../scripts/google-forms/MembershipApplication.gs) into `Code.gs`. In Project Settings, enable **Show appsscript.json manifest file in editor** and replace the manifest with [appsscript.json](../../scripts/google-forms/appsscript.json).
3. In **Project Settings → Script properties**, add `SOCIETY_ACCOUNT_EMAIL` with the exact verified official account email. This is an account identity, not a password or token. Never put credentials in the repository or chat. The script refuses to create anything when the effective signed-in email is blank or different.
4. Select `createMembershipApplication` and click **Run**. Review Google's authorization screen and authorize using that same society account. The script needs Forms and Sheets to create the application/response destination, Drive to verify ownership and private sharing, and your email identity to reject a wrong account. Stop if the account or permissions do not match this task; Workspace policy may require your administrator.
5. Read the execution log. It returns the real editor, respondent and response spreadsheet URLs, verified owner, seven questions and closed/unpublished settings. The respondent URL is a future response destination, **not an active public form**. Open the editor and spreadsheet while signed in to the society account and confirm their owner in **Share**. The script does not add collaborators.
6. Run `inspectMembershipDraft` to recheck without submitting personal information. Confirm seven questions, six required, the optional profile, email/URL validation, the four track choices, doctoral-study help, three project-interest choices, no uploads/quiz, no additional email collection, hidden response summaries, correct response destination, unpublished status and response collection off. Preview the wording without submitting.

The script saves form/spreadsheet IDs in Script properties. Rerunning a completed setup reuses them and inspects the draft. An interrupted setup stays closed and refuses to create duplicates; inspect the saved IDs, repair the existing draft in Google, and do not clear IDs just to rerun. Do not copy IDs or access lists to the public repository.

## Privacy, Board access and approval

- Resolve and approve [the bilingual privacy notice](privacy-notice-draft.md), including controller/contact, legal basis, retention/deletion, recipients/transfers and applicable rights. Replace the draft privacy section in the form with the approved wording. The optional `APPROVED_PRIVACY_NOTICE` Script property can supply approved text **before initial creation**; setting it after creation does not edit the existing form.
- Initially, the account owner is the only collaborator. Add only individually authorized Board accounts to both the form and response spreadsheet. Keep **General access: Restricted**; do not publish the spreadsheet or enable “anyone with the link”/domain-wide response-file access. Keep response summaries hidden and editor resharing disabled. Record the authorized emails privately; if you rerun the inspection, set `AUTHORIZED_BOARD_EMAILS` to that comma-separated approved list first. This property authorizes the audit, not automatic invitations.
- The Board must approve the notice, question wording, owner, response destination, responder access and retention process before publication. No consent question, scoring system, automatic acceptance, analytics or mail triggers are created.
- Inspect both sharing panels manually as well: Workspace administrative access/organizational policies cannot be fully certified by an Apps Script file-permission check.

## Open recruitment only after approval

1. In the Forms editor, apply the approved responder audience and publish the form only once recruitment is officially open. Changing publish state can reset whether responses are accepted, so explicitly review **Accepting responses** after publishing. Keep editor/response spreadsheet access restricted to the Board.
2. Copy the actual respondent link from Google Forms. Verify it in a signed-out/private browser or the approved respondent audience: correct title/questions/privacy notice, accessible form, no response-summary exposure. Do not use the editor URL and do not submit real personal information for verification.
3. Set `applicationUrl` in [recruitmentConfig.ts](../../src/recruitmentConfig.ts) to that verified Google respondent URL and set `state: "open"`. Review this configuration change before release. The homepage renders **Apply to Join / Dołącz do koła**, opening a new tab with `noopener noreferrer` and an accessible new-tab notice; the preparation dialog is omitted when the real flow is available.
4. To close recruitment, close response collection in Google and set the website state to `"closed"`. An absent or invalid URL also falls back to **How to Join**, with no dead link. The site does not poll Google or automatically change recruitment status; an unavailable valid link must be corrected or closed by the Board.

## API references and verification limits

The fallback uses Google's documented [unpublished form creation](https://developers.google.com/apps-script/reference/forms/form-app), [form settings and response destination](https://developers.google.com/apps-script/reference/forms/form), [Drive ownership/sharing](https://developers.google.com/apps-script/reference/drive/file) and [text validation](https://developers.google.com/apps-script/reference/forms/text-validation-builder). It creates the form unpublished from the outset and never contains a publishing/activation step.

Local checks can validate syntax and control flow with test doubles. They cannot verify actual Google account ownership, service execution, organization policies or live URLs. Those checks remain pending until the society runs and authorizes the script.
