import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './ui-radio';

const meta: Meta = {
    title: 'Components/Forms/Radio',
    component: 'zen-radio',
    tags: ['autodocs'],
    render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <zen-radio name="group1" value="1">Option 1</zen-radio>
      <zen-radio name="group1" value="2" checked>Option 2</zen-radio>
      <zen-radio name="group1" value="3" disabled>Option 3 (Disabled)</zen-radio>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
