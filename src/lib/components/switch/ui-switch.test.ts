import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './ui-switch';
import { ZenSwitch } from './ui-switch';

describe('ZenSwitch', () => {
    let switchEl: ZenSwitch;

    beforeEach(async () => {
        switchEl = document.createElement('zen-switch') as ZenSwitch;
        document.body.appendChild(switchEl);
        await switchEl.updateComplete;
    });

    afterEach(() => {
        switchEl.remove();
    });

    it('should create the component', () => {
        expect(switchEl).toBeInstanceOf(ZenSwitch);
    });

    it('should have default properties', () => {
        expect(switchEl.checked).toBe(false);
        expect(switchEl.disabled).toBe(false);
    });

    it('should toggle on _toggle()', async () => {
        expect(switchEl.checked).toBe(false);

        (switchEl as unknown as { _toggle: () => void })._toggle();
        await switchEl.updateComplete;

        expect(switchEl.checked).toBe(true);
    });

    it('should toggle back on second _toggle()', async () => {
        (switchEl as unknown as { _toggle: () => void })._toggle();
        (switchEl as unknown as { _toggle: () => void })._toggle();
        await switchEl.updateComplete;

        expect(switchEl.checked).toBe(false);
    });

    it('should dispatch change event on toggle', async () => {
        let receivedValue: boolean | null = null;
        switchEl.addEventListener('change', (e: Event) => {
            receivedValue = (e as CustomEvent).detail;
        });

        (switchEl as unknown as { _toggle: () => void })._toggle();

        expect(receivedValue).toBe(true);
    });

    it('should not toggle when disabled', async () => {
        switchEl.disabled = true;
        await switchEl.updateComplete;

        (switchEl as unknown as { _toggle: () => void })._toggle();
        await switchEl.updateComplete;

        expect(switchEl.checked).toBe(false);
    });

    it('should respond to click on switch element', async () => {
        const switchDiv = switchEl.shadowRoot?.querySelector('.switch');
        expect(switchDiv).not.toBeNull();

        (switchDiv as HTMLElement)?.click();
        await switchEl.updateComplete;

        expect(switchEl.checked).toBe(true);
    });

    it('should not respond to click when disabled', async () => {
        switchEl.disabled = true;
        await switchEl.updateComplete;

        const switchDiv = switchEl.shadowRoot?.querySelector('.switch');
        (switchDiv as HTMLElement)?.click();
        await switchEl.updateComplete;

        expect(switchEl.checked).toBe(false);
    });
});
