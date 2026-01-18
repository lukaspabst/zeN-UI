import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('zen-text')
export class ZenText extends LitElement {
  @property({ type: String }) variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body-lg' | 'body' | 'body-sm' | 'caption' = 'body';
  @property({ type: String }) weight: 'light' | 'regular' | 'medium' | 'semibold' | 'bold' = 'regular';
  @property({ type: String }) gradient: 'none' | 'aurora' | 'gold' | 'blue' = 'none';
  @property({ type: Boolean }) italic = false;
  @property({ type: Boolean }) mono = false;

  static styles = css`
    :host {
      display: block;
      /* Default to inheritance but apply localized vars */
    }

    /* Base Styles */
    .text {
      margin: 0;
      font-family: var(--zen-font-family, inherit);
      line-height: var(--zen-leading-normal);
      color: var(--zen-text-1);
      transition: all 0.3s ease;
    }

    /* Variants */
    .h1 { font-size: 3.5rem; letter-spacing: -0.02em; line-height: 1.1; font-weight: 700; }
    .h2 { font-size: 2.5rem; letter-spacing: -0.01em; line-height: 1.2; font-weight: 700; }
    .h3 { font-size: 2rem; letter-spacing: -0.01em; line-height: 1.25; font-weight: 600; }
    .h4 { font-size: 1.5rem; letter-spacing: -0.01em; line-height: 1.3; font-weight: 600; }
    .h5 { font-size: 1.25rem; letter-spacing: 0; line-height: 1.4; font-weight: 600; }
    .h6 { font-size: 1.125rem; letter-spacing: 0; line-height: 1.4; font-weight: 600; }
    
    .body-lg { font-size: 1.125rem; line-height: 1.6; }
    .body { font-size: 1rem; line-height: 1.6; }
    .body-sm { font-size: 0.875rem; line-height: 1.5; color: var(--zen-text-2); }
    .caption { font-size: 0.75rem; line-height: 1.4; color: var(--zen-text-2); letter-spacing: 0.05em; text-transform: uppercase; }

    /* Weights */
    .w-light { font-weight: 300; }
    .w-regular { font-weight: 400; }
    .w-medium { font-weight: 500; }
    .w-semibold { font-weight: 600; }
    .w-bold { font-weight: 700; }

    /* Styles */
    .italic { font-style: italic; }
    .mono { font-family: var(--zen-font-mono, monospace); }

    /* Gradients */
    .gradient-aurora {
      background: linear-gradient(135deg, #00C6FF 0%, #0072FF 50%, #D585FF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .gradient-gold {
      background: linear-gradient(135deg, #FFD700 0%, #FDB931 50%, #9E7D2D 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .gradient-blue {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  `;

  render() {
    const classes = {
      text: true,
      [this.variant]: true,
      [`w-${this.weight}`]: true,
      [`gradient-${this.gradient}`]: this.gradient !== 'none',
      italic: this.italic,
      mono: this.mono,
    };

    // Use appropriate tag based on variant
    if (this.variant.startsWith('h')) {
      // Dynamic tag creation isn't directly supported in lit html template literal nicely without unsafeStatic
      // For simplicity/safety, we'll wrap content in span (or div) with correct role/aria, 
      // or just use a span for all and rely on classes + slot.
      // However, for SEO, actual layout, let's just output a span with role heading for now or generic container.
      // Better approach: Since we can't easily do dynamic tags without unsafeHTML (which puts safety on us),
      // we'll structure it as a container.
      // Actually, standard web component practice often just slots content. 
      // But here we want to STYLIZE the content.
      return html`<p class=${classMap(classes)} role="heading" aria-level="${this.variant.replace('h', '')}"><slot></slot></p>`;
    }

    return html`<p class=${classMap(classes)}><slot></slot></p>`;
  }
}
