import { useId, type ReactNode } from 'react';

export interface ZenSwitchProps {
  readonly checked: boolean;
  readonly onChange: (nextChecked: boolean) => void;
  readonly label: ReactNode;
  readonly description?: string;
  readonly disabled?: boolean;
  readonly className?: string;
}

export function ZenSwitch({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  className = '',
}: ZenSwitchProps) {
  const labelId = useId();
  return (
    <div
      data-zen-occlude="true"
      className={`flex items-center justify-between gap-4 ${className}`.trim()}
    >
      <div className="min-w-0">
        <div
          id={labelId}
          className="text-sm font-medium text-[var(--zen-ink-primary)]"
        >
          {label}
        </div>
        {description && (
          <div className="zen-font-mono text-[11px] text-[var(--zen-ink-muted)] mt-0.5">
            {description}
          </div>
        )}
      </div>

      <button
        type="button"
        role="switch"
        aria-labelledby={labelId}
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`zen-focus-ring relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors cursor-pointer ${
          checked
            ? 'bg-[var(--zen-accent-primary)] border-[var(--zen-accent-primary)]'
            : 'bg-[var(--zen-surface-subtle)] border-[var(--zen-border-control)]'
        } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
      >
        <span
          className={`inline-block h-4 w-4 rounded-full transition-transform ${
            checked
              ? 'translate-x-5 bg-[var(--zen-ink-on-accent)]'
              : 'translate-x-1 bg-[var(--zen-ink-primary)]'
          }`}
        />
      </button>
    </div>
  );
}
