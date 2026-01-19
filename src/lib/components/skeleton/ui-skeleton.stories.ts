import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './ui-skeleton';

const meta: Meta = {
  title: 'Components/Data Display/Skeleton',
  component: 'zen-skeleton',
  tags: ['autodocs'],
  render: () => html`
    <div style="width: 300px; padding: 20px; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;">
      <div style="display: flex; gap: 12px; margin-bottom: 12px;">
        <zen-skeleton variant="circular" width="40px" height="40px"></zen-skeleton>
        <div style="flex: 1">
          <zen-skeleton width="60%"></zen-skeleton>
          <zen-skeleton width="40%"></zen-skeleton>
        </div>
      </div>
      <zen-skeleton height="100px" variant="rectangular"></zen-skeleton>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const CardLoading: Story = {};
