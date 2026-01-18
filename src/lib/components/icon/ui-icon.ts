import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { icons, IconName } from '../../assets/icons';

@customElement('zen-icon')
export class ZenIcon extends LitElement {
    @property({ type: String }) name: IconName = 'home';
    @property({ type: String }) variant: 'default' | 'glow' | 'filled' = 'default';
    @property({ type: String }) size = '24px';
    @property({ type: String }) color = 'currentColor';

    static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
    }

    svg {
      width: 100%;
      height: 100%;
      transition: all 0.3s ease;
    }

    :host([variant="glow"]) svg {
      filter: drop-shadow(0 0 4px var(--zen-primary));
    }

    :host([variant="filled"]) svg {
      fill: currentColor;
    }
  `;

    render() {
        const iconSvg = icons[this.name] || '';

        return html`
      <div 
        style="width: ${this.size}; height: ${this.size}; color: ${this.color};"
        class="icon-wrapper"
      >
        ${unsafeHTML(iconSvg)}
      </div>
    `;
    }
}
