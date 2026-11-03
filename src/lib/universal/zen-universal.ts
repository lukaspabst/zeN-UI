import {
  syncZenScrollbarStyles,
  type ZenDensityMode,
  type ZenRadiusMode,
  type ZenThemeId,
  type ZenThemeMetadata,
} from '../theme/ZenThemeProvider';
import type {
  ZenAICameraFraming,
  ZenAIDirective,
  ZenAIPersonaMode,
} from '../components/ZenAIConstruct';
import type { ZenBackgroundVariant } from '../components/ZenAmbientBackground';
import {
  renderZenIconSvgMarkup,
  type ZenIconName,
  type ZenIconSize,
  type ZenIconTone,
} from '../components/ZenIcon';

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
  if (/^(?:javascript|data|vbscript)\s*:/i.test(trimmed)) {
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
