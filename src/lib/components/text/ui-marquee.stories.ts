import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './ui-marquee';

const meta: Meta = {
  title: 'Components/Text Effects & Animations/Marquee',
  component: 'zen-marquee',
  tags: ['autodocs'],
  argTypes: {
    speed: { control: { type: 'range', min: 10, max: 60, step: 5 } },
    direction: { control: 'select', options: ['left', 'right'] },
    pauseOnHover: { control: 'boolean' },
    gap: { control: { type: 'range', min: 20, max: 100, step: 10 } },
  },
  args: {
    speed: 30,
    direction: 'left',
    pauseOnHover: true,
    gap: 40,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <zen-marquee 
      speed="${args.speed}"
      direction="${args.direction}"
      ?pauseOnHover="${args.pauseOnHover}"
      gap="${args.gap}"
      style="padding: 20px 0;"
    >
      <span style="font-size: 1.5rem; color: var(--zen-text-1);">🚀 ZEN UI</span>
      <span style="font-size: 1.5rem; color: var(--zen-text-2);">•</span>
      <span style="font-size: 1.5rem; color: var(--zen-text-1);">✨ Beautiful Components</span>
      <span style="font-size: 1.5rem; color: var(--zen-text-2);">•</span>
      <span style="font-size: 1.5rem; color: var(--zen-text-1);">🎨 Modern Design</span>
      <span style="font-size: 1.5rem; color: var(--zen-text-2);">•</span>
      <span style="font-size: 1.5rem; color: var(--zen-text-1);">⚡ Lightning Fast</span>
      <span style="font-size: 1.5rem; color: var(--zen-text-2);">•</span>
    </zen-marquee>
  `
};

export const TechStack: Story = {
  render: () => html`
    <div style="padding: 40px 0; background: var(--zen-bg-1);">
      <p style="text-align: center; color: var(--zen-text-2); margin: 0 0 24px 0; text-transform: uppercase; letter-spacing: 2px; font-size: 0.875rem;">
        Trusted by teams using
      </p>
      <zen-marquee speed="25" gap="60">
        <div style="display: flex; align-items: center; gap: 12px; color: var(--zen-text-1);">
          <span style="font-size: 2rem;">⚛️</span>
          <span style="font-size: 1.2rem; font-weight: 600;">React</span>
        </div>
        <div style="display: flex; align-items: center; gap: 12px; color: var(--zen-text-1);">
          <span style="font-size: 2rem;">💚</span>
          <span style="font-size: 1.2rem; font-weight: 600;">Vue</span>
        </div>
        <div style="display: flex; align-items: center; gap: 12px; color: var(--zen-text-1);">
          <span style="font-size: 2rem;">🅰️</span>
          <span style="font-size: 1.2rem; font-weight: 600;">Angular</span>
        </div>
        <div style="display: flex; align-items: center; gap: 12px; color: var(--zen-text-1);">
          <span style="font-size: 2rem;">🔷</span>
          <span style="font-size: 1.2rem; font-weight: 600;">TypeScript</span>
        </div>
        <div style="display: flex; align-items: center; gap: 12px; color: var(--zen-text-1);">
          <span style="font-size: 2rem;">🟢</span>
          <span style="font-size: 1.2rem; font-weight: 600;">Node.js</span>
        </div>
        <div style="display: flex; align-items: center; gap: 12px; color: var(--zen-text-1);">
          <span style="font-size: 2rem;">🔺</span>
          <span style="font-size: 1.2rem; font-weight: 600;">Next.js</span>
        </div>
      </zen-marquee>
    </div>
  `
};

export const Testimonials: Story = {
  render: () => html`
    <div style="padding: 60px 0; background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);">
      <zen-marquee speed="40" gap="32">
        ${['Amazing library! 🔥', 'Best components ever!', 'My go-to UI kit 💯', 'Saved us weeks of work!', 'Beautiful design ✨', 'Highly recommended!'].map(text => html`
          <div style="
            background: var(--zen-glass-bg);
            border: 1px solid var(--zen-glass-border);
            border-radius: 12px;
            padding: 20px 28px;
            color: var(--zen-text-1);
            font-size: 1rem;
            white-space: nowrap;
          ">
            "${text}"
          </div>
        `)}
      </zen-marquee>
      
      <zen-marquee speed="35" direction="right" gap="32" style="margin-top: 16px;">
        ${['Game changer! 🚀', 'Super easy to use', 'Love the animations!', 'Premium quality 👌', 'Worth every penny', 'Clean & modern'].map(text => html`
          <div style="
            background: var(--zen-glass-bg);
            border: 1px solid var(--zen-glass-border);
            border-radius: 12px;
            padding: 20px 28px;
            color: var(--zen-text-1);
            font-size: 1rem;
            white-space: nowrap;
          ">
            "${text}"
          </div>
        `)}
      </zen-marquee>
    </div>
  `
};

export const LogoCloud: Story = {
  render: () => html`
    <div style="padding: 40px 0;">
      <zen-marquee speed="20" gap="80">
        ${['ACME', 'STARK', 'WAYNE', 'UMBRELLA', 'CYBERDYNE', 'WEYLAND'].map(name => html`
          <div style="
            font-size: 1.5rem;
            font-weight: 800;
            color: var(--zen-text-2);
            letter-spacing: 2px;
          ">${name}</div>
        `)}
      </zen-marquee>
    </div>
  `
};
