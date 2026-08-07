import type { SiteCopy } from "../content";

type PrincipleProps = {
  copy: SiteCopy["principle"];
};

export function Principle({ copy }: PrincipleProps) {
  return (
    <section className="principle shell" id="paths" data-reveal>
      <div className="principle__label">{copy.label}</div>
      <p><span>{copy.statement}</span> {copy.accent}</p>
    </section>
  );
}
