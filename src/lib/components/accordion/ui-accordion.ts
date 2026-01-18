import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('zen-accordion')
export class ZenAccordion extends LitElement {
    @property({ type: Boolean }) multiple = false; 

    static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  `;

    render() {
        return html`<slot></slot>`;
    }
}

@customElement('zen-accordion-item')
export class ZenAccordionItem extends LitElement {
    @property({ type: String }) header = '';
    @property({ type: Boolean, reflect: true }) open = false;

    static styles = css`
    :host {
      display: block;
      background: var(--zen-glass-bg);
      border: 1px solid var(--zen-glass-border);
      border-radius: var(--zen-radius-md);
      overflow: hidden;
      transition: all 0.3s ease;
    }
    
    :host([open]) {
      background: var(--zen-glass-bg-hover);
      border-color: var(--zen-primary);
    }

    .header {
      padding: 16px 20px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      user-select: none;
      font-weight: 500;
      color: var(--zen-text-1);
    }

    .icon {
      transition: transform 0.3s var(--zen-ease-spring);
    }
    
    :host([open]) .icon {
      transform: rotate(180deg);
      color: var(--zen-primary);
    }

    .content-wrapper {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.3s var(--zen-ease-spring);
    }
    
    :host([open]) .content-wrapper {
      grid-template-rows: 1fr;
    }

    .overflow-hidden {
      overflow: hidden;
    }

    .content {
      padding: 0 20px 20px 20px;
      color: var(--zen-text-2);
      line-height: 1.5;
    }
  `;

    _toggle() {
        this.open = !this.open;
        
        this.dispatchEvent(new CustomEvent('toggle', { bubbles: true, composed: true, detail: this.open }));
    }

    render() {
        return html`
      <div class="header" @click=${this._toggle}>
        <span><slot name="header">${this.header}</slot></span>
        <div class="icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
      <div class="content-wrapper">
        <div class="overflow-hidden">
          <div class="content">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
    }
}
