import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './ui-tooltip';
import '../button/ui-button';
import { ZenTooltip } from './ui-tooltip';

const meta: Meta = {
  title: 'Components/Feedback/Tooltip',
  component: 'zen-tooltip',
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom']
    },
  },
  args: {
    content: 'This is a premium tooltip',
    position: 'top',
  },
  render: (args) => html`
    <div style="padding: 60px; display: flex; justify-content: center; align-items: center;">
      <zen-tooltip .content=${args.content} .position=${args.position}>
        <zen-button variant="outline">Hover Me</zen-button>
      </zen-tooltip>
    </div>
  `,
  parameters: {
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Bottom: Story = {
  args: {
    position: 'bottom',
    content: 'Tooltip appears below',
  },
};

export const AllPositions: Story = {
  parameters: {
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
  render: () => html`
    <div style="padding: 100px; display: flex; gap: 48px; flex-wrap: wrap; justify-content: center;">
      <zen-tooltip content="Top tooltip" position="top">
        <zen-button variant="outline">Top</zen-button>
      </zen-tooltip>
      <zen-tooltip content="Bottom tooltip" position="bottom">
        <zen-button variant="outline">Bottom</zen-button>
      </zen-tooltip>
      <zen-tooltip content="Default position (top)" position="default">
        <zen-button variant="outline">Default</zen-button>
      </zen-tooltip>
    </div>
  `,
};

export const WithFocus: Story = {
  parameters: {
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
  render: () => html`
    <div style="padding: 100px; display: flex; gap: 24px; justify-content: center;">
      <zen-tooltip content="Tab to focus this button">
        <zen-button variant="primary">Focusable Button</zen-button>
      </zen-tooltip>
      <zen-tooltip content="You can also focus this one">
        <zen-button variant="secondary">Another Focusable</zen-button>
      </zen-tooltip>
    </div>
  `,
};

export const InteractionTest: Story = {
  parameters: {
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
  render: () => {
    const testInteractions = () => {
      const tooltips = document.querySelectorAll('zen-tooltip') as NodeListOf<ZenTooltip>;
      tooltips.forEach((tooltip) => {
        // Test show
        (tooltip as unknown as { _show: () => void })._show();
        setTimeout(() => {
          // Test hide
          (tooltip as unknown as { _hide: () => void })._hide();
        }, 100);
      });
    };

    return html`
      <div style="padding: 100px; display: flex; flex-direction: column; gap: 24px; align-items: center;">
        <zen-tooltip content="Interaction test tooltip" position="top">
          <zen-button variant="outline">Test Tooltip</zen-button>
        </zen-tooltip>
        <zen-button variant="primary" @click=${testInteractions}>
          Test Show/Hide Methods
        </zen-button>
      </div>
    `;
  },
};

export const LongContent: Story = {
  parameters: {
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
  render: () => html`
    <div style="padding: 100px; display: flex; justify-content: center;">
      <zen-tooltip content="This is a longer tooltip message that contains more detailed information for the user" position="top">
        <zen-button variant="outline">Long Tooltip</zen-button>
      </zen-tooltip>
    </div>
  `,
};
