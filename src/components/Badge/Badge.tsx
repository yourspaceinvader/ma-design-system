import type { HTMLAttributes } from 'react';

export type BadgeStatus = 'diligence' | 'closed' | 'at-risk' | 'neutral';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Deal-stage / status this badge represents. Domain-specific semantic color, not a raw hex. */
  status: BadgeStatus;
}

const statusClasses: Record<BadgeStatus, string> = {
  diligence: 'bg-bg-warning text-text-warning',
  closed: 'bg-bg-success text-text-success',
  'at-risk': 'bg-bg-critical text-text-critical',
  neutral: 'bg-bg-surface-raised text-text-muted border border-border',
};

const statusLabel: Record<BadgeStatus, string> = {
  diligence: 'In Diligence',
  closed: 'Closed',
  'at-risk': 'At Risk',
  neutral: 'Draft',
};

/**
 * Badge — status indicator for M&A deal stages. An organism-level semantic token
 * (`color-bg-*` / `color-text-*`) drives every variant, so re-theming the whole
 * system (or swapping to dark mode) never requires touching this component.
 */
export function Badge({ status, className = '', children, ...props }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-3 py-1 text-label-md font-medium',
        statusClasses[status],
        className,
      ].join(' ')}
      {...props}
    >
      {children ?? statusLabel[status]}
    </span>
  );
}
