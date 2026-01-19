import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './ui-particles';

const meta: Meta = {
  title: 'Components/Special Effects & Backgrounds/Particles',
  component: 'zen-particles',
  tags: ['autodocs'],
  argTypes: {
    count: { control: { type: 'range', min: 10, max: 150, step: 10 } },
    color: { control: 'color' },
    minSize: { control: { type: 'range', min: 1, max: 5, step: 0.5 } },
    maxSize: { control: { type: 'range', min: 3, max: 15, step: 0.5 } },
    speed: { control: { type: 'range', min: 0.1, max: 3, step: 0.1 } },
    connected: { control: 'boolean' },
    connectionDistance: { control: { type: 'range', min: 50, max: 300, step: 10 } },
  },
  args: {
    count: 50,
    color: '#667eea',
    minSize: 2,
    maxSize: 6,
    speed: 1,
    connected: true,
    connectionDistance: 150,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <zen-particles 
      count="${args.count}"
      color="${args.color}"
      minSize="${args.minSize}"
      maxSize="${args.maxSize}"
      speed="${args.speed}"
      ?connected="${args.connected}"
      connectionDistance="${args.connectionDistance}"
      style="height: 500px; background: #0a0a0a; border-radius: 16px;"
    >
      <div style="
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        text-align: center;
      ">
        <h1 style="margin: 0 0 16px 0; font-size: 3rem; font-weight: 800;">Particle System</h1>
        <p style="margin: 0; opacity: 0.7; font-size: 1.1rem;">Interactive particle background with connection lines</p>
      </div>
    </zen-particles>
  `
};

export const NetworkVisualization: Story = {
  render: () => html`
    <zen-particles 
      count="80"
      color="#00ffff"
      minSize="1"
      maxSize="4"
      speed="0.5"
      connected
      connectionDistance="180"
      style="height: 600px; background: linear-gradient(135deg, #0a0a0a 0%, #0a1628 100%); border-radius: 16px;"
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
        <h1 style="
          margin: 0 0 16px 0; 
          font-size: 4rem; 
          font-weight: 900;
          background: linear-gradient(135deg, #00ffff, #ff00ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        ">Neural Network</h1>
        <p style="margin: 0 0 32px 0; color: rgba(255,255,255,0.7); font-size: 1.2rem; max-width: 500px;">
          Visualizing the future of artificial intelligence
        </p>
        <button style="
          padding: 14px 32px;
          background: linear-gradient(135deg, #00ffff, #0088ff);
          border: none;
          border-radius: 99px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          font-size: 1rem;
        ">Explore More</button>
      </div>
    </zen-particles>
  `
};

export const FloatingParticles: Story = {
  render: () => html`
    <zen-particles 
      count="40"
      color="#ffffff"
      minSize="2"
      maxSize="8"
      speed="0.3"
      .connected=${false}
      style="height: 500px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px;"
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
        <p style="margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 3px; font-size: 0.875rem; opacity: 0.8;">
          Welcome to
        </p>
        <h1 style="margin: 0 0 24px 0; font-size: 5rem; font-weight: 900;">ZEN UI</h1>
        <p style="margin: 0; opacity: 0.9; font-size: 1.3rem;">Beautiful components for modern apps</p>
      </div>
    </zen-particles>
  `
};

export const MatrixStyle: Story = {
  render: () => html`
    <zen-particles 
      count="100"
      color="#00ff00"
      minSize="1"
      maxSize="3"
      speed="2"
      connected
      connectionDistance="100"
      style="height: 500px; background: #000; border-radius: 16px;"
    >
      <div style="
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #00ff00;
        text-align: center;
        font-family: 'Courier New', monospace;
      ">
        <h1 style="margin: 0 0 16px 0; font-size: 3rem; text-shadow: 0 0 20px #00ff00;">SYSTEM ONLINE</h1>
        <p style="margin: 0; opacity: 0.7;">> Access granted...</p>
      </div>
    </zen-particles>
  `
};
