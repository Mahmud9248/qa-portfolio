import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Pause, Play, RotateCcw, StepForward, TerminalSquare } from 'lucide-react';
import { executionQueue } from '../../data/execution';
import type { TestStatus } from '../../types';
import { SectionHeading } from '../ui/SectionHeading';
import { StatusPill } from '../ui/Status';
import { cx } from '../../lib/cx';
import { EASE_CINEMATIC } from '../../lib/motion';

const total = executionQueue.length;

export function ExecutionLab() {
  const [completed, setCompleted] = useState(0);
  const [running, setRunning] = useState(false);
  const reduce = useReducedMotion();
  const liveRef = useRef<HTMLParagraphElement>(null);

  const statuses: TestStatus[] = useMemo(
    () => executionQueue.map((test, index) => (index < completed ? test.status : 'Pending')),
    [completed],
  );

  const counts = useMemo(() => {
    return statuses.reduce(
      (accumulator, status) => {
        accumulator[status] += 1;
        return accumulator;
      },
      { Passed: 0, Failed: 0, Blocked: 0, Pending: 0 } as Record<TestStatus, number>,
    );
  }, [statuses]);

  const finished = completed >= total;

  useEffect(() => {
    if (!running) return;
    if (completed >= total) {
      setRunning(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setCompleted((value) => Math.min(value + 1, total));
    }, reduce ? 260 : 620);

    return () => window.clearTimeout(timer);
  }, [running, completed, reduce]);

  useEffect(() => {
    if (!liveRef.current) return;
    if (completed === 0) {
      liveRef.current.textContent = 'Execution reset. All ten sample tests are pending.';
      return;
    }
    const test = executionQueue[completed - 1];
    liveRef.current.textContent = `${test.id} ${test.name}: ${test.status}. ${test.note ?? ''}`;
  }, [completed]);

  function toggleRun() {
    if (running) {
      setRunning(false);
      return;
    }
    if (finished) setCompleted(0);
    setRunning(true);
  }

  function step() {
    if (running || finished) return;
    setCompleted((value) => Math.min(value + 1, total));
  }

  function reset() {
    setRunning(false);
    setCompleted(0);
  }

  const progress = (completed / total) * 100;
  const primaryLabel = running ? 'Pause' : finished ? 'Run again' : completed > 0 ? 'Resume' : 'Run suite';

  return (
    <section className="execution-section section" id="execution" aria-labelledby="execution-title">
      <div className="shell">
        <SectionHeading
          index="002"
          eyebrow="Execution lab"
          title={
            <>
              Make the evidence
              <br />
              <em>observable.</em>
            </>
          }
          id="execution-title"
          copy={
            <>
              <p>
                A sample test run moving through Pending, Passed, Failed and Blocked states. Run it, pause it or step
                one case at a time. The status is only useful when the evidence behind it is visible.
              </p>
              <p className="small-note">Illustrative local data — not a live integration or employer system.</p>
            </>
          }
        />

        <div className="execution-lab">
          <div className="execution-lab__bar">
            <div className="terminal-label">
              <TerminalSquare size={14} strokeWidth={1.5} aria-hidden="true" />
              <span>~/qa/execution-run</span>
              <span className="terminal-label__divider" aria-hidden="true">/</span>
              <span className="terminal-label__muted">sample.queue</span>
            </div>
            <div className="execution-lab__bar-meta">
              <span className={cx('live-tag', running && 'is-live')}>
                <i aria-hidden="true" />
                {running ? 'RUNNING' : finished ? 'COMPLETE' : 'LOCAL SIMULATION'}
              </span>
              <span className="mono-label">10 CASES</span>
            </div>
          </div>

          <div className="execution-lab__layout">
            <div className="execution-console">
              <div className="execution-console__header">
                <div>
                  <span className="mono-label">Suite</span>
                  <h3>Release confidence / sample set</h3>
                </div>
                <div className="execution-console__controls">
                  <button type="button" className="control-button control-button--primary" onClick={toggleRun}>
                    {running ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
                    {primaryLabel}
                  </button>
                  <button
                    type="button"
                    className="control-button control-button--icon"
                    onClick={step}
                    disabled={running || finished}
                    aria-label="Run one test case"
                    title="Step one test"
                  >
                    <StepForward size={16} strokeWidth={1.6} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="control-button control-button--icon"
                    onClick={reset}
                    disabled={completed === 0 && !running}
                    aria-label="Reset sample test run"
                    title="Reset"
                  >
                    <RotateCcw size={15} strokeWidth={1.6} aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="execution-progress">
                <div className="execution-progress__top">
                  <span className="mono-label">Execution progress</span>
                  <span className="execution-progress__value">
                    {String(completed).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </span>
                </div>
                <div
                  className="execution-progress__track"
                  role="progressbar"
                  aria-label="Sample test execution progress"
                  aria-valuemin={0}
                  aria-valuemax={total}
                  aria-valuenow={completed}
                  aria-valuetext={`${completed} of ${total} sample tests executed`}
                >
                  <motion.span
                    className="execution-progress__fill"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: reduce ? 0 : 0.48, ease: EASE_CINEMATIC }}
                  />
                </div>
              </div>

              <ol className="execution-list">
                {executionQueue.map((test, index) => {
                  const status = statuses[index];
                  return (
                    <li
                      key={test.id}
                      className={cx('execution-row', index === completed - 1 && 'is-latest', status !== 'Pending' && 'is-complete')}
                    >
                      <span className="execution-row__index" aria-hidden="true">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="execution-row__content">
                        <div className="execution-row__top">
                          <span className="execution-row__id">{test.id}</span>
                          <span className="execution-row__area">{test.area}</span>
                        </div>
                        <p>{test.name}</p>
                        {status !== 'Pending' && test.note ? (
                          <span className="execution-row__note">{test.note}</span>
                        ) : null}
                      </div>
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={status}
                          initial={reduce ? false : { opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reduce ? undefined : { opacity: 0, y: -5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <StatusPill status={status} />
                        </motion.div>
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ol>

              <p ref={liveRef} className="sr-only" aria-live="polite" aria-atomic="true" />
              <p className="execution-console__hint">
                <span aria-hidden="true">↳</span>
                {finished
                  ? 'Complete. Review failed and blocked paths before drawing a release conclusion.'
                  : 'Keyboard operable. No timers run until you start the sample suite.'}
              </p>
            </div>

            <aside className="execution-summary" aria-label="Sample execution summary">
              <div className="execution-summary__head">
                <span className="mono-label">Run summary</span>
                <span className="execution-summary__stamp">{finished ? 'FINAL' : 'LIVE'}</span>
              </div>

              <div className="execution-donut" aria-hidden="true">
                <svg viewBox="0 0 180 180">
                  <circle cx="90" cy="90" r="67" className="execution-donut__base" />
                  <circle
                    cx="90"
                    cy="90"
                    r="67"
                    className="execution-donut__passed"
                    strokeDasharray={`${(counts.Passed / total) * 421} 421`}
                    strokeDashoffset="0"
                  />
                  <circle
                    cx="90"
                    cy="90"
                    r="67"
                    className="execution-donut__failed"
                    strokeDasharray={`${(counts.Failed / total) * 421} 421`}
                    strokeDashoffset={-((counts.Passed / total) * 421)}
                  />
                  <circle
                    cx="90"
                    cy="90"
                    r="53"
                    className="execution-donut__inner"
                  />
                  <path d="M90 14v10M90 156v10M14 90h10M156 90h10" className="execution-donut__ticks" />
                </svg>
                <div className="execution-donut__center">
                  <span>{String(completed).padStart(2, '0')}</span>
                  <small>executed</small>
                </div>
              </div>

              <dl className="execution-summary__counts">
                <div>
                  <dt><span className="summary-mark summary-mark--passed" aria-hidden="true" />Passed</dt>
                  <dd>{String(counts.Passed).padStart(2, '0')}</dd>
                </div>
                <div>
                  <dt><span className="summary-mark summary-mark--failed" aria-hidden="true" />Failed</dt>
                  <dd>{String(counts.Failed).padStart(2, '0')}</dd>
                </div>
                <div>
                  <dt><span className="summary-mark summary-mark--blocked" aria-hidden="true" />Blocked</dt>
                  <dd>{String(counts.Blocked).padStart(2, '0')}</dd>
                </div>
                <div>
                  <dt><span className="summary-mark summary-mark--pending" aria-hidden="true" />Pending</dt>
                  <dd>{String(counts.Pending).padStart(2, '0')}</dd>
                </div>
              </dl>

              <div className="execution-summary__note">
                <span className="mono-label">Decision frame</span>
                <p>
                  Status counts describe execution, not release risk. A single failed invariant can outweigh a
                  majority of passes.
                </p>
              </div>

              <div className="execution-summary__footer">
                <span>Sample data / no external calls</span>
                <span className="execution-summary__signal" aria-hidden="true" />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
