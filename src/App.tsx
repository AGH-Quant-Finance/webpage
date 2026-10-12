import { useEffect, useState } from "react";
import { Community } from "./components/Community";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Principle } from "./components/Principle";
import { Projects } from "./components/Projects";
import { Recruitment } from "./components/Recruitment";
import { ResearchCycle } from "./components/ResearchCycle";
import { siteCopy, type Language } from "./content";
import { useReveal } from "./hooks/useReveal";

const PREFERENCES_KEY = "agh-qf:preferences:v1";

function readInitialLanguage(): Language {
  try {
    const preferences = JSON.parse(localStorage.getItem(PREFERENCES_KEY) ?? "null") as { language?: unknown } | null;
    return preferences?.language === "en" ? "en" : "pl";
  } catch {
    return "pl";
  }
}

export default function App() {
  const [language, setLanguage] = useState<Language>(readInitialLanguage);
  const copy = siteCopy[language];
  useReveal();

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify({ language }));
  }, [language]);

  return (
    <div className="site-frame">
      <a className="skip-link" href="#main-content">{copy.hero.skipLink}</a>
      <Header
        copy={copy.header}
        language={language}
        languageLabel={copy.languageLabel}
        onToggleLanguage={() => setLanguage((current) => current === "pl" ? "en" : "pl")}
      />
      <main id="main-content" tabIndex={-1}>
        <Hero copy={copy} />
        <Principle copy={copy.principle} />
        <Projects copy={copy.projects} />
        <ResearchCycle copy={copy.cycle} />
        <Community copy={copy.community} />
        <Recruitment copy={copy.recruitment} />
      </main>
      <Footer copy={copy.footer} navigation={copy.header} />
    </div>
  );
}
