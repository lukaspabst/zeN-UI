import type { HTMLAttributes, KeyboardEvent, ReactNode } from 'react';
import { ZenIcon } from './ZenIcon';

export type ZenCardVariant = 'static' | 'interactive' | 'selected';
export type ZenCardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface ZenCardProps extends HTMLAttributes<HTMLDivElement> {
  readonly variant?: ZenCardVariant;
  readonly selected?: boolean;
  readonly disabled?: boolean;
  readonly padding?: ZenCardPadding;
  readonly onSelect?: () => void;
  readonly selectOnHover?: boolean;
  readonly children: ReactNode;
}

const PADDING_MAP: Record<ZenCardPadding, string> = {
  none: 'p-0',
  sm: 'p-3.5 sm:p-5',
  md: 'p-4 sm:p-6 lg:p-8',
  lg: 'p-5 sm:p-8 lg:p-12',
};

export function ZenCard({
  variant = 'static',
  selected = false,
  disabled = false,
  padding = 'md',
  onSelect,
  selectOnHover = false,
  className = '',
  children,
  onClick,
  onMouseEnter,
  onKeyDown,
  ...rest
}: ZenCardProps) {
  const isInteractive = variant === 'interactive' || Boolean(onSelect);
  const isSelected = selected || variant === 'selected';

  const surfaceClass = isInteractive
    ? 'zen-surface-interactive zen-focus-ring cursor-pointer'
    : isSelected
      ? 'zen-surface-selected'
      : 'zen-surface-static';

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    if (!disabled && isInteractive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onSelect?.();
    }
  };

  return (
    <div
      data-zen-occlude="true"
      data-selected={isSelected ? 'true' : 'false'}
      data-disabled={disabled ? 'true' : 'false'}
      role={isInteractive ? 'button' : undefined}
      aria-pressed={isInteractive ? isSelected : undefined}
      aria-disabled={disabled ? true : undefined}
      tabIndex={isInteractive && !disabled ? 0 : undefined}
      onClick={(e) => {
        onClick?.(e);
        if (!disabled) {
          onSelect?.();
        }
      }}
      onMouseEnter={(e) => {
        onMouseEnter?.(e);
        if (!disabled && selectOnHover) {
          onSelect?.();
        }
      }}
      onKeyDown={handleKeyDown}
      className={`rounded-3xl ${surfaceClass} ${PADDING_MAP[padding]} ${
        disabled ? 'opacity-50 pointer-events-none' : ''
      } ${className}`.trim()}
      {...rest}
    >
      {children}
    </div>
  );
}

export interface ZenMetricItem {
  readonly value: string;
  readonly label: string;
  readonly accent?: boolean;
}

export interface ZenMetricStripProps {
  readonly metrics: readonly ZenMetricItem[];
  readonly columns?: 2 | 3 | 4;
  readonly className?: string;
}

export function ZenMetricStrip({
  metrics,
  columns = 4,
  className = '',
}: ZenMetricStripProps) {
  const colClass =
    columns === 2
      ? 'grid-cols-2'
      : columns === 3
        ? 'grid-cols-2 sm:grid-cols-3'
        : 'grid-cols-2 sm:grid-cols-4';

  return (
    <div
      className={`grid ${colClass} gap-2.5 p-3 rounded-2xl bg-[var(--zen-surface-subtle)] border border-[var(--zen-border-subtle)] text-center ${className}`.trim()}
    >
      {metrics.map((m) => (
        <div key={m.label}>
          <div
            className={`zen-font-display font-bold text-xs sm:text-sm ${
              m.accent
                ? 'text-[var(--zen-accent-primary)]'
                : 'text-[var(--zen-ink-primary)]'
            }`}
          >
            {m.value}
          </div>
          <div className="zen-telemetry-label mt-0.5">{m.label}</div>
        </div>
      ))}
    </div>
  );
}

export interface ZenArchitectureNoteProps {
  readonly label?: string;
  readonly children: ReactNode;
  readonly className?: string;
}

export function ZenArchitectureNote({
  label = 'SYSTEM ARCHITECTURE NOTE',
  children,
  className = '',
}: ZenArchitectureNoteProps) {
  return (
    <div
      className={`p-4 rounded-2xl bg-[var(--zen-surface-subtle)] border border-[var(--zen-border-default)] ${className}`.trim()}
    >
      <div className="zen-telemetry-label text-[var(--zen-accent-secondary)] mb-1">
        {label}
      </div>
      <p className="text-sm leading-relaxed text-[var(--zen-ink-secondary)]">
        {children}
      </p>
    </div>
  );
}

export interface ZenCheckListProps {
  readonly items: readonly string[];
  readonly className?: string;
}

export function ZenCheckList({ items, className = '' }: ZenCheckListProps) {
  return (
    <ul className={`space-y-2 ${className}`.trim()}>
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2 text-xs sm:text-sm text-[var(--zen-ink-secondary)]"
        >
          <ZenIcon
            name="success"
            size="sm"
            tone="accent"
            className="mt-0.5"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
