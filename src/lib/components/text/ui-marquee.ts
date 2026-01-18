import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('zen-marquee')
export class ZenMarquee extends LitElement {
    @property({ type: Number }) speed = 30; 
    @property({ type: String }) direction: 'left' | 'right' = 'left';
    @property({ type: Boolean }) pauseOnHover = true;
    @property({ type: Number }) gap = 40;

    static styles = css`
    :host {
      display: block;
      overflow: hidden;
      position: relative;
    }

    .marquee-container {
      display: flex;
      width: max-content;
      animation: scroll var(--speed) linear infinite;
    }

    :host([direction="right"]) .marquee-container {
      animation-direction: reverse;
    }

    :host([pauseOnHover]) .marquee-container:hover {
      animation-play-state: paused;
    }

    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    .content {
      display: flex;
      align-items: center;
      gap: var(--gap);
    }

    /* Fade edges */
    .fade-left, .fade-right {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100px;
      pointer-events: none;
      z-index: 1;
    }

    .fade-left {
      left: 0;
      background: linear-gradient(to right, var(--zen-bg-1, #0a0a0a), transparent);
    }

    .fade-right {
      right: 0;
      background: linear-gradient(to left, var(--zen-bg-1, #0a0a0a), transparent);
    }
  `;

    render() {
        return html`
      <div class="fade-left"></div>
      <div class="fade-right"></div>
      <div class="marquee-container" style="--speed: ${this.speed}s; --gap: ${this.gap}px;">
        <div class="content">
          <slot></slot>
        </div>
        <div class="content" aria-hidden="true">
          <slot></slot>
        </div>
      </div>
    `;
    }
}
