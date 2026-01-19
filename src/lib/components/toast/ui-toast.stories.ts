import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './ui-toast';
import { toast } from './ui-toast';
import '../button/ui-button';

const meta: Meta = {
  title: 'Components/Feedback/Toast',
  component: 'zen-toast-container',
  tags: ['autodocs'],
  render: () => html`
    <zen-toast-container></zen-toast-container>
    <div style="display: flex; gap: 10px; flex-direction: column; align-items: flex-start;">
      <zen-button @click=${() => toast('Operation Successful', 'success')}>Show Success</zen-button>
      <zen-button variant="destructive" @click=${() => toast('Something went wrong!', 'error')}>Show Error</zen-button>
      <zen-button variant="secondary" @click=${() => toast('Did you know about this feature?', 'info')}>Show Info</zen-button>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Demo: Story = {};
