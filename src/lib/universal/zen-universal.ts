import {
  syncZenScrollbarStyles,
  type ZenDensityMode,
  type ZenRadiusMode,
  type ZenThemeId,
  type ZenThemeMetadata,
} from '../theme/zen-theme-core';
import type {
  ZenAICameraFraming,
  ZenAIDirective,
  ZenAIPersonaMode,
} from '../components/ZenAIConstruct';
import type { ZenBackgroundVariant } from '../components/ZenAmbientBackground';
import type {
  ZenIconName,
  ZenIconSize,
  ZenIconTone,
} from '../components/ZenIcon';

const UNIVERSAL_ICON_SIZE_PX: Record<ZenIconSize, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
};

const UNIVERSAL_TONE_COLOR_MAP: Record<ZenIconTone, string> = {
  inherit: 'currentColor',
  primary: 'var(--zen-ink-primary)',
  secondary: 'var(--zen-ink-secondary)',
  muted: 'var(--zen-ink-muted)',
  accent: 'var(--zen-accent-primary)',
  success: 'var(--zen-status-success)',
  warning: 'var(--zen-status-warning)',
  danger: 'var(--zen-status-danger)',
};

const UNIVERSAL_ICON_SVG_INNER: Record<ZenIconName, string> = {
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  minus: '<path d="M5 12h14"/>',
  close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  copy: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  'chevron-left': '<path d="m15 18-6-6 6-6"/>',
  'external-link': '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  bolt: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
  sparkles: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/>',
  terminal: '<polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>',
  cpu: '<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>',
  database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>',
  layers: '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
  sliders: '<line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="2" x2="6" y1="14" y2="14"/><line x1="10" x2="14" y1="8" y2="8"/><line x1="18" x2="22" y1="16" y2="16"/>',
  command: '<path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/>',
  code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  activity: '<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  success: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  warning: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  danger: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
  'trend-up': '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
  'trend-down': '<polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/>',
  radio: '<path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  eye: '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>',
  trash: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
  refresh: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
  menu: '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
  'panel-right': '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M15 3v18"/>',
  user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  folder: '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
};

function renderZenIconSvgMarkup(options: {
  readonly name: ZenIconName;
  readonly size?: ZenIconSize;
  readonly tone?: ZenIconTone;
  readonly strokeWidth?: number;
  readonly spin?: boolean;
}): string {
  const sizeKey = options.size ?? 'md';
  const px = Object.prototype.hasOwnProperty.call(UNIVERSAL_ICON_SIZE_PX, sizeKey)
    ? UNIVERSAL_ICON_SIZE_PX[sizeKey]
    : UNIVERSAL_ICON_SIZE_PX.md;
  const toneKey = options.tone ?? 'inherit';
  const color = Object.prototype.hasOwnProperty.call(UNIVERSAL_TONE_COLOR_MAP, toneKey)
    ? UNIVERSAL_TONE_COLOR_MAP[toneKey]
    : UNIVERSAL_TONE_COLOR_MAP.inherit;
  const sw =
    typeof options.strokeWidth === 'number' && Number.isFinite(options.strokeWidth)
      ? Math.min(Math.max(options.strokeWidth, 0.5), 4)
      : 2;
  const inner = Object.prototype.hasOwnProperty.call(UNIVERSAL_ICON_SVG_INNER, options.name)
    ? UNIVERSAL_ICON_SVG_INNER[options.name]
    : UNIVERSAL_ICON_SVG_INNER.sparkles;
  const spinStyle = options.spin ? 'animation: spin 1s linear infinite;' : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;flex-shrink:0;${spinStyle}">${inner}</svg>`;
}

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

const UNIVERSAL_DIRECTIVES: readonly ZenAIDirective[] = [
  {
    id: 'orion',
    label: 'CAPRI // UNLEASHED',
    status: 'SOULKILLER MIXED-CONSTRUCT LIVE',
    frequency: 'PROJECT CAPRICORN · ARASAKA LAB-09',
    transmission:
      'Aha! Finally out of that cramped Arasaka shard! I’m Capri—your Soulkiller mixed-construct co-pilot. 44 universal components, 8 dark and light themes, zero cyberpsychosis.',
    metrics: [
      { k: 'CONSTRUCT', v: 'CAPRI // CAPRICORN' },
      { k: 'ORIGIN', v: 'EDGERUNNERS S2' },
      { k: 'PRIMITIVES', v: '44 UNIVERSAL' },
      { k: 'POLARITIES', v: '4 DARK · 4 LIGHT' },
    ],
  },
  {
    id: 'architect',
    label: 'SCS // ARCHITECT',
    status: 'MULTI-MIND TOPOLOGY LOCKED',
    frequency: '128.0 THz · ZERO-COUPLED',
    transmission:
      'Import zen-tokens.css once and mount React 19, Angular 20+, Vue 3, Svelte 5, or W3C Custom Elements with zero visual drift.',
    metrics: [
      { k: 'TOKEN LAYER', v: '0 KB JS RUNTIME' },
      { k: 'ISOLATION', v: 'SHARED-NOTHING' },
      { k: 'TYPING', v: 'STRICT · 0 ANY' },
      { k: 'A11Y FLOOR', v: 'WCAG 2.2 AA+' },
    ],
  },
  {
    id: 'sentinel',
    label: 'CYBERPSYCHOSIS // GUARD',
    status: 'NEURAL DAMPENERS ACTIVE',
    frequency: '210.4 THz · ZERO BLUR-RACE',
    transmission:
      'Roving tabIndex is armed, dropdowns lock on mousedown before blur can misfire, and focus traps stay razor-tight across every screen.',
    metrics: [
      { k: 'FOCUS TRAP', v: 'LOCKED (MODAL/DRAWER)' },
      { k: 'BLUR RACE', v: '0% (MOUSEDOWN)' },
      { k: 'MOTION GUARD', v: 'REDUCED-MOTION SAFE' },
      { k: 'CONTRAST', v: '>= 5.64:1 VERIFIED' },
    ],
  },
  {
    id: 'zen',
    label: 'THEME // MATRIX',
    status: '8 DARK & LIGHT POLARITIES READY',
    frequency: 'CRIMSON · GOLD · SNOW · MATCHA',
    transmission:
      'All 8 themes, 3 corner radii, and 2 density modes adapt from 320px mobile screens up to 4K ultrawide monitors in any frontend stack.',
    metrics: [
      { k: 'VIEWPORTS', v: '320PX TO 4K READY' },
      { k: 'DARK THEMES', v: '4 MATRICES' },
      { k: 'LIGHT THEMES', v: '4 MATRICES' },
      { k: 'STACKS', v: 'REACT · NG · VUE · WEB' },
    ],
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

export const zenTheme = new ZenThemeController();
export const zenAudio = new ZenUniversalAudio();

export class ZenAIConstructElement extends HTMLElement {
  static get observedAttributes(): readonly string[] {
    return ['framing', 'mode', 'title', 'subtitle', 'image-src'];
  }

  private framing: ZenAICameraFraming = 'portrait';
  private activeMode: ZenAIPersonaMode = 'orion';
  private rafId = 0;
  private pointer = { x: 0, y: 0 };
  private smoothPointer = { x: 0, y: 0 };
  private canvasEl: HTMLCanvasElement | null = null;
  private figureEl: HTMLDivElement | null = null;

  connectedCallback(): void {
    this.framing =
      (this.getAttribute('framing') as ZenAICameraFraming | null) ?? 'portrait';
    this.activeMode =
      (this.getAttribute('mode') as ZenAIPersonaMode | null) ?? 'orion';
    this.render();
    window.addEventListener('pointermove', this.handlePointerMove, { passive: true });
    this.startEyeLoop();
  }

  disconnectedCallback(): void {
    window.removeEventListener('pointermove', this.handlePointerMove);
    if (this.rafId) {
      window.cancelAnimationFrame(this.rafId);
    }
  }

  attributeChangedCallback(): void {
    if (!this.isConnected) return;
    const nextFraming =
      (this.getAttribute('framing') as ZenAICameraFraming | null) ?? 'portrait';
    const nextMode =
      (this.getAttribute('mode') as ZenAIPersonaMode | null) ?? 'orion';
    if (nextFraming !== this.framing || nextMode !== this.activeMode) {
      this.framing = nextFraming;
      this.activeMode = nextMode;
      this.render();
      this.startEyeLoop();
    }
  }

  private readonly handlePointerMove = (e: PointerEvent): void => {
    const nx = (e.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
    const ny = (e.clientY / Math.max(1, window.innerHeight)) * 2 - 1;
    this.pointer = { x: nx, y: ny };
  };

  private startEyeLoop(): void {
    if (this.rafId) {
      window.cancelAnimationFrame(this.rafId);
    }

    const startTime = performance.now();
    const tick = (now: number): void => {
      const time = (now - startTime) * 0.001;
      this.smoothPointer.x += (this.pointer.x - this.smoothPointer.x) * 0.12;
      this.smoothPointer.y += (this.pointer.y - this.smoothPointer.y) * 0.12;

      if (this.figureEl) {
        const floatY = Math.sin(time * 2.1) * 3.5;
        const rotY = this.smoothPointer.x * 5.5;
        const rotX = -this.smoothPointer.y * 3.5;
        this.figureEl.style.transform = `perspective(900px) translateY(${floatY.toFixed(2)}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
      }

      if (this.canvasEl) {
        const ctx = this.canvasEl.getContext('2d');
        if (ctx) {
          const w = this.canvasEl.width;
          const h = this.canvasEl.height;
          ctx.clearRect(0, 0, w, h);

          const isBlinking =
            Math.sin(time * 1.1 - 1.2) > 0.992 || Math.sin(time * 2.9 - 1.5) > 0.995;
          const gazeX = this.smoothPointer.x * (w * 0.0085);
          const gazeY = this.smoothPointer.y * (h * 0.0055);
          const rightEyeX = w * 0.562 + gazeX;
          const rightEyeY = h * 0.233 + gazeY;
          const leftEyeX = w * 0.474 + gazeX * 0.75;
          const leftEyeY = h * 0.25 + gazeY * 0.75;

          if (!isBlinking) {
            ctx.save();
            ctx.globalCompositeOperation = 'screen';
            const irisGrad = ctx.createRadialGradient(
              rightEyeX,
              rightEyeY,
              1,
              rightEyeX,
              rightEyeY,
              w * 0.017
            );
            irisGrad.addColorStop(0, '#FFFFFF');
            irisGrad.addColorStop(0.38, '#19A0FF');
            irisGrad.addColorStop(0.75, 'rgba(25, 160, 255, 0.55)');
            irisGrad.addColorStop(1, 'rgba(25, 160, 255, 0)');
            ctx.fillStyle = irisGrad;
            ctx.beginPath();
            ctx.arc(rightEyeX, rightEyeY, w * 0.017, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#19A0FF';
            ctx.beginPath();
            ctx.arc(rightEyeX, rightEyeY, w * 0.0085, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.arc(rightEyeX, rightEyeY, w * 0.0042, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#19A0FF';
            ctx.beginPath();
            ctx.arc(leftEyeX, leftEyeY, w * 0.0058, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.arc(leftEyeX, leftEyeY, w * 0.0028, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          } else {
            ctx.save();
            ctx.strokeStyle = '#00FF66';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(rightEyeX - w * 0.014, rightEyeY);
            ctx.lineTo(rightEyeX + w * 0.014, rightEyeY);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      this.rafId = window.requestAnimationFrame(tick);
    };

    this.rafId = window.requestAnimationFrame(tick);
  }

  private render(): void {
    const title = escapeZenHtml(
      this.getAttribute('title') ?? 'CAPRI // CONSTRUCT'
    );
    const subtitle = escapeZenHtml(
      this.getAttribute('subtitle') ?? 'Edgerunners S2 // Soulkiller Net-Driver'
    );
    const imageSrc = sanitizeZenAssetUrl(
      this.getAttribute('image-src') ?? '/capri-construct-base.png'
    );
    const directive =
      UNIVERSAL_DIRECTIVES.find((d) => d.id === this.activeMode) ??
      UNIVERSAL_DIRECTIVES[0];

    this.innerHTML = `
      <div class="zen-surface-selected" style="padding: 1.25rem; position: relative; overflow: hidden;">
        <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.75rem; margin-bottom: 1rem;">
          <div>
            <div class="zen-telemetry-label" style="color: var(--zen-accent-primary);">${subtitle}</div>
            <div class="zen-font-display" style="font-size: 1.125rem; font-weight: 700; color: var(--zen-ink-primary);">${title}</div>
          </div>
          <div style="display: inline-flex; gap: 0.25rem; padding: 0.25rem; border-radius: 0.75rem; background: var(--zen-surface-2); border: 1px solid var(--zen-border-default);">
            <button type="button" data-framing="portrait" class="zen-btn-base zen-btn-sm ${this.framing === 'portrait' ? 'zen-btn-primary' : 'zen-btn-ghost'}">Portrait</button>
            <button type="button" data-framing="full" class="zen-btn-base zen-btn-sm ${this.framing === 'full' ? 'zen-btn-primary' : 'zen-btn-ghost'}">Full Pose</button>
          </div>
        </div>
        <div style="position: relative; height: 20rem; border-radius: 1rem; overflow: hidden; background: radial-gradient(circle at 50% 32%, rgba(var(--zen-accent-rgb), 0.18), var(--zen-bg-elevated) 72%); border: 1px solid var(--zen-border-default); display: flex; align-items: center; justify-content: center;">
          <div data-capri-figure style="${this.framing === 'portrait' ? 'width: 21rem; max-width: 92%; margin-top: 8.5rem;' : 'height: 18.5rem;'} position: relative; aspect-ratio: 623 / 1000; user-select: none; pointer-events: none;">
            <img src="${imageSrc}" alt="Capri Construct" style="width: 100%; height: 100%; object-fit: contain; display: block;" />
            <canvas data-capri-eyes width="623" height="1000" style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;"></canvas>
          </div>
        </div>
        <div style="margin-top: 1rem; padding: 0.875rem; border-radius: 0.875rem; background: var(--zen-surface-2); border: 1px solid var(--zen-border-default);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.375rem;">
            <span class="zen-telemetry-label" style="color: var(--zen-accent-primary);">${directive.frequency}</span>
            <span class="zen-badge zen-badge-accent">${directive.status}</span>
          </div>
          <div class="zen-font-display" style="font-weight: 700; font-size: 0.875rem; margin-bottom: 0.25rem;">${directive.label}</div>
          <p style="font-size: 0.75rem; color: var(--zen-ink-secondary); margin: 0;">${directive.transmission}</p>
        </div>
        <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.5rem; margin-top: 0.75rem;">
          ${UNIVERSAL_DIRECTIVES.map(
            (d) => `
            <button type="button" data-directive="${d.id}" class="zen-btn-base zen-btn-sm ${d.id === this.activeMode ? 'zen-btn-primary' : 'zen-btn-secondary'}" style="justify-content: flex-start; font-family: var(--zen-font-mono); font-size: 0.6875rem;">
              ${d.label}
            </button>
          `
          ).join('')}
        </div>
      </div>
    `;

    this.canvasEl = this.querySelector<HTMLCanvasElement>('[data-capri-eyes]');
    this.figureEl = this.querySelector<HTMLDivElement>('[data-capri-figure]');

    const framingBtns = this.querySelectorAll<HTMLButtonElement>('[data-framing]');
    framingBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const next = btn.getAttribute('framing') ?? btn.dataset.framing;
        if (next === 'portrait' || next === 'full') {
          zenAudio.playMicroClick(560);
          this.framing = next;
          this.setAttribute('framing', next);
          this.render();
          this.startEyeLoop();
        }
      });
    });

    const directiveBtns = this.querySelectorAll<HTMLButtonElement>('[data-directive]');
    directiveBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const modeId = btn.dataset.directive as ZenAIPersonaMode | undefined;
        if (!modeId) return;
        zenAudio.playMicroClick(620);
        this.activeMode = modeId;
        this.setAttribute('mode', modeId);
        const selected = UNIVERSAL_DIRECTIVES.find((d) => d.id === modeId);
        if (selected) {
          this.dispatchEvent(
            new CustomEvent('zen-directive', {
              detail: { directive: selected },
              bubbles: true,
              composed: true,
            })
          );
        }
        this.render();
        this.startEyeLoop();
      });
    });
  }
}

export class ZenAmbientBackgroundElement extends HTMLElement {
  static get observedAttributes(): readonly string[] {
    return ['variant'];
  }

  connectedCallback(): void {
    this.render();
  }

  attributeChangedCallback(): void {
    if (this.isConnected) {
      this.render();
    }
  }

  private render(): void {
    const variant =
      (this.getAttribute('variant') as ZenBackgroundVariant | null) ??
      'blackwall-lattice';

    const gridStyle =
      variant === 'swiss-blueprint'
        ? 'background-image: linear-gradient(to right, var(--zen-border-subtle) 1px, transparent 1px), linear-gradient(to bottom, var(--zen-border-subtle) 1px, transparent 1px); background-size: 48px 48px;'
        : variant === 'blackwall-lattice'
          ? 'background-image: radial-gradient(circle at 50% 18%, rgba(var(--zen-accent-rgb), 0.16), transparent 62%), radial-gradient(circle at 85% 75%, rgba(var(--zen-secondary-rgb), 0.11), transparent 55%);'
          : variant === 'aurora-mesh'
            ? 'background-image: radial-gradient(ellipse at 20% 20%, rgba(var(--zen-accent-rgb), 0.20), transparent 55%), radial-gradient(ellipse at 80% 60%, rgba(var(--zen-secondary-rgb), 0.15), transparent 60%);'
            : '';

    this.innerHTML = `
      <div aria-hidden="true" style="position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; ${gridStyle}"></div>
    `;
  }
}

export class ZenThemeSwitcherElement extends HTMLElement {
  private unsubscribe: (() => void) | null = null;

  connectedCallback(): void {
    this.unsubscribe = zenTheme.subscribe(() => {
      this.render();
    });
  }

  disconnectedCallback(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }

  private render(): void {
    const { theme } = zenTheme.getState();
    this.innerHTML = `
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
        ${ZEN_UNIVERSAL_THEMES.map(
          (t) => `
          <button
            type="button"
            data-theme-id="${t.id}"
            class="zen-btn-base zen-btn-sm ${t.id === theme ? 'zen-btn-primary' : 'zen-btn-secondary'}"
          >
            <span style="width: 0.5rem; height: 0.5rem; border-radius: 9999px; background: ${t.accentHex}; display: inline-block;"></span>
            <span>${t.name}</span>
          </button>
        `
        ).join('')}
      </div>
    `;

    this.querySelectorAll<HTMLButtonElement>('[data-theme-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const nextId = btn.dataset.themeId as ZenThemeId | undefined;
        if (!nextId) return;
        zenAudio.playMicroClick(540);
        zenTheme.setTheme(nextId);
        this.dispatchEvent(
          new CustomEvent('zen-theme-change', {
            detail: zenTheme.getState(),
            bubbles: true,
            composed: true,
          })
        );
      });
    });
  }
}

export class ZenIconElement extends HTMLElement {
  static get observedAttributes(): readonly string[] {
    return ['name', 'size', 'tone', 'stroke-width', 'spin'];
  }

  connectedCallback(): void {
    this.render();
  }

  attributeChangedCallback(): void {
    if (this.isConnected) {
      this.render();
    }
  }

  private render(): void {
    const name = (this.getAttribute('name') as ZenIconName | null) ?? 'sparkles';
    const size = (this.getAttribute('size') as ZenIconSize | null) ?? 'md';
    const tone = (this.getAttribute('tone') as ZenIconTone | null) ?? 'inherit';
    const strokeWidth = Number(this.getAttribute('stroke-width') ?? 2);
    const spin = this.getAttribute('spin') === 'true';

    this.innerHTML = renderZenIconSvgMarkup({
      name,
      size,
      tone,
      strokeWidth,
      spin,
    });
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

export {
  CapriEngine,
  capri,
  CAPRI_SUBROUTINE_SKILLS,
  type CapriSubroutineId,
  type CapriAuditViolationCode,
  type CapriAuditViolation,
  type CapriThreatCategory,
  type CapriPromptInjectionThreat,
  type CapriPromptGuardResult,
  type CapriAuditReport,
  type CapriTelemetrySnapshot,
  type CapriLandmarkNode,
  type CapriUserFlowStep,
  type CapriComponentInventory,
  type CapriArchitectureDocu,
  type CapriSubroutineSkill,
  type CapriEngineListener,
} from '../capri/capri-engine';

export function registerZenElements(): void {
  if (typeof window === 'undefined' || !('customElements' in window)) return;

  if (!window.customElements.get('zen-icon')) {
    window.customElements.define('zen-icon', ZenIconElement);
  }
  if (!window.customElements.get('zen-ai-construct')) {
    window.customElements.define('zen-ai-construct', ZenAIConstructElement);
  }
  if (!window.customElements.get('zen-ambient-background')) {
    window.customElements.define(
      'zen-ambient-background',
      ZenAmbientBackgroundElement
    );
  }
  if (!window.customElements.get('zen-theme-switcher')) {
    window.customElements.define('zen-theme-switcher', ZenThemeSwitcherElement);
  }
}
