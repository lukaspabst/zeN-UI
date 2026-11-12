export type ZenThemeId =
  | 'obsidian-gold'
  | 'blackwall-crimson'
  | 'neon-emerald'
  | 'midnight-cobalt'
  | 'atelier-paper'
  | 'nordic-snow'
  | 'kyoto-matcha'
  | 'cyber-daylight';

export type ZenThemeMode = ZenThemeId | 'obsidian' | 'paper';
export type ZenDensityMode = 'comfortable' | 'compact';
export type ZenRadiusMode = 'sharp' | 'architectural' | 'soft';

export interface ZenThemeMetadata {
  readonly id: ZenThemeId;
  readonly name: string;
  readonly polarity: 'dark' | 'light';
  readonly tagline: string;
  readonly canvasHex: string;
  readonly accentHex: string;
  readonly secondaryHex: string;
  readonly inkHex: string;
}

export const ZEN_THEMES: readonly ZenThemeMetadata[] = [
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
    tagline: 'Raw botanical stone & forest ink for calm workspaces',
    canvasHex: '#F3F5F0',
    accentHex: '#15803D',
    secondaryHex: '#0F766E',
    inkHex: '#142018',
  },
  {
    id: 'cyber-daylight',
    name: 'Arasaka Daylight',
    polarity: 'light',
    tagline: 'High-contrast titanium white with razor crimson signal',
    canvasHex: '#F2F2F5',
    accentHex: '#E11D48',
    secondaryHex: '#0284C7',
    inkHex: '#09090D',
  },
];

export interface ZenThemeTokenOverrides {
  readonly accentPrimary?: string;
  readonly bgCanvas?: string;
  readonly surface1?: string;
  readonly inkPrimary?: string;
}

export function syncZenScrollbarStyles(
  themeMeta: ZenThemeMetadata,
  overrides?: ZenThemeTokenOverrides
): void {
  if (typeof document === 'undefined') return;
  const accent = overrides?.accentPrimary ?? themeMeta.accentHex;
  const track = overrides?.bgCanvas ?? themeMeta.canvasHex;
  const borderSubtle =
    themeMeta.polarity === 'dark'
      ? 'rgba(255, 255, 255, 0.12)'
      : 'rgba(15, 23, 42, 0.14)';

  const styleId = 'zen-theme-scrollbar';
  let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = styleId;
    document.head.appendChild(styleEl);
  }

  styleEl.textContent = `
@supports (-moz-appearance: none) {
  html, body, * {
    scrollbar-width: thin;
    scrollbar-color: ${accent} ${track};
  }
}
::-webkit-scrollbar,
html::-webkit-scrollbar,
body::-webkit-scrollbar,
*::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-track,
html::-webkit-scrollbar-track,
body::-webkit-scrollbar-track,
*::-webkit-scrollbar-track {
  background-color: ${track};
  border-left: 1px solid ${borderSubtle};
}
::-webkit-scrollbar-thumb,
html::-webkit-scrollbar-thumb,
body::-webkit-scrollbar-thumb,
*::-webkit-scrollbar-thumb {
  background-color: color-mix(in srgb, ${accent} 68%, ${track});
  border: 2px solid ${track};
  border-radius: 9999px;
}
::-webkit-scrollbar-thumb:hover,
html::-webkit-scrollbar-thumb:hover,
body::-webkit-scrollbar-thumb:hover,
*::-webkit-scrollbar-thumb:hover {
  background-color: ${accent};
  border: 2px solid ${track};
}
::-webkit-scrollbar-thumb:active,
html::-webkit-scrollbar-thumb:active,
body::-webkit-scrollbar-thumb:active,
*::-webkit-scrollbar-thumb:active {
  background-color: ${themeMeta.secondaryHex};
  border: 2px solid ${track};
}
::-webkit-scrollbar-corner,
html::-webkit-scrollbar-corner,
body::-webkit-scrollbar-corner,
*::-webkit-scrollbar-corner {
  background-color: ${track};
}
`.trim();
}
