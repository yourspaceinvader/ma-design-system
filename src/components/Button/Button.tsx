import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'critical';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. `primary` for the main action, `secondary` for less emphasis, `critical` for destructive actions. */
  variant?: ButtonVariant;
  /** Button size. */
  size?: ButtonSize;
  children: ReactNode;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-label-md',
  md: 'px-4 py-2 text-label-lg',
  lg: 'px-5 py-3 text-body-lg',
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-bg-primary text-text-on-primary hover:bg-bg-primary-hover active:bg-bg-primary-pressed disabled:opacity-40',
  secondary:
    'bg-transparent text-text border border-border hover:bg-bg-surface-raised disabled:opacity-40',
  critical:
    'bg-bg-critical text-text-critical border border-border-critical hover:opacity-90 disabled:opacity-40',
};

/**
 * Button — primary interactive element for triggering an action.
 * Fully token-driven: colors, spacing, and typography all resolve to CSS custom
 * properties generated from Figma Variables (see src/tokens/).
 */
export function Button({ variant = 'primary', size = 'md', className = '', ...props }: ButtonProps) {
  return (
    <button
      className={[
        'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-primary',
        'disabled:cursor-not-allowed',
        sizeClasses[size],
        variantClasses[variant],
        className,
      ].join(' ')}
      {...props}
    />
  );
}
