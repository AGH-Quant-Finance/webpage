import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";
import { readFile } from "node:fs/promises";
import { getApplicationUrl, recruitmentConfig } from "../src/recruitmentConfig.ts";
import { siteCopy } from "../src/content.ts";

// Compile the component in memory; no browser or test framework dependency.
const source = await readFile(new URL("../src/components/Recruitment.tsx", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, jsx: ts.JsxEmit.ReactJSX } }).outputText
  .replaceAll('"react"', JSON.stringify(import.meta.resolve("react")))
  .replaceAll('"react/jsx-runtime"', JSON.stringify(import.meta.resolve("react/jsx-runtime")))
  .replaceAll('"../recruitmentConfig"', JSON.stringify(new URL("../src/recruitmentConfig.ts", import.meta.url).href));
const { Recruitment } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);

test("the delivered configuration stays closed without an application URL", () => {
  assert.equal(recruitmentConfig.state, "closed");
  assert.equal(recruitmentConfig.applicationUrl, null);
  assert.equal(getApplicationUrl(recruitmentConfig), null);
});

test("closed, missing, invalid and editor URLs cannot expose an Apply link", () => {
  const invalid = [null, "", "not a URL", "javascript:alert(1)", "http://forms.gle/test", "https://example.com/form", "https://docs.google.com/forms/d/test/edit", "https://docs.google.com.evil.test/forms/d/test/viewform", "https://user:password@forms.gle/test", "https://forms.gle/", "https://forms.gle:8443/test"];
  for (const applicationUrl of invalid) assert.equal(getApplicationUrl({ state: "open", applicationUrl }), null);
  assert.equal(getApplicationUrl({ state: "closed", applicationUrl: "https://forms.gle/test" }), null);
});

test("respondent URL formats are allowed only with an explicit open state", () => {
  // Test fixtures only, never configured in the delivered site or visited.
  for (const applicationUrl of ["https://forms.gle/test", "https://docs.google.com/forms/d/e/test/viewform", "https://docs.google.com/forms/d/test/viewform?usp=sf_link"])
    assert.equal(getApplicationUrl({ state: "open", applicationUrl }), applicationUrl);
});

test("both languages retain the preview fallback and switch to a secure external link when open", () => {
  for (const language of ["en", "pl"]) {
    const copy = siteCopy[language].recruitment;
    for (const config of [recruitmentConfig, { state: "open", applicationUrl: null }, { state: "open", applicationUrl: "https://example.com/form" }]) {
      const html = renderToStaticMarkup(createElement(Recruitment, { copy, config }));
      assert.ok(html.includes(copy.previewAction));
      assert.ok(html.includes('role="dialog"'));
      assert.ok(!html.includes('target="_blank"'));
    }
    const html = renderToStaticMarkup(createElement(Recruitment, { copy, config: { state: "open", applicationUrl: "https://forms.gle/test" } }));
    assert.ok(html.includes(copy.applyAction));
    assert.ok(html.includes('target="_blank" rel="noopener noreferrer"'));
    assert.ok(html.includes('aria-describedby="application-external-notice"'));
    assert.ok(html.includes(copy.externalNotice));
    assert.ok(!html.includes('role="dialog"'));
    assert.ok(!html.includes('class="sheet-scrim"'));
  }
});
