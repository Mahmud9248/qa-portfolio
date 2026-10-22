import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { cx } from '../../lib/cx';
import { Reveal } from './Reveal';

interface PageHeroProps {
  index: string;
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  aside?: ReactNode;
  backLink?: { to: string; label: string };
  className?: string;
}

export function PageHero({ index, eyebrow, title, intro, aside, backLink, className }: PageHeroProps) {
  return (
    <header className={cx('page-hero', className)}>
      <div className="page-hero__ambient" aria-hidden="true" />
      <div className="shell page-hero__inner">
        <div className="page-hero__meta">
          {backLink ? (
            <Link to={backLink.to} className="back-link">
              <ArrowLeft size={14} strokeWidth={1.6} aria-hidden="true" />
              {backLink.label}
            </Link>
          ) : (
            <p className="eyebrow">
              <span className="eyebrow__mark" aria-hidden="true" />
              {index} / {eyebrow}
            </p>
          )}
          {backLink ? (
            <p className="eyebrow page-hero__category">
              <span className="eyebrow__mark" aria-hidden="true" />
              {index} / {eyebrow}
            </p>
          ) : null}
        </div>
        <div className="page-hero__layout">
          <div className="page-hero__main">
            <Reveal>
              <h1 className="page-title display">{title}</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="page-hero__intro">{intro}</div>
            </Reveal>
          </div>
          {aside ? (
            <Reveal className="page-hero__aside" delay={0.18}>
              {aside}
            </Reveal>
          ) : null}
        </div>
      </div>
    </header>
  );
}
