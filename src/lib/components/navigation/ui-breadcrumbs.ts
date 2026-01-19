import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
}

@customElement('zen-breadcrumbs')
export class ZenBreadcrumbs extends LitElement {
  @property({ type: Array }) items: BreadcrumbItem[] = [];
  @property({ type: String }) separator = '/';
  @property({ type: Boolean }) animated = true;
  @property({ type: String, attribute: 'aria-label' }) label = 'Breadcrumb';

  static styles = css`
    :host {
      display: block;
    }

    .breadcrumbs {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .item {
      display: flex;
      align-items: center;
      gap: 8px;
      animation: slideIn 0.3s ease-out backwards;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(-10px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .link {
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--zen-text-2);
      text-decoration: none;
      font-size: 0.875rem;
      padding: 6px 10px;
      border-radius: var(--zen-radius-sm);
      transition: all 0.2s;
    }

    .link:hover {
      color: var(--zen-text-1);
      background: var(--zen-glass-bg);
    }

    .link.current {
      color: var(--zen-text-1);
      font-weight: 500;
      pointer-events: none;
    }

    .icon {
      font-size: 1rem;
    }

    .separator {
      color: var(--zen-text-2);
      opacity: 0.5;
      font-size: 0.875rem;
      user-select: none;
    }

    /* Hover trail effect */
    .item:not(:last-child):hover ~ .item .link:not(.current) {
      color: var(--zen-text-1);
    }
  `;

  render() {
    return html`
      <nav class="breadcrumbs" aria-label="${this.label}">
        ${this.items.map((item, i) => html`
          <div 
            class="item" 
            style="${this.animated ? `animation-delay: ${i * 0.05}s` : ''}"
          >
            ${item.href && i < this.items.length - 1 ? html`
              <a class="link" href="${item.href}">
                ${item.icon ? html`<span class="icon">${item.icon}</span>` : ''}
                ${item.label}
              </a>
            ` : html`
              <span class="link current">
                ${item.icon ? html`<span class="icon">${item.icon}</span>` : ''}
                ${item.label}
              </span>
            `}
            ${i < this.items.length - 1 ? html`
              <span class="separator">${this.separator}</span>
            ` : ''}
          </div>
        `)}
      </nav>
    `;
  }
}
