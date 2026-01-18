import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('zen-navbar')
export class ZenNavbar extends LitElement {
  @property({ type: String }) logo = '';
  @property({ type: String }) logoText = 'ZEN';
  @property({ type: Boolean }) sticky = true;
  @property({ type: Boolean }) transparent = false;

  @state() private _scrolled = false;
  @state() private _mobileMenuOpen = false;

  static styles = css`
    :host {
      display: block;
    }

    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 32px;
      background: var(--zen-glass-bg);
      border-bottom: 1px solid var(--zen-glass-border);
      transition: all 0.3s;
    }

    :host([sticky]) .navbar {
      position: sticky;
      top: 0;
      z-index: 100;
    }

    :host([transparent]) .navbar:not(.scrolled) {
      background: transparent;
      border-color: transparent;
    }

    .navbar.scrolled {
      background: var(--zen-bg-1);
      backdrop-filter: blur(20px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: var(--zen-text-1);
    }

    .logo-image {
      height: 32px;
      width: auto;
    }

    .logo-text {
      font-size: 1.5rem;
      font-weight: 800;
      background: linear-gradient(135deg, var(--zen-primary), #f093fb);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .nav-link {
      color: var(--zen-text-2);
      text-decoration: none;
      padding: 10px 16px;
      border-radius: var(--zen-radius-md);
      font-size: 0.9375rem;
      font-weight: 500;
      transition: all 0.2s;
      position: relative;
    }

    .nav-link:hover {
      color: var(--zen-text-1);
      background: var(--zen-glass-bg);
    }

    .nav-link.active {
      color: var(--zen-primary);
    }

    .nav-link.active::after {
      content: '';
      position: absolute;
      bottom: 4px;
      left: 50%;
      transform: translateX(-50%);
      width: 20px;
      height: 3px;
      background: var(--zen-primary);
      border-radius: 3px;
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .nav-button {
      padding: 10px 20px;
      border-radius: var(--zen-radius-md);
      font-weight: 600;
      font-size: 0.9375rem;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
      font-family: inherit;
    }

    .nav-button.secondary {
      background: transparent;
      color: var(--zen-text-1);
    }

    .nav-button.secondary:hover {
      background: var(--zen-glass-bg);
    }

    .nav-button.primary {
      background: var(--zen-primary);
      color: white;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }

    .nav-button.primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }

    .mobile-menu-btn {
      display: none;
      width: 44px;
      height: 44px;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      cursor: pointer;
    }

    .hamburger {
      width: 24px;
      height: 18px;
      position: relative;
    }

    .hamburger span {
      position: absolute;
      left: 0;
      width: 100%;
      height: 2px;
      background: var(--zen-text-1);
      border-radius: 2px;
      transition: all 0.3s;
    }

    .hamburger span:nth-child(1) { top: 0; }
    .hamburger span:nth-child(2) { top: 8px; }
    .hamburger span:nth-child(3) { bottom: 0; }

    .mobile-menu-btn.open .hamburger span:nth-child(1) {
      transform: rotate(45deg);
      top: 8px;
    }

    .mobile-menu-btn.open .hamburger span:nth-child(2) {
      opacity: 0;
    }

    .mobile-menu-btn.open .hamburger span:nth-child(3) {
      transform: rotate(-45deg);
      bottom: 8px;
    }

    .mobile-menu {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: var(--zen-bg-1);
      border-bottom: 1px solid var(--zen-glass-border);
      padding: 16px;
      flex-direction: column;
      gap: 8px;
      transform: translateY(-10px);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s;
    }

    .mobile-menu.open {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }

    @media (max-width: 768px) {
      .nav-links,
      .nav-actions {
        display: none;
      }

      .mobile-menu-btn {
        display: flex;
      }

      .mobile-menu {
        display: flex;
      }

      .mobile-menu .nav-link {
        padding: 16px;
        border-radius: var(--zen-radius-md);
      }

      .mobile-menu .nav-button {
        width: 100%;
        text-align: center;
        margin-top: 8px;
      }
    }

    ::slotted([slot="actions"]) {
      display: flex;
      align-items: center;
      gap: 12px;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    if (this.sticky) {
      window.addEventListener('scroll', this._handleScroll);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('scroll', this._handleScroll);
  }

  private _handleScroll = () => {
    this._scrolled = window.scrollY > 50;
  };

  private _toggleMobileMenu() {
    this._mobileMenuOpen = !this._mobileMenuOpen;
  }

  render() {
    return html`
      <nav class="navbar ${this._scrolled ? 'scrolled' : ''}">
        <a href="#" class="logo">
          ${this.logo ? html`<img src="${this.logo}" alt="Logo" class="logo-image">` : ''}
          <span class="logo-text">${this.logoText}</span>
        </a>

        <div class="nav-links">
          <slot name="links"></slot>
        </div>

        <div class="nav-actions">
          <slot name="actions"></slot>
        </div>

        <button 
          class="mobile-menu-btn ${this._mobileMenuOpen ? 'open' : ''}"
          @click=${this._toggleMobileMenu}
        >
          <div class="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </nav>

      <div class="mobile-menu ${this._mobileMenuOpen ? 'open' : ''}">
        <slot name="links"></slot>
        <slot name="actions"></slot>
      </div>
    `;
  }
}
