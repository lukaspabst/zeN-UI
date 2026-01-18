import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('zen-switch')
export class ZenSwitch extends LitElement {
    @property({ type: Boolean }) checked = false;
    @property({ type: Boolean }) disabled = false;

    static styles = css`
    :host {
      display: inline-block;
      vertical-align: middle;
    }

    .switch {
      position: relative;
      width: 44px;
      height: 24px;
      background: var(--zen-bg-2, #27272a);
      border-radius: 99px;
      padding: 2px;
      box-sizing: border-box;
      transition: background 0.3s ease;
      cursor: pointer;
      border: 1px solid var(--zen-glass-border);
    }

    :host([checked]) .switch {
      background: var(--zen-primary);
      border-color: var(--zen-primary);
    }
    
    :host([disabled]) .switch {
      opacity: 0.5;
      cursor: not-allowed;
      filter: grayscale(1);
    }

    .thumb {
      width: 18px;
      height: 18px;
      background: white;
      border-radius: 50%;
      box-shadow: 0 1px 3px rgba(0,0,0,0.3);
      transition: transform 0.3s var(--zen-ease-spring);
    }

    :host([checked]) .thumb {
      transform: translateX(20px);
    }
  `;

    _toggle() {
        if (this.disabled) return;
        this.checked = !this.checked;
        this.dispatchEvent(new CustomEvent('change', { detail: this.checked }));
    }

    render() {
        return html`
      <div class="switch" @click=${this._toggle}>
        <div class="thumb"></div>
      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'zen-switch': ZenSwitch;
    }
}
