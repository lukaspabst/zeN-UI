import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './ui-dialog';
import '../button/ui-button';
import { ZenDialog } from './ui-dialog';

const meta: Meta = {
  title: 'Components/Feedback/Dialog',
  component: 'zen-dialog',
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    title: { control: 'text' },
    scrollLock: { control: 'boolean' },
  },
  args: {
    open: false,
    title: 'Confirm Action',
    scrollLock: true,
  },
  render: (args) => html`
    <zen-button @click=${() => document.querySelector('zen-dialog')!.open = true}>
      Open Dialog
    </zen-button>

    <zen-dialog .open=${args.open} .title=${args.title} ?scrollLock=${args.scrollLock} @close=${() => console.log('closed')}>
      <p>Are you sure you want to perform this action? This cannot be undone.</p>
      <div slot="footer">
        <zen-button variant="ghost" @click=${() => document.querySelector('zen-dialog')!.open = false}>Cancel</zen-button>
        <zen-button variant="primary" @click=${() => document.querySelector('zen-dialog')!.open = false}>Confirm</zen-button>
      </div>
    </zen-dialog>
  `,
  parameters: {
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const WithScrollLockDisabled: Story = {
  args: {
    scrollLock: false,
    title: 'No Scroll Lock',
  },
};

export const OpenedProgrammatically: Story = {
  render: () => {
    const openDialog = () => {
      const dialog = document.querySelector('#prog-dialog') as ZenDialog;
      if (dialog) {
        dialog.open = true;
      }
    };

    const closeDialog = () => {
      const dialog = document.querySelector('#prog-dialog') as ZenDialog;
      if (dialog) {
        (dialog as unknown as { _close: () => void })._close();
      }
    };

    return html`
      <div style="display: flex; gap: 12px;">
        <zen-button @click=${openDialog}>Open Programmatically</zen-button>
        <zen-button variant="secondary" @click=${closeDialog}>Close via _close()</zen-button>
      </div>

      <zen-dialog id="prog-dialog" title="Programmatic Dialog" @close=${() => console.log('Dialog closed')}>
        <p>This dialog was opened and can be closed programmatically.</p>
        <div slot="footer">
          <zen-button variant="ghost" @click=${closeDialog}>Close</zen-button>
        </div>
      </zen-dialog>
    `;
  },
};

export const MultipleDialogs: Story = {
  render: () => {
    const openFirst = () => {
      const dialog = document.querySelector('#dialog-1') as ZenDialog;
      if (dialog) dialog.open = true;
    };

    const openSecond = () => {
      const dialog = document.querySelector('#dialog-2') as ZenDialog;
      if (dialog) dialog.open = true;
    };

    return html`
      <div style="display: flex; gap: 12px;">
        <zen-button @click=${openFirst}>Open Dialog 1</zen-button>
        <zen-button variant="secondary" @click=${openSecond}>Open Dialog 2</zen-button>
      </div>

      <zen-dialog id="dialog-1" title="First Dialog">
        <p>This is the first dialog.</p>
        <div slot="footer">
          <zen-button variant="primary" @click=${() => (document.querySelector('#dialog-1') as ZenDialog).open = false}>
            Close
          </zen-button>
        </div>
      </zen-dialog>

      <zen-dialog id="dialog-2" title="Second Dialog">
        <p>This is the second dialog.</p>
        <div slot="footer">
          <zen-button variant="primary" @click=${() => (document.querySelector('#dialog-2') as ZenDialog).open = false}>
            Close
          </zen-button>
        </div>
      </zen-dialog>
    `;
  },
};

export const CloseViaX: Story = {
  render: () => {
    const openDialog = () => {
      const dialog = document.querySelector('#x-dialog') as ZenDialog;
      if (dialog) dialog.open = true;
    };

    return html`
      <zen-button @click=${openDialog}>Open and Close via X</zen-button>

      <zen-dialog id="x-dialog" title="Close via X Button" @close=${() => console.log('Closed via X')}>
        <p>Click the X button in the header to close this dialog.</p>
        <div slot="footer">
          <span style="color: var(--zen-text-2); font-size: 0.875rem;">Or use the X button above</span>
        </div>
      </zen-dialog>
    `;
  },
};
