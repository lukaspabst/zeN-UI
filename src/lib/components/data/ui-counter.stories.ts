import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './ui-counter';

const meta: Meta = {
    title: 'Components/Experimental/Counter',
    component: 'zen-counter',
    tags: ['autodocs'],
    argTypes: {
        value: { control: 'number' },
        duration: { control: { type: 'range', min: 500, max: 5000, step: 100 } },
        prefix: { control: 'text' },
        suffix: { control: 'text' },
        decimals: { control: { type: 'range', min: 0, max: 4, step: 1 } },
        autoStart: { control: 'boolean' },
    },
    args: {
        value: 1234,
        duration: 2000,
        prefix: '',
        suffix: '',
        decimals: 0,
        autoStart: true,
    },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: (args) => html`
    <div style="padding: 60px; text-align: center;">
      <div style="font-size: 5rem; font-weight: 800; color: var(--zen-text-1);">
        <zen-counter 
          value="${args.value}"
          duration="${args.duration}"
          prefix="${args.prefix}"
          suffix="${args.suffix}"
          decimals="${args.decimals}"
          ?autoStart="${args.autoStart}"
        ></zen-counter>
      </div>
    </div>
  `
};

export const Stats: Story = {
    render: () => html`
    <div style="padding: 60px; display: flex; gap: 60px; justify-content: center; flex-wrap: wrap;">
      <div style="text-align: center;">
        <div style="font-size: 4rem; font-weight: 800; color: var(--zen-primary);">
          <zen-counter value="50000" duration="2500" suffix="+"></zen-counter>
        </div>
        <p style="margin: 8px 0 0 0; color: var(--zen-text-2);">Happy Customers</p>
      </div>
      
      <div style="text-align: center;">
        <div style="font-size: 4rem; font-weight: 800; color: var(--zen-primary);">
          <zen-counter value="99.9" duration="2000" suffix="%" decimals="1"></zen-counter>
        </div>
        <p style="margin: 8px 0 0 0; color: var(--zen-text-2);">Uptime</p>
      </div>
      
      <div style="text-align: center;">
        <div style="font-size: 4rem; font-weight: 800; color: var(--zen-primary);">
          <zen-counter value="2500000" duration="3000" prefix="$"></zen-counter>
        </div>
        <p style="margin: 8px 0 0 0; color: var(--zen-text-2);">Revenue Generated</p>
      </div>
    </div>
  `
};

export const Dashboard: Story = {
    render: () => html`
    <div style="padding: 40px; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px;">
      <div style="
        background: var(--zen-glass-bg);
        border: 1px solid var(--zen-glass-border);
        border-radius: var(--zen-radius-lg);
        padding: 24px;
      ">
        <p style="margin: 0 0 8px 0; color: var(--zen-text-2); font-size: 0.875rem;">Total Users</p>
        <div style="font-size: 2.5rem; font-weight: 700; color: var(--zen-text-1);">
          <zen-counter value="12847" duration="2000"></zen-counter>
        </div>
        <p style="margin: 8px 0 0 0; color: #10b981; font-size: 0.875rem;">↑ 12% this month</p>
      </div>
      
      <div style="
        background: var(--zen-glass-bg);
        border: 1px solid var(--zen-glass-border);
        border-radius: var(--zen-radius-lg);
        padding: 24px;
      ">
        <p style="margin: 0 0 8px 0; color: var(--zen-text-2); font-size: 0.875rem;">Revenue</p>
        <div style="font-size: 2.5rem; font-weight: 700; color: var(--zen-text-1);">
          <zen-counter value="84592" duration="2500" prefix="$"></zen-counter>
        </div>
        <p style="margin: 8px 0 0 0; color: #10b981; font-size: 0.875rem;">↑ 8% this month</p>
      </div>
      
      <div style="
        background: var(--zen-glass-bg);
        border: 1px solid var(--zen-glass-border);
        border-radius: var(--zen-radius-lg);
        padding: 24px;
      ">
        <p style="margin: 0 0 8px 0; color: var(--zen-text-2); font-size: 0.875rem;">Conversion Rate</p>
        <div style="font-size: 2.5rem; font-weight: 700; color: var(--zen-text-1);">
          <zen-counter value="4.28" duration="1500" suffix="%" decimals="2"></zen-counter>
        </div>
        <p style="margin: 8px 0 0 0; color: #ef4444; font-size: 0.875rem;">↓ 2% this month</p>
      </div>
      
      <div style="
        background: var(--zen-glass-bg);
        border: 1px solid var(--zen-glass-border);
        border-radius: var(--zen-radius-lg);
        padding: 24px;
      ">
        <p style="margin: 0 0 8px 0; color: var(--zen-text-2); font-size: 0.875rem;">Active Sessions</p>
        <div style="font-size: 2.5rem; font-weight: 700; color: var(--zen-text-1);">
          <zen-counter value="847" duration="1000"></zen-counter>
        </div>
        <p style="margin: 8px 0 0 0; color: var(--zen-text-2); font-size: 0.875rem;">Real-time</p>
      </div>
    </div>
  `
};

export const BigNumbers: Story = {
    render: () => html`
    <div style="
      padding: 80px;
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
      text-align: center;
    ">
      <h2 style="color: #888; margin: 0 0 40px 0; font-size: 1.2rem; text-transform: uppercase; letter-spacing: 3px;">
        Trusted by developers worldwide
      </h2>
      <div style="font-size: 8rem; font-weight: 900; color: white; line-height: 1;">
        <zen-counter value="1000000" duration="3000" suffix="+"></zen-counter>
      </div>
      <p style="color: var(--zen-primary); margin: 16px 0 0 0; font-size: 1.5rem;">Downloads</p>
    </div>
  `
};
