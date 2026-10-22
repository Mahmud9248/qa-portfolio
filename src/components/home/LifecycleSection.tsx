import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, CornerDownRight } from 'lucide-react';
import { lifecyclePhases } from '../../data/lifecycle';
import { SectionHeading } from '../ui/SectionHeading';
import { EASE_CINEMATIC } from '../../lib/motion';
import { cx } from '../../lib/cx';

export function LifecycleSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduce = useReducedMotion();
  const active = lifecyclePhases[activeIndex];
  const progress = (activeIndex / (lifecyclePhases.length - 1)) * 100;

  function select(index: number, focus = false) {
    const next = (index + lifecyclePhases.length) % lifecyclePhases.length;
    setActiveIndex(next);
    if (focus) {
      window.requestAnimationFrame(() => tabRefs.current[next]?.focus());
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        select(activeIndex + 1, true);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        select(activeIndex - 1, true);
        break;
      case 'Home':
        event.preventDefault();
        select(0, true);
        break;
      case 'End':
        event.preventDefault();
        select(lifecyclePhases.length - 1, true);
        break;
      default:
        break;
    }
  }

  return (
    <section className="lifecycle-section section" id="workflow" aria-labelledby="workflow-title">
      <div className="shell">
        <SectionHeading
          index="003"
          eyebrow="Working method"
          title={
            <>
              One line from
              <br />
              requirement to <em>release.</em>
            </>
          }
          id="workflow-title"
          copy={
            <p>
              Quality work is not a final gate. It is a sequence of decisions: frame the requirement, design the proof,
              prepare the data, execute with intent, make failure legible and verify the whole promise.
            </p>
          }
        />

        <div className="lifecycle">
          <div className="lifecycle__diagram">
            <div className="lifecycle__track" aria-hidden="true">
              <motion.span
                className="lifecycle__track-fill"
                animate={{ width: `${progress}%` }}
                transition={{ duration: reduce ? 0 : 0.65, ease: EASE_CINEMATIC }}
              />
            </div>
            <div className="lifecycle__tabs" role="tablist" aria-label="QA workflow phases">
              {lifecyclePhases.map((phase, index) => {
                const selected = index === activeIndex;
                return (
                  <button
                    key={phase.id}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    id={`lifecycle-tab-${phase.id}`}
                    aria-selected={selected}
                    aria-controls="lifecycle-panel"
                    tabIndex={selected ? 0 : -1}
                    className={cx('lifecycle-tab', selected && 'is-active', index < activeIndex && 'is-past')}
                    onClick={() => select(index)}
                    onKeyDown={handleKeyDown}
                  >
                    <span className="lifecycle-tab__node">
                      <span>{phase.index}</span>
                    </span>
                    <span className="lifecycle-tab__label">{phase.short}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lifecycle__panel-wrap">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                id="lifecycle-panel"
                role="tabpanel"
                aria-labelledby={`lifecycle-tab-${active.id}`}
                tabIndex={0}
                className="lifecycle__panel"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.32, ease: EASE_CINEMATIC }}
              >
                <div className="lifecycle__panel-index">
                  <span className="mono-label">Phase</span>
                  <strong>{active.index}</strong>
                  <span className="lifecycle__panel-total">/ 06</span>
                </div>
                <div className="lifecycle__panel-main">
                  <p className="mono-label">Decision stage</p>
                  <h3>{active.label}</h3>
                  <p className="lifecycle__description">{active.description}</p>
                </div>
                <div className="lifecycle__panel-activities">
                  <p className="mono-label">Activities</p>
                  <ul>
                    {active.activities.map((activity) => (
                      <li key={activity}>
                        <span aria-hidden="true">↳</span>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lifecycle__panel-artifact">
                  <p className="mono-label">Working evidence</p>
                  <div className="lifecycle__artifact-mark">
                    <CornerDownRight size={15} strokeWidth={1.5} aria-hidden="true" />
                    <span>{active.artifact}</span>
                  </div>
                  <div className="lifecycle__panel-controls">
                    <button type="button" onClick={() => select(activeIndex - 1)} aria-label="Previous workflow phase">
                      <ArrowLeft size={15} strokeWidth={1.5} aria-hidden="true" />
                    </button>
                    <span>{activeIndex + 1} / {lifecyclePhases.length}</span>
                    <button type="button" onClick={() => select(activeIndex + 1)} aria-label="Next workflow phase">
                      <ArrowRight size={15} strokeWidth={1.5} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
