import type { SiteCopy } from "../content";

type ResearchDevelopmentProps = { copy: SiteCopy["disciplines"] };

export function ResearchDevelopment({ copy }: ResearchDevelopmentProps) {
  return (
    <section className="disciplines section-block shell" id="paths" tabIndex={-1} aria-labelledby="disciplines-title">
      <div data-reveal>
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2 id="disciplines-title">{copy.title}</h2>
      </div>
      <div className="disciplines__copy" data-reveal>
        <p><strong>Quant Research.</strong> {copy.research}</p>
        <p><strong>Quant Development.</strong> {copy.development}</p>
        <p>{copy.relationship}</p>
      </div>
    </section>
  );
}
