import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './ui-progress';

const meta: Meta = {
  title: 'Components/Feedback/Progress',
  component: 'zen-progress',
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    variant: {
      control: 'select',
      options: ['default', 'gradient', 'striped', 'pulse', 'glow']
    },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    color: { control: 'select', options: ['primary', 'success', 'warning', 'danger'] },
    showValue: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
  },
  args: {
    value: 65,
    variant: 'default',
    size: 'md',
    color: 'primary',
    showValue: false,
    indeterminate: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="width: 400px;">
      <zen-progress 
        value="${args.value}" 
        variant="${args.variant}"
        size="${args.size}"
        color="${args.color}"
        ?showValue="${args.showValue}"
        ?indeterminate="${args.indeterminate}"
      ></zen-progress>
    </div>
  `
};

export const AllVariants: Story = {
  render: () => html`
    <div style="width: 400px; display: flex; flex-direction: column; gap: 32px;">
      <div>
        <h4 style="color: var(--zen-text-2); margin: 0 0 12px 0; font-size: 0.875rem;">Default</h4>
        <zen-progress variant="default" value="70" showValue></zen-progress>
      </div>
      
      <div>
        <h4 style="color: var(--zen-text-2); margin: 0 0 12px 0; font-size: 0.875rem;">Gradient (Rainbow)</h4>
        <zen-progress variant="gradient" value="85" showValue></zen-progress>
      </div>
      
      <div>
        <h4 style="color: var(--zen-text-2); margin: 0 0 12px 0; font-size: 0.875rem;">Striped (Animated)</h4>
        <zen-progress variant="striped" value="60" showValue></zen-progress>
      </div>
      
      <div>
        <h4 style="color: var(--zen-text-2); margin: 0 0 12px 0; font-size: 0.875rem;">Pulse (Breathing)</h4>
        <zen-progress variant="pulse" value="45" showValue></zen-progress>
      </div>
      
      <div>
        <h4 style="color: var(--zen-text-2); margin: 0 0 12px 0; font-size: 0.875rem;">Glow (Neon)</h4>
        <zen-progress variant="glow" value="75" showValue></zen-progress>
      </div>
      
      <div>
        <h4 style="color: var(--zen-text-2); margin: 0 0 12px 0; font-size: 0.875rem;">Indeterminate</h4>
        <zen-progress variant="glow" indeterminate></zen-progress>
      </div>
    </div>
  `
};

export const Sizes: Story = {
  render: () => html`
    <div style="width: 400px; display: flex; flex-direction: column; gap: 24px;">
      <div>
        <p style="color: var(--zen-text-2); margin: 0 0 8px 0; font-size: 0.75rem;">Small (4px)</p>
        <zen-progress size="sm" value="80" variant="glow"></zen-progress>
      </div>
      <div>
        <p style="color: var(--zen-text-2); margin: 0 0 8px 0; font-size: 0.75rem;">Medium (8px)</p>
        <zen-progress size="md" value="80" variant="glow"></zen-progress>
      </div>
      <div>
        <p style="color: var(--zen-text-2); margin: 0 0 8px 0; font-size: 0.75rem;">Large (12px)</p>
        <zen-progress size="lg" value="80" variant="glow"></zen-progress>
      </div>
      <div>
        <p style="color: var(--zen-text-2); margin: 0 0 8px 0; font-size: 0.75rem;">Extra Large (20px)</p>
        <zen-progress size="xl" value="80" variant="glow" showValue></zen-progress>
      </div>
    </div>
  `
};

export const Colors: Story = {
  render: () => html`
    <div style="width: 400px; display: flex; flex-direction: column; gap: 24px;">
      <div>
        <p style="color: var(--zen-text-2); margin: 0 0 8px 0; font-size: 0.75rem;">Primary</p>
        <zen-progress color="primary" value="70" variant="glow" showValue></zen-progress>
      </div>
      <div>
        <p style="color: var(--zen-text-2); margin: 0 0 8px 0; font-size: 0.75rem;">Success</p>
        <zen-progress color="success" value="70" variant="glow" showValue></zen-progress>
      </div>
      <div>
        <p style="color: var(--zen-text-2); margin: 0 0 8px 0; font-size: 0.75rem;">Warning</p>
        <zen-progress color="warning" value="70" variant="glow" showValue></zen-progress>
      </div>
      <div>
        <p style="color: var(--zen-text-2); margin: 0 0 8px 0; font-size: 0.75rem;">Danger</p>
        <zen-progress color="danger" value="70" variant="glow" showValue></zen-progress>
      </div>
    </div>
  `
};

export const StripedColors: Story = {
  render: () => html`
    <div style="width: 400px; display: flex; flex-direction: column; gap: 16px;">
      <zen-progress color="primary" value="90" variant="striped" size="lg" showValue></zen-progress>
      <zen-progress color="success" value="75" variant="striped" size="lg" showValue></zen-progress>
      <zen-progress color="warning" value="50" variant="striped" size="lg" showValue></zen-progress>
      <zen-progress color="danger" value="30" variant="striped" size="lg" showValue></zen-progress>
    </div>
  `
};
