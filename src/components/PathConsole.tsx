import { useEffect, useState, type CSSProperties } from "react";
import type { Path, SiteCopy } from "../content";

type PathConsoleProps = {
  paths: Path[];
  copy: SiteCopy["hero"];
};

type SkillStyle = CSSProperties & { "--skill-scale": number };

export function PathConsole({ paths, copy }: PathConsoleProps) {
  const [activeId, setActiveId] = useState<Path["id"]>("research");
  const [barsVisible, setBarsVisible] = useState(false);
  const activePath = paths.find((path) => path.id === activeId) ?? paths[0];

  useEffect(() => {
    const timeout = window.setTimeout(() => setBarsVisible(true), 90);
    return () => window.clearTimeout(timeout);
  }, [activeId]);

  if (!activePath) return null;

  return (
    <section className="path-console" aria-label={copy.consoleLabel}>
      <div className="path-console__header">
        <span>{copy.consoleLabel}</span>
        <span className="console-live"><i aria-hidden="true" />{copy.interactive}</span>
      </div>
      <div className="path-tabs" role="tablist" aria-label={copy.targetPath}>
        {paths.map((path) => (
          <button
            key={path.id}
            id={`path-tab-${path.id}`}
            className="path-tab pressable"
            type="button"
            role="tab"
            aria-selected={path.id === activeId}
            aria-controls="path-panel"
            onClick={() => {
              if (path.id === activeId) return;
              setBarsVisible(false);
              setActiveId(path.id);
            }}
          >
            {path.label}
          </button>
        ))}
      </div>

      <div
        className="path-panel"
        data-bars-visible={barsVisible ? "" : undefined}
        id="path-panel"
        role="tabpanel"
        aria-labelledby={`path-tab-${activePath.id}`}
      >
        <div className="path-panel__title">
          <div><span className="code-label">{copy.targetPath}</span><h2>{activePath.title}</h2></div>
          <span className="path-code">{activePath.code}</span>
        </div>

        <div className="skill-list">
          {activePath.skills.map((skill) => (
            <div className="skill" key={skill.name}>
              <span>{skill.name}</span>
              <span className="skill__track" aria-hidden="true">
                <i style={{ "--skill-scale": skill.strength / 100 } as SkillStyle} />
              </span>
              <span>{skill.level}</span>
            </div>
          ))}
        </div>

        <p className="path-description">{activePath.description}</p>
        <div className="path-output">
          <span>{copy.semesterOutput}</span>
          <strong>{activePath.output}</strong>
        </div>
      </div>
    </section>
  );
}
