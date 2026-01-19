import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './ui-footer';

const meta: Meta = {
  title: 'Components/Navigation/Footer',
  component: 'zen-footer',
  tags: ['autodocs'],
  argTypes: {
    logoText: { control: 'text' },
    copyright: { control: 'text' },
    variant: { control: 'select', options: ['simple', 'detailed'] },
  },
  args: {
    copyright: '',
    variant: 'detailed',
  },
  parameters: {
    a11y: { disable: true },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  parameters: {
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
  render: (args) => html`
    <zen-footer 
      logoText="${args.logoText}"
      copyright="${args.copyright}"
      variant="${args.variant}"
    ></zen-footer>
  `
};

export const Detailed: Story = {
  parameters: {
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
  render: () => html`
    <zen-footer logoText="🚀 RocketApp" variant="detailed"></zen-footer>
  `
};

export const Simple: Story = {
  parameters: {
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
  render: () => html`
    <zen-footer logoText="✨ SimpleApp" variant="simple"></zen-footer>
  `
};

export const FullPage: Story = {
  parameters: {
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
  render: () => html`
    <div style="min-height: 100vh; display: flex; flex-direction: column;">
      <main style="flex: 1; padding: 60px 40px; text-align: center;">
        <h1 style="font-size: 3rem; font-weight: 800; color: var(--zen-text-1); margin: 0 0 24px 0;">
          Your Amazing App
        </h1>
        <p style="color: var(--zen-text-2); font-size: 1.1rem; max-width: 500px; margin: 0 auto;">
          This demonstrates a full page layout with the footer at the bottom.
        </p>
      </main>
      
      <zen-footer logoText="🌟 Premium" variant="detailed"></zen-footer>
    </div>
  `
};

export const DarkShowcase: Story = {
  parameters: {
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
  render: () => html`
    <div style="background: #050505; min-height: 100vh;">
      <div style="padding: 100px 40px; text-align: center;">
        <h1 style="color: white; font-size: 2.5rem; margin: 0;">Dark Theme Footer</h1>
      </div>
      <zen-footer logoText="⚡ Thunder" variant="detailed"></zen-footer>
    </div>
  `
};
