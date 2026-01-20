import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './ui-theme-toggle';
import { ZenThemeToggle } from './ui-theme-toggle';

describe('ZenThemeToggle', () => {
    let toggle: ZenThemeToggle;

    beforeEach(async () => {
        localStorage.removeItem('zen-theme-mode');
        toggle = document.createElement('zen-theme-toggle') as ZenThemeToggle;
        document.body.appendChild(toggle);
        await toggle.updateComplete;
    });

    afterEach(() => {
        toggle.remove();
        localStorage.removeItem('zen-theme-mode');
    });

    it('should create the component', () => {
        expect(toggle).toBeInstanceOf(ZenThemeToggle);
    });

    it('should have toggle button', async () => {
        const button = toggle.shadowRoot?.querySelector('.toggle');
        expect(button).not.toBeNull();
    });

    it('should cycle mode on _cycleMode()', async () => {
        const initialMode = toggle.shadowRoot?.querySelector('.toggle')?.getAttribute('data-mode');

        (toggle as unknown as { _cycleMode: () => void })._cycleMode();
        await toggle.updateComplete;

        const newMode = toggle.shadowRoot?.querySelector('.toggle')?.getAttribute('data-mode');
        expect(newMode).not.toBe(initialMode);
    });

    it('should dispatch theme-change event on mode change', async () => {
        let eventReceived = false;
        let receivedDetail = null;
        toggle.addEventListener('theme-change', (e: Event) => {
            eventReceived = true;
            receivedDetail = (e as CustomEvent).detail;
        });

        (toggle as unknown as { _cycleMode: () => void })._cycleMode();

        expect(eventReceived).toBe(true);
        expect(receivedDetail).not.toBeNull();
    });

    it('should respond to click', async () => {
        const button = toggle.shadowRoot?.querySelector('.toggle') as HTMLElement;
        expect(button).not.toBeNull();

        const initialMode = button.getAttribute('data-mode');
        button.click();
        await toggle.updateComplete;

        const newMode = button.getAttribute('data-mode');
        expect(newMode).not.toBe(initialMode);
    });

    it('should show correct icons', async () => {
        const sunIcon = toggle.shadowRoot?.querySelector('.icon-sun');
        const moonIcon = toggle.shadowRoot?.querySelector('.icon-moon');
        const systemIcon = toggle.shadowRoot?.querySelector('.icon-system');

        expect(sunIcon).not.toBeNull();
        expect(moonIcon).not.toBeNull();
        expect(systemIcon).not.toBeNull();
    });

    it('should cycle through all three modes', async () => {
        const modes: string[] = [];

        const initialMode = toggle.shadowRoot?.querySelector('.toggle')?.getAttribute('data-mode');
        modes.push(initialMode || '');

        (toggle as unknown as { _cycleMode: () => void })._cycleMode();
        await toggle.updateComplete;
        const mode1 = toggle.shadowRoot?.querySelector('.toggle')?.getAttribute('data-mode');
        modes.push(mode1 || '');

        (toggle as unknown as { _cycleMode: () => void })._cycleMode();
        await toggle.updateComplete;
        const mode2 = toggle.shadowRoot?.querySelector('.toggle')?.getAttribute('data-mode');
        modes.push(mode2 || '');

        (toggle as unknown as { _cycleMode: () => void })._cycleMode();
        await toggle.updateComplete;
        const mode3 = toggle.shadowRoot?.querySelector('.toggle')?.getAttribute('data-mode');
        modes.push(mode3 || '');

        // After 3 cycles, should return to initial mode
        expect(mode3).toBe(initialMode);
    });
});
