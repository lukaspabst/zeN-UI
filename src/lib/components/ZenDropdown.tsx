import {
  useState,
  useRef,
  useEffect,
  useId,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface ZenDropdownOption<T extends string> {
  readonly value: T;
  readonly label: string;
  readonly description?: string;
  readonly icon?: ReactNode;
  readonly disabled?: boolean;
}

export interface ZenDropdownProps<T extends string> {
  readonly label?: string;
  readonly options: readonly ZenDropdownOption<T>[];
  readonly value: T;
  readonly onChange: (nextValue: T) => void;
  readonly ariaLabel?: string;
  readonly align?: 'start' | 'end';
  readonly className?: string;
}

export function ZenDropdown<T extends string>({
  label,
  options,
  value,
  onChange,
  ariaLabel,
  align = 'start',
  className = '',
}: ZenDropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(() =>
    Math.max(
      0,
      options.findIndex((o) => o.value === value)
    )
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxId = useId();

  const selectedOption =
    options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    const idx = options.findIndex((o) => o.value === value);
    if (idx !== -1) {
      setActiveIndex(idx);
    }
  }, [value, options]);

  useEffect(() => {
    if (!open) return;
    const handlePointerDownOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    window.addEventListener('mousedown', handlePointerDownOutside);
    return () =>
      window.removeEventListener('mousedown', handlePointerDownOutside);
  }, [open]);

  const commitSelection = (nextValue: T) => {
    onChange(nextValue);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % options.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + options.length) % options.length);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const candidate = options[activeIndex];
      if (candidate && !candidate.disabled) {
        commitSelection(candidate.value);
      }
    } else if (e.key === 'Tab') {
      setOpen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      data-zen-occlude="true"
      className={`relative flex flex-col gap-1.5 min-w-0 ${className}`.trim()}
    >
      {label && (
        <span className="zen-telemetry-label text-[var(--zen-ink-secondary)]">
          {label}
        </span>
      )}

      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-label={ariaLabel ?? label}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        className="zen-focus-ring flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-[var(--zen-surface-1)] border border-[var(--zen-border-default)] hover:border-[var(--zen-border-strong)] text-left text-xs sm:text-sm text-[var(--zen-ink-primary)] cursor-pointer transition-colors"
      >
        <span className="inline-flex items-center gap-2 truncate min-w-0">
          {selectedOption?.icon && (
            <span className="text-[var(--zen-accent-primary)] shrink-0">
              {selectedOption.icon}
            </span>
          )}
          <span className="zen-font-mono font-medium truncate">
            {selectedOption?.label}
          </span>
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[var(--zen-ink-muted)] shrink-0 transition-transform ${
            open ? 'rotate-180 text-[var(--zen-accent-primary)]' : ''
          }`}
        />
      </button>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label={ariaLabel ?? label}
          className={`absolute z-50 top-full mt-2 w-full max-w-[calc(100vw-2rem)] max-h-64 overflow-y-auto p-1.5 rounded-2xl bg-[var(--zen-bg-elevated)] border border-[var(--zen-border-strong)] shadow-[var(--zen-shadow-hud)] backdrop-blur-xl ${
            align === 'end' ? 'right-0' : 'left-0'
          }`}
        >
          {options.map((opt, idx) => {
            const isSelected = opt.value === value;
            const isFocused = idx === activeIndex;
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                aria-disabled={opt.disabled}
                onMouseEnter={() => setActiveIndex(idx)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  if (!opt.disabled) {
                    commitSelection(opt.value);
                  }
                }}
                className={`flex items-center justify-between gap-3 px-3 py-2 rounded-xl cursor-pointer transition-colors ${
                  isFocused
                    ? 'bg-[var(--zen-accent-subtle)] text-[var(--zen-ink-primary)]'
                    : 'text-[var(--zen-ink-secondary)]'
                } ${opt.disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {opt.icon && (
                    <span className="text-[var(--zen-accent-primary)] shrink-0">
                      {opt.icon}
                    </span>
                  )}
                  <div className="min-w-0">
                    <div className="zen-font-mono text-xs font-medium truncate">
                      {opt.label}
                    </div>
                    {opt.description && (
                      <div className="text-[11px] text-[var(--zen-ink-muted)] truncate">
                        {opt.description}
                      </div>
                    )}
                  </div>
                </div>
                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-[var(--zen-accent-primary)] shrink-0" />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
