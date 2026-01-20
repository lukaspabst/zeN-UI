import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './ui-hamburger-menu';
import { ZenHamburgerMenu } from './ui-hamburger-menu';

describe('ZenHamburgerMenu', () => {
    let menu: ZenHamburgerMenu;

    beforeEach(async () => {
        menu = document.createElement('zen-hamburger-menu') as ZenHamburgerMenu;
        menu.innerHTML = `
      <a href="#">Link 1</a>
      <a href="#">Link 2</a>
    `;
        document.body.appendChild(menu);
        await menu.updateComplete;
    });

    afterEach(() => {
        menu.remove();
    });

    it('should create the component', () => {
        expect(menu).toBeInstanceOf(ZenHamburgerMenu);
    });

    it('should have default properties', () => {
        expect(menu.open).toBe(false);
        expect(menu.variant).toBe('spin');
    });

    it('should toggle open on _toggle()', async () => {
        expect(menu.open).toBe(false);

        (menu as unknown as { _toggle: () => void })._toggle();
        await menu.updateComplete;

        expect(menu.open).toBe(true);
    });

    it('should toggle back on second _toggle()', async () => {
        (menu as unknown as { _toggle: () => void })._toggle();
        (menu as unknown as { _toggle: () => void })._toggle();
        await menu.updateComplete;

        expect(menu.open).toBe(false);
    });

    it('should dispatch toggle event', async () => {
        let receivedDetail: { open: boolean } | undefined;
        menu.addEventListener('toggle', (e: Event) => {
            receivedDetail = (e as CustomEvent<{ open: boolean }>).detail;
        });

        (menu as unknown as { _toggle: () => void })._toggle();

        expect(receivedDetail).toBeDefined();
        expect(receivedDetail!.open).toBe(true);
    });

    it('should close on _close()', async () => {
        menu.open = true;
        await menu.updateComplete;

        (menu as unknown as { _close: () => void })._close();
        await menu.updateComplete;

        expect(menu.open).toBe(false);
    });

    it('should dispatch toggle event on close', async () => {
        menu.open = true;
        await menu.updateComplete;

        let receivedDetail: { open: boolean } | undefined;
        menu.addEventListener('toggle', (e: Event) => {
            receivedDetail = (e as CustomEvent<{ open: boolean }>).detail;
        });

        (menu as unknown as { _close: () => void })._close();

        expect(receivedDetail).toBeDefined();
        expect(receivedDetail!.open).toBe(false);
    });

    it('should render hamburger button', async () => {
        const button = menu.shadowRoot?.querySelector('.hamburger');
        expect(button).not.toBeNull();
    });

    it('should render overlay', async () => {
        const overlay = menu.shadowRoot?.querySelector('.overlay');
        expect(overlay).not.toBeNull();
    });

    it('should render panel', async () => {
        const panel = menu.shadowRoot?.querySelector('.panel');
        expect(panel).not.toBeNull();
    });

    it('should toggle on hamburger click', async () => {
        const button = menu.shadowRoot?.querySelector('.hamburger') as HTMLElement;
        button.click();
        await menu.updateComplete;

        expect(menu.open).toBe(true);
    });

    it('should close on overlay click', async () => {
        menu.open = true;
        await menu.updateComplete;

        const overlay = menu.shadowRoot?.querySelector('.overlay') as HTMLElement;
        overlay.click();
        await menu.updateComplete;

        expect(menu.open).toBe(false);
    });

    it('should support spin variant', async () => {
        menu.variant = 'spin';
        await menu.updateComplete;

        expect(menu.variant).toBe('spin');
    });

    it('should support squeeze variant', async () => {
        menu.variant = 'squeeze';
        await menu.updateComplete;

        expect(menu.variant).toBe('squeeze');
    });

    it('should support arrow variant', async () => {
        menu.variant = 'arrow';
        await menu.updateComplete;

        expect(menu.variant).toBe('arrow');
    });
});
