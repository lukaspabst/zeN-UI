import { useId, useState, useEffect, type ReactNode } from 'react';
import { ZenCard } from './ZenCard';
import { ZenCopyButton } from './ZenButton';
import { ZenIcon } from './ZenIcon';

export interface ZenSparklineProps {
  readonly data: readonly number[];
  readonly width?: number;
  readonly height?: number;
  readonly className?: string;
}

export function ZenSparkline({
  data,
  width = 140,
  height = 42,
  className = '',
}: ZenSparklineProps) {
  const gradId = useId();
  const safeData =
    data.length === 0 ? [0, 0] : data.length === 1 ? [data[0], data[0]] : data;

  const min = Math.min(...safeData);
  const max = Math.max(...safeData);
  const range = max - min || 1;

  const coords = safeData.map((val, idx) => {
    const x = (idx / (safeData.length - 1)) * width;
    const y =
      max === min
        ? height * 0.5
        : height - 4 - ((val - min) / range) * (height - 8);
    return { x, y };
  });

  const linePath = coords
    .map((pt, i) => `${i === 0 ? 'M' : 'L'}${pt.x.toFixed(1)},${pt.y.toFixed(1)}`)
    .join(' ');
  const areaPath = `${linePath} L${width},${height} L0,${height} Z`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      className={`overflow-visible ${className}`.trim()}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0%"
            stopColor="var(--zen-accent-primary)"
            stopOpacity="0.38"
          />
          <stop
            offset="100%"
            stopColor="var(--zen-accent-primary)"
            stopOpacity="0.0"
          />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradId})`} />
      <path
        d={linePath}
        fill="none"
        stroke="var(--zen-accent-primary)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface ZenKpiCardProps {
  readonly label: string;
  readonly value: string;
  readonly delta: string;
  readonly trend?: 'up' | 'down';
  readonly sparkline?: readonly number[];
  readonly subtitle?: string;
  readonly className?: string;
}

export function ZenKpiCard({
  label,
  value,
  delta,
  trend = 'up',
  sparkline,
  subtitle,
  className = '',
}: ZenKpiCardProps) {
  return (
    <ZenCard
      variant="static"
      padding="sm"
      className={`flex flex-col justify-between gap-3 ${className}`.trim()}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="zen-telemetry-label">{label}</span>
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full zen-font-mono text-[11px] font-semibold ${
            trend === 'up'
              ? 'bg-[var(--zen-status-success)]/15 text-[var(--zen-status-success)]'
              : 'bg-[var(--zen-status-danger)]/15 text-[var(--zen-status-danger)]'
          }`}
        >
          {trend === 'up' ? (
            <ZenIcon name="trend-up" size="xs" />
          ) : (
            <ZenIcon name="trend-down" size="xs" />
          )}
          {delta}
        </span>
      </div>

      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="zen-font-display text-2xl sm:text-3xl font-extrabold text-[var(--zen-ink-primary)]">
            {value}
          </div>
          {subtitle && (
            <div className="zen-font-mono text-[11px] text-[var(--zen-ink-muted)] mt-0.5">
              {subtitle}
            </div>
          )}
        </div>
        {sparkline && <ZenSparkline data={sparkline} width={110} height={36} />}
      </div>
    </ZenCard>
  );
}

export interface ZenProgressBarProps {
  readonly label: string;
  readonly value: number;
  readonly max?: number;
  readonly unit?: string;
  readonly className?: string;
}

export function ZenProgressBar({
  label,
  value,
  max = 100,
  unit = '%',
  className = '',
}: ZenProgressBarProps) {
  const pct = Math.max(0, Math.min(100, (value / Math.max(max, 1e-6)) * 100));
  return (
    <div
      data-zen-occlude="true"
      className={`space-y-1.5 ${className}`.trim()}
    >
      <div className="flex items-center justify-between zen-font-mono text-xs">
        <span className="zen-telemetry-label">{label}</span>
        <span className="font-semibold text-[var(--zen-ink-primary)]">
          {value}
          {unit}
        </span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className="w-full h-2.5 rounded-full bg-[var(--zen-surface-subtle)] border border-[var(--zen-border-subtle)] overflow-hidden"
      >
        <div
          style={{ width: `${pct}%` }}
          className="h-full bg-[var(--zen-accent-primary)] transition-all duration-300"
        />
      </div>
    </div>
  );
}

export interface ZenCircularGaugeProps {
  readonly label: string;
  readonly value: number;
  readonly max?: number;
  readonly unit?: string;
  readonly size?: number;
}

export function ZenCircularGauge({
  label,
  value,
  max = 100,
  unit = '%',
  size = 96,
}: ZenCircularGaugeProps) {
  const pct = Math.max(0, Math.min(100, (value / Math.max(max, 1e-6)) * 100));
  const strokeWidth = 7;
  const r = (size - strokeWidth * 2) * 0.5;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;

  return (
    <div
      role="meter"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className="inline-flex flex-col items-center gap-1.5"
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size * 0.5}
            cy={size * 0.5}
            r={r}
            fill="none"
            stroke="var(--zen-border-subtle)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size * 0.5}
            cy={size * 0.5}
            r={r}
            fill="none"
            stroke="var(--zen-accent-primary)"
            strokeWidth={strokeWidth}
            strokeDasharray={c}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center zen-font-mono text-xs font-bold text-[var(--zen-ink-primary)]">
          {Math.round(pct)}
          {unit}
        </div>
      </div>
      <span className="zen-telemetry-label">{label}</span>
    </div>
  );
}

export interface ZenAvatarProps {
  readonly name: string;
  readonly src?: string;
  readonly status?: 'online' | 'busy' | 'offline';
  readonly size?: 'sm' | 'md' | 'lg';
}

export function ZenAvatar({
  name,
  src,
  status,
  size = 'md',
}: ZenAvatarProps) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [src]);

  const initials = name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const sizeClass =
    size === 'sm'
      ? 'w-8 h-8 text-xs'
      : size === 'lg'
        ? 'w-12 h-12 text-base'
        : 'w-10 h-10 text-sm';

  return (
    <div className="relative inline-flex shrink-0">
      {src && !imgError ? (
        <img
          src={src}
          alt={name}
          onError={() => setImgError(true)}
          className={`${sizeClass} rounded-full object-cover border border-[var(--zen-border-strong)]`}
        />
      ) : (
        <span
          aria-label={name}
          className={`${sizeClass} rounded-full bg-[var(--zen-accent-subtle)] border border-[var(--zen-accent-border)] text-[var(--zen-accent-primary)] zen-font-mono font-bold inline-flex items-center justify-center`}
        >
          {initials}
        </span>
      )}
      {status && (
        <span
          className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-[var(--zen-bg-canvas)] ${
            status === 'online'
              ? 'bg-[var(--zen-status-success)]'
              : status === 'busy'
                ? 'bg-[var(--zen-status-danger)]'
                : 'bg-[var(--zen-ink-muted)]'
          }`}
        />
      )}
    </div>
  );
}

export interface ZenCodeBlockProps {
  readonly title: string;
  readonly language?: string;
  readonly code: string;
  readonly footerSlot?: ReactNode;
  readonly className?: string;
}

export function ZenCodeBlock({
  title,
  language = 'TSX',
  code,
  footerSlot,
  className = '',
}: ZenCodeBlockProps) {
  return (
    <div
      data-zen-occlude="true"
      className={`rounded-2xl border border-[var(--zen-border-default)] bg-[var(--zen-bg-canvas)] overflow-hidden ${className}`.trim()}
    >
      <div className="flex items-center justify-between gap-2 px-4 py-2.5 border-b border-[var(--zen-border-subtle)] bg-[var(--zen-surface-subtle)]">
        <div className="flex items-center gap-2 min-w-0">
          <span className="zen-telemetry-label text-[var(--zen-accent-primary)]">
            {language}
          </span>
          <span className="zen-font-mono text-xs text-[var(--zen-ink-secondary)] truncate">
            {title}
          </span>
        </div>
        <ZenCopyButton value={code} label="COPY" size="sm" />
      </div>
      <pre className="p-4 zen-font-mono text-xs text-[var(--zen-ink-primary)] overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
      {footerSlot && (
        <div className="px-4 py-2 border-t border-[var(--zen-border-subtle)]">
          {footerSlot}
        </div>
      )}
    </div>
  );
}
