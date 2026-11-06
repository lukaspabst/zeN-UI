import type { ZenAudioSynthController, ZenSynthPresetId } from './useZenAudioSynth';
import { ZenButton } from '../components/ZenButton';
import { ZenIcon } from '../components/ZenIcon';
import { ZenSegmentedControl } from '../components/ZenSegmentedControl';

export interface ZenAudioControllerProps {
  readonly synth: ZenAudioSynthController;
  readonly mode?: 'pill' | 'deck';
  readonly activeLabel?: string;
  readonly idleLabel?: string;
  readonly className?: string;
}

export function ZenAudioController({
  synth,
  mode = 'pill',
  activeLabel = 'Lo-Fi Radio: ON',
  idleLabel = 'Lo-Fi Background',
  className = '',
}: ZenAudioControllerProps) {
  if (mode === 'pill') {
    return (
      <ZenButton
        variant="secondary"
        size="sm"
        mono
        pressed={synth.active}
        onClick={synth.toggle}
        aria-label="Toggle procedural ambient synthesizer"
        className={className}
        iconLeft={
          synth.active ? (
            <ZenIcon name="radio" size="sm" className="animate-pulse" />
          ) : (
            <ZenIcon name="radio" size="sm" tone="accent" />
          )
        }
      >
        {synth.active ? activeLabel : idleLabel}
      </ZenButton>
    );
  }

  return (
    <div
      data-zen-occlude="true"
      className={`p-5 rounded-3xl zen-surface-static flex flex-col gap-4 ${className}`.trim()}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <ZenIcon
            name="radio"
            size="xl"
            tone="accent"
            spin={synth.active}
          />
          <div>
            <div className="zen-telemetry-label text-[var(--zen-accent-primary)]">
              WEB AUDIO PROCEDURAL SYNTHESIZER
            </div>
            <div className="zen-font-display font-bold text-base text-[var(--zen-ink-primary)]">
              Zero-Dependency Acoustic Engine
            </div>
          </div>
        </div>

        <ZenButton
          variant={synth.active ? 'primary' : 'secondary'}
          size="sm"
          mono
          pressed={synth.active}
          onClick={synth.toggle}
          iconLeft={<ZenIcon name="radio" size="sm" />}
        >
          {synth.active ? 'SYNTH ACTIVE' : 'START SYNTH'}
        </ZenButton>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-[var(--zen-border-subtle)]">
        <ZenSegmentedControl<ZenSynthPresetId>
          ariaLabel="Select synthesizer voicing preset"
          size="sm"
          value={synth.presetId}
          onChange={synth.setPresetId}
          items={synth.presets.map((p) => ({
            value: p.id,
            label: p.label.split(' (')[0],
          }))}
        />

        <div className="flex items-center gap-1.5" aria-label="8-step bar sequencer">
          {Array.from({ length: 8 }).map((_, idx) => {
            const isBeat = synth.active && synth.currentStep === idx;
            return (
              <span
                key={idx}
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  isBeat
                    ? 'bg-[var(--zen-accent-primary)] scale-125'
                    : 'bg-[var(--zen-border-default)]'
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
