import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('zen-glitch-text')
export class ZenGlitchText extends LitElement {
    @property({ type: String }) text = 'GLITCH';
    @property({ type: Boolean }) active = true;
    @property({ type: String }) variant: 'cyberpunk' | 'neon' | 'matrix' | 'vhs' = 'cyberpunk';

    static styles = css`
    :host {
      display: inline-block;
    }

    .glitch-wrapper {
      position: relative;
      display: inline-block;
    }

    .glitch {
      position: relative;
      font-weight: 900;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    /* Cyberpunk variant */
    :host([variant="cyberpunk"]) .glitch {
      color: #fff;
      text-shadow: 
        0 0 10px rgba(0, 255, 255, 0.8),
        0 0 20px rgba(0, 255, 255, 0.6),
        0 0 40px rgba(0, 255, 255, 0.4);
    }

    :host([variant="cyberpunk"][active]) .glitch::before,
    :host([variant="cyberpunk"][active]) .glitch::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    :host([variant="cyberpunk"][active]) .glitch::before {
      color: #ff00ff;
      animation: glitch-1 0.3s infinite linear alternate-reverse;
      clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
    }

    :host([variant="cyberpunk"][active]) .glitch::after {
      color: #00ffff;
      animation: glitch-2 0.3s infinite linear alternate-reverse;
      clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
    }

    /* Neon variant */
    :host([variant="neon"]) .glitch {
      color: #fff;
      text-shadow: 
        0 0 5px #fff,
        0 0 10px #fff,
        0 0 20px #ff00de,
        0 0 40px #ff00de,
        0 0 80px #ff00de;
      animation: neonPulse 1.5s ease-in-out infinite alternate;
    }

    @keyframes neonPulse {
      from {
        text-shadow: 
          0 0 5px #fff,
          0 0 10px #fff,
          0 0 20px #ff00de,
          0 0 40px #ff00de,
          0 0 80px #ff00de;
      }
      to {
        text-shadow: 
          0 0 2px #fff,
          0 0 5px #fff,
          0 0 10px #ff00de,
          0 0 20px #ff00de,
          0 0 40px #ff00de;
      }
    }

    /* Matrix variant */
    :host([variant="matrix"]) .glitch {
      color: #00ff00;
      font-family: 'Courier New', monospace;
      text-shadow: 
        0 0 5px #00ff00,
        0 0 10px #00ff00,
        0 0 20px #00ff00;
    }

    :host([variant="matrix"][active]) .glitch {
      animation: matrixFlicker 0.1s infinite;
    }

    @keyframes matrixFlicker {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.8; }
    }

    :host([variant="matrix"][active]) .glitch::before {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      color: #00ff00;
      animation: matrixGlitch 2s infinite;
      opacity: 0.7;
    }

    @keyframes matrixGlitch {
      0%, 90%, 100% { 
        transform: none;
        opacity: 0;
      }
      92% { 
        transform: translate(-2px, 1px);
        opacity: 0.7;
      }
      94% { 
        transform: translate(2px, -1px);
        opacity: 0.7;
      }
      96% { 
        transform: translate(-1px, 2px);
        opacity: 0.7;
      }
    }

    /* VHS variant */
    :host([variant="vhs"]) .glitch {
      color: #fff;
    }

    :host([variant="vhs"][active]) .glitch {
      animation: vhsJitter 0.2s infinite;
    }

    :host([variant="vhs"][active]) .glitch::before,
    :host([variant="vhs"][active]) .glitch::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
    }

    :host([variant="vhs"][active]) .glitch::before {
      color: #ff0000;
      animation: vhsRed 0.15s infinite;
      mix-blend-mode: screen;
    }

    :host([variant="vhs"][active]) .glitch::after {
      color: #00ffff;
      animation: vhsCyan 0.15s infinite;
      mix-blend-mode: screen;
    }

    @keyframes vhsJitter {
      0%, 100% { transform: none; }
      25% { transform: translateX(1px); }
      50% { transform: translateX(-1px); }
      75% { transform: translateY(1px); }
    }

    @keyframes vhsRed {
      0%, 100% { transform: translateX(-2px); }
      50% { transform: translateX(-3px); }
    }

    @keyframes vhsCyan {
      0%, 100% { transform: translateX(2px); }
      50% { transform: translateX(3px); }
    }

    /* Standard glitch animations */
    @keyframes glitch-1 {
      0% { transform: translateX(-2px); }
      25% { transform: translateX(2px); }
      50% { transform: translateX(-1px); }
      75% { transform: translateX(1px); }
      100% { transform: translateX(-2px); }
    }

    @keyframes glitch-2 {
      0% { transform: translateX(2px); }
      25% { transform: translateX(-2px); }
      50% { transform: translateX(1px); }
      75% { transform: translateX(-1px); }
      100% { transform: translateX(2px); }
    }

    /* Scanlines overlay */
    .scanlines {
      position: absolute;
      inset: -10%;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 0, 0, 0.1) 2px,
        rgba(0, 0, 0, 0.1) 4px
      );
      pointer-events: none;
      opacity: 0.3;
    }
  `;

    render() {
        return html`
      <div class="glitch-wrapper">
        <span class="glitch" data-text="${this.text}">${this.text}</span>
        ${this.variant === 'vhs' ? html`<div class="scanlines"></div>` : ''}
      </div>
    `;
    }
}
