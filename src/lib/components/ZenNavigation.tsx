import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { ZenIcon } from './ZenIcon';

export interface ZenBreadcrumbItem {
  readonly id: string;
  readonly label: string;
  readonly href?: string;
  readonly onClick?: () => void;
}

export interface ZenBreadcrumbsProps {
  readonly items: readonly ZenBreadcrumbItem[];
  readonly className?: string;
}

export function ZenBreadcrumbs({ items, className = '' }: ZenBreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      data-zen-occlude="true"
      className={className}
    >
      <ol className="flex flex-wrap items-center gap-1.5 zen-font-mono text-xs">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={item.id} className="inline-flex items-center gap-1.5">
              {idx > 0 && (
                <ZenIcon
                  name="chevron-right"
                  size="sm"
                  tone="muted"
                />
              )}
              {isLast ? (
                <span
                  aria-current="page"
                  className="font-semibold text-[var(--zen-accent-primary)]"
                >
                  {item.label}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={item.onClick}
                  className="zen-focus-ring text-[var(--zen-ink-secondary)] hover:text-[var(--zen-ink-primary)] cursor-pointer transition-colors"
                >
                  {item.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export interface ZenPaginationProps {
  readonly currentPage: number;
  readonly totalPages: number;
  readonly onPageChange: (page: number) => void;
  readonly className?: string;
}

export function ZenPagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: ZenPaginationProps) {
  const safeTotal = Math.max(1, totalPages);
  const pages = Array.from({ length: safeTotal }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Pagination"
      data-zen-occlude="true"
      className={`inline-flex flex-wrap items-center gap-1.5 ${className}`.trim()}
    >
      <button
        type="button"
        aria-label="Previous page"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        className="zen-focus-ring p-2 rounded-xl border border-[var(--zen-border-default)] bg-[var(--zen-surface-1)] text-[var(--zen-ink-primary)] disabled:opacity-40 cursor-pointer"
      >
        <ZenIcon name="chevron-left" size="md" />
      </button>

      {pages.map((p) => {
        const isCurrent = p === currentPage;
        return (
          <button
            key={p}
            type="button"
            aria-current={isCurrent ? 'page' : undefined}
            onClick={() => onPageChange(p)}
            className={`zen-focus-ring min-w-9 h-9 px-2.5 rounded-xl zen-font-mono text-xs font-semibold cursor-pointer transition-all ${
              isCurrent
                ? 'bg-[var(--zen-accent-primary)] text-[var(--zen-ink-on-accent)] shadow-sm'
                : 'bg-[var(--zen-surface-1)] border border-[var(--zen-border-subtle)] text-[var(--zen-ink-secondary)] hover:text-[var(--zen-ink-primary)]'
            }`}
          >
            {p}
          </button>
        );
      })}

      <button
        type="button"
        aria-label="Next page"
        disabled={currentPage >= safeTotal}
        onClick={() => onPageChange(Math.min(safeTotal, currentPage + 1))}
        className="zen-focus-ring p-2 rounded-xl border border-[var(--zen-border-default)] bg-[var(--zen-surface-1)] text-[var(--zen-ink-primary)] disabled:opacity-40 cursor-pointer"
      >
        <ZenIcon name="chevron-right" size="md" />
      </button>
    </nav>
  );
}

export interface ZenStepItem {
  readonly id: string;
  readonly title: string;
  readonly subtitle?: string;
}

export interface ZenStepperProps {
  readonly steps: readonly ZenStepItem[];
  readonly activeStepIndex: number;
  readonly onStepClick?: (index: number) => void;
  readonly className?: string;
}

const STEP_GRID_COLS: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
};

export function ZenStepper({
  steps,
  activeStepIndex,
  onStepClick,
  className = '',
}: ZenStepperProps) {
  const colKey = Math.max(1, Math.min(4, steps.length));
  const gridClass = STEP_GRID_COLS[colKey] ?? STEP_GRID_COLS[4];

  return (
    <ol
      data-zen-occlude="true"
      className={`grid ${gridClass} gap-3 ${className}`.trim()}
    >
      {steps.map((step, idx) => {
        const isDone = idx < activeStepIndex;
        const isCurrent = idx === activeStepIndex;
        return (
          <li key={step.id} className="min-w-0">
            <button
              type="button"
              aria-current={isCurrent ? 'step' : undefined}
              onClick={() => onStepClick?.(idx)}
              className={`zen-focus-ring w-full p-3.5 rounded-2xl border text-left flex items-center gap-3 cursor-pointer transition-all ${
                isCurrent
                  ? 'bg-[var(--zen-accent-subtle)] border-[var(--zen-accent-border)]'
                  : isDone
                    ? 'bg-[var(--zen-surface-1)] border-[var(--zen-border-default)]'
                    : 'bg-[var(--zen-surface-subtle)] border-[var(--zen-border-subtle)] opacity-75'
              }`}
            >
              <span
                className={`w-7 h-7 rounded-full zen-font-mono text-xs font-bold flex items-center justify-center shrink-0 ${
                  isCurrent || isDone
                    ? 'bg-[var(--zen-accent-primary)] text-[var(--zen-ink-on-accent)]'
                    : 'border border-[var(--zen-border-control)] text-[var(--zen-ink-muted)]'
                }`}
              >
                {isDone ? <ZenIcon name="check" size="sm" /> : idx + 1}
              </span>
              <div className="min-w-0">
                <div className="zen-font-display text-sm font-bold text-[var(--zen-ink-primary)] truncate">
                  {step.title}
                </div>
                {step.subtitle && (
                  <div className="zen-font-mono text-[11px] text-[var(--zen-ink-muted)] truncate">
                    {step.subtitle}
                  </div>
                )}
              </div>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

export interface ZenSidebarItem {
  readonly id: string;
  readonly label: string;
  readonly icon?: ReactNode;
  readonly badge?: string | number;
}

export interface ZenSidebarProps {
  readonly title: string;
  readonly items: readonly ZenSidebarItem[];
  readonly activeId: string;
  readonly onSelect: (id: string) => void;
  readonly className?: string;
}

export function ZenSidebar({
  title,
  items,
  activeId,
  onSelect,
  className = '',
}: ZenSidebarProps) {
  return (
    <aside
      aria-label={title}
      data-zen-occlude="true"
      className={`p-4 rounded-3xl zen-surface-static space-y-3 ${className}`.trim()}
    >
      <div className="px-2 zen-telemetry-label text-[var(--zen-accent-primary)]">
        {title}
      </div>
      <ul className="space-y-1">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <button
                type="button"
                aria-current={active ? 'page' : undefined}
                onClick={() => onSelect(item.id)}
                className={`zen-focus-ring w-full px-3 py-2.5 rounded-xl flex items-center justify-between gap-2 text-xs sm:text-sm font-medium cursor-pointer transition-all ${
                  active
                    ? 'bg-[var(--zen-accent-primary)] text-[var(--zen-ink-on-accent)] font-semibold shadow-sm'
                    : 'text-[var(--zen-ink-secondary)] hover:text-[var(--zen-ink-primary)] hover:bg-[var(--zen-surface-subtle)]'
                }`}
              >
                <span className="inline-flex items-center gap-2.5 truncate">
                  {item.icon && <span className="shrink-0">{item.icon}</span>}
                  <span className="truncate">{item.label}</span>
                </span>
                {item.badge !== undefined && (
                  <span
                    className={`zen-font-mono text-[10px] px-2 py-0.5 rounded-full shrink-0 ${
                      active
                        ? 'bg-black/20 text-[var(--zen-ink-on-accent)]'
                        : 'bg-[var(--zen-surface-subtle)] text-[var(--zen-ink-muted)]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export interface ZenIconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly ariaLabel: string;
  readonly active?: boolean;
  readonly children: ReactNode;
}

export function ZenIconButton({
  ariaLabel,
  active = false,
  className = '',
  children,
  ...rest
}: ZenIconButtonProps) {
  return (
    <button
      type="button"
      data-zen-occlude="true"
      aria-label={ariaLabel}
      aria-pressed={active}
      className={`zen-focus-ring p-2.5 rounded-xl border transition-all cursor-pointer inline-flex items-center justify-center ${
        active
          ? 'bg-[var(--zen-accent-primary)] text-[var(--zen-ink-on-accent)] border-[var(--zen-accent-primary)]'
          : 'bg-[var(--zen-surface-1)] text-[var(--zen-ink-secondary)] border-[var(--zen-border-default)] hover:border-[var(--zen-accent-border)] hover:text-[var(--zen-ink-primary)]'
      } ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}
