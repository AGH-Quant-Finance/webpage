import { useEffect, useState } from "react";
import { Community } from "./components/Community";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ResearchDevelopment } from "./components/ResearchDevelopment";
import { Recruitment } from "./components/Recruitment";
import { ResearchCycle } from "./components/ResearchCycle";
import { siteCopy, type Language } from "./content";
import { useReveal } from "./hooks/useReveal";

const PREFERENCES_KEY = "agh-qf:preferences:v1";

function readInitialLanguage(): Language {
  try {
    const preferences = JSON.parse(localStorage.getItem(PREFERENCES_KEY) ?? "null") as { language?: unknown } | null;
    return preferences?.language === "pl" ? "pl" : "en";
  } catch {
    return "en";
  }
}

export default function App() {
  const [language, setLanguage] = useState<Language>(readInitialLanguage);
  const copy = siteCopy[language];
  useReveal();

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify({ language }));
    } catch {
      // Keep language switching usable when browser storage is unavailable.
    }
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
        <ResearchDevelopment copy={copy.disciplines} />
        <ResearchCycle copy={copy.cycle} />
        <Community copy={copy.community} />
        <Recruitment copy={copy.recruitment} />
      </main>
      <Footer copy={copy.footer} navigation={copy.header} />
    </div>
  );
}
