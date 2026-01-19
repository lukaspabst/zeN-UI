import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './ui-donut-chart';

const meta: Meta = {
  title: 'Components/Data Display/Donut Chart',
  component: 'zen-donut-chart',
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'range', min: 100, max: 300, step: 20 } },
    thickness: { control: { type: 'range', min: 10, max: 60, step: 5 } },
    animated: { control: 'boolean' },
    showLegend: { control: 'boolean' },
    centerLabel: { control: 'text' },
    centerValue: { control: 'text' },
  },
  args: {
    centerLabel: 'Total',
    centerValue: '$12.5k',
  },
  parameters: {
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
};

export default meta;
type Story = StoryObj;

const sampleData = [
  { label: 'Electronics', value: 4500 },
  { label: 'Clothing', value: 3200 },
  { label: 'Books', value: 1800 },
  { label: 'Home', value: 2500 },
];

export const Default: Story = {
  render: (args) => html`
    <div style="padding: 40px;">
      <zen-donut-chart 
        .data=${sampleData}
        size="${args.size}"
        thickness="${args.thickness}"
        ?animated="${args.animated}"
        ?showLegend="${args.showLegend}"
        centerLabel="${args.centerLabel}"
        centerValue="${args.centerValue}"
      ></zen-donut-chart>
    </div>
  `
};

export const BudgetBreakdown: Story = {
  render: () => html`
    <div style="padding: 40px;">
      <h3 style="color: var(--zen-text-1); margin: 0 0 24px 0;">Monthly Budget</h3>
      <zen-donut-chart 
        .data=${[
      { label: 'Rent', value: 1500, color: '#667eea' },
      { label: 'Food', value: 600, color: '#10b981' },
      { label: 'Transport', value: 300, color: '#f59e0b' },
      { label: 'Entertainment', value: 200, color: '#f093fb' },
      { label: 'Utilities', value: 250, color: '#4facfe' },
      { label: 'Savings', value: 650, color: '#8b5cf6' },
    ]}
        size="220"
        thickness="35"
        centerValue="$3.5k"
        centerLabel="Monthly"
      ></zen-donut-chart>
    </div>
  `
};

export const TrafficSources: Story = {
  render: () => html`
    <div style="
      padding: 32px;
      background: var(--zen-glass-bg);
      border: 1px solid var(--zen-glass-border);
      border-radius: var(--zen-radius-lg);
      max-width: 500px;
    ">
      <h4 style="color: var(--zen-text-1); margin: 0 0 24px 0;">Traffic Sources</h4>
      <zen-donut-chart 
        .data=${[
      { label: 'Organic', value: 45 },
      { label: 'Direct', value: 25 },
      { label: 'Referral', value: 18 },
      { label: 'Social', value: 12 },
    ]}
        size="180"
        thickness="25"
        centerValue="28.5k"
        centerLabel="Visitors"
      ></zen-donut-chart>
    </div>
  `
};

export const CompactNoLegend: Story = {
  render: () => html`
    <div style="padding: 40px; display: flex; gap: 40px; flex-wrap: wrap;">
      <div style="text-align: center;">
        <zen-donut-chart 
          .data=${[
      { label: 'Used', value: 75, color: '#667eea' },
      { label: 'Free', value: 25, color: 'rgba(255,255,255,0.1)' },
    ]}
          size="120"
          thickness="12"
          .showLegend=${false}
          centerValue="75%"
          centerLabel="CPU"
        ></zen-donut-chart>
      </div>
      
      <div style="text-align: center;">
        <zen-donut-chart 
          .data=${[
      { label: 'Used', value: 62, color: '#10b981' },
      { label: 'Free', value: 38, color: 'rgba(255,255,255,0.1)' },
    ]}
          size="120"
          thickness="12"
          .showLegend=${false}
          centerValue="62%"
          centerLabel="Memory"
        ></zen-donut-chart>
      </div>
      
      <div style="text-align: center;">
        <zen-donut-chart 
          .data=${[
      { label: 'Used', value: 89, color: '#f59e0b' },
      { label: 'Free', value: 11, color: 'rgba(255,255,255,0.1)' },
    ]}
          size="120"
          thickness="12"
          .showLegend=${false}
          centerValue="89%"
          centerLabel="Storage"
        ></zen-donut-chart>
      </div>
    </div>
  `
};
