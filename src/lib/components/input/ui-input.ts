import { LitElement, css, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('zen-input')
export class ZenInput extends LitElement {
  @property({ type: String }) label = '';
  @property({ type: String }) placeholder = '';
  @property({ type: String }) value = '';
  @property({ type: String }) type = 'text';
  @property({ type: String }) error = ''; 
  @property({ type: String }) helper = ''; 
  @property({ type: Boolean }) disabled = false;

  @query('input') _input!: HTMLInputElement;

  
  @state() private _hasPrefix = false;
  @state() private _hasSuffix = false;

  static styles = css`
    :host {
      display: block;
      width: 100%;
      margin-bottom: 20px;
      font-family: var(--zen-font-family, sans-serif);
    }

    .wrapper {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    /* Input Container */
    .input-container {
      position: relative;
      background: var(--zen-glass-bg);
      border: 1px solid var(--zen-glass-border);
      border-radius: var(--zen-radius-md);
      transition: all 0.2s var(--zen-ease-out);
      display: flex;
      align-items: center;
      min-height: 56px; /* Explicit height for consistency */
    }

    .input-container:hover:not(.disabled) {
      background: var(--zen-glass-bg-hover);
      border-color: var(--zen-glass-border-hover);
    }

    .input-container.focused {
      border-color: var(--zen-primary);
      box-shadow: 0 0 0 2px rgba(var(--zen-primary-h), var(--zen-primary-s), var(--zen-primary-l), 0.2);
      background: var(--zen-glass-bg-hover);
    }

    .input-container.error {
      border-color: var(--zen-destructive);
      box-shadow: 0 0 0 1px rgba(var(--zen-destructive-h), 60%, 50%, 0.2);
    }

    .input-container.disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background: var(--zen-bg-1);
    }

    /* Actual Input */
    input {
      flex: 1;
      width: 100%;
      background: transparent;
      border: none;
      outline: none;
      padding: 24px 16px 8px; /* Room for floating label */
      font-size: 1rem;
      font-family: inherit;
      color: var(--zen-text-1);
      border-radius: var(--zen-radius-md);
      min-width: 0; /* Flexbox fix */
    }
    
    /* Adjust padding if prefix exists */
    .has-prefix input {
      padding-left: 0; /* Prefix takes the space */
    }

    input:disabled {
      cursor: not-allowed;
    }

    /* Floating Label */
    label {
      position: absolute;
      left: 16px;
      top: 18px;
      font-size: 1rem;
      color: var(--zen-text-2);
      pointer-events: none;
      transition: all 0.2s var(--zen-ease-out);
      transform-origin: left top;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: calc(100% - 32px);
    }
    
    .has-prefix label {
      left: 48px; /* Offset for icon */
    }

    input:focus ~ label,
    input:not(:placeholder-shown) ~ label {
      transform: translateY(-12px) scale(0.75);
      color: var(--zen-text-2);
    }
    
    /* Ensure label stays offset even when floating if prefix exists */
    .has-prefix input:focus ~ label,
    .has-prefix input:not(:placeholder-shown) ~ label {
       transform: translateX(-32px) translateY(-12px) scale(0.75);
    }

    .focused input:focus ~ label {
      color: var(--zen-primary);
    }
    .error input:focus ~ label {
      color: var(--zen-destructive);
    }

    /* Slots */
    .prefix, .suffix {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--zen-text-2);
      min-width: 40px;
      height: 100%;
      flex-shrink: 0; /* Prevent squashing */
      z-index: 2;
    }
    
    /* Ensure svg/icons scale correctly */
    .prefix ::slotted(*), .suffix ::slotted(*) { 
      width: 20px; 
      height: 20px; 
      flex-shrink: 0;
      display: block; /* Fixes some SVG alignment issues */
    }

    /* Message (Error/Helper) */
    .message {
      font-size: 0.8rem;
      padding-left: 4px;
      animation: slideDown 0.2s ease;
    }
    .message.error { color: var(--zen-destructive); }
    .message.helper { color: var(--zen-text-2); }
    
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  _handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(new CustomEvent('input', { detail: this.value }));
  }

  _handleFocus() {
    this.shadowRoot?.querySelector('.input-container')?.classList.add('focused');
  }

  _handleBlur() {
    this.shadowRoot?.querySelector('.input-container')?.classList.remove('focused');
  }

  _handleSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const hasNodes = slot.assignedNodes({ flatten: true }).length > 0;

    if (slot.name === 'prefix') this._hasPrefix = hasNodes;
    if (slot.name === 'suffix') this._hasSuffix = hasNodes;
    this.requestUpdate();
  }

  render() {
    const containerClasses = {
      'input-container': true,
      'error': !!this.error,
      'disabled': this.disabled,
      'has-prefix': this._hasPrefix,
      'has-suffix': this._hasSuffix,
    };

    return html`
      <div class="wrapper">
        <div class=${classMap(containerClasses)}>
          <div class="prefix" style="display: ${this._hasPrefix ? 'flex' : 'none'}">
            <slot name="prefix" @slotchange=${this._handleSlotChange}></slot>
          </div>
          
          <input 
            type="${this.type}" 
            .value="${this.value}" 
            placeholder=" " 
            ?disabled=${this.disabled}
            @input="${this._handleInput}"
            @focus="${this._handleFocus}"
            @blur="${this._handleBlur}"
          />
          
          <label>${this.label}</label>
          
          <div class="suffix" style="display: ${this._hasSuffix ? 'flex' : 'none'}">
            <slot name="suffix" @slotchange=${this._handleSlotChange}></slot>
          </div>
        </div>
        
        ${this.error
        ? html`<div class="message error">${this.error}</div>`
        : this.helper
          ? html`<div class="message helper">${this.helper}</div>`
          : ''
      }
      </div>
    `;
  }
}
