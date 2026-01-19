import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './ui-button';

const meta: Meta = {
  title: 'Components/General/Button',
  component: 'zen-button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'glass', 'ghost', 'destructive'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    block: { control: 'boolean' },
    slot: { control: 'text' },
  },
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    block: false,
    slot: 'Button Component',
  },
  render: (args) => html`
    <zen-button
      .variant=${args.variant}
      .size=${args.size}
      ?disabled=${args.disabled}
      ?loading=${args.loading}
      ?block=${args.block}
    >
      ${args.slot}
    </zen-button>
  `,
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {};

export const Outline: Story = {
  args: { variant: 'outline' },
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: false }],
      },
    },
  },
};

export const Glass: Story = {
  args: { variant: 'glass' },
  parameters: {
    backgrounds: { default: 'dark' },
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: false }],
      },
    },
  },
};

export const Destructive: Story = { args: { variant: 'destructive', slot: 'Delete Account' } };

export const Loading: Story = { args: { loading: true } };

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
      <zen-button size="xs">XS</zen-button>
      <zen-button size="sm">Small</zen-button>
      <zen-button size="md">Medium</zen-button>
      <zen-button size="lg">Large</zen-button>
      <zen-button size="xl">Extra Large</zen-button>
    </div>
  `,
};
