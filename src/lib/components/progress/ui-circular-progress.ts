import { LitElement, css, html, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('zen-circular-progress')
export class ZenCircularProgress extends LitElement {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) size = 120;
  @property({ type: Number }) strokeWidth = 8;
  @property({ type: Boolean }) indeterminate = false;
  @property({ type: Boolean }) showValue = true;
  @property({ type: String }) variant: 'default' | 'gradient' | 'glow' = 'default';
  @property({ type: String }) color: 'primary' | 'success' | 'warning' | 'danger' = 'primary';

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      overflow: visible;
    }

    .wrapper {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: visible;
    }

    svg {
      transform: rotate(-90deg);
      overflow: visible;
    }

    .track {
      fill: none;
      stroke: var(--zen-glass-border);
    }

    .fill {
      fill: none;
      stroke-linecap: round;
      transition: stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Colors */
    :host([color="primary"]) .fill { stroke: var(--zen-primary); }
    :host([color="success"]) .fill { stroke: #10b981; }
    :host([color="warning"]) .fill { stroke: #f59e0b; }
    :host([color="danger"]) .fill { stroke: #ef4444; }

    /* Glow variant */
    :host([variant="glow"]) .fill {
      filter: drop-shadow(0 0 6px currentColor) drop-shadow(0 0 12px currentColor);
    }

    :host([color="primary"][variant="glow"]) .fill { 
      filter: drop-shadow(0 0 6px var(--zen-primary)) drop-shadow(0 0 12px var(--zen-primary));
    }
    :host([color="success"][variant="glow"]) .fill { 
      filter: drop-shadow(0 0 6px #10b981) drop-shadow(0 0 12px #10b981);
    }
    :host([color="warning"][variant="glow"]) .fill { 
      filter: drop-shadow(0 0 6px #f59e0b) drop-shadow(0 0 12px #f59e0b); 
    }
    :host([color="danger"][variant="glow"]) .fill { 
      filter: drop-shadow(0 0 6px #ef4444) drop-shadow(0 0 12px #ef4444);
    }

    /* Indeterminate */
    :host([indeterminate]) svg {
      animation: spin 1.4s linear infinite;
    }

    :host([indeterminate]) .fill {
      animation: dash 1.4s ease-in-out infinite;
    }

    @keyframes spin {
      100% { transform: rotate(270deg); }
    }

    @keyframes dash {
      0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 90, 200;
        stroke-dashoffset: -35;
      }
      100% {
        stroke-dasharray: 90, 200;
        stroke-dashoffset: -125;
      }
    }

    .value {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      color: var(--zen-text-1);
      font-variant-numeric: tabular-nums;
    }

    .value-number {
      font-size: calc(var(--size) * 0.22);
      line-height: 1;
    }

    .value-percent {
      font-size: calc(var(--size) * 0.12);
      opacity: 0.6;
      font-weight: 500;
    }
  `;

  render() {
    
    const padding = this.variant === 'glow' ? 20 : 0;
    const svgSize = this.size + padding * 2;
    const radius = (this.size - this.strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const percentage = Math.min(100, Math.max(0, (this.value / this.max) * 100));
    const offset = circumference - (percentage / 100) * circumference;

    const center = svgSize / 2;

    return html`
      <div class="wrapper" style="--size: ${this.size}px;">
        <svg width="${svgSize}" height="${svgSize}" viewBox="0 0 ${svgSize} ${svgSize}" style="margin: -${padding}px;">
          ${this.variant === 'gradient' ? svg`
            <defs>
              <linearGradient id="gradient-${this.size}" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color: #667eea" />
                <stop offset="50%" style="stop-color: #f093fb" />
                <stop offset="100%" style="stop-color: #4facfe" />
              </linearGradient>
            </defs>
          ` : ''}
          
          <circle
            class="track"
            cx="${center}"
            cy="${center}"
            r="${radius}"
            stroke-width="${this.strokeWidth}"
          />
          
          <circle
            class="fill"
            cx="${center}"
            cy="${center}"
            r="${radius}"
            stroke-width="${this.strokeWidth}"
            stroke-dasharray="${circumference}"
            stroke-dashoffset="${this.indeterminate ? 0 : offset}"
            style="${this.variant === 'gradient' ? `stroke: url(#gradient-${this.size})` : ''}"
          />
        </svg>
        
        ${this.showValue && !this.indeterminate ? html`
          <div class="value">
            <span class="value-number">${Math.round(percentage)}</span>
            <span class="value-percent">%</span>
          </div>
        ` : ''}
      </div>
    `;
  }
}
