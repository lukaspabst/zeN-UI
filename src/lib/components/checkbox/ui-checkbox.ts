import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('zen-checkbox')
export class ZenCheckbox extends LitElement {
  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean }) disabled = false;

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      user-select: none;
    }
    :host([disabled]) {
      opacity: 0.5;
      pointer-events: none;
    }

    .box {
      width: 22px;
      height: 22px;
      border-radius: 6px;
      border: 2px solid var(--zen-glass-border-hover);
      background: var(--zen-glass-bg);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      flex-shrink: 0;
      position: relative;
      overflow: hidden;
    }

    :host(:hover) .box {
      border-color: var(--zen-primary);
      box-shadow: 0 0 0 3px rgba(var(--zen-primary-h), var(--zen-primary-s), var(--zen-primary-l), 0.1);
    }

    :host([checked]) .box {
      background: var(--zen-primary);
      border-color: var(--zen-primary);
      box-shadow: 0 2px 8px rgba(var(--zen-primary-h), var(--zen-primary-s), var(--zen-primary-l), 0.4);
    }

    svg {
      width: 14px;
      height: 14px;
      fill: none;
      stroke: white;
      stroke-width: 3.5;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-dasharray: 20;
      stroke-dashoffset: 20;
      opacity: 0;
      transition: stroke-dashoffset 0.4s ease 0.1s, opacity 0.2s ease;
      transform: translateY(1px); /* visual centering */
    }

    :host([checked]) svg {
      stroke-dashoffset: 0;
      opacity: 1;
    }
    
    /* Ripple-ish effect on check */
    .box::after {
      content: '';
      position: absolute;
      inset: 0;
      background: white;
      opacity: 0;
      transform: scale(0);
      transition: all 0.3s;
      border-radius: inherit;
    }
    :host([checked]) .box::after {
      animation: ripple 0.3s ease-out;
    }
    
    @keyframes ripple {
      0% { transform: scale(0); opacity: 0.4; }
      100% { transform: scale(1.5); opacity: 0; }
    }

    .label {
      color: var(--zen-text-1);
      font-size: 1rem;
      font-weight: 500;
    }
  `;

  _toggle() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent('change', { detail: this.checked }));
  }

  render() {
    return html`
      <div class="box" @click=${this._toggle}>
        <svg viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <div class="label" @click=${this._toggle}>
        <slot></slot>
      </div>
    `;
  }
}
