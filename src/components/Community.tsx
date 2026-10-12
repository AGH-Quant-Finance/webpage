import type { SiteCopy } from "../content";

type CommunityProps = {
  copy: SiteCopy["community"];
};

export function Community({ copy }: CommunityProps) {
  return (
    <section className="community" id="community" tabIndex={-1} aria-labelledby="community-title">
      <div className="community__inner shell">
        <div className="community__statement" data-reveal>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 id="community-title">{copy.title}</h2>
        </div>
        <p className="community__description" data-reveal>{copy.description}</p>

        <div className="community-pillars">
          {copy.pillars.map((pillar) => (
            <article key={pillar.title} data-reveal>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
