import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('zen-avatar')
export class ZenAvatar extends LitElement {
    @property({ type: String }) src = ''; 
    @property({ type: String }) alt = ''; 
    @property({ type: String }) status = ''; 

    static styles = css`
    :host {
      display: inline-block;
      vertical-align: middle;
      position: relative;
      width: 40px;
      height: 40px;
    }

    .avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
      background: var(--zen-bg-2, #27272a);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--zen-text-1);
      font-weight: 600;
      font-size: 1rem;
      border: 2px solid var(--zen-glass-border);
      box-sizing: border-box;
      user-select: none;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .status {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 2px solid var(--zen-bg-0, #000);
      background: #9ca3af;
    }

    .status.online { background: #10b981; } /* Green */
    .status.busy { background: #ef4444; }   /* Red */
    .status.away { background: #f59e0b; }   /* Amber */
  `;

    _getInitials() {
        return this.alt.slice(0, 2).toUpperCase();
    }

    render() {
        return html`
      <div class="avatar">
        ${this.src
                ? html`<img src="${this.src}" alt="${this.alt}" />`
                : this._getInitials()
            }
      </div>
      ${this.status ? html`<div class="status ${this.status}"></div>` : ''}
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'zen-avatar': ZenAvatar;
    }
}
