import { LitElement, css, html } from 'lit';
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
      user-select: none;
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
