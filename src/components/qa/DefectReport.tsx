import { AlertTriangle, ArrowRight, CheckCircle2, Info, ShieldAlert } from 'lucide-react';
import type { Defect, TestCase } from '../../types';
import { StatusPill } from '../ui/Status';
import { cx } from '../../lib/cx';

export function DefectReport({ defect }: { defect: Defect }) {
  return (
    <article className="defect-report" aria-labelledby={`defect-${defect.id}`}>
      <header className="defect-report__head">
        <div>
          <span className="mono-label">Illustrative defect / {defect.id}</span>
          <h3 id={`defect-${defect.id}`}>{defect.title}</h3>
        </div>
        <div className="defect-report__badges">
          <span className={cx('severity-badge', `severity-badge--${defect.severity.toLowerCase()}`)}>
            <ShieldAlert size={13} strokeWidth={1.7} aria-hidden="true" />
            Sev / {defect.severity}
          </span>
          <span className="priority-badge">Priority / {defect.priority}</span>
          <span className="defect-status">{defect.status}</span>
        </div>
      </header>

      <div className="defect-report__fields">
        <div>
          <span className="mono-label">Environment</span>
          <p>{defect.environment}</p>
        </div>
        <div>
          <span className="mono-label">Preconditions</span>
          <p>{defect.preconditions}</p>
        </div>
      </div>

      <div className="defect-report__steps">
        <h4>Reproduction steps</h4>
        <ol>
          {defect.steps.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="defect-report__comparison">
        <div className="defect-report__expected">
          <span className="mono-label"><CheckCircle2 size={13} strokeWidth={1.6} aria-hidden="true" /> Expected</span>
          <p>{defect.expected}</p>
        </div>
        <ArrowRight size={16} strokeWidth={1.4} className="defect-report__arrow" aria-hidden="true" />
        <div className="defect-report__actual">
          <span className="mono-label"><AlertTriangle size={13} strokeWidth={1.6} aria-hidden="true" /> Actual</span>
          <p>{defect.actual}</p>
        </div>
      </div>

      <div className="defect-report__evidence">
        <h4>Supporting evidence</h4>
        <ul>
          {defect.evidence.map((item) => (
            <li key={item}>
              <span aria-hidden="true">↳</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {defect.note ? (
        <p className="defect-report__note">
          <Info size={14} strokeWidth={1.6} aria-hidden="true" />
          {defect.note}
        </p>
      ) : null}
    </article>
  );
}

export function ExecutionSummary({ tests, note }: { tests: TestCase[]; note?: string }) {
  const counts = tests.reduce(
    (accumulator, test) => {
      accumulator[test.status] += 1;
      return accumulator;
    },
    { Passed: 0, Failed: 0, Blocked: 0, Pending: 0 } as Record<TestCase['status'], number>,
  );
  const total = tests.length;
  const percentages = {
    Passed: (counts.Passed / total) * 100,
    Failed: (counts.Failed / total) * 100,
    Blocked: (counts.Blocked / total) * 100,
    Pending: (counts.Pending / total) * 100,
  };

  return (
    <div className="execution-summary-inline">
      <div className="execution-summary-inline__top">
        <div>
          <span className="mono-label">Sample execution state</span>
          <p>{counts.Passed} of {total} cases recorded as passed</p>
        </div>
        <div className="execution-summary-inline__pills">
          {(['Passed', 'Failed', 'Blocked', 'Pending'] as const).map((status) => (
            <div key={status}>
              <StatusPill status={status} />
              <strong>{String(counts[status]).padStart(2, '0')}</strong>
            </div>
          ))}
        </div>
      </div>
      <div className="execution-summary-inline__bar" aria-hidden="true">
        <span className="is-passed" style={{ width: `${percentages.Passed}%` }} />
        <span className="is-failed" style={{ width: `${percentages.Failed}%` }} />
        <span className="is-blocked" style={{ width: `${percentages.Blocked}%` }} />
        <span className="is-pending" style={{ width: `${percentages.Pending}%` }} />
      </div>
      {note ? <p className="small-note">{note}</p> : null}
    </div>
  );
}
