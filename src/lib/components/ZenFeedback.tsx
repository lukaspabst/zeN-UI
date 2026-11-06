import type { ReactNode } from 'react';
import { ZenIcon } from './ZenIcon';

export type ZenAlertTone = 'info' | 'success' | 'warning' | 'danger';

export interface ZenAlertProps {
  readonly tone?: ZenAlertTone;
  readonly title: string;
  readonly children: ReactNode;
  readonly actionSlot?: ReactNode;
  readonly className?: string;
}

const ALERT_STYLES: Record<
  ZenAlertTone,
  { readonly border: string; readonly icon: ReactNode }
> = {
  info: {
    border: 'border-[var(--zen-status-info)]/50 bg-[var(--zen-status-info)]/10',
    icon: <ZenIcon name="info" size="md" className="text-[var(--zen-status-info)]" />,
  },
  success: {
    border:
      'border-[var(--zen-status-success)]/50 bg-[var(--zen-status-success)]/10',
    icon: (
      <ZenIcon name="success" size="md" tone="success" />
    ),
  },
  warning: {
    border:
      'border-[var(--zen-status-warning)]/50 bg-[var(--zen-status-warning)]/10',
    icon: (
      <ZenIcon name="warning" size="md" tone="warning" />
    ),
  },
  danger: {
    border:
      'border-[var(--zen-status-danger)]/50 bg-[var(--zen-status-danger)]/10',
    icon: (
      <ZenIcon name="danger" size="md" tone="danger" />
    ),
  },
};

export function ZenAlert({
  tone = 'info',
  title,
  children,
  actionSlot,
  className = '',
}: ZenAlertProps) {
  const cfg = ALERT_STYLES[tone];
  return (
    <div
      role={tone === 'danger' || tone === 'warning' ? 'alert' : 'status'}
      data-zen-occlude="true"
      className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${cfg.border} ${className}`.trim()}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{cfg.icon}</div>
        <div>
          <div className="zen-font-mono text-xs font-bold text-[var(--zen-ink-primary)]">
            {title}
          </div>
          <div className="text-xs sm:text-sm text-[var(--zen-ink-secondary)] mt-0.5">
            {children}
          </div>
        </div>
      </div>
      {actionSlot && <div className="shrink-0">{actionSlot}</div>}
    </div>
  );
}

export interface ZenSkeletonProps {
  readonly lines?: number;
  readonly className?: string;
}

export function ZenSkeleton({ lines = 3, className = '' }: ZenSkeletonProps) {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading content"
      className={`space-y-2.5 ${className}`.trim()}
    >
      {Array.from({ length: lines }).map((_, idx) => (
        <div
          key={idx}
          style={{ width: idx === lines - 1 ? '65%' : '100%' }}
          className="h-3.5 rounded-lg bg-[var(--zen-surface-subtle-hover)] animate-pulse"
        />
      ))}
    </div>
  );
}

export interface ZenEmptyStateProps {
  readonly title: string;
  readonly description: string;
  readonly icon?: ReactNode;
  readonly actionSlot?: ReactNode;
  readonly className?: string;
}

export function ZenEmptyState({
  title,
  description,
  icon,
  actionSlot,
  className = '',
}: ZenEmptyStateProps) {
  return (
    <div
      data-zen-occlude="true"
      className={`p-8 rounded-3xl border border-dashed border-[var(--zen-border-strong)] bg-[var(--zen-surface-subtle)] text-center flex flex-col items-center justify-center gap-3 ${className}`.trim()}
    >
      <div className="p-3 rounded-2xl bg-[var(--zen-accent-subtle)] text-[var(--zen-accent-primary)]">
        {icon ?? <ZenIcon name="folder" size="xl" />}
      </div>
      <div className="zen-font-display text-lg font-bold text-[var(--zen-ink-primary)]">
        {title}
      </div>
      <p className="text-xs sm:text-sm text-[var(--zen-ink-secondary)] max-w-md">
        {description}
      </p>
      {actionSlot && <div className="mt-1">{actionSlot}</div>}
    </div>
  );
}
