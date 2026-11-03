import {
  useId,
  useRef,
  useEffect,
  useState,
  type ChangeEvent,
  type TextareaHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
  type DragEvent,
} from 'react';
import { Minus, Plus, Check, UploadCloud, FileText, X } from 'lucide-react';
import { capri } from '../capri/capri-engine';

export interface ZenTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  readonly label: string;
  readonly hint?: string;
  readonly error?: string;
  readonly maxLengthCount?: number;
  readonly mono?: boolean;
  readonly capriGuard?: boolean;
}

export function ZenTextarea({
  label,
  hint,
  error,
  maxLengthCount,
  mono = false,
  capriGuard = true,
  id,
  value,
  defaultValue,
  onChange,
  className = '',
  ...rest
}: ZenTextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const descId = `${textareaId}-desc`;
  const [internalVal, setInternalVal] = useState<string>(
    typeof defaultValue === 'string' ? defaultValue : ''
  );

  const liveText =
    typeof value === 'string'
      ? value
      : typeof value === 'number'
        ? String(value)
        : internalVal;
  const currentLength = liveText.length;

  const securityScan = capriGuard ? capri.scanInputSecurity(liveText) : null;
  const guardError =
    securityScan && !securityScan.safe && securityScan.threats[0]
      ? `CAPRI GUARD BLOCKED [${securityScan.threats[0].category}]: ${securityScan.threats[0].patternName}`
      : undefined;
  const activeError = error || guardError;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (value === undefined) {
      setInternalVal(e.target.value);
    }
    onChange?.(e);
  };

  return (
    <div
      data-zen-occlude="true"
      className={`flex flex-col gap-1.5 ${className}`.trim()}
    >
      <div className="flex items-center justify-between gap-2">
        <label
          htmlFor={textareaId}
          className="zen-telemetry-label text-[var(--zen-ink-secondary)]"
        >
          {label}
        </label>
        {maxLengthCount !== undefined && (
          <span className="zen-telemetry-label">
            {currentLength} / {maxLengthCount}
          </span>
        )}
      </div>

      <textarea
        id={textareaId}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        maxLength={maxLengthCount}
        aria-invalid={Boolean(activeError)}
        aria-describedby={activeError || hint ? descId : undefined}
        data-capri-threat={
          securityScan && !securityScan.safe && securityScan.threats[0]
            ? securityScan.threats[0].category
            : undefined
        }
        className={`w-full min-h-24 px-3.5 py-2.5 rounded-xl bg-[var(--zen-surface-1)] border text-sm text-[var(--zen-ink-primary)] placeholder:text-[var(--zen-ink-muted)] focus:outline-none transition-colors ${
          activeError
            ? 'border-[var(--zen-status-danger)]'
            : 'border-[var(--zen-border-default)] focus:border-[var(--zen-accent-primary)]'
        } ${mono ? 'zen-font-mono' : 'zen-font-sans'}`}
        {...rest}
      />

      {(activeError || hint) && (
        <span
          id={descId}
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

export interface ZenNumberStepperProps {
  readonly label: string;
  readonly value: number;
  readonly onChange: (next: number) => void;
  readonly min?: number;
  readonly max?: number;
  readonly step?: number;
  readonly unit?: string;
  readonly disabled?: boolean;
  readonly className?: string;
}

export function ZenNumberStepper({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit,
  disabled = false,
  className = '',
}: ZenNumberStepperProps) {
  const precision = useId();
  const decimals = (() => {
    const s = String(step);
    const dot = s.indexOf('.');
    return dot === -1 ? 0 : s.length - dot - 1;
  })();

  const clampAndRound = (raw: number) => {
    const clamped = Math.max(min, Math.min(max, raw));
    return Number(clamped.toFixed(decimals));
  };

  const handleStep = (delta: number) => {
    if (disabled) return;
    onChange(clampAndRound(value + delta * step));
  };

  return (
    <div
      data-zen-occlude="true"
      className={`flex flex-col gap-1.5 ${className}`.trim()}
    >
      <span
        id={precision}
        className="zen-telemetry-label text-[var(--zen-ink-secondary)]"
      >
        {label}
      </span>
      <div className="inline-flex items-center justify-between gap-2 p-1.5 rounded-xl bg-[var(--zen-surface-1)] border border-[var(--zen-border-default)]">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          disabled={disabled || value <= min}
          onClick={() => handleStep(-1)}
          className="zen-focus-ring p-2 rounded-lg bg-[var(--zen-surface-subtle)] hover:bg-[var(--zen-accent-subtle)] text-[var(--zen-ink-primary)] disabled:opacity-35 cursor-pointer transition-colors"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>

        <div
          role="spinbutton"
          tabIndex={disabled ? -1 : 0}
          aria-labelledby={precision}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'ArrowUp') {
              e.preventDefault();
              handleStep(1);
            } else if (e.key === 'ArrowDown') {
              e.preventDefault();
              handleStep(-1);
            }
          }}
          className="zen-focus-ring px-3 py-1 rounded-lg zen-font-mono text-sm font-semibold text-[var(--zen-ink-primary)] text-center min-w-20"
        >
          {value.toFixed(decimals)}
          {unit ? (
            <span className="ml-1 text-xs text-[var(--zen-ink-muted)]">
              {unit}
            </span>
          ) : null}
        </div>

        <button
          type="button"
          aria-label={`Increase ${label}`}
          disabled={disabled || value >= max}
          onClick={() => handleStep(1)}
          className="zen-focus-ring p-2 rounded-lg bg-[var(--zen-surface-subtle)] hover:bg-[var(--zen-accent-subtle)] text-[var(--zen-ink-primary)] disabled:opacity-35 cursor-pointer transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export interface ZenCheckboxProps {
  readonly checked: boolean;
  readonly indeterminate?: boolean;
  readonly onChange: (nextChecked: boolean) => void;
  readonly label: ReactNode;
  readonly description?: string;
  readonly disabled?: boolean;
  readonly className?: string;
}

export function ZenCheckbox({
  checked,
  indeterminate = false,
  onChange,
  label,
  description,
  disabled = false,
  className = '',
}: ZenCheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <label
      htmlFor={id}
      data-zen-occlude="true"
      className={`flex items-start gap-3 cursor-pointer select-none ${
        disabled ? 'opacity-45 cursor-not-allowed' : ''
      } ${className}`.trim()}
    >
      <div className="relative flex items-center justify-center mt-0.5">
        <input
          ref={inputRef}
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          aria-checked={indeterminate ? 'mixed' : checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <span
          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--zen-accent-focus)] peer-focus-visible:outline-offset-2 ${
            checked || indeterminate
              ? 'bg-[var(--zen-accent-primary)] border-[var(--zen-accent-primary)] text-[var(--zen-ink-on-accent)]'
              : 'bg-[var(--zen-surface-1)] border-[var(--zen-border-control)]'
          }`}
        >
          {indeterminate ? (
            <Minus className="w-3.5 h-3.5 stroke-[3]" />
          ) : checked ? (
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          ) : null}
        </span>
      </div>
      <div className="min-w-0">
        <div className="text-sm font-medium text-[var(--zen-ink-primary)]">
          {label}
        </div>
        {description && (
          <div className="zen-font-mono text-[11px] text-[var(--zen-ink-muted)] mt-0.5">
            {description}
          </div>
        )}
      </div>
    </label>
  );
}

export interface ZenRadioOption<T extends string> {
  readonly value: T;
  readonly label: string;
  readonly description?: string;
  readonly badge?: string;
  readonly disabled?: boolean;
}

export interface ZenRadioGroupProps<T extends string> {
  readonly label: string;
  readonly options: readonly ZenRadioOption<T>[];
  readonly value: T;
  readonly onChange: (nextValue: T) => void;
  readonly className?: string;
}

export function ZenRadioGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  className = '',
}: ZenRadioGroupProps<T>) {
  const groupId = useId();
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const enabledIndices = options
    .map((o, idx) => (o.disabled ? -1 : idx))
    .filter((idx) => idx !== -1);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    const pos = enabledIndices.indexOf(idx);
    if (pos === -1) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIdx = enabledIndices[(pos + 1) % enabledIndices.length];
      btnRefs.current[nextIdx]?.focus();
      onChange(options[nextIdx].value);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIdx =
        enabledIndices[
          (pos - 1 + enabledIndices.length) % enabledIndices.length
        ];
      btnRefs.current[prevIdx]?.focus();
      onChange(options[prevIdx].value);
    }
  };

  return (
    <div
      role="radiogroup"
      aria-labelledby={groupId}
      data-zen-occlude="true"
      className={`space-y-2 ${className}`.trim()}
    >
      <div
        id={groupId}
        className="zen-telemetry-label text-[var(--zen-ink-secondary)]"
      >
        {label}
      </div>
      <div className="grid grid-cols-1 gap-2">
        {options.map((opt, idx) => {
          const isSelected = opt.value === value;
          return (
            <button
              key={opt.value}
              ref={(el) => {
                btnRefs.current[idx] = el;
              }}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={opt.disabled}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => onChange(opt.value)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`zen-focus-ring flex items-center justify-between gap-3 p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                isSelected
                  ? 'bg-[var(--zen-accent-subtle)] border-[var(--zen-accent-border)]'
                  : 'bg-[var(--zen-surface-1)] border-[var(--zen-border-subtle)] hover:border-[var(--zen-border-strong)]'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <span
                  className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'border-[var(--zen-accent-primary)]'
                      : 'border-[var(--zen-border-control)]'
                  }`}
                >
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[var(--zen-accent-primary)]" />
                  )}
                </span>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-semibold text-[var(--zen-ink-primary)]">
                    {opt.label}
                  </div>
                  {opt.description && (
                    <div className="zen-font-mono text-[11px] text-[var(--zen-ink-muted)] mt-0.5">
                      {opt.description}
                    </div>
                  )}
                </div>
              </div>
              {opt.badge && (
                <span className="zen-telemetry-label text-[var(--zen-accent-primary)] shrink-0">
                  {opt.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export interface ZenSliderProps {
  readonly label: string;
  readonly value: number;
  readonly onChange: (next: number) => void;
  readonly min?: number;
  readonly max?: number;
  readonly step?: number;
  readonly formatValue?: (val: number) => string;
  readonly disabled?: boolean;
  readonly className?: string;
}

export function ZenSlider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  formatValue,
  disabled = false,
  className = '',
}: ZenSliderProps) {
  const id = useId();
  const pct = Math.max(
    0,
    Math.min(100, ((value - min) / Math.max(max - min, 1e-6)) * 100)
  );

  return (
    <div
      data-zen-occlude="true"
      className={`flex flex-col gap-2 ${className}`.trim()}
    >
      <div className="flex items-center justify-between gap-2">
        <label
          htmlFor={id}
          className="zen-telemetry-label text-[var(--zen-ink-secondary)]"
        >
          {label}
        </label>
        <span className="zen-font-mono text-xs font-semibold text-[var(--zen-accent-primary)]">
          {formatValue ? formatValue(value) : value}
        </span>
      </div>

      <div className="relative flex items-center">
        <div className="w-full h-2 rounded-full bg-[var(--zen-surface-subtle)] border border-[var(--zen-border-subtle)] overflow-hidden">
          <div
            style={{ width: `${pct}%` }}
            className="h-full bg-[var(--zen-accent-primary)] transition-all duration-75"
          />
        </div>
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
}

export interface ZenChipOption<T extends string> {
  readonly value: T;
  readonly label: string;
}

export interface ZenChipFilterProps<T extends string> {
  readonly label?: string;
  readonly options: readonly ZenChipOption<T>[];
  readonly selected: readonly T[];
  readonly onChange: (nextSelected: readonly T[]) => void;
  readonly className?: string;
}

export function ZenChipFilter<T extends string>({
  label,
  options,
  selected,
  onChange,
  className = '',
}: ZenChipFilterProps<T>) {
  const toggleChip = (val: T) => {
    if (selected.includes(val)) {
      onChange(selected.filter((item) => item !== val));
    } else {
      onChange([...selected, val]);
    }
  };

  return (
    <div
      data-zen-occlude="true"
      className={`space-y-2 ${className}`.trim()}
    >
      {label && (
        <div className="zen-telemetry-label text-[var(--zen-ink-secondary)]">
          {label}
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = selected.includes(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              aria-pressed={active}
              onClick={() => toggleChip(opt.value)}
              className={`zen-focus-ring px-3 py-1.5 rounded-full border zen-font-mono text-xs inline-flex items-center gap-1.5 cursor-pointer transition-all ${
                active
                  ? 'bg-[var(--zen-accent-primary)] text-[var(--zen-ink-on-accent)] border-[var(--zen-accent-primary)] font-semibold'
                  : 'bg-[var(--zen-surface-subtle)] text-[var(--zen-ink-secondary)] border-[var(--zen-border-default)] hover:border-[var(--zen-accent-border)]'
              }`}
            >
              {active && <Check className="w-3 h-3" />}
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export interface ZenUploadedFile {
  readonly name: string;
  readonly sizeBytes: number;
}

export interface ZenFileUploadProps {
  readonly label: string;
  readonly acceptHint?: string;
  readonly files: readonly ZenUploadedFile[];
  readonly onFilesChange: (nextFiles: readonly ZenUploadedFile[]) => void;
  readonly className?: string;
}

export function ZenFileUpload({
  label,
  acceptHint = 'JSON, YAML, ICS, or PDF up to 25 MB',
  files,
  onFilesChange,
  className = '',
}: ZenFileUploadProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileList = (list: FileList | null) => {
    if (!list) return;
    const added: ZenUploadedFile[] = Array.from(list).map((f) => ({
      name: f.name,
      sizeBytes: f.size,
    }));
    onFilesChange([...files, ...added]);
  };

  return (
    <div
      data-zen-occlude="true"
      className={`space-y-2.5 ${className}`.trim()}
    >
      <span className="zen-telemetry-label text-[var(--zen-ink-secondary)]">
        {label}
      </span>

      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e: DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e: DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          setDragging(false);
          handleFileList(e.dataTransfer.files);
        }}
        className={`zen-focus-ring p-5 rounded-2xl border border-dashed text-center cursor-pointer transition-all ${
          dragging
            ? 'border-[var(--zen-accent-primary)] bg-[var(--zen-accent-subtle)]'
            : 'border-[var(--zen-border-strong)] bg-[var(--zen-surface-subtle)] hover:border-[var(--zen-accent-border)]'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          aria-label={label}
          multiple
          onChange={(e) => handleFileList(e.target.files)}
          className="sr-only"
        />
        <UploadCloud className="w-6 h-6 text-[var(--zen-accent-primary)] mx-auto mb-2" />
        <div className="text-xs sm:text-sm font-semibold text-[var(--zen-ink-primary)]">
          Drop artifacts here or click to browse
        </div>
        <div className="zen-font-mono text-[11px] text-[var(--zen-ink-muted)] mt-0.5">
          {acceptHint}
        </div>
      </div>

      {files.length > 0 && (
        <ul className="space-y-1.5">
          {files.map((f, idx) => (
            <li
              key={`${f.name}-${idx}`}
              className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-[var(--zen-surface-1)] border border-[var(--zen-border-subtle)] text-xs"
            >
              <span className="inline-flex items-center gap-2 truncate zen-font-mono">
                <FileText className="w-3.5 h-3.5 text-[var(--zen-accent-primary)] shrink-0" />
                <span className="truncate">{f.name}</span>
              </span>
              <button
                type="button"
                aria-label={`Remove ${f.name}`}
                onClick={() =>
                  onFilesChange(files.filter((_, i) => i !== idx))
                }
                className="text-[var(--zen-ink-muted)] hover:text-[var(--zen-status-danger)] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
