import { useRef, useState, type KeyboardEvent } from "react";
import type { Path, SiteCopy } from "../content";

type PathConsoleProps = { paths: Path[]; copy: SiteCopy["hero"] };

export function PathConsole({ paths, copy }: PathConsoleProps) {
  const [activeId, setActiveId] = useState<Path["id"]>("research");
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const activePath = paths.find((path) => path.id === activeId) ?? paths[0];
  if (!activePath) return null;

  const handleTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number;
    switch (event.key) {
      case "ArrowRight": next = (index + 1) % paths.length; break;
      case "ArrowLeft": next = (index - 1 + paths.length) % paths.length; break;
      case "Home": next = 0; break;
      case "End": next = paths.length - 1; break;
      default: return;
    }
    event.preventDefault();
    setActiveId(paths[next].id);
    tabsRef.current[next]?.focus();
  };

  return (
    <section className="path-console" aria-label={copy.consoleLabel}>
      <div className="path-console__header">{copy.consoleLabel}</div>
      <div className="path-tabs" role="tablist" aria-label={copy.targetPath}>
        {paths.map((path, index) => (
          <button key={path.id} id={`path-tab-${path.id}`} ref={(node) => { tabsRef.current[index] = node; }}
            className="path-tab pressable" type="button" role="tab" aria-selected={path.id === activeId}
            tabIndex={path.id === activeId ? 0 : -1} aria-controls={`path-panel-${path.id}`}
            onKeyDown={(event) => handleTabKey(event, index)} onClick={() => setActiveId(path.id)}>
            {path.label}
          </button>
        ))}
      </div>
      <div className="path-panels">
        {paths.map((path) => (
          <div className="path-panel" key={path.id} id={`path-panel-${path.id}`} role="tabpanel"
            tabIndex={path.id === activePath.id ? 0 : -1} aria-labelledby={`path-tab-${path.id}`}
            aria-hidden={path.id !== activePath.id} inert={path.id !== activePath.id}>
            <div className="path-panel__title"><h2>{path.title}</h2><span className="path-code">{path.code}</span></div>
            <p className="path-description">{path.description}</p>
            <p className="code-label">{copy.skillsLabel}</p>
            <ul className="skill-list">{path.skills.map((skill) => <li key={skill.name}>{skill.name}</li>)}</ul>
            <div className="path-output"><span>{copy.semesterOutput}</span><strong>{path.output}</strong></div>
          </div>
        ))}
      </div>
    </section>
  );
}
