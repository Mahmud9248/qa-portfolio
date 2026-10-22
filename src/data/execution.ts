import type { ExecutionTest } from '../types';

export const executionQueue: ExecutionTest[] = [
  {
    id: 'FIN-001',
    name: 'Fee waiver at the exact balance threshold',
    area: 'Business rules',
    status: 'Failed',
    note: 'Boundary mismatch isolated to fee-waiver condition.',
  },
  {
    id: 'FIN-002',
    name: 'Interest reconciles across UI, PDF and ledger',
    area: 'Data integrity',
    status: 'Passed',
  },
  {
    id: 'FIN-003',
    name: 'Early-closure window at day 90 and day 91',
    area: 'Boundaries',
    status: 'Passed',
  },
  {
    id: 'SAAS-001',
    name: 'Tenth occupied seat is accepted; eleventh is rejected',
    area: 'Capacity',
    status: 'Passed',
  },
  {
    id: 'SAAS-002',
    name: 'Sole Owner cannot be demoted from any interface',
    area: 'Authorization',
    status: 'Failed',
    note: 'Mobile surface bypassed the ownership guard.',
  },
  {
    id: 'SAAS-003',
    name: 'Role change takes effect on the next restricted request',
    area: 'Authorization',
    status: 'Passed',
  },
  {
    id: 'API-001',
    name: 'Cross-workspace subscription returns a non-disclosing 404',
    area: 'API security',
    status: 'Passed',
  },
  {
    id: 'API-002',
    name: 'Idempotent retry creates exactly one proration invoice',
    area: 'Data integrity',
    status: 'Failed',
    note: 'Replay created a duplicate invoice in sample data.',
  },
  {
    id: 'API-003',
    name: 'Null planId returns a safe 422 validation error',
    area: 'API contract',
    status: 'Blocked',
    note: 'Blocked by a 500 response; error path needs repair before retest.',
  },
  {
    id: 'UI-004',
    name: 'Mobile navigation and dialogs are fully keyboard operable',
    area: 'Accessibility',
    status: 'Passed',
  },
];
