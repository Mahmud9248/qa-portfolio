import type { ReactNode } from 'react';
import { ArrowUpRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/site';
import { ActionLink } from './Action';
import { Reveal } from './Reveal';

interface PageCTAProps {
  eyebrow: string;
  title: ReactNode;
  copy: string;
  variant?: 'default' | 'compact';
}

export function PageCTA({ eyebrow, title, copy, variant = 'default' }: PageCTAProps) {
  return (
    <section className={`page-cta page-cta--${variant}`} aria-labelledby="page-cta-title">
      <div className="shell">
        <div className="page-cta__inner">
          <Reveal className="page-cta__main">
            <p className="eyebrow">
              <span className="eyebrow__mark" aria-hidden="true" />
              {eyebrow}
            </p>
            <h2 id="page-cta-title" className="display">{title}</h2>
            <p className="page-cta__copy">{copy}</p>
          </Reveal>
          <Reveal className="page-cta__actions" delay={0.08}>
            <ActionLink href={`mailto:${siteConfig.email}`} showArrow>
              Start a conversation
            </ActionLink>
            <ActionLink
              href={siteConfig.resumeUrl}
              download={siteConfig.resumeFileName}
              variant="secondary"
              icon={<Download size={15} strokeWidth={1.6} aria-hidden="true" />}
            >
              Download résumé
            </ActionLink>
            <Link to="/contact" className="page-cta__link">
              Contact details
              <ArrowUpRight size={14} strokeWidth={1.6} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
