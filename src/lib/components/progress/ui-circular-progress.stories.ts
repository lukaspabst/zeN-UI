import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './ui-circular-progress';

const meta: Meta = {
  title: 'Components/Feedback/Circular Progress',
  component: 'zen-circular-progress',
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    size: { control: { type: 'range', min: 40, max: 200, step: 10 } },
    strokeWidth: { control: { type: 'range', min: 2, max: 20, step: 1 } },
    variant: { control: 'select', options: ['default', 'gradient', 'glow'] },
    color: { control: 'select', options: ['primary', 'success', 'warning', 'danger'] },
    showValue: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
  },
  args: {
    value: 72,
    size: 120,
    strokeWidth: 8,
    variant: 'default',
    color: 'primary',
    showValue: true,
    indeterminate: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  parameters: {
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
  render: (args) => html`
    <zen-circular-progress
      value="${args.value}"
      size="${args.size}"
      strokeWidth="${args.strokeWidth}"
      variant="${args.variant}"
      color="${args.color}"
      ?showValue="${args.showValue}"
      ?indeterminate="${args.indeterminate}"
    ></zen-circular-progress>
  `
};

export const Variants: Story = {
  parameters: {
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
  render: () => html`
    <div style="display: flex; gap: 40px; align-items: center; flex-wrap: wrap;">
      <div style="text-align: center;">
        <zen-circular-progress value="75" variant="default" showValue></zen-circular-progress>
        <p style="margin-top: 12px; color: var(--zen-text-2); font-size: 0.875rem;">Default</p>
      </div>
      <div style="text-align: center;">
        <zen-circular-progress value="75" variant="gradient" showValue></zen-circular-progress>
        <p style="margin-top: 12px; color: var(--zen-text-2); font-size: 0.875rem;">Gradient</p>
      </div>
      <div style="text-align: center;">
        <zen-circular-progress value="75" variant="glow" showValue></zen-circular-progress>
        <p style="margin-top: 12px; color: var(--zen-text-2); font-size: 0.875rem;">Glow</p>
      </div>
      <div style="text-align: center;">
        <zen-circular-progress indeterminate variant="glow"></zen-circular-progress>
        <p style="margin-top: 12px; color: var(--zen-text-2); font-size: 0.875rem;">Indeterminate</p>
      </div>
    </div>
  `
};

export const Colors: Story = {
  parameters: {
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
  render: () => html`
    <div style="display: flex; gap: 32px; align-items: center; flex-wrap: wrap;">
      <div style="text-align: center;">
        <zen-circular-progress value="85" color="primary" variant="glow" showValue></zen-circular-progress>
        <p style="margin-top: 12px; color: var(--zen-text-2); font-size: 0.875rem;">Primary</p>
      </div>
      <div style="text-align: center;">
        <zen-circular-progress value="70" color="success" variant="glow" showValue></zen-circular-progress>
        <p style="margin-top: 12px; color: var(--zen-text-2); font-size: 0.875rem;">Success</p>
      </div>
      <div style="text-align: center;">
        <zen-circular-progress value="55" color="warning" variant="glow" showValue></zen-circular-progress>
        <p style="margin-top: 12px; color: var(--zen-text-2); font-size: 0.875rem;">Warning</p>
      </div>
      <div style="text-align: center;">
        <zen-circular-progress value="30" color="danger" variant="glow" showValue></zen-circular-progress>
        <p style="margin-top: 12px; color: var(--zen-text-2); font-size: 0.875rem;">Danger</p>
      </div>
    </div>
  `
};

export const Sizes: Story = {
  parameters: {
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
  render: () => html`
    <div style="display: flex; gap: 32px; align-items: center; flex-wrap: wrap;">
      <zen-circular-progress value="65" size="60" strokeWidth="4" variant="glow" showValue></zen-circular-progress>
      <zen-circular-progress value="65" size="100" strokeWidth="6" variant="glow" showValue></zen-circular-progress>
      <zen-circular-progress value="65" size="140" strokeWidth="10" variant="glow" showValue></zen-circular-progress>
      <zen-circular-progress value="65" size="180" strokeWidth="12" variant="gradient" showValue></zen-circular-progress>
    </div>
  `
};

export const Dashboard: Story = {
  parameters: {
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
  render: () => html`
    <div style="display: flex; gap: 48px; flex-wrap: wrap; justify-content: center; padding: 40px;">
      <div style="
        background: var(--zen-glass-bg);
        padding: 32px;
        border-radius: var(--zen-radius-lg);
        border: 1px solid var(--zen-glass-border);
        text-align: center;
        min-width: 160px;
        overflow: visible;
      ">
        <zen-circular-progress value="92" color="success" variant="glow" size="100" strokeWidth="8" showValue></zen-circular-progress>
        <h4 style="margin: 16px 0 4px 0; color: var(--zen-text-1); font-size: 1rem;">CPU Usage</h4>
        <p style="margin: 0; color: var(--zen-text-2); font-size: 0.8rem;">8 cores active</p>
      </div>
      
      <div style="
        background: var(--zen-glass-bg);
        padding: 32px;
        border-radius: var(--zen-radius-lg);
        border: 1px solid var(--zen-glass-border);
        text-align: center;
        min-width: 160px;
        overflow: visible;
      ">
        <zen-circular-progress value="68" color="warning" variant="glow" size="100" strokeWidth="8" showValue></zen-circular-progress>
        <h4 style="margin: 16px 0 4px 0; color: var(--zen-text-1); font-size: 1rem;">Memory</h4>
        <p style="margin: 0; color: var(--zen-text-2); font-size: 0.8rem;">11.2 GB / 16 GB</p>
      </div>
      
      <div style="
        background: var(--zen-glass-bg);
        padding: 32px;
        border-radius: var(--zen-radius-lg);
        border: 1px solid var(--zen-glass-border);
        text-align: center;
        min-width: 160px;
        overflow: visible;
      ">
        <zen-circular-progress value="34" color="primary" variant="gradient" size="100" strokeWidth="8" showValue></zen-circular-progress>
        <h4 style="margin: 16px 0 4px 0; color: var(--zen-text-1); font-size: 1rem;">Storage</h4>
        <p style="margin: 0; color: var(--zen-text-2); font-size: 0.8rem;">256 GB / 512 GB</p>
      </div>
    </div>
  `
};
