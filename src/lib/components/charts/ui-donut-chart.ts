import { LitElement, css, html, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

interface DonutData {
    label: string;
    value: number;
    color?: string;
}

@customElement('zen-donut-chart')
export class ZenDonutChart extends LitElement {
    @property({ type: Array }) data: DonutData[] = [];
    @property({ type: Number }) size = 200;
    @property({ type: Number }) thickness = 30;
    @property({ type: Boolean }) animated = true;
    @property({ type: Boolean }) showLegend = true;
    @property({ type: String }) centerLabel = '';
    @property({ type: String }) centerValue = '';

    @state() private _visible = false;
    @state() private _hoveredIndex = -1;
    private _observer: IntersectionObserver | null = null;

    static styles = css`
    :host {
      display: block;
    }

    .chart-wrapper {
      display: flex;
      align-items: center;
      gap: 32px;
      flex-wrap: wrap;
    }

    .donut-container {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    svg {
      transform: rotate(-90deg);
      filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.3));
    }

    .segment {
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .segment:hover {
      filter: brightness(1.2);
    }

    .segment.hovered {
      transform-origin: center;
    }

    .center-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      pointer-events: none;
    }

    .center-value {
      font-size: 2rem;
      font-weight: 800;
      color: var(--zen-text-1);
      line-height: 1;
    }

    .center-label {
      font-size: 0.75rem;
      color: var(--zen-text-2);
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 4px;
    }

    .legend {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      padding: 8px 12px;
      border-radius: 8px;
      transition: background 0.2s;
    }

    .legend-item:hover {
      background: var(--zen-glass-bg);
    }

    .legend-color {
      width: 16px;
      height: 16px;
      border-radius: 4px;
      flex-shrink: 0;
    }

    .legend-label {
      color: var(--zen-text-1);
      font-size: 0.875rem;
    }

    .legend-value {
      color: var(--zen-text-2);
      font-size: 0.875rem;
      margin-left: auto;
    }
  `;

    connectedCallback() {
        super.connectedCallback();
        this._observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this._visible) {
                    setTimeout(() => {
                        this._visible = true;
                    }, 100);
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
        const colors = ['#667eea', '#f093fb', '#4facfe', '#00f2fe', '#f5576c', '#feca57', '#10b981'];
        const total = this.data.reduce((sum, d) => sum + d.value, 0);
        const radius = (this.size - this.thickness) / 2;
        const circumference = 2 * Math.PI * radius;
        const center = this.size / 2;

        let offset = 0;
        const segments = this.data.map((item, i) => {
            const percentage = total > 0 ? (item.value / total) : 0;
            const dashLength = circumference * percentage;
            const color = item.color || colors[i % colors.length];

            const segment = {
                ...item,
                color,
                percentage,
                dashArray: `${this._visible ? dashLength : 0} ${circumference}`,
                dashOffset: -offset,
                delay: i * 0.1,
            };

            offset += dashLength;
            return segment;
        });

        return html`
      <div class="chart-wrapper">
        <div class="donut-container">
          <svg width="${this.size}" height="${this.size}" viewBox="0 0 ${this.size} ${this.size}">
            ${segments.map((seg, i) => svg`
              <circle
                class="segment ${this._hoveredIndex === i ? 'hovered' : ''}"
                cx="${center}"
                cy="${center}"
                r="${radius}"
                fill="none"
                stroke="${seg.color}"
                stroke-width="${this.thickness}"
                stroke-dasharray="${seg.dashArray}"
                stroke-dashoffset="${seg.dashOffset}"
                stroke-linecap="round"
                style="transition: stroke-dasharray 1s cubic-bezier(0.4, 0, 0.2, 1) ${seg.delay}s, filter 0.2s;"
                @mouseenter=${() => this._hoveredIndex = i}
                @mouseleave=${() => this._hoveredIndex = -1}
              />
            `)}
          </svg>
          
          ${this.centerValue || this.centerLabel ? html`
            <div class="center-content">
              ${this.centerValue ? html`<div class="center-value">${this.centerValue}</div>` : ''}
              ${this.centerLabel ? html`<div class="center-label">${this.centerLabel}</div>` : ''}
            </div>
          ` : ''}
        </div>
        
        ${this.showLegend ? html`
          <div class="legend">
            ${segments.map((seg, i) => html`
              <div 
                class="legend-item"
                @mouseenter=${() => this._hoveredIndex = i}
                @mouseleave=${() => this._hoveredIndex = -1}
              >
                <div class="legend-color" style="background: ${seg.color};"></div>
                <span class="legend-label">${seg.label}</span>
                <span class="legend-value">${Math.round(seg.percentage * 100)}%</span>
              </div>
            `)}
          </div>
        ` : ''}
      </div>
    `;
    }
}
