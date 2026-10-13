/** Update the existing draft manually under the society's Google account.
 * Set SOCIETY_ACCOUNT_EMAIL in Project Settings → Script properties first.
 * Keep the existing form/sheet IDs. Run updateMembershipApplication, not the creator.
 * This script never publishes a form or enables response collection.
 */
const MEMBERSHIP_TITLE = "Join Quant Finance AGH";
const MEMBERSHIP_DESCRIPTION = [
  "Membership Application / Zgłoszenie do koła naukowego",
  "Join a community of students interested in quantitative finance, scientific research, and software engineering.",
  "Tell us a little about yourself and your interests. Previous experience in quantitative finance is not required.",
  "Joining the society and participating in individual research or engineering projects are separate processes.",
  "Formal membership is subject to Board approval.",
  "Dołącz do społeczności studentów zainteresowanych finansami ilościowymi, badaniami naukowymi i inżynierią oprogramowania.",
  "Opowiedz nam krótko o sobie i swoich zainteresowaniach. Wcześniejsze doświadczenie w finansach ilościowych nie jest wymagane.",
  "Członkostwo w kole i udział w poszczególnych projektach badawczych lub inżynieryjnych to odrębne kwestie.",
  "Formalne członkostwo wymaga zatwierdzenia przez Zarząd.",
].join("\n\n");

const PRIVACY_DRAFT = [
  "DRAFT — Board approval required / PROJEKT — wymaga zatwierdzenia przez Zarząd",
  "Purpose / Cel: review society membership applications and contact applicants / rozpatrywanie zgłoszeń do koła i kontakt z kandydatami.",
  "Controller and contact / Administrator i kontakt: [BOARD TO APPROVE / DO ZATWIERDZENIA].",
  "Legal basis, retention, recipients and transfers / Podstawa prawna, okres przechowywania, odbiorcy i transfery: [BOARD TO APPROVE / DO ZATWIERDZENIA].",
  "Applicable rights, privacy contact and supervisory authority / Przysługujące prawa, kontakt w sprawie danych i organ nadzorczy: [BOARD TO APPROVE / DO ZATWIERDZENIA].",
  "No automated acceptance or scoring / Bez automatycznego przyjmowania i punktacji.",
  "Replace this draft with the approved notice before publishing. / Przed publikacją zastąp projekt zatwierdzoną klauzulą.",
].join("\n\n");

function createMembershipApplication() {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const properties = PropertiesService.getScriptProperties();
    const expectedAccount = requireSocietyAccount_();
    if (properties.getProperty("MEMBERSHIP_FORM_ID")) {
      if (properties.getProperty("MEMBERSHIP_SETUP_STATE") !== "complete") {
        throw new Error("An incomplete draft already exists. Inspect its saved IDs and repair it in Google; this script will not create duplicates.");
      }
      return inspectMembershipDraft();
    }

    // Creating unpublished avoids even a temporary public response-collection window.
    const form = FormApp.create(MEMBERSHIP_TITLE, false);
    properties.setProperties({ MEMBERSHIP_FORM_ID: form.getId(), MEMBERSHIP_SETUP_STATE: "incomplete" });
    try {
      form.setAcceptingResponses(false);
      const formFile = DriveApp.getFileById(form.getId());
      formFile.setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.NONE).setShareableByEditors(false);
      assertPrivateOwnedFile_(formFile, expectedAccount);

      form.setDescription(MEMBERSHIP_DESCRIPTION)
        .setIsQuiz(false)
        .setCollectEmail(false) // The required email question is the only email field.
        .setLimitOneResponsePerUser(false)
        .setAllowResponseEdits(false)
        .setPublishingSummary(false)
        .setShowLinkToRespondAgain(false)
        .setShuffleQuestions(false)
        .setProgressBar(false)
        .setConfirmationMessage("Thank you. The Board will review your membership application; this is not automatic acceptance. / Dziękujemy. Zarząd rozpatrzy Twoje zgłoszenie; wysłanie formularza nie oznacza automatycznego przyjęcia.")
        .setCustomClosedFormMessage("Applications are not open yet. / Nabór nie został jeszcze otwarty.");

      form.addTextItem().setTitle("Full name / Imię i nazwisko").setRequired(true);
      form.addTextItem().setTitle("Email address / Adres e-mail").setRequired(true)
        .setHelpText("Preferably your AGH email, if available. / Preferowany adres AGH, jeśli go posiadasz.")
        .setValidation(FormApp.createTextValidation().requireTextIsEmail()
          .setHelpText("Enter a valid email address. / Podaj poprawny adres e-mail.").build());
      form.addTextItem().setTitle("Field and year of study / Kierunek i rok studiów").setRequired(true)
        .setHelpText("Include your doctoral programme and year if applicable. / Jeśli jesteś doktorantem lub doktorantką, podaj program i rok kształcenia.");
      form.addMultipleChoiceItem().setTitle("Preferred track / Preferowana ścieżka").setRequired(true)
        .setChoiceValues(["Quant Research", "Quant Development", "Both / Obie", "Not sure yet / Jeszcze nie wiem"]);
      form.addParagraphTextItem().setTitle("What interests you most about quantitative finance? / Co najbardziej interesuje Cię w finansach ilościowych?")
        .setRequired(true).setHelpText("About 2–3 sentences about your academic or technical interests. / Około 2–3 zdania o Twoich zainteresowaniach naukowych lub technicznych.");
      form.addTextItem().setTitle("GitHub or LinkedIn profile (optional) / Profil GitHub lub LinkedIn (opcjonalnie)")
        .setRequired(false).setValidation(FormApp.createTextValidation().requireTextIsUrl()
          .setHelpText("Enter a full URL or leave this blank. / Podaj pełny adres URL lub pozostaw puste.").build());
      form.addMultipleChoiceItem().setTitle("Would you be interested in contributing to a research or engineering project? / Czy interesuje Cię udział w projekcie badawczym lub inżynieryjnym?")
        .setRequired(true).setChoiceValues(["Yes / Tak", "Maybe, I'd like to learn more / Być może, chcę dowiedzieć się więcej", "Not at the moment / Na razie nie"]);
      form.addSectionHeaderItem().setTitle("Privacy information / Informacja o danych osobowych")
        .setHelpText(properties.getProperty("APPROVED_PRIVACY_NOTICE") || PRIVACY_DRAFT);

      const spreadsheet = SpreadsheetApp.create("Quant Finance AGH — Membership Responses");
      properties.setProperty("MEMBERSHIP_SHEET_ID", spreadsheet.getId());
      const sheetFile = DriveApp.getFileById(spreadsheet.getId());
      sheetFile.setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.NONE).setShareableByEditors(false);
      assertPrivateOwnedFile_(sheetFile, expectedAccount);
      form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheet.getId());
      if (form.supportsAdvancedResponderPermissions()) form.setPublished(false);
      form.setAcceptingResponses(false); // Publishing changes can overwrite this setting.
      properties.setProperty("MEMBERSHIP_SETUP_STATE", "complete");
      return inspectMembershipDraft();
    } catch (error) {
      if (form.supportsAdvancedResponderPermissions()) form.setPublished(false);
      form.setAcceptingResponses(false);
      throw error;
    }
  } finally {
    lock.releaseLock();
  }
}

/** Reuses saved IDs; never creates files, edits questions, changes sharing or opens recruitment. */
function updateMembershipApplication() {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    // Audit before any write. Missing IDs, wrong owners, open forms or drift fail closed.
    inspectMembershipDraft(false);
    const properties = PropertiesService.getScriptProperties();
    const form = FormApp.openById(properties.getProperty("MEMBERSHIP_FORM_ID"));
    const privacy = form.getItems(FormApp.ItemType.SECTION_HEADER).filter(function (item) {
      return item.getTitle() === "Privacy information / Informacja o danych osobowych";
    });
    if (privacy.length !== 1) {
      throw new Error("Expected one existing privacy section. Repair it manually; no section will be added.");
    }
    const approvedNotice = (properties.getProperty("APPROVED_PRIVACY_NOTICE") || "").trim();
    if (approvedNotice && hasPrivacyPlaceholders_(approvedNotice)) {
      throw new Error("The approved notice still contains draft markers or placeholders. Obtain Board approval before applying it.");
    }
    form.setTitle(MEMBERSHIP_TITLE).setDescription(MEMBERSHIP_DESCRIPTION);
    if (approvedNotice) privacy[0].asSectionHeaderItem().setHelpText(approvedNotice);
    // Publication and response settings were checked above and are not changed here.
    return inspectMembershipDraft();
  } finally {
    lock.releaseLock();
  }
}

function hasPrivacyPlaceholders_(text) {
  return !text || /\[|\]|\bDRAFT\b|PROJEKT(?:\s*[—:-]|\s+DO\s+PRZEGLĄDU\b)|BOARD TO APPROVE|DO ZATWIERDZENIA|ZATWIERDZIĆ|APPROVE:/i.test(text);
}

function requireSocietyAccount_() {
  const expected = (PropertiesService.getScriptProperties().getProperty("SOCIETY_ACCOUNT_EMAIL") || "").trim().toLowerCase();
  const actual = Session.getEffectiveUser().getEmail().trim().toLowerCase();
  if (expected !== "agh.quant.finance@gmail.com" || !actual || expected !== actual) {
    throw new Error("Set SOCIETY_ACCOUNT_EMAIL to the verified official account and authorize/run under that same account. Nothing has been created.");
  }
  return expected;
}

function assertPrivateOwnedFile_(file, expectedAccount) {
  const owner = file.getOwner();
  const allowed = (PropertiesService.getScriptProperties().getProperty("AUTHORIZED_BOARD_EMAILS") || "")
    .split(",").map(function (email) { return email.trim().toLowerCase(); }).filter(Boolean);
  const collaborators = file.getEditors().concat(file.getViewers());
  if (!owner || owner.getEmail().toLowerCase() !== expectedAccount
    || file.getSharingAccess() !== DriveApp.Access.PRIVATE
    || collaborators.some(function (user) { return user.getEmail().toLowerCase() !== expectedAccount && allowed.indexOf(user.getEmail().toLowerCase()) < 0; })) {
    throw new Error("Ownership or response-file privacy does not match the society account / authorized Board list. Keep the form unpublished and review sharing.");
  }
}

function inspectMembershipDraft(logReport) {
  const expectedAccount = requireSocietyAccount_();
  const properties = PropertiesService.getScriptProperties();
  const formId = properties.getProperty("MEMBERSHIP_FORM_ID");
  const sheetId = properties.getProperty("MEMBERSHIP_SHEET_ID");
  if (!formId || !sheetId || properties.getProperty("MEMBERSHIP_SETUP_STATE") !== "complete") {
    throw new Error("Draft setup is incomplete. Inspect the saved form/sheet IDs in Script properties; do not publish or rerun with cleared IDs.");
  }
  const form = FormApp.openById(formId);
  assertPrivateOwnedFile_(DriveApp.getFileById(formId), expectedAccount);
  assertPrivateOwnedFile_(DriveApp.getFileById(sheetId), expectedAccount);
  const questionTypes = [FormApp.ItemType.TEXT, FormApp.ItemType.PARAGRAPH_TEXT, FormApp.ItemType.MULTIPLE_CHOICE];
  const items = form.getItems();
  const questions = items.filter(function (item) { return questionTypes.indexOf(item.getType()) >= 0; });
  const expectedTypes = [FormApp.ItemType.TEXT, FormApp.ItemType.TEXT, FormApp.ItemType.TEXT,
    FormApp.ItemType.MULTIPLE_CHOICE, FormApp.ItemType.PARAGRAPH_TEXT,
    FormApp.ItemType.TEXT, FormApp.ItemType.MULTIPLE_CHOICE];
  const expectedRequired = [true, true, true, true, true, false, true];
  const questionSettings = questions.map(function (item) {
    const question = item.getType() === FormApp.ItemType.TEXT ? item.asTextItem()
      : item.getType() === FormApp.ItemType.PARAGRAPH_TEXT ? item.asParagraphTextItem() : item.asMultipleChoiceItem();
    return { title: item.getTitle(), required: question.isRequired() };
  });
  const published = form.supportsAdvancedResponderPermissions() ? form.isPublished() : null;
  if (form.isAcceptingResponses() || published !== false || form.isPublishingSummary()
    || form.collectsEmail() || form.isQuiz() || form.hasLimitOneResponsePerUser()
    || form.getDestinationType() !== FormApp.DestinationType.SPREADSHEET || form.getDestinationId() !== sheetId
    || items.length !== 8 || items.filter(function (item) { return item.getType() === FormApp.ItemType.SECTION_HEADER; }).length !== 1
    || questions.length !== 7 || questions.some(function (item, index) { return item.getType() !== expectedTypes[index]; })
    || questionSettings.some(function (item, index) { return item.required !== expectedRequired[index]; })) {
    throw new Error("Draft configuration differs from the closed seven-question application. Review settings before Board approval.");
  }
  const trackChoices = questions[3].asMultipleChoiceItem().getChoices().map(function (choice) { return choice.getValue(); });
  const projectChoices = questions[6].asMultipleChoiceItem().getChoices().map(function (choice) { return choice.getValue(); });
  if (JSON.stringify(trackChoices) !== JSON.stringify(["Quant Research", "Quant Development", "Both / Obie", "Not sure yet / Jeszcze nie wiem"])
    || JSON.stringify(projectChoices) !== JSON.stringify(["Yes / Tak", "Maybe, I'd like to learn more / Być może, chcę dowiedzieć się więcej", "Not at the moment / Na razie nie"])) {
    throw new Error("Track or project-interest choices changed. Preserve the approved seven questions and review manually.");
  }
  const privacyText = items.filter(function (item) { return item.getType() === FormApp.ItemType.SECTION_HEADER; })[0]
    .asSectionHeaderItem().getHelpText();
  const report = {
    owner: expectedAccount,
    published: published,
    acceptingResponses: form.isAcceptingResponses(),
    responseSummaryVisible: form.isPublishingSummary(),
    title: form.getTitle(),
    collectsGoogleEmail: form.collectsEmail(),
    oneResponsePerUser: form.hasLimitOneResponsePerUser(),
    quiz: form.isQuiz(),
    trackChoices: trackChoices,
    privacyContainsPlaceholders: hasPrivacyPlaceholders_(privacyText),
    manualReviewRequired: ["Responder audience / signed-out access", "Email and optional URL validation", "Privacy legal approval", "Board sharing panels and any account triggers"],
    questions: questionSettings,
    editorUrl: form.getEditUrl(),
    respondentUrl: form.getPublishedUrl(), // A real URL, but not publicly accessible until approved/published.
    responseSpreadsheetUrl: SpreadsheetApp.openById(sheetId).getUrl(),
  };
  // Account-level execution logs are private; never commit this report or its internal URLs.
  if (logReport !== false) console.log(JSON.stringify(report, null, 2));
  return report;
}
