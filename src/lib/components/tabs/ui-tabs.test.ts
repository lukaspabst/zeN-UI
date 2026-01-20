import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './ui-tabs';
import { ZenTabs, ZenTab, ZenTabPanel } from './ui-tabs';

describe('ZenTabs', () => {
    let tabs: ZenTabs;

    beforeEach(async () => {
        tabs = document.createElement('zen-tabs') as ZenTabs;
        tabs.innerHTML = `
      <zen-tab slot="tabs" value="tab1">Tab 1</zen-tab>
      <zen-tab slot="tabs" value="tab2">Tab 2</zen-tab>
      <zen-tab-panel value="tab1">Content 1</zen-tab-panel>
      <zen-tab-panel value="tab2">Content 2</zen-tab-panel>
    `;
        tabs.active = 'tab1';
        document.body.appendChild(tabs);
        await tabs.updateComplete;
        // Wait for slot assignment
        await new Promise(r => setTimeout(r, 50));
    });

    afterEach(() => {
        tabs.remove();
    });

    it('should create the component', () => {
        expect(tabs).toBeInstanceOf(ZenTabs);
    });

    it('should have active property', () => {
        expect(tabs.active).toBe('tab1');
    });

    it('should render tab list', () => {
        const tabList = tabs.shadowRoot?.querySelector('.tab-list');
        expect(tabList).not.toBeNull();
    });

    it('should render indicator', () => {
        const indicator = tabs.shadowRoot?.querySelector('.indicator');
        expect(indicator).not.toBeNull();
    });

    it('should handle tab click', async () => {
        let receivedValue = '';
        tabs.addEventListener('change', (e: Event) => {
            receivedValue = (e as CustomEvent).detail;
        });

        // Find the tab element and trigger click via _handleTabClick
        const clickEvent = new MouseEvent('click', { bubbles: true });
        const tab2 = tabs.querySelector('zen-tab[value="tab2"]') as HTMLElement;
        Object.defineProperty(clickEvent, 'target', { value: tab2 });

        (tabs as unknown as { _handleTabClick: (e: Event) => void })._handleTabClick(clickEvent);
        await tabs.updateComplete;

        expect(tabs.active).toBe('tab2');
        expect(receivedValue).toBe('tab2');
    });

    it('should not change active for non-tab clicks', async () => {
        const initialActive = tabs.active;

        const clickEvent = new MouseEvent('click', { bubbles: true });
        const div = document.createElement('div');
        Object.defineProperty(clickEvent, 'target', { value: div });

        (tabs as unknown as { _handleTabClick: (e: Event) => void })._handleTabClick(clickEvent);
        await tabs.updateComplete;

        expect(tabs.active).toBe(initialActive);
    });

    it('should not change for tab without value', async () => {
        const initialActive = tabs.active;

        const clickEvent = new MouseEvent('click', { bubbles: true });
        const tabNoValue = document.createElement('zen-tab');
        Object.defineProperty(clickEvent, 'target', { value: tabNoValue });

        (tabs as unknown as { _handleTabClick: (e: Event) => void })._handleTabClick(clickEvent);
        await tabs.updateComplete;

        expect(tabs.active).toBe(initialActive);
    });
});

describe('ZenTab', () => {
    let tab: ZenTab;

    beforeEach(async () => {
        tab = document.createElement('zen-tab') as ZenTab;
        tab.value = 'test';
        tab.textContent = 'Test Tab';
        document.body.appendChild(tab);
        await tab.updateComplete;
    });

    afterEach(() => {
        tab.remove();
    });

    it('should create the component', () => {
        expect(tab).toBeInstanceOf(ZenTab);
    });

    it('should have value property', () => {
        expect(tab.value).toBe('test');
    });

    it('should render slot content', () => {
        const slot = tab.shadowRoot?.querySelector('slot');
        expect(slot).not.toBeNull();
    });
});

describe('ZenTabPanel', () => {
    let panel: ZenTabPanel;
    let tabs: ZenTabs;

    beforeEach(async () => {
        tabs = document.createElement('zen-tabs') as ZenTabs;
        tabs.active = 'panel1';
        panel = document.createElement('zen-tab-panel') as ZenTabPanel;
        panel.value = 'panel1';
        panel.innerHTML = 'Panel content';
        tabs.appendChild(panel);
        document.body.appendChild(tabs);
        await tabs.updateComplete;
        await panel.updateComplete;
    });

    afterEach(() => {
        tabs.remove();
    });

    it('should create the component', () => {
        expect(panel).toBeInstanceOf(ZenTabPanel);
    });

    it('should have value property', () => {
        expect(panel.value).toBe('panel1');
    });

    it('should be visible when active matches', async () => {
        await new Promise(r => setTimeout(r, 50));

        expect(panel.style.display).toBe('block');
    });

    it('should be hidden when active does not match', async () => {
        tabs.active = 'other';
        tabs.dispatchEvent(new CustomEvent('change', { detail: 'other' }));
        await new Promise(r => setTimeout(r, 50));

        expect(panel.style.display).toBe('none');
    });
});
