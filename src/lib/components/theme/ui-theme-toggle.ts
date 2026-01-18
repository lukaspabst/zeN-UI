import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ZenThemeManager, type ThemeMode } from '../../utils/theme-manager';

@customElement('zen-theme-toggle')
export class ZenThemeToggle extends LitElement {
  @state() private _mode: ThemeMode = 'system';

  static styles = css`
    :host {
      display: inline-block;
    }

    .toggle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--zen-glass-bg);
      border: 1px solid var(--zen-glass-border);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--zen-text-1);
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    .toggle:hover {
      background: var(--zen-glass-bg-hover);
      transform: rotate(15deg);
    }

    .icon {
      font-size: 1.25rem;
      transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s;
      position: absolute;
    }

    .toggle[data-mode="light"] .icon-moon { transform: translateY(20px) rotate(45deg); opacity: 0; }
    .toggle[data-mode="light"] .icon-sun { transform: translateY(0); opacity: 1; }
    
    .toggle[data-mode="dark"] .icon-sun { transform: translateY(-20px) rotate(-45deg); opacity: 0; }
    .toggle[data-mode="dark"] .icon-moon { transform: translateY(0); opacity: 1; }

    .toggle[data-mode="system"] .icon-sun,
    .toggle[data-mode="system"] .icon-moon { opacity: 0; }
    
    .icon-system {
        opacity: 0;
        transform: scale(0.5);
    }
    
    .toggle[data-mode="system"] .icon-system {
        opacity: 1;
        transform: scale(1);
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    ZenThemeManager.init();
    this._mode = ZenThemeManager.getMode();
  }

  private _cycleMode() {
    const modes: ThemeMode[] = ['light', 'dark', 'system'];
    const currentIndex = modes.indexOf(this._mode);
    const nextMode = modes[(currentIndex + 1) % modes.length];

    ZenThemeManager.setMode(nextMode);
    this._mode = nextMode;

    this.dispatchEvent(new CustomEvent('theme-change', {
      detail: { mode: nextMode },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <button 
        class="toggle" 
        data-mode="${this._mode}"
        @click=${this._cycleMode}
        title="Current theme: ${this._mode}"
      >
        <span class="icon icon-sun">☀️</span>
        <span class="icon icon-moon">🌙</span>
        <span class="icon icon-system">🖥️</span>
      </button>
    `;
  }
}
