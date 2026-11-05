import { Moon, Sun } from 'lucide-react';
import {
  ZEN_THEMES,
  ZenBadge,
  ZenCard,
  ZenCopyButton,
  ZenHeading,
  ZenSegmentedControl,
  useZenTheme,
  type ZenAudioSynthController,
  type ZenDensityMode,
  type ZenRadiusMode,
  type ZenSegmentItem,
  type ZenThemeId,
} from '../../lib';
import { TOKEN_SWATCHES } from '../data/studioWorkbenchData';

export const RADIUS_SEGMENTS: readonly ZenSegmentItem<ZenRadiusMode>[] = [
  { value: 'sharp', label: 'Sharp (2px)' },
  { value: 'architectural', label: 'Architectural (12px)' },
  { value: 'soft', label: 'Soft (20px)' },
];

export const DENSITY_SEGMENTS: readonly ZenSegmentItem<ZenDensityMode>[] = [
  { value: 'comfortable', label: 'Comfortable' },
  { value: 'compact', label: 'Compact' },
];

export interface ThemeMatrixSectionProps {
  readonly audio: ZenAudioSynthController;
}

export function ThemeMatrixSection({ audio }: ThemeMatrixSectionProps) {
  const {
    theme,
    polarity,
    setTheme,
    density,
    setDensity,
    radius,
    setRadius,
  } = useZenTheme();

  const darkThemes = ZEN_THEMES.filter((item) => item.polarity === 'dark');
  const lightThemes = ZEN_THEMES.filter((item) => item.polarity === 'light');

  return (
    <section id="theme-matrix" className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <ZenHeading
          as="h2"
          size="section"
          eyebrow="02 // 8-THEME POLARITY ENGINE & GEOMETRY CONTROLS"
          accentText="Polarity"
        >
          Adaptive Dark & Light Matrix
        </ZenHeading>

        <div className="flex flex-wrap items-center gap-3">
          <ZenSegmentedControl
            ariaLabel="Border Radius Mode"
            size="sm"
            items={RADIUS_SEGMENTS}
            value={radius}
            onChange={(next) => {
              audio.playMicroClick(540);
              setRadius(next);
            }}
          />
          <ZenSegmentedControl
            ariaLabel="Spacing Density Mode"
            size="sm"
            items={DENSITY_SEGMENTS}
            value={density}
            onChange={(next) => {
              audio.playMicroClick(580);
              setDensity(next);
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ZenCard variant="static" padding="md" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-[var(--zen-accent-primary)]" />
              <span className="zen-font-mono text-xs uppercase tracking-[0.16em] text-[var(--zen-ink-primary)] font-semibold">
                Dark Polarity Themes (4)
              </span>
            </div>
            <ZenBadge tone={polarity === 'dark' ? 'gold' : 'neutral'}>
              {polarity === 'dark' ? 'ACTIVE POLARITY' : 'CLICK TO ACTIVATE'}
            </ZenBadge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {darkThemes.map((t) => {
              const isSelected = theme === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  data-zen-occlude="true"
                  onClick={() => {
                    audio.playMicroClick(520);
                    setTheme(t.id as ZenThemeId);
                  }}
                  className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer zen-focus-ring ${
                    isSelected
                      ? 'border-[var(--zen-accent-primary)] bg-[var(--zen-accent-subtle)] shadow-[0_0_0_1px_var(--zen-accent-primary)]'
                      : 'border-[var(--zen-border-subtle)] bg-[var(--zen-surface-subtle)] hover:border-[var(--zen-border-strong)]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="zen-font-display text-sm font-bold text-[var(--zen-ink-primary)]">
                      {t.name}
                    </span>
                    <div className="flex items-center gap-1">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/20"
                        style={{ backgroundColor: t.canvasHex }}
                      />
                      <span
                        className="w-3.5 h-3.5 rounded-full"
                        style={{ backgroundColor: t.accentHex }}
                      />
                      <span
                        className="w-3.5 h-3.5 rounded-full"
                        style={{ backgroundColor: t.secondaryHex }}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-[var(--zen-ink-secondary)] line-clamp-2 mb-2">
                    {t.tagline}
                  </p>
                  <span className="zen-telemetry-label text-[var(--zen-accent-primary)]">
                    {t.id}
                  </span>
                </button>
              );
            })}
          </div>
        </ZenCard>

        <ZenCard variant="static" padding="md" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-[var(--zen-accent-primary)]" />
              <span className="zen-font-mono text-xs uppercase tracking-[0.16em] text-[var(--zen-ink-primary)] font-semibold">
                Light Polarity Themes (4)
              </span>
            </div>
            <ZenBadge tone={polarity === 'light' ? 'gold' : 'neutral'}>
              {polarity === 'light' ? 'ACTIVE POLARITY' : 'CLICK TO ACTIVATE'}
            </ZenBadge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {lightThemes.map((t) => {
              const isSelected = theme === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  data-zen-occlude="true"
                  onClick={() => {
                    audio.playMicroClick(580);
                    setTheme(t.id as ZenThemeId);
                  }}
                  className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer zen-focus-ring ${
                    isSelected
                      ? 'border-[var(--zen-accent-primary)] bg-[var(--zen-accent-subtle)] shadow-[0_0_0_1px_var(--zen-accent-primary)]'
                      : 'border-[var(--zen-border-subtle)] bg-[var(--zen-surface-subtle)] hover:border-[var(--zen-border-strong)]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="zen-font-display text-sm font-bold text-[var(--zen-ink-primary)]">
                      {t.name}
                    </span>
                    <div className="flex items-center gap-1">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20"
                        style={{ backgroundColor: t.canvasHex }}
                      />
                      <span
                        className="w-3.5 h-3.5 rounded-full"
                        style={{ backgroundColor: t.accentHex }}
                      />
                      <span
                        className="w-3.5 h-3.5 rounded-full"
                        style={{ backgroundColor: t.secondaryHex }}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-[var(--zen-ink-secondary)] line-clamp-2 mb-2">
                    {t.tagline}
                  </p>
                  <span className="zen-telemetry-label text-[var(--zen-accent-primary)]">
                    {t.id}
                  </span>
                </button>
              );
            })}
          </div>
        </ZenCard>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TOKEN_SWATCHES.map((swatch) => (
          <ZenCard key={swatch.cssVar} variant="static" padding="sm" className="space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="zen-font-display text-sm font-bold text-[var(--zen-ink-primary)]">
                {swatch.name}
              </span>
              <ZenCopyButton value={`var(${swatch.cssVar})`} label={swatch.cssVar} size="sm" />
            </div>
            <div className="zen-font-mono text-[11px] text-[var(--zen-ink-muted)] space-y-1">
              <div>DARK: {swatch.darkExample}</div>
              <div>LIGHT: {swatch.lightExample}</div>
            </div>
            <div className="pt-1 border-t border-[var(--zen-border-subtle)] flex items-center justify-between">
              <span className="zen-font-mono text-[11px] text-[var(--zen-accent-primary)]">
                {swatch.contrastNote}
              </span>
            </div>
          </ZenCard>
        ))}
      </div>
    </section>
  );
}
