import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('zen-skeleton')
export class ZenSkeleton extends LitElement {
    @property({ type: String }) width = '100%';
    @property({ type: String }) height = '1em';
    @property({ type: String }) variant = 'text'; 

    static styles = css`
    :host {
      display: block;
      vertical-align: middle;
    }

    .skeleton {
      background: var(--zen-glass-border);
      border-radius: var(--zen-radius-sm);
      overflow: hidden;
      position: relative;
    }
    
    .skeleton::after {
      content: '';
      position: absolute;
      inset: 0;
      transform: translateX(-100%);
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.05),
        transparent
      );
      animation: shimmer 1.5s infinite;
    }

    /* Variants */
    .variant-circular { border-radius: 50%; }
    .variant-text { border-radius: 4px; margin-bottom: 0.5em; }

    @keyframes shimmer {
      100% { transform: translateX(100%); }
    }
  `;

    render() {
        return html`
      <div 
        class="skeleton variant-${this.variant}"
        style="width: ${this.width}; height: ${this.height};"
      ></div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'zen-skeleton': ZenSkeleton;
    }
}
