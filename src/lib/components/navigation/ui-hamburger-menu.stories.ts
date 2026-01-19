import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './ui-hamburger-menu';

const meta: Meta = {
  title: 'Components/Navigation/Hamburger Menu',
  component: 'zen-hamburger-menu',
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['spin', 'squeeze', 'arrow'] },
    open: { control: 'boolean' },
  },
  args: {
    variant: 'spin',
    open: false,
  },
  parameters: {
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="padding: 40px;">
      <zen-hamburger-menu variant="${args.variant}" ?open="${args.open}">
        <a class="menu-item" href="#">
          <span class="menu-item-icon">🏠</span>
          Home
        </a>
        <a class="menu-item" href="#">
          <span class="menu-item-icon">📦</span>
          Products
        </a>
        <a class="menu-item" href="#">
          <span class="menu-item-icon">💼</span>
          Services
        </a>
        <a class="menu-item" href="#">
          <span class="menu-item-icon">📧</span>
          Contact
        </a>
        
        <div slot="footer">
          <button style="
            width: 100%;
            padding: 12px;
            background: var(--zen-primary);
            border: none;
            border-radius: var(--zen-radius-md);
            color: white;
            font-weight: 600;
            cursor: pointer;
          ">Sign In</button>
        </div>
      </zen-hamburger-menu>
      
      <p style="color: var(--zen-text-2); margin-top: 24px;">Click the hamburger icon to open the menu</p>
    </div>
  `
};

export const AllVariants: Story = {
  render: () => html`
    <div style="padding: 40px; display: flex; gap: 32px; flex-wrap: wrap;">
      <div style="text-align: center;">
        <zen-hamburger-menu variant="spin">
          <a style="display: block; padding: 16px; color: var(--zen-text-1);">Menu Item 1</a>
          <a style="display: block; padding: 16px; color: var(--zen-text-1);">Menu Item 2</a>
        </zen-hamburger-menu>
        <p style="color: var(--zen-text-2); margin-top: 12px; font-size: 0.875rem;">Spin</p>
      </div>
      
      <div style="text-align: center;">
        <zen-hamburger-menu variant="squeeze">
          <a style="display: block; padding: 16px; color: var(--zen-text-1);">Menu Item 1</a>
          <a style="display: block; padding: 16px; color: var(--zen-text-1);">Menu Item 2</a>
        </zen-hamburger-menu>
        <p style="color: var(--zen-text-2); margin-top: 12px; font-size: 0.875rem;">Squeeze</p>
      </div>
      
      <div style="text-align: center;">
        <zen-hamburger-menu variant="arrow">
          <a style="display: block; padding: 16px; color: var(--zen-text-1);">Menu Item 1</a>
          <a style="display: block; padding: 16px; color: var(--zen-text-1);">Menu Item 2</a>
        </zen-hamburger-menu>
        <p style="color: var(--zen-text-2); margin-top: 12px; font-size: 0.875rem;">Arrow</p>
      </div>
    </div>
  `
};
