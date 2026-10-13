import assert from "node:assert/strict";
import test from "node:test";
import vm from "node:vm";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../scripts/google-forms/MembershipApplication.gs", import.meta.url), "utf8");

function googleDouble({ account = "agh.quant.finance@gmail.com", owner = account, sheetFailure = false } = {}) {
  const values = new Map([["SOCIETY_ACCOUNT_EMAIL", "agh.quant.finance@gmail.com"]]);
  const properties = {
    getProperty: (key) => values.get(key),
    setProperty: (key, value) => values.set(key, value),
    setProperties: (data) => Object.entries(data).forEach(([key, value]) => values.set(key, value)),
  };
  const events = [];
  const items = [];
  const settings = {};
  const item = (type) => {
    const record = { type, required: false };
    for (const setter of ["Title", "HelpText", "Required", "ChoiceValues", "Validation"])
      record[`set${setter}`] = (value) => { record[setter.toLowerCase()] = value; return record; };
    record.getType = () => type;
    record.getTitle = () => record.title;
    record.getHelpText = () => record.helptext;
    record.getChoices = () => record.choicevalues.map((value) => ({ getValue: () => value }));
    record.isRequired = () => record.required;
    record.asTextItem = record.asParagraphTextItem = record.asMultipleChoiceItem = record.asSectionHeaderItem = () => record;
    items.push(record);
    return record;
  };
  const form = {
    getId: () => "form-id", getItems: (type) => type ? items.filter((item) => item.type === type) : items,
    getTitle: () => settings.Title,
    addTextItem: () => item("TEXT"), addParagraphTextItem: () => item("PARAGRAPH_TEXT"),
    addMultipleChoiceItem: () => item("MULTIPLE_CHOICE"), addSectionHeaderItem: () => item("HEADER"),
    supportsAdvancedResponderPermissions: () => true,
    isPublished: () => settings.Published, isAcceptingResponses: () => settings.AcceptingResponses,
    isPublishingSummary: () => settings.PublishingSummary, collectsEmail: () => settings.CollectEmail,
    isQuiz: () => settings.IsQuiz, getDestinationId: () => settings.destination,
    getDestinationType: () => "SPREADSHEET", hasLimitOneResponsePerUser: () => settings.LimitOneResponsePerUser,
    getEditUrl: () => "editor-fixture", getPublishedUrl: () => "respondent-fixture",
    setDestination: (type, id) => { settings.destination = id; return form; },
  };
  for (const setter of ["Title", "Published", "AcceptingResponses", "Description", "IsQuiz", "CollectEmail", "LimitOneResponsePerUser", "AllowResponseEdits", "PublishingSummary", "ShowLinkToRespondAgain", "ShuffleQuestions", "ProgressBar", "ConfirmationMessage", "CustomClosedFormMessage"])
    form[`set${setter}`] = (value) => { settings[setter] = value; events.push([setter, value]); return form; };
  const file = {
    getOwner: () => ({ getEmail: () => owner }), getSharingAccess: () => "PRIVATE",
    getEditors: () => [], getViewers: () => [],
    setSharing: (access, permission) => { events.push(["sharing", access, permission]); return file; },
    setShareableByEditors: () => file,
  };
  const validation = () => {
    const builder = {};
    builder.requireTextIsEmail = builder.requireTextIsUrl = builder.setHelpText = () => builder;
    builder.build = () => builder;
    return builder;
  };
  const spreadsheet = { getId: () => "sheet-id", getUrl: () => "sheet-fixture" };
  const context = vm.createContext({
    console: { log() {} },
    LockService: { getScriptLock: () => ({ waitLock() {}, releaseLock() {} }) },
    PropertiesService: { getScriptProperties: () => properties },
    Session: { getEffectiveUser: () => ({ getEmail: () => account }) },
    FormApp: {
      create: (title, published) => { settings.Title = title; settings.Published = published; events.push(["create", title, published]); return form; },
      openById: () => form, createTextValidation: validation,
      DestinationType: { SPREADSHEET: "SPREADSHEET" },
      ItemType: { TEXT: "TEXT", PARAGRAPH_TEXT: "PARAGRAPH_TEXT", MULTIPLE_CHOICE: "MULTIPLE_CHOICE", SECTION_HEADER: "HEADER" },
    },
    DriveApp: { getFileById: () => file, Access: { PRIVATE: "PRIVATE" }, Permission: { NONE: "NONE" } },
    SpreadsheetApp: {
      create: () => { if (sheetFailure) throw new Error("sheet unavailable"); return spreadsheet; },
      openById: () => spreadsheet,
    },
  });
  vm.runInContext(source, context);
  return { context, events, items, settings, values };
}

test("wrong or unverifiable account creates nothing", () => {
  for (const account of ["personal@test.invalid", ""]) {
    const mock = googleDouble({ account });
    assert.throws(() => mock.context.createMembershipApplication(), /same account/);
    assert.equal(mock.events.length, 0);
  }
});

test("creation is unpublished, private, linked, seven questions and never activated", () => {
  const mock = googleDouble();
  const report = mock.context.createMembershipApplication();
  assert.equal(report.acceptingResponses, false);
  assert.equal(report.published, false);
  assert.equal(mock.settings.destination, "sheet-id");
  assert.equal(report.questions.length, 7);
  assert.equal(report.questions.filter((question) => question.required).length, 6);
  assert.equal(report.questions[5].required, false);
  assert.deepEqual(Array.from(mock.items[3].choicevalues), ["Quant Research", "Quant Development", "Both / Obie", "Not sure yet / Jeszcze nie wiem"]);
  assert.equal(mock.items[6].choicevalues.length, 3);
  assert.match(mock.items[2].helptext, /doctoral/);
  assert.equal(mock.settings.CollectEmail, false);
  assert.equal(mock.settings.PublishingSummary, false);
  assert.equal(mock.settings.IsQuiz, false);
  assert.equal(mock.events.filter(([name, value]) => ["Published", "AcceptingResponses"].includes(name) && value === true).length, 0);
  assert.equal(mock.events.filter(([name]) => name === "sharing").length, 2);
  assert.ok(mock.events.filter(([name]) => name === "sharing").every(([, access, permission]) => access === "PRIVATE" && permission === "NONE"));
  mock.context.createMembershipApplication();
  assert.equal(mock.events.filter(([name]) => name === "create").length, 1);
});

test("ownership or partial-setup failure leaves collection closed and prevents duplicates", () => {
  for (const options of [{ owner: "wrong@test.invalid" }, { sheetFailure: true }]) {
    const mock = googleDouble(options);
    assert.throws(() => mock.context.createMembershipApplication());
    assert.equal(mock.settings.Published, false);
    assert.equal(mock.settings.AcceptingResponses, false);
    assert.equal(mock.values.get("MEMBERSHIP_SETUP_STATE"), "incomplete");
    assert.throws(() => mock.context.createMembershipApplication(), /incomplete draft/);
    assert.equal(mock.events.filter(([name]) => name === "create").length, 1);
  }
});

test("inspection rejects a drifted summary setting or opened collection", () => {
  for (const setting of ["PublishingSummary", "Published", "AcceptingResponses", "CollectEmail", "IsQuiz", "LimitOneResponsePerUser"]) {
    const mock = googleDouble();
    mock.context.createMembershipApplication();
    mock.settings[setting] = true;
    assert.throws(() => mock.context.inspectMembershipDraft(), /configuration differs/);
  }
});

test("existing-draft updates reuse IDs and preserve questions, validation, choices and closed settings", () => {
  const mock = googleDouble();
  mock.context.createMembershipApplication(); // Local fixture setup only, never a live Google call.
  const questions = mock.items.slice(0, 7).map((item) => ({ ...item }));
  const ids = [mock.values.get("MEMBERSHIP_FORM_ID"), mock.values.get("MEMBERSHIP_SHEET_ID")];
  const initialEvents = mock.events.length;
  for (let attempt = 0; attempt < 2; attempt++) {
    const report = mock.context.updateMembershipApplication();
    assert.equal(report.title, "Join Quant Finance AGH");
    assert.equal(report.acceptingResponses, false);
    assert.equal(report.published, false);
    assert.equal(report.privacyContainsPlaceholders, true);
    assert.match(mock.settings.Description, /^Membership Application \/ Zgłoszenie do koła naukowego/);
    assert.match(mock.settings.Description, /Previous experience in quantitative finance is not required/);
    assert.match(mock.settings.Description, /Wcześniejsze doświadczenie w finansach ilościowych nie jest wymagane/);
    assert.deepEqual(mock.items.slice(0, 7), questions);
    assert.deepEqual([mock.values.get("MEMBERSHIP_FORM_ID"), mock.values.get("MEMBERSHIP_SHEET_ID")], ids);
  }
  assert.equal(mock.items.length, 8);
  assert.ok(mock.events.slice(initialEvents).every(([event]) => ["Title", "Description"].includes(event)));
  assert.equal(mock.events.filter(([name]) => name === "create").length, 1);
});

test("existing-draft updater refuses missing IDs and a spoofed account without creating files", () => {
  const missing = googleDouble();
  assert.throws(() => missing.context.updateMembershipApplication(), /incomplete/);
  assert.equal(missing.events.length, 0);
  const spoofed = googleDouble({ account: "personal@test.invalid" });
  spoofed.values.set("SOCIETY_ACCOUNT_EMAIL", "personal@test.invalid");
  assert.throws(() => spoofed.context.updateMembershipApplication(), /same account/);
  assert.equal(spoofed.events.length, 0);
});

test("updater refuses settings and question drift before making presentation changes", () => {
  const changes = [
    (mock) => { mock.settings.Published = true; },
    (mock) => { mock.settings.AcceptingResponses = true; },
    (mock) => { mock.settings.destination = "wrong-sheet"; },
    (mock) => { mock.items[0].required = false; mock.items[5].required = true; },
    (mock) => { mock.items[3].choicevalues.push("unapproved choice"); },
    (mock) => { mock.items.push({ getType: () => "FILE_UPLOAD" }); },
    (mock) => { mock.items[7].title = "Unexpected section"; },
  ];
  for (const drift of changes) {
    const mock = googleDouble();
    mock.context.createMembershipApplication();
    drift(mock);
    const initialEvents = mock.events.length;
    assert.throws(() => mock.context.updateMembershipApplication());
    assert.equal(mock.events.length, initialEvents);
  }
});

test("approved notice updates one existing privacy section and rejects placeholders", () => {
  const mock = googleDouble();
  mock.context.createMembershipApplication();
  mock.values.set("APPROVED_PRIVACY_NOTICE", "[APPROVE: controller]");
  const initialEvents = mock.events.length;
  assert.throws(() => mock.context.updateMembershipApplication(), /draft markers/);
  assert.equal(mock.events.length, initialEvents);
  const notice = "Approved bilingual notice fixture / Zatwierdzona klauzula testowa";
  mock.values.set("APPROVED_PRIVACY_NOTICE", notice);
  const report = mock.context.updateMembershipApplication();
  assert.equal(mock.items[7].helptext, notice);
  assert.equal(report.privacyContainsPlaceholders, false); // Not a certification of legal approval.
  assert.equal(mock.items.length, 8);
  assert.equal(report.published, false);
});
