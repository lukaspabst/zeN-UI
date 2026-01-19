import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('zen-button')
export class ZenButton extends LitElement {
  @property({ type: String }) variant = 'primary';
  @property({ type: String }) size = 'md';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) loading = false;
  @property({ type: Boolean }) block = false;

  static styles = css`
    :host {
      display: inline-block;
      vertical-align: middle;
      --btn-height-xs: 28px;
      --btn-height-sm: 36px;
      --btn-height-md: 44px;
      --btn-height-lg: 52px;
      --btn-height-xl: 60px;
    }
    :host([block]) {
      display: block;
      width: 100%;
    }

    button {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      border: 1px solid transparent;
      outline: none;
      background: transparent;
      user-select: none;
      cursor: pointer;
      font-family: var(--zen-font-family, sans-serif);
      font-weight: 500;
      white-space: nowrap;
      transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
      overflow: hidden;
      gap: 8px;
      box-sizing: border-box;
    }

    /* --- Sizes --- */
    .size-xs { height: var(--btn-height-xs); padding: 0 10px; font-size: 0.75rem; border-radius: var(--zen-radius-sm, 6px); }
    .size-sm { height: var(--btn-height-sm); padding: 0 14px; font-size: 0.875rem; border-radius: var(--zen-radius-md, 8px); }
    .size-md { height: var(--btn-height-md); padding: 0 20px; font-size: 1rem;     border-radius: var(--zen-radius-md, 10px); }
    .size-lg { height: var(--btn-height-lg); padding: 0 24px; font-size: 1.125rem; border-radius: var(--zen-radius-lg, 12px); }
    .size-xl { height: var(--btn-height-xl); padding: 0 32px; font-size: 1.25rem;  border-radius: var(--zen-radius-lg, 14px); }

    /* --- Variants (Using !important to ensure override behavior is strict) --- */
    
    /* Primary */
    .variant-primary {
      background: var(--zen-primary);
      color: #fff;
      box-shadow: 0 1px 2px rgba(0,0,0,0.1), 0 0 0 1px inset rgba(255,255,255,0.1);
    }
    .variant-primary:hover:not(:disabled) {
      filter: brightness(1.1);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(var(--zen-primary-h), var(--zen-primary-s), var(--zen-primary-l), 0.3);
    }
    .variant-primary:active:not(:disabled) {
      transform: translateY(1px);
      filter: brightness(0.95);
    }

    /* Secondary */
    .variant-secondary {
      background: var(--zen-bg-2, #27272a);
      color: var(--zen-text-1, #fff);
      border-color: var(--zen-glass-border, rgba(255,255,255,0.1));
    }
    .variant-secondary:hover:not(:disabled) {
      background: var(--zen-bg-3, #3f3f46);
      border-color: var(--zen-text-3, #a1a1aa);
    }

    /* Outline */
    .variant-outline {
      background: transparent;
      border: 1px solid var(--zen-glass-border-hover, rgba(255,255,255,0.3)); /* Increased contrast */
      color: var(--zen-text-1, #fff);
    }
    .variant-outline:hover:not(:disabled) {
      border-color: var(--zen-primary);
      color: var(--zen-primary);
      background: rgba(var(--zen-primary-h), var(--zen-primary-s), var(--zen-primary-l), 0.1);
    }

    /* Glass */
    .variant-glass {
      background: rgba(255,255,255,0.08); /* More visible base */
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.15); /* Stronger border */
      color: var(--zen-text-1, #ffffff);
    }
    .variant-glass:hover:not(:disabled) {
      background: rgba(255,255,255,0.15);
      border-color: rgba(255,255,255,0.25);
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    }

    /* Ghost */
    .variant-ghost {
      background: transparent;
      border-color: transparent;
      color: var(--zen-text-2, #a1a1aa);
    }
    .variant-ghost:hover:not(:disabled) {
      background: rgba(255,255,255,0.05);
      color: var(--zen-text-1);
    }

    /* Destructive */
    .variant-destructive {
      background: rgba(200, 30, 30, 0.1);
      border: 1px solid rgba(200, 30, 30, 0.2);
      color: #ff5555;
    }
    .variant-destructive:hover:not(:disabled) {
      background: rgba(200, 30, 30, 0.2);
      border-color: #ff5555;
    }

    /* --- Disabled --- */
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      filter: grayscale(0.8);
      transform: none !important;
      box-shadow: none !important;
    }

    /* --- Loading State --- */
    .content {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: opacity 0.2s;
    }
    .loading .content {
      opacity: 0;
    }

    /* Premium Wave Loader */
    .loader {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      gap: 4px;
      pointer-events: none;
    }
    
    .dot {
      width: 6px;
      height: 6px;
      background: currentColor;
      border-radius: 50%;
      animation: wave 1.2s ease-in-out infinite;
    }
    
    .dot:nth-child(1) { animation-delay: -0.24s; }
    .dot:nth-child(2) { animation-delay: -0.12s; }
    .dot:nth-child(3) { animation-delay: 0s; }

    @keyframes wave {
      0%, 100% { transform: translateY(0); opacity: 0.5; }
      50% { transform: translateY(-4px); opacity: 1; }
    }
  `;

  render() {
    const classes = {
      [`variant-${this.variant}`]: true,
      [`size-${this.size}`]: true,
      'loading': this.loading,
    };

    return html`
      <button 
        class=${classMap(classes)}
        ?disabled=${this.disabled || this.loading}
      >
        <span class="content"><slot></slot></span>
        ${this.loading ? html`
          <div class="loader">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        ` : ''}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'zen-button': ZenButton;
  }
}
