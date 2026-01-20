import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './ui-calendar';
import { ZenCalendar } from './ui-calendar';

const meta: Meta = {
    title: 'Components/Data Display/Calendar',
    component: 'zen-calendar',
    tags: ['autodocs'],
    argTypes: {
        value: { control: 'text' },
        enableViewSwitch: { control: 'boolean' },
    },
    args: {
        value: '',
        enableViewSwitch: true,
    },
    render: (args) => html`
    <zen-calendar 
      .value=${args.value} 
      ?enableViewSwitch=${args.enableViewSwitch}
    ></zen-calendar>
  `,
    parameters: {
        a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
    },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    parameters: {
        a11y: { disable: true },
    },
};

export const WithSelectedDate: Story = {
    args: {
        value: '2026-01-20',
    },
    parameters: {
        a11y: { disable: true },
    },
};

export const ViewSwitchDisabled: Story = {
    args: {
        enableViewSwitch: false,
    },
    parameters: {
        a11y: { disable: true },
    },
};

export const InteractiveTest: Story = {
    parameters: {
        a11y: { disable: true },
    },
    render: () => {
        const testNavigation = () => {
            const calendar = document.querySelector('zen-calendar') as ZenCalendar;
            if (calendar) {
                // Test navigation methods
                (calendar as unknown as { _prev: () => void })._prev();
                setTimeout(() => {
                    (calendar as unknown as { _next: () => void })._next();
                }, 100);
                setTimeout(() => {
                    (calendar as unknown as { _next: () => void })._next();
                }, 200);
            }
        };

        const testViewSwitch = () => {
            const calendar = document.querySelector('zen-calendar') as ZenCalendar;
            if (calendar) {
                // Cycle through views
                (calendar as unknown as { _switchView: () => void })._switchView(); // day -> month
                setTimeout(() => {
                    (calendar as unknown as { _switchView: () => void })._switchView(); // month -> year
                }, 300);
                setTimeout(() => {
                    (calendar as unknown as { _switchView: () => void })._switchView(); // year -> day
                }, 600);
            }
        };

        const testMonthSelection = () => {
            const calendar = document.querySelector('zen-calendar') as ZenCalendar;
            if (calendar) {
                (calendar as unknown as { _switchView: () => void })._switchView(); // go to month view
                setTimeout(() => {
                    (calendar as unknown as { _selectMonth: (m: number) => void })._selectMonth(5); // select June
                }, 200);
            }
        };

        const testYearSelection = () => {
            const calendar = document.querySelector('zen-calendar') as ZenCalendar;
            if (calendar) {
                (calendar as unknown as { _switchView: () => void })._switchView(); // day -> month
                (calendar as unknown as { _switchView: () => void })._switchView(); // month -> year
                setTimeout(() => {
                    (calendar as unknown as { _selectYear: (y: number) => void })._selectYear(2025);
                }, 200);
            }
        };

        const testDaySelection = () => {
            const calendar = document.querySelector('zen-calendar') as ZenCalendar;
            if (calendar) {
                (calendar as unknown as { _selectDay: (d: number) => void })._selectDay(15);
            }
        };

        return html`
      <div style="display: flex; gap: 24px; flex-wrap: wrap;">
        <zen-calendar @change=${(e: CustomEvent) => console.log('Date selected:', e.detail)}></zen-calendar>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <button @click=${testNavigation} style="padding: 8px 16px; cursor: pointer;">Test Navigation (Prev/Next)</button>
          <button @click=${testViewSwitch} style="padding: 8px 16px; cursor: pointer;">Test View Switching</button>
          <button @click=${testMonthSelection} style="padding: 8px 16px; cursor: pointer;">Test Month Selection</button>
          <button @click=${testYearSelection} style="padding: 8px 16px; cursor: pointer;">Test Year Selection</button>
          <button @click=${testDaySelection} style="padding: 8px 16px; cursor: pointer;">Test Day Selection</button>
        </div>
      </div>
    `;
    },
};

export const AllViews: Story = {
    parameters: {
        a11y: { disable: true },
    },
    render: () => {
        const showMonthView = () => {
            const calendar = document.querySelector('#month-calendar') as ZenCalendar;
            if (calendar) {
                (calendar as unknown as { _view: string })._view = 'month';
                calendar.requestUpdate();
            }
        };

        const showYearView = () => {
            const calendar = document.querySelector('#year-calendar') as ZenCalendar;
            if (calendar) {
                (calendar as unknown as { _view: string })._view = 'year';
                calendar.requestUpdate();
            }
        };

        // Trigger the view changes after render
        setTimeout(() => {
            showMonthView();
            showYearView();
        }, 100);

        return html`
      <div style="display: flex; gap: 24px; flex-wrap: wrap;">
        <div>
          <h4 style="color: var(--zen-text-2); margin: 0 0 8px 0;">Day View</h4>
          <zen-calendar></zen-calendar>
        </div>
        <div>
          <h4 style="color: var(--zen-text-2); margin: 0 0 8px 0;">Month View</h4>
          <zen-calendar id="month-calendar"></zen-calendar>
        </div>
        <div>
          <h4 style="color: var(--zen-text-2); margin: 0 0 8px 0;">Year View</h4>
          <zen-calendar id="year-calendar"></zen-calendar>
        </div>
      </div>
    `;
    },
};
