import { useId, type InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  /** Helper text shown below the input. */
  helperText?: string;
  /** Marks the field as invalid and switches helper text to the critical semantic color. */
  error?: boolean;
}

/**
 * Input — labeled text field molecule (Label + Input + Helper text).
 * Demonstrates the semantic error state driven by `color-border-critical` /
 * `color-text-critical` tokens rather than a hard-coded red.
 */
export function Input({ label, helperText, error = false, id, className = '', ...props }: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-label-lg font-medium text-text">
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={error || undefined}
        aria-describedby={helperText ? `${inputId}-helper` : undefined}
        className={[
          'rounded-md border bg-bg-surface-raised px-3 py-2 text-body-md text-text outline-none transition-colors',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-primary',
          error ? 'border-border-critical' : 'border-border',
          className,
        ].join(' ')}
        {...props}
      />
      {helperText && (
        <span id={`${inputId}-helper`} className={`text-label-md ${error ? 'text-text-critical' : 'text-text-muted'}`}>
          {helperText}
        </span>
      )}
    </div>
  );
}
