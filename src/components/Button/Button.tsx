import type { ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * Visual treatment. Maps 1:1 to the "Style" variant property on the Button component set
 * in Figma (OrgLab Design System, node 1:1989): Contained, Outlined, Text.
 * (Named `variant` here rather than `style` to avoid colliding with the native DOM `style` prop.)
 *
 * `critical` is a product extension for destructive actions (e.g. "Withdraw offer") that is
 * not yet a documented variant in the Figma component set — kept here deliberately, flagged
 * for the design system to formalize later rather than silently folded in as if it were spec.
 */
export type ButtonVariant = 'contained' | 'outlined' | 'text' | 'critical';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /**
   * Shows a spinner in place of the button's children and disables interaction — matches
   * Figma's documented "Loading" state (present for every style/variant).
   */
  loading?: boolean;
  /** Text shown next to the spinner while `loading` is true. Matches Figma's `loadingText` prop. */
  loadingText?: string;
  children: ReactNode;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-label-md',
  md: 'px-4 py-2 text-label-lg',
  lg: 'px-5 py-3 text-body-lg',
};

// Colors below are taken directly from the Figma component's design-context export (they
// resolve to the same semantic tokens already used elsewhere — e.g. contained default =
// --color-bg-primary, hover = --color-bg-primary-hover). Figma's "Focused" state uses the
// pressed color for Contained and the subtle background for Outlined/Text — mapped here to
// :active, since a literal press is the closest web equivalent.
//
// Split into interactive vs. disabled-look classes rather than using the `disabled:` pseudo
// variant, because Figma's Loading state stays full-color (it's non-interactive but not
// "disabled" visually) — only the real Disabled state should gray out.
const interactiveClasses: Record<ButtonVariant, string> = {
  contained: 'bg-bg-primary text-text-on-primary hover:bg-bg-primary-hover active:bg-bg-primary-pressed',
  outlined: 'bg-transparent text-text-primary border border-border-primary hover:bg-bg-primary-subtle active:bg-bg-primary-subtle',
  text: 'bg-transparent text-text-primary hover:bg-bg-primary-subtle active:bg-bg-primary-subtle',
  critical: 'bg-bg-critical text-text-critical border border-border-critical hover:opacity-90',
};

const disabledClasses: Record<ButtonVariant, string> = {
  contained: 'bg-bg-disabled text-text-disabled',
  outlined: 'bg-transparent text-text-disabled border border-border-disabled',
  text: 'bg-transparent text-text-disabled',
  critical: 'bg-bg-critical text-text-critical border border-border-critical opacity-40',
};

function Spinner() {
  return (
    <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
    </svg>
  );
}

/**
 * Button — primary interactive element for triggering an action.
 * Fully token-driven: colors, spacing, and typography all resolve to CSS custom
 * properties generated from Figma Variables (see src/tokens/).
 *
 * `variant`, `loading`, and `loadingText` mirror the real "Button" component set defined in
 * Figma (Style: Contained/Outlined/Text; State: Default/Hover/Focused/Disabled/Loading).
 */
export function Button({
  variant = 'contained',
  size = 'md',
  loading = false,
  loadingText = 'Loading',
  className = '',
  disabled,
  children,
  ...props
}: ButtonProps) {
  // Disabled (grayed out, matches Figma's Disabled state) vs. Loading (stays full-color,
  // matches Figma's Loading state) are visually distinct even though both are non-interactive.
  const isVisuallyDisabled = Boolean(disabled) && !loading;

  return (
    <button
      className={[
        'inline-flex items-center justify-center gap-2 rounded-sm font-medium uppercase tracking-[0.15px] transition-colors',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-primary',
        'disabled:cursor-not-allowed disabled:pointer-events-none',
        sizeClasses[size],
        isVisuallyDisabled ? disabledClasses[variant] : interactiveClasses[variant],
        className,
      ].join(' ')}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <>
          <Spinner />
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}
