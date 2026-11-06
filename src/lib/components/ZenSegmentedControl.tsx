import { useRef, type KeyboardEvent, type ReactNode } from 'react';

export interface ZenSegmentItem<T extends string> {
  readonly value: T;
  readonly label: ReactNode;
  readonly icon?: ReactNode;
  readonly count?: string | number;
  readonly disabled?: boolean;
}

export interface ZenSegmentedControlProps<T extends string> {
  readonly items: readonly ZenSegmentItem<T>[];
  readonly value: T;
  readonly onChange: (nextValue: T) => void;
  readonly ariaLabel: string;
  readonly size?: 'sm' | 'md';
  readonly className?: string;
}

export function ZenSegmentedControl<T extends string>({
  items,
  value,
  onChange,
  ariaLabel,
  size = 'md',
  className = '',
}: ZenSegmentedControlProps<T>) {
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const enabledIndices = items
    .map((item, idx) => (item.disabled ? -1 : idx))
    .filter((idx) => idx !== -1);

  const focusAndSelect = (targetIdx: number) => {
    const target = items[targetIdx];
    if (!target || target.disabled) return;
    buttonRefs.current[targetIdx]?.focus();
    onChange(target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    const pos = enabledIndices.indexOf(idx);
    if (pos === -1) return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIdx = enabledIndices[(pos + 1) % enabledIndices.length];
      focusAndSelect(nextIdx);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIdx =
        enabledIndices[
          (pos - 1 + enabledIndices.length) % enabledIndices.length
        ];
      focusAndSelect(prevIdx);
    } else if (e.key === 'Home') {
      e.preventDefault();
      focusAndSelect(enabledIndices[0]);
    } else if (e.key === 'End') {
      e.preventDefault();
      focusAndSelect(enabledIndices[enabledIndices.length - 1]);
    }
  };

  const padClass = size === 'sm' ? 'px-2.5 sm:px-3 py-1.5 text-[11px]' : 'px-3.5 sm:px-4 py-2 text-xs';

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      data-zen-occlude="true"
      className={`inline-flex flex-wrap items-center gap-1.5 p-1.5 max-w-full rounded-2xl zen-surface-static ${className}`.trim()}
    >
      {items.map((item, idx) => {
        const isSelected = item.value === value;
        return (
          <button
            key={item.value}
            ref={(el) => {
              buttonRefs.current[idx] = el;
            }}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={item.disabled}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onChange(item.value)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={`zen-focus-ring rounded-xl zen-font-mono ${padClass} inline-flex items-center gap-1.5 transition-all cursor-pointer ${
              isSelected
                ? 'bg-[var(--zen-accent-primary)] text-[var(--zen-ink-on-accent)] font-semibold shadow-sm'
                : 'text-[var(--zen-ink-secondary)] hover:text-[var(--zen-ink-primary)] hover:bg-[var(--zen-surface-subtle)]'
            } ${item.disabled ? 'opacity-40 cursor-not-allowed' : ''}`.trim()}
          >
            {item.icon && <span className="shrink-0 inline-flex">{item.icon}</span>}
            <span>{item.label}</span>
            {item.count !== undefined && (
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isSelected
                    ? 'bg-black/20 text-[var(--zen-ink-on-accent)]'
                    : 'bg-[var(--zen-surface-subtle)] text-[var(--zen-ink-muted)]'
                }`}
              >
                {item.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
