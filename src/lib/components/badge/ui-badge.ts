import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('zen-badge')
export class ZenBadge extends LitElement {
    @property({ type: String }) variant = 'neutral'; 

    static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 4px 10px;
      border-radius: 99px;
      font-size: 0.75rem;
      font-weight: 600;
      line-height: 1;
      white-space: nowrap;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Variants */
    :host([variant="neutral"]) { background: var(--zen-bg-2); color: var(--zen-text-2); border: 1px solid var(--zen-glass-border); }
    :host([variant="primary"]) { background: rgba(var(--zen-primary-h), var(--zen-primary-s), var(--zen-primary-l), 0.15); color: var(--zen-primary); border: 1px solid rgba(var(--zen-primary-h), var(--zen-primary-s), var(--zen-primary-l), 0.3); }
    :host([variant="success"]) { background: rgba(var(--zen-success-h), var(--zen-success-s), var(--zen-success-l), 0.15); color: var(--zen-success); border: 1px solid rgba(var(--zen-success-h), var(--zen-success-s), var(--zen-success-l), 0.3); }
    :host([variant="error"])   { background: rgba(var(--zen-destructive-h), var(--zen-destructive-s), var(--zen-destructive-l), 0.15); color: var(--zen-destructive); border: 1px solid rgba(var(--zen-destructive-h), var(--zen-destructive-s), var(--zen-destructive-l), 0.3); }
    :host([variant="warning"]) { background: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3); }
  `;

    render() {
        return html`<slot></slot>`;
    }
}
