import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('zen-card')
export class ZenCard extends LitElement {
  @property({ type: Boolean }) hover = false;
  @property({ type: Boolean }) clickable = false;

  static styles = css`
    :host {
      display: block;
    }

    .card {
      background: var(--zen-glass-bg);
      backdrop-filter: blur(var(--zen-glass-blur));
      border: 1px solid var(--zen-glass-border);
      border-radius: var(--zen-radius-lg);
      padding: 0;
      color: var(--zen-text-1);
      transition: all 0.3s var(--zen-ease-spring);
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .card.hover:hover, .card.clickable:hover {
      transform: translateY(-6px);
      background: var(--zen-glass-bg-hover);
      border-color: var(--zen-glass-border-hover);
      box-shadow: var(--zen-shadow-lg), 0 0 20px rgba(0,0,0,0.1);
    }
    
    .card.clickable {
      cursor: pointer;
    }

    .media {
      width: 100%;
      height: 200px;
      overflow: hidden;
      background: var(--zen-bg-2);
    }
    
    .media ::slotted(img) {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .card:hover .media ::slotted(img) {
      transform: scale(1.05);
    }

    .content {
      padding: 24px;
      flex: 1;
    }
    
    .footer {
      padding: 16px 24px;
      border-top: 1px solid var(--zen-glass-border);
      background: rgba(0,0,0,0.1);
    }
    
    ::slotted(h2), ::slotted(h3) {
      margin-top: 0;
      color: var(--zen-text-1);
      font-weight: 600;
      letter-spacing: -0.02em;
    }
    ::slotted(p) {
      color: var(--zen-text-2);
      line-height: 1.6;
    }
  `;

  render() {
    return html`
      <div class="card ${this.hover ? 'hover' : ''} ${this.clickable ? 'clickable' : ''}">
        <div class="media">
          <slot name="media"></slot>
        </div>
        <div class="content">
          <slot></slot>
        </div>
        <div class="footer" style="display: ${this.querySelector('[slot=footer]') ? 'block' : 'none'}">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'zen-card': ZenCard;
  }
}
