import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './ui-checkbox';

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
