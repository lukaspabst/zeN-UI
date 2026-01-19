import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('zen-flip-card')
export class ZenFlipCard extends LitElement {
  @property({ type: String, reflect: true }) trigger: 'hover' | 'click' = 'hover';
  @property({ type: String, reflect: true }) direction: 'horizontal' | 'vertical' = 'horizontal';
  @property({ type: Number }) duration = 0.6;

  @state() private _isFlipped = false;
  @state() private _isHovered = false;

  static styles = css`
    :host {
      display: block;
      perspective: 1000px;
    }

    .card {
      position: relative;
      width: 100%;
      height: 100%;
      transition: transform var(--duration, 0.6s) cubic-bezier(0.4, 0, 0.2, 1);
      transform-style: preserve-3d;
      cursor: pointer;
    }

    /* Horizontal flip */
    :host([direction="horizontal"]) .card.flipped {
      transform: rotateY(180deg);
    }

    /* Vertical flip */
    :host([direction="vertical"]) .card.flipped {
      transform: rotateX(180deg);
    }

    .face {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      border-radius: var(--zen-radius-lg);
      overflow: hidden;
    }

    .front {
      background: var(--zen-glass-bg);
      border: 1px solid var(--zen-glass-border);
    }

    .back {
      background: var(--zen-glass-bg);
      border: 1px solid var(--zen-glass-border);
    }

    :host([direction="horizontal"]) .back {
      transform: rotateY(180deg);
    }

    :host([direction="vertical"]) .back {
      transform: rotateX(180deg);
    }

    /* Glow effect on hover */
    .card::before {
      content: '';
      position: absolute;
      inset: -2px;
      border-radius: calc(var(--zen-radius-lg) + 2px);
      background: linear-gradient(
        135deg, 
        hsl(var(--zen-primary-h), var(--zen-primary-s), var(--zen-primary-l)),
        hsl(calc(var(--zen-primary-h) + 40), 70%, 60%),
        hsl(calc(var(--zen-primary-h) + 80), 80%, 70%)
      );
      opacity: 0;
      transition: opacity 0.3s;
      z-index: -1;
    }

    .card.hovered::before {
      opacity: 0.5;
      filter: blur(10px);
    }
  `;

  private _handleMouseEnter() {
    this._isHovered = true;
    if (this.trigger === 'hover') {
      this._isFlipped = true;
    }
  }

  private _handleMouseLeave() {
    this._isHovered = false;
    if (this.trigger === 'hover') {
      this._isFlipped = false;
    }
  }

  private _handleClick() {
    if (this.trigger === 'click') {
      this._isFlipped = !this._isFlipped;
    }
  }

  render() {
    return html`
      <div 
        class="card ${this._isFlipped ? 'flipped' : ''} ${this._isHovered ? 'hovered' : ''}"
        style="--duration: ${this.duration}s;"
        @mouseenter=${this._handleMouseEnter}
        @mouseleave=${this._handleMouseLeave}
        @click=${this._handleClick}
      >
        <div class="face front">
          <slot name="front"></slot>
        </div>
        <div class="face back">
          <slot name="back"></slot>
        </div>
      </div>
    `;
  }
}
