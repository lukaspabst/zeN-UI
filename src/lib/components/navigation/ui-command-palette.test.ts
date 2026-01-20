import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './ui-command-palette';
import { ZenCommandPalette } from './ui-command-palette';

describe('ZenCommandPalette', () => {
    let palette: ZenCommandPalette;
    const items = [
        { id: '1', label: 'Item 1', group: 'Group 1' },
        { id: '2', label: 'Item 2', group: 'Group 1' },
        { id: '3', label: 'Apple', group: 'Fruits', icon: '🍎' },
        { id: '4', label: 'Banana', group: 'Fruits', shortcut: 'Ctrl+B' },
    ];

    beforeEach(async () => {
        palette = document.createElement('zen-command-palette') as ZenCommandPalette;
        palette.items = items;
        document.body.appendChild(palette);
        await palette.updateComplete;
    });

    afterEach(() => {
        palette.remove();
    });

    it('should create the component', () => {
        expect(palette).toBeInstanceOf(ZenCommandPalette);
    });

    it('should have default properties', () => {
        expect(palette.open).toBe(false);
        expect(palette.placeholder).toBe('Type a command or search...');
        expect(palette.items).toEqual(items);
    });

    it('should open directly via property', async () => {
        palette.open = true;
        await palette.updateComplete;

        expect(palette.getAttribute('open')).not.toBeNull();
        const overlay = palette.shadowRoot?.querySelector('.overlay');
        expect(window.getComputedStyle(overlay!).visibility).toBe('visible');
    });

    it('should toggle open via keyboard shortcut (Ctrl+K)', async () => {
        const event = new KeyboardEvent('keydown', {
            key: 'k',
            ctrlKey: true,
            bubbles: true,
            cancelable: true
        });
        document.dispatchEvent(event);
        await palette.updateComplete;

        expect(palette.open).toBe(true);
        expect(event.defaultPrevented).toBe(true);

        // Toggle close
        document.dispatchEvent(event);
        await palette.updateComplete;
        expect(palette.open).toBe(false);
    });

    it('should toggle open via keyboard shortcut (Meta+K)', async () => {
        const event = new KeyboardEvent('keydown', {
            key: 'k',
            metaKey: true,
            bubbles: true,
            cancelable: true
        });
        document.dispatchEvent(event);
        await palette.updateComplete;

        expect(palette.open).toBe(true);
    });

    it('should close on escape key', async () => {
        palette.open = true;
        await palette.updateComplete;

        const event = new KeyboardEvent('keydown', {
            key: 'Escape',
            bubbles: true
        });
        document.dispatchEvent(event);
        await palette.updateComplete;

        expect(palette.open).toBe(false);
    });

    it('should close on overlay click', async () => {
        palette.open = true;
        await palette.updateComplete;

        const overlay = palette.shadowRoot?.querySelector('.overlay') as HTMLElement;
        overlay.click();
        await palette.updateComplete;

        expect(palette.open).toBe(false);
    });

    it('should filter items based on search query', async () => {
        palette.open = true;
        await palette.updateComplete;

        const input = palette.shadowRoot?.querySelector('.search-input') as HTMLInputElement;
        input.value = 'Apple';
        input.dispatchEvent(new Event('input'));
        await palette.updateComplete;

        const results = palette.shadowRoot?.querySelectorAll('.item');
        expect(results?.length).toBe(1);
        expect(results?.[0].textContent).toContain('Apple');
    });

    it('should reset selection when searching', async () => {
        palette.open = true;
        await palette.updateComplete;

        // Select second item
        const event = new KeyboardEvent('keydown', {
            key: 'ArrowDown',
            bubbles: true
        });
        document.dispatchEvent(event);
        await palette.updateComplete;

        // Use internal state access since _selectedIndex is private
        expect((palette as any)._selectedIndex).toBe(1);

        // Search
        const input = palette.shadowRoot?.querySelector('.search-input') as HTMLInputElement;
        input.value = 'Item';
        input.dispatchEvent(new Event('input'));
        await palette.updateComplete;

        expect((palette as unknown as { _selectedIndex: number })._selectedIndex).toBe(0);
    });

    it('should navigate items with arrow keys', async () => {
        palette.open = true;
        await palette.updateComplete;

        const downEvent = new KeyboardEvent('keydown', {
            key: 'ArrowDown',
            bubbles: true,
            cancelable: true
        });
        document.dispatchEvent(downEvent);
        await palette.updateComplete;

        expect((palette as unknown as { _selectedIndex: number })._selectedIndex).toBe(1);

        document.dispatchEvent(downEvent);
        await palette.updateComplete;
        expect((palette as unknown as { _selectedIndex: number })._selectedIndex).toBe(2);

        const upEvent = new KeyboardEvent('keydown', {
            key: 'ArrowUp',
            bubbles: true,
            cancelable: true
        });
        document.dispatchEvent(upEvent);
        await palette.updateComplete;

        expect((palette as unknown as { _selectedIndex: number })._selectedIndex).toBe(1);
    });

    it('should clamp navigation within bounds', async () => {
        palette.open = true;
        await palette.updateComplete;

        // Try to go up past 0
        const upEvent = new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true });
        document.dispatchEvent(upEvent);
        await palette.updateComplete;
        expect((palette as unknown as { _selectedIndex: number })._selectedIndex).toBe(0);

        // Try to go down past last item (4 items total, index 3)
        // Set index to 3 first
        (palette as unknown as { _selectedIndex: number })._selectedIndex = 3;
        const downEvent = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true });
        document.dispatchEvent(downEvent);
        await palette.updateComplete;
        expect((palette as unknown as { _selectedIndex: number })._selectedIndex).toBe(3);
    });

    it('should select item on click and dispatch event', async () => {
        palette.open = true;
        await palette.updateComplete;

        let selectedItem: any = null;
        palette.addEventListener('select', (e: any) => {
            selectedItem = e.detail;
        });

        const items = palette.shadowRoot?.querySelectorAll('.item');
        (items?.[1] as HTMLElement).click();
        await palette.updateComplete;

        expect(selectedItem).toEqual(expect.objectContaining({ id: '2' }));
        expect(palette.open).toBe(false);
    });

    it('should select item on Enter key and dispatch event', async () => {
        palette.open = true;
        await palette.updateComplete;

        // Move to second item
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await palette.updateComplete;

        let selectedItem: any = null;
        palette.addEventListener('select', (e: any) => {
            selectedItem = e.detail;
        });

        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await palette.updateComplete;

        expect(selectedItem).toEqual(expect.objectContaining({ id: '2' }));
        expect(palette.open).toBe(false);
    });

    it('should display empty state when no matches', async () => {
        palette.open = true;
        await palette.updateComplete;

        const input = palette.shadowRoot?.querySelector('.search-input') as HTMLInputElement;
        input.value = 'NonExistentItem';
        input.dispatchEvent(new Event('input'));
        await palette.updateComplete;

        const emptyState = palette.shadowRoot?.querySelector('.empty-state');
        expect(emptyState).not.toBeNull();
        expect(emptyState?.textContent).toContain('NonExistentItem');
    });

    it('should group items correctly', async () => {
        palette.open = true;
        await palette.updateComplete;

        const groupLabels = palette.shadowRoot?.querySelectorAll('.group-label');
        // We have 'Group 1' and 'Fruits'
        expect(groupLabels?.length).toBe(2);
        expect(groupLabels?.[0].textContent).toBe('Group 1');
        expect(groupLabels?.[1].textContent).toBe('Fruits');
    });

    it('should render shortcuts and icons', async () => {
        palette.open = true;
        await palette.updateComplete;

        // Apple has icon
        const appleItem = Array.from(palette.shadowRoot?.querySelectorAll('.item') || []).find(el => el.textContent?.includes('Apple'));
        expect(appleItem?.querySelector('.item-icon')?.textContent).toBe('🍎');

        // Banana has shortcut
        const bananaItem = Array.from(palette.shadowRoot?.querySelectorAll('.item') || []).find(el => el.textContent?.includes('Banana'));
        expect(bananaItem?.querySelector('.item-shortcut kbd')?.textContent).toBe('Ctrl');
    });

    it('should update filter when items property changes', async () => {
        palette.open = true;
        await palette.updateComplete;

        palette.items = [...[{ id: 'new', label: 'New Item' }]];
        await palette.updateComplete;
        await new Promise(r => setTimeout(r, 50));

        const items = palette.shadowRoot?.querySelectorAll('.item');
        expect(items?.length).toBe(1);
        expect(items?.[0].textContent).toContain('New Item');
    });
});
