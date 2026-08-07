import type { SiteCopy } from "../content";

type CommunityProps = {
  copy: SiteCopy["community"];
};

export function Community({ copy }: CommunityProps) {
  return (
    <section className="community" id="community">
      <div className="community__inner shell">
        <div className="community__statement" data-reveal>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2>{copy.title}</h2>
          <p>{copy.description}</p>
        </div>

        <aside className="industry-card" data-reveal>
          <div className="industry-card__header">
            <span>{copy.networkLabel}</span>
            <i aria-hidden="true" />
          </div>
          <h3>{copy.networkTitle}</h3>
          <p>{copy.networkDescription}</p>
          <ul>
            {copy.sectors.map((sector, index) => (
              <li key={sector}>
                <span>0{index + 1}</span>
                <strong>{sector}</strong>
              </li>
            ))}
          </ul>
        </aside>

        <div className="community-pillars">
          {copy.pillars.map((pillar, index) => (
            <article key={pillar.title} data-reveal>
              <span>0{index + 1}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
