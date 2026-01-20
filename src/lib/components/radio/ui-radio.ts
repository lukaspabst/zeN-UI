import { LitElement, css, html, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('zen-radio')
export class ZenRadio extends LitElement {
  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) name = '';
  @property({ type: String }) value = '';

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      cursor: pointer;
      user-select: none;
    }
    :host(:focus) {
        outline: none;
    }
    :host(:focus) .circle {
        border-color: var(--zen-primary);
        box-shadow: 0 0 0 2px rgba(var(--zen-primary-h), var(--zen-primary-s), var(--zen-primary-l), 0.2);
    }
    :host([disabled]) {
      opacity: 0.5;
      pointer-events: none;
    }

    .circle {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1.5px solid var(--zen-glass-border-hover);
      background: var(--zen-glass-bg);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      position: relative;
    }

    :host([checked]) .circle {
      border-color: var(--zen-primary);
    }

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--zen-primary);
      transform: scale(0);
      transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    :host([checked]) .dot {
      transform: scale(1);
    }

    .label {
      color: var(--zen-text-1);
      font-size: 1rem;
    }
  `;

  _toggle() {
    if (this.disabled || this.checked) return;
    this.checked = true;
    this.dispatchEvent(new CustomEvent('change', { detail: { checked: true, value: this.value } }));



  }

  constructor() {
    super();
    this.addEventListener('keydown', this._handleKeyDown);
  }

  _handleKeyDown(e: KeyboardEvent) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this._toggle();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'radio');
    }
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', this.disabled ? '-1' : '0');
    }
  }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('checked')) {
      this.setAttribute('aria-checked', this.checked ? 'true' : 'false');
    }
    if (changedProperties.has('disabled')) {
      this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
      this.setAttribute('tabindex', this.disabled ? '-1' : '0');
    }
  }

  render() {
    return html`
      <div class="circle" @click=${this._toggle}>
        <div class="dot"></div>
      </div>
      <div class="label" @click=${this._toggle}>
        <slot></slot>
      </div>
    `;
  }
}
