import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ZenThemeManager, type ColorTheme } from '../../utils/theme-manager';

@customElement('zen-theme-picker')
export class ZenThemePicker extends LitElement {
  @state() private _currentTheme: ColorTheme = 'default';

  static styles = css`
    :host {
      display: inline-block;
    }

    .picker {
      display: flex;
      gap: 8px;
      padding: 8px;
      background: var(--zen-glass-bg);
      border: 1px solid var(--zen-glass-border);
      border-radius: var(--zen-radius-full);
      backdrop-filter: blur(10px);
    }

    .swatch {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 2px solid transparent;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      position: relative;
    }

    .swatch:hover {
      transform: scale(1.1);
    }

    .swatch.active {
      transform: scale(1.1);
      border-color: var(--zen-text-1);
    }

    .swatch-default { background: hsl(250, 95%, 64%); }
    .swatch-ocean { background: hsl(210, 100%, 56%); }
    .swatch-forest { background: hsl(150, 60%, 45%); }
    .swatch-sunset { background: hsl(30, 100%, 56%); }
    .swatch-rose { background: hsl(330, 85%, 60%); }
    .swatch-amber { background: hsl(45, 95%, 50%); }
  `;

  connectedCallback() {
    super.connectedCallback();
    ZenThemeManager.init();
    this._currentTheme = ZenThemeManager.getColorTheme();
  }

  private _setTheme(theme: ColorTheme) {
    ZenThemeManager.setColorTheme(theme);
    this._currentTheme = theme;

    this.dispatchEvent(new CustomEvent('color-theme-change', {
      detail: { theme },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const themes: ColorTheme[] = ['default', 'ocean', 'forest', 'sunset', 'rose', 'amber'];

    return html`
      <div class="picker">
        ${themes.map(theme => html`
          <div 
            class="swatch swatch-${theme} ${this._currentTheme === theme ? 'active' : ''}"
            @click=${() => this._setTheme(theme)}
            title="${theme.charAt(0).toUpperCase() + theme.slice(1)}"
          ></div>
        `)}
      </div>
    `;
  }
}
