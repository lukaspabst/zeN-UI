import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './ui-glitch-text';

const meta: Meta = {
  title: 'Components/Text Effects & Animations/Glitch Text',
  component: 'zen-glitch-text',
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    variant: { control: 'select', options: ['cyberpunk', 'neon', 'matrix', 'vhs'] },
    active: { control: 'boolean' },
  },
  args: {
    text: 'GLITCH',
    variant: 'cyberpunk',
    active: true,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="padding: 60px; background: #0a0a0a; display: flex; justify-content: center;">
      <zen-glitch-text 
        text="${args.text}" 
        variant="${args.variant}"
        ?active="${args.active}"
        style="font-size: 4rem;"
      ></zen-glitch-text>
    </div>
  `
};

export const AllVariants: Story = {
  render: () => html`
    <div style="padding: 60px; background: #0a0a0a; display: flex; flex-direction: column; gap: 60px; align-items: center;">
      <div style="text-align: center;">
        <zen-glitch-text text="CYBERPUNK" variant="cyberpunk" style="font-size: 3rem;"></zen-glitch-text>
        <p style="color: #666; margin-top: 16px; font-size: 0.875rem;">Cyberpunk</p>
      </div>
      
      <div style="text-align: center;">
        <zen-glitch-text text="NEON" variant="neon" style="font-size: 3rem;"></zen-glitch-text>
        <p style="color: #666; margin-top: 16px; font-size: 0.875rem;">Neon</p>
      </div>
      
      <div style="text-align: center;">
        <zen-glitch-text text="MATRIX" variant="matrix" style="font-size: 3rem;"></zen-glitch-text>
        <p style="color: #666; margin-top: 16px; font-size: 0.875rem;">Matrix</p>
      </div>
      
      <div style="text-align: center;">
        <zen-glitch-text text="RETRO VHS" variant="vhs" style="font-size: 3rem;"></zen-glitch-text>
        <p style="color: #666; margin-top: 16px; font-size: 0.875rem;">VHS</p>
      </div>
    </div>
  `
};

export const HeroSection: Story = {
  render: () => html`
    <div style="
      padding: 100px 40px;
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%);
      text-align: center;
    ">
      <zen-glitch-text text="WELCOME TO" variant="cyberpunk" style="font-size: 1.5rem; opacity: 0.7;"></zen-glitch-text>
      <br><br>
      <zen-glitch-text text="THE FUTURE" variant="cyberpunk" style="font-size: 4rem;"></zen-glitch-text>
      <p style="color: #888; margin-top: 32px; font-size: 1.1rem; max-width: 500px; margin-left: auto; margin-right: auto; line-height: 1.6;">
        Experience the next generation of web components with stunning visual effects.
      </p>
    </div>
  `
};

export const GameTitle: Story = {
  render: () => html`
    <div style="
      padding: 80px;
      background: #000;
      text-align: center;
      position: relative;
      overflow: hidden;
    ">
      <div style="
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at 50% 50%, rgba(0, 255, 0, 0.1) 0%, transparent 50%);
      "></div>
      <zen-glitch-text text="SYSTEM BREACH" variant="matrix" style="font-size: 3rem;"></zen-glitch-text>
      <p style="color: #00ff00; margin-top: 24px; font-family: 'Courier New', monospace;">
        ACCESS GRANTED...
      </p>
    </div>
  `
};
