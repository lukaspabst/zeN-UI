import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './ui-text-reveal';

const meta: Meta = {
  title: 'Components/Experimental/TextReveal',
  component: 'zen-text-reveal',
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['slide', 'fade', 'blur'] },
    delay: { control: { type: 'range', min: 0, max: 2, step: 0.1 } },
    duration: { control: { type: 'range', min: 0.2, max: 1.5, step: 0.1 } },
    trigger: { control: 'boolean' },
  },
  args: {
    variant: 'slide',
    delay: 0,
    duration: 0.6,
    trigger: true,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="padding: 60px; text-align: center;">
      <h1 style="font-size: 3rem; font-weight: 800; color: var(--zen-text-1); margin: 0; line-height: 1.2;">
        <zen-text-reveal variant="${args.variant}" delay="${args.delay}" duration="${args.duration}" ?trigger="${args.trigger}">
          Hello World
        </zen-text-reveal>
      </h1>
      <p style="margin-top: 16px; color: var(--zen-text-2);">Toggle "trigger" in controls to see animation</p>
    </div>
  `
};

export const SlideVariant: Story = {
  args: { variant: 'slide', trigger: true },
  render: (args) => html`
    <div style="padding: 60px; text-align: center;">
      <h2 style="font-size: 2.5rem; font-weight: 800; color: var(--zen-text-1); margin: 0;">
        <zen-text-reveal variant="slide" ?trigger="${args.trigger}">Slide Up Effect</zen-text-reveal>
      </h2>
    </div>
  `
};

export const FadeVariant: Story = {
  args: { variant: 'fade', trigger: true },
  render: (args) => html`
    <div style="padding: 60px; text-align: center;">
      <h2 style="font-size: 2.5rem; font-weight: 800; color: var(--zen-text-1); margin: 0;">
        <zen-text-reveal variant="fade" ?trigger="${args.trigger}">Fade In Effect</zen-text-reveal>
      </h2>
    </div>
  `
};

export const BlurVariant: Story = {
  args: { variant: 'blur', trigger: true },
  render: (args) => html`
    <div style="padding: 60px; text-align: center;">
      <h2 style="font-size: 2.5rem; font-weight: 800; color: var(--zen-text-1); margin: 0;">
        <zen-text-reveal variant="blur" ?trigger="${args.trigger}">Blur In Effect</zen-text-reveal>
      </h2>
    </div>
  `
};

export const StaggeredHero: Story = {
  args: { trigger: true },
  render: (args) => html`
    <div style="
      padding: 100px 40px;
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
      text-align: center;
    ">
      <div style="margin-bottom: 16px;">
        <zen-text-reveal variant="fade" ?trigger="${args.trigger}">
          <span style="color: #888; text-transform: uppercase; letter-spacing: 3px; font-size: 0.875rem;">
            Welcome to the future
          </span>
        </zen-text-reveal>
      </div>
      
      <h1 style="font-size: 4rem; font-weight: 900; margin: 0; line-height: 1.1; color: white;">
        <zen-text-reveal variant="slide" delay="0.2" ?trigger="${args.trigger}">Build</zen-text-reveal>
        <zen-text-reveal variant="slide" delay="0.4" ?trigger="${args.trigger}">
          <span style="color: var(--zen-primary);"> Beautiful </span>
        </zen-text-reveal>
        <br>
        <zen-text-reveal variant="slide" delay="0.6" ?trigger="${args.trigger}">Interfaces</zen-text-reveal>
      </h1>
      
      <div style="margin-top: 32px;">
        <zen-text-reveal variant="blur" delay="1" duration="0.8" ?trigger="${args.trigger}">
          <span style="color: #666; font-size: 1.2rem;">
            The most advanced component library for modern web apps.
          </span>
        </zen-text-reveal>
      </div>
    </div>
  `
};
