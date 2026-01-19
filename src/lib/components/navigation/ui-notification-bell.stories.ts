import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './ui-notification-bell';

const meta: Meta = {
  title: 'Components/Navigation/Notification Bell',
  component: 'zen-notification-bell',
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
  },
  args: {
    open: false,
  },
};

export default meta;
type Story = StoryObj;

const sampleNotifications = [
  {
    id: '1',
    title: 'New message received',
    message: 'John Doe sent you a message about the project',
    time: '2 minutes ago',
    read: false,
    icon: '💬',
  },
  {
    id: '2',
    title: 'Payment successful',
    message: 'Your payment of $99.00 has been processed',
    time: '1 hour ago',
    read: false,
    icon: '💳',
  },
  {
    id: '3',
    title: 'New follower',
    message: 'Sarah Williams started following you',
    time: '3 hours ago',
    read: true,
    icon: '👤',
  },
  {
    id: '4',
    title: 'Task completed',
    message: 'Project review has been marked as complete',
    time: 'Yesterday',
    read: true,
    icon: '✅',
  },
];

export const Default: Story = {
  render: (args) => html`
    <div style="padding: 40px; display: flex; justify-content: flex-end;">
      <zen-notification-bell 
        ?open="${args.open}"
        .notifications=${sampleNotifications}
      ></zen-notification-bell>
    </div>
  `
};

export const WithManyUnread: Story = {
  render: () => html`
    <div style="padding: 40px; display: flex; justify-content: flex-end;">
      <zen-notification-bell 
        .notifications=${[
      { id: '1', title: 'Alert 1', message: 'Something happened', time: '1m ago', read: false, icon: '🔥' },
      { id: '2', title: 'Alert 2', message: 'Another thing', time: '2m ago', read: false, icon: '⚡' },
      { id: '3', title: 'Alert 3', message: 'More stuff', time: '5m ago', read: false, icon: '📢' },
      { id: '4', title: 'Alert 4', message: 'Even more', time: '10m ago', read: false, icon: '🎉' },
      { id: '5', title: 'Alert 5', message: 'So much', time: '15m ago', read: false, icon: '💡' },
    ]}
      ></zen-notification-bell>
    </div>
  `
};

export const Empty: Story = {
  render: () => html`
    <div style="padding: 40px; display: flex; justify-content: flex-end;">
      <zen-notification-bell .notifications=${[]}></zen-notification-bell>
    </div>
  `
};

export const InNavbar: Story = {
  render: () => html`
    <div style="
      background: var(--zen-glass-bg);
      border-bottom: 1px solid var(--zen-glass-border);
      padding: 16px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    ">
      <div style="font-size: 1.25rem; font-weight: 700; color: var(--zen-text-1);">
        🚀 ZenApp
      </div>
      <div style="display: flex; align-items: center; gap: 16px;">
        <zen-notification-bell .notifications=${sampleNotifications}></zen-notification-bell>
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
          font-size: 0.875rem;
        ">JD</div>
      </div>
    </div>
  `
};
