import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './ui-tilt-card';

const meta: Meta = {
  title: 'Components/Data Display/Tilt Card',
  component: 'zen-tilt-card',
  tags: ['autodocs'],
  argTypes: {
    intensity: { control: { type: 'range', min: 5, max: 40, step: 1 } },
    glare: { control: 'boolean' },
    border: { control: 'boolean' },
    parallax: { control: 'boolean' },
    variant: { control: 'select', options: ['glass', 'solid', 'gradient', 'neon'] },
  },
  args: {
    intensity: 20,
    glare: true,
    border: true,
    parallax: true,
    variant: 'gradient',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="padding: 60px; display: flex; justify-content: center;">
      <zen-tilt-card 
        intensity="${args.intensity}" 
        ?glare="${args.glare}"
        ?border="${args.border}"
        ?parallax="${args.parallax}"
        variant="${args.variant}"
        style="width: 320px; height: 420px; cursor: pointer;"
      >
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
          <div data-depth="2" style="
            font-size: 4rem;
            margin-bottom: 16px;
          ">✨</div>
          <h2 data-depth="1" style="
            margin: 0 0 8px 0;
            font-size: 2rem;
            font-weight: 800;
            background: linear-gradient(135deg, #fff, #667eea);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          ">Premium Tilt</h2>
          <p data-depth="0.5" style="
            margin: 0;
            font-size: 0.95rem;
            opacity: 0.8;
            max-width: 240px;
          ">Move your mouse around for a stunning 3D parallax effect with animated glowing borders.</p>
        </div>
      </zen-tilt-card>
    </div>
  `,
  parameters: {
    a11y: { disable: true },
  },
};

export const Variants: Story = {
  render: () => html`
    <div style="padding: 40px; display: flex; gap: 32px; flex-wrap: wrap; justify-content: center;">
      <zen-tilt-card variant="glass" style="width: 200px; height: 280px; cursor: pointer;">
        <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; color: white; text-align: center; padding: 24px;">
          <div style="font-size: 2.5rem; margin-bottom: 16px;">💎</div>
          <h3 style="margin: 0 0 8px 0; font-weight: 700;">Glass</h3>
          <p style="margin: 0; font-size: 0.8rem; opacity: 0.7;">Frosted glass effect</p>
        </div>
      </zen-tilt-card>
      
      <zen-tilt-card variant="solid" style="width: 200px; height: 280px; cursor: pointer;">
        <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; color: white; text-align: center; padding: 24px;">
          <div style="font-size: 2.5rem; margin-bottom: 16px;">🎯</div>
          <h3 style="margin: 0 0 8px 0; font-weight: 700;">Solid</h3>
          <p style="margin: 0; font-size: 0.8rem; opacity: 0.7;">Clean solid surface</p>
        </div>
      </zen-tilt-card>
      
      <zen-tilt-card variant="gradient" style="width: 200px; height: 280px; cursor: pointer;">
        <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; color: white; text-align: center; padding: 24px;">
          <div style="font-size: 2.5rem; margin-bottom: 16px;">🌈</div>
          <h3 style="margin: 0 0 8px 0; font-weight: 700;">Gradient</h3>
          <p style="margin: 0; font-size: 0.8rem; opacity: 0.7;">Purple-pink vibes</p>
        </div>
      </zen-tilt-card>
      
      <zen-tilt-card variant="neon" style="width: 200px; height: 280px; cursor: pointer;">
        <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; color: white; text-align: center; padding: 24px;">
          <div style="font-size: 2.5rem; margin-bottom: 16px;">⚡</div>
          <h3 style="margin: 0 0 8px 0; font-weight: 700;">Neon</h3>
          <p style="margin: 0; font-size: 0.8rem; opacity: 0.7;">Cyberpunk glow</p>
        </div>
      </zen-tilt-card>
    </div>
  `,
  parameters: {
    a11y: { disable: true },
  },
};

export const ParallaxDemo: Story = {
  render: () => html`
    <div style="padding: 60px; display: flex; justify-content: center; min-height: 600px;">
      <zen-tilt-card 
        variant="neon" 
        intensity="25"
        style="width: 360px; height: 480px; cursor: pointer;"
      >
        <div style="
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: white;
          text-align: center;
          padding: 40px;
          position: relative;
        ">
          <div data-depth="3" style="
            font-size: 6rem;
            filter: drop-shadow(0 0 30px rgba(0,255,255,0.5));
          ">🚀</div>
          
          <h2 data-depth="2" style="
            margin: 24px 0 12px 0;
            font-size: 2.2rem;
            font-weight: 900;
            background: linear-gradient(135deg, #00ffff, #ff00ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          ">Parallax Layers</h2>
          
          <p data-depth="1" style="
            margin: 0 0 24px 0;
            font-size: 1rem;
            color: rgba(255,255,255,0.7);
            max-width: 280px;
          ">Each element moves at different speeds as you hover, creating depth.</p>
          
          <div data-depth="0.5" style="
            display: flex;
            gap: 16px;
          ">
            <span style="
              padding: 8px 16px;
              background: linear-gradient(135deg, rgba(0,255,255,0.2), rgba(255,0,255,0.2));
              border: 1px solid rgba(0,255,255,0.3);
              border-radius: 99px;
              font-size: 0.8rem;
            ">depth="0.5"</span>
            <span style="
              padding: 8px 16px;
              background: linear-gradient(135deg, rgba(0,255,255,0.2), rgba(255,0,255,0.2));
              border: 1px solid rgba(0,255,255,0.3);
              border-radius: 99px;
              font-size: 0.8rem;
            ">depth="3"</span>
          </div>
        </div>
      </zen-tilt-card>
    </div>
  `,
  parameters: {
    a11y: { disable: true },
  },
};

export const FeatureCards: Story = {
  render: () => html`
    <div style="padding: 40px; display: flex; gap: 24px; flex-wrap: wrap; justify-content: center;">
      <zen-tilt-card variant="gradient" intensity="15" style="width: 280px; height: 340px; cursor: pointer;">
        <div style="height: 100%; padding: 32px; display: flex; flex-direction: column; color: white;">
          <div data-depth="1.5" style="
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            margin-bottom: 24px;
          ">🎨</div>
          <h3 data-depth="1" style="margin: 0 0 12px 0; font-size: 1.3rem; font-weight: 700;">Beautiful Design</h3>
          <p data-depth="0.5" style="margin: 0; font-size: 0.9rem; opacity: 0.75; line-height: 1.6; flex: 1;">
            Stunning visual effects with smooth animations and attention to detail.
          </p>
          <div data-depth="0.3" style="margin-top: 20px; font-size: 0.85rem; color: var(--zen-primary);">
            Learn more →
          </div>
        </div>
      </zen-tilt-card>
      
      <zen-tilt-card variant="gradient" intensity="15" style="width: 280px; height: 340px; cursor: pointer;">
        <div style="height: 100%; padding: 32px; display: flex; flex-direction: column; color: white;">
          <div data-depth="1.5" style="
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #f093fb, #f5576c);
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            margin-bottom: 24px;
          ">⚡</div>
          <h3 data-depth="1" style="margin: 0 0 12px 0; font-size: 1.3rem; font-weight: 700;">Lightning Fast</h3>
          <p data-depth="0.5" style="margin: 0; font-size: 0.9rem; opacity: 0.75; line-height: 1.6; flex: 1;">
            Optimized performance with 60fps animations and minimal bundle size.
          </p>
          <div data-depth="0.3" style="margin-top: 20px; font-size: 0.85rem; color: var(--zen-primary);">
            Learn more →
          </div>
        </div>
      </zen-tilt-card>
      
      <zen-tilt-card variant="gradient" intensity="15" style="width: 280px; height: 340px; cursor: pointer;">
        <div style="height: 100%; padding: 32px; display: flex; flex-direction: column; color: white;">
          <div data-depth="1.5" style="
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #4facfe, #00f2fe);
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            margin-bottom: 24px;
          ">🔧</div>
          <h3 data-depth="1" style="margin: 0 0 12px 0; font-size: 1.3rem; font-weight: 700;">Customizable</h3>
          <p data-depth="0.5" style="margin: 0; font-size: 0.9rem; opacity: 0.75; line-height: 1.6; flex: 1;">
            Fully configurable with CSS variables and component properties.
          </p>
          <div data-depth="0.3" style="margin-top: 20px; font-size: 0.85rem; color: var(--zen-primary);">
            Learn more →
          </div>
        </div>
      </zen-tilt-card>
    </div>
  `,
  parameters: {
    a11y: { disable: true },
  },
};
