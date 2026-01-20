import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './ui-tooltip';
import { ZenTooltip } from './ui-tooltip';

describe('ZenTooltip', () => {
    let tooltip: ZenTooltip;

    beforeEach(async () => {
        tooltip = document.createElement('zen-tooltip') as ZenTooltip;
        tooltip.content = 'Test tooltip content';
        tooltip.position = 'top';
        document.body.appendChild(tooltip);
        await tooltip.updateComplete;
    });

    afterEach(() => {
        tooltip.remove();
        // Clean up any portal tooltips
        document.querySelectorAll('.zen-tooltip-portal').forEach(el => el.remove());
    });

    it('should create the component', () => {
        expect(tooltip).toBeInstanceOf(ZenTooltip);
    });

    it('should have default properties', () => {
        const newTooltip = document.createElement('zen-tooltip') as ZenTooltip;
        expect(newTooltip.content).toBe('');
        expect(newTooltip.position).toBe('top');
    });

    it('should show tooltip on _show()', async () => {
        (tooltip as unknown as { _show: () => void })._show();
        await new Promise(r => setTimeout(r, 50));

        const portal = document.querySelector('.zen-tooltip-portal');
        expect(portal).not.toBeNull();
        expect(portal?.textContent).toBe('Test tooltip content');
    });

    it('should hide tooltip on _hide()', async () => {
        (tooltip as unknown as { _show: () => void })._show();
        await new Promise(r => setTimeout(r, 50));

        (tooltip as unknown as { _hide: () => void })._hide();
        await new Promise(r => setTimeout(r, 250)); // Wait for hide transition

        const portal = document.querySelector('.zen-tooltip-portal');
        expect(portal).toBeNull();
    });

    it('should update position on bottom', async () => {
        tooltip.position = 'bottom';
        await tooltip.updateComplete;

        (tooltip as unknown as { _show: () => void })._show();
        await new Promise(r => setTimeout(r, 50));

        const portal = document.querySelector('.zen-tooltip-portal');
        expect(portal).not.toBeNull();
    });

    it('should remove tooltip on disconnectedCallback', async () => {
        (tooltip as unknown as { _show: () => void })._show();
        await new Promise(r => setTimeout(r, 50));

        tooltip.remove();

        const portal = document.querySelector('.zen-tooltip-portal');
        expect(portal).toBeNull();
    });

    it('should not create duplicate tooltips', async () => {
        (tooltip as unknown as { _show: () => void })._show();
        (tooltip as unknown as { _show: () => void })._show();
        await new Promise(r => setTimeout(r, 50));

        const portals = document.querySelectorAll('.zen-tooltip-portal');
        expect(portals.length).toBe(1);
    });

    it('should handle default position case', async () => {
        tooltip.position = 'invalid' as unknown as string;
        await tooltip.updateComplete;

        (tooltip as unknown as { _show: () => void })._show();
        await new Promise(r => setTimeout(r, 50));

        const portal = document.querySelector('.zen-tooltip-portal');
        expect(portal).not.toBeNull();
    });
});
