
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './ui-hover-card';

const meta: Meta = {
  title: 'Components/Data Display/Hover Card',
  component: 'zen-hover-card',
  tags: ['autodocs'],
  argTypes: {
    intensity: { control: { type: 'range', min: 5, max: 30, step: 1 } },
    glare: { control: 'boolean' },
  },
  args: {
    intensity: 20,
    glare: true,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  parameters: {
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
  render: (args) => html`
    <div style="padding: 40px; display: flex; justify-content: center;">
      <zen-hover-card intensity="${args.intensity}" ?glare="${args.glare}" style="width: 300px; height: 400px; cursor: pointer;">
        <div style="
          height: 100%; 
          position: relative;
          overflow: hidden;
        ">
          <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&amp;w=1000&amp;auto=format&amp;fit=crop" 
               alt="Abstract" 
               style="width: 100%; height: 100%; object-fit: cover;" />
          <div style="
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 24px;
            background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, transparent 100%);
            color: white;
          ">
            <h2 style="margin: 0 0 8px 0; font-size: 1.5rem; font-weight: 700;">3D Effects</h2>
            <p style="margin: 0; opacity: 0.9; font-size: 0.9rem;">Move your mouse to tilt the card.</p>
          </div>
        </div>
      </zen-hover-card>
    </div>
  `
};

export const ProfileCard: Story = {
  render: () => html`
    <div style="padding: 40px; display: flex; justify-content: center;">
      <zen-hover-card intensity="15" style="width: 280px; height: 360px; cursor: pointer;">
        <div style="
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-align: center;
          padding: 32px;
        ">
          <div style="
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: white;
            margin-bottom: 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            overflow: hidden;
          ">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&amp;w=200&amp;auto=format&amp;fit=crop" 
                 alt="Avatar" 
                 style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
          <h3 style="margin: 0 0 4px 0; font-size: 1.25rem; font-weight: 700;">John Doe</h3>
          <p style="margin: 0 0 16px 0; opacity: 0.8; font-size: 0.875rem;">Senior Developer</p>
          <div style="display: flex; gap: 24px; margin-top: 16px;">
            <div style="text-align: center;">
              <div style="font-size: 1.5rem; font-weight: 700;">128</div>
              <div style="font-size: 0.75rem; opacity: 0.7;">Projects</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 1.5rem; font-weight: 700;">2.4k</div>
              <div style="font-size: 0.75rem; opacity: 0.7;">Followers</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 1.5rem; font-weight: 700;">98%</div>
              <div style="font-size: 0.75rem; opacity: 0.7;">Rating</div>
            </div>
          </div>
        </div>
      </zen-hover-card>
    </div>
  `
};

export const NeonGlow: Story = {
  parameters: {
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
  render: () => html`
    <div style="padding: 40px; display: flex; justify-content: center; min-height: 500px;">
      <zen-hover-card intensity="25" style="width: 300px; height: 400px; cursor: pointer;">
        <div style="
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
          color: white;
          text-align: center;
          padding: 32px;
          border: 1px solid rgba(0,255,255,0.3);
          position: relative;
          overflow: hidden;
        ">
          <div style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 200px;
            height: 200px;
            background: radial-gradient(circle, rgba(0,255,255,0.15) 0%, transparent 70%);
            filter: blur(20px);
          "></div>
          <div style="
            font-size: 4rem;
            font-weight: 900;
            background: linear-gradient(135deg, #00ffff, #ff00ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 40px rgba(0,255,255,0.5);
            position: relative;
            z-index: 1;
          ">ZEN</div>
          <p style="
            margin-top: 16px;
            font-size: 0.875rem;
            color: rgba(255,255,255,0.6);
            letter-spacing: 4px;
            text-transform: uppercase;
            position: relative;
            z-index: 1;
          ">Premium Design</p>
        </div>
      </zen-hover-card>
    </div>
  `
};

export const ProductCard: Story = {
  render: () => html`
    <div style="padding: 40px; display: flex; justify-content: center;">
      <zen-hover-card intensity="12" style="width: 280px; height: 380px; cursor: pointer;">
        <div style="
          height: 100%;
          display: flex;
          flex-direction: column;
          background: var(--zen-bg-1, #1a1a1a);
        ">
          <div style="
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
            padding: 32px;
          ">
            <div style="font-size: 5rem;">🎧</div>
          </div>
          <div style="
            padding: 20px;
            color: var(--zen-text-1, white);
          ">
            <div style="display: flex; justify-content: space-between; align-items: start;">
              <div>
                <h3 style="margin: 0 0 4px 0; font-size: 1.1rem; font-weight: 600;">Premium Headphones</h3>
                <p style="margin: 0; font-size: 0.8rem; color: var(--zen-text-2, #888);">Wireless • Noise Cancel</p>
              </div>
              <div style="
                background: var(--zen-primary, #667eea);
                padding: 4px 10px;
                border-radius: 99px;
                font-size: 0.8rem;
                font-weight: 600;
              ">$299</div>
            </div>
            <div style="
              display: flex;
              gap: 4px;
              margin-top: 12px;
            ">
              <span style="color: #ffd700;">★★★★★</span>
              <span style="font-size: 0.8rem; color: var(--zen-text-2, #888);">(2,847)</span>
            </div>
          </div>
        </div>
      </zen-hover-card>
    </div>
  `
};

export const Gallery: Story = {
  render: () => html`
    <div style="padding: 40px; display: flex; gap: 24px; flex-wrap: wrap; justify-content: center;">
      <zen-hover-card intensity="18" style="width: 220px; height: 300px; cursor: pointer;">
        <div style="height: 100%; position: relative; overflow: hidden;">
          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&amp;w=400&amp;auto=format&amp;fit=crop" 
               style="width: 100%; height: 100%; object-fit: cover;" />
          <div style="
            position: absolute; bottom: 0; left: 0; right: 0;
            padding: 16px;
            background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
            color: white;
          ">
            <h4 style="margin: 0; font-size: 1rem;">Mountains</h4>
          </div>
        </div>
      </zen-hover-card>
      
      <zen-hover-card intensity="18" style="width: 220px; height: 300px; cursor: pointer;">
        <div style="height: 100%; position: relative; overflow: hidden;">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&amp;w=400&amp;auto=format&amp;fit=crop" 
               style="width: 100%; height: 100%; object-fit: cover;" />
          <div style="
            position: absolute; bottom: 0; left: 0; right: 0;
            padding: 16px;
            background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
            color: white;
          ">
            <h4 style="margin: 0; font-size: 1rem;">Beach</h4>
          </div>
        </div>
      </zen-hover-card>
      
      <zen-hover-card intensity="18" style="width: 220px; height: 300px; cursor: pointer;">
        <div style="height: 100%; position: relative; overflow: hidden;">
          <img src="https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?q=80&amp;w=400&amp;auto=format&amp;fit=crop" 
               style="width: 100%; height: 100%; object-fit: cover;" />
          <div style="
            position: absolute; bottom: 0; left: 0; right: 0;
            padding: 16px;
            background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
            color: white;
          ">
            <h4 style="margin: 0; font-size: 1rem;">Forest</h4>
          </div>
        </div>
      </zen-hover-card>
    </div>
  `
};
