import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('zen-nav-button')
export class ZenNavButton extends LitElement {
  @property({ type: String }) variant: 'primary' | 'secondary' | 'ghost' | 'outline' = 'primary';
  @property({ type: String }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Boolean }) disabled = false;

  static styles = css`
    :host {
      display: inline-block;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      border: none;
      border-radius: var(--zen-radius-md);
      font-weight: 600;
      font-family: inherit;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    :host([size="sm"]) button {
      padding: 8px 16px;
      font-size: 0.8125rem;
    }

    :host([size="md"]) button {
      padding: 10px 20px;
      font-size: 0.9375rem;
    }

    :host([size="lg"]) button {
      padding: 14px 28px;
      font-size: 1rem;
    }

    :host([variant="primary"]) button {
      background: var(--zen-primary);
      color: white;
      box-shadow: 0 4px 15px var(--zen-primary-glow);
    }

    :host([variant="primary"]) button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px var(--zen-primary-glow);
    }

    :host([variant="primary"]) button:active {
      transform: translateY(0);
    }

    :host([variant="secondary"]) button {
      background: var(--zen-glass-bg);
      color: var(--zen-text-1);
      border: 1px solid var(--zen-glass-border);
    }

    :host([variant="secondary"]) button:hover {
      background: var(--zen-glass-bg-hover);
      border-color: var(--zen-text-2);
    }

    :host([variant="ghost"]) button {
      background: transparent;
      color: var(--zen-text-1);
    }

    :host([variant="ghost"]) button:hover {
      background: var(--zen-glass-bg);
    }

    :host([variant="outline"]) button {
      background: transparent;
      color: var(--zen-primary);
      border: 1px solid var(--zen-primary);
    }

    :host([variant="outline"]) button:hover {
      background: var(--zen-primary);
      color: white;
    }

    :host([disabled]) button {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

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
        rgba(255, 255, 255, 0.15),
        transparent
      );
      transition: left 0.5s;
    }

    :host([variant="primary"]) button:hover::before {
      left: 100%;
    }
  `;

  render() {
    return html`
      <button ?disabled="${this.disabled}">
        <slot></slot>
      </button>
    `;
  }
}
