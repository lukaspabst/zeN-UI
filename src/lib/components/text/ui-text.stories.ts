import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { loadGoogleFont } from '../../utils/font-loader';
import './ui-text';

const meta: Meta = {
  title: 'Components/Text/Text',
  component: 'zen-text',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body-lg', 'body', 'body-sm', 'caption'],
    },
    weight: {
      control: { type: 'select' },
      options: ['light', 'regular', 'medium', 'semibold', 'bold'],
    },
    gradient: {
      control: { type: 'select' },
      options: ['none', 'aurora', 'gold', 'blue'],
    },
    italic: { control: 'boolean' },
    mono: { control: 'boolean' },
    font: {
      control: { type: 'select' },
      options: ['Inter', 'Outfit', 'Space Grotesk', 'Cinzel'],
    },
  },
  args: {
    variant: 'body',
    weight: 'regular',
    gradient: 'none',
    italic: false,
    mono: false,
    font: 'Inter',
  },
  parameters: {
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => {
    // Dynamically load the selected font
    loadGoogleFont(args.font);

    return html`
    <div style="--zen-font-family: '${args.font}', sans-serif;">
      <zen-text
        variant="${args.variant}"
        weight="${args.weight}"
        gradient="${args.gradient}"
        ?italic="${args.italic}"
        ?mono="${args.mono}"
      >
        The quick brown fox jumps over the lazy dog.
      </zen-text>
    </div>
  `;
  },
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <zen-text variant="h1">Heading 1</zen-text>
      <zen-text variant="h2">Heading 2</zen-text>
      <zen-text variant="h3">Heading 3</zen-text>
      <zen-text variant="h4">Heading 4</zen-text>
      <zen-text variant="h5">Heading 5</zen-text>
      <zen-text variant="h6">Heading 6</zen-text>
      <zen-text variant="body-lg">Body Large - Introduction text size.</zen-text>
      <zen-text variant="body">Body Default - Standard paragraph text size.</zen-text>
      <zen-text variant="body-sm">Body Small - Helper text or secondary information.</zen-text>
      <zen-text variant="caption">CAPTION TEXT</zen-text>
    </div>
  `,
};

export const Gradients: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <zen-text variant="h2" gradient="aurora">Aurora Gradient</zen-text>
      <zen-text variant="h2" gradient="gold">Golden Hour</zen-text>
      <zen-text variant="h2" gradient="blue">Deep Ocean</zen-text>
    </div>
  `,
};
