import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('zen-select')
export class ZenSelect extends LitElement {
    @property({ type: String }) label = '';
    @property({ type: String }) value = '';
    @property({ type: Array }) options: { label: string; value: string }[] = [];
    @property({ type: String }) placeholder = 'Select an option';
    @property({ type: Boolean }) disabled = false;

    @state() private _open = false;

    static styles = css`
    :host {
      display: block;
      font-family: var(--zen-font-family);
      position: relative;
    }

    /* Trigger */
    .trigger {
      background: var(--zen-glass-bg);
      border: 1px solid var(--zen-glass-border);
      border-radius: var(--zen-radius-md);
      padding: 12px 16px;
      color: var(--zen-text-1);
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.2s ease;
      user-select: none;
      min-height: 46px; /* Match input height roughly */
      box-sizing: border-box;
    }

    :host(:not([disabled])) .trigger:hover {
      background: var(--zen-glass-bg-hover);
      border-color: var(--zen-glass-border-hover);
    }
    
    .trigger.open {
      border-color: var(--zen-primary);
    }
    
    :host([disabled]) .trigger {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Dropdown */
    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      margin-top: 8px;
      background: var(--zen-bg-1);
      border: 1px solid var(--zen-glass-border);
      border-radius: var(--zen-radius-md);
      box-shadow: var(--zen-shadow-lg);
      z-index: 100;
      opacity: 0;
      transform: translateY(-10px);
      pointer-events: none;
      transition: all 0.2s var(--zen-ease-spring);
      max-height: 200px;
      overflow-y: auto;
    }

    .dropdown.open {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    .option {
      padding: 10px 16px;
      color: var(--zen-text-2);
      cursor: pointer;
      transition: background 0.1s;
    }

    .option:hover {
      background: var(--zen-glass-bg-hover);
      color: var(--zen-text-1);
    }

    .option.selected {
      background: rgba(var(--zen-primary-h), var(--zen-primary-s), var(--zen-primary-l), 0.1);
      color: var(--zen-primary);
    }
    
    .label {
      margin-bottom: 8px;
      display: block;
      color: var(--zen-text-2);
      font-size: 0.9rem;
    }
    
    .arrow {
      transition: transform 0.2s;
      font-size: 0.8rem;
    }
    .trigger.open .arrow { transform: rotate(180deg); }
  `;

    _toggle() {
        if (this.disabled) return;
        this._open = !this._open;
    }

    _select(value: string) {
        this.value = value;
        this._open = false;
        this.dispatchEvent(new CustomEvent('change', { detail: this.value }));
    }

    
    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('click', this._onClickOutside);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('click', this._onClickOutside);
    }

    _onClickOutside = (e: MouseEvent) => {
        
        if (!this.contains(e.target as Node)) {
            this._open = false;
        }
    }

    render() {
        const selectedOption = this.options.find(o => o.value === this.value);

        return html`
      ${this.label ? html`<span class="label">${this.label}</span>` : ''}
      <div class="trigger ${this._open ? 'open' : ''}" @click=${this._toggle}>
        <span>${selectedOption ? selectedOption.label : this.placeholder}</span>
        <span class="arrow">▼</span>
      </div>
      
      <div class="dropdown ${this._open ? 'open' : ''}">
        ${this.options.map(opt => html`
          <div 
            class="option ${this.value === opt.value ? 'selected' : ''}" 
            @click=${() => this._select(opt.value)}
          >
            ${opt.label}
          </div>
        `)}
      </div>
    `;
    }
}
