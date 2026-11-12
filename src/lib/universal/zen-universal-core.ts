import {
  ZEN_THEMES,
  resolveZenPolarityCounterpart,
  syncZenScrollbarStyles,
  type ZenDensityMode,
  type ZenRadiusMode,
  type ZenThemeId,
  type ZenThemeMetadata,
} from '../theme/zen-theme-core';

export { resolveZenPolarityCounterpart };

export type ZenUniversalPolarity = 'dark' | 'light';

export interface ZenUniversalThemeState {
  readonly theme: ZenThemeId;
  readonly polarity: ZenUniversalPolarity;
  readonly density: ZenDensityMode;
  readonly radius: ZenRadiusMode;
}

export type ZenThemeSubscriber = (state: ZenUniversalThemeState) => void;

export const ZEN_UNIVERSAL_THEMES: readonly ZenThemeMetadata[] = ZEN_THEMES;

function resolveThemePolarity(theme: ZenThemeId): ZenUniversalPolarity {
  const found = ZEN_UNIVERSAL_THEMES.find((t) => t.id === theme);
  return found ? found.polarity : 'dark';
}

export class ZenThemeController {
  private state: ZenUniversalThemeState;
  private readonly listeners = new Set<ZenThemeSubscriber>();
  private readonly storageKey: string;

  constructor(options?: {
    readonly defaultTheme?: ZenThemeId;
    readonly defaultDensity?: ZenDensityMode;
    readonly defaultRadius?: ZenRadiusMode;
    readonly storageKey?: string;
  }) {
    this.storageKey = options?.storageKey ?? 'zen-ui-theme-v2';
    let initialTheme: ZenThemeId = options?.defaultTheme ?? 'blackwall-crimson';

    if (typeof window !== 'undefined') {
      try {
        const stored = window.localStorage.getItem(this.storageKey) as ZenThemeId | null;
        if (stored && ZEN_UNIVERSAL_THEMES.some((t) => t.id === stored)) {
          initialTheme = stored;
        }
      } catch {
        initialTheme = options?.defaultTheme ?? 'blackwall-crimson';
      }
    }

    this.state = {
      theme: initialTheme,
      polarity: resolveThemePolarity(initialTheme),
      density: options?.defaultDensity ?? 'comfortable',
      radius: options?.defaultRadius ?? 'architectural',
    };

    this.applyToDom();
  }

  public getState(): ZenUniversalThemeState {
    return this.state;
  }

  public setTheme(theme: ZenThemeId): void {
    this.state = {
      ...this.state,
      theme,
      polarity: resolveThemePolarity(theme),
    };
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(this.storageKey, theme);
      } catch {
        void 0;
      }
    }
    this.applyToDom();
    this.notify();
  }

  public togglePolarity(): void {
    this.setTheme(resolveZenPolarityCounterpart(this.state.theme));
  }

  public setDensity(density: ZenDensityMode): void {
    this.state = {
      ...this.state,
      density,
    };
    this.applyToDom();
    this.notify();
  }

  public setRadius(radius: ZenRadiusMode): void {
    this.state = {
      ...this.state,
      radius,
    };
    this.applyToDom();
    this.notify();
  }

  public subscribe(listener: ZenThemeSubscriber): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private applyToDom(): void {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.setAttribute('data-theme', this.state.theme);
    root.setAttribute('data-polarity', this.state.polarity);
    root.setAttribute('data-density', this.state.density);
    root.setAttribute('data-radius', this.state.radius);
    const meta =
      ZEN_UNIVERSAL_THEMES.find((t) => t.id === this.state.theme) ??
      ZEN_UNIVERSAL_THEMES[0];
    syncZenScrollbarStyles(meta);
  }

  private notify(): void {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }
}

export class ZenUniversalAudio {
  private ctx: AudioContext | null = null;
  private muted = false;

  public isMuted(): boolean {
    return this.muted;
  }

  public setMuted(muted: boolean): void {
    this.muted = muted;
  }

  public playMicroClick(frequency = 540): void {
    if (this.muted || typeof window === 'undefined') return;
    try {
      if (!this.ctx) {
        this.ctx = new window.AudioContext();
      }
      if (this.ctx.state === 'suspended') {
        void this.ctx.resume();
      }
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(frequency, now);
      osc.frequency.exponentialRampToValueAtTime(frequency * 0.45, now + 0.035);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      void 0;
    }
  }
}

export function escapeZenHtml(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function sanitizeZenAssetUrl(raw: string): string {
  const trimmed = raw.trim();
  const normalizedSchemeCheck = trimmed.replace(/[\u0000-\u0020]+/g, '');
  if (/^(?:javascript|data|vbscript|file):/i.test(normalizedSchemeCheck)) {
    return '/capri-construct-base.png';
  }
  return escapeZenHtml(trimmed);
}

export const zenTheme = new ZenThemeController();
export const zenAudio = new ZenUniversalAudio();
