import { lazy, Suspense, useEffect } from "react";
import { Community } from "./components/Community";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ResearchDevelopment } from "./components/ResearchDevelopment";
import { ResearchCycle } from "./components/ResearchCycle";
import { siteCopy as copy } from "./content";
import { useReveal } from "./hooks/useReveal";

const ProjectsPage = lazy(() => import("./components/ProjectsPage"));
const isProjectsPage = /^\/projects\/?$/.test(window.location.pathname);

export default function App() {
  useReveal();

  useEffect(() => {
    // React mounts after a native cross-page link; resolve its fragment now.
    if (isProjectsPage || !window.location.hash) return;
    let id: string;
    try {
      id = decodeURIComponent(window.location.hash.slice(1));
    } catch {
      return;
    }
    const target = document.getElementById(id);
    target?.focus({ preventScroll: true });
    target?.scrollIntoView({ behavior: "instant" });
  }, []);

  return (
    <div className="site-frame">
      <a className="skip-link" href="#main-content">{copy.hero.skipLink}</a>
      <Header copy={copy.header} isProjectsPage={isProjectsPage} />
      <main id="main-content" tabIndex={-1}>
        {isProjectsPage ? (
          <Suspense fallback={<p className="projects-loading shell" role="status">Loading projects…</p>}>
            <ProjectsPage />
          </Suspense>
        ) : (
          <>
            <Hero copy={copy} />
            <ResearchDevelopment copy={copy.disciplines} />
            <ResearchCycle copy={copy.cycle} />
            <Community copy={copy.community} />
          </>
        )}
      </main>
      <Footer isProjectsPage={isProjectsPage} copy={copy.footer} navigation={copy.header} />
    </div>
  );
}
