import { Check, Clock3, Minus, X } from 'lucide-react';
import type { TestStatus } from '../../types';
import { cx } from '../../lib/cx';

const statusIcon = {
  Passed: Check,
  Failed: X,
  Blocked: Minus,
  Pending: Clock3,
} satisfies Record<TestStatus, typeof Check>;

export function StatusPill({ status, className }: { status: TestStatus; className?: string }) {
  const Icon = statusIcon[status];
  return (
    <span className={cx('status-pill', `status-pill--${status.toLowerCase()}`, className)}>
      <Icon size={12} strokeWidth={2} aria-hidden="true" />
      <span>{status}</span>
    </span>
  );
}

export function StatusDot({ label = 'Verified', className }: { label?: string; className?: string }) {
  return (
    <span className={cx('status-dot', className)}>
      <span className="status-dot__mark" aria-hidden="true" />
      {label}
    </span>
  );
}
