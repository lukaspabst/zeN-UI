import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('zen-magnetic-button')
export class ZenMagneticButton extends LitElement {
  @property({ type: Number }) strength = 0.4;
  @property({ type: String }) variant: 'primary' | 'gradient' | 'outline' | 'glow' = 'primary';
  @property({ type: Boolean }) disabled = false;

  @state() private _translateX = 0;
  @state() private _translateY = 0;

  static styles = css`
    :host {
      display: inline-block;
    }

    .magnetic-wrapper {
      display: inline-block;
      transition: transform 0.15s ease-out;
    }

    button {
      position: relative;
      padding: 14px 32px;
      font-size: 1rem;
      font-weight: 600;
      border: none;
      border-radius: var(--zen-radius-lg);
      cursor: pointer;
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      font-family: inherit;
    }

    /* Primary */
    :host([variant="primary"]) button {
      background: var(--zen-primary);
      color: white;
      box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
    }

    :host([variant="primary"]) button:hover {
      box-shadow: 0 6px 30px rgba(102, 126, 234, 0.6);
      transform: scale(1.02);
    }

    /* Gradient */
    :host([variant="gradient"]) button {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
      background-size: 200% 200%;
      color: white;
      animation: gradientShift 3s ease infinite;
      box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
    }

    :host([variant="gradient"]) button:hover {
      box-shadow: 
        0 6px 30px rgba(102, 126, 234, 0.5),
        0 0 40px rgba(240, 147, 251, 0.3);
      transform: scale(1.02);
    }

    @keyframes gradientShift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }

    /* Outline */
    :host([variant="outline"]) button {
      background: transparent;
      color: var(--zen-primary);
      border: 2px solid var(--zen-primary);
      box-shadow: inset 0 0 0 0 var(--zen-primary);
    }

    :host([variant="outline"]) button:hover {
      color: white;
      box-shadow: inset 0 0 0 50px var(--zen-primary);
    }

    /* Glow */
    :host([variant="glow"]) button {
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
      color: #00ffff;
      border: 1px solid rgba(0, 255, 255, 0.5);
      box-shadow: 
        0 0 20px rgba(0, 255, 255, 0.2),
        inset 0 0 20px rgba(0, 255, 255, 0.05);
    }

    :host([variant="glow"]) button:hover {
      border-color: #00ffff;
      box-shadow: 
        0 0 30px rgba(0, 255, 255, 0.4),
        0 0 60px rgba(0, 255, 255, 0.2),
        inset 0 0 30px rgba(0, 255, 255, 0.1);
      text-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
    }

    /* Ripple effect */
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.4);
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    }

    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }

    /* Shine effect */
    button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      );
      transition: left 0.5s;
    }

    button:hover::before {
      left: 100%;
    }

    :host([disabled]) button {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }
  `;

  private _handleMouseMove(e: MouseEvent) {
    if (this.disabled) return;

    const rect = this.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * this.strength;
    const deltaY = (e.clientY - centerY) * this.strength;

    this._translateX = deltaX;
    this._translateY = deltaY;
  }

  private _handleMouseLeave() {
    this._translateX = 0;
    this._translateY = 0;
  }

  private _handleClick(e: MouseEvent) {
    if (this.disabled) return;

    const button = this.shadowRoot?.querySelector('button');
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';

    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    button.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  }

  render() {
    return html`
      <div 
        class="magnetic-wrapper"
        style="transform: translate(${this._translateX}px, ${this._translateY}px)"
        @mousemove=${this._handleMouseMove}
        @mouseleave=${this._handleMouseLeave}
      >
        <button @click=${this._handleClick}>
          <slot></slot>
        </button>
      </div>
    `;
  }
}
