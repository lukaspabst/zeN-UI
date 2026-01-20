import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './ui-select';
import { ZenSelect } from './ui-select';

describe('ZenSelect', () => {
    let select: ZenSelect;

    beforeEach(async () => {
        select = document.createElement('zen-select') as ZenSelect;
        select.placeholder = 'Select an option';
        select.options = [
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
            { value: '3', label: 'Option 3' },
        ];
        document.body.appendChild(select);
        await select.updateComplete;
    });

    afterEach(() => {
        select.remove();
    });

    it('should create the component', () => {
        expect(select).toBeInstanceOf(ZenSelect);
    });

    it('should have default properties', () => {
        expect(select.value).toBe('');
        expect(select.disabled).toBe(false);
        expect(select.placeholder).toBe('Select an option');
    });

    it('should toggle dropdown on _toggle()', async () => {
        const openBefore = (select as unknown as { _open: boolean })._open;
        expect(openBefore).toBe(false);

        (select as unknown as { _toggle: () => void })._toggle();
        await select.updateComplete;

        const openAfter = (select as unknown as { _open: boolean })._open;
        expect(openAfter).toBe(true);
    });

    it('should close dropdown on second _toggle()', async () => {
        (select as unknown as { _toggle: () => void })._toggle();
        (select as unknown as { _toggle: () => void })._toggle();
        await select.updateComplete;

        const isOpen = (select as unknown as { _open: boolean })._open;
        expect(isOpen).toBe(false);
    });

    it('should not toggle when disabled', async () => {
        select.disabled = true;
        await select.updateComplete;

        (select as unknown as { _toggle: () => void })._toggle();
        await select.updateComplete;

        const isOpen = (select as unknown as { _open: boolean })._open;
        expect(isOpen).toBe(false);
    });

    it('should select an option via _select()', async () => {
        let receivedValue = '';
        select.addEventListener('change', (e: Event) => {
            receivedValue = (e as CustomEvent).detail;
        });

        (select as unknown as { _select: (value: string) => void })._select('2');
        await select.updateComplete;

        expect(select.value).toBe('2');
        expect(receivedValue).toBe('2');
    });

    it('should close dropdown after selection', async () => {
        (select as unknown as { _toggle: () => void })._toggle();
        await select.updateComplete;

        (select as unknown as { _select: (value: string) => void })._select('1');
        await select.updateComplete;

        const isOpen = (select as unknown as { _open: boolean })._open;
        expect(isOpen).toBe(false);
    });

    it('should display selected label', async () => {
        (select as unknown as { _select: (value: string) => void })._select('1');
        await select.updateComplete;

        const trigger = select.shadowRoot?.querySelector('.trigger span');
        expect(trigger?.textContent).toBe('Option 1');
    });

    it('should close on click outside', async () => {
        (select as unknown as { _toggle: () => void })._toggle();
        await select.updateComplete;

        // Simulate click outside
        const outsideElement = document.createElement('div');
        document.body.appendChild(outsideElement);

        const clickEvent = new MouseEvent('click', { bubbles: true });
        Object.defineProperty(clickEvent, 'target', { value: outsideElement });

        (select as unknown as { _onClickOutside: (e: MouseEvent) => void })._onClickOutside(clickEvent);
        await select.updateComplete;

        const isOpen = (select as unknown as { _open: boolean })._open;
        expect(isOpen).toBe(false);

        outsideElement.remove();
    });

    it('should not close when clicking inside', async () => {
        (select as unknown as { _toggle: () => void })._toggle();
        await select.updateComplete;

        // Simulate click inside
        const clickEvent = new MouseEvent('click', { bubbles: true });
        Object.defineProperty(clickEvent, 'target', { value: select });

        (select as unknown as { _onClickOutside: (e: MouseEvent) => void })._onClickOutside(clickEvent);
        await select.updateComplete;

        const isOpen = (select as unknown as { _open: boolean })._open;
        expect(isOpen).toBe(true);
    });

    it('should display placeholder when no value selected', async () => {
        const trigger = select.shadowRoot?.querySelector('.trigger');
        expect(trigger?.textContent).toContain('Select an option');
    });

    it('should render all options', async () => {
        (select as unknown as { _toggle: () => void })._toggle();
        await select.updateComplete;

        const options = select.shadowRoot?.querySelectorAll('.option');
        expect(options?.length).toBe(3);
    });

    it('should render label when provided', async () => {
        select.label = 'Choose an item';
        await select.updateComplete;

        const label = select.shadowRoot?.querySelector('.label');
        expect(label?.textContent).toBe('Choose an item');
    });

    it('should mark selected option', async () => {
        select.value = '2';
        (select as unknown as { _toggle: () => void })._toggle();
        await select.updateComplete;

        const selectedOption = select.shadowRoot?.querySelector('.option.selected');
        expect(selectedOption).not.toBeNull();
        expect(selectedOption?.textContent?.trim()).toBe('Option 2');
    });
});
