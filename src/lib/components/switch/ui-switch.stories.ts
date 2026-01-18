import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './ui-switch';

const meta: Meta = {
    title: 'Components/Switch',
    component: 'zen-switch',
    tags: ['autodocs'],
    args: {
        checked: false,
        disabled: false,
    },
    render: (args) => html`
    <zen-switch ?checked=${args.checked} ?disabled=${args.disabled}></zen-switch>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
export const Checked: Story = { args: { checked: true } };
export const Disabled: Story = { args: { disabled: true, checked: true } };
