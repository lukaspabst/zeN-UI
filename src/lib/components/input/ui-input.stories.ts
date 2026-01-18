import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './ui-input';

const meta: Meta = {
    title: 'Components/Input',
    component: 'zen-input',
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text' },
        type: {
            control: { type: 'select' },
            options: ['text', 'email', 'password', 'number'],
        },
        error: { control: 'text' },
        helper: { control: 'text' },
        disabled: { control: 'boolean' },
    },
    args: {
        label: 'Email Address',
        type: 'text',
        error: '',
        helper: 'We will never share your email.',
        disabled: false,
    },
    render: (args) => html`
    <zen-input
      .label=${args.label}
      .type=${args.type}
      .error=${args.error}
      .helper=${args.helper}
      ?disabled=${args.disabled}
    ></zen-input>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const WithError: Story = {
    args: {
        label: 'Username',
        error: 'This username is already taken.',
        value: 'invalid_user',
    },
};

export const Password: Story = {
    args: {
        label: 'Password',
        type: 'password',
        helper: 'Must be at least 8 characters.',
    },
};

export const Disabled: Story = {
    args: {
        label: 'Disabled Input',
        disabled: true,
    },
};

export const WithIcon: Story = {
    render: () => html`
    <zen-input label="Search" helper="Press Enter to search">
      <span slot="prefix">🔍</span>
    </zen-input>
  `
}
