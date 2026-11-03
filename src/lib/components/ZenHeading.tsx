import type { ReactNode } from 'react';

export type ZenHeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';
export type ZenHeadingSize = 'hero' | 'display' | 'section' | 'title' | 'subtitle';

export interface ZenHeadingProps {
  readonly as?: ZenHeadingLevel;
  readonly size?: ZenHeadingSize;
  readonly eyebrow?: ReactNode;
  readonly eyebrowIcon?: ReactNode;
  readonly accentText?: ReactNode;
  readonly subtitle?: ReactNode;
  readonly children: ReactNode;
  readonly className?: string;
}

const SIZE_CLASSES: Record<ZenHeadingSize, string> = {
  hero: 'text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.03]',
  display: 'text-3xl sm:text-5xl font-bold tracking-tight leading-[1.04]',
  section: 'text-2xl sm:text-4xl font-bold tracking-tight leading-tight',
  title: 'text-xl sm:text-2xl font-bold tracking-tight leading-snug',
  subtitle: 'text-lg sm:text-xl font-bold tracking-tight leading-snug',
};

export function ZenHeading({
  as: Tag = 'h2',
  size = 'display',
  eyebrow,
  eyebrowIcon,
  accentText,
  subtitle,
  children,
  className = '',
}: ZenHeadingProps) {
  return (
    <div className={className}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 zen-telemetry-label text-[var(--zen-accent-primary)] mb-2.5">
          {eyebrowIcon && <span className="shrink-0">{eyebrowIcon}</span>}
          <span>{eyebrow}</span>
        </div>
      )}
      <Tag
        className={`zen-font-display text-[var(--zen-ink-primary)] ${SIZE_CLASSES[size]}`}
      >
        {children}
        {accentText && (
          <>
            {' '}
            <span className="zen-font-serif italic font-normal text-[var(--zen-accent-primary)]">
              {accentText}
            </span>
          </>
        )}
      </Tag>
      {subtitle && (
        <div className="zen-font-serif italic text-xl sm:text-2xl text-[var(--zen-accent-primary)] mt-2">
          {subtitle}
        </div>
      )}
    </div>
  );
}
