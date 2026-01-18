import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('zen-tooltip')
export class ZenTooltip extends LitElement {
  @property({ type: String }) content = '';
  @property({ type: String }) position = 'top'; 

  @state() private _visible = false;
  @state() private _x = 0;
  @state() private _y = 0;

  static styles = css`
    :host {
      display: inline-block;
    }

    .tooltip {
      position: fixed;
      /* Top/Left set via inline style, no transition on these to avoid "flying" */
      background: #18181b;
      color: #ffffff;
      border: 1px solid rgba(255,255,255,0.2);
      padding: 6px 12px;
      font-size: 0.85rem;
      border-radius: 6px;
      white-space: nowrap;
      pointer-events: none;
      z-index: 9999;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      font-family: var(--zen-font-family, sans-serif);
      font-weight: 500;
      
      opacity: 0;
      scale: 0.95; /* Use scale property if supported, or transform */
      transform-origin: center bottom; /* Dynamic based on pos? Left default for now */
      transition: opacity 0.2s ease, scale 0.2s var(--zen-ease-spring), transform 0.2s var(--zen-ease-spring);
    }
    
    .tooltip.visible {
      opacity: 1;
      scale: 1;
    }
  `;

  _show() {
    this._updatePosition();
    this._visible = true;
  }

  _hide() {
    this._visible = false;
  }

  _updatePosition() {
    const trigger = this.shadowRoot?.querySelector('slot')?.assignedElements()[0]
      || this.shadowRoot?.querySelector('.trigger');

    if (!trigger) return;

    const rect = (trigger as Element).getBoundingClientRect();
    

    
    let top = 0;
    let left = 0;

    
    
    
    

    const gap = 8;

    switch (this.position) {
      case 'top':
        top = rect.top - gap;
        left = rect.left + rect.width / 2;
        break;
      case 'bottom':
        top = rect.bottom + gap;
        left = rect.left + rect.width / 2;
        break;
      
    }

    this._x = left;
    this._y = top;
  }

  render() {
    

    let transformBase = '';
    if (this.position === 'top') transformBase = 'translate(-50%, -100%)';
    if (this.position === 'bottom') transformBase = 'translate(-50%, 0)';

    const style = `
      top: ${this._y}px; 
      left: ${this._x}px; 
      transform: ${transformBase} ${this._visible ? 'scale(1)' : 'scale(0.95)'};
    `;

    return html`
      <div class="trigger" 
           @mouseenter=${this._show} 
           @mouseleave=${this._hide} 
           @focusin=${this._show}
           @focusout=${this._hide}>
        <slot></slot>
      </div>
      
      <div id="tooltip" 
           class="tooltip ${this._visible ? 'visible' : ''}" 
           style="${style}">
        ${this.content}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'zen-tooltip': ZenTooltip;
  }
}
