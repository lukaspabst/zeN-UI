import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './ui-textarea';

const meta: Meta = {
  title: 'Components/Forms/Textarea',
  component: 'zen-textarea',
  tags: ['autodocs'],
  args: {
    label: 'Biography',
    placeholder: 'Tell us a bit about yourself...',
    rows: 4,
  },
  render: (args) => html`
    <zen-textarea 
      label=${args.label} 
      placeholder=${args.placeholder} 
      rows=${args.rows}
    ></zen-textarea>
  `,
  parameters: {
    a11y: { disable: true },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
