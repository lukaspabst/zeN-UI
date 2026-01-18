import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('zen-textarea')
export class ZenTextarea extends LitElement {
    @property({ type: String }) label = '';
    @property({ type: String }) placeholder = '';
    @property({ type: String }) value = '';
    @property({ type: Number }) rows = 3;

    static styles = css`
    :host {
      display: block;
      width: 100%;
      font-family: var(--zen-font-family);
    }

    label {
      display: block;
      margin-bottom: 8px;
      color: var(--zen-text-2);
      font-size: 0.9rem;
      font-weight: 500;
    }

    textarea {
      width: 100%;
      background: var(--zen-glass-bg);
      border: 1px solid var(--zen-glass-border);
      border-radius: var(--zen-radius-md);
      padding: 12px;
      color: var(--zen-text-1);
      font-family: inherit;
      font-size: 1rem;
      resize: vertical;
      outline: none;
      transition: all 0.2s ease;
      min-height: 44px;
      box-sizing: border-box;
    }

    textarea:focus {
      border-color: var(--zen-primary);
      background: var(--zen-glass-bg-hover);
      box-shadow: 0 0 0 2px rgba(var(--zen-primary-h), var(--zen-primary-s), var(--zen-primary-l), 0.2);
    }
  `;

    _handleInput(e: Event) {
        const target = e.target as HTMLTextAreaElement;
        this.value = target.value;
        this.dispatchEvent(new CustomEvent('input', { detail: this.value }));
    }

    render() {
        return html`
      ${this.label ? html`<label>${this.label}</label>` : ''}
      <textarea
        .value=${this.value}
        rows=${this.rows}
        placeholder=${this.placeholder}
        @input=${this._handleInput}
      ></textarea>
    `;
    }
}
