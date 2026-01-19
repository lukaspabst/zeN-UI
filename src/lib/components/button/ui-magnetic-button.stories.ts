import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './ui-magnetic-button';

const meta: Meta = {
  title: 'Components/General/Magnetic Button',
  component: 'zen-magnetic-button',
  tags: ['autodocs'],
  argTypes: {
    strength: { control: { type: 'range', min: 0.1, max: 1, step: 0.1 } },
    variant: { control: 'select', options: ['primary', 'gradient', 'outline', 'glow'] },
    disabled: { control: 'boolean' },
  },
  args: {
    strength: 0.4,
    variant: 'gradient',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="padding: 60px; display: flex; justify-content: center;">
      <zen-magnetic-button 
        strength="${args.strength}" 
        variant="${args.variant}"
        ?disabled="${args.disabled}"
      >
        Hover Me ✨
      </zen-magnetic-button>
    </div>
  `
};

export const Variants: Story = {
  render: () => html`
    <div style="padding: 60px; display: flex; gap: 32px; flex-wrap: wrap; justify-content: center; align-items: center;">
      <zen-magnetic-button variant="primary">Primary</zen-magnetic-button>
      <zen-magnetic-button variant="gradient">Gradient ✨</zen-magnetic-button>
      <zen-magnetic-button variant="outline">Outline</zen-magnetic-button>
      <zen-magnetic-button variant="glow">Neon Glow ⚡</zen-magnetic-button>
    </div>
  `
};

export const NeonShowcase: Story = {
  render: () => html`
    <div style="padding: 60px; background: #0a0a0a; min-height: 300px; display: flex; gap: 24px; flex-wrap: wrap; justify-content: center; align-items: center;">
      <zen-magnetic-button variant="glow" strength="0.5">Subscribe</zen-magnetic-button>
      <zen-magnetic-button variant="glow" strength="0.5">Get Started</zen-magnetic-button>
      <zen-magnetic-button variant="glow" strength="0.5">Learn More</zen-magnetic-button>
    </div>
  `
};

export const InteractiveDemo: Story = {
  render: () => html`
    <div style="padding: 80px; display: flex; flex-direction: column; align-items: center; gap: 24px;">
      <p style="color: var(--zen-text-2); margin: 0; font-size: 0.9rem;">Move your mouse around the button - it follows you!</p>
      <zen-magnetic-button variant="gradient" strength="0.6">
        🧲 Magnetic
      </zen-magnetic-button>
    </div>
  `
};
