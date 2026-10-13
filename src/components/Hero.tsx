import type { SiteCopy } from "../content";
import { PathConsole } from "./PathConsole";

type HeroProps = { copy: SiteCopy };

export function Hero({ copy }: HeroProps) {
  return (
    <section className="hero shell" id="top" aria-labelledby="hero-title">
      <div className="hero-copy" data-reveal>
        <p className="eyebrow">{copy.hero.eyebrow}</p>
        <h1 id="hero-title"><span>{copy.hero.title}</span> <em>{copy.hero.accent}</em></h1>
        <p className="hero-lead">{copy.hero.lead}</p>
      </div>
      <div className="hero-console" data-reveal>
        <PathConsole paths={copy.paths} copy={copy.hero} />
      </div>
    </section>
  );
}
