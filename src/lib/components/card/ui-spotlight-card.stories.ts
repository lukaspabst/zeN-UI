import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './ui-spotlight-card';

const meta: Meta = {
  title: 'Components/Data Display/Spotlight Card',
  component: 'zen-spotlight-card',
  tags: ['autodocs'],
  argTypes: {
    spotlightSize: { control: { type: 'range', min: 100, max: 800, step: 50 } },
    spotlightColor: { control: 'color' },
    border: { control: 'boolean' },
  },
  args: {
    spotlightSize: 400,
    spotlightColor: 'rgba(120, 119, 198, 0.15)',
    border: true,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="padding: 60px; display: flex; justify-content: center;">
      <zen-spotlight-card 
        spotlightSize="${args.spotlightSize}"
        spotlightColor="${args.spotlightColor}"
        ?border="${args.border}"
        style="width: 400px;"
      >
        <div style="padding: 40px; color: var(--zen-text-1);">
          <h2 style="margin: 0 0 16px 0; font-size: 1.5rem; font-weight: 700;">Spotlight Effect</h2>
          <p style="margin: 0; color: var(--zen-text-2); line-height: 1.6;">
            Move your mouse around to see the spotlight follow your cursor. 
            The border also animates based on mouse position!
          </p>
        </div>
      </zen-spotlight-card>
    </div>
  `
};

export const FeatureGrid: Story = {
  render: () => html`
    <div style="padding: 40px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
      <zen-spotlight-card spotlightColor="rgba(102, 126, 234, 0.12)">
        <div style="padding: 32px; color: var(--zen-text-1);">
          <div style="
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            margin-bottom: 20px;
          ">🚀</div>
          <h3 style="margin: 0 0 12px 0; font-weight: 600;">Lightning Fast</h3>
          <p style="margin: 0; color: var(--zen-text-2); font-size: 0.9rem; line-height: 1.6;">
            Optimized for performance with minimal overhead and smooth 60fps animations.
          </p>
        </div>
      </zen-spotlight-card>
      
      <zen-spotlight-card spotlightColor="rgba(240, 147, 251, 0.12)">
        <div style="padding: 32px; color: var(--zen-text-1);">
          <div style="
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #f093fb, #f5576c);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            margin-bottom: 20px;
          ">🎨</div>
          <h3 style="margin: 0 0 12px 0; font-weight: 600;">Beautiful Design</h3>
          <p style="margin: 0; color: var(--zen-text-2); font-size: 0.9rem; line-height: 1.6;">
            Stunning visual effects with attention to every detail and smooth transitions.
          </p>
        </div>
      </zen-spotlight-card>
      
      <zen-spotlight-card spotlightColor="rgba(79, 172, 254, 0.12)">
        <div style="padding: 32px; color: var(--zen-text-1);">
          <div style="
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #4facfe, #00f2fe);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            margin-bottom: 20px;
          ">🔧</div>
          <h3 style="margin: 0 0 12px 0; font-weight: 600;">Fully Customizable</h3>
          <p style="margin: 0; color: var(--zen-text-2); font-size: 0.9rem; line-height: 1.6;">
            Configure every aspect with CSS variables and component properties.
          </p>
        </div>
      </zen-spotlight-card>
    </div>
  `
};

export const PricingCards: Story = {
  render: () => html`
    <div style="padding: 40px; display: flex; gap: 24px; flex-wrap: wrap; justify-content: center; align-items: stretch;">
      <zen-spotlight-card spotlightColor="rgba(120, 119, 198, 0.1)" style="width: 280px;">
        <div style="padding: 32px; color: var(--zen-text-1); text-align: center;">
          <p style="margin: 0 0 8px 0; color: var(--zen-text-2); text-transform: uppercase; font-size: 0.75rem; letter-spacing: 2px;">Starter</p>
          <h2 style="margin: 0 0 24px 0; font-size: 3rem; font-weight: 800;">$9</h2>
          <ul style="list-style: none; padding: 0; margin: 0 0 32px 0; text-align: left;">
            <li style="padding: 8px 0; color: var(--zen-text-2); font-size: 0.9rem;">✓ 5 Projects</li>
            <li style="padding: 8px 0; color: var(--zen-text-2); font-size: 0.9rem;">✓ 10GB Storage</li>
            <li style="padding: 8px 0; color: var(--zen-text-2); font-size: 0.9rem;">✓ Email Support</li>
          </ul>
          <button style="
            width: 100%;
            padding: 12px;
            background: transparent;
            border: 1px solid var(--zen-glass-border);
            border-radius: var(--zen-radius-md);
            color: var(--zen-text-1);
            font-weight: 600;
            cursor: pointer;
          ">Get Started</button>
        </div>
      </zen-spotlight-card>
      
      <zen-spotlight-card spotlightColor="rgba(102, 126, 234, 0.15)" style="width: 280px;">
        <div style="padding: 32px; color: var(--zen-text-1); text-align: center;">
          <p style="margin: 0 0 8px 0; color: var(--zen-primary); text-transform: uppercase; font-size: 0.75rem; letter-spacing: 2px;">Pro ⭐</p>
          <h2 style="margin: 0 0 24px 0; font-size: 3rem; font-weight: 800;">$29</h2>
          <ul style="list-style: none; padding: 0; margin: 0 0 32px 0; text-align: left;">
            <li style="padding: 8px 0; color: var(--zen-text-2); font-size: 0.9rem;">✓ Unlimited Projects</li>
            <li style="padding: 8px 0; color: var(--zen-text-2); font-size: 0.9rem;">✓ 100GB Storage</li>
            <li style="padding: 8px 0; color: var(--zen-text-2); font-size: 0.9rem;">✓ Priority Support</li>
            <li style="padding: 8px 0; color: var(--zen-text-2); font-size: 0.9rem;">✓ Analytics</li>
          </ul>
          <button style="
            width: 100%;
            padding: 12px;
            background: var(--zen-primary);
            border: none;
            border-radius: var(--zen-radius-md);
            color: white;
            font-weight: 600;
            cursor: pointer;
          ">Get Pro</button>
        </div>
      </zen-spotlight-card>
    </div>
  `
};
