import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Check, Database, FileJson, Send, X } from 'lucide-react';
import { CodeBlock } from '../qa/CodeBlock';
import { CopyButton } from '../ui/CopyButton';
import { cx } from '../../lib/cx';

interface DataCheck {
  label: string;
  expected: string;
  observed: string;
  pass: boolean;
}

interface ApiScenario {
  id: string;
  label: string;
  short: string;
  status: number;
  intent: 'Expected' | 'Defect observed';
  description: string;
  request: string;
  response: string;
  checks: DataCheck[];
  verdict: string;
  verdictState: 'pass' | 'fail';
}

const endpoint = 'POST /v1/subscriptions/sub_demo_104/change-plan';

const scenarios: ApiScenario[] = [
  {
    id: 'success',
    label: 'Owner schedules a plan change',
    short: 'Valid request',
    status: 200,
    intent: 'Expected',
    description:
      'A valid Owner token, a future effective date and a unique idempotency key produce one scheduled plan change.',
    request: `POST /v1/subscriptions/sub_demo_104/change-plan HTTP/1.1
Host: api.demo.invalid
Authorization: Bearer demo_token_owner_a
Content-Type: application/json
Idempotency-Key: idem_demo_91

{
  "planId": "plan_scale",
  "effectiveDate": "2026-11-01",
  "prorationBehavior": "create_prorations",
  "reason": "Synthetic portfolio validation sample"
}`,
    response: `HTTP/1.1 200 OK
Content-Type: application/json

{
  "subscriptionId": "sub_demo_104",
  "planChangeId": "pc_demo_81",
  "previousPlan": "plan_growth",
  "newPlan": "plan_scale",
  "status": "scheduled",
  "effectiveDate": "2026-11-01T00:00:00Z",
  "proration": {
    "currency": "USD",
    "subtotal": "12.40",
    "tax": "0.00",
    "total": "12.40"
  },
  "correlationId": "corr_demo_7c91"
}`,
    checks: [
      { label: 'billing.plan_change', expected: '1 row', observed: '1 row', pass: true },
      { label: 'billing.invoice', expected: '1 proration invoice', observed: '1 invoice', pass: true },
      { label: 'audit.event_log', expected: '1 matching event', observed: '1 event', pass: true },
      { label: 'integration.outbox_event', expected: '1 matching event', observed: '1 event', pass: true },
    ],
    verdict: 'The response contract and all four transactional records reconcile in the sample fixture.',
    verdictState: 'pass',
  },
  {
    id: 'missing-plan',
    label: 'Missing planId',
    short: 'Validation',
    status: 422,
    intent: 'Expected',
    description: 'The required planId is absent. Validation should reject the request before any write path begins.',
    request: `POST /v1/subscriptions/sub_demo_104/change-plan HTTP/1.1
Host: api.demo.invalid
Authorization: Bearer demo_token_owner_a
Content-Type: application/json
Idempotency-Key: idem_demo_92

{
  "effectiveDate": "2026-11-01",
  "prorationBehavior": "create_prorations"
}`,
    response: `HTTP/1.1 422 Unprocessable Entity
Content-Type: application/json

{
  "error": "validation_failed",
  "message": "One or more fields are invalid.",
  "fieldErrors": {
    "planId": "planId is required."
  },
  "correlationId": "corr_demo_442a"
}`,
    checks: [
      { label: 'billing.plan_change', expected: 'No rows', observed: 'No rows', pass: true },
      { label: 'billing.invoice', expected: 'No rows', observed: 'No rows', pass: true },
      { label: 'audit.event_log', expected: 'No success event', observed: 'No success event', pass: true },
    ],
    verdict: 'The request is rejected with a field-level error and leaves no financial or audit residue.',
    verdictState: 'pass',
  },
  {
    id: 'null-plan',
    label: 'planId is present but null',
    short: 'Defect',
    status: 500,
    intent: 'Defect observed',
    description:
      'An explicit null bypasses a required-field check. The sample server returns an internal error rather than a validation response.',
    request: `POST /v1/subscriptions/sub_demo_104/change-plan HTTP/1.1
Host: api.demo.invalid
Authorization: Bearer demo_token_owner_a
Content-Type: application/json
Idempotency-Key: idem_demo_93

{
  "planId": null,
  "effectiveDate": "2026-11-01",
  "prorationBehavior": "create_prorations"
}`,
    response: `HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{
  "error": "internal_error",
  "message": "An unexpected error occurred.",
  "detail": "Cannot read properties of null (reading 'catalogueId')",
  "correlationId": "corr_demo_5b12"
}`,
    checks: [
      { label: 'billing.plan_change', expected: 'No rows', observed: 'No rows', pass: true },
      { label: 'audit.event_log', expected: 'No success event', observed: 'No success event', pass: true },
      { label: 'Response safety', expected: 'No internal detail', observed: 'Implementation detail exposed', pass: false },
      { label: 'Contract', expected: '422 validation error', observed: '500 internal error', pass: false },
    ],
    verdict:
      'Defect: a null field is not handled as a validation failure. The write path is safe, but status and information disclosure are both wrong.',
    verdictState: 'fail',
  },
  {
    id: 'cross-tenant',
    label: 'Subscription in another workspace',
    short: 'Isolation',
    status: 404,
    intent: 'Expected',
    description:
      'A valid token from workspace A references a subscription in workspace B. The API must not reveal the other tenant’s resource.',
    request: `POST /v1/subscriptions/sub_demo_b204/change-plan HTTP/1.1
Host: api.demo.invalid
Authorization: Bearer demo_token_owner_a
Content-Type: application/json
Idempotency-Key: idem_demo_94

{
  "planId": "plan_scale",
  "effectiveDate": "2026-11-01",
  "prorationBehavior": "create_prorations"
}`,
    response: `HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "error": "not_found",
  "message": "Subscription not found.",
  "correlationId": "corr_demo_91ad"
}`,
    checks: [
      { label: 'Authorization scope', expected: 'Workspace A only', observed: 'Workspace A only', pass: true },
      { label: 'Response data', expected: 'No tenant identifiers', observed: 'No tenant identifiers', pass: true },
      { label: 'billing.*', expected: 'No cross-tenant mutation', observed: 'No rows changed', pass: true },
    ],
    verdict: 'The caller receives a non-disclosing 404 and no data from the other workspace is returned or changed.',
    verdictState: 'pass',
  },
  {
    id: 'idempotent-retry',
    label: 'Identical request replayed after a timeout',
    short: 'Idempotency',
    status: 200,
    intent: 'Defect observed',
    description:
      'The same Idempotency-Key and payload are replayed. The response is reused, but the sample database tells a different story.',
    request: `POST /v1/subscriptions/sub_demo_104/change-plan HTTP/1.1
Host: api.demo.invalid
Authorization: Bearer demo_token_owner_a
Content-Type: application/json
Idempotency-Key: idem_demo_91

{
  "planId": "plan_scale",
  "effectiveDate": "2026-11-01",
  "prorationBehavior": "create_prorations",
  "reason": "Synthetic portfolio validation sample"
}`,
    response: `HTTP/1.1 200 OK
Content-Type: application/json

{
  "subscriptionId": "sub_demo_104",
  "planChangeId": "pc_demo_81",
  "status": "scheduled",
  "effectiveDate": "2026-11-01T00:00:00Z",
  "proration": {
    "currency": "USD",
    "subtotal": "12.40",
    "tax": "0.00",
    "total": "12.40"
  },
  "correlationId": "corr_demo_7c91"
}`,
    checks: [
      { label: 'billing.plan_change', expected: '1 row', observed: '1 row', pass: true },
      { label: 'billing.invoice', expected: '1 invoice', observed: '2 invoices', pass: false },
      { label: 'billing.invoice totals', expected: '12.40 total', observed: '24.80 total', pass: false },
      { label: 'Unique constraint', expected: 'idempotency key enforced', observed: 'No unique violation recorded', pass: false },
    ],
    verdict:
      'Defect: the response looked like a safe replay while a second proration invoice was created. Verify data, not only the JSON.',
    verdictState: 'fail',
  },
];

type View = 'request' | 'response' | 'checks';
const views: { id: View; label: string; icon: typeof Send }[] = [
  { id: 'request', label: 'Request', icon: Send },
  { id: 'response', label: 'Response', icon: FileJson },
  { id: 'checks', label: 'Data check', icon: Database },
];

export function ApiConsole() {
  const [scenarioId, setScenarioId] = useState(scenarios[0].id);
  const [view, setView] = useState<View>('response');
  const reduce = useReducedMotion();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const scenario = scenarios.find((item) => item.id === scenarioId) ?? scenarios[0];

  function switchView(next: View) {
    setView(next);
  }

  function handleViewKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % views.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + views.length) % views.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = views.length - 1;
    setView(views[nextIndex].id);
    window.requestAnimationFrame(() => tabRefs.current[nextIndex]?.focus());
  }

  return (
    <div className="api-console">
      <div className="interactive-head">
        <div>
          <span className="mono-label">Interactive demonstration</span>
          <h3>Response inspector / plan change</h3>
        </div>
        <span className={cx('api-console__intent', `is-${scenario.intent === 'Expected' ? 'expected' : 'defect'}`)}>
          {scenario.intent}
        </span>
      </div>
      <p className="interactive-note">
        Select a fictional scenario, inspect the request and response, then compare the database evidence. No network
        request leaves this page.
      </p>

      <div className="api-console__endpoint">
        <span className="method-badge">POST</span>
        <code>/v1/subscriptions/:subscriptionId/change-plan</code>
        <CopyButton value={endpoint} label="Copy endpoint" />
        <span className="api-console__endpoint-note">demo.api.invalid</span>
      </div>

      <div className="api-console__layout">
        <div className="api-scenarios" role="group" aria-label="Sample API response scenarios">
          <div className="api-scenarios__head">
            <span className="mono-label">Scenarios</span>
            <span className="mono-label">{scenarios.length} samples</span>
          </div>
          {scenarios.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={cx('api-scenario', scenarioId === item.id && 'is-active')}
              aria-pressed={scenarioId === item.id}
              onClick={() => {
                setScenarioId(item.id);
                setView(item.intent === 'Defect observed' ? 'checks' : 'response');
              }}
            >
              <span className="api-scenario__index">{String(index + 1).padStart(2, '0')}</span>
              <span className="api-scenario__copy">
                <span>{item.label}</span>
                <small>{item.short}</small>
              </span>
              <span className={cx('status-code', `status-code--${String(item.status)[0]}xx`)}>{item.status}</span>
            </button>
          ))}
          <div className="api-scenarios__note">
            <span className="signal-dot" aria-hidden="true" />
            Expected vs observed is explicit in every sample.
          </div>
        </div>

        <div className="api-inspector">
          <div className="api-inspector__head">
            <div>
              <span className="mono-label">Selected scenario</span>
              <h4>{scenario.label}</h4>
              <p>{scenario.description}</p>
            </div>
            <div className="api-inspector__status">
              <span>HTTP</span>
              <strong className={cx('status-code', `status-code--${String(scenario.status)[0]}xx`)}>{scenario.status}</strong>
            </div>
          </div>

          <div className="api-view-tabs" role="tablist" aria-label="API evidence views">
            {views.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`api-view-tab-${item.id}`}
                  aria-selected={view === item.id}
                  aria-controls="api-view-panel"
                  tabIndex={view === item.id ? 0 : -1}
                  className={cx('api-view-tab', view === item.id && 'is-active')}
                  onClick={() => switchView(item.id)}
                  onKeyDown={(event) => handleViewKeyDown(event, index)}
                >
                  <Icon size={14} strokeWidth={1.5} aria-hidden="true" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${scenario.id}-${view}`}
              id="api-view-panel"
              role="tabpanel"
              aria-labelledby={`api-view-tab-${view}`}
              className="api-view-panel"
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              tabIndex={0}
            >
              {view === 'request' ? (
                <CodeBlock code={scenario.request} language="http" title="Request / raw HTTP" />
              ) : null}
              {view === 'response' ? (
                <CodeBlock code={scenario.response} language="http / json" title="Response / canned sample" />
              ) : null}
              {view === 'checks' ? (
                <div className="api-checks">
                  <div className="api-checks__head">
                    <span className="mono-label">Layer</span>
                    <span className="mono-label">Expected</span>
                    <span className="mono-label">Observed</span>
                    <span className="mono-label">Result</span>
                  </div>
                  {scenario.checks.map((check) => (
                    <div className="api-check" key={check.label}>
                      <code>{check.label}</code>
                      <span>{check.expected}</span>
                      <span>{check.observed}</span>
                      <span className={cx('api-check__result', check.pass ? 'is-pass' : 'is-fail')}>
                        {check.pass ? <Check size={13} strokeWidth={2} aria-hidden="true" /> : <X size={13} strokeWidth={2} aria-hidden="true" />}
                        {check.pass ? 'Matches' : 'Mismatch'}
                      </span>
                    </div>
                  ))}
                  <div className={cx('api-verdict', `api-verdict--${scenario.verdictState}`)}>
                    <span className="mono-label">Conclusion</span>
                    <p>{scenario.verdict}</p>
                  </div>
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>

          <p className="api-inspector__foot">
            <span aria-hidden="true">↳</span>
            The response is only one layer of evidence. Open Data check before accepting the result.
          </p>
        </div>
      </div>
    </div>
  );
}
