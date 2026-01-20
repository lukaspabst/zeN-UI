import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './ui-theme-picker';
import { ZenThemePicker } from './ui-theme-picker';

describe('ZenThemePicker', () => {
    let picker: ZenThemePicker;

    beforeEach(async () => {
        localStorage.removeItem('zen-color-theme');
        picker = document.createElement('zen-theme-picker') as ZenThemePicker;
        document.body.appendChild(picker);
        await picker.updateComplete;
    });

    afterEach(() => {
        picker.remove();
        localStorage.removeItem('zen-color-theme');
    });

    it('should create the component', () => {
        expect(picker).toBeInstanceOf(ZenThemePicker);
    });

    it('should render picker container', async () => {
        const pickerContainer = picker.shadowRoot?.querySelector('.picker');
        expect(pickerContainer).not.toBeNull();
    });

    it('should render all theme swatches', async () => {
        const swatches = picker.shadowRoot?.querySelectorAll('.swatch');
        expect(swatches?.length).toBe(6); // default, ocean, forest, sunset, rose, amber
    });

    it('should select theme via _setTheme()', async () => {
        let receivedTheme = '';
        picker.addEventListener('color-theme-change', (e: Event) => {
            receivedTheme = (e as CustomEvent).detail.theme;
        });

        (picker as unknown as { _setTheme: (theme: string) => void })._setTheme('ocean');
        await picker.updateComplete;

        expect(receivedTheme).toBe('ocean');
    });

    it('should dispatch color-theme-change event on theme selection', async () => {
        let eventReceived = false;
        picker.addEventListener('color-theme-change', () => {
            eventReceived = true;
        });

        (picker as unknown as { _setTheme: (theme: string) => void })._setTheme('forest');

        expect(eventReceived).toBe(true);
    });

    it('should mark selected theme as active', async () => {
        (picker as unknown as { _setTheme: (theme: string) => void })._setTheme('ocean');
        await picker.updateComplete;

        const activeButton = picker.shadowRoot?.querySelector('.swatch.active');
        expect(activeButton).not.toBeNull();
        expect(activeButton?.classList.contains('swatch-ocean')).toBe(true);
    });

    it('should respond to click on swatch', async () => {
        let receivedTheme = '';
        picker.addEventListener('color-theme-change', (e: Event) => {
            receivedTheme = (e as CustomEvent).detail.theme;
        });

        const oceanSwatch = picker.shadowRoot?.querySelector('.swatch-ocean') as HTMLElement;
        expect(oceanSwatch).not.toBeNull();

        oceanSwatch?.click();
        await picker.updateComplete;

        expect(receivedTheme).toBe('ocean');
    });

    it('should have swatches with correct theme classes', async () => {
        const themes = ['default', 'ocean', 'forest', 'sunset', 'rose', 'amber'];

        for (const theme of themes) {
            const swatch = picker.shadowRoot?.querySelector(`.swatch-${theme}`);
            expect(swatch).not.toBeNull();
        }
    });
});
