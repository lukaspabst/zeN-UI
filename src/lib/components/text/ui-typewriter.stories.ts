import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './ui-typewriter';

const meta: Meta = {
  title: 'Components/Text Effects & Animations/Typewriter',
  component: 'zen-typewriter',
  tags: ['autodocs'],
  argTypes: {
    typeSpeed: { control: { type: 'range', min: 20, max: 200, step: 10 } },
    deleteSpeed: { control: { type: 'range', min: 20, max: 150, step: 10 } },
    pauseDuration: { control: { type: 'range', min: 500, max: 5000, step: 100 } },
    loop: { control: 'boolean' },
    cursor: { control: 'boolean' },
    cursorChar: { control: 'text' },
  },
  args: {
    typeSpeed: 80,
    deleteSpeed: 50,
    pauseDuration: 2000,
    loop: true,
    cursor: true,
    cursorChar: '|',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="padding: 60px; text-align: center;">
      <h1 style="font-size: 3rem; font-weight: 700; color: var(--zen-text-1); margin: 0;">
        I am a 
        <zen-typewriter 
          .texts=${['Developer', 'Designer', 'Creator', 'Dreamer']}
          typeSpeed="${args.typeSpeed}"
          deleteSpeed="${args.deleteSpeed}"
          pauseDuration="${args.pauseDuration}"
          ?loop="${args.loop}"
          ?cursor="${args.cursor}"
          cursorChar="${args.cursorChar}"
          style="color: var(--zen-primary);"
        ></zen-typewriter>
      </h1>
    </div>
  `
};

export const HeroHeadline: Story = {
  render: () => html`
    <div style="
      padding: 100px 40px;
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
      text-align: center;
    ">
      <p style="color: #888; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 3px; font-size: 0.875rem;">
        Welcome to the future
      </p>
      <h1 style="font-size: 4rem; font-weight: 800; color: white; margin: 0 0 24px 0;">
        Build<br>
        <span style="color: #667eea;">
          <zen-typewriter 
            .texts=${['Beautiful', 'Modern', 'Stunning', 'Premium']}
            typeSpeed="100"
            pauseDuration="2500"
          ></zen-typewriter>
        </span>
        <br>Interfaces
      </h1>
      <p style="color: #666; font-size: 1.2rem; max-width: 500px; margin: 0 auto;">
        The most advanced component library for modern web applications.
      </p>
    </div>
  `
};

export const CodeTerminal: Story = {
  render: () => html`
    <div style="
      padding: 40px;
      background: #0a0a0a;
      border-radius: 12px;
      font-family: 'Courier New', monospace;
      max-width: 600px;
      margin: 40px auto;
    ">
      <div style="display: flex; gap: 6px; margin-bottom: 20px;">
        <div style="width: 12px; height: 12px; border-radius: 50%; background: #ff5f56;"></div>
        <div style="width: 12px; height: 12px; border-radius: 50%; background: #ffbd2e;"></div>
        <div style="width: 12px; height: 12px; border-radius: 50%; background: #27c93f;"></div>
      </div>
      <div style="color: #888;">
        <span style="color: #27c93f;">user@zen</span>:<span style="color: #4a9eff;">~</span>$ 
        <zen-typewriter 
          .texts=${['npm install zen-ui', 'npx create-zen-app my-project', 'npm run dev']}
          typeSpeed="60"
          deleteSpeed="30"
          pauseDuration="3000"
          cursorChar="_"
          style="color: #fff;"
        ></zen-typewriter>
      </div>
    </div>
  `
};

export const MultipleTexts: Story = {
  render: () => html`
    <div style="padding: 60px; text-align: center;">
      <h2 style="font-size: 2rem; color: var(--zen-text-1); margin: 0;">
        We specialize in 
        <zen-typewriter 
          .texts=${['Web Development', 'UI/UX Design', 'Mobile Apps', 'Cloud Solutions', 'AI Integration']}
          typeSpeed="70"
          deleteSpeed="40"
          pauseDuration="1500"
          style="color: var(--zen-primary); font-weight: 700;"
        ></zen-typewriter>
      </h2>
    </div>
  `
};
