import type { SiteCopy } from "../content";

type FooterProps = {
  copy: SiteCopy["footer"];
  navigation: SiteCopy["header"];
};

export function Footer({ copy, navigation }: FooterProps) {
  return (
    <footer className="footer shell">
      <div className="footer__brand"><img src="/brand/qfc-symbol.png" width="38" height="32" alt="" loading="lazy" /><strong>Quant Finance AGH</strong><p>{copy.description}</p></div>
      <div className="footer__links">
        <span>{copy.navigation}</span>
        <a href="#paths">{navigation.paths}</a>
        <a href="#approach">{navigation.approach}</a>
        <a href="#community">{navigation.community}</a>
        <a href="#recruitment">{navigation.recruitment}</a>
      </div>
      <div className="footer__meta"><span>{copy.location}</span><span className="footer-status"><i aria-hidden="true" />{copy.status}</span></div>
    </footer>
  );
}
