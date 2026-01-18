import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('zen-gradient-blob')
export class ZenGradientBlob extends LitElement {
    @property({ type: String }) variant: 'purple' | 'ocean' | 'sunset' | 'aurora' = 'purple';
    @property({ type: Boolean }) interactive = false;
    @property({ type: Number }) speed = 1;

    static styles = css`
    :host {
      display: block;
      position: relative;
      overflow: hidden;
    }

    .container {
      position: relative;
      width: 100%;
      height: 100%;
      min-height: 400px;
    }

    .blob-wrapper {
      position: absolute;
      inset: 0;
      filter: blur(60px);
      opacity: 0.7;
    }

    .blob {
      position: absolute;
      border-radius: 50%;
      mix-blend-mode: screen;
    }

    /* Purple variant */
    :host([variant="purple"]) .blob-1 {
      width: 60%;
      height: 60%;
      top: 10%;
      left: 10%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      animation: blob-move-1 var(--duration) ease-in-out infinite;
    }

    :host([variant="purple"]) .blob-2 {
      width: 50%;
      height: 50%;
      top: 30%;
      right: 10%;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      animation: blob-move-2 var(--duration) ease-in-out infinite;
    }

    :host([variant="purple"]) .blob-3 {
      width: 40%;
      height: 40%;
      bottom: 10%;
      left: 30%;
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      animation: blob-move-3 var(--duration) ease-in-out infinite;
    }

    /* Ocean variant */
    :host([variant="ocean"]) .blob-1 {
      width: 60%;
      height: 60%;
      top: 10%;
      left: 10%;
      background: linear-gradient(135deg, #0077b6 0%, #00b4d8 100%);
      animation: blob-move-1 var(--duration) ease-in-out infinite;
    }

    :host([variant="ocean"]) .blob-2 {
      width: 50%;
      height: 50%;
      top: 30%;
      right: 10%;
      background: linear-gradient(135deg, #00b4d8 0%, #90e0ef 100%);
      animation: blob-move-2 var(--duration) ease-in-out infinite;
    }

    :host([variant="ocean"]) .blob-3 {
      width: 40%;
      height: 40%;
      bottom: 10%;
      left: 30%;
      background: linear-gradient(135deg, #caf0f8 0%, #03045e 100%);
      animation: blob-move-3 var(--duration) ease-in-out infinite;
    }

    /* Sunset variant */
    :host([variant="sunset"]) .blob-1 {
      width: 60%;
      height: 60%;
      top: 10%;
      left: 10%;
      background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
      animation: blob-move-1 var(--duration) ease-in-out infinite;
    }

    :host([variant="sunset"]) .blob-2 {
      width: 50%;
      height: 50%;
      top: 30%;
      right: 10%;
      background: linear-gradient(135deg, #ff9ff3 0%, #f368e0 100%);
      animation: blob-move-2 var(--duration) ease-in-out infinite;
    }

    :host([variant="sunset"]) .blob-3 {
      width: 40%;
      height: 40%;
      bottom: 10%;
      left: 30%;
      background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%);
      animation: blob-move-3 var(--duration) ease-in-out infinite;
    }

    /* Aurora variant */
    :host([variant="aurora"]) .blob-1 {
      width: 60%;
      height: 60%;
      top: 10%;
      left: 10%;
      background: linear-gradient(135deg, #00ff87 0%, #60efff 100%);
      animation: blob-move-1 var(--duration) ease-in-out infinite;
    }

    :host([variant="aurora"]) .blob-2 {
      width: 50%;
      height: 50%;
      top: 30%;
      right: 10%;
      background: linear-gradient(135deg, #0061ff 0%, #60efff 100%);
      animation: blob-move-2 var(--duration) ease-in-out infinite;
    }

    :host([variant="aurora"]) .blob-3 {
      width: 40%;
      height: 40%;
      bottom: 10%;
      left: 30%;
      background: linear-gradient(135deg, #ff00ff 0%, #00ff87 100%);
      animation: blob-move-3 var(--duration) ease-in-out infinite;
    }

    @keyframes blob-move-1 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      25% { transform: translate(10%, 15%) scale(1.1); }
      50% { transform: translate(5%, -10%) scale(0.95); }
      75% { transform: translate(-10%, 5%) scale(1.05); }
    }

    @keyframes blob-move-2 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      25% { transform: translate(-15%, 10%) scale(0.95); }
      50% { transform: translate(10%, 15%) scale(1.1); }
      75% { transform: translate(5%, -15%) scale(1); }
    }

    @keyframes blob-move-3 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      25% { transform: translate(15%, -10%) scale(1.05); }
      50% { transform: translate(-10%, -5%) scale(1); }
      75% { transform: translate(-5%, 20%) scale(0.95); }
    }

    .content {
      position: relative;
      z-index: 1;
      height: 100%;
    }

    /* Dark overlay for better readability */
    .overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.3);
      z-index: 0;
    }
  `;

    render() {
        const duration = 20 / this.speed;

        return html`
      <div class="container" style="--duration: ${duration}s;">
        <div class="blob-wrapper">
          <div class="blob blob-1"></div>
          <div class="blob blob-2"></div>
          <div class="blob blob-3"></div>
        </div>
        <div class="overlay"></div>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;
    }
}
