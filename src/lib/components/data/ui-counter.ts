import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('zen-counter')
export class ZenCounter extends LitElement {
    @property({ type: Number }) value = 0;
    @property({ type: Number }) duration = 2000;
    @property({ type: String }) prefix = '';
    @property({ type: String }) suffix = '';
    @property({ type: Number }) decimals = 0;
    @property({ type: Boolean }) autoStart = true;

    @state() private _displayValue = 0;
    @state() private _hasStarted = false;

    private _animationFrame: number | null = null;
    private _observer: IntersectionObserver | null = null;

    connectedCallback() {
        super.connectedCallback();

        
        this._observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this._hasStarted && this.autoStart) {
                    this._startAnimation();
                }
            });
        }, { threshold: 0.1 });

        this._observer.observe(this);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this._animationFrame) {
            cancelAnimationFrame(this._animationFrame);
        }
        if (this._observer) {
            this._observer.disconnect();
        }
    }

    private _startAnimation() {
        this._hasStarted = true;
        const startTime = performance.now();
        const startValue = 0;
        const endValue = this.value;

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / this.duration, 1);

            
            const easeOut = 1 - Math.pow(1 - progress, 3);

            this._displayValue = startValue + (endValue - startValue) * easeOut;

            if (progress < 1) {
                this._animationFrame = requestAnimationFrame(animate);
            } else {
                this._displayValue = endValue;
            }
        };

        this._animationFrame = requestAnimationFrame(animate);
    }

    public start() {
        this._hasStarted = false;
        this._displayValue = 0;
        this._startAnimation();
    }

    static styles = css`
    :host {
      display: inline-block;
      font-variant-numeric: tabular-nums;
    }

    .counter {
      display: inline-flex;
      align-items: baseline;
    }

    .value {
      font-weight: inherit;
    }

    .prefix, .suffix {
      opacity: 0.7;
    }
  `;

    render() {
        const formattedValue = this._displayValue.toFixed(this.decimals);

        
        const parts = formattedValue.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        const displayString = parts.join('.');

        return html`
      <span class="counter">
        ${this.prefix ? html`<span class="prefix">${this.prefix}</span>` : ''}
        <span class="value">${displayString}</span>
        ${this.suffix ? html`<span class="suffix">${this.suffix}</span>` : ''}
      </span>
    `;
    }
}
