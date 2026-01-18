import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './ui-gradient-blob';

const meta: Meta = {
    title: 'Components/Experimental/GradientBlob',
    component: 'zen-gradient-blob',
    tags: ['autodocs'],
    argTypes: {
        variant: { control: 'select', options: ['purple', 'ocean', 'sunset', 'aurora'] },
        speed: { control: { type: 'range', min: 0.5, max: 3, step: 0.1 } },
    },
    args: {
        variant: 'purple',
        speed: 1,
    },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: (args) => html`
    <zen-gradient-blob variant="${args.variant}" speed="${args.speed}" style="height: 500px; border-radius: 16px;">
      <div style="
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        text-align: center;
        padding: 40px;
      ">
        <h1 style="margin: 0 0 16px 0; font-size: 3rem; font-weight: 800;">Beautiful Gradients</h1>
        <p style="margin: 0; font-size: 1.2rem; opacity: 0.9; max-width: 400px;">
          Animated gradient blobs create a mesmerizing background effect.
        </p>
      </div>
    </zen-gradient-blob>
  `
};

export const AllVariants: Story = {
    render: () => html`
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;">
      <zen-gradient-blob variant="purple" style="height: 300px; border-radius: 16px;">
        <div style="height: 100%; display: flex; justify-content: center; align-items: center; color: white;">
          <h2 style="margin: 0; font-size: 2rem;">Purple</h2>
        </div>
      </zen-gradient-blob>
      
      <zen-gradient-blob variant="ocean" style="height: 300px; border-radius: 16px;">
        <div style="height: 100%; display: flex; justify-content: center; align-items: center; color: white;">
          <h2 style="margin: 0; font-size: 2rem;">Ocean</h2>
        </div>
      </zen-gradient-blob>
      
      <zen-gradient-blob variant="sunset" style="height: 300px; border-radius: 16px;">
        <div style="height: 100%; display: flex; justify-content: center; align-items: center; color: white;">
          <h2 style="margin: 0; font-size: 2rem;">Sunset</h2>
        </div>
      </zen-gradient-blob>
      
      <zen-gradient-blob variant="aurora" style="height: 300px; border-radius: 16px;">
        <div style="height: 100%; display: flex; justify-content: center; align-items: center; color: white;">
          <h2 style="margin: 0; font-size: 2rem;">Aurora</h2>
        </div>
      </zen-gradient-blob>
    </div>
  `
};

export const HeroSection: Story = {
    render: () => html`
    <zen-gradient-blob variant="aurora" speed="0.7" style="height: 600px;">
      <div style="
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        text-align: center;
        padding: 60px;
      ">
        <p style="margin: 0 0 16px 0; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 3px; opacity: 0.8;">
          Welcome to
        </p>
        <h1 style="margin: 0 0 24px 0; font-size: 4rem; font-weight: 900; letter-spacing: -2px;">
          ZEN UI
        </h1>
        <p style="margin: 0 0 40px 0; font-size: 1.3rem; opacity: 0.9; max-width: 500px; line-height: 1.6;">
          Build stunning, modern interfaces with our premium component library.
        </p>
        <div style="display: flex; gap: 16px;">
          <button style="
            padding: 14px 32px;
            background: white;
            color: #000;
            border: none;
            border-radius: 99px;
            font-weight: 600;
            cursor: pointer;
            font-size: 1rem;
          ">Get Started</button>
          <button style="
            padding: 14px 32px;
            background: rgba(255,255,255,0.1);
            color: white;
            border: 1px solid rgba(255,255,255,0.3);
            border-radius: 99px;
            font-weight: 600;
            cursor: pointer;
            font-size: 1rem;
          ">Learn More</button>
        </div>
      </div>
    </zen-gradient-blob>
  `
};
