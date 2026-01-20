import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './ui-dialog';
import { ZenDialog } from './ui-dialog';

describe('ZenDialog', () => {
    let dialog: ZenDialog;

    beforeEach(async () => {
        dialog = document.createElement('zen-dialog') as ZenDialog;
        dialog.title = 'Test Dialog';
        dialog.innerHTML = `<p>Dialog content</p>`;
        document.body.appendChild(dialog);
        await dialog.updateComplete;
    });

    afterEach(() => {
        dialog.remove();
        document.body.style.overflow = '';
    });

    it('should create the component', () => {
        expect(dialog).toBeInstanceOf(ZenDialog);
    });

    it('should have default properties', () => {
        expect(dialog.open).toBe(false);
        expect(dialog.scrollLock).toBe(true);
    });

    it('should have a native dialog element', () => {
        const nativeDialog = dialog.shadowRoot?.querySelector('dialog');
        expect(nativeDialog).not.toBeNull();
    });

    it('should open when open property is set to true', async () => {
        dialog.open = true;
        await dialog.updateComplete;

        const nativeDialog = dialog.shadowRoot?.querySelector('dialog');
        expect(nativeDialog?.open).toBe(true);
    });

    it('should close when open property is set to false', async () => {
        dialog.open = true;
        await dialog.updateComplete;

        dialog.open = false;
        await dialog.updateComplete;

        const nativeDialog = dialog.shadowRoot?.querySelector('dialog');
        expect(nativeDialog?.open).toBe(false);
    });

    it('should apply scroll lock when open and scrollLock is true', async () => {
        dialog.scrollLock = true;
        dialog.open = true;
        await dialog.updateComplete;

        expect(document.body.style.overflow).toBe('hidden');
    });

    it('should not apply scroll lock when scrollLock is false', async () => {
        dialog.scrollLock = false;
        document.body.style.overflow = '';
        dialog.open = true;
        await dialog.updateComplete;

        // When scrollLock is false, overflow should not be hidden
        expect(document.body.style.overflow).toBe('');
    });

    it('should remove scroll lock when dialog is closed', async () => {
        dialog.scrollLock = true;
        dialog.open = true;
        await dialog.updateComplete;

        expect(document.body.style.overflow).toBe('hidden');

        dialog.open = false;
        await dialog.updateComplete;

        expect(document.body.style.overflow).toBe('');
    });

    it('should close via _close() method', async () => {
        dialog.open = true;
        await dialog.updateComplete;

        (dialog as unknown as { _close: () => void })._close();
        await dialog.updateComplete;

        expect(dialog.open).toBe(false);
    });

    it('should dispatch close event when closing', async () => {
        let closeCalled = false;
        dialog.addEventListener('close', () => {
            closeCalled = true;
        });

        dialog.open = true;
        await dialog.updateComplete;

        (dialog as unknown as { _close: () => void })._close();

        expect(closeCalled).toBe(true);
    });

    it('should have close button that works', async () => {
        dialog.open = true;
        await dialog.updateComplete;

        const closeButton = dialog.shadowRoot?.querySelector('.close-btn');
        expect(closeButton).not.toBeNull();

        (closeButton as HTMLElement)?.click();
        await dialog.updateComplete;

        expect(dialog.open).toBe(false);
    });

    it('should display title', async () => {
        dialog.title = 'My Test Title';
        dialog.open = true;
        await dialog.updateComplete;

        const header = dialog.shadowRoot?.querySelector('.header h2');
        expect(header?.textContent).toBe('My Test Title');
    });

    it('should render content slot', async () => {
        dialog.open = true;
        await dialog.updateComplete;

        const contentSlot = dialog.shadowRoot?.querySelector('.content slot');
        expect(contentSlot).not.toBeNull();
    });

    it('should render footer slot', async () => {
        dialog.open = true;
        await dialog.updateComplete;

        const footerSlot = dialog.shadowRoot?.querySelector('.footer slot[name="footer"]');
        expect(footerSlot).not.toBeNull();
    });
});
