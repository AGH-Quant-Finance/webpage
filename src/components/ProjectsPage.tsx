import { useEffect } from "react";
import type { Language } from "../content";
import { useReveal } from "../hooks/useReveal";
import { projectProposals } from "../projectProposals";
import { projectPublications, projectsCopy, publicProjectUrl } from "../projects";

export default function ProjectsPage({ language }: { language: Language }) {
  const copy = projectsCopy[language];
  useReveal();

  useEffect(() => {
    document.title = `${copy.eyebrow} — Quant Finance AGH`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", copy.description);
  }, [copy]);

  return (
    <div className="projects-page shell">
      <header className="projects-introduction" data-reveal>
        <div><p className="eyebrow">{copy.eyebrow}</p><h1>{copy.title}</h1></div>
        <div className="projects-introduction__copy"><p>{copy.description}</p><p className="projects-formation-note">{copy.formationNote}</p></div>
      </header>
      {projectProposals[language].groups.map((group) => (
        <section className="project-group" key={group.id} aria-labelledby={`${group.id}-title`} data-reveal>
          <h2 id={`${group.id}-title`}>{group.title}</h2>
          <ol className="project-list" role="list" start={Number(group.projects[0].index)}>
            {group.projects.map((proposal) => {
              const summary = copy.summaries[proposal.id];
              const publication = projectPublications[proposal.id];
              const links = (["repository", "documentation", "publication"] as const).flatMap((kind) => {
                const url = publicProjectUrl(publication[kind]);
                return url ? [{ kind, url }] : [];
              });
              return (
                <li className="project-entry" key={proposal.id}>
                  <div className="project-entry__heading">
                    <h3><span className="project-index" aria-hidden="true">{proposal.index} — </span>{summary.title}</h3>
                    <span className="project-status">{copy.statusLabels[publication.status]}</span>
                  </div>
                  <div className="project-entry__copy">
                    <p>{summary.description}</p>
                    {links.length > 0 && <ul className="project-links" role="list">
                      {links.map(({ kind, url }) => <li key={kind}><a href={url} target="_blank" rel="noopener noreferrer">{copy.linkLabels[kind]}<span aria-hidden="true"> ↗</span></a></li>)}
                    </ul>}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}
