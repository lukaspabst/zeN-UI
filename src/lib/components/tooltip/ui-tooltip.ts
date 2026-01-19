import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('zen-tooltip')
export class ZenTooltip extends LitElement {
  @property({ type: String }) content = '';
  @property({ type: String }) position = 'top';




  static styles = css`
    :host {
      display: inline-block;
    }
  `;

  private _tooltipEl: HTMLElement | null = null;

  disconnectedCallback() {
    super.disconnectedCallback();
    this._removeTooltip();
  }

  _show() {
    this._createTooltip();
    this._updatePosition();

    if (this._tooltipEl) {
      // Force reflow
      this._tooltipEl.getBoundingClientRect();

      requestAnimationFrame(() => {
        if (this._tooltipEl) {
          this._tooltipEl.style.opacity = '1';
          this._tooltipEl.style.transform = 'scale(1)';
        }
      });
    }
  }

  _hide() {
    if (this._tooltipEl) {
      this._tooltipEl.style.opacity = '0';
      this._tooltipEl.style.transform = 'scale(0.95)';

      // Wait for transition to finish before removing
      setTimeout(() => this._removeTooltip(), 200);
    }
  }

  _createTooltip() {
    if (this._tooltipEl) return;

    this._tooltipEl = document.createElement('div');
    this._tooltipEl.className = 'zen-tooltip-portal';
    this._tooltipEl.textContent = this.content;

    // Copy styles from component to portal
    Object.assign(this._tooltipEl.style, {
      position: 'fixed',
      background: 'var(--zen-bg-2)',
      color: 'var(--zen-text-1)',
      border: '1px solid var(--zen-glass-border)',
      padding: '6px 12px',
      fontSize: '0.85rem',
      borderRadius: '6px',
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
      zIndex: '10000',
      boxShadow: 'var(--zen-shadow-md)',
      fontFamily: 'var(--zen-font-family, sans-serif)',
      fontWeight: '500',
      opacity: '0',
      transform: 'scale(0.95)',
      transition: 'opacity 0.2s ease, transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      top: 'var(--y, 0)',
      left: 'var(--x, 0)'
    });

    document.body.appendChild(this._tooltipEl);
  }

  _removeTooltip() {
    if (this._tooltipEl && this._tooltipEl.parentNode) {
      this._tooltipEl.parentNode.removeChild(this._tooltipEl);
    }
    this._tooltipEl = null;
  }

  _updatePosition() {
    const trigger = this; // The host element is the trigger
    if (!trigger || !this._tooltipEl) return;

    const rect = trigger.getBoundingClientRect();
    const tooltipRect = this._tooltipEl.getBoundingClientRect();

    let top = 0;
    let left = 0;
    const gap = 8;

    // Default dimensions if not yet rendered (approximation)
    const width = tooltipRect.width || 100;
    const height = tooltipRect.height || 30;

    switch (this.position) {
      case 'top':
        top = rect.top - gap - height;
        left = rect.left + (rect.width / 2) - (width / 2);
        break;
      case 'bottom':
        top = rect.bottom + gap;
        left = rect.left + (rect.width / 2) - (width / 2);
        break;
      default:
        top = rect.top - gap - height;
        left = rect.left + (rect.width / 2) - (width / 2);
    }

    this._tooltipEl.style.setProperty('--x', `${left}px`);
    this._tooltipEl.style.setProperty('--y', `${top}px`);
  }

  render() {
    return html`
      <div class="trigger" 
           @mouseenter=${this._show} 
           @mouseleave=${this._hide} 
           @focusin=${this._show}
           @focusout=${this._hide}>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'zen-tooltip': ZenTooltip;
  }
}
