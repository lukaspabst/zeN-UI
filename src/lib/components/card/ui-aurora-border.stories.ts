import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './ui-aurora-border';

const meta: Meta = {
  title: 'Components/Data Display/Aurora Border',
  component: 'zen-aurora-border',
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['rainbow', 'neon', 'fire', 'ocean'] },
    borderWidth: { control: { type: 'range', min: 1, max: 6, step: 1 } },
    blur: { control: { type: 'range', min: 0, max: 30, step: 2 } },
  },
  args: {
    variant: 'rainbow',
    borderWidth: 2,
    blur: 10,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="padding: 40px; display: flex; justify-content: center;">
      <zen-aurora-border 
        variant="${args.variant}"
        borderWidth="${args.borderWidth}"
        blur="${args.blur}"
        style="width: 350px;"
      >
        <div style="padding: 40px; color: white; text-align: center;">
          <h2 style="margin: 0 0 12px 0; font-size: 1.5rem; font-weight: 700;">Aurora Border</h2>
          <p style="margin: 0; color: #888; line-height: 1.6;">
            A beautiful animated gradient border that flows around the card.
          </p>
        </div>
      </zen-aurora-border>
    </div>
  `
};

export const AllVariants: Story = {
  render: () => html`
    <div style="padding: 40px; display: flex; gap: 24px; flex-wrap: wrap; justify-content: center;">
      <zen-aurora-border variant="rainbow" style="width: 200px;">
        <div style="padding: 32px; color: white; text-align: center;">
          <div style="font-size: 2rem; margin-bottom: 12px;">🌈</div>
          <h3 style="margin: 0; font-weight: 600;">Rainbow</h3>
        </div>
      </zen-aurora-border>
      
      <zen-aurora-border variant="neon" style="width: 200px;">
        <div style="padding: 32px; color: white; text-align: center;">
          <div style="font-size: 2rem; margin-bottom: 12px;">⚡</div>
          <h3 style="margin: 0; font-weight: 600;">Neon</h3>
        </div>
      </zen-aurora-border>
      
      <zen-aurora-border variant="fire" style="width: 200px;">
        <div style="padding: 32px; color: white; text-align: center;">
          <div style="font-size: 2rem; margin-bottom: 12px;">🔥</div>
          <h3 style="margin: 0; font-weight: 600;">Fire</h3>
        </div>
      </zen-aurora-border>
      
      <zen-aurora-border variant="ocean" style="width: 200px;">
        <div style="padding: 32px; color: white; text-align: center;">
          <div style="font-size: 2rem; margin-bottom: 12px;">🌊</div>
          <h3 style="margin: 0; font-weight: 600;">Ocean</h3>
        </div>
      </zen-aurora-border>
    </div>
  `
};

export const SubscriptionCard: Story = {
  render: () => html`
    <div style="padding: 60px; display: flex; justify-content: center;">
      <zen-aurora-border variant="neon" borderWidth="2" blur="15" style="width: 320px;">
        <div style="padding: 40px; color: white; text-align: center;">
          <p style="margin: 0 0 8px 0; color: #00ffff; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 2px;">Premium</p>
          <h2 style="margin: 0 0 8px 0; font-size: 3.5rem; font-weight: 800;">$29</h2>
          <p style="margin: 0 0 32px 0; color: #666;">per month</p>
          
          <ul style="list-style: none; padding: 0; margin: 0 0 32px 0; text-align: left;">
            <li style="padding: 10px 0; color: #aaa; border-bottom: 1px solid #222;">✓ Unlimited projects</li>
            <li style="padding: 10px 0; color: #aaa; border-bottom: 1px solid #222;">✓ Priority support</li>
            <li style="padding: 10px 0; color: #aaa; border-bottom: 1px solid #222;">✓ Advanced analytics</li>
            <li style="padding: 10px 0; color: #aaa;">✓ Custom integrations</li>
          </ul>
          
          <button style="
            width: 100%;
            padding: 14px;
            background: linear-gradient(135deg, #00ffff, #ff00ff);
            border: none;
            border-radius: 99px;
            color: white;
            font-weight: 700;
            font-size: 1rem;
            cursor: pointer;
          ">Get Started</button>
        </div>
      </zen-aurora-border>
    </div>
  `
};

export const GamingCard: Story = {
  render: () => html`
    <div style="padding: 60px; display: flex; justify-content: center;">
      <zen-aurora-border variant="fire" borderWidth="3" blur="20" style="width: 300px;">
        <div style="padding: 32px; color: white; text-align: center;">
          <div style="font-size: 4rem; margin-bottom: 16px;">🎮</div>
          <h2 style="margin: 0 0 8px 0; font-size: 1.5rem; font-weight: 800; text-transform: uppercase;">Pro Gamer</h2>
          <p style="margin: 0 0 24px 0; color: #ff6600; font-weight: 600;">LEGENDARY RANK</p>
          <div style="display: flex; justify-content: center; gap: 24px;">
            <div>
              <div style="font-size: 1.5rem; font-weight: 700;">2,847</div>
              <div style="font-size: 0.75rem; color: #666;">Wins</div>
            </div>
            <div>
              <div style="font-size: 1.5rem; font-weight: 700;">98.2%</div>
              <div style="font-size: 0.75rem; color: #666;">Win Rate</div>
            </div>
          </div>
        </div>
      </zen-aurora-border>
    </div>
  `
};
