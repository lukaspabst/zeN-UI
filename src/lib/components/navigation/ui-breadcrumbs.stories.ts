import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './ui-breadcrumbs';

const meta: Meta = {
    title: 'Components/Navigation/Breadcrumbs',
    component: 'zen-breadcrumbs',
    tags: ['autodocs'],
    argTypes: {
        separator: { control: 'text' },
        animated: { control: 'boolean' },
    },
    args: {
        separator: '/',
        animated: true,
    },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: (args) => html`
    <div style="padding: 40px;">
      <zen-breadcrumbs 
        separator="${args.separator}"
        ?animated="${args.animated}"
        .items=${[
            { label: 'Home', href: '#', icon: '🏠' },
            { label: 'Products', href: '#' },
            { label: 'Electronics', href: '#' },
            { label: 'Smartphones' },
        ]}
      ></zen-breadcrumbs>
    </div>
  `
};

export const WithIcons: Story = {
    render: () => html`
    <div style="padding: 40px;">
      <zen-breadcrumbs 
        .items=${[
            { label: 'Dashboard', href: '#', icon: '📊' },
            { label: 'Settings', href: '#', icon: '⚙️' },
            { label: 'Profile', href: '#', icon: '👤' },
            { label: 'Security', icon: '🔒' },
        ]}
      ></zen-breadcrumbs>
    </div>
  `
};

export const DifferentSeparators: Story = {
    render: () => html`
    <div style="padding: 40px; display: flex; flex-direction: column; gap: 24px;">
      <zen-breadcrumbs 
        separator="/"
        .items=${[
            { label: 'Home', href: '#' },
            { label: 'Category', href: '#' },
            { label: 'Item' },
        ]}
      ></zen-breadcrumbs>
      
      <zen-breadcrumbs 
        separator="›"
        .items=${[
            { label: 'Home', href: '#' },
            { label: 'Category', href: '#' },
            { label: 'Item' },
        ]}
      ></zen-breadcrumbs>
      
      <zen-breadcrumbs 
        separator="→"
        .items=${[
            { label: 'Home', href: '#' },
            { label: 'Category', href: '#' },
            { label: 'Item' },
        ]}
      ></zen-breadcrumbs>
      
      <zen-breadcrumbs 
        separator="•"
        .items=${[
            { label: 'Home', href: '#' },
            { label: 'Category', href: '#' },
            { label: 'Item' },
        ]}
      ></zen-breadcrumbs>
    </div>
  `
};

export const LongPath: Story = {
    render: () => html`
    <div style="padding: 40px;">
      <zen-breadcrumbs 
        .items=${[
            { label: 'Home', href: '#', icon: '🏠' },
            { label: 'Documents', href: '#' },
            { label: 'Work', href: '#' },
            { label: 'Projects', href: '#' },
            { label: '2024', href: '#' },
            { label: 'Q1 Reports' },
        ]}
      ></zen-breadcrumbs>
    </div>
  `
};
