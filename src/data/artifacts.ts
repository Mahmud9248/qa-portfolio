import type { Artifact } from '../types';

export const artifactCategories = ['All', 'Planning', 'Test design', 'Execution', 'Defects', 'API & data'] as const;

export const artifacts: Artifact[] = [
  {
    id: 'ART-01',
    title: 'Seat management release test plan',
    category: 'Planning',
    format: 'Test plan',
    summary:
      'Scope, risks, entry criteria and exit criteria for a fictional workspace-seat and plan-downgrade release.',
    purpose:
      'Give a release owner a concise, testable view of what will be validated, what is explicitly excluded, and which evidence is required before the plan is signed off.',
    howToUse: [
      'Adapt the scope and risk sections to the actual change, not the entire product.',
      'Agree exit criteria with product and engineering before execution begins.',
      'Keep blocked tests and environment limitations visible in the final report.',
    ],
    tags: ['release', 'test plan', 'risk-based testing', 'workspace'],
    relatedCase: 'saas-regression-testing',
    updated: '2026-10',
    downloadName: 'ART-01-seat-management-test-plan.md',
    blocks: [
      {
        type: 'fields',
        title: 'Plan identification',
        fields: [
          { label: 'Document', value: 'QA-TP-014' },
          { label: 'Release', value: 'Harbor workspace seats / plan downgrade' },
          { label: 'Version under test', value: 'demo-saas-2.7.0 (illustrative)' },
          { label: 'Test basis', value: 'REQ-SAAS-01 to REQ-SAAS-06' },
          { label: 'Owner', value: 'Manual QA — portfolio sample' },
          { label: 'Status', value: 'Draft for demonstration' },
        ],
      },
      {
        type: 'paragraph',
        text: 'This plan covers a fictional feature release. The objective is not to prove that the happy path works, but to determine whether capacity, ownership and role permissions remain true across desktop, mobile and direct API access.',
      },
      {
        type: 'list',
        title: 'In scope',
        items: [
          'Invitation creation, acceptance, revocation and pending-seat accounting.',
          'Owner, Admin, Member and Viewer role changes with server-side authorization.',
          'Plan downgrade into over-cap state without member deletion.',
          'Seat count consistency between the members view, plan summary and billing summary.',
          'Audit events and notification triggers for successful mutations.',
          'Focused regression around authentication, navigation and invite email content.',
        ],
      },
      {
        type: 'list',
        title: 'Out of scope',
        items: [
          'Real payment capture, tax and payment-provider redirects.',
          'Email deliverability, inbox rendering and third-party identity provisioning.',
          'Bulk import, SSO/SCIM and mobile native applications.',
        ],
      },
      {
        type: 'table',
        table: {
          title: 'Entry criteria',
          columns: ['Criterion', 'Required evidence', 'Owner'],
          rows: [
            ['Feature flag enabled in demo workspace', 'Synthetic workspace with 9/10 seats', 'QA'],
            ['Role test accounts prepared', 'One Owner, Admin, Member and Viewer token/account', 'QA'],
            ['Plan catalogue available', '15-seat and 10-seat fixtures', 'QA'],
            ['Build is deployable', 'demo-saas-2.7.0 available in demo environment', 'Engineering'],
            ['Known issues acknowledged', 'Triage notes and workaround decisions recorded', 'Product'],
          ],
        },
      },
      {
        type: 'table',
        table: {
          title: 'Exit criteria',
          columns: ['Gate', 'Pass condition'],
          rows: [
            ['Critical ownership invariant', 'Last-Owner protection verified on desktop, mobile and API'],
            ['Capacity enforcement', 'Server rejects 11th occupied seat; stale UI cannot bypass cap'],
            ['Role authorization', 'Each restricted action returns 403 after demotion'],
            ['Audit', 'Every successful membership mutation has matching actor/target/before/after event'],
            ['Blocked tests', 'Documented with impact and owner; not silently marked pass'],
            ['Regression', 'High-risk pack executed with evidence links'],
          ],
        },
      },
      {
        type: 'table',
        table: {
          title: 'Risk-based execution order',
          columns: ['Order', 'Area', 'Why first'],
          rows: [
            ['1', 'Last-owner protection', 'Account recovery failure; highest business impact'],
            ['2', 'Seat cap + pending invite', 'Revenue capacity and migration integrity'],
            ['3', 'Role authorization', 'Security exposure through stale sessions'],
            ['4', 'Downgrade over-cap state', 'Customer-impacting migration'],
            ['5', 'Audit and notifications', 'Observability and trust'],
            ['6', 'Cross-tab and responsive surfaces', 'State consistency and alternate interaction paths'],
          ],
        },
      },
      {
        type: 'callout',
        label: 'Environment limitation',
        text: 'The demo environment cannot advance the 72-hour invitation expiry clock. Any expiry-dependent exit criterion must be marked blocked until a controllable time source is available.',
      },
    ],
  },
  {
    id: 'ART-02',
    title: 'Financial rules test case suite',
    category: 'Test design',
    format: 'Test case suite',
    summary:
      'A boundary-aware suite for a fictional savings statement engine: fee waiver, promo APY, early closure and interest reconciliation.',
    purpose:
      'Demonstrate how requirements become traceable, data-specific test cases with exact expected values instead of broad test titles.',
    howToUse: [
      'Keep one primary assertion per case where possible.',
      'Use boundary values plus the immediate adjacent values in both directions.',
      'Record the layer used as evidence: UI, statement payload, PDF or ledger.',
    ],
    tags: ['test cases', 'BVA', 'financial rules', 'expected results'],
    relatedCase: 'financial-validation',
    updated: '2026-10',
    downloadName: 'ART-02-financial-rules-test-cases.md',
    blocks: [
      {
        type: 'paragraph',
        text: 'This sample suite is a compact view of the financial-validation case study. Test data and results are illustrative. The values are deliberately exact because a test that says "around $1,500" cannot prove a boundary.',
      },
      {
        type: 'table',
        table: {
          title: 'Sample test cases',
          columns: ['ID', 'Scenario', 'Test data', 'Expected result', 'Status'],
          rows: [
            ['TC-FIN-001', 'Fee waiver at exact ADB boundary', 'ADB $1,500.00; DD inactive', 'Fee $0.00 in summary, PDF and ledger', 'Failed'],
            ['TC-FIN-002', 'Fee charge below boundary', 'ADB $1,499.99; DD inactive', 'One $5.00 fee in all layers', 'Passed'],
            ['TC-FIN-003', 'Direct deposit begins mid-cycle', 'DD from day 16; ADB $900.00', 'Fee charged under full-cycle assumption; rule reason visible', 'Passed'],
            ['TC-FIN-004', 'Opening deposit meets promo minimum', '$500.00 opening; code QAVERIFY', '4.10% promo APY applied', 'Passed'],
            ['TC-FIN-005', 'Opening deposit below promo minimum', '$499.99 opening; valid code', 'Base 0.50% APY; no promo label', 'Passed'],
            ['TC-FIN-006', 'Closure fee on exact day boundary', 'Day 90; no FLEX90', '$25.00 fee disclosed and charged once', 'Passed'],
            ['TC-FIN-007', 'Closure fee excluded after boundary', 'Day 91; no FLEX90', 'No closure fee', 'Passed'],
            ['TC-FIN-008', 'Interest reconciliation for 31 days', '$1,500 ADB; 4.10%; 31 days', '$5.22 in all layers after one rounding', 'Passed'],
            ['TC-FIN-009', 'Historical statement after rule change', 'Closed Feb period; Mar config updated', 'Archived rule version used; value unchanged', 'Blocked'],
          ],
        },
      },
      {
        type: 'code',
        title: 'Executable expected-value note',
        language: 'text',
        code: 'Simple daily accrual used in the fictional model:\n\ninterest = ADB × annualRate ÷ 365 × days\n         = 1500 × 0.041 ÷ 365 × 31\n         = 5.223287671...\n\nRounded once, half-up to two decimal places: 5.22\n\nAssert: statement display = PDF = ledger = $5.22',
      },
      {
        type: 'callout',
        label: 'Why this is a good test case',
        text: 'TC-FIN-001 names the data, the calculation rule, the three surfaces being compared and the exact expected value. If the fee is $5.00, the test fails even if every screen is internally consistent.',
      },
    ],
  },
  {
    id: 'ART-03',
    title: 'Defect report: last Owner demoted on mobile',
    category: 'Defects',
    format: 'Bug report',
    summary:
      'A clearly labelled fictional defect showing reproduction, expected vs actual behavior, severity and priority separation.',
    purpose:
      'Show a defect report that a developer can reproduce and a product owner can prioritise without needing a second conversation.',
    howToUse: [
      'Use objective environment and precondition data.',
      'State the actual observation, not the suspected code cause.',
      'Keep severity (impact) and priority (scheduling) independent.',
    ],
    tags: ['defect', 'severity vs priority', 'authorization', 'mobile'],
    relatedCase: 'saas-regression-testing',
    updated: '2026-10',
    downloadName: 'ART-03-defect-last-owner-mobile.md',
    blocks: [
      {
        type: 'fields',
        title: 'Defect record — illustrative example',
        fields: [
          { label: 'Bug ID', value: 'BUG-SAAS-021' },
          { label: 'Summary', value: 'Last remaining Owner can be demoted from the mobile member menu' },
          { label: 'Environment', value: 'Fictional Harbor demo · WebKit 375px · workspace WS-2048 · demo-saas-2.7.0' },
          { label: 'Preconditions', value: 'Exactly one Owner exists; signed-in account is that Owner' },
          { label: 'Severity', value: 'Critical — breaks workspace administration invariant' },
          { label: 'Priority', value: 'Immediate — blocks release recommendation' },
          { label: 'Status', value: 'Open' },
          { label: 'Label', value: 'Portfolio demonstration · all data fictional' },
        ],
      },
      {
        type: 'list',
        title: 'Reproduction steps',
        items: [
          'Open the synthetic Harbor workspace at a 375px viewport as the sole Owner.',
          'Open the member actions menu for the Owner account.',
          'Select "Change role" and choose Member.',
          'Confirm the role change.',
        ],
      },
      {
        type: 'fields',
        title: 'Expected vs actual',
        fields: [
          { label: 'Expected', value: 'Role change is blocked with an explanation that ownership must be transferred first. Role stays Owner; no success message is shown.' },
          { label: 'Actual', value: 'Role changes to Member and a "Role updated" success toast appears. Workspace no longer has an Owner.' },
          { label: 'Server evidence', value: 'Members response returns role = member for the only owner account.' },
          { label: 'Audit evidence', value: 'No ownership-transfer event exists; only a role-change event is recorded.' },
        ],
      },
      {
        type: 'table',
        table: {
          title: 'Severity and priority are different questions',
          columns: ['Dimension', 'Question', 'This defect'],
          rows: [
            ['Severity', 'How much harm can the failure cause?', 'Critical: removes the only administrative owner.'],
            ['Priority', 'When should the team act?', 'Immediate: block release and repair before rollout.'],
            ['Example contrast', 'A typo in a legal footer can be severity Low but priority High before a launch.', 'This defect is high on both dimensions, but the reasons are not the same.'],
          ],
        },
      },
      {
        type: 'callout',
        label: 'Definition of fixed',
        text: 'The endpoint must reject demotion of the last Owner regardless of UI surface. Retest desktop, mobile, direct API and a legitimate ownership-transfer flow, then confirm the audit output.',
      },
    ],
  },
  {
    id: 'ART-04',
    title: 'Monthly fee waiver decision table',
    category: 'Test design',
    format: 'Decision table',
    summary:
      'A compact rule matrix showing how average daily balance and direct-deposit state combine to produce fee outcomes.',
    purpose:
      'Expose all relevant combinations before selecting representative test data, especially where two conditions can independently satisfy one action.',
    howToUse: [
      'Confirm the business meaning of each condition with the product owner.',
      'Add a rule for each materially different action outcome.',
      'Use the table to generate tests, not to prove that every row must be automated.',
    ],
    tags: ['decision table', 'fee waiver', 'business rules', 'test design'],
    relatedCase: 'financial-validation',
    updated: '2026-10',
    downloadName: 'ART-04-fee-waiver-decision-table.md',
    blocks: [
      {
        type: 'paragraph',
        text: 'Conditions: ADB ≥ $1,500.00; direct deposit active for the full statement cycle. The fee is $5.00 unless at least one condition qualifies the account.',
      },
      {
        type: 'table',
        table: {
          title: 'Rule matrix',
          columns: ['Rule', 'ADB ≥ $1,500.00', 'Full-cycle DD active', 'Monthly fee', 'Decision'],
          rows: [
            ['R1', 'Yes', 'Yes', '$0.00', 'Waived — both conditions qualify'],
            ['R2', 'Yes', 'No', '$0.00', 'Waived by balance'],
            ['R3', 'No', 'Yes', '$0.00', 'Waived by direct deposit'],
            ['R4', 'No', 'No', '$5.00', 'Charged once'],
            ['R5', 'ADB unavailable', 'No', 'Do not calculate', 'Data-quality hold; surface a blocked state'],
          ],
        },
      },
      {
        type: 'list',
        title: 'Data choices implied by the table',
        items: [
          'For R1 and R4, use values on both sides of the ADB boundary and both DD states.',
          'For R2, use DD inactive and a balance of exactly $1,500.00, then $1,499.99.',
          'For R3, use DD active with a low ADB and test a mid-cycle DD start as a separate state.',
          'R5 is not a financial waiver; it is a missing-data path that should not default to either outcome.',
        ],
      },
      {
        type: 'callout',
        label: 'Assumption under review',
        text: 'The table currently interprets "direct deposit active" as active for the entire statement cycle. A start on day 16 therefore does not waive the fee. This assumption should be confirmed, not silently implemented.',
      },
    ],
  },
  {
    id: 'ART-05',
    title: 'Balance, promo and closure boundaries',
    category: 'Test design',
    format: 'Boundary analysis',
    summary:
      'Three-step values around financial thresholds, plus a date boundary set for closures, promotion windows and leap-day statements.',
    purpose:
      'Replace vague "valid amount" cases with data that targets the precise point where behavior changes.',
    howToUse: [
      'Use the lowest and highest values that share the same outcome.',
      'Test the exact boundary and one meaningful unit on each side.',
      'For dates, verify the day count and the time-zone handling, not just the formatted string.',
    ],
    tags: ['BVA', 'promo', 'closure', 'dates'],
    relatedCase: 'financial-validation',
    updated: '2026-10',
    downloadName: 'ART-05-boundary-value-analysis.md',
    blocks: [
      {
        type: 'table',
        table: {
          title: 'Numeric boundaries',
          columns: ['Rule', 'Below', 'At boundary', 'Above', 'Expected transition'],
          rows: [
            ['Monthly fee waiver', '$1,499.99', '$1,500.00', '$1,500.01', 'Fee charged → waived'],
            ['Promo opening-deposit minimum', '$499.99', '$500.00', '$500.01', 'Base APY → promo APY'],
            ['Early-closure fee', 'Opening $499.99', 'Opening $500.00', 'Opening $500.01', 'No closure fee → eligible'],
            ['Reason length (API example)', '279 chars', '280 chars', '281 chars', 'Accepted → rejected at 281'],
          ],
        },
      },
      {
        type: 'table',
        table: {
          title: 'Date and period boundaries',
          columns: ['Boundary', 'Values to test', 'Risk being reduced'],
          rows: [
            ['Closure window', 'Day 89 · Day 90 · Day 91', 'Inclusive vs exclusive day counting'],
            ['Statement length', '28 · 29 · 30 · 31 days', 'Daily accrual multiplication errors'],
            ['Leap period', '2024-02-28 · 2024-02-29 · 2024-03-01', 'Hard-coded day counts'],
            ['Direct deposit state', 'Active all cycle · starts day 16 · ends day 30', 'Assumption about "active"'],
            ['Promo expiry', 'Day 89 · Day 90 · Day 91', 'Off-by-one promo extension'],
          ],
        },
      },
      {
        type: 'list',
        title: 'Precision note',
        items: [
          'Monetary values use decimal arithmetic in the expectation set; evidence should not be accepted from binary floating-point display alone.',
          'A one-cent difference is a real failure when the rule defines a monetary threshold.',
          'For date boundaries, use the business time zone and UTC to confirm the conversion explicitly.',
        ],
      },
    ],
  },
  {
    id: 'ART-06',
    title: 'Plan-change API request and response',
    category: 'API & data',
    format: 'Request / response',
    summary:
      'A fictional POST request with an Owner token, plus a successful response and a 422 validation example.',
    purpose:
      'Provide a clean, reproducible example for manual API validation without using live credentials or a real endpoint.',
    howToUse: [
      'Replace every fictional value with safe test fixtures in your own environment.',
      'Assert status, schema, money format, IDs and database effects separately.',
      'Use a unique Idempotency-Key for every logical operation.',
    ],
    tags: ['REST API', 'request', 'response', 'validation'],
    relatedCase: 'api-data-validation',
    updated: '2026-10',
    downloadName: 'ART-06-plan-change-api-example.md',
    blocks: [
      {
        type: 'code',
        title: 'Request — fictional demo endpoint',
        language: 'http',
        code: 'POST /v1/subscriptions/sub_demo_104/change-plan HTTP/1.1\nHost: api.demo.invalid\nAuthorization: Bearer demo_token_owner_a\nContent-Type: application/json\nIdempotency-Key: idem_demo_91\n\n{\n  "planId": "plan_scale",\n  "effectiveDate": "2026-11-01",\n  "prorationBehavior": "create_prorations",\n  "reason": "Synthetic plan-change validation sample"\n}',
      },
      {
        type: 'code',
        title: 'Expected success response — 200',
        language: 'json',
        code: '{\n  "subscriptionId": "sub_demo_104",\n  "planChangeId": "pc_demo_81",\n  "previousPlan": "plan_growth",\n  "newPlan": "plan_scale",\n  "status": "scheduled",\n  "effectiveDate": "2026-11-01T00:00:00Z",\n  "proration": {\n    "currency": "USD",\n    "subtotal": "12.40",\n    "tax": "0.00",\n    "total": "12.40"\n  },\n  "correlationId": "corr_demo_7c91"\n}',
      },
      {
        type: 'code',
        title: 'Validation failure — fictional 422 shape',
        language: 'json',
        code: '{\n  "error": "validation_failed",\n  "message": "One or more fields are invalid.",\n  "fieldErrors": {\n    "planId": "planId is required."\n  },\n  "correlationId": "corr_demo_442a"\n}',
      },
      {
        type: 'table',
        table: {
          title: 'Assertions beyond the response panel',
          columns: ['Layer', 'What to verify'],
          rows: [
            ['HTTP contract', 'Status code, required fields, types, money strings, ISO 8601 date'],
            ['State', 'One plan-change row; scheduled date matches response'],
            ['Financial', 'One invoice when create_prorations is requested; totals equal response'],
            ['Observability', 'Audit and outbox rows share the correlation ID'],
            ['Security', 'No token, stack trace, tenant identifier or raw SQL appears in error responses'],
          ],
        },
      },
      {
        type: 'callout',
        label: 'Do not reuse this as a real endpoint',
        text: 'The host `.invalid`, tokens, subscription ID and amounts are fictional. No live service is contacted by this artifact.',
      },
    ],
  },
  {
    id: 'ART-07',
    title: 'Subscription and invoice reconciliation SQL',
    category: 'API & data',
    format: 'SQL validation',
    summary:
      'Fictional SQL checks for duplicate invoices, plan-change reconciliation and audit/outbox consistency.',
    purpose:
      'Show how a manual tester validates the database state behind a successful API response without relying on a developer to interpret it.',
    howToUse: [
      'Run read-only queries against synthetic data only.',
      'Match every query to a specific risk or expected invariant.',
      'Record row counts and amounts alongside the request correlation ID.',
    ],
    tags: ['SQL', 'MySQL', 'data integrity', 'audit', 'idempotency'],
    relatedCase: 'api-data-validation',
    updated: '2026-10',
    downloadName: 'ART-07-subscription-sql-validation.md',
    blocks: [
      {
        type: 'paragraph',
        text: 'The following queries use a fictional `billing` schema. They are illustrative examples for a portfolio demonstration and must never be run against production data.',
      },
      {
        type: 'code',
        title: '1. Locate the plan change behind a correlation ID',
        language: 'sql',
        code: 'SELECT\n  pc.plan_change_id,\n  pc.subscription_id,\n  pc.previous_plan_id,\n  pc.new_plan_id,\n  pc.status,\n  pc.effective_date,\n  pc.idempotency_key,\n  pc.created_at\nFROM billing.plan_change pc\nWHERE pc.correlation_id = \'corr_demo_7c91\';',
      },
      {
        type: 'code',
        title: '2. Detect duplicate proration invoices for one plan change',
        language: 'sql',
        code: 'SELECT\n  i.plan_change_id,\n  COUNT(*) AS invoice_count,\n  SUM(i.total_amount) AS total_booked\nFROM billing.invoice i\nWHERE i.subscription_id = \'sub_demo_104\'\n  AND i.invoice_type = \'PRORATION\'\nGROUP BY i.plan_change_id\nHAVING COUNT(*) > 1;',
      },
      {
        type: 'code',
        title: '3. Reconcile success across change, invoice, audit and outbox',
        language: 'sql',
        code: 'SELECT\n  pc.plan_change_id,\n  pc.correlation_id,\n  COUNT(DISTINCT i.invoice_id)  AS invoices,\n  COUNT(DISTINCT ae.event_id)   AS audit_events,\n  COUNT(DISTINCT oe.outbox_id)  AS outbox_events\nFROM billing.plan_change pc\nLEFT JOIN billing.invoice i\n  ON i.plan_change_id = pc.plan_change_id\nLEFT JOIN audit.event_log ae\n  ON ae.correlation_id = pc.correlation_id\nLEFT JOIN integration.outbox_event oe\n  ON oe.correlation_id = pc.correlation_id\nWHERE pc.correlation_id = \'corr_demo_7c91\'\nGROUP BY pc.plan_change_id, pc.correlation_id;',
      },
      {
        type: 'list',
        title: 'How to interpret the evidence',
        items: [
          'One expected plan change and one invoice for a proration-enabled request.',
          'A count greater than one is a duplicate-write signal, even if the HTTP response reused the same body.',
          'A missing audit or outbox row indicates partial observability or a transaction boundary problem.',
          'Amounts must be compared as decimals, not formatted strings, against the API response.',
        ],
      },
    ],
  },
  {
    id: 'ART-08',
    title: 'Release regression checklist',
    category: 'Execution',
    format: 'Checklist',
    summary:
      'A change-scoped regression list for workspace membership, permissions and plan migration.',
    purpose:
      'Make regression selection defensible: every item should map to a changed area, a shared dependency or a high business risk.',
    howToUse: [
      'Add a reason or risk reference beside each selected area.',
      'Remove items that cannot fail because of the change, and document why.',
      'Record evidence links, not just checkmarks.',
    ],
    tags: ['regression', 'release', 'checklist', 'authorization'],
    relatedCase: 'saas-regression-testing',
    updated: '2026-10',
    downloadName: 'ART-08-release-regression-checklist.md',
    blocks: [
      {
        type: 'table',
        table: {
          title: 'High-risk regression pack — illustrative sample',
          columns: ['Area', 'Checks', 'Why selected', 'Sample status'],
          rows: [
            ['Owner invariant', 'Demote/remove last Owner from desktop, mobile and API; transfer ownership first', 'Critical recovery risk', 'Fail'],
            ['Seat capacity', 'Accept 10th seat; reject 11th; pending invitation reserves seat', 'Revenue + migration risk', 'Pass'],
            ['Role changes', 'After demotion, restricted request returns 403; UI refreshes', 'Security exposure', 'Pass'],
            ['Plan downgrade', 'Over-cap state retains members; blocks new invites', 'Customer data + billing', 'Pass'],
            ['Seat counts', 'Members page, plan summary, billing summary agree', 'Shared source of truth', 'Fail (stale tab)'],
            ['Audit', 'Invite, accept, role change and plan change produce events', 'Traceability', 'Pass'],
            ['Invite notifications', 'Trigger once; content includes plan/capacity context', 'Customer communication', 'Pass'],
            ['Authentication', 'Sign-in, session refresh, unauthorized route redirect', 'Shared dependency', 'Pass'],
            ['Mobile member actions', 'Keyboard accessible, focus returns after close, destructive roles guarded', 'Alternate surface', 'Fail'],
          ],
        },
      },
      {
        type: 'list',
        title: 'Not included in this release pack',
        items: [
          'Unrelated reporting exports — no shared data path with membership or plan cap.',
          'Marketing site pages — separate deployment and no session dependency.',
          'Bulk import — feature disabled for this release.',
          'Email inbox rendering — delivery is mocked; trigger and copy are still covered.',
        ],
      },
      {
        type: 'callout',
        label: 'Regression is a decision',
        text: 'The checklist is not a claim that every possible path was executed. It is a documented selection based on change impact, risk and available evidence.',
      },
    ],
  },
  {
    id: 'ART-09',
    title: 'Membership requirements traceability matrix',
    category: 'Planning',
    format: 'Traceability matrix',
    summary:
      'A sample RTM connecting workspace requirements to test cases, evidence and open defects.',
    purpose:
      'Prevent orphan requirements and orphan tests; make coverage and residual risk visible at a glance.',
    howToUse: [
      'Link requirement → test case → evidence → defect.',
      'Do not call a requirement covered if every linked test is blocked.',
      'Update status after retest rather than leaving stale pass marks.',
    ],
    tags: ['traceability', 'RTM', 'coverage', 'requirements'],
    relatedCase: 'saas-regression-testing',
    updated: '2026-10',
    downloadName: 'ART-09-membership-traceability-matrix.md',
    blocks: [
      {
        type: 'table',
        table: {
          title: 'Sample traceability matrix',
          columns: ['Requirement', 'Test cases', 'Evidence', 'Open defect', 'Coverage state'],
          rows: [
            ['REQ-SAAS-01 — seat cap', 'TC-SAAS-001, 002, 010', 'Counts, 4xx response, invite list', 'Expiry blocked', 'Partial — expiry blocked'],
            ['REQ-SAAS-02 — last Owner', 'TC-SAAS-004, 009', 'Role state, audit output', 'BUG-SAAS-021', 'Failed'],
            ['REQ-SAAS-03 — next-request permissions', 'TC-SAAS-005', '403 response, audit entry', 'None', 'Verified in sample'],
            ['REQ-SAAS-04 — downgrade over cap', 'TC-SAAS-006', 'Members retained, banner, server rejection', 'None', 'Verified in sample'],
            ['REQ-SAAS-05 — cross-tab count', 'TC-SAAS-007', 'Tab B count, rejected submit', 'BUG-SAAS-027', 'Failed — UX'],
            ['REQ-SAAS-06 — audit events', 'TC-SAAS-003, 008', 'Audit rows for role changes and invites', 'Missing event in 021 evidence', 'Partial'],
          ],
        },
      },
      {
        type: 'list',
        title: 'Coverage notes',
        items: [
          'A requirement is not fully covered when one of its linked cases is blocked.',
          'The matrix distinguishes data integrity (server rejected the extra seat) from user-experience failure (stale count).',
          'Evidence should identify the environment/build, not simply say "verified".',
        ],
      },
    ],
  },
  {
    id: 'ART-10',
    title: 'Sample execution report',
    category: 'Execution',
    format: 'Execution report',
    summary:
      'An illustrative execution snapshot with status totals, blocked reasons and a release recommendation.',
    purpose:
      'Show a transparent summary that separates passed checks from blocked verification and records the decision rationale.',
    howToUse: [
      'Use status totals as an index, not a quality score.',
      'Keep blocked and failed cases visible in the summary.',
      'Link every status to a test case and evidence.',
    ],
    tags: ['execution', 'report', 'blocked', 'release decision'],
    relatedCase: 'financial-validation',
    updated: '2026-10',
    downloadName: 'ART-10-sample-execution-report.md',
    blocks: [
      {
        type: 'fields',
        title: 'Snapshot — illustrative data',
        fields: [
          { label: 'Build', value: 'demo-fin-1.4.2' },
          { label: 'Cycle', value: 'Statement rules sample run' },
          { label: 'Test count', value: '9' },
          { label: 'Passed', value: '7' },
          { label: 'Failed', value: '1' },
          { label: 'Blocked', value: '1' },
          { label: 'Result', value: 'Not ready — financial boundary failure' },
        ],
      },
      {
        type: 'table',
        table: {
          title: 'Result distribution',
          columns: ['Status', 'Count', 'Meaning'],
          rows: [
            ['Passed', '7', 'Expected result observed with recorded evidence'],
            ['Failed', '1', 'Exact ADB threshold produced a $5.00 fee (BUG-FIN-014)'],
            ['Blocked', '1', 'Rule-version metadata missing for historical statement'],
            ['Pending', '0', 'No unexecuted cases in this sample'],
          ],
        },
      },
      {
        type: 'paragraph',
        text: 'A pass rate of 78% would be a misleading headline on its own. One failed boundary affects a money outcome; one blocked case prevents a claim about historical statement integrity. The report therefore recommends a hold, not a percentage-based release decision.',
      },
      {
        type: 'callout',
        label: 'Reporting principle',
        text: 'Status counts describe execution. They do not describe risk. A single failed critical invariant can outweigh a majority of passes.',
      },
    ],
  },
];

export const relatedCaseLabel: Record<Artifact['relatedCase'], string> = {
  'financial-validation': 'Business rules & calculation validation',
  'saas-regression-testing': 'SaaS feature & regression testing',
  'api-data-validation': 'API & data integrity validation',
};
