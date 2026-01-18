import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './ui-tooltip';
import '../button/ui-button';

const meta: Meta = {
  title: 'Components/Tooltip',
  component: 'zen-tooltip',
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom']
    },
  },
  args: {
    content: 'This is a premium tooltip',
    position: 'top',
  },
  render: (args) => html`
    <div style="padding: 60px; display: flex; justify-content: center; align-items: center;">
      <zen-tooltip .content=${args.content} .position=${args.position}>
        <zen-button variant="outline">Hover Me</zen-button>
      </zen-tooltip>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Bottom: Story = {
  args: {
    position: 'bottom',
    content: 'Tooltip appears below',
  },
};
