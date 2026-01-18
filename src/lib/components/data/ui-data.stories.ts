import { html } from 'lit';

import '../badge/ui-badge';
import '../tabs/ui-tabs';
import '../table/ui-table';


export const Badges = () => html`
    <div style="display: flex; gap: 8px;">
        <zen-badge variant="neutral">Neutral</zen-badge>
        <zen-badge variant="primary">New</zen-badge>
        <zen-badge variant="success">Active</zen-badge>
        <zen-badge variant="error">Deleted</zen-badge>
        <zen-badge variant="warning">Pending</zen-badge>
    </div>
`;


export const Tabs = () => html`
    <zen-tabs active="account">
        <zen-tab slot="tabs" value="account">Account</zen-tab>
        <zen-tab slot="tabs" value="settings">Settings</zen-tab>
        <zen-tab slot="tabs" value="billing">Billing</zen-tab>
        
        <zen-tab-panel value="account">
            <h3>Account Info</h3>
            <p>Manage your profile here.</p>
        </zen-tab-panel>
        <zen-tab-panel value="settings">
            <h3>Settings</h3>
            <p>Change your preferences.</p>
        </zen-tab-panel>
        <zen-tab-panel value="billing">
            <h3>Billing</h3>
            <p>View your invoices.</p>
        </zen-tab-panel>
    </zen-tabs>
`;


export const Table = () => html`
    <zen-table 
        .columns=${[
        { header: 'Name', key: 'name' },
        { header: 'Role', key: 'role' },
        { header: 'Status', key: 'status' }
    ]}
        .data=${[
        { name: 'Alice Johnson', role: 'Admin', status: 'Active' },
        { name: 'Bob Smith', role: 'Editor', status: 'Pending' },
        { name: 'Charlie Brown', role: 'Viewer', status: 'Inactive' }
    ]}
    ></zen-table>
`;

export default {
    title: 'Components/Data',
};
