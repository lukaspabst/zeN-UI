import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './ui-morph-button';

const meta: Meta = {
    title: 'Components/Experimental/MorphButton',
    component: 'zen-morph-button',
    tags: ['autodocs'],
    argTypes: {
        variant: { control: 'select', options: ['liquid', 'expand', 'bounce', 'glow'] },
        disabled: { control: 'boolean' },
    },
    args: {
        variant: 'liquid',
        disabled: false,
    },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: (args) => html`
    <div style="padding: 60px; display: flex; justify-content: center;">
      <zen-morph-button variant="${args.variant}" ?disabled="${args.disabled}">
        Hover Me
      </zen-morph-button>
    </div>
  `
};

export const AllVariants: Story = {
    render: () => html`
    <div style="padding: 60px; display: flex; gap: 24px; flex-wrap: wrap; justify-content: center; align-items: center;">
      <zen-morph-button variant="liquid">Liquid 💧</zen-morph-button>
      <zen-morph-button variant="expand">Expand ↔️</zen-morph-button>
      <zen-morph-button variant="bounce">Bounce 🎾</zen-morph-button>
      <zen-morph-button variant="glow">Glow ✨</zen-morph-button>
    </div>
  `
};

export const CallToAction: Story = {
    render: () => html`
    <div style="
      padding: 80px;
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
      text-align: center;
    ">
      <h2 style="color: white; margin: 0 0 16px 0; font-size: 2.5rem; font-weight: 800;">
        Ready to get started?
      </h2>
      <p style="color: #888; margin: 0 0 40px 0; font-size: 1.1rem;">
        Join thousands of developers building with ZEN UI
      </p>
      <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
        <zen-morph-button variant="glow">Start Free Trial</zen-morph-button>
        <zen-morph-button variant="liquid">View Pricing</zen-morph-button>
      </div>
    </div>
  `
};

export const BounceDemo: Story = {
    render: () => html`
    <div style="padding: 60px; display: flex; justify-content: center;">
      <zen-morph-button variant="bounce">
        🎉 Click Me!
      </zen-morph-button>
    </div>
  `
};
