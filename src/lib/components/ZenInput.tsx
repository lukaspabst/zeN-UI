import {
  useId,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { capri } from '../capri/capri-engine';

export interface ZenInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  readonly label: string;
  readonly hint?: string;
  readonly error?: string;
  readonly iconLeft?: ReactNode;
  readonly iconRight?: ReactNode;
  readonly mono?: boolean;
  readonly capriGuard?: boolean;
}

export function ZenInput({
  label,
  hint,
  error,
  iconLeft,
  iconRight,
  mono = false,
  capriGuard = true,
  id,
  value,
  defaultValue,
  onChange,
  className = '',
  ...rest
}: ZenInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = `${inputId}-desc`;
  const [internalVal, setInternalVal] = useState<string>(
    typeof defaultValue === 'string' ? defaultValue : ''
  );

  const liveText =
    typeof value === 'string'
      ? value
      : typeof value === 'number'
        ? String(value)
        : internalVal;

  const securityScan = capriGuard ? capri.scanInputSecurity(liveText) : null;
  const guardError =
    securityScan && !securityScan.safe && securityScan.threats[0]
      ? `CAPRI GUARD BLOCKED [${securityScan.threats[0].category}]: ${securityScan.threats[0].patternName}`
      : undefined;
  const activeError = error || guardError;
  const hasDescription = Boolean(activeError || hint);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) {
      setInternalVal(e.target.value);
    }
    onChange?.(e);
  };

  return (
    <div data-zen-occlude="true" className={`flex flex-col gap-1.5 ${className}`.trim()}>
      <label
        htmlFor={inputId}
        className="zen-telemetry-label text-[var(--zen-ink-secondary)]"
      >
        {label}
      </label>

      <div
        className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[var(--zen-surface-1)] border transition-colors ${
          activeError
            ? 'border-[var(--zen-status-danger)]'
            : 'border-[var(--zen-border-default)] focus-within:border-[var(--zen-accent-primary)]'
        }`}
      >
        {iconLeft && (
          <span className="text-[var(--zen-ink-muted)] shrink-0">{iconLeft}</span>
        )}
        <input
          id={inputId}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          aria-invalid={Boolean(activeError)}
          aria-describedby={hasDescription ? descriptionId : undefined}
          data-capri-threat={
            securityScan && !securityScan.safe && securityScan.threats[0]
              ? securityScan.threats[0].category
              : undefined
          }
          className={`w-full bg-transparent text-sm text-[var(--zen-ink-primary)] placeholder:text-[var(--zen-ink-muted)] focus:outline-none ${
            mono ? 'zen-font-mono' : 'zen-font-sans'
          }`}
          {...rest}
        />
        {iconRight && (
          <span className="text-[var(--zen-ink-muted)] shrink-0">{iconRight}</span>
        )}
      </div>

      {hasDescription && (
        <span
          id={descriptionId}
          className={`zen-font-mono text-[11px] ${
            activeError
              ? 'text-[var(--zen-status-danger)]'
              : 'text-[var(--zen-ink-muted)]'
          }`}
        >
          {activeError ?? hint}
        </span>
      )}
    </div>
  );
}
