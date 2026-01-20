import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './ui-accordion';
import { ZenAccordion, ZenAccordionItem } from './ui-accordion';

describe('ZenAccordion', () => {
    let accordion: ZenAccordion;

    beforeEach(async () => {
        accordion = document.createElement('zen-accordion') as ZenAccordion;
        document.body.appendChild(accordion);
        await accordion.updateComplete;
    });

    afterEach(() => {
        accordion.remove();
    });

    it('should create the component', () => {
        expect(accordion).toBeInstanceOf(ZenAccordion);
    });

    it('should have default multiple property as false', () => {
        expect(accordion.multiple).toBe(false);
    });

    it('should render slot', () => {
        const slot = accordion.shadowRoot?.querySelector('slot');
        expect(slot).not.toBeNull();
    });
});

describe('ZenAccordionItem', () => {
    let item: ZenAccordionItem;

    beforeEach(async () => {
        item = document.createElement('zen-accordion-item') as ZenAccordionItem;
        item.header = 'Test Header';
        item.innerHTML = '<p>Test content</p>';
        document.body.appendChild(item);
        await item.updateComplete;
    });

    afterEach(() => {
        item.remove();
    });

    it('should create the component', () => {
        expect(item).toBeInstanceOf(ZenAccordionItem);
    });

    it('should have default properties', () => {
        expect(item.open).toBe(false);
        expect(item.header).toBe('Test Header');
    });

    it('should toggle on _toggle()', async () => {
        expect(item.open).toBe(false);

        (item as unknown as { _toggle: () => void })._toggle();
        await item.updateComplete;

        expect(item.open).toBe(true);
    });

    it('should toggle back on second _toggle()', async () => {
        (item as unknown as { _toggle: () => void })._toggle();
        (item as unknown as { _toggle: () => void })._toggle();
        await item.updateComplete;

        expect(item.open).toBe(false);
    });

    it('should dispatch toggle event', async () => {
        let receivedDetail: boolean | null = null;
        item.addEventListener('toggle', (e: Event) => {
            receivedDetail = (e as CustomEvent).detail;
        });

        (item as unknown as { _toggle: () => void })._toggle();

        expect(receivedDetail).toBe(true);
    });

    it('should toggle on header click', async () => {
        const header = item.shadowRoot?.querySelector('.header') as HTMLElement;
        expect(header).not.toBeNull();

        header.click();
        await item.updateComplete;

        expect(item.open).toBe(true);
    });

    it('should render header text', async () => {
        const headerSpan = item.shadowRoot?.querySelector('.header span');
        expect(headerSpan?.textContent).toContain('Test Header');
    });

    it('should render icon', async () => {
        const icon = item.shadowRoot?.querySelector('.icon svg');
        expect(icon).not.toBeNull();
    });
});
