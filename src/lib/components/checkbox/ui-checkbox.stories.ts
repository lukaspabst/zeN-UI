import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './ui-checkbox';
import { ZenCheckbox } from './ui-checkbox';

const meta: Meta = {
  title: 'Components/Forms/Checkbox',
  component: 'zen-checkbox',
  tags: ['autodocs'],
  args: {
    checked: false,
    disabled: false,
  },
  parameters: {
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
  render: (args) => html`
    <zen-checkbox 
      ?checked=${args.checked} 
      ?disabled=${args.disabled}
    >
      I agree to the terms
    </zen-checkbox>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Checked: Story = { args: { checked: true } };
export const Disabled: Story = { args: { disabled: true, checked: true } };

export const Interactive: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <zen-checkbox @change=${(e: CustomEvent) => console.log('Checkbox changed:', e.detail)}>
        Enable email notifications
      </zen-checkbox>
      <zen-checkbox checked @change=${(e: CustomEvent) => console.log('Checkbox changed:', e.detail)}>
        Subscribe to newsletter
      </zen-checkbox>
      <zen-checkbox @change=${(e: CustomEvent) => console.log('Checkbox changed:', e.detail)}>
        Accept privacy policy
      </zen-checkbox>
    </div>
  `,
};

export const WithProgrammaticToggle: Story = {
  render: () => {
    const toggleAll = () => {
      const checkboxes = document.querySelectorAll('zen-checkbox') as NodeListOf<ZenCheckbox>;
      checkboxes.forEach(cb => {
        (cb as unknown as { _toggle: () => void })._toggle();
      });
    };

    return html`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <zen-checkbox>Option 1</zen-checkbox>
        <zen-checkbox>Option 2</zen-checkbox>
        <zen-checkbox>Option 3</zen-checkbox>
        <button @click=${toggleAll} style="padding: 8px 16px; cursor: pointer; margin-top: 12px;">
          Toggle All Programmatically
        </button>
      </div>
    `;
  },
};

export const DisabledInteraction: Story = {
  render: () => {
    const tryToggleDisabled = () => {
      const checkbox = document.querySelector('zen-checkbox[disabled]') as ZenCheckbox;
      if (checkbox) {
        (checkbox as unknown as { _toggle: () => void })._toggle();
        console.log('Toggled disabled checkbox (should do nothing)');
      }
    };

    return html`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <zen-checkbox disabled checked>This is disabled</zen-checkbox>
        <button @click=${tryToggleDisabled} style="padding: 8px 16px; cursor: pointer;">
          Try Toggle Disabled (should fail)
        </button>
      </div>
    `;
  },
};
