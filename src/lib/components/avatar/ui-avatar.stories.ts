import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './ui-avatar';

const meta: Meta = {
    title: 'Components/Data Display/Avatar',
    component: 'zen-avatar',
    tags: ['autodocs'],
    args: {
        src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60',
        alt: 'John Doe',
        status: 'online',
    },
    render: (args) => html`
    <zen-avatar .src=${args.src} .alt=${args.alt} .status=${args.status}></zen-avatar>
  `,
    parameters: {
        a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
    },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Initials: Story = {
    args: {
        src: '',
        alt: 'Lukas',
        status: 'busy',
    },
};
