import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './ui-switch';
import { ZenSwitch } from './ui-switch';

const meta: Meta = {
  title: 'Components/Forms/Switch',
  component: 'zen-switch',
  tags: ['autodocs'],
  args: {
    checked: false,
    disabled: false,
  },
  render: (args) => html`
    <zen-switch ?checked=${args.checked} ?disabled=${args.disabled}></zen-switch>
  `,
  parameters: {
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Checked: Story = { args: { checked: true } };
export const Disabled: Story = { args: { disabled: true, checked: true } };

export const Interactive: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <zen-switch @change=${(e: CustomEvent) => console.log('Switch changed:', e.detail)}></zen-switch>
        <span style="color: var(--zen-text-1);">Click to toggle</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <zen-switch checked @change=${(e: CustomEvent) => console.log('Switch changed:', e.detail)}></zen-switch>
        <span style="color: var(--zen-text-1);">Initially checked</span>
      </div>
    </div>
  `,
};

export const WithLabelsAndEvents: Story = {
  render: () => {
    const toggleProgrammatically = () => {
      const switches = document.querySelectorAll('zen-switch') as NodeListOf<ZenSwitch>;
      switches.forEach(s => {
        (s as unknown as { _toggle: () => void })._toggle();
      });
    };

    return html`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <zen-switch></zen-switch>
          <span style="color: var(--zen-text-1);">Enable notifications</span>
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          <zen-switch></zen-switch>
          <span style="color: var(--zen-text-1);">Dark mode</span>
        </div>
        <button @click=${toggleProgrammatically} style="padding: 8px 16px; cursor: pointer; margin-top: 12px;">
          Toggle All Programmatically
        </button>
      </div>
    `;
  },
};
