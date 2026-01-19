import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './ui-table';

const meta: Meta = {
    title: 'Components/Data Display/Table',
    component: 'zen-table',
    tags: ['autodocs'],
    argTypes: {
    },
    args: {
    },
};

export default meta;
type Story = StoryObj;

const columns = [
    { header: 'ID', key: 'id' },
    { header: 'Name', key: 'name' },
    { header: 'Email', key: 'email' },
    { header: 'Role', key: 'role' },
    { header: 'Status', key: 'status' }
];

const data = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive' },
    { id: '4', name: 'Alice Williams', email: 'alice@example.com', role: 'Designer', status: 'Active' },
];

export const Default: Story = {
    render: () => html`
    <div style="padding: 20px;">
      <zen-table .columns="${columns}" .data="${data}"></zen-table>
    </div>
  `
};

export const Empty: Story = {
    render: () => html`
    <div style="padding: 20px;">
      <zen-table .columns="${columns}" .data="${[]}"></zen-table>
    </div>
  `
};
