import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('zen-text-reveal')
export class ZenTextReveal extends LitElement {
  @property({ type: String }) variant: 'slide' | 'fade' | 'blur' = 'slide';
  @property({ type: Number }) delay = 0;
  @property({ type: Number }) duration = 0.6;
  @property({ type: Boolean, reflect: true }) trigger = false;

  @state() private _initialized = false;

  static styles = css`
    :host {
      display: inline-block;
      overflow: hidden;
    }

    .wrapper {
      display: inline-block;
      will-change: transform, opacity, filter;
    }

    /* Initial state - hidden */
    .wrapper.hidden {
      opacity: 0;
    }

    /* Slide variant */
    :host([variant="slide"]) .wrapper.hidden {
      transform: translateY(100%);
    }

    :host([variant="slide"]) .wrapper.visible {
      transform: translateY(0);
      opacity: 1;
    }

    /* Fade variant */
    :host([variant="fade"]) .wrapper.hidden {
      transform: translateY(20px);
    }

    :host([variant="fade"]) .wrapper.visible {
      transform: translateY(0);
      opacity: 1;
    }

    /* Blur variant */
    :host([variant="blur"]) .wrapper.hidden {
      filter: blur(10px);
      transform: scale(0.95);
    }

    :host([variant="blur"]) .wrapper.visible {
      filter: blur(0);
      transform: scale(1);
      opacity: 1;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    
    requestAnimationFrame(() => {
      this._initialized = true;
    });
  }

  render() {
    const transitionStyle = this._initialized
      ? `transition: all ${this.duration}s cubic-bezier(0.4, 0, 0.2, 1) ${this.delay}s;`
      : '';

    const stateClass = this.trigger ? 'visible' : 'hidden';

    return html`
      <span class="wrapper ${stateClass}" style="${transitionStyle}">
        <slot></slot>
      </span>
    `;
  }
}

