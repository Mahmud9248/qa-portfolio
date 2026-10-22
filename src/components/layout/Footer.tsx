import { ArrowUp, Download, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'motion/react';
import { navigation, siteConfig } from '../../data/site';
import { BrandMark } from './Brand';
import { LinkedInMark } from '../ui/BrandIcons';

export function Footer() {
  const reduce = useReducedMotion();
  const year = new Date().getFullYear();

  function backToTop() {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  }

  return (
    <footer className="site-footer">
      <div className="site-footer__signal" aria-hidden="true">
        <span />
        <span>END OF TRANSMISSION / QUALITY VERIFIED</span>
        <span />
      </div>
      <div className="shell">
        <div className="site-footer__main">
          <div className="site-footer__identity">
            <div className="site-footer__mark-row">
              <BrandMark className="site-footer__mark" />
              <span className="mono-label">AAM /{year}</span>
            </div>
            <p className="site-footer__statement">
              Quality isn’t an assumption.
              <br />
              <em>It’s tested.</em>
            </p>
          </div>

          <div className="site-footer__links">
            <div>
              <p className="mono-label">Index</p>
              <nav className="site-footer__nav" aria-label="Footer navigation">
                {navigation.map((item) => (
                  <Link key={item.href} to={item.href}>
                    <span>{item.index}</span>
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <p className="mono-label">Channels</p>
              <div className="site-footer__nav">
                <a href={`mailto:${siteConfig.email}`}>
                  <Mail size={14} strokeWidth={1.5} aria-hidden="true" />
                  Email
                </a>
                <a href={siteConfig.linkedin} target="_blank" rel="noreferrer noopener">
                  <LinkedInMark />
                  LinkedIn
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <a href={siteConfig.resumeUrl} download={siteConfig.resumeFileName}>
                  <Download size={14} strokeWidth={1.5} aria-hidden="true" />
                  Résumé
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© {year} Abdullah Al Mahmud. Manual QA Engineer · {siteConfig.location}.</p>
          <p className="site-footer__demo">Portfolio demonstrations use fictional systems and data.</p>
          <button type="button" className="back-to-top" onClick={backToTop}>
            Back to top
            <ArrowUp size={14} strokeWidth={1.6} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
