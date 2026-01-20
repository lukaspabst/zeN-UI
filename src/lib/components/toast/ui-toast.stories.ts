import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './ui-toast';
import { toast, ZenToastContainer } from './ui-toast';
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
  parameters: {
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
};

export default meta;
type Story = StoryObj;

export const Demo: Story = {};

export const AllTypes: Story = {
  parameters: {
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
  render: () => html`
    <zen-toast-container></zen-toast-container>
    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      <zen-button variant="primary" @click=${() => toast('This is an info message', 'info')}>
        Info Toast
      </zen-button>
      <zen-button variant="primary" @click=${() => toast('Success! Operation completed.', 'success')}>
        Success Toast
      </zen-button>
      <zen-button variant="secondary" @click=${() => toast('Warning: Check your input', 'warning')}>
        Warning Toast
      </zen-button>
      <zen-button variant="destructive" @click=${() => toast('Error: Something went wrong', 'error')}>
        Error Toast
      </zen-button>
    </div>
  `,
};

export const DirectContainerUsage: Story = {
  parameters: {
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
  render: () => {
    const showAllTypes = () => {
      const container = document.querySelector('zen-toast-container') as ZenToastContainer;
      if (container) {
        container.addToast('Info message', 'info', 3000);
        setTimeout(() => container.addToast('Success message', 'success', 3000), 200);
        setTimeout(() => container.addToast('Warning message', 'warning', 3000), 400);
        setTimeout(() => container.addToast('Error message', 'error', 3000), 600);
      }
    };

    return html`
      <zen-toast-container></zen-toast-container>
      <div style="display: flex; gap: 12px; flex-direction: column; align-items: flex-start;">
        <zen-button variant="primary" @click=${showAllTypes}>
          Show All Toast Types
        </zen-button>
        <p style="color: var(--zen-text-2); font-size: 0.875rem; margin: 0;">
          Directly using the container's addToast method
        </p>
      </div>
    `;
  },
};

export const AutoRemove: Story = {
  parameters: {
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
  render: () => {
    const showQuickToast = () => {
      const container = document.querySelector('zen-toast-container') as ZenToastContainer;
      if (container) {
        container.addToast('Quick notification!', 'info', 1500);
      }
    };

    return html`
      <zen-toast-container></zen-toast-container>
      <div style="display: flex; gap: 12px; flex-direction: column; align-items: flex-start;">
        <zen-button variant="primary" @click=${showQuickToast}>
          Show Quick Toast (1.5s)
        </zen-button>
        <p style="color: var(--zen-text-2); font-size: 0.875rem; margin: 0;">
          Toast auto-removes after 1.5 seconds
        </p>
      </div>
    `;
  },
};

export const MultipleToasts: Story = {
  parameters: {
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
  render: () => {
    let count = 0;
    const showMultiple = () => {
      count++;
      toast(`Toast message #${count}`, 'info');
    };

    return html`
      <zen-toast-container></zen-toast-container>
      <div style="display: flex; gap: 12px; flex-direction: column; align-items: flex-start;">
        <zen-button variant="primary" @click=${showMultiple}>
          Add Another Toast
        </zen-button>
        <p style="color: var(--zen-text-2); font-size: 0.875rem; margin: 0;">
          Click multiple times to stack toasts
        </p>
      </div>
    `;
  },
};

export const HelperFunction: Story = {
  parameters: {
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
  render: () => {
    const useHelper = () => {
      // Remove any existing container to test auto-creation
      const existing = document.querySelector('zen-toast-container');
      if (existing) existing.remove();

      // The toast helper should auto-create the container
      toast('Toast created via helper!', 'success');
    };

    return html`
      <div style="display: flex; gap: 12px; flex-direction: column; align-items: flex-start;">
        <zen-button variant="primary" @click=${useHelper}>
          Use Toast Helper (auto-creates container)
        </zen-button>
        <p style="color: var(--zen-text-2); font-size: 0.875rem; margin: 0;">
          Tests the exported toast() helper function
        </p>
      </div>
    `;
  },
};
