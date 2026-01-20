import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './ui-donut-chart';
import { ZenDonutChart } from './ui-donut-chart';

describe('ZenDonutChart', () => {
    let chart: ZenDonutChart;
    const data = [
        { label: 'A', value: 30, color: 'red' },
        { label: 'B', value: 70, color: 'blue' }
    ];

    beforeEach(async () => {
        chart = document.createElement('zen-donut-chart') as ZenDonutChart;
        chart.data = data;
        document.body.appendChild(chart);
        await chart.updateComplete;
    });

    afterEach(() => {
        chart.remove();
    });

    it('should create the component', () => {
        expect(chart).toBeInstanceOf(ZenDonutChart);
    });

    it('should handle default properties', () => {
        expect(chart.size).toBe(200);
        expect(chart.thickness).toBe(30);
        expect(chart.showLegend).toBe(true);
    });

    it('should render segments correctly', async () => {
        // Trigger visibility
        (chart as any)._visible = true;
        await chart.updateComplete;

        const segments = chart.shadowRoot?.querySelectorAll('.segment');
        expect(segments?.length).toBe(2);

        const firstSegment = segments?.[0] as SVGElement;
        expect(firstSegment.getAttribute('stroke')).toBe('red');
    });

    it('should render center label and value', async () => {
        chart.centerLabel = 'Total';
        chart.centerValue = '100';
        await chart.updateComplete;

        const label = chart.shadowRoot?.querySelector('.center-label');
        const value = chart.shadowRoot?.querySelector('.center-value');

        expect(label?.textContent).toBe('Total');
        expect(value?.textContent).toBe('100');
    });

    it('should toggle hovered index on interactions', async () => {
        const segments = chart.shadowRoot?.querySelectorAll('.segment');
        const firstSegment = segments?.[0] as Element;

        firstSegment.dispatchEvent(new MouseEvent('mouseenter'));
        await chart.updateComplete;

        expect((chart as any)._hoveredIndex).toBe(0);
        expect(firstSegment.classList.contains('hovered')).toBe(true);

        firstSegment.dispatchEvent(new MouseEvent('mouseleave'));
        await chart.updateComplete;

        expect((chart as any)._hoveredIndex).toBe(-1);
        expect(firstSegment.classList.contains('hovered')).toBe(false);
    });

    it('should interact with legend items', async () => {
        const legendItems = chart.shadowRoot?.querySelectorAll('.legend-item');
        expect(legendItems?.length).toBe(2);

        const firstItem = legendItems?.[0] as HTMLElement;
        firstItem.dispatchEvent(new MouseEvent('mouseenter'));
        await chart.updateComplete;

        expect((chart as any)._hoveredIndex).toBe(0);
    });
});
