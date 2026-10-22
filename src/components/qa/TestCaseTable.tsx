import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { TestCase } from '../../types';
import { StatusPill } from '../ui/Status';
import { cx } from '../../lib/cx';

export function TestCaseTable({ tests, caption }: { tests: TestCase[]; caption: string }) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="test-table">
      <div className="test-table__scroll" tabIndex={0} role="region" aria-label={caption}>
        <table>
          <caption>{caption}</caption>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Scenario</th>
              <th scope="col">Test data</th>
              <th scope="col">Expected result</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test) => {
              const isOpen = expanded.has(test.id);
              return (
                <TestRows
                  key={test.id}
                  test={test}
                  isOpen={isOpen}
                  toggle={() => toggle(test.id)}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TestRows({ test, isOpen, toggle }: { test: TestCase; isOpen: boolean; toggle: () => void }) {
  const panelId = `test-steps-${test.id}`;
  return (
    <>
      <tr className={cx('test-table__row', isOpen && 'is-open')}>
        <th scope="row" className="test-table__id">{test.id}</th>
        <td>
          <button
            type="button"
            className="test-table__disclosure"
            aria-expanded={isOpen}
            aria-controls={panelId}
            onClick={toggle}
          >
            <span>{test.scenario}</span>
            <ChevronDown size={14} strokeWidth={1.6} aria-hidden="true" />
          </button>
          <span className="test-table__requirement">{test.requirementId}</span>
        </td>
        <td>{test.testData}</td>
        <td>{test.expected}</td>
        <td><StatusPill status={test.status} /></td>
      </tr>
      {isOpen ? (
        <tr className="test-table__detail-row">
          <td colSpan={5}>
            <div id={panelId} className="test-table__detail">
              <div>
                <span className="mono-label">Preconditions</span>
                <p>{test.preconditions}</p>
              </div>
              <div>
                <span className="mono-label">Steps</span>
                <ol>
                  {test.steps.map((step, index) => (
                    <li key={step}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
              {test.evidence ? (
                <div className="test-table__evidence">
                  <span className="mono-label">Evidence / note</span>
                  <p>{test.evidence}</p>
                </div>
              ) : null}
            </div>
          </td>
        </tr>
      ) : null}
    </>
  );
}
