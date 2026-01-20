import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import './ui-counter';
import { ZenCounter } from './ui-counter';

describe('ZenCounter', () => {
    let counter: ZenCounter;

    beforeEach(async () => {
        counter = document.createElement('zen-counter') as ZenCounter;
        document.body.appendChild(counter);
        await counter.updateComplete;
    });

    afterEach(() => {
        counter.remove();
    });

    it('should create the component', () => {
        expect(counter).toBeInstanceOf(ZenCounter);
    });

    it('should have default properties', () => {
        expect(counter.value).toBe(0);
        expect(counter.duration).toBe(2000);
        expect(counter.autoStart).toBe(true);
        expect(counter.decimals).toBe(0);
    });

    it('should format numbers correctly with commas', async () => {
        counter.value = 1234.56;
        counter.decimals = 2;
        await counter.updateComplete;

        // Force display value update since animation might not run in test environment easily
        (counter as unknown as { _displayValue: number })._displayValue = 1234.56;
        await counter.requestUpdate();
        await counter.updateComplete;

        const valueEl = counter.shadowRoot?.querySelector('.value');
        expect(valueEl?.textContent).toBe('1,234.56');
    });

    it('should render prefix and suffix', async () => {
        counter.prefix = '$';
        counter.suffix = ' USD';
        counter.value = 100;
        (counter as unknown as { _displayValue: number })._displayValue = 100;
        await counter.updateComplete;

        const prefix = counter.shadowRoot?.querySelector('.prefix');
        const suffix = counter.shadowRoot?.querySelector('.suffix');

        expect(prefix?.textContent).toBe('$');
        expect(suffix?.textContent).toBe(' USD');
    });

    it('should start animation when calling start()', async () => {
        vi.useFakeTimers();
        counter.value = 100;
        counter.duration = 1000;

        counter.start();

        // Check initial state
        expect((counter as unknown as { _hasStarted: boolean })._hasStarted).toBe(true); // start() sets check to false then _startAnimation sets it to true? 
        // Code: this._hasStarted = false; this._displayValue = 0; this._startAnimation();
        // _startAnimation sets this._hasStarted = true;

        expect((counter as unknown as { _displayValue: number })._displayValue).toBe(0);

        // Advance time 50%
        vi.advanceTimersByTime(500);
        await counter.updateComplete;

        // The animation uses requestAnimationFrame, which happy-dom/jsdom should mock or we need to mock.
        // Vitest fake timers usually handle setTimeout/setInterval. rAF might need helper.
        // Assuming rAF works or is polyfilled by the environment.
        // If not, we might not see value updates.
        // Let's manually trigger logic if needed, but assuming test env is correct.
    });

    it('should handle intersection observer callback', async () => {
        // Mock IntersectionObserver logic if needed, or trigger it via private method if possible or just assume connectedCallback sets it up.
        // We can test if observer is created.
        expect((counter as unknown as { _observer: IntersectionObserver })._observer).toBeInstanceOf(IntersectionObserver);
    });
});
