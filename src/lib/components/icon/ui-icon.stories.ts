import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ui-icon';
import { icons } from '../../assets/icons';

const meta: Meta = {
  title: 'Components/General/Icon',
  component: 'zen-icon',
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'select' },
      options: Object.keys(icons),
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'glow', 'filled'],
    },
    size: { control: 'text' },
    color: { control: 'color' },
  },
  args: {
    name: 'home',
    variant: 'default',
    size: '24px',
    color: 'currentColor',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="color: var(--zen-text-1);">
      <zen-icon
        name="${args.name}"
        variant="${args.variant}"
        size="${args.size}"
        style="color: ${args.color};"
      ></zen-icon>
    </div>
  `,
};

export const AllIcons: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 1.5rem; color: var(--zen-text-1);">
      ${Object.keys(icons).map(name => html`
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem; padding: 1rem; border: 1px solid var(--zen-glass-border); border-radius: 8px; background: var(--zen-glass-bg);">
          <zen-icon name="${name}" size="24px"></zen-icon>
          <span style="font-size: 0.75rem; color: var(--zen-text-2);">${name}</span>
        </div>
      `)}
    </div>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; color: var(--zen-primary);">
      <div style="text-align: center;">
        <zen-icon name="star" size="32px"></zen-icon>
        <p style="margin-top: 0.5rem; font-size: 0.875rem;">Default</p>
      </div>
      <div style="text-align: center;">
        <zen-icon name="star" variant="glow" size="32px"></zen-icon>
        <p style="margin-top: 0.5rem; font-size: 0.875rem;">Glow</p>
      </div>
      <div style="text-align: center;">
        <zen-icon name="star" variant="filled" size="32px"></zen-icon>
        <p style="margin-top: 0.5rem; font-size: 0.875rem;">Filled</p>
      </div>
    </div>
  `,
};
