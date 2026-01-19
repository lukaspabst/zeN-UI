import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './ui-tabs';

const meta: Meta = {
    title: 'Components/Navigation/Tabs',
    component: 'zen-tabs',
    tags: ['autodocs'],
    argTypes: {
        active: { control: 'text' },
    },
    args: {
        active: 'account',
    },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: (args) => html`
    <div style="max-width: 600px;">
      <zen-tabs active="${args.active}">
        <zen-tab slot="tabs" value="account">Account</zen-tab>
        <zen-tab slot="tabs" value="password">Password</zen-tab>
        <zen-tab slot="tabs" value="settings">Settings</zen-tab>
        
        <zen-tab-panel value="account">
          <div style="padding: 24px; background: var(--zen-glass-bg); border-radius: 8px; border: 1px solid var(--zen-glass-border);">
            <h3 style="margin-top: 0; color: var(--zen-text-1);">Account Settings</h3>
            <p style="color: var(--zen-text-2);">Manage your account details and preferences here.</p>
          </div>
        </zen-tab-panel>
        
        <zen-tab-panel value="password">
          <div style="padding: 24px; background: var(--zen-glass-bg); border-radius: 8px; border: 1px solid var(--zen-glass-border);">
            <h3 style="margin-top: 0; color: var(--zen-text-1);">Change Password</h3>
            <p style="color: var(--zen-text-2);">Update your password to keep your account secure.</p>
          </div>
        </zen-tab-panel>
        
        <zen-tab-panel value="settings">
          <div style="padding: 24px; background: var(--zen-glass-bg); border-radius: 8px; border: 1px solid var(--zen-glass-border);">
            <h3 style="margin-top: 0; color: var(--zen-text-1);">General Settings</h3>
            <p style="color: var(--zen-text-2);">Customize your application experience.</p>
          </div>
        </zen-tab-panel>
      </zen-tabs>
    </div>
  `
};
