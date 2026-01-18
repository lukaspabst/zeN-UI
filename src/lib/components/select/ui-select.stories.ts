import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './ui-select';

const meta: Meta = {
    title: 'Components/Forms/Select',
    component: 'zen-select',
    tags: ['autodocs'],
    render: () => html`
    <div style="height: 250px;">
      <zen-select 
        label="Role" 
        .options=${[
            { label: 'Admin', value: 'admin' },
            { label: 'Editor', value: 'editor' },
            { label: 'Viewer', value: 'viewer' }
        ]}
      ></zen-select>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
