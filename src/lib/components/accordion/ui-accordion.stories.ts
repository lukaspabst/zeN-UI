import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './ui-accordion';

const meta: Meta = {
  title: 'Components/Data Display/Accordion',
  component: 'zen-accordion',
  render: () => html`
    <zen-accordion>
      <zen-accordion-item header="Premium Design">
        Our design system utilizes glassmorphism, fluid animations, and high-fidelity interactions to create a premium feel.
      </zen-accordion-item>
      <zen-accordion-item header="Performance">
        Built on Lit, these components are lightweight, framework-agnostic, and compiled to standard Web Components.
      </zen-accordion-item>
      <zen-accordion-item header="Customization">
        Every aspect is customizable via CSS variables, from radii to shadow depth.
      </zen-accordion-item>
    </zen-accordion>
  `,
};

export default meta;
export const Default: StoryObj = {};
