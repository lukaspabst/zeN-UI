import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './ui-toast';
import { ZenToastContainer, toast, ToastType } from './ui-toast';

describe('ZenToastContainer', () => {
    let container: ZenToastContainer;

    beforeEach(async () => {
        container = document.createElement('zen-toast-container') as ZenToastContainer;
        document.body.appendChild(container);
        await container.updateComplete;
    });

    afterEach(() => {
        container.remove();
        // Clean up any other containers
        document.querySelectorAll('zen-toast-container').forEach(el => el.remove());
    });

    it('should create the component', () => {
        expect(container).toBeInstanceOf(ZenToastContainer);
    });

    it('should add toast via addToast()', async () => {
        container.addToast('Test message', 'info', 3000);
        await container.updateComplete;

        const toasts = container.shadowRoot?.querySelectorAll('.toast');
        expect(toasts?.length).toBe(1);
    });

    it('should add multiple toasts', async () => {
        container.addToast('Message 1', 'info');
        container.addToast('Message 2', 'success');
        container.addToast('Message 3', 'error');
        await container.updateComplete;

        const toasts = container.shadowRoot?.querySelectorAll('.toast');
        expect(toasts?.length).toBe(3);
    });

    it('should show correct icon for success type', async () => {
        container.addToast('Success message', 'success');
        await container.updateComplete;

        const toastEl = container.shadowRoot?.querySelector('.toast-success');
        expect(toastEl).not.toBeNull();
    });

    it('should show correct icon for error type', async () => {
        container.addToast('Error message', 'error');
        await container.updateComplete;

        const toastEl = container.shadowRoot?.querySelector('.toast-error');
        expect(toastEl).not.toBeNull();
    });

    it('should show correct icon for warning type', async () => {
        container.addToast('Warning message', 'warning');
        await container.updateComplete;

        const toastEl = container.shadowRoot?.querySelector('.toast-warning');
        expect(toastEl).not.toBeNull();
    });

    it('should show correct icon for info type (default)', async () => {
        container.addToast('Info message', 'info');
        await container.updateComplete;

        const toastEl = container.shadowRoot?.querySelector('.toast-info');
        expect(toastEl).not.toBeNull();
    });

    it('should add closing class when removeToast is called', async () => {
        container.addToast('Test message', 'info', 10000);
        await container.updateComplete;

        const toastEl = container.shadowRoot?.querySelector('.toast');
        const toastId = toastEl?.id;

        expect(toastId).toBeDefined();
        if (toastId) {
            container.removeToast(toastId);
            await container.updateComplete;

            // Check that closing class was added
            const closingToast = container.shadowRoot?.querySelector('.toast.closing');
            expect(closingToast).not.toBeNull();
        }
    });

    it('should remove toast from array after animation ends', async () => {
        container.addToast('Test message', 'info', 10000);
        await container.updateComplete;

        const toastEl = container.shadowRoot?.querySelector('.toast');
        const toastId = toastEl?.id;

        expect(toastId).toBeDefined();
        if (toastId) {
            container.removeToast(toastId);
            await container.updateComplete;

            // Manually dispatch animationend event to trigger removal
            const updatedToastEl = container.shadowRoot?.getElementById(toastId);
            if (updatedToastEl) {
                updatedToastEl.dispatchEvent(new AnimationEvent('animationend'));
                await container.updateComplete;
            }

            // Check that toast is removed from array
            const remainingToasts = container.shadowRoot?.querySelectorAll('.toast');
            expect(remainingToasts?.length).toBe(0);
        }
    });

    it('should handle removeToast for non-existent toast gracefully', async () => {
        container.addToast('Test message', 'info', 10000);
        await container.updateComplete;

        // Try to remove a toast that doesn't exist (the else branch)
        container.removeToast('non-existent-id');
        await container.updateComplete;

        // The existing toast should still be there
        const toasts = container.shadowRoot?.querySelectorAll('.toast');
        expect(toasts?.length).toBe(1);
    });

    it('should handle _getIcon for all types', () => {
        const iconMethod = (container as unknown as { _getIcon: (type: ToastType) => string })._getIcon;

        expect(iconMethod.call(container, 'success')).toBe('check');
        expect(iconMethod.call(container, 'error')).toBe('alert-circle');
        expect(iconMethod.call(container, 'warning')).toBe('alert-triangle');
        expect(iconMethod.call(container, 'info')).toBe('info');
    });

    it('should render toast with correct structure', async () => {
        container.addToast('Test message', 'success');
        await container.updateComplete;

        const toastEl = container.shadowRoot?.querySelector('.toast');
        const iconEl = toastEl?.querySelector('.icon');
        const contentEl = toastEl?.querySelector('.content');
        const progressEl = toastEl?.querySelector('.progress');

        expect(iconEl).not.toBeNull();
        expect(contentEl).not.toBeNull();
        expect(progressEl).not.toBeNull();
        expect(contentEl?.textContent).toBe('Test message');
    });

    it('should use default type when not specified', async () => {
        container.addToast('Default type message');
        await container.updateComplete;

        const toastEl = container.shadowRoot?.querySelector('.toast-info');
        expect(toastEl).not.toBeNull();
    });

    it('should set progress bar animation duration', async () => {
        container.addToast('Test message', 'info', 5000);
        await container.updateComplete;

        const progress = container.shadowRoot?.querySelector('.progress') as HTMLElement;
        expect(progress?.style.animationDuration).toBe('5000ms');
    });
});

describe('toast() helper function', () => {
    afterEach(() => {
        document.querySelectorAll('zen-toast-container').forEach(el => el.remove());
    });

    it('should create container if not exists', () => {
        toast('Test message', 'info');

        const container = document.querySelector('zen-toast-container');
        expect(container).not.toBeNull();
    });

    it('should reuse existing container', () => {
        toast('Message 1', 'info');
        toast('Message 2', 'success');

        const containers = document.querySelectorAll('zen-toast-container');
        expect(containers.length).toBe(1);
    });

    it('should work with default type', () => {
        toast('Default type message');

        const container = document.querySelector('zen-toast-container');
        expect(container).not.toBeNull();
    });

    it('should append container to body when creating new one', async () => {
        // Make sure no container exists
        expect(document.querySelector('zen-toast-container')).toBeNull();

        toast('Test message');

        const container = document.querySelector('zen-toast-container');
        expect(container).not.toBeNull();
        expect(container?.parentElement).toBe(document.body);
    });

    it('should call addToast on existing container', async () => {
        // Create and add a container first
        const existingContainer = document.createElement('zen-toast-container') as ZenToastContainer;
        document.body.appendChild(existingContainer);
        await existingContainer.updateComplete;

        toast('Test message', 'success');
        await existingContainer.updateComplete;

        const toasts = existingContainer.shadowRoot?.querySelectorAll('.toast');
        expect(toasts?.length).toBe(1);
    });
});
