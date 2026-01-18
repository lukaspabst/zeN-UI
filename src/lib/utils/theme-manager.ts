export type ThemeMode = 'light' | 'dark' | 'system';
export type ColorTheme = 'default' | 'ocean' | 'forest' | 'sunset' | 'rose' | 'amber';

const MODE_KEY = 'zen-theme-mode';
const COLOR_KEY = 'zen-theme-color';

export class ZenThemeManager {
    static getMode(): ThemeMode {
        return (localStorage.getItem(MODE_KEY) as ThemeMode) || 'system';
    }

    static setMode(mode: ThemeMode) {
        localStorage.setItem(MODE_KEY, mode);
        this.applyMode(mode);
    }

    static getColorTheme(): ColorTheme {
        return (localStorage.getItem(COLOR_KEY) as ColorTheme) || 'default';
    }

    static setColorTheme(theme: ColorTheme) {
        localStorage.setItem(COLOR_KEY, theme);
        this.applyColorTheme(theme);
    }

    static init() {
        this.applyMode(this.getMode());
        this.applyColorTheme(this.getColorTheme());

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (this.getMode() === 'system') {
                this.applyMode('system');
            }
        });
    }

    private static applyMode(mode: ThemeMode) {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');

        if (mode !== 'system') {
            root.classList.add(mode);
        }
    }

    private static applyColorTheme(theme: ColorTheme) {
        const root = document.documentElement;
        const classes = Array.from(root.classList);
        classes.forEach(c => {
            if (c.startsWith('theme-')) {
                root.classList.remove(c);
            }
        });

        if (theme !== 'default') {
            root.classList.add(`theme-${theme}`);
        }
    }
}
