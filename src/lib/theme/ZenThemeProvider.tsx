import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  ZEN_THEMES,
  syncZenScrollbarStyles,
  type ZenDensityMode,
  type ZenRadiusMode,
  type ZenThemeId,
  type ZenThemeMetadata,
  type ZenThemeMode,
  type ZenThemeTokenOverrides,
} from './zen-theme-core';

export {
  ZEN_THEMES,
  syncZenScrollbarStyles,
  type ZenDensityMode,
  type ZenRadiusMode,
  type ZenThemeId,
  type ZenThemeMetadata,
  type ZenThemeMode,
  type ZenThemeTokenOverrides,
};

export interface ZenThemeContextValue {
  readonly theme: ZenThemeId;
  readonly themeMeta: ZenThemeMetadata;
  readonly polarity: 'dark' | 'light';
  readonly density: ZenDensityMode;
  readonly radius: ZenRadiusMode;
  readonly reducedMotion: boolean;
  readonly themes: readonly ZenThemeMetadata[];
  readonly setTheme: (next: ZenThemeId) => void;
  readonly togglePolarity: () => void;
  readonly setDensity: (next: ZenDensityMode) => void;
  readonly setRadius: (next: ZenRadiusMode) => void;
}

let zenThemeContextInstance: ReturnType<
  typeof createContext<ZenThemeContextValue | null>
> | null = null;

function getZenThemeContext() {
  if (!zenThemeContextInstance) {
    zenThemeContextInstance = createContext<ZenThemeContextValue | null>(null);
  }
  return zenThemeContextInstance;
}

export interface ZenThemeProviderProps {
  readonly defaultTheme?: ZenThemeId;
  readonly defaultDensity?: ZenDensityMode;
  readonly defaultRadius?: ZenRadiusMode;
  readonly overrides?: ZenThemeTokenOverrides;
  readonly syncDocumentRoot?: boolean;
  readonly children: ReactNode;
}

export function ZenThemeProvider({
  defaultTheme = 'blackwall-crimson',
  defaultDensity = 'comfortable',
  defaultRadius = 'architectural',
  overrides,
  syncDocumentRoot = true,
  children,
}: ZenThemeProviderProps) {
  const [theme, setTheme] = useState<ZenThemeId>(defaultTheme);
  const [density, setDensity] = useState<ZenDensityMode>(defaultDensity);
  const [radius, setRadius] = useState<ZenRadiusMode>(defaultRadius);
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const themeMeta =
    ZEN_THEMES.find((t) => t.id === theme) ?? ZEN_THEMES[0];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!syncDocumentRoot || typeof document === 'undefined') return;
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-polarity', themeMeta.polarity);
    root.setAttribute('data-density', density);
    root.setAttribute('data-radius', radius);

    if (overrides?.accentPrimary) {
      root.style.setProperty('--zen-accent-primary', overrides.accentPrimary);
    } else {
      root.style.removeProperty('--zen-accent-primary');
    }
    if (overrides?.bgCanvas) {
      root.style.setProperty('--zen-bg-canvas', overrides.bgCanvas);
    } else {
      root.style.removeProperty('--zen-bg-canvas');
    }
    if (overrides?.surface1) {
      root.style.setProperty('--zen-surface-1', overrides.surface1);
    } else {
      root.style.removeProperty('--zen-surface-1');
    }
    if (overrides?.inkPrimary) {
      root.style.setProperty('--zen-ink-primary', overrides.inkPrimary);
    } else {
      root.style.removeProperty('--zen-ink-primary');
    }

    syncZenScrollbarStyles(themeMeta, overrides);
  }, [theme, themeMeta, density, radius, overrides, syncDocumentRoot]);

  const togglePolarity = () => {
    setTheme((prev) => {
      const current = ZEN_THEMES.find((t) => t.id === prev) ?? ZEN_THEMES[0];
      if (current.polarity === 'dark') {
        if (prev === 'blackwall-crimson') return 'cyber-daylight';
        if (prev === 'neon-emerald') return 'kyoto-matcha';
        if (prev === 'midnight-cobalt') return 'nordic-snow';
        return 'atelier-paper';
      } else {
        if (prev === 'cyber-daylight') return 'blackwall-crimson';
        if (prev === 'kyoto-matcha') return 'neon-emerald';
        if (prev === 'nordic-snow') return 'midnight-cobalt';
        return 'obsidian-gold';
      }
    });
  };

  const value = useMemo<ZenThemeContextValue>(
    () => ({
      theme,
      themeMeta,
      polarity: themeMeta.polarity,
      density,
      radius,
      reducedMotion,
      themes: ZEN_THEMES,
      setTheme,
      togglePolarity,
      setDensity,
      setRadius,
    }),
    [theme, themeMeta, density, radius, reducedMotion]
  );

  const ThemeCtx = getZenThemeContext();

  return (
    <ThemeCtx.Provider value={value}>
      {children}
    </ThemeCtx.Provider>
  );
}

export function useZenTheme(): ZenThemeContextValue {
  const ctx = useContext(getZenThemeContext());
  if (!ctx) {
    throw new Error('useZenTheme must be used within a ZenThemeProvider');
  }
  return ctx;
}
