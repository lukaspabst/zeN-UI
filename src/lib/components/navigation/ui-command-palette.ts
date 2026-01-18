import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

interface CommandItem {
    id: string;
    label: string;
    icon?: string;
    shortcut?: string;
    group?: string;
}

@customElement('zen-command-palette')
export class ZenCommandPalette extends LitElement {
    @property({ type: Boolean, reflect: true }) open = false;
    @property({ type: Array }) items: CommandItem[] = [];
    @property({ type: String }) placeholder = 'Type a command or search...';

    @state() private _searchQuery = '';
    @state() private _selectedIndex = 0;
    @state() private _filteredItems: CommandItem[] = [];

    static styles = css`
    :host {
      display: contents;
    }

    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(8px);
      opacity: 0;
      visibility: hidden;
      transition: all 0.2s;
      z-index: 9998;
    }

    :host([open]) .overlay {
      opacity: 1;
      visibility: visible;
    }

    .palette {
      position: fixed;
      top: 20%;
      left: 50%;
      transform: translateX(-50%) scale(0.95);
      width: 560px;
      max-width: 90vw;
      max-height: 60vh;
      background: var(--zen-bg-1);
      border: 1px solid var(--zen-glass-border);
      border-radius: var(--zen-radius-lg);
      box-shadow: 
        0 25px 50px -12px rgba(0, 0, 0, 0.5),
        0 0 0 1px rgba(255, 255, 255, 0.1);
      opacity: 0;
      visibility: hidden;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 9999;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    :host([open]) .palette {
      opacity: 1;
      visibility: visible;
      transform: translateX(-50%) scale(1);
    }

    .search-container {
      display: flex;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid var(--zen-glass-border);
      gap: 12px;
    }

    .search-icon {
      font-size: 1.25rem;
      opacity: 0.5;
    }

    .search-input {
      flex: 1;
      background: transparent;
      border: none;
      font-size: 1rem;
      color: var(--zen-text-1);
      outline: none;
      font-family: inherit;
    }

    .search-input::placeholder {
      color: var(--zen-text-2);
    }

    .results {
      flex: 1;
      overflow-y: auto;
      padding: 8px;
    }

    .group-label {
      padding: 8px 12px;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--zen-text-2);
      font-weight: 600;
    }

    .item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border-radius: var(--zen-radius-md);
      cursor: pointer;
      transition: all 0.15s;
    }

    .item:hover,
    .item.selected {
      background: var(--zen-glass-bg);
    }

    .item.selected {
      background: var(--zen-primary);
      color: white;
    }

    .item-icon {
      font-size: 1.2rem;
      width: 24px;
      text-align: center;
    }

    .item-label {
      flex: 1;
      font-size: 0.9375rem;
    }

    .item-shortcut {
      display: flex;
      gap: 4px;
    }

    .item-shortcut kbd {
      padding: 4px 8px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      font-size: 0.75rem;
      font-family: inherit;
      color: var(--zen-text-2);
    }

    .item.selected .item-shortcut kbd {
      background: rgba(255, 255, 255, 0.2);
      color: rgba(255, 255, 255, 0.8);
    }

    .empty-state {
      padding: 40px;
      text-align: center;
      color: var(--zen-text-2);
    }

    .footer {
      display: flex;
      gap: 16px;
      padding: 12px 16px;
      border-top: 1px solid var(--zen-glass-border);
      font-size: 0.75rem;
      color: var(--zen-text-2);
    }

    .footer-item {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .footer-item kbd {
      padding: 2px 6px;
      background: var(--zen-glass-bg);
      border-radius: 4px;
    }
  `;

    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('keydown', this._handleGlobalKeydown);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('keydown', this._handleGlobalKeydown);
    }

    private _handleGlobalKeydown = (e: KeyboardEvent) => {
        
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            this.open = !this.open;
            if (this.open) {
                this._searchQuery = '';
                this._selectedIndex = 0;
                this._filterItems();
                setTimeout(() => {
                    this.shadowRoot?.querySelector<HTMLInputElement>('.search-input')?.focus();
                }, 50);
            }
        }

        if (this.open) {
            if (e.key === 'Escape') {
                this.open = false;
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this._selectedIndex = Math.min(this._selectedIndex + 1, this._filteredItems.length - 1);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this._selectedIndex = Math.max(this._selectedIndex - 1, 0);
            } else if (e.key === 'Enter' && this._filteredItems[this._selectedIndex]) {
                this._selectItem(this._filteredItems[this._selectedIndex]);
            }
        }
    };

    private _handleSearch(e: InputEvent) {
        this._searchQuery = (e.target as HTMLInputElement).value;
        this._selectedIndex = 0;
        this._filterItems();
    }

    private _filterItems() {
        const query = this._searchQuery.toLowerCase();
        this._filteredItems = this.items.filter(item =>
            item.label.toLowerCase().includes(query)
        );
    }

    private _selectItem(item: CommandItem) {
        this.dispatchEvent(new CustomEvent('select', { detail: item }));
        this.open = false;
    }

    private _close() {
        this.open = false;
    }

    updated(changedProps: Map<string, unknown>) {
        if (changedProps.has('items') || changedProps.has('open')) {
            this._filterItems();
        }
    }

    render() {
        
        const groups = new Map<string, CommandItem[]>();
        this._filteredItems.forEach(item => {
            const group = item.group || 'Commands';
            if (!groups.has(group)) groups.set(group, []);
            groups.get(group)!.push(item);
        });

        let globalIndex = 0;

        return html`
      <div class="overlay" @click=${this._close}></div>
      
      <div class="palette">
        <div class="search-container">
          <span class="search-icon">🔍</span>
          <input 
            class="search-input"
            type="text"
            placeholder="${this.placeholder}"
            .value=${this._searchQuery}
            @input=${this._handleSearch}
          >
        </div>
        
        <div class="results">
          ${this._filteredItems.length === 0 ? html`
            <div class="empty-state">
              No results found for "${this._searchQuery}"
            </div>
          ` : html`
            ${Array.from(groups.entries()).map(([groupName, groupItems]) => html`
              <div class="group-label">${groupName}</div>
              ${groupItems.map(item => {
            const index = globalIndex++;
            return html`
                  <div 
                    class="item ${index === this._selectedIndex ? 'selected' : ''}"
                    @click=${() => this._selectItem(item)}
                    @mouseenter=${() => this._selectedIndex = index}
                  >
                    ${item.icon ? html`<span class="item-icon">${item.icon}</span>` : ''}
                    <span class="item-label">${item.label}</span>
                    ${item.shortcut ? html`
                      <span class="item-shortcut">
                        ${item.shortcut.split('+').map(k => html`<kbd>${k}</kbd>`)}
                      </span>
                    ` : ''}
                  </div>
                `;
        })}
            `)}
          `}
        </div>
        
        <div class="footer">
          <span class="footer-item"><kbd>↑↓</kbd> Navigate</span>
          <span class="footer-item"><kbd>↵</kbd> Select</span>
          <span class="footer-item"><kbd>Esc</kbd> Close</span>
        </div>
      </div>
    `;
    }
}
