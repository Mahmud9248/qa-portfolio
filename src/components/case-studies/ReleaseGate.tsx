import { useId, useMemo, useState } from 'react';
import { Check, Minus, RotateCcw, ShieldAlert, X } from 'lucide-react';
import { cx } from '../../lib/cx';

type GateStatus = 'Passed' | 'Failed' | 'Blocked';

interface GateCriterion {
  id: string;
  label: string;
  detail: string;
  critical: boolean;
  initial: GateStatus;
}

const criteria: GateCriterion[] = [
  {
    id: 'capacity',
    label: 'Capacity enforcement',
    detail: 'Tenth seat accepted; eleventh rejected server-side.',
    critical: true,
    initial: 'Passed',
  },
  {
    id: 'owner',
    label: 'Last-Owner invariant',
    detail: 'Sole Owner remains protected on every interface.',
    critical: true,
    initial: 'Failed',
  },
  {
    id: 'permissions',
    label: 'Next-request permissions',
    detail: 'A demoted role loses restricted access immediately.',
    critical: true,
    initial: 'Passed',
  },
  {
    id: 'audit',
    label: 'Audit completeness',
    detail: 'Successful mutations produce matching actor and target events.',
    critical: false,
    initial: 'Passed',
  },
  {
    id: 'expiry',
    label: 'Invitation expiry',
    detail: 'A pending invitation releases its seat after 72 hours.',
    critical: false,
    initial: 'Blocked',
  },
];

const states: GateStatus[] = ['Passed', 'Failed', 'Blocked'];
const icons = { Passed: Check, Failed: X, Blocked: Minus } satisfies Record<GateStatus, typeof Check>;

function initialStatuses(): Record<string, GateStatus> {
  return Object.fromEntries(criteria.map((criterion) => [criterion.id, criterion.initial]));
}

export function ReleaseGate() {
  const [statuses, setStatuses] = useState<Record<string, GateStatus>>(initialStatuses);
  const id = useId();

  const decision = useMemo(() => {
    const failedCritical = criteria.filter((criterion) => criterion.critical && statuses[criterion.id] === 'Failed');
    const failed = criteria.filter((criterion) => statuses[criterion.id] === 'Failed');
    const blocked = criteria.filter((criterion) => statuses[criterion.id] === 'Blocked');

    if (failedCritical.length) {
      return {
        result: 'HOLD' as const,
        label: 'Critical failure open',
        reason: `${failedCritical.map((item) => item.label).join(', ')} must be resolved and verified before release.`,
      };
    }
    if (blocked.length) {
      return {
        result: 'HOLD' as const,
        label: 'Evidence incomplete',
        reason: `${blocked.map((item) => item.label).join(', ')} cannot be signed off until the missing evidence is available.`,
      };
    }
    if (failed.length) {
      return {
        result: 'CONDITIONAL' as const,
        label: 'Non-critical failure',
        reason: `${failed.map((item) => item.label).join(', ')} needs a documented mitigation and product decision.`,
      };
    }
    return {
      result: 'GO' as const,
      label: 'All required evidence present',
      reason: 'Capacity, ownership and permission gates pass in this sample. Release recommendation is clear.',
    };
  }, [statuses]);

  const passed = Object.values(statuses).filter((status) => status === 'Passed').length;

  function setStatus(criterionId: string, status: GateStatus) {
    setStatuses((current) => ({ ...current, [criterionId]: status }));
  }

  return (
    <div className="release-gate">
      <div className="interactive-head">
        <div>
          <span className="mono-label">Interactive demonstration</span>
          <h3>Release gate / membership changes</h3>
        </div>
        <button type="button" className="mini-button" onClick={() => setStatuses(initialStatuses())}>
          <RotateCcw size={13} strokeWidth={1.6} aria-hidden="true" />
          Restore sample
        </button>
      </div>
      <p className="interactive-note">
        Change each gate to test the release logic. A critical failure or blocked evidence prevents a GO, regardless
        of how many checks pass.
      </p>

      <div className="release-gate__layout">
        <div className="release-gate__criteria">
          {criteria.map((criterion, index) => {
            const status = statuses[criterion.id];
            return (
              <div className="gate-criterion" key={criterion.id}>
                <div className="gate-criterion__index">{String(index + 1).padStart(2, '0')}</div>
                <div className="gate-criterion__copy">
                  <div className="gate-criterion__title">
                    <h4>{criterion.label}</h4>
                    {criterion.critical ? <span className="gate-critical">Critical</span> : <span className="gate-required">Required</span>}
                  </div>
                  <p>{criterion.detail}</p>
                </div>
                <div className="gate-criterion__controls" role="group" aria-label={`${criterion.label} gate status`}>
                  {states.map((state) => {
                    const Icon = icons[state];
                    return (
                      <button
                        type="button"
                        key={state}
                        className={cx('gate-state-button', `gate-state-button--${state.toLowerCase()}`, status === state && 'is-active')}
                        aria-pressed={status === state}
                        onClick={() => setStatus(criterion.id, state)}
                        aria-label={`Set ${criterion.label} to ${state}`}
                      >
                        <Icon size={12} strokeWidth={2} aria-hidden="true" />
                        <span>{state}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <aside className={cx('gate-verdict', `gate-verdict--${decision.result.toLowerCase()}`)} aria-live="polite">
          <div className="gate-verdict__top">
            <span className="mono-label">Release recommendation</span>
            <ShieldAlert size={17} strokeWidth={1.4} aria-hidden="true" />
          </div>
          <div className="gate-verdict__result">{decision.result}</div>
          <div className="gate-verdict__label">{decision.label}</div>
          <p>{decision.reason}</p>

          <dl className="gate-verdict__counts">
            <div>
              <dt>Checks passed</dt>
              <dd>{passed} / {criteria.length}</dd>
            </div>
            <div>
              <dt>Critical failures</dt>
              <dd>{String(Object.entries(statuses).filter(([key, value]) => value === 'Failed' && criteria.find((criterion) => criterion.id === key)?.critical).length).padStart(2, '0')}</dd>
            </div>
            <div>
              <dt>Blocked evidence</dt>
              <dd>{String(Object.values(statuses).filter((status) => status === 'Blocked').length).padStart(2, '0')}</dd>
            </div>
          </dl>

          <div className="gate-verdict__rule" aria-hidden="true">
            <span style={{ width: `${(passed / criteria.length) * 100}%` }} />
          </div>
          <p className="gate-verdict__footnote" id={`${id}-note`}>
            Sample decision logic only. The real recommendation also depends on severity, product context and documented
            residual risk.
          </p>
        </aside>
      </div>
    </div>
  );
}
