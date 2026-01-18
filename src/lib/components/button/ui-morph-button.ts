import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('zen-morph-button')
export class ZenMorphButton extends LitElement {
  @property({ type: String }) variant: 'liquid' | 'expand' | 'bounce' | 'glow' = 'liquid';
  @property({ type: Boolean }) disabled = false;



  static styles = css`
    :host {
      display: inline-block;
    }

    button {
      position: relative;
      padding: 16px 36px;
      font-size: 1rem;
      font-weight: 600;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      overflow: hidden;
      font-family: inherit;
      color: white;
      background: transparent;
      z-index: 1;
    }

    /* Liquid variant */
    :host([variant="liquid"]) button {
      background: var(--zen-primary);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    :host([variant="liquid"]) button::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, #764ba2 0%, #f093fb 100%);
      border-radius: inherit;
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: -1;
    }

    :host([variant="liquid"]) button:hover::before {
      transform: scaleX(1);
      transform-origin: left;
    }

    :host([variant="liquid"]) button:hover {
      border-radius: 24px;
      transform: scale(1.05);
      box-shadow: 0 10px 40px rgba(102, 126, 234, 0.4);
    }

    /* Expand variant */
    :host([variant="expand"]) button {
      background: var(--zen-primary);
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    :host([variant="expand"]) button::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition: width 0.6s, height 0.6s;
      z-index: -1;
    }

    :host([variant="expand"]) button:hover::before {
      width: 300px;
      height: 300px;
    }

    :host([variant="expand"]) button:hover {
      padding: 16px 48px;
      letter-spacing: 2px;
    }

    /* Bounce variant */
    :host([variant="bounce"]) button {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      transition: transform 0.1s;
    }

    :host([variant="bounce"]) button:hover {
      animation: bounce 0.5s ease;
    }

    :host([variant="bounce"]) button:active {
      transform: scale(0.95);
    }

    @keyframes bounce {
      0%, 100% { transform: scale(1); }
      25% { transform: scale(1.1) rotate(-2deg); }
      50% { transform: scale(1.05) rotate(2deg); }
      75% { transform: scale(1.08) rotate(-1deg); }
    }

    /* Glow variant */
    :host([variant="glow"]) button {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7);
      transition: all 0.3s;
    }

    :host([variant="glow"]) button:hover {
      box-shadow: 
        0 0 20px rgba(102, 126, 234, 0.6),
        0 0 40px rgba(102, 126, 234, 0.4),
        0 0 60px rgba(102, 126, 234, 0.2);
      transform: translateY(-3px);
    }

    :host([variant="glow"]) button::before {
      content: '';
      position: absolute;
      inset: -3px;
      background: linear-gradient(135deg, #667eea, #f093fb, #667eea);
      border-radius: inherit;
      z-index: -2;
      opacity: 0;
      transition: opacity 0.3s;
      filter: blur(10px);
    }

    :host([variant="glow"]) button:hover::before {
      opacity: 1;
      animation: glowPulse 1.5s ease-in-out infinite;
    }

    @keyframes glowPulse {
      0%, 100% { opacity: 0.7; }
      50% { opacity: 1; }
    }

    /* Content wrapper for z-index */
    .content {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    :host([disabled]) button {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }
  `;

  render() {
    return html`
      <button>
        <span class="content">
          <slot></slot>
        </span>
      </button>
    `;
  }
}
