import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './ui-input';
import { ZenInput } from './ui-input';

describe('ZenInput', () => {
    let input: ZenInput;

    beforeEach(async () => {
        input = document.createElement('zen-input') as ZenInput;
        input.label = 'Test Label';
        input.placeholder = 'Enter text';
        document.body.appendChild(input);
        await input.updateComplete;
    });

    afterEach(() => {
        input.remove();
    });

    it('should create the component', () => {
        expect(input).toBeInstanceOf(ZenInput);
    });

    it('should have default properties', () => {
        expect(input.value).toBe('');
        expect(input.disabled).toBe(false);
        expect(input.type).toBe('text');
    });

    it('should update value on input', async () => {
        let receivedValue = '';
        input.addEventListener('input', (e: Event) => {
            receivedValue = (e as CustomEvent).detail;
        });

        const nativeInput = input.shadowRoot?.querySelector('input') as HTMLInputElement;
        nativeInput.value = 'test value';
        nativeInput.dispatchEvent(new Event('input'));
        await input.updateComplete;

        expect(input.value).toBe('test value');
        expect(receivedValue).toBe('test value');
    });

    it('should add focused class on focus', async () => {
        const nativeInput = input.shadowRoot?.querySelector('input') as HTMLInputElement;
        nativeInput.dispatchEvent(new Event('focus'));
        await input.updateComplete;

        const container = input.shadowRoot?.querySelector('.input-container');
        expect(container?.classList.contains('focused')).toBe(true);
    });

    it('should remove focused class on blur', async () => {
        const nativeInput = input.shadowRoot?.querySelector('input') as HTMLInputElement;
        nativeInput.dispatchEvent(new Event('focus'));
        await input.updateComplete;

        nativeInput.dispatchEvent(new Event('blur'));
        await input.updateComplete;

        const container = input.shadowRoot?.querySelector('.input-container');
        expect(container?.classList.contains('focused')).toBe(false);
    });

    it('should display error message', async () => {
        input.error = 'This field is required';
        await input.updateComplete;

        const errorMsg = input.shadowRoot?.querySelector('.message.error');
        expect(errorMsg).not.toBeNull();
        expect(errorMsg?.textContent).toBe('This field is required');
    });

    it('should display helper message', async () => {
        input.helper = 'Enter your email address';
        await input.updateComplete;

        const helperMsg = input.shadowRoot?.querySelector('.message.helper');
        expect(helperMsg).not.toBeNull();
        expect(helperMsg?.textContent).toBe('Enter your email address');
    });

    it('should prioritize error over helper', async () => {
        input.error = 'Error message';
        input.helper = 'Helper message';
        await input.updateComplete;

        const errorMsg = input.shadowRoot?.querySelector('.message.error');
        const helperMsg = input.shadowRoot?.querySelector('.message.helper');

        expect(errorMsg).not.toBeNull();
        expect(helperMsg).toBeNull();
    });

    it('should add error class to container', async () => {
        input.error = 'Error';
        await input.updateComplete;

        const container = input.shadowRoot?.querySelector('.input-container');
        expect(container?.classList.contains('error')).toBe(true);
    });

    it('should add disabled class to container', async () => {
        input.disabled = true;
        await input.updateComplete;

        const container = input.shadowRoot?.querySelector('.input-container');
        expect(container?.classList.contains('disabled')).toBe(true);
    });

    it('should render label', async () => {
        const label = input.shadowRoot?.querySelector('label');
        expect(label?.textContent).toBe('Test Label');
    });

    it('should handle prefix slot', async () => {
        const prefix = document.createElement('span');
        prefix.slot = 'prefix';
        prefix.textContent = '📧';
        input.appendChild(prefix);

        // Trigger slotchange
        await input.updateComplete;
        await new Promise(r => setTimeout(r, 50));

        const prefixSlot = input.shadowRoot?.querySelector('slot[name="prefix"]') as HTMLSlotElement;
        expect(prefixSlot).not.toBeNull();
    });

    it('should handle suffix slot', async () => {
        const suffix = document.createElement('span');
        suffix.slot = 'suffix';
        suffix.textContent = '✓';
        input.appendChild(suffix);

        await input.updateComplete;
        await new Promise(r => setTimeout(r, 50));

        const suffixSlot = input.shadowRoot?.querySelector('slot[name="suffix"]') as HTMLSlotElement;
        expect(suffixSlot).not.toBeNull();
    });
});
