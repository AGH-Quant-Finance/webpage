import type { SiteCopy } from "../content";

type ResearchCycleProps = {
  copy: SiteCopy["cycle"];
};

export function ResearchCycle({ copy }: ResearchCycleProps) {
  return (
    <section className="research-cycle section-block shell" aria-labelledby="cycle-title">
      <div className="section-heading" data-reveal>
        <div><p className="eyebrow">{copy.eyebrow}</p><h2 id="cycle-title">{copy.title}</h2></div>
        <p className="section-description">{copy.description}</p>
      </div>

      <ol className="work-process">
        {copy.steps.map((step) => (
          <li className="work-step" key={step.index} data-reveal>
            <div className="work-step__meta">
              <span>{step.index}</span>
              <span>{copy.outputLabel}</span>
            </div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            <strong className="work-step__output">{step.output}</strong>
          </li>
        ))}
      </ol>
    </section>
  );
}
