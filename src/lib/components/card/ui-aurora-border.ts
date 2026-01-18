import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('zen-aurora-border')
export class ZenAuroraBorder extends LitElement {
    @property({ type: Number }) borderWidth = 2;
    @property({ type: Number }) blur = 10;
    @property({ type: String }) variant: 'rainbow' | 'neon' | 'fire' | 'ocean' = 'rainbow';

    @state() private _isHovered = false;

    static styles = css`
    :host {
      display: block;
    }

    .wrapper {
      position: relative;
      border-radius: var(--zen-radius-lg);
      padding: var(--border-width, 2px);
      overflow: hidden;
    }

    /* The moving gradient border */
    .border-animation {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      z-index: 0;
    }

    /* Rainbow variant */
    :host([variant="rainbow"]) .border-animation {
      background: conic-gradient(
        from var(--angle, 0deg),
        #ff0000,
        #ff8800,
        #ffff00,
        #00ff00,
        #00ffff,
        #0088ff,
        #8800ff,
        #ff00ff,
        #ff0000
      );
      animation: rotate 3s linear infinite;
    }

    /* Neon variant */
    :host([variant="neon"]) .border-animation {
      background: conic-gradient(
        from var(--angle, 0deg),
        #00ffff,
        #ff00ff,
        #00ffff,
        #ff00ff,
        #00ffff
      );
      animation: rotate 2s linear infinite;
    }

    /* Fire variant */
    :host([variant="fire"]) .border-animation {
      background: conic-gradient(
        from var(--angle, 0deg),
        #ff0000,
        #ff4400,
        #ff8800,
        #ffcc00,
        #ffff00,
        #ffcc00,
        #ff8800,
        #ff4400,
        #ff0000
      );
      animation: rotate 2.5s linear infinite;
    }

    /* Ocean variant */
    :host([variant="ocean"]) .border-animation {
      background: conic-gradient(
        from var(--angle, 0deg),
        #00b4d8,
        #0077b6,
        #03045e,
        #023e8a,
        #0096c7,
        #00b4d8
      );
      animation: rotate 4s linear infinite;
    }

    @keyframes rotate {
      to { --angle: 360deg; }
    }

    @property --angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }

    /* Blur effect layer */
    .border-blur {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      filter: blur(var(--blur, 10px));
      opacity: 0.6;
      transition: opacity 0.3s;
    }

    .wrapper:hover .border-blur {
      opacity: 1;
    }

    :host([variant="rainbow"]) .border-blur {
      background: conic-gradient(
        from var(--angle, 0deg),
        #ff0000,
        #ff8800,
        #ffff00,
        #00ff00,
        #00ffff,
        #0088ff,
        #8800ff,
        #ff00ff,
        #ff0000
      );
      animation: rotate 3s linear infinite;
    }

    :host([variant="neon"]) .border-blur {
      background: conic-gradient(
        from var(--angle, 0deg),
        #00ffff,
        #ff00ff,
        #00ffff,
        #ff00ff,
        #00ffff
      );
      animation: rotate 2s linear infinite;
    }

    :host([variant="fire"]) .border-blur {
      background: conic-gradient(
        from var(--angle, 0deg),
        #ff0000,
        #ff4400,
        #ff8800,
        #ffcc00,
        #ff0000
      );
      animation: rotate 2.5s linear infinite;
    }

    :host([variant="ocean"]) .border-blur {
      background: conic-gradient(
        from var(--angle, 0deg),
        #00b4d8,
        #0077b6,
        #03045e,
        #0096c7,
        #00b4d8
      );
      animation: rotate 4s linear infinite;
    }

    /* Content */
    .content {
      position: relative;
      z-index: 1;
      background: var(--zen-bg-1, #0a0a0a);
      border-radius: calc(var(--zen-radius-lg) - var(--border-width, 2px));
      overflow: hidden;
    }
  `;

    render() {
        return html`
      <div 
        class="wrapper" 
        style="--border-width: ${this.borderWidth}px; --blur: ${this.blur}px;"
        @mouseenter=${() => this._isHovered = true}
        @mouseleave=${() => this._isHovered = false}
      >
        <div class="border-animation"></div>
        <div class="border-blur"></div>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;
    }
}
