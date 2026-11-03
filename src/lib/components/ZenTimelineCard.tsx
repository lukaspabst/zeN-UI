import type { ReactNode } from 'react';
import { ZenCard, ZenCheckList } from './ZenCard';
import { ZenTagList } from './ZenBadge';

export interface ZenTimelineCardProps {
  readonly period: string;
  readonly location: string;
  readonly title: string;
  readonly institution: string;
  readonly summary: string;
  readonly bullets?: readonly string[];
  readonly tags: readonly string[];
  readonly icon?: ReactNode;
  readonly className?: string;
}

export function ZenTimelineCard({
  period,
  location,
  title,
  institution,
  summary,
  bullets,
  tags,
  icon,
  className = '',
}: ZenTimelineCardProps) {
  return (
    <ZenCard
      variant="static"
      padding="md"
      className={`flex flex-col justify-between ${className}`.trim()}
    >
      <div>
        <div className="flex items-center justify-between gap-2 zen-font-mono text-xs mb-4">
          <span className="inline-flex items-center gap-1.5 text-[var(--zen-accent-primary)]">
            {icon}
            <span>{period}</span>
          </span>
          <span className="text-[var(--zen-ink-muted)]">{location}</span>
        </div>

        <h3 className="zen-font-display text-xl sm:text-2xl font-bold text-[var(--zen-ink-primary)]">
          {title}
        </h3>
        <div className="zen-font-serif italic text-xl text-[var(--zen-accent-primary)] mt-0.5 mb-3">
          {institution}
        </div>

        <p className="text-sm text-[var(--zen-ink-secondary)] leading-relaxed mb-4">
          {summary}
        </p>

        {bullets && bullets.length > 0 && (
          <ZenCheckList items={bullets} className="mb-5" />
        )}
      </div>

      <div className="pt-3 border-t border-[var(--zen-border-subtle)]">
        <ZenTagList tags={tags} />
      </div>
    </ZenCard>
  );
}
