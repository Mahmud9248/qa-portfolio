import type { PointerEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { CaseStudy } from '../../types';
import { Reveal } from '../ui/Reveal';
import { cx } from '../../lib/cx';

function FinancialMotif() {
  return (
    <div className="case-motif case-motif--financial" aria-hidden="true">
      <div className="case-motif__top">
        <span>RULE / FIN-01</span>
        <span>BVA</span>
      </div>
      <div className="case-motif__condition">
        <span>AVERAGE DAILY BALANCE</span>
        <strong>≥ 1,500.00</strong>
      </div>
      <div className="case-motif__scale">
        <span>1,499.99</span>
        <i />
        <span className="is-boundary">1,500.00</span>
        <i />
        <span>1,500.01</span>
      </div>
      <div className="case-motif__verdict">
        <span className="case-motif__verdict-mark">✓</span>
        <span>FEE WAIVED</span>
        <span className="case-motif__verdict-line" />
        <span>01</span>
      </div>
    </div>
  );
}

function SaasMotif() {
  return (
    <div className="case-motif case-motif--saas" aria-hidden="true">
      <div className="case-motif__top">
        <span>ROLE MATRIX</span>
        <span>CAP / 10</span>
      </div>
      <div className="case-motif__roles">
        {['O', 'A', 'M', 'V'].map((role, index) => (
          <span key={role} className={cx('case-motif__role', index === 0 && 'is-owner')}>
            {role}
          </span>
        ))}
      </div>
      <div className="case-motif__gate">
        <span className="case-motif__gate-node">LAST OWNER</span>
        <span className="case-motif__gate-line" />
        <span className="case-motif__gate-result">BLOCKED</span>
      </div>
      <div className="case-motif__progress">
        <span style={{ width: '100%' }} />
      </div>
      <div className="case-motif__scale-labels">
        <span>9 SEATS</span>
        <span>10 / CAP</span>
      </div>
    </div>
  );
}

function ApiMotif() {
  return (
    <div className="case-motif case-motif--api" aria-hidden="true">
      <div className="case-motif__top">
        <span>POST /v1/change-plan</span>
        <span>JSON</span>
      </div>
      <div className="case-motif__terminal">
        <p><span>01</span> Authorization: Bearer ⟨owner⟩</p>
        <p><span>02</span> Idempotency-Key: idem_demo_91</p>
        <p><span>03</span> planId: plan_scale</p>
        <p className="is-response"><span>→</span> 200 OK / corr_demo_7c91</p>
      </div>
      <div className="case-motif__db">
        <span>RESPONSE</span>
        <i />
        <span>INVOICE</span>
        <i />
        <span>AUDIT</span>
      </div>
      <div className="case-motif__stamp">VERIFY THE DATA</div>
    </div>
  );
}

function Motif({ slug }: { slug: CaseStudy['slug'] }) {
  if (slug === 'financial-validation') return <FinancialMotif />;
  if (slug === 'saas-regression-testing') return <SaasMotif />;
  return <ApiMotif />;
}

export function CaseStudyRow({ study, compact = false }: { study: CaseStudy; compact?: boolean }) {
  function handlePointerMove(event: PointerEvent<HTMLAnchorElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--pointer-x', `${((event.clientX - rect.left) / rect.width) * 100}%`);
    event.currentTarget.style.setProperty('--pointer-y', `${((event.clientY - rect.top) / rect.height) * 100}%`);
  }

  return (
    <Reveal className={cx('case-row-wrap', compact && 'case-row-wrap--compact')}>
      <Link
        to={`/case-studies/${study.slug}`}
        className="case-row"
        onPointerMove={handlePointerMove}
        aria-label={`Read case study ${study.number}: ${study.shortTitle}. Portfolio demonstration.`}
      >
        <div className="case-row__head">
          <span className="case-row__number">{study.number}</span>
          <span className="case-row__domain">{study.domain}</span>
          <span className="case-row__demo">Demo</span>
        </div>
        <div className="case-row__copy">
          <h3>{study.shortTitle}</h3>
          <p>{study.intro}</p>
          <ul className="tag-list" aria-label="Case study techniques">
            {study.tags.slice(0, compact ? 2 : 3).map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
        <div className="case-row__motif-wrap">
          <Motif slug={study.slug} />
        </div>
        <div className="case-row__action">
          <span>{compact ? 'Inspect' : 'Open dossier'}</span>
          <span className="case-row__action-icon">
            <ArrowUpRight size={18} strokeWidth={1.4} aria-hidden="true" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

