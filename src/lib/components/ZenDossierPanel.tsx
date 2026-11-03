import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  ZenCard,
  ZenMetricStrip,
  ZenArchitectureNote,
  ZenCheckList,
  type ZenMetricItem,
} from './ZenCard';
import { ZenTagList } from './ZenBadge';

export interface ZenDossierItem {
  readonly id: string;
  readonly index: string;
  readonly categoryLabel: string;
  readonly year: string;
  readonly title: string;
  readonly role?: string;
  readonly subtitle: string;
  readonly engineeringNote: string;
  readonly engineeringLabel?: string;
  readonly highlights?: readonly string[];
  readonly metrics?: readonly ZenMetricItem[];
  readonly tags: readonly string[];
  readonly primaryAction?: {
    readonly label: string;
    readonly href: string;
    readonly icon?: ReactNode;
  };
  readonly secondaryAction?: {
    readonly label: string;
    readonly href: string;
    readonly icon?: ReactNode;
  };
}

export interface ZenDossierPanelProps {
  readonly item: ZenDossierItem;
  readonly footerSlot?: ReactNode;
  readonly className?: string;
}

export function ZenDossierPanel({
  item,
  footerSlot,
  className = '',
}: ZenDossierPanelProps) {
  return (
    <ZenCard variant="selected" padding="md" className={className}>
      <div className="flex items-center justify-between zen-telemetry-label text-[var(--zen-accent-primary)] mb-3">
        <span>
          {item.categoryLabel} // {item.index}
        </span>
        <span>{item.year}</span>
      </div>

      <h3 className="zen-font-serif italic text-4xl sm:text-5xl mb-1 text-[var(--zen-ink-primary)]">
        {item.title}
      </h3>

      {item.role && (
        <div className="zen-font-mono text-xs text-[var(--zen-accent-secondary)] mb-2">
          {item.role}
        </div>
      )}

      <div className="zen-font-mono text-xs text-[var(--zen-ink-muted)] mb-5">
        {item.subtitle}
      </div>

      {item.metrics && item.metrics.length > 0 && (
        <ZenMetricStrip metrics={item.metrics} className="mb-5" />
      )}

      <ZenArchitectureNote
        label={item.engineeringLabel ?? 'SYSTEM ARCHITECTURE NOTE'}
        className="mb-5"
      >
        {item.engineeringNote}
      </ZenArchitectureNote>

      {item.highlights && item.highlights.length > 0 && (
        <ZenCheckList items={item.highlights} className="mb-6" />
      )}

      <ZenTagList tags={item.tags} className="mb-6" />

      {(item.primaryAction || item.secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-3">
          {item.primaryAction && (
            <a
              href={item.primaryAction.href}
              target="_blank"
              rel="noopener noreferrer"
              className="zen-btn-base zen-btn-primary zen-focus-ring flex-1 py-3 px-5 text-xs"
            >
              {item.primaryAction.icon}
              <span>{item.primaryAction.label}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
          {item.secondaryAction && (
            <a
              href={item.secondaryAction.href}
              target="_blank"
              rel="noopener noreferrer"
              className="zen-btn-base zen-btn-secondary zen-focus-ring flex-1 py-3 px-5 text-xs"
            >
              {item.secondaryAction.icon}
              <span>{item.secondaryAction.label}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
        </div>
      )}

      {footerSlot && <div className="mt-4">{footerSlot}</div>}
    </ZenCard>
  );
}
