import { html } from 'lit';
import type { Meta } from '@storybook/web-components-vite';
import './ui-calendar';

const meta: Meta = {
    title: 'Components/Data Display/Calendar',
    component: 'zen-calendar',
    tags: ['autodocs'],
    render: () => html`<zen-calendar></zen-calendar>`,
};

export default meta;
export const Default = {};
