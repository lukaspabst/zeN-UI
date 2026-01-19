import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('zen-table')
export class ZenTable extends LitElement {
  @property({ type: Array }) columns: { header: string; key: string }[] = [];
  @property({ type: Array }) data: any[] = [];

  static styles = css`
    :host {
      display: block;
      overflow-x: auto;
      border-radius: var(--zen-radius-lg);
      border: 1px solid var(--zen-glass-border);
      background: var(--zen-glass-bg);
    }

    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-family: var(--zen-font-family);
    }

    th {
      padding: 16px 24px;
      color: var(--zen-text-2);
      font-weight: 500;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1px solid var(--zen-glass-border);
      background: rgba(0,0,0,0.2);
    }

    td {
      padding: 16px 24px;
      color: var(--zen-text-1);
      border-bottom: 1px solid var(--zen-glass-border);
      transition: background 0.2s;
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:hover td {
      background: var(--zen-glass-bg-hover);
    }
  `;

  render() {
    return html`
      <table>
        <thead>
          <tr>
            ${this.columns.map(col => html`<th scope="col">${col.header}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${this.data.map(row => html`
            <tr>
              ${this.columns.map(col => html`<td>${row[col.key]}</td>`)}
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }
}
