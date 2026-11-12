import type { ReactNode } from 'react';

export type ZenBadgeTone =
  | 'gold'
  | 'amber'
  | 'emerald'
  | 'coral'
  | 'cyan'
  | 'neutral';

export interface ZenBadgeProps {
  readonly tone?: ZenBadgeTone;
  readonly pulse?: boolean;
  readonly icon?: ReactNode;
  readonly children: ReactNode;
  readonly className?: string;
}

const TONE_STYLES: Record<
  ZenBadgeTone,
  { readonly pill: string; readonly dot: string }
> = {
  gold: {
    pill: 'bg-[var(--zen-accent-subtle)] text-[var(--zen-accent-primary)] border-[var(--zen-accent-border)]',
    dot: 'bg-[var(--zen-accent-primary)]',
  },
  amber: {
    pill: 'bg-[color-mix(in_srgb,var(--zen-status-warning)_15%,transparent)] text-[var(--zen-status-warning)] border-[color-mix(in_srgb,var(--zen-status-warning)_45%,transparent)]',
    dot: 'bg-[var(--zen-status-warning)]',
  },
  emerald: {
    pill: 'bg-[color-mix(in_srgb,var(--zen-status-success)_15%,transparent)] text-[var(--zen-status-success)] border-[color-mix(in_srgb,var(--zen-status-success)_45%,transparent)]',
    dot: 'bg-[var(--zen-status-success)]',
  },
  coral: {
    pill: 'bg-[color-mix(in_srgb,var(--zen-status-danger)_15%,transparent)] text-[var(--zen-status-danger)] border-[color-mix(in_srgb,var(--zen-status-danger)_45%,transparent)]',
    dot: 'bg-[var(--zen-status-danger)]',
  },
  cyan: {
    pill: 'bg-[color-mix(in_srgb,var(--zen-status-info)_15%,transparent)] text-[var(--zen-status-info)] border-[color-mix(in_srgb,var(--zen-status-info)_45%,transparent)]',
    dot: 'bg-[var(--zen-status-info)]',
  },
  neutral: {
    pill: 'bg-[var(--zen-surface-subtle)] text-[var(--zen-ink-secondary)] border-[var(--zen-border-default)]',
    dot: 'bg-[var(--zen-ink-muted)]',
  },
};

export function ZenBadge({
  tone = 'neutral',
  pulse = false,
  icon,
  children,
  className = '',
}: ZenBadgeProps) {
  const style = TONE_STYLES[tone];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border zen-font-mono text-[11px] font-medium tracking-wide ${style.pill} ${className}`.trim()}
    >
      {pulse && (
        <span
          className={`w-1.5 h-1.5 rounded-full animate-pulse ${style.dot}`}
          aria-hidden="true"
        />
      )}
      {icon && <span className="shrink-0 inline-flex">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}

export interface ZenTagListProps {
  readonly tags: readonly string[];
  readonly className?: string;
}

export function ZenTagList({ tags, className = '' }: ZenTagListProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`.trim()}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-3 py-1 rounded-full border border-[var(--zen-border-default)] bg-[var(--zen-surface-subtle)] zen-font-mono text-[11px] text-[var(--zen-ink-secondary)]"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export interface ZenKbdProps {
  readonly keys: readonly string[];
  readonly className?: string;
}

export function ZenKbd({ keys, className = '' }: ZenKbdProps) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`.trim()}>
      {keys.map((k) => (
        <kbd
          key={k}
          className="px-1.5 py-0.5 rounded-md border border-[var(--zen-border-default)] bg-[var(--zen-surface-subtle)] zen-font-mono text-[11px] text-[var(--zen-ink-secondary)] shadow-xs"
        >
          {k}
        </kbd>
      ))}
    </span>
  );
}
