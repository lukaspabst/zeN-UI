import { LitElement, css, html, PropertyValues } from 'lit';
import { customElement, property, state, queryAssignedElements } from 'lit/decorators.js';

@customElement('zen-tabs')
export class ZenTabs extends LitElement {
  @property({ type: String }) active = '';

  static styles = css`
    :host {
      display: block;
    }

    .tab-list {
      display: flex;
      gap: 2px;
      border-bottom: 1px solid var(--zen-glass-border);
      position: relative;
      margin-bottom: 24px;
    }

    .indicator {
      position: absolute;
      bottom: -1px;
      height: 2px;
      background: var(--zen-primary);
      transition: all 0.3s var(--zen-ease-spring);
      border-radius: 2px 2px 0 0;
      box-shadow: 0 -2px 10px var(--zen-primary-glow);
    }
    
    ::slotted(zen-tab) {
      padding: 12px 20px;
      cursor: pointer;
      color: var(--zen-text-2);
      transition: color 0.2s;
      font-weight: 500;
      user-select: none;
    }
    
    ::slotted(zen-tab:hover) {
      color: var(--zen-text-1);
    }
    ::slotted(zen-tab[active]) {
      color: var(--zen-primary);
    }
  `;

  @queryAssignedElements({ slot: 'tabs', selector: 'zen-tab' })
  _tabs!: Array<HTMLElement>;

  @state() _indicatorLeft = 0;
  @state() _indicatorWidth = 0;

  firstUpdated() {
    this._updateIndicator();
  }

  updated(changed: PropertyValues) {
    if (changed.has('active')) {
      this._updateIndicator();
    }
  }

  _handleTabClick(e: Event) {
    const target = e.target as HTMLElement;
    if (target.tagName.toLowerCase() === 'zen-tab') {
      const val = target.getAttribute('value');
      if (val) {
        this.active = val;
        this.dispatchEvent(new CustomEvent('change', { detail: val }));
      }
    }
  }

  _updateIndicator() {
    if (!this._tabs || this._tabs.length === 0) return;

    const activeTab = this._tabs.find(t => t.getAttribute('value') === this.active);
    const list = this.shadowRoot?.querySelector('.tab-list');

    if (activeTab && list) {
      const listRect = list.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();

      this._indicatorLeft = tabRect.left - listRect.left;
      this._indicatorWidth = tabRect.width;


      this._tabs.forEach(t => {
        if (t === activeTab) t.setAttribute('active', '');
        else t.removeAttribute('active');
      });
    }
  }

  render() {
    return html`
      <div class="tab-list" @click=${this._handleTabClick}>
        <slot name="tabs" @slotchange=${this._updateIndicator}></slot>
        <div class="indicator" style="left: ${this._indicatorLeft}px; width: ${this._indicatorWidth}px;"></div>
      </div>
      <div class="panels">
        <slot></slot>
      </div>
    `;
  }
}

@customElement('zen-tab')
export class ZenTab extends LitElement {
  @property({ type: String }) value = '';


  static styles = css`
    :host { display: inline-block; }
  `;
  render() { return html`<slot></slot>`; }
}

@customElement('zen-tab-panel')
export class ZenTabPanel extends LitElement {
  @property({ type: String }) value = '';

  render() {



    return html`
      <style>
        :host { display: none; }
        :host-context(zen-tabs[active="${this.value}"]) { display: block; animation: fadeIn 0.3s ease; }
        /* host-context not always reliable. Let's use a simple slot approach. */
      </style>
      <slot></slot>
    `;
  }




  connectedCallback() {
    super.connectedCallback();
    this.parentElement?.addEventListener('change', this._onParentChange);

    this._checkActive();
  }

  _onParentChange = () => this._checkActive();

  _checkActive() {
    const parent = this.closest('zen-tabs') as ZenTabs;
    if (parent && parent.active === this.value) {
      this.style.display = 'block';
      this.style.animation = 'fadeIn 0.3s ease';
    } else {
      this.style.display = 'none';
    }
  }
}
