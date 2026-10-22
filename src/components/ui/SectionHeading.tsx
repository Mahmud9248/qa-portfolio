import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cx } from '../../lib/cx';
import { Reveal, LineReveal } from './Reveal';

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: ReactNode;
  copy?: ReactNode;
  action?: { label: string; href: string };
  variant?: 'default' | 'wide' | 'compact';
  id?: string;
}

export function SectionHeading({ index, eyebrow, title, copy, action, variant = 'default', id }: SectionHeadingProps) {
  return (
    <header className={cx('section-head', `section-head--${variant}`)}>
      <Reveal className="section-head__meta">
        <p className="eyebrow">
          <span className="eyebrow__mark" aria-hidden="true" />
          {index} / {eyebrow}
        </p>
      </Reveal>
      <div className="section-head__main" id={id}>
        <LineReveal>
          <h2 className="section-title display">{title}</h2>
        </LineReveal>
      </div>
      {copy || action ? (
        <Reveal className="section-head__aside" delay={0.08}>
          {copy ? <div className="section-copy">{copy}</div> : null}
          {action ? (
            <Link to={action.href} className="text-link">
              {action.label}
              <ArrowUpRight size={15} strokeWidth={1.6} aria-hidden="true" />
            </Link>
          ) : null}
        </Reveal>
      ) : null}
    </header>
  );
}
