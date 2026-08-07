import type { SiteCopy } from "../content";

type ProjectsProps = {
  copy: SiteCopy["projects"];
};

export function Projects({ copy }: ProjectsProps) {
  return (
    <section className="projects section-block shell" id="projects">
      <div className="section-heading" data-reveal>
        <div><p className="eyebrow">{copy.eyebrow}</p><h2>{copy.title}</h2></div>
        <p className="section-description">{copy.description}</p>
      </div>

      <div className="project-grid">
        {copy.items.map((project) => (
          <article className="project-card" key={project.index} data-reveal>
            <div className="project-card__meta">
              <span>{project.index} / {project.category}</span>
              <span>{project.mode}</span>
            </div>
            <div className="project-card__visual" aria-hidden="true">
              <span>{project.symbol}</span>
              <i />
            </div>
            <div className="project-card__content">
              <span className="proposed-badge">{copy.proposed}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
