import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './ui-textarea';
import { ZenTextarea } from './ui-textarea';

describe('ZenTextarea', () => {
    let textarea: ZenTextarea;

    beforeEach(async () => {
        textarea = document.createElement('zen-textarea') as ZenTextarea;
        textarea.label = 'Description';
        textarea.placeholder = 'Enter description';
        document.body.appendChild(textarea);
        await textarea.updateComplete;
    });

    afterEach(() => {
        textarea.remove();
    });

    it('should create the component', () => {
        expect(textarea).toBeInstanceOf(ZenTextarea);
    });

    it('should have default properties', () => {
        expect(textarea.value).toBe('');
        expect(textarea.rows).toBe(3);
    });

    it('should update value on input', async () => {
        let receivedValue = '';
        textarea.addEventListener('input', (e: Event) => {
            receivedValue = (e as CustomEvent).detail;
        });

        const nativeTextarea = textarea.shadowRoot?.querySelector('textarea') as HTMLTextAreaElement;
        nativeTextarea.value = 'test value';
        nativeTextarea.dispatchEvent(new Event('input'));
        await textarea.updateComplete;

        expect(textarea.value).toBe('test value');
        expect(receivedValue).toBe('test value');
    });

    it('should render label when provided', async () => {
        const label = textarea.shadowRoot?.querySelector('label');
        expect(label).not.toBeNull();
        expect(label?.textContent).toBe('Description');
    });

    it('should not render label when empty', async () => {
        textarea.label = '';
        await textarea.updateComplete;

        const label = textarea.shadowRoot?.querySelector('label');
        expect(label).toBeNull();
    });

    it('should set rows attribute', async () => {
        textarea.rows = 5;
        await textarea.updateComplete;

        const nativeTextarea = textarea.shadowRoot?.querySelector('textarea') as HTMLTextAreaElement;
        expect(nativeTextarea.rows).toBe(5);
    });

    it('should set placeholder attribute', async () => {
        const nativeTextarea = textarea.shadowRoot?.querySelector('textarea') as HTMLTextAreaElement;
        expect(nativeTextarea.placeholder).toBe('Enter description');
    });

    it('should bind value to native textarea', async () => {
        textarea.value = 'Preset value';
        await textarea.updateComplete;

        const nativeTextarea = textarea.shadowRoot?.querySelector('textarea') as HTMLTextAreaElement;
        expect(nativeTextarea.value).toBe('Preset value');
    });
});
