import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './ui-flip-card';

const meta: Meta = {
    title: 'Components/Experimental/FlipCard',
    component: 'zen-flip-card',
    tags: ['autodocs'],
    argTypes: {
        trigger: { control: 'select', options: ['hover', 'click'] },
        direction: { control: 'select', options: ['horizontal', 'vertical'] },
        duration: { control: { type: 'range', min: 0.3, max: 1.5, step: 0.1 } },
    },
    args: {
        trigger: 'hover',
        direction: 'horizontal',
        duration: 0.6,
    },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: (args) => html`
    <div style="padding: 40px; display: flex; justify-content: center;">
      <zen-flip-card 
        trigger="${args.trigger}"
        direction="${args.direction}"
        duration="${args.duration}"
        style="width: 300px; height: 400px;"
      >
        <div slot="front" style="
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-align: center;
          padding: 40px;
        ">
          <div style="font-size: 4rem; margin-bottom: 16px;">🎴</div>
          <h2 style="margin: 0 0 8px 0; font-size: 1.5rem;">Hover Me!</h2>
          <p style="margin: 0; opacity: 0.8;">See what's on the back</p>
        </div>
        
        <div slot="back" style="
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
          text-align: center;
          padding: 40px;
        ">
          <div style="font-size: 4rem; margin-bottom: 16px;">✨</div>
          <h2 style="margin: 0 0 8px 0; font-size: 1.5rem;">Surprise!</h2>
          <p style="margin: 0; opacity: 0.8;">You found the back side</p>
        </div>
      </zen-flip-card>
    </div>
  `
};

export const ProfileCard: Story = {
    render: () => html`
    <div style="padding: 40px; display: flex; justify-content: center;">
      <zen-flip-card direction="horizontal" style="width: 280px; height: 360px;">
        <div slot="front" style="height: 100%; background: var(--zen-bg-1);">
          <div style="
            height: 120px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          "></div>
          <div style="
            padding: 20px;
            text-align: center;
            margin-top: -50px;
          ">
            <div style="
              width: 80px;
              height: 80px;
              border-radius: 50%;
              background: #667eea;
              margin: 0 auto 16px;
              border: 4px solid var(--zen-bg-1);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 2rem;
            ">👨‍💻</div>
            <h3 style="margin: 0 0 4px 0; color: var(--zen-text-1);">John Doe</h3>
            <p style="margin: 0 0 16px 0; color: var(--zen-text-2); font-size: 0.875rem;">Senior Developer</p>
            <p style="margin: 0; color: var(--zen-text-2); font-size: 0.8rem;">Hover to see more...</p>
          </div>
        </div>
        
        <div slot="back" style="
          height: 100%;
          background: var(--zen-bg-1);
          padding: 32px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          color: var(--zen-text-1);
        ">
          <h4 style="margin: 0 0 16px 0; color: var(--zen-primary);">About Me</h4>
          <p style="margin: 0 0 20px 0; color: var(--zen-text-2); font-size: 0.9rem; line-height: 1.6;">
            10+ years of experience in full-stack development. Passionate about clean code and user experience.
          </p>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <span style="padding: 6px 12px; background: var(--zen-glass-bg); border-radius: 99px; font-size: 0.75rem;">React</span>
            <span style="padding: 6px 12px; background: var(--zen-glass-bg); border-radius: 99px; font-size: 0.75rem;">TypeScript</span>
            <span style="padding: 6px 12px; background: var(--zen-glass-bg); border-radius: 99px; font-size: 0.75rem;">Node.js</span>
          </div>
        </div>
      </zen-flip-card>
    </div>
  `
};

export const PricingToggle: Story = {
    render: () => html`
    <div style="padding: 40px; display: flex; gap: 24px; flex-wrap: wrap; justify-content: center;">
      <zen-flip-card trigger="click" direction="vertical" style="width: 260px; height: 340px;">
        <div slot="front" style="
          height: 100%;
          background: var(--zen-bg-1);
          padding: 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: var(--zen-text-1);
        ">
          <p style="margin: 0 0 8px 0; color: var(--zen-text-2); text-transform: uppercase; font-size: 0.75rem; letter-spacing: 2px;">Monthly</p>
          <h2 style="margin: 0; font-size: 4rem; font-weight: 800;">$29</h2>
          <p style="margin: 8px 0 24px 0; color: var(--zen-text-2);">per month</p>
          <p style="margin: 0; color: var(--zen-primary); font-size: 0.875rem;">Click to see yearly price →</p>
        </div>
        
        <div slot="back" style="
          height: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
        ">
          <p style="margin: 0 0 8px 0; opacity: 0.8; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 2px;">Yearly</p>
          <h2 style="margin: 0; font-size: 4rem; font-weight: 800;">$19</h2>
          <p style="margin: 8px 0 16px 0; opacity: 0.8;">per month</p>
          <span style="padding: 6px 16px; background: rgba(255,255,255,0.2); border-radius: 99px; font-size: 0.8rem;">Save 35%!</span>
        </div>
      </zen-flip-card>
    </div>
  `
};

export const Gallery: Story = {
    render: () => html`
    <div style="padding: 40px; display: flex; gap: 20px; flex-wrap: wrap; justify-content: center;">
      ${['🌅', '🏔️', '🌊'].map((emoji, i) => html`
        <zen-flip-card style="width: 200px; height: 280px;">
          <div slot="front" style="
            height: 100%;
            background: linear-gradient(135deg, ${['#ff6b6b', '#4facfe', '#00b894'][i]} 0%, ${['#feca57', '#00f2fe', '#55efc4'][i]} 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 5rem;
          ">${emoji}</div>
          
          <div slot="back" style="
            height: 100%;
            background: var(--zen-bg-1);
            padding: 24px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            color: var(--zen-text-1);
            text-align: center;
          ">
            <h3 style="margin: 0 0 8px 0;">${['Sunset', 'Mountains', 'Ocean'][i]}</h3>
            <p style="margin: 0; color: var(--zen-text-2); font-size: 0.875rem;">Beautiful nature photo collection</p>
          </div>
        </zen-flip-card>
      `)}
    </div>
  `
};
