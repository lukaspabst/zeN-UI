import type { SVGAttributes } from 'react';

export type ZenIconName =
  | 'search'
  | 'plus'
  | 'minus'
  | 'close'
  | 'check'
  | 'copy'
  | 'chevron-down'
  | 'chevron-right'
  | 'chevron-left'
  | 'external-link'
  | 'bolt'
  | 'sparkles'
  | 'terminal'
  | 'cpu'
  | 'database'
  | 'layers'
  | 'shield'
  | 'sliders'
  | 'command'
  | 'code'
  | 'activity'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'trend-up'
  | 'trend-down'
  | 'radio'
  | 'sun'
  | 'moon'
  | 'eye'
  | 'upload'
  | 'trash'
  | 'refresh'
  | 'menu'
  | 'panel-right'
  | 'user'
  | 'lock'
  | 'globe'
  | 'folder';

export type ZenIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ZenIconTone =
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger';

export const ZEN_ICON_SIZE_PX: Record<ZenIconSize, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
};

const TONE_COLOR_MAP: Record<ZenIconTone, string> = {
  inherit: 'currentColor',
  primary: 'var(--zen-ink-primary)',
  secondary: 'var(--zen-ink-secondary)',
  muted: 'var(--zen-ink-muted)',
  accent: 'var(--zen-accent-primary)',
  success: 'var(--zen-status-success)',
  warning: 'var(--zen-status-warning)',
  danger: 'var(--zen-status-danger)',
};

export const ZEN_ICON_SVG_INNER: Record<ZenIconName, string> = {
  search:
    '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  plus:
    '<path d="M5 12h14"/><path d="M12 5v14"/>',
  minus:
    '<path d="M5 12h14"/>',
  close:
    '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  check:
    '<path d="M20 6 9 17l-5-5"/>',
  copy:
    '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  'chevron-down':
    '<path d="m6 9 6 6 6-6"/>',
  'chevron-right':
    '<path d="m9 18 6-6-6-6"/>',
  'chevron-left':
    '<path d="m15 18-6-6 6-6"/>',
  'external-link':
    '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  bolt:
    '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
  sparkles:
    '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/>',
  terminal:
    '<polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>',
  cpu:
    '<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>',
  database:
    '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>',
  layers:
    '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
  shield:
    '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
  sliders:
    '<line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="2" x2="6" y1="14" y2="14"/><line x1="10" x2="14" y1="8" y2="8"/><line x1="18" x2="22" y1="16" y2="16"/>',
  command:
    '<path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/>',
  code:
    '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  activity:
    '<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>',
  info:
    '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  success:
    '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  warning:
    '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  danger:
    '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
  'trend-up':
    '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
  'trend-down':
    '<polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/>',
  radio:
    '<path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/>',
  sun:
    '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  moon:
    '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  eye:
    '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',
  upload:
    '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>',
  trash:
    '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
  refresh:
    '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
  menu:
    '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
  'panel-right':
    '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M15 3v18"/>',
  user:
    '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  lock:
    '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  globe:
    '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  folder:
    '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
};

export const ZEN_ICON_NAMES: readonly ZenIconName[] = Object.keys(
  ZEN_ICON_SVG_INNER
) as readonly ZenIconName[];

export function renderZenIconSvgMarkup(options: {
  readonly name: ZenIconName;
  readonly size?: ZenIconSize;
  readonly tone?: ZenIconTone;
  readonly strokeWidth?: number;
  readonly spin?: boolean;
}): string {
  const sizeKey = options.size ?? 'md';
  const px = Object.prototype.hasOwnProperty.call(ZEN_ICON_SIZE_PX, sizeKey)
    ? ZEN_ICON_SIZE_PX[sizeKey]
    : ZEN_ICON_SIZE_PX.md;
  const toneKey = options.tone ?? 'inherit';
  const color = Object.prototype.hasOwnProperty.call(TONE_COLOR_MAP, toneKey)
    ? TONE_COLOR_MAP[toneKey]
    : TONE_COLOR_MAP.inherit;
  const sw =
    typeof options.strokeWidth === 'number' && Number.isFinite(options.strokeWidth)
      ? Math.min(Math.max(options.strokeWidth, 0.5), 4)
      : 2;
  const inner = Object.prototype.hasOwnProperty.call(ZEN_ICON_SVG_INNER, options.name)
    ? ZEN_ICON_SVG_INNER[options.name]
    : ZEN_ICON_SVG_INNER.sparkles;
  const spinStyle = options.spin ? 'animation: spin 1s linear infinite;' : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;flex-shrink:0;${spinStyle}">${inner}</svg>`;
}

export interface ZenIconProps extends Omit<SVGAttributes<SVGSVGElement>, 'name'> {
  readonly name: ZenIconName;
  readonly size?: ZenIconSize;
  readonly tone?: ZenIconTone;
  readonly strokeWidth?: number;
  readonly spin?: boolean;
  readonly ariaLabel?: string;
}

export function ZenIcon({
  name,
  size = 'md',
  tone = 'inherit',
  strokeWidth = 2,
  spin = false,
  ariaLabel,
  className = '',
  ...rest
}: ZenIconProps) {
  const px = Object.prototype.hasOwnProperty.call(ZEN_ICON_SIZE_PX, size)
    ? ZEN_ICON_SIZE_PX[size]
    : ZEN_ICON_SIZE_PX.md;
  const strokeColor = Object.prototype.hasOwnProperty.call(TONE_COLOR_MAP, tone)
    ? TONE_COLOR_MAP[tone]
    : TONE_COLOR_MAP.inherit;
  const innerMarkup = Object.prototype.hasOwnProperty.call(ZEN_ICON_SVG_INNER, name)
    ? ZEN_ICON_SVG_INNER[name]
    : ZEN_ICON_SVG_INNER.sparkles;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : 'true'}
      className={`inline-block shrink-0 ${spin ? 'animate-spin' : ''} ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: innerMarkup }}
      {...rest}
    />
  );
}
