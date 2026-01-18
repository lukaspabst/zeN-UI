import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('zen-progress')
export class ZenProgress extends LitElement {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Boolean }) indeterminate = false;
  @property({ type: String }) variant: 'default' | 'gradient' | 'striped' | 'pulse' | 'glow' = 'default';
  @property({ type: String }) size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @property({ type: Boolean }) showValue = false;
  @property({ type: String }) color: 'primary' | 'success' | 'warning' | 'danger' = 'primary';

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .wrapper {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .track {
      flex: 1;
      background: var(--zen-glass-border);
      border-radius: 99px;
      overflow: hidden;
      position: relative;
    }

    /* Sizes */
    :host([size="sm"]) .track { height: 4px; }
    :host([size="md"]) .track { height: 8px; }
    :host([size="lg"]) .track { height: 12px; }
    :host([size="xl"]) .track { height: 20px; }

    .fill {
      height: 100%;
      border-radius: 99px;
      transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
    }

    /* Color variants */
    :host([color="primary"]) .fill { 
      --fill-color: var(--zen-primary);
      --fill-glow: var(--zen-primary);
    }
    :host([color="success"]) .fill { 
      --fill-color: #10b981;
      --fill-glow: #10b981;
    }
    :host([color="warning"]) .fill { 
      --fill-color: #f59e0b;
      --fill-glow: #f59e0b;
    }
    :host([color="danger"]) .fill { 
      --fill-color: #ef4444;
      --fill-glow: #ef4444;
    }

    /* Default variant */
    :host([variant="default"]) .fill {
      background: var(--fill-color, var(--zen-primary));
      box-shadow: 0 0 10px var(--fill-glow, var(--zen-primary));
    }

    /* Gradient variant - beautiful rainbow */
    :host([variant="gradient"]) .fill {
      background: linear-gradient(
        90deg, 
        #667eea 0%, 
        #764ba2 25%, 
        #f093fb 50%, 
        #f5576c 75%,
        #4facfe 100%
      );
      background-size: 200% 100%;
      animation: gradientShift 3s ease infinite;
      box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
    }

    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    /* Striped animated variant */
    :host([variant="striped"]) .fill {
      background: repeating-linear-gradient(
        45deg,
        var(--fill-color, var(--zen-primary)),
        var(--fill-color, var(--zen-primary)) 10px,
        rgba(255,255,255,0.2) 10px,
        rgba(255,255,255,0.2) 20px
      );
      background-size: 200% 100%;
      animation: stripedMove 1s linear infinite;
      box-shadow: 0 0 15px var(--fill-glow, var(--zen-primary));
    }

    @keyframes stripedMove {
      0% { background-position: 0 0; }
      100% { background-position: 40px 0; }
    }

    /* Pulse variant */
    :host([variant="pulse"]) .fill {
      background: var(--fill-color, var(--zen-primary));
      animation: pulse 1.5s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { 
        opacity: 1;
        box-shadow: 0 0 10px var(--fill-glow, var(--zen-primary));
      }
      50% { 
        opacity: 0.7;
        box-shadow: 0 0 25px var(--fill-glow, var(--zen-primary)), 
                    0 0 40px var(--fill-glow, var(--zen-primary));
      }
    }

    /* Glow variant - intense neon effect */
    :host([variant="glow"]) .fill {
      background: linear-gradient(
        90deg,
        var(--fill-color, var(--zen-primary)),
        rgba(255,255,255,0.8),
        var(--fill-color, var(--zen-primary))
      );
      background-size: 200% 100%;
      animation: glowShimmer 2s ease-in-out infinite;
      box-shadow: 
        0 0 10px var(--fill-glow, var(--zen-primary)),
        0 0 20px var(--fill-glow, var(--zen-primary)),
        0 0 30px var(--fill-glow, var(--zen-primary));
    }

    @keyframes glowShimmer {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }

    /* Indeterminate Animation */
    :host([indeterminate]) .fill {
      width: 30% !important;
      position: absolute;
      animation: indeterminate 1.5s infinite cubic-bezier(0.65, 0.815, 0.735, 0.395);
      background: linear-gradient(90deg, 
        var(--fill-color, var(--zen-primary)), 
        rgba(255,255,255,0.5), 
        var(--fill-color, var(--zen-primary))
      );
    }

    @keyframes indeterminate {
      0% { left: -35%; right: 100%; }
      60% { left: 100%; right: -90%; }
      100% { left: 100%; right: -90%; }
    }

    .value {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--zen-text-1);
      min-width: 3em;
      text-align: right;
      font-variant-numeric: tabular-nums;
    }

    :host([size="sm"]) .value { font-size: 0.75rem; }
    :host([size="lg"]) .value { font-size: 1rem; }
    :host([size="xl"]) .value { font-size: 1.125rem; }
  `;

  render() {
    const percentage = Math.min(100, Math.max(0, (this.value / this.max) * 100));
    return html`
      <div class="wrapper">
        <div class="track">
          <div class="fill" style="${!this.indeterminate ? `width: ${percentage}%` : ''}"></div>
        </div>
        ${this.showValue ? html`<span class="value">${Math.round(percentage)}%</span>` : ''}
      </div>
    `;
  }
}
