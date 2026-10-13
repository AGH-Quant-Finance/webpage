import type { SiteCopy } from "../content";
import { navigationItems } from "../navigation";

type FooterProps = {
  copy: SiteCopy["footer"];
  isProjectsPage: boolean;
  navigation: SiteCopy["header"];
};

export function Footer({ copy, navigation, isProjectsPage }: FooterProps) {
  return (
    <footer className="footer shell">
      <div className="footer__brand"><img src="/brand/qfc-symbol.png" width="38" height="32" alt="" loading="lazy" /><strong>Quant Finance AGH</strong><p>{copy.description}</p></div>
      <div className="footer__links">
        <span>{copy.navigation}</span>
        {navigationItems(isProjectsPage).map((item) => (
          <a key={item.key} href={item.href} aria-current={isProjectsPage && item.key === "projects" ? "page" : undefined}>{navigation[item.key]}</a>
        ))}
      </div>
      <div className="footer__meta"><span>{copy.location}</span><span className="footer-status"><i aria-hidden="true" />{copy.status}</span></div>
    </footer>
  );
}
