import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('zen-nav-link')
export class ZenNavLink extends LitElement {
    @property({ type: String }) href = '#';
    @property({ type: Boolean, reflect: true }) active = false;
    @property({ type: String }) variant: 'default' | 'underline' | 'pill' | 'glow' = 'default';

    static styles = css`
    :host {
      display: inline-block;
    }

    a {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--zen-text-2);
      text-decoration: none;
      padding: 10px 16px;
      border-radius: var(--zen-radius-md);
      font-size: 0.9375rem;
      font-weight: 500;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    /* Default variant */
    :host([variant="default"]) a:hover {
      color: var(--zen-text-1);
      background: var(--zen-glass-bg);
    }

    :host([variant="default"][active]) a {
      color: var(--zen-primary);
    }

    :host([variant="default"][active]) a::after {
      content: '';
      position: absolute;
      bottom: 4px;
      left: 50%;
      transform: translateX(-50%);
      width: 20px;
      height: 3px;
      background: var(--zen-primary);
      border-radius: 3px;
    }

    /* Underline variant */
    :host([variant="underline"]) a::after {
      content: '';
      position: absolute;
      bottom: 6px;
      left: 16px;
      right: 16px;
      height: 2px;
      background: var(--zen-primary);
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    :host([variant="underline"]) a:hover {
      color: var(--zen-text-1);
    }

    :host([variant="underline"]) a:hover::after {
      transform: scaleX(1);
      transform-origin: left;
    }

    :host([variant="underline"][active]) a {
      color: var(--zen-primary);
    }

    :host([variant="underline"][active]) a::after {
      transform: scaleX(1);
    }

    /* Pill variant */
    :host([variant="pill"]) a {
      border-radius: 99px;
      padding: 8px 20px;
    }

    :host([variant="pill"]) a:hover {
      color: var(--zen-text-1);
      background: var(--zen-glass-bg);
    }

    :host([variant="pill"][active]) a {
      color: white;
      background: var(--zen-primary);
    }

    /* Glow variant */
    :host([variant="glow"]) a:hover {
      color: var(--zen-primary);
      text-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
    }

    :host([variant="glow"][active]) a {
      color: var(--zen-primary);
      text-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
    }

    :host([variant="glow"]) a::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(
        circle at center,
        rgba(102, 126, 234, 0.15) 0%,
        transparent 70%
      );
      opacity: 0;
      transition: opacity 0.3s;
    }

    :host([variant="glow"]) a:hover::before,
    :host([variant="glow"][active]) a::before {
      opacity: 1;
    }

    /* Icon styling */
    .icon {
      font-size: 1.1rem;
    }
  `;

    render() {
        return html`
      <a href="${this.href}">
        <slot name="icon"></slot>
        <slot></slot>
      </a>
    `;
    }
}
