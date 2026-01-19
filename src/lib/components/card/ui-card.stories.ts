import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

import './ui-card';
import '../button/ui-button';

const meta: Meta = {
  title: 'Components/Data Display/Card',
  component: 'zen-card',
  tags: ['autodocs'],
  args: {
    hover: true,
    clickable: false,
  },
  render: (args) => html`
    <zen-card ?hover=${args.hover} ?clickable=${args.clickable} style="width: 340px;">
      <div slot="media">
        <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" alt="Abstract gradient" />
      </div>
      <h3>Glassmorphism</h3>
      <p>This card demonstrates the premium glass effect with a backdrop blur and smooth hover animations.</p>
      <div slot="footer" style="display: flex; gap: 8px;">
        <zen-button size="sm" variant="glass">Learn More</zen-button>
        <zen-button size="sm" variant="ghost">Share</zen-button>
      </div>
    </zen-card>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Simple: Story = {
  render: () => html`
    <zen-card style="width: 300px;">
      <h3>Simple Card</h3>
      <p>Just content, no media or footer.</p>
    </zen-card>
  `
};
