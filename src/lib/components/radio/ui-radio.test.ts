import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './ui-radio';
import { ZenRadio } from './ui-radio';

describe('ZenRadio', () => {
    let radio: ZenRadio;

    beforeEach(async () => {
        radio = document.createElement('zen-radio') as ZenRadio;
        radio.value = 'option1';
        radio.innerHTML = 'Option 1';
        document.body.appendChild(radio);
        await radio.updateComplete;
    });

    afterEach(() => {
        radio.remove();
    });

    it('should create the component', () => {
        expect(radio).toBeInstanceOf(ZenRadio);
    });

    it('should have default properties', () => {
        expect(radio.checked).toBe(false);
        expect(radio.disabled).toBe(false);
        expect(radio.value).toBe('option1');
    });

    it('should check on _toggle()', async () => {
        expect(radio.checked).toBe(false);

        (radio as unknown as { _toggle: () => void })._toggle();
        await radio.updateComplete;

        expect(radio.checked).toBe(true);
    });

    it('should dispatch change event on toggle', async () => {
        let receivedDetail: { checked: boolean; value: string } | null = null;
        radio.addEventListener('change', (e: Event) => {
            receivedDetail = (e as CustomEvent).detail;
        });

        (radio as unknown as { _toggle: () => void })._toggle();

        expect(receivedDetail?.checked).toBe(true);
        expect(receivedDetail?.value).toBe('option1');
    });

    it('should not toggle when disabled', async () => {
        radio.disabled = true;
        await radio.updateComplete;

        (radio as unknown as { _toggle: () => void })._toggle();
        await radio.updateComplete;

        expect(radio.checked).toBe(false);
    });

    it('should not toggle when already checked', async () => {
        radio.checked = true;
        await radio.updateComplete;

        let eventFired = false;
        radio.addEventListener('change', () => {
            eventFired = true;
        });

        (radio as unknown as { _toggle: () => void })._toggle();
        await radio.updateComplete;

        expect(eventFired).toBe(false);
        expect(radio.checked).toBe(true);
    });

    it('should toggle on circle click', async () => {
        const circle = radio.shadowRoot?.querySelector('.circle') as HTMLElement;
        expect(circle).not.toBeNull();

        circle.click();
        await radio.updateComplete;

        expect(radio.checked).toBe(true);
    });

    it('should toggle on label click', async () => {
        const label = radio.shadowRoot?.querySelector('.label') as HTMLElement;
        expect(label).not.toBeNull();

        label.click();
        await radio.updateComplete;

        expect(radio.checked).toBe(true);
    });

    it('should handle keyboard space', async () => {
        const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
        radio.dispatchEvent(event);
        await radio.updateComplete;

        expect(radio.checked).toBe(true);
    });

    it('should handle keyboard enter', async () => {
        const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
        radio.dispatchEvent(event);
        await radio.updateComplete;

        expect(radio.checked).toBe(true);
    });

    it('should set role attribute', () => {
        expect(radio.getAttribute('role')).toBe('radio');
    });

    it('should set tabindex attribute', () => {
        expect(radio.getAttribute('tabindex')).toBe('0');
    });

    it('should update aria-checked on checked change', async () => {
        radio.checked = true;
        await radio.updateComplete;

        expect(radio.getAttribute('aria-checked')).toBe('true');
    });

    it('should update aria-disabled and tabindex on disabled change', async () => {
        radio.disabled = true;
        await radio.updateComplete;

        expect(radio.getAttribute('aria-disabled')).toBe('true');
        expect(radio.getAttribute('tabindex')).toBe('-1');
    });
});
