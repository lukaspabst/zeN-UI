export type ZenThemeId =
  | 'obsidian-gold'
  | 'blackwall-crimson'
  | 'neon-emerald'
  | 'midnight-cobalt'
  | 'kontur-flame'
  | 'petrol-signal'
  | 'plum-citron'
  | 'noir-dune'
  | 'atelier-paper'
  | 'nordic-snow'
  | 'kyoto-matcha'
  | 'cyber-daylight'
  | 'silt-cobalt'
  | 'dolomites-rose'
  | 'rift-lavender'
  | 'daytrip-butter';

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
    id: 'kontur-flame',
    name: 'Kontur Flame',
    polarity: 'dark',
    tagline: 'Smoked monolith carbon with high-voltage industrial flame orange',
    canvasHex: '#09090B',
    accentHex: '#FE5121',
    secondaryHex: '#A1A1AA',
    inkHex: '#F5F5F3',
  },
  {
    id: 'petrol-signal',
    name: 'Petrol Signal',
    polarity: 'dark',
    tagline: 'Deep acoustic petrol slate paired with hyper-crisp signal lime',
    canvasHex: '#0B1D24',
    accentHex: '#D9FA57',
    secondaryHex: '#5EEAD4',
    inkHex: '#E6F7F5',
  },
  {
    id: 'plum-citron',
    name: 'Plum Citron',
    polarity: 'dark',
    tagline: 'Deep black-plum synth studio with ultraviolet & acid citron',
    canvasHex: '#120A1C',
    accentHex: '#C084FC',
    secondaryHex: '#DFFF56',
    inkHex: '#EFEAFC',
  },
  {
    id: 'noir-dune',
    name: 'Noir Dune',
    polarity: 'dark',
    tagline: 'Warm archival espresso asphalt with oasis turquoise & dune brass',
    canvasHex: '#0F0D0C',
    accentHex: '#2DD4BF',
    secondaryHex: '#D4A373',
    inkHex: '#F0ECE1',
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
  {
    id: 'silt-cobalt',
    name: 'Silt & Cobalt',
    polarity: 'light',
    tagline: 'Warm mineral sand & espresso ink clashed with electric ultramarine',
    canvasHex: '#EAE3D5',
    accentHex: '#1E50F5',
    secondaryHex: '#8B5E3C',
    inkHex: '#2D1B16',
  },
  {
    id: 'dolomites-rose',
    name: 'Dolomites Dawn',
    polarity: 'light',
    tagline: 'Alpine blush field-guide canvas with black-cherry & amber glow',
    canvasHex: '#F4E2E4',
    accentHex: '#9D174D',
    secondaryHex: '#D97706',
    inkHex: '#3B1626',
  },
  {
    id: 'rift-lavender',
    name: 'Rift Lavender',
    polarity: 'light',
    tagline: 'Cool haze-lavender equipment shell with black-plum & citron ink',
    canvasHex: '#ECE6FA',
    accentHex: '#6D28D9',
    secondaryHex: '#65A30D',
    inkHex: '#241332',
  },
  {
    id: 'daytrip-butter',
    name: 'Daytrip Butter',
    polarity: 'light',
    tagline: 'Analog butter-yellow studio stock with aubergine & candy berry',
    canvasHex: '#FDF0A6',
    accentHex: '#BE185D',
    secondaryHex: '#7E22CE',
    inkHex: '#3F1339',
  },
];

const POLARITY_COUNTERPARTS: Readonly<Record<ZenThemeId, ZenThemeId>> = {
  'blackwall-crimson': 'cyber-daylight',
  'cyber-daylight': 'blackwall-crimson',
  'neon-emerald': 'kyoto-matcha',
  'kyoto-matcha': 'neon-emerald',
  'midnight-cobalt': 'nordic-snow',
  'nordic-snow': 'midnight-cobalt',
  'obsidian-gold': 'atelier-paper',
  'atelier-paper': 'obsidian-gold',
  'kontur-flame': 'silt-cobalt',
  'silt-cobalt': 'kontur-flame',
  'petrol-signal': 'rift-lavender',
  'rift-lavender': 'petrol-signal',
  'plum-citron': 'dolomites-rose',
  'dolomites-rose': 'plum-citron',
  'noir-dune': 'daytrip-butter',
  'daytrip-butter': 'noir-dune',
};

export function resolveZenPolarityCounterpart(theme: ZenThemeId): ZenThemeId {
  return POLARITY_COUNTERPARTS[theme];
}

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
