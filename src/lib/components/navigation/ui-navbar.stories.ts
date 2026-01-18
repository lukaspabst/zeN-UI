import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './ui-navbar';
import './ui-nav-link';
import './ui-nav-button';

const meta: Meta = {
  title: 'Components/Navigation/Navbar',
  component: 'zen-navbar',
  tags: ['autodocs'],
  argTypes: {
    logoText: { control: 'text' },
    sticky: { control: 'boolean' },
    transparent: { control: 'boolean' },
  },
  args: {
    logoText: 'ZEN',
    sticky: true,
    transparent: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <zen-navbar 
      logoText="${args.logoText}"
      ?sticky="${args.sticky}"
      ?transparent="${args.transparent}"
    >
      <zen-nav-link slot="links" active>Home</zen-nav-link>
      <zen-nav-link slot="links">Features</zen-nav-link>
      <zen-nav-link slot="links">Pricing</zen-nav-link>
      <zen-nav-link slot="links">About</zen-nav-link>
      
      <zen-nav-button slot="actions" variant="ghost">Sign In</zen-nav-button>
      <zen-nav-button slot="actions" variant="primary">Get Started</zen-nav-button>
    </zen-navbar>
    
    <div style="padding: 40px;">
      <p style="color: var(--zen-text-2);">Scroll down to see the navbar effect (when sticky enabled)</p>
    </div>
  `
};

export const UnderlineLinks: Story = {
  render: () => html`
    <zen-navbar logoText="✨ Premium">
      <zen-nav-link slot="links" variant="underline" active>Home</zen-nav-link>
      <zen-nav-link slot="links" variant="underline">Products</zen-nav-link>
      <zen-nav-link slot="links" variant="underline">Solutions</zen-nav-link>
      <zen-nav-link slot="links" variant="underline">Resources</zen-nav-link>
      
      <zen-nav-button slot="actions" variant="primary">Get Started</zen-nav-button>
    </zen-navbar>
  `
};

export const PillLinks: Story = {
  render: () => html`
    <zen-navbar logoText="🚀 RocketApp">
      <zen-nav-link slot="links" variant="pill" active>Dashboard</zen-nav-link>
      <zen-nav-link slot="links" variant="pill">Projects</zen-nav-link>
      <zen-nav-link slot="links" variant="pill">Team</zen-nav-link>
      <zen-nav-link slot="links" variant="pill">Settings</zen-nav-link>
      
      <div slot="actions" style="display: flex; align-items: center; gap: 12px;">
        <div style="
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea, #764ba2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
        ">JD</div>
      </div>
    </zen-navbar>
  `
};

export const GlowLinks: Story = {
  render: () => html`
    <div style="background: #050505;">
      <zen-navbar logoText="⚡ NeonApp">
        <zen-nav-link slot="links" variant="glow" active>Home</zen-nav-link>
        <zen-nav-link slot="links" variant="glow">Features</zen-nav-link>
        <zen-nav-link slot="links" variant="glow">Pricing</zen-nav-link>
        <zen-nav-link slot="links" variant="glow">Contact</zen-nav-link>
        
        <zen-nav-button slot="actions" variant="outline">Sign In</zen-nav-button>
      </zen-navbar>
    </div>
  `
};

export const WithIcons: Story = {
  render: () => html`
    <zen-navbar logoText="🎨 DesignApp">
      <zen-nav-link slot="links" active>
        <span slot="icon">🏠</span>
        Home
      </zen-nav-link>
      <zen-nav-link slot="links">
        <span slot="icon">📦</span>
        Products
      </zen-nav-link>
      <zen-nav-link slot="links">
        <span slot="icon">💎</span>
        Pricing
      </zen-nav-link>
      <zen-nav-link slot="links">
        <span slot="icon">📧</span>
        Contact
      </zen-nav-link>
      
      <zen-nav-button slot="actions" variant="primary">Start Free</zen-nav-button>
    </zen-navbar>
  `
};

export const FullPage: Story = {
  render: () => html`
    <div style="min-height: 200vh;">
      <zen-navbar logoText="✨ Premium" sticky>
        <zen-nav-link slot="links" variant="underline" active>Home</zen-nav-link>
        <zen-nav-link slot="links" variant="underline">Products</zen-nav-link>
        <zen-nav-link slot="links" variant="underline">Services</zen-nav-link>
        <zen-nav-link slot="links" variant="underline">Contact</zen-nav-link>
        
        <zen-nav-button slot="actions" variant="secondary">Login</zen-nav-button>
        <zen-nav-button slot="actions" variant="primary">Start Free</zen-nav-button>
      </zen-navbar>
      
      <div style="padding: 100px 40px; text-align: center;">
        <h1 style="font-size: 4rem; font-weight: 900; color: var(--zen-text-1); margin: 0 0 24px 0;">
          Welcome to Premium
        </h1>
        <p style="color: var(--zen-text-2); font-size: 1.25rem; max-width: 600px; margin: 0 auto;">
          Scroll down to see the navbar background change with a blur effect.
        </p>
      </div>
      
      <div style="height: 1000px;"></div>
    </div>
  `
};
