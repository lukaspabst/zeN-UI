import {
  syncZenScrollbarStyles,
  type ZenDensityMode,
  type ZenRadiusMode,
  type ZenThemeId,
  type ZenThemeMetadata,
} from '../theme/zen-theme-core';

export type ZenUniversalPolarity = 'dark' | 'light';

export interface ZenUniversalThemeState {
  readonly theme: ZenThemeId;
  readonly polarity: ZenUniversalPolarity;
  readonly density: ZenDensityMode;
  readonly radius: ZenRadiusMode;
}

export type ZenThemeSubscriber = (state: ZenUniversalThemeState) => void;

export const ZEN_UNIVERSAL_THEMES: readonly ZenThemeMetadata[] = [
  {
    id: 'blackwall-crimson',
    name: 'Capri // Capricorn',
    polarity: 'dark',
    tagline: 'Edgerunners S2 mixed-construct hot pink & acid neon green on void',
    canvasHex: '#050508',
    accentHex: '#FF2E93',
    secondaryHex: '#00FF66',
    inkHex: '#F4F7FA',
  },
  {
    id: 'obsidian-gold',
    name: 'Obsidian Gold',
    polarity: 'dark',
    tagline: 'Warm alabaster & solar gold on deep mineral void',
    canvasHex: '#070709',
    accentHex: '#F5B841',
    secondaryHex: '#FB923C',
    inkHex: '#F6F2E9',
  },
  {
    id: 'neon-emerald',
    name: 'Bio-Emerald Terminal',
    polarity: 'dark',
    tagline: 'High-frequency financial & telemetry phosphor emerald',
    canvasHex: '#040807',
    accentHex: '#10B981',
    secondaryHex: '#2DD4BF',
    inkHex: '#ECFDF5',
  },
  {
    id: 'midnight-cobalt',
    name: 'Midnight Cobalt',
    polarity: 'dark',
    tagline: 'Cloud infrastructure & distributed systems deep slate',
    canvasHex: '#060911',
    accentHex: '#38BDF8',
    secondaryHex: '#818CF8',
    inkHex: '#F1F5F9',
  },
  {
    id: 'atelier-paper',
    name: 'Atelier Paper',
    polarity: 'light',
    tagline: 'Swiss archival cotton stock with burnished bronze ink',
    canvasHex: '#F6F2E9',
    accentHex: '#B45309',
    secondaryHex: '#C2410C',
    inkHex: '#121216',
  },
  {
    id: 'nordic-snow',
    name: 'Nordic Snow',
    polarity: 'light',
    tagline: 'Crisp daylight SaaS alabaster with royal cobalt precision',
    canvasHex: '#F8FAFC',
    accentHex: '#2563EB',
    secondaryHex: '#0891B2',
    inkHex: '#0F172A',
  },
  {
    id: 'kyoto-matcha',
    name: 'Kyoto Matcha',
    polarity: 'light',
    tagline: 'Botanical stone paper with deep forest matcha & warm brass',
    canvasHex: '#F3F5F0',
    accentHex: '#15803D',
    secondaryHex: '#0F766E',
    inkHex: '#142018',
  },
  {
    id: 'cyber-daylight',
    name: 'Cyber Daylight',
    polarity: 'light',
    tagline: 'High-contrast clinical white lab shell with crimson & cyan',
    canvasHex: '#F2F2F5',
    accentHex: '#E11D48',
    secondaryHex: '#0284C7',
    inkHex: '#09090D',
  },
] as const;

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
    const nextTheme: ZenThemeId =
      this.state.polarity === 'dark' ? 'atelier-paper' : 'blackwall-crimson';
    this.setTheme(nextTheme);
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
