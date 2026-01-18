import { LitElement, css, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

@customElement('zen-dialog')
export class ZenDialog extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) title = '';
  @property({ type: Boolean }) scrollLock = true;

  @query('dialog') _dialog!: HTMLDialogElement;

  static styles = css`
    :host {
      display: contents;
    }

    dialog {
      background: var(--zen-bg-1);
      color: var(--zen-text-1);
      border: 1px solid var(--zen-glass-border);
      border-radius: var(--zen-radius-lg);
      padding: 0;
      max-width: 600px;
      width: 90%;
      box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.5);
      
      /* Animation */
      opacity: 0;
      transform: scale(0.95) translateY(20px);
      transition: opacity 0.3s ease, transform 0.3s var(--zen-ease-spring);
    }

    dialog[open] {
      opacity: 1;
      transform: scale(1) translateY(0);
    }

    dialog::backdrop {
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(8px);
      animation: fade-in 0.3s ease forwards;
    }

    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    /* Layout */
    .container {
      display: flex;
      flex-direction: column;
      max-height: 85vh;
    }

    .header {
      padding: 20px 24px;
      border-bottom: 1px solid var(--zen-glass-border);
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(255,255,255,0.02);
    }

    .header h2 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--zen-text-1);
    }

    .close-btn {
      background: none;
      border: none;
      color: var(--zen-text-2);
      cursor: pointer;
      font-size: 1.5rem;
      padding: 4px;
      line-height: 1;
      border-radius: 50%;
      height: 32px;
      width: 32px;
      display: grid;
      place-items: center;
      transition: all 0.2s;
    }
    .close-btn:hover { 
      color: var(--zen-text-1); 
      background: var(--zen-glass-bg-hover);
    }

    .content {
      padding: 24px;
      overflow-y: auto;
      line-height: 1.6;
      color: var(--zen-text-2);
    }

    .footer {
      padding: 16px 24px;
      border-top: 1px solid var(--zen-glass-border);
      background: var(--zen-glass-bg);
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }
  `;

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('open')) {
      if (this.open) {
        this._dialog.showModal();
        if (this.scrollLock) document.body.style.overflow = 'hidden';
      } else {
        this._dialog.close();
        if (this.scrollLock) document.body.style.overflow = '';
      }
    }
  }

  _close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('close'));
  }

  
  _handleBackdropClick(e: MouseEvent) {
    const rect = this._dialog.getBoundingClientRect();
    const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height
      && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
    if (!isInDialog) {
      this._close();
    }
  }

  render() {
    return html`
      <dialog @close="${this._close}" @click="${this._handleBackdropClick}">
        <div class="container">
          <div class="header">
            <h2>${this.title}</h2>
            <button class="close-btn" @click="${this._close}">×</button>
          </div>
          <div class="content">
            <slot></slot>
          </div>
          <div class="footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'zen-dialog': ZenDialog;
  }
}
