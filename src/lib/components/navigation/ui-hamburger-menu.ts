import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('zen-hamburger-menu')
export class ZenHamburgerMenu extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) variant: 'spin' | 'squeeze' | 'arrow' = 'spin';



  static styles = css`
    :host {
      display: block;
    }

    /* Hamburger Button */
    .hamburger {
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--zen-glass-bg);
      border: 1px solid var(--zen-glass-border);
      border-radius: var(--zen-radius-md);
      cursor: pointer;
      position: relative;
      z-index: 1001;
      transition: all 0.3s;
    }

    .hamburger:hover {
      background: var(--zen-glass-bg-hover);
    }

    .hamburger-inner {
      width: 22px;
      height: 16px;
      position: relative;
    }

    .hamburger-inner span {
      position: absolute;
      left: 0;
      width: 100%;
      height: 2px;
      background: var(--zen-text-1);
      border-radius: 2px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .hamburger-inner span:nth-child(1) { top: 0; }
    .hamburger-inner span:nth-child(2) { top: 50%; transform: translateY(-50%); }
    .hamburger-inner span:nth-child(3) { bottom: 0; }

    /* Spin variant */
    :host([variant="spin"][open]) .hamburger-inner span:nth-child(1) {
      transform: rotate(45deg);
      top: 50%;
      margin-top: -1px;
    }

    :host([variant="spin"][open]) .hamburger-inner span:nth-child(2) {
      opacity: 0;
      transform: rotate(45deg);
    }

    :host([variant="spin"][open]) .hamburger-inner span:nth-child(3) {
      transform: rotate(-45deg);
      bottom: 50%;
      margin-bottom: -1px;
    }

    /* Squeeze variant */
    :host([variant="squeeze"][open]) .hamburger-inner span:nth-child(1) {
      transform: rotate(45deg);
      top: 7px;
    }

    :host([variant="squeeze"][open]) .hamburger-inner span:nth-child(2) {
      width: 0;
      opacity: 0;
    }

    :host([variant="squeeze"][open]) .hamburger-inner span:nth-child(3) {
      transform: rotate(-45deg);
      bottom: 7px;
    }

    /* Arrow variant */
    :host([variant="arrow"][open]) .hamburger-inner span:nth-child(1) {
      width: 50%;
      transform: rotate(-40deg);
      top: 3px;
    }

    :host([variant="arrow"][open]) .hamburger-inner span:nth-child(3) {
      width: 50%;
      transform: rotate(40deg);
      bottom: 3px;
    }

    /* Overlay */
    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(4px);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s;
      z-index: 999;
    }

    :host([open]) .overlay {
      opacity: 1;
      visibility: visible;
    }

    /* Slide Panel */
    .panel {
      position: fixed;
      top: 0;
      right: 0;
      width: 300px;
      max-width: 85vw;
      height: 100vh;
      background: var(--zen-bg-1);
      border-left: 1px solid var(--zen-glass-border);
      transform: translateX(100%);
      visibility: hidden;
      transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.4s;
      z-index: 1000;
      display: flex;
      flex-direction: column;
    }

    :host([open]) .panel {
      transform: translateX(0);
      visibility: visible;
    }

    .panel-header {
      padding: 24px;
      border-bottom: 1px solid var(--zen-glass-border);
    }

    .panel-content {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
    }

    .menu-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px 20px;
      color: var(--zen-text-1);
      text-decoration: none;
      border-radius: var(--zen-radius-md);
      transition: all 0.2s;
      font-size: 1rem;
      cursor: pointer;
    }

    .menu-item:hover {
      background: var(--zen-glass-bg);
      color: var(--zen-primary);
    }

    .menu-item-icon {
      font-size: 1.25rem;
    }

    .panel-footer {
      padding: 24px;
      border-top: 1px solid var(--zen-glass-border);
    }
  `;

  private _toggle() {
    this.open = !this.open;
    this.dispatchEvent(new CustomEvent('toggle', { detail: { open: this.open } }));
  }

  private _close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('toggle', { detail: { open: false } }));
  }

  render() {
    return html`
      <button class="hamburger" @click=${this._toggle} aria-label="Toggle menu">
        <div class="hamburger-inner">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      <div class="overlay" @click=${this._close}></div>

      <div class="panel">
        <div class="panel-header">
          <slot name="header">
            <h3 style="margin: 0; color: var(--zen-text-1);">Menu</h3>
          </slot>
        </div>
        <nav class="panel-content">
          <slot></slot>
        </nav>
        <div class="panel-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}
