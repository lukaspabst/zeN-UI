import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './ui-bar-chart';

const meta: Meta = {
    title: 'Components/Experimental/BarChart',
    component: 'zen-bar-chart',
    tags: ['autodocs'],
    argTypes: {
        showValues: { control: 'boolean' },
        animated: { control: 'boolean' },
        horizontal: { control: 'boolean' },
    },
    args: {
        showValues: true,
        animated: true,
        horizontal: false,
    },
};

export default meta;
type Story = StoryObj;

const sampleData = [
    { label: 'Jan', value: 65 },
    { label: 'Feb', value: 85 },
    { label: 'Mar', value: 45 },
    { label: 'Apr', value: 95 },
    { label: 'May', value: 75 },
    { label: 'Jun', value: 55 },
];

export const Default: Story = {
    render: (args) => html`
    <div style="padding: 40px; max-width: 600px;">
      <h3 style="color: var(--zen-text-1); margin: 0 0 24px 0;">Monthly Sales</h3>
      <zen-bar-chart 
        .data=${sampleData}
        ?showValues="${args.showValues}"
        ?animated="${args.animated}"
        ?horizontal="${args.horizontal}"
      ></zen-bar-chart>
    </div>
  `
};

export const Horizontal: Story = {
    render: () => html`
    <div style="padding: 40px; max-width: 500px;">
      <h3 style="color: var(--zen-text-1); margin: 0 0 24px 0;">Revenue by Product</h3>
      <zen-bar-chart 
        .data=${[
            { label: 'Product A', value: 120 },
            { label: 'Product B', value: 85 },
            { label: 'Product C', value: 200 },
            { label: 'Product D', value: 65 },
        ]}
        horizontal
      ></zen-bar-chart>
    </div>
  `
};

export const CustomColors: Story = {
    render: () => html`
    <div style="padding: 40px; max-width: 600px;">
      <h3 style="color: var(--zen-text-1); margin: 0 0 24px 0;">Team Performance</h3>
      <zen-bar-chart 
        .data=${[
            { label: 'Alpha', value: 92, color: '#10b981' },
            { label: 'Beta', value: 78, color: '#f59e0b' },
            { label: 'Gamma', value: 65, color: '#ef4444' },
            { label: 'Delta', value: 88, color: '#8b5cf6' },
            { label: 'Epsilon', value: 95, color: '#06b6d4' },
        ]}
      ></zen-bar-chart>
    </div>
  `
};

export const Dashboard: Story = {
    render: () => html`
    <div style="padding: 40px; display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px;">
      <div style="
        background: var(--zen-glass-bg);
        border: 1px solid var(--zen-glass-border);
        border-radius: var(--zen-radius-lg);
        padding: 24px;
      ">
        <h4 style="color: var(--zen-text-1); margin: 0 0 20px 0;">Weekly Visitors</h4>
        <zen-bar-chart 
          .data=${[
            { label: 'Mon', value: 240 },
            { label: 'Tue', value: 320 },
            { label: 'Wed', value: 280 },
            { label: 'Thu', value: 450 },
            { label: 'Fri', value: 380 },
            { label: 'Sat', value: 520 },
            { label: 'Sun', value: 410 },
        ]}
        ></zen-bar-chart>
      </div>
      
      <div style="
        background: var(--zen-glass-bg);
        border: 1px solid var(--zen-glass-border);
        border-radius: var(--zen-radius-lg);
        padding: 24px;
      ">
        <h4 style="color: var(--zen-text-1); margin: 0 0 20px 0;">Top Categories</h4>
        <zen-bar-chart 
          .data=${[
            { label: 'Electronics', value: 89, color: '#667eea' },
            { label: 'Clothing', value: 67, color: '#f093fb' },
            { label: 'Books', value: 45, color: '#4facfe' },
            { label: 'Home', value: 78, color: '#00f2fe' },
        ]}
          horizontal
        ></zen-bar-chart>
      </div>
    </div>
  `
};
