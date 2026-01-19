import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './ui-badge';

const meta: Meta = {
  title: 'Components/Data Display/Badge',
  component: 'zen-badge',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'primary', 'success', 'error', 'warning']
    },
  },
  args: {
    variant: 'neutral',
  },
  parameters: {
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <zen-badge variant="${args.variant}">
      Badge
    </zen-badge>
  `
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      <zen-badge variant="neutral">Neutral</zen-badge>
      <zen-badge variant="primary">Primary</zen-badge>
      <zen-badge variant="success">Success</zen-badge>
      <zen-badge variant="warning">Warning</zen-badge>
      <zen-badge variant="error">Error</zen-badge>
    </div>
  `
};

export const InContext: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="background: var(--zen-bg-1); padding: 16px; border-radius: 8px; border: 1px solid var(--zen-glass-border); display: flex; justify-content: space-between; align-items: center;">
            <span style="color: var(--zen-text-1);">Status Update</span>
            <zen-badge variant="success">Completed</zen-badge>
        </div>
        <div style="background: var(--zen-bg-1); padding: 16px; border-radius: 8px; border: 1px solid var(--zen-glass-border); display: flex; justify-content: space-between; align-items: center;">
            <span style="color: var(--zen-text-1);">System Alert</span>
            <zen-badge variant="error">Critical</zen-badge>
        </div>
    </div>
  `
};
