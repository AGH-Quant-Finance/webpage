import { useEffect, useState } from "react";
import type { Language, SiteCopy } from "../content";

type HeaderProps = {
  copy: SiteCopy["header"];
  language: Language;
  languageLabel: string;
  onToggleLanguage: () => void;
};

const navigationItems = [
  { href: "#paths", key: "paths" },
  { href: "#projects", key: "projects" },
  { href: "#community", key: "community" },
  { href: "#recruitment", key: "recruitment" },
] as const;

export function Header({ copy, language, languageLabel, onToggleLanguage }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="site-header__material">
        <a className="brand pressable" href="#top" aria-label="AGH Quant Finance">
          <span className="brand__glyph" aria-hidden="true">⌁</span>
          <strong>AGH_QF</strong>
          <span className="brand__descriptor">/ RESEARCH_CIRCLE</span>
        </a>

        <nav className="desktop-navigation" aria-label={copy.navigationLabel}>
          {navigationItems.map((item, index) => (
            <a key={item.key} href={item.href}>
              <span aria-hidden="true">0{index + 1}_</span>{copy[item.key]}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="language-button pressable"
            type="button"
            aria-label={languageLabel}
            onClick={onToggleLanguage}
          >
            {language === "pl" ? "EN" : "PL"}
          </button>
          <span className="header-status"><i aria-hidden="true" />{copy.status}</span>
          <button
            className="menu-button pressable"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? copy.closeMenu : copy.openMenu}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span /><span />
          </button>
        </div>
      </div>

      <button
        className="mobile-menu-scrim"
        type="button"
        aria-label={copy.closeMenu}
        tabIndex={menuOpen ? 0 : -1}
        data-open={menuOpen ? "" : undefined}
        onClick={closeMenu}
      />
      <nav
        className="mobile-menu"
        id="mobile-menu"
        aria-label={copy.navigationLabel}
        aria-hidden={!menuOpen}
        data-open={menuOpen ? "" : undefined}
      >
        {navigationItems.map((item, index) => (
          <a
            key={item.key}
            href={item.href}
            tabIndex={menuOpen ? 0 : -1}
            onClick={closeMenu}
          >
            <span>0{index + 1}</span>{copy[item.key]}<b aria-hidden="true">↘</b>
          </a>
        ))}
      </nav>
    </header>
  );
}
