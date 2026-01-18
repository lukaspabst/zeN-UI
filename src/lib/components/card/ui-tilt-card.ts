import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('zen-tilt-card')
export class ZenTiltCard extends LitElement {
    @property({ type: Number }) intensity = 20;
    @property({ type: Boolean }) glare = true;
    @property({ type: Boolean }) border = true;
    @property({ type: Boolean }) parallax = true;
    @property({ type: String }) variant: 'glass' | 'solid' | 'gradient' | 'neon' = 'glass';

    @state() private _rotateX = 0;
    @state() private _rotateY = 0;
    @state() private _glareX = 50;
    @state() private _glareY = 50;
    @state() private _isHovered = false;
    @state() private _mouseX = 0.5;
    @state() private _mouseY = 0.5;

    static styles = css`
    :host {
      display: inline-block;
      perspective: 1000px;
    }

    .card {
      position: relative;
      width: 100%;
      height: 100%;
      transition: transform 0.15s ease-out;
      transform-style: preserve-3d;
      border-radius: var(--zen-radius-lg);
    }

    .card.hovered {
      transition: transform 0.05s ease-out;
    }

    .content {
      position: relative;
      border-radius: inherit;
      overflow: hidden;
      height: 100%;
      transform: translateZ(0);
    }

    /* Variants */
    :host([variant="glass"]) .content {
      background: var(--zen-glass-bg);
      backdrop-filter: blur(12px);
      border: 1px solid var(--zen-glass-border);
      box-shadow: var(--zen-shadow-lg);
    }

    :host([variant="solid"]) .content {
      background: var(--zen-bg-2);
      border: 1px solid var(--zen-glass-border);
      box-shadow: var(--zen-shadow-lg);
    }

    :host([variant="gradient"]) .content {
      background: linear-gradient(135deg, 
        rgba(102, 126, 234, 0.2) 0%, 
        rgba(118, 75, 162, 0.2) 50%,
        rgba(240, 147, 251, 0.1) 100%
      );
      backdrop-filter: blur(12px);
      border: 1px solid rgba(102, 126, 234, 0.3);
      box-shadow: 
        0 8px 32px rgba(102, 126, 234, 0.2),
        0 0 60px rgba(102, 126, 234, 0.1);
    }

    :host([variant="neon"]) .content {
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
      border: 1px solid rgba(0, 255, 255, 0.3);
      box-shadow: 
        0 0 20px rgba(0, 255, 255, 0.2),
        inset 0 0 60px rgba(0, 255, 255, 0.05);
    }

    /* Animated border */
    .border-glow {
      position: absolute;
      inset: -2px;
      border-radius: inherit;
      padding: 2px;
      background: linear-gradient(
        var(--border-angle, 0deg),
        #667eea,
        #764ba2,
        #f093fb,
        #4facfe,
        #667eea
      );
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      opacity: 0;
      transition: opacity 0.3s;
      animation: borderRotate 4s linear infinite;
    }

    .card.hovered .border-glow {
      opacity: 1;
    }

    @keyframes borderRotate {
      to { --border-angle: 360deg; }
    }

    @property --border-angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }

    /* Glare effect */
    .glare {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: radial-gradient(
        circle at var(--x) var(--y),
        rgba(255, 255, 255, 0.3) 0%,
        rgba(255, 255, 255, 0) 50%
      );
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s;
      mix-blend-mode: overlay;
      z-index: 10;
    }

    .card.hovered .glare {
      opacity: 1;
    }

    /* Shine effect */
    .shine {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      overflow: hidden;
      pointer-events: none;
      z-index: 5;
    }

    .shine::before {
      content: '';
      position: absolute;
      width: 200%;
      height: 200%;
      top: -50%;
      left: -50%;
      background: linear-gradient(
        to right,
        transparent 0%,
        rgba(255, 255, 255, 0.1) 45%,
        rgba(255, 255, 255, 0.15) 50%,
        rgba(255, 255, 255, 0.1) 55%,
        transparent 100%
      );
      transform: rotate(25deg) translateX(var(--shine-x, -100%));
      transition: transform 0.6s;
    }

    .card.hovered .shine::before {
      transform: rotate(25deg) translateX(100%);
    }

    /* Parallax layers */
    ::slotted([data-depth]) {
      transition: transform 0.15s ease-out;
    }
  `;

    _handleMouseMove(e: MouseEvent) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        
        this._mouseX = x / rect.width;
        this._mouseY = y / rect.height;

        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        this._rotateY = ((x - centerX) / centerX) * this.intensity;
        this._rotateX = ((y - centerY) / centerY) * -this.intensity;

        this._glareX = this._mouseX * 100;
        this._glareY = this._mouseY * 100;

        
        if (this.parallax) {
            this._applyParallax();
        }
    }

    _applyParallax() {
        const slot = this.shadowRoot?.querySelector('slot');
        const elements = slot?.assignedElements() || [];

        elements.forEach(el => {
            const depth = parseFloat(el.getAttribute('data-depth') || '0');
            if (depth) {
                const moveX = (this._mouseX - 0.5) * depth * 30;
                const moveY = (this._mouseY - 0.5) * depth * 30;
                (el as HTMLElement).style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
            }
        });
    }

    _resetParallax() {
        const slot = this.shadowRoot?.querySelector('slot');
        const elements = slot?.assignedElements() || [];

        elements.forEach(el => {
            (el as HTMLElement).style.transform = '';
        });
    }

    _handleMouseEnter() {
        this._isHovered = true;
    }

    _handleMouseLeave() {
        this._isHovered = false;
        this._rotateX = 0;
        this._rotateY = 0;
        this._resetParallax();
    }

    render() {
        const transform = this._isHovered
            ? `rotateX(${this._rotateX}deg) rotateY(${this._rotateY}deg) scale(1.02)`
            : 'rotateX(0) rotateY(0) scale(1)';

        return html`
      <div 
        class="card ${this._isHovered ? 'hovered' : ''}" 
        style="transform: ${transform}"
        @mousemove=${this._handleMouseMove}
        @mouseenter=${this._handleMouseEnter}
        @mouseleave=${this._handleMouseLeave}
      >
        ${this.border ? html`<div class="border-glow"></div>` : ''}
        <div class="content">
          <slot></slot>
        </div>
        <div class="shine"></div>
        ${this.glare ? html`
          <div class="glare" style="--x: ${this._glareX}%; --y: ${this._glareY}%;"></div>
        ` : ''}
      </div>
    `;
    }
}
