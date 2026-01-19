import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './ui-nav-button';

const meta: Meta = {
  title: 'Components/Navigation/Nav Button',
  component: 'zen-nav-button',
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'outline'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="padding: 40px; display: flex; gap: 16px; flex-wrap: wrap;">
      <zen-nav-button variant="${args.variant}" size="${args.size}" ?disabled="${args.disabled}">
        Click Me
      </zen-nav-button>
    </div>
  `
};

export const AllVariants: Story = {
  render: () => html`
    <div style="padding: 40px; display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
      <zen-nav-button variant="primary">Primary</zen-nav-button>
      <zen-nav-button variant="secondary">Secondary</zen-nav-button>
      <zen-nav-button variant="ghost">Ghost</zen-nav-button>
      <zen-nav-button variant="outline">Outline</zen-nav-button>
    </div>
  `
};

export const Sizes: Story = {
  render: () => html`
    <div style="padding: 40px; display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
      <zen-nav-button variant="primary" size="sm">Small</zen-nav-button>
      <zen-nav-button variant="primary" size="md">Medium</zen-nav-button>
      <zen-nav-button variant="primary" size="lg">Large</zen-nav-button>
    </div>
  `
};

export const NavbarExample: Story = {
  render: () => html`
    <div style="
      background: var(--zen-glass-bg);
      border-bottom: 1px solid var(--zen-glass-border);
      padding: 12px 32px;
      display: flex;
      align-items: center;
      gap: 32px;
    ">
      <div style="
        font-size: 1.5rem;
        font-weight: 800;
        background: linear-gradient(135deg, var(--zen-primary), #f093fb);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      ">ZEN</div>
      
      <div style="flex: 1;"></div>
      
      <div style="display: flex; gap: 12px; align-items: center;">
        <zen-nav-button variant="ghost">Sign In</zen-nav-button>
        <zen-nav-button variant="primary">Get Started</zen-nav-button>
      </div>
    </div>
  `
};

export const ActionPairs: Story = {
  render: () => html`
    <div style="padding: 40px; display: flex; flex-direction: column; gap: 24px;">
      <div style="display: flex; gap: 12px;">
        <zen-nav-button variant="ghost">Cancel</zen-nav-button>
        <zen-nav-button variant="primary">Confirm</zen-nav-button>
      </div>
      
      <div style="display: flex; gap: 12px;">
        <zen-nav-button variant="secondary">Learn More</zen-nav-button>
        <zen-nav-button variant="primary">Get Started</zen-nav-button>
      </div>
      
      <div style="display: flex; gap: 12px;">
        <zen-nav-button variant="outline">Sign In</zen-nav-button>
        <zen-nav-button variant="primary">Sign Up Free</zen-nav-button>
      </div>
    </div>
  `
};
