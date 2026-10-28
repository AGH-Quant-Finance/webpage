import { useEffect, useRef, useState } from "react";
import type { SiteCopy } from "../content";
import { navigationItems, applicationUrl } from "../navigation";

type HeaderProps = {
  copy: SiteCopy["header"];
  isProjectsPage: boolean;
};

export function Header({ copy, isProjectsPage }: HeaderProps) {
  const items = navigationItems(isProjectsPage);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const handleFocus = (event: FocusEvent) => {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target)
        && !menuButtonRef.current?.contains(event.target)) setMenuOpen(false);
    };
    const breakpoint = window.matchMedia("(min-width: 1101px)");
    const closeOnDesktop = () => { if (breakpoint.matches) setMenuOpen(false); };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", handleFocus);
    breakpoint.addEventListener("change", closeOnDesktop);
    const focusFrame = requestAnimationFrame(() => menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus());
    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleFocus);
      breakpoint.removeEventListener("change", closeOnDesktop);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="site-header__material">
        <a className="brand pressable" href={isProjectsPage ? "/#top" : "#top"} aria-label="Quant Finance AGH" onClick={closeMenu}>
          <img className="brand__symbol" src="/brand/qfc-symbol.png" width="48" height="41" alt="" fetchPriority="high" />
          <strong>Quant Finance <span>AGH</span></strong>
        </a>
        <nav className="desktop-navigation" aria-label={copy.navigationLabel}>
          {items.map((item) => <a key={item.key} href={item.href} aria-current={isProjectsPage && item.key === "projects" ? "page" : undefined}>{copy[item.key]}</a>)}
        </nav>
        <div className="header-actions">
          <a className="header-join pressable" href={applicationUrl} target="_blank" rel="noopener noreferrer">{copy.joinAction}<span aria-hidden="true">↗</span></a>
          <button className="menu-button pressable" type="button" ref={menuButtonRef} aria-expanded={menuOpen}
            aria-controls="mobile-menu" aria-label={menuOpen ? copy.closeMenu : copy.openMenu} onClick={() => setMenuOpen((open) => !open)}>
            <span /><span />
          </button>
        </div>
      </div>
      <div className="mobile-menu-scrim" aria-hidden="true" data-open={menuOpen ? "" : undefined} onClick={closeMenu} />
      <nav className="mobile-menu" id="mobile-menu" ref={menuRef} aria-label={copy.navigationLabel}
        inert={!menuOpen} aria-hidden={!menuOpen} data-open={menuOpen ? "" : undefined}>
        {items.map((item) => (
          <a key={item.key} href={item.href} aria-current={isProjectsPage && item.key === "projects" ? "page" : undefined} onClick={closeMenu}>{copy[item.key]}<span aria-hidden="true">↗</span></a>
        ))}
        <a className="mobile-menu__join" href={applicationUrl} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>{copy.joinAction}<span aria-hidden="true">↗</span></a>
      </nav>
    </header>
  );
}
