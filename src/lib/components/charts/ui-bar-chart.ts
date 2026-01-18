import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

interface BarData {
  label: string;
  value: number;
  color?: string;
}

@customElement('zen-bar-chart')
export class ZenBarChart extends LitElement {
  @property({ type: Array }) data: BarData[] = [];
  @property({ type: Number }) maxValue = 0;
  @property({ type: Boolean }) showValues = true;
  @property({ type: Boolean }) animated = true;
  @property({ type: Boolean, reflect: true }) horizontal = false;

  @state() private _visible = false;
  private _observer: IntersectionObserver | null = null;

  static styles = css`
    :host {
      display: block;
    }

    .chart {
      display: flex;
      gap: 16px;
      align-items: flex-end;
      height: 250px;
      padding: 20px 0;
    }

    .bar-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      height: 100%;
    }

    .bar-wrapper {
      flex: 1;
      width: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      position: relative;
    }

    .bar {
      width: 100%;
      max-width: 60px;
      border-radius: 8px 8px 0 0;
      position: relative;
      transition: height 1s cubic-bezier(0.4, 0, 0.2, 1);
      background: var(--bar-color, var(--zen-primary));
      box-shadow: 0 0 20px color-mix(in srgb, var(--bar-color, var(--zen-primary)) 40%, transparent);
    }

    .bar::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        180deg,
        rgba(255,255,255,0.2) 0%,
        transparent 50%,
        rgba(0,0,0,0.1) 100%
      );
      border-radius: inherit;
    }

    .value {
      position: absolute;
      top: -28px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--zen-text-1);
      opacity: 0;
      transition: opacity 0.3s 0.8s;
    }

    .bar-container:hover .value,
    .chart.visible .value {
      opacity: 1;
    }

    .label {
      font-size: 0.75rem;
      color: var(--zen-text-2);
      text-align: center;
      white-space: nowrap;
    }

    .bar-container:hover .bar {
      filter: brightness(1.1);
      transform: scaleY(1.02);
      transform-origin: bottom;
    }

    .chart.horizontal {
      flex-direction: column;
      height: auto;
      align-items: stretch;
    }

    .chart.horizontal .bar-container {
      flex-direction: row;
      height: 36px;
      align-items: center;
    }

    .chart.horizontal .label {
      min-width: 100px;
      text-align: right;
      padding-right: 16px;
      flex-shrink: 0;
    }

    .chart.horizontal .bar-wrapper {
      flex: 1;
      display: flex;
      align-items: stretch;
      justify-content: flex-start;
    }

    .chart.horizontal .bar {
      height: 28px;
      width: 0;
      max-width: none;
      border-radius: 0 8px 8px 0;
      transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
      flex-shrink: 0;
    }

    .chart.horizontal .value {
      position: static;
      transform: none;
      margin-left: 12px;
      flex-shrink: 0;
    }

    .chart.horizontal .bar-container:hover .bar {
      transform: scaleX(1.02);
      transform-origin: left;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this._observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this._visible) {
          this._visible = true;
        }
      });
    }, { threshold: 0.2 });
    this._observer.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._observer?.disconnect();
  }

  render() {
    const max = this.maxValue || Math.max(...this.data.map(d => d.value), 1);
    const colors = ['#667eea', '#f093fb', '#4facfe', '#00f2fe', '#f5576c', '#feca57'];

    return html`
      <div class="chart ${this.horizontal ? 'horizontal' : ''} ${this._visible ? 'visible' : ''}">
        ${this.data.map((item, i) => {
      const percentage = (item.value / max) * 100;
      const color = item.color || colors[i % colors.length];

      const barStyle = this.horizontal
        ? `width: ${this._visible && this.animated ? percentage : 0}%; --bar-color: ${color};`
        : `height: ${this._visible && this.animated ? percentage : 0}%; --bar-color: ${color};`;

      return html`
            <div class="bar-container">
              ${this.horizontal ? html`<span class="label">${item.label}</span>` : ''}
              <div class="bar-wrapper">
                <div class="bar" style="${barStyle}"></div>
                ${this.showValues ? html`<span class="value">${item.value}</span>` : ''}
              </div>
              ${!this.horizontal ? html`<span class="label">${item.label}</span>` : ''}
            </div>
          `;
    })}
      </div>
    `;
  }
}
