import type { SiteCopy } from "../content";

type ProjectsProps = { copy: SiteCopy["projects"] };

export function Projects({ copy }: ProjectsProps) {
  return (
    <section className="projects section-block shell" id="projects" tabIndex={-1} aria-labelledby="projects-title">
      <div className="section-heading" data-reveal>
        <div><p className="eyebrow">{copy.eyebrow}</p><h2 id="projects-title">{copy.title}</h2></div>
        <p className="section-description">{copy.description}</p>
      </div>
      <div className="project-groups">
        {copy.groups.map((group) => (
          <section className="project-group" key={group.id} aria-labelledby={`projects-${group.id}-title`}>
            <div className="project-group__heading" data-reveal>
              <h3 id={`projects-${group.id}-title`}>{group.title}</h3>
              <p>{group.description}</p>
            </div>
            <div className="project-grid">
              {group.projects.map((project) => (
                <article className="project-card" key={project.id} id={project.id} tabIndex={-1}
                  aria-labelledby={`${project.id}-title`} data-reveal>
                  <div className="project-card__meta">
                    <span>{project.index} / {group.title}</span>
                    <span className="project-status">{copy.statusLabels[project.status]}</span>
                  </div>
                  <h4 id={`${project.id}-title`}><a href={`#${project.id}`}>{project.title}</a></h4>
                  <dl className="project-card__fields">
                    <div>
                      <dt>{project.kind === "research" ? copy.labels.question : copy.labels.objective}</dt>
                      <dd className="project-card__objective">{project.kind === "research" ? project.question : project.objective}</dd>
                    </div>
                    <div>
                      <dt>{project.kind === "research" ? copy.labels.methods : copy.labels.scope}</dt>
                      <dd>
                        <ul>{(project.kind === "research" ? project.methods : project.scope).map((item) => <li key={item}>{item}</li>)}</ul>
                        {project.kind === "research" && project.additionalBenchmarks ? <p className="project-card__note">{project.additionalBenchmarks}</p> : null}
                      </dd>
                    </div>
                    {project.kind === "development" ? (
                      <div><dt>{copy.labels.evaluation}</dt><dd><ul>{project.evaluation.map((item) => <li key={item}>{item}</li>)}</ul></dd></div>
                    ) : null}
                  </dl>
                  <div className="project-card__result">
                    <dl className="project-card__fields"><div><dt>{copy.labels.deliverable}</dt><dd>{project.deliverable}</dd></div></dl>
                    {project.kind === "research" ? (
                      <p className="project-card__scope"><span>{copy.labels.proposedScope}</span>
                        <span>{project.proposedScope.researchers} {copy.labels.researchers} <span aria-hidden="true">·</span> {copy.labels.approximately} {project.proposedScope.weeks[0]}–{project.proposedScope.weeks[1]} {copy.labels.weeks}</span>
                      </p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
