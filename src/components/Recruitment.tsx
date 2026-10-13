import { useEffect, useRef, useState } from "react";
import type { SiteCopy } from "../content";
import { getApplicationUrl, recruitmentConfig, type RecruitmentConfig } from "../recruitmentConfig";

type RecruitmentProps = {
  copy: SiteCopy["recruitment"];
  config?: RecruitmentConfig;
};

export function Recruitment({ copy, config = recruitmentConfig }: RecruitmentProps) {
  const applicationUrl = getApplicationUrl(config);
  const [sheetOpen, setSheetOpen] = useState(false);
  const sheetRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!sheetOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSheetOpen(false);
        requestAnimationFrame(() => triggerRef.current?.focus());
      }
      if (event.key !== "Tab") return;

      const focusable = sheetRef.current?.querySelectorAll<HTMLElement>(
        "button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])",
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    const focusFrame = requestAnimationFrame(() => closeButtonRef.current?.focus());
    return () => {
      cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [sheetOpen]);

  const closeSheet = () => {
    setSheetOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <section className="recruitment" id="recruitment" tabIndex={-1} aria-labelledby="recruitment-title">
      <div className="recruitment__inner shell">
        <div className="recruitment__heading" data-reveal>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 id="recruitment-title">{copy.title}</h2>
        </div>
        <div className="recruitment__copy" data-reveal>
          <div className="recruitment__description">
            {copy.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <p className="recruitment__supporting-note">{copy.supportingNote}</p>
          {applicationUrl ? (
            <a className="primary-button pressable" href={applicationUrl} target="_blank" rel="noopener noreferrer" aria-describedby="application-external-notice">
              {copy.applyAction}<span aria-hidden="true">↗</span>
            </a>
          ) : <button
            className="primary-button pressable"
            type="button"
            ref={triggerRef}
            aria-expanded={sheetOpen}
            aria-controls="application-preview"
            onClick={() => setSheetOpen(true)}
          >
            {copy.previewAction}<span aria-hidden="true">↗</span>
          </button>}
          {applicationUrl && <span className="visually-hidden" id="application-external-notice">{copy.externalNotice}</span>}
          <span className="form-status"><i aria-hidden="true" />{applicationUrl ? copy.openNotice : copy.formLabel}</span>
        </div>
      </div>

      {!applicationUrl && <>
      <button
        className="sheet-scrim"
        type="button"
        aria-label={copy.closePreview}
        tabIndex={sheetOpen ? 0 : -1}
        data-open={sheetOpen ? "" : undefined}
        onClick={closeSheet}
      />
      <aside
        ref={sheetRef}
        className="application-sheet"
        id="application-preview"
        role="dialog"
        aria-modal="true"
        aria-labelledby="application-sheet-title"
        aria-describedby="application-sheet-description"
        aria-hidden={!sheetOpen}
        data-open={sheetOpen ? "" : undefined}
      >
        <div className="application-sheet__handle" aria-hidden="true" />
        <div className="application-sheet__header">
          <div><p className="eyebrow">{copy.sheetEyebrow}</p><h2 id="application-sheet-title">{copy.sheetTitle}</h2></div>
          <button className="sheet-close pressable" type="button" ref={closeButtonRef} tabIndex={sheetOpen ? 0 : -1} onClick={closeSheet}>
            <span aria-hidden="true">×</span><span className="visually-hidden">{copy.closePreview}</span>
          </button>
        </div>
        <p className="application-sheet__description" id="application-sheet-description">{copy.sheetDescription}</p>
        <ul className="application-items">
          {copy.items.map((item) => (
            <li key={item.title}><h3>{item.title}</h3><p>{item.description}</p></li>
          ))}
        </ul>
        <div className="membership-context">
          <section aria-labelledby="membership-title">
            <h3 id="membership-title">{copy.membershipTitle}</h3>
            <p>{copy.membershipDescription}</p>
            <p>{copy.membershipNotice}</p>
          </section>
          <section aria-labelledby="project-participation-title">
            <h3 id="project-participation-title">{copy.projectTitle}</h3>
            <p>{copy.projectDescription}</p>
          </section>
        </div>
      </aside>
      </>}
    </section>
  );
}
