import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '../icon/ui-icon';
import { IconName } from '../../assets/icons';

export type ToastType = 'info' | 'success' | 'error' | 'warning';

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
}

@customElement('zen-toast-container')
export class ZenToastContainer extends LitElement {
  @state() private toasts: ToastItem[] = [];

  connectedCallback() {
    super.connectedCallback();
  }

  static styles = css`
    :host {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 12px;
      pointer-events: none;
    }

    .toast {
      position: relative;
      background: var(--zen-bg-1);
      color: var(--zen-text-1);
      padding: 16px 20px;
      border-radius: var(--zen-radius-md);
      border: 1px solid var(--zen-glass-border);
      box-shadow: var(--zen-shadow-lg);
      min-width: 300px;
      display: flex;
      align-items: center;
      gap: 12px;
      pointer-events: auto;
      overflow: hidden;
      
      /* Animation */
      animation: slide-in 0.4s var(--zen-ease-spring) forwards;
      opacity: 0;
      transform-origin: right bottom;
    }
    
    .toast.closing {
      animation: fade-out 0.2s var(--zen-ease-out) forwards !important;
    }

    @keyframes slide-in {
      from { opacity: 0; transform: translateX(50px) scale(0.9); }
      to { opacity: 1; transform: translateX(0) scale(1); }
    }
    @keyframes fade-out {
      to { opacity: 0; transform: translateX(20px) scale(0.95); margin-top: -60px; }
    }

    /* Icon Area */
    .icon {
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      font-size: 14px;
      font-weight: bold;
    }
    
    .toast-success .icon { background: rgba(var(--zen-success-h), var(--zen-success-s), 20%); color: var(--zen-success); }
    .toast-error .icon { background: rgba(var(--zen-destructive-h), var(--zen-destructive-s), 20%); color: var(--zen-destructive); }
    .toast-info .icon { background: rgba(var(--zen-primary-h), var(--zen-primary-s), 20%); color: var(--zen-primary); }

    .content {
      flex: 1;
      font-size: 0.95rem;
    }

    /* Progress Bar */
    .progress {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      background: currentColor;
      opacity: 0.3;
      animation: progress linear forwards;
    }
    .toast-success .progress { color: var(--zen-success); }
    .toast-error .progress { color: var(--zen-destructive); }
    .toast-info .progress { color: var(--zen-primary); }

    @keyframes progress {
      from { width: 100%; }
      to { width: 0%; }
    }
  `;

  addToast(message: string, type: ToastType = 'info', duration = 3000) {
    const id = Math.random().toString(36).substr(2, 9);
    const toast = { id, message, type, duration };
    this.toasts = [...this.toasts, toast];

    setTimeout(() => this.removeToast(id), duration);
  }

  removeToast(id: string) {
    const toastEl = this.shadowRoot?.getElementById(id);
    if (toastEl) {
      toastEl.classList.add('closing');
      toastEl.addEventListener('animationend', () => {
        this.toasts = this.toasts.filter(t => t.id !== id);
      });
    } else {
      this.toasts = this.toasts.filter(t => t.id !== id);
    }
  }

  _getIcon(type: ToastType): IconName {
    switch (type) {
      case 'success': return 'check';
      case 'error': return 'alert-circle';
      case 'warning': return 'alert-triangle';
      default: return 'info';
    }
  }

  render() {
    return html`
      ${this.toasts.map((toast) => html`
        <div id="${toast.id}" class="toast toast-${toast.type}">
          <div class="icon">
            <zen-icon name="${this._getIcon(toast.type)}" size="14px"></zen-icon>
          </div>
          <div class="content">${toast.message}</div>
          <div class="progress" style="animation-duration: ${toast.duration}ms"></div>
        </div>
      `)}
    `;
  }
}

export const toast = (message: string, type: ToastType = 'info') => {
  let container = document.querySelector('zen-toast-container');
  if (!container) {
    container = document.createElement('zen-toast-container');
    document.body.appendChild(container);
  }
  (container as ZenToastContainer).addToast(message, type);
};

declare global {
  interface HTMLElementTagNameMap {
    'zen-toast-container': ZenToastContainer;
  }
}
