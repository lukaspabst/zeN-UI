import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './ui-checkbox';
import { ZenCheckbox } from './ui-checkbox';

describe('ZenCheckbox', () => {
    let checkbox: ZenCheckbox;

    beforeEach(async () => {
        checkbox = document.createElement('zen-checkbox') as ZenCheckbox;
        document.body.appendChild(checkbox);
        await checkbox.updateComplete;
    });

    afterEach(() => {
        checkbox.remove();
    });

    it('should create the component', () => {
        expect(checkbox).toBeInstanceOf(ZenCheckbox);
    });

    it('should have default properties', () => {
        expect(checkbox.checked).toBe(false);
        expect(checkbox.disabled).toBe(false);
    });

    it('should toggle on _toggle()', async () => {
        expect(checkbox.checked).toBe(false);

        (checkbox as unknown as { _toggle: () => void })._toggle();
        await checkbox.updateComplete;

        expect(checkbox.checked).toBe(true);
    });

    it('should toggle back on second _toggle()', async () => {
        (checkbox as unknown as { _toggle: () => void })._toggle();
        (checkbox as unknown as { _toggle: () => void })._toggle();
        await checkbox.updateComplete;

        expect(checkbox.checked).toBe(false);
    });

    it('should dispatch change event on toggle', async () => {
        let receivedValue: boolean | null = null;
        checkbox.addEventListener('change', (e: Event) => {
            receivedValue = (e as CustomEvent).detail;
        });

        (checkbox as unknown as { _toggle: () => void })._toggle();

        expect(receivedValue).toBe(true);
    });

    it('should not toggle when disabled', async () => {
        checkbox.disabled = true;
        await checkbox.updateComplete;

        (checkbox as unknown as { _toggle: () => void })._toggle();
        await checkbox.updateComplete;

        expect(checkbox.checked).toBe(false);
    });

    it('should respond to click on box element', async () => {
        const box = checkbox.shadowRoot?.querySelector('.box');
        expect(box).not.toBeNull();

        (box as HTMLElement)?.click();
        await checkbox.updateComplete;

        expect(checkbox.checked).toBe(true);
    });

    it('should respond to click on label element', async () => {
        const label = checkbox.shadowRoot?.querySelector('.label');
        expect(label).not.toBeNull();

        (label as HTMLElement)?.click();
        await checkbox.updateComplete;

        expect(checkbox.checked).toBe(true);
    });
});
