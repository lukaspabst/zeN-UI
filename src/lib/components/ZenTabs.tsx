import { useRef, type KeyboardEvent, type ReactNode } from 'react';

export interface ZenTabItem<T extends string> {
  readonly id: T;
  readonly label: ReactNode;
  readonly icon?: ReactNode;
  readonly badge?: string | number;
  readonly disabled?: boolean;
}

export interface ZenTabsProps<T extends string> {
  readonly tabs: readonly ZenTabItem<T>[];
  readonly activeTab: T;
  readonly onChange: (nextTab: T) => void;
  readonly ariaLabel: string;
  readonly className?: string;
}

export function ZenTabs<T extends string>({
  tabs,
  activeTab,
  onChange,
  ariaLabel,
  className = '',
}: ZenTabsProps<T>) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const enabledIndices = tabs
    .map((t, idx) => (t.disabled ? -1 : idx))
    .filter((idx) => idx !== -1);

  const focusAndActivate = (targetIdx: number) => {
    const target = tabs[targetIdx];
    if (!target || target.disabled) return;
    tabRefs.current[targetIdx]?.focus();
    onChange(target.id);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    const pos = enabledIndices.indexOf(idx);
    if (pos === -1) return;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIdx = enabledIndices[(pos + 1) % enabledIndices.length];
      focusAndActivate(nextIdx);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIdx =
        enabledIndices[
          (pos - 1 + enabledIndices.length) % enabledIndices.length
        ];
      focusAndActivate(prevIdx);
    } else if (e.key === 'Home') {
      e.preventDefault();
      focusAndActivate(enabledIndices[0]);
    } else if (e.key === 'End') {
      e.preventDefault();
      focusAndActivate(enabledIndices[enabledIndices.length - 1]);
    }
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      data-zen-occlude="true"
      className={`flex flex-wrap items-center gap-1.5 max-w-full border-b border-[var(--zen-border-subtle)] pb-2 ${className}`.trim()}
    >
      {tabs.map((tab, idx) => {
        const isSelected = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[idx] = el;
            }}
            type="button"
            role="tab"
            aria-selected={isSelected}
            disabled={tab.disabled}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={`zen-focus-ring px-3 sm:px-4 py-2 rounded-xl zen-font-mono text-xs inline-flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
              isSelected
                ? 'bg-[var(--zen-accent-subtle)] text-[var(--zen-accent-primary)] border border-[var(--zen-accent-border)] font-semibold'
                : 'text-[var(--zen-ink-secondary)] hover:text-[var(--zen-ink-primary)] hover:bg-[var(--zen-surface-subtle)] border border-transparent'
            } ${tab.disabled ? 'opacity-40 cursor-not-allowed' : ''}`.trim()}
          >
            {tab.icon && <span className="shrink-0 inline-flex">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[var(--zen-surface-subtle)] text-[var(--zen-ink-muted)]">
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
