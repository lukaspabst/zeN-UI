import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('zen-hover-card')
export class ZenHoverCard extends LitElement {
    @property({ type: Number }) intensity = 15; 
    @property({ type: Boolean }) glare = true;

    @state() private _rotateX = 0;
    @state() private _rotateY = 0;
    @state() private _glareX = 50;
    @state() private _glareY = 50;
    @state() private _opacity = 0;

    static styles = css`
    :host {
      display: inline-block;
      perspective: 1000px; /* Essential for 3D */
    }

    .card {
      position: relative;
      width: 100%;
      height: 100%;
      transition: transform 0.1s ease-out; /* Smooth follow, but fast */
      transform-style: preserve-3d;
      border-radius: var(--zen-radius-lg);
    }
    
    .content {
      /* The actual visual card */
      background: var(--zen-glass-bg);
      backdrop-filter: blur(12px);
      border: 1px solid var(--zen-glass-border);
      border-radius: inherit;
      overflow: hidden;
      box-shadow: var(--zen-shadow-md);
      height: 100%;
      transform: translateZ(0); /* Fix for some renders */
    }

    .glare {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      background: radial-gradient(
        circle at var(--x) var(--y),
        rgba(255, 255, 255, 0.4) 0%,
        rgba(255, 255, 255, 0) 60%
      );
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s;
      mix-blend-mode: overlay;
      z-index: 10;
    }
  `;

    _handleMouseMove(e: MouseEvent) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        
        const textX = (x / rect.width) * 100;
        const textY = (y / rect.height) * 100;

        
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((x - centerX) / centerX) * this.intensity;
        const rotateX = ((y - centerY) / centerY) * -this.intensity; 

        this._rotateX = rotateX;
        this._rotateY = rotateY;
        this._glareX = textX;
        this._glareY = textY;
        this._opacity = 1;
    }

    _handleMouseLeave() {
        this._rotateX = 0;
        this._rotateY = 0;
        this._opacity = 0;
    }

    render() {
        const style = `
      transform: rotateX(${this._rotateX}deg) rotateY(${this._rotateY}deg) scale(1.02);
    `;
        const glareStyle = `
      --x: ${this._glareX}%; 
      --y: ${this._glareY}%; 
      opacity: ${this.glare ? this._opacity : 0};
    `;

        return html`
      <div class="card" 
           style="${style}"
           @mousemove=${this._handleMouseMove}
           @mouseleave=${this._handleMouseLeave}
      >
        <div class="content">
          <slot></slot>
        </div>
        <div class="glare" style="${glareStyle}"></div>
      </div>
    `;
    }
}
