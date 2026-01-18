import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('zen-spotlight-card')
export class ZenSpotlightCard extends LitElement {
    @property({ type: Number }) spotlightSize = 400;
    @property({ type: String }) spotlightColor = 'rgba(120, 119, 198, 0.15)';
    @property({ type: Boolean }) border = true;

    @state() private _mouseX = 0;
    @state() private _mouseY = 0;
    @state() private _isHovered = false;

    static styles = css`
    :host {
      display: block;
    }

    .card {
      position: relative;
      background: var(--zen-glass-bg);
      border-radius: var(--zen-radius-lg);
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .card.hovered {
      background: rgba(255, 255, 255, 0.05);
    }

    /* Animated gradient border */
    .border-gradient {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      padding: 1px;
      background: linear-gradient(
        var(--angle, 0deg),
        transparent 40%,
        rgba(120, 119, 198, 0.8) 50%,
        transparent 60%
      );
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      opacity: 0;
      transition: opacity 0.5s;
      pointer-events: none;
    }

    .card.hovered .border-gradient {
      opacity: 1;
    }

    /* Static border */
    .static-border {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      border: 1px solid var(--zen-glass-border);
      pointer-events: none;
      transition: border-color 0.3s;
    }

    .card.hovered .static-border {
      border-color: transparent;
    }

    /* Spotlight effect */
    .spotlight {
      position: absolute;
      inset: 0;
      opacity: 0;
      transition: opacity 0.5s;
      pointer-events: none;
      border-radius: inherit;
    }

    .card.hovered .spotlight {
      opacity: 1;
    }

    .content {
      position: relative;
      z-index: 1;
    }
  `;

    private _handleMouseMove(e: MouseEvent) {
        const rect = this.getBoundingClientRect();
        this._mouseX = e.clientX - rect.left;
        this._mouseY = e.clientY - rect.top;

        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const angle = Math.atan2(this._mouseY - centerY, this._mouseX - centerX) * (180 / Math.PI) + 90;

        const borderGradient = this.shadowRoot?.querySelector('.border-gradient') as HTMLElement;
        if (borderGradient) {
            borderGradient.style.setProperty('--angle', `${angle}deg`);
        }
    }

    private _handleMouseEnter() {
        this._isHovered = true;
    }

    private _handleMouseLeave() {
        this._isHovered = false;
    }

    render() {
        const spotlightStyle = `
      background: radial-gradient(
        ${this.spotlightSize}px circle at ${this._mouseX}px ${this._mouseY}px,
        ${this.spotlightColor},
        transparent 40%
      );
    `;

        return html`
      <div 
        class="card ${this._isHovered ? 'hovered' : ''}"
        @mousemove=${this._handleMouseMove}
        @mouseenter=${this._handleMouseEnter}
        @mouseleave=${this._handleMouseLeave}
      >
        ${this.border ? html`<div class="border-gradient"></div>` : ''}
        <div class="static-border"></div>
        <div class="spotlight" style="${spotlightStyle}"></div>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;
    }
}
