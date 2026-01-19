import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './ui-nav-link';

const meta: Meta = {
  title: 'Components/Navigation/Nav Link',
  component: 'zen-nav-link',
  tags: ['autodocs'],
  argTypes: {
    href: { control: 'text' },
    active: { control: 'boolean' },
    variant: { control: 'select', options: ['default', 'underline', 'pill', 'glow'] },
  },
  args: {
    href: '#',
    active: false,
    variant: 'default',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="padding: 40px; display: flex; gap: 8px;">
      <zen-nav-link href="#" variant="${args.variant}" ?active="${args.active}">
        Home
      </zen-nav-link>
      <zen-nav-link href="#" variant="${args.variant}">Features</zen-nav-link>
      <zen-nav-link href="#" variant="${args.variant}">Pricing</zen-nav-link>
      <zen-nav-link href="#" variant="${args.variant}">About</zen-nav-link>
    </div>
  `
};

export const AllVariants: Story = {
  render: () => html`
    <div style="padding: 40px; display: flex; flex-direction: column; gap: 32px;">
      <div>
        <p style="color: var(--zen-text-2); margin: 0 0 12px 0; font-size: 0.875rem;">Default</p>
        <div style="display: flex; gap: 8px;">
          <zen-nav-link variant="default" active>Home</zen-nav-link>
          <zen-nav-link variant="default">Features</zen-nav-link>
          <zen-nav-link variant="default">Pricing</zen-nav-link>
        </div>
      </div>
      
      <div>
        <p style="color: var(--zen-text-2); margin: 0 0 12px 0; font-size: 0.875rem;">Underline</p>
        <div style="display: flex; gap: 8px;">
          <zen-nav-link variant="underline" active>Home</zen-nav-link>
          <zen-nav-link variant="underline">Features</zen-nav-link>
          <zen-nav-link variant="underline">Pricing</zen-nav-link>
        </div>
      </div>
      
      <div>
        <p style="color: var(--zen-text-2); margin: 0 0 12px 0; font-size: 0.875rem;">Pill</p>
        <div style="display: flex; gap: 8px;">
          <zen-nav-link variant="pill" active>Home</zen-nav-link>
          <zen-nav-link variant="pill">Features</zen-nav-link>
          <zen-nav-link variant="pill">Pricing</zen-nav-link>
        </div>
      </div>
      
      <div>
        <p style="color: var(--zen-text-2); margin: 0 0 12px 0; font-size: 0.875rem;">Glow</p>
        <div style="display: flex; gap: 8px;">
          <zen-nav-link variant="glow" active>Home</zen-nav-link>
          <zen-nav-link variant="glow">Features</zen-nav-link>
          <zen-nav-link variant="glow">Pricing</zen-nav-link>
        </div>
      </div>
    </div>
  `
};

export const WithIcons: Story = {
  render: () => html`
    <div style="padding: 40px; display: flex; gap: 8px;">
      <zen-nav-link variant="default" active>
        <span slot="icon">🏠</span>
        Home
      </zen-nav-link>
      <zen-nav-link variant="default">
        <span slot="icon">✨</span>
        Features
      </zen-nav-link>
      <zen-nav-link variant="default">
        <span slot="icon">💰</span>
        Pricing
      </zen-nav-link>
      <zen-nav-link variant="default">
        <span slot="icon">ℹ️</span>
        About
      </zen-nav-link>
    </div>
  `
};

export const InNavbar: Story = {
  render: () => html`
    <div style="
      background: var(--zen-glass-bg);
      border-bottom: 1px solid var(--zen-glass-border);
      padding: 12px 32px;
      display: flex;
      align-items: center;
      gap: 32px;
    ">
      <div style="
        font-size: 1.5rem;
        font-weight: 800;
        background: linear-gradient(135deg, var(--zen-primary), #f093fb);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      ">ZEN</div>
      
      <div style="display: flex; gap: 4px;">
        <zen-nav-link variant="underline" active>Home</zen-nav-link>
        <zen-nav-link variant="underline">Products</zen-nav-link>
        <zen-nav-link variant="underline">Solutions</zen-nav-link>
        <zen-nav-link variant="underline">Resources</zen-nav-link>
        <zen-nav-link variant="underline">Contact</zen-nav-link>
      </div>
      
      <div style="margin-left: auto;">
        <button style="
          padding: 10px 24px;
          background: var(--zen-primary);
          border: none;
          border-radius: var(--zen-radius-md);
          color: white;
          font-weight: 600;
          cursor: pointer;
        ">Get Started</button>
      </div>
    </div>
  `
};
