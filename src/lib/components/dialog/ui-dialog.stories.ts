import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './ui-dialog';
import '../button/ui-button';

const meta: Meta = {
  title: 'Components/Feedback/Dialog',
  component: 'zen-dialog',
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    title: { control: 'text' },
  },
  args: {
    open: false,
    title: 'Confirm Action',
  },
  render: (args) => html`
    <zen-button @click=${() => document.querySelector('zen-dialog')!.open = true}>
      Open Dialog
    </zen-button>

    <zen-dialog .open=${args.open} .title=${args.title} @close=${() => console.log('closed')}>
      <p>Are you sure you want to perform this action? This cannot be undone.</p>
      <div slot="footer">
        <zen-button variant="ghost" @click=${() => document.querySelector('zen-dialog')!.open = false}>Cancel</zen-button>
        <zen-button variant="primary" @click=${() => document.querySelector('zen-dialog')!.open = false}>Confirm</zen-button>
      </div>
    </zen-dialog>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
