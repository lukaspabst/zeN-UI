import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './ui-command-palette';

const meta: Meta = {
  title: 'Components/Navigation/Command Palette',
  component: 'zen-command-palette',
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  args: {
    open: false,
    placeholder: 'Type a command or search...',
  },
};

export default meta;
type Story = StoryObj;

const sampleItems = [
  { id: '1', label: 'Go to Dashboard', icon: '🏠', shortcut: 'G+D', group: 'Navigation' },
  { id: '2', label: 'Go to Settings', icon: '⚙️', shortcut: 'G+S', group: 'Navigation' },
  { id: '3', label: 'Go to Profile', icon: '👤', shortcut: 'G+P', group: 'Navigation' },
  { id: '4', label: 'Create New Project', icon: '➕', shortcut: 'Cmd+N', group: 'Actions' },
  { id: '5', label: 'Search Files', icon: '📁', shortcut: 'Cmd+F', group: 'Actions' },
  { id: '6', label: 'Toggle Dark Mode', icon: '🌙', shortcut: 'Cmd+D', group: 'Actions' },
  { id: '7', label: 'Open Documentation', icon: '📚', group: 'Help' },
  { id: '8', label: 'Contact Support', icon: '💬', group: 'Help' },
  { id: '9', label: 'Keyboard Shortcuts', icon: '⌨️', shortcut: 'Cmd+/', group: 'Help' },
];

export const Default: Story = {
  render: (args) => html`
    <div style="padding: 40px; min-height: 400px;">
      <p style="color: var(--zen-text-2); margin-bottom: 24px;">
        Press <kbd style="padding: 4px 8px; background: var(--zen-glass-bg); border-radius: 4px;">Cmd/Ctrl + K</kbd> to open the command palette
      </p>
      
      <zen-command-palette 
        ?open="${args.open}"
        placeholder="${args.placeholder}"
        .items=${sampleItems}
        @select=${(e: CustomEvent) => console.log('Selected:', e.detail)}
      ></zen-command-palette>
      
      <button 
        @click=${() => {
      const palette = document.querySelector('zen-command-palette');
      if (palette) (palette as HTMLElement & { open: boolean }).open = true;
    }}
        style="
          padding: 12px 24px;
          background: var(--zen-primary);
          border: none;
          border-radius: var(--zen-radius-md);
          color: white;
          font-weight: 600;
          cursor: pointer;
        "
      >
        Or click here to open
      </button>
    </div>
  `
};

export const WithManyItems: Story = {
  render: () => html`
    <div style="padding: 40px;">
      <p style="color: var(--zen-text-2); margin-bottom: 16px;">
        Press <kbd style="padding: 4px 8px; background: var(--zen-glass-bg); border-radius: 4px;">Cmd/Ctrl + K</kbd>
      </p>
      
      <zen-command-palette 
        .items=${[
      ...sampleItems,
      { id: '10', label: 'Export to PDF', icon: '📄', group: 'Export' },
      { id: '11', label: 'Export to CSV', icon: '📊', group: 'Export' },
      { id: '12', label: 'Share Link', icon: '🔗', shortcut: 'Cmd+Shift+S', group: 'Share' },
      { id: '13', label: 'Invite Team Member', icon: '👥', group: 'Team' },
      { id: '14', label: 'View Analytics', icon: '📈', group: 'Analytics' },
    ]}
      ></zen-command-palette>
    </div>
  `
};
