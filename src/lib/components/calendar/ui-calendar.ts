import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';


type CalendarView = 'day' | 'month' | 'year';

@customElement('zen-calendar')
export class ZenCalendar extends LitElement {
  @property({ type: String }) value = ''; 
  @property({ type: Boolean }) enableViewSwitch = true;

  @state() private _currentDate = new Date(); 
  @state() private _view: CalendarView = 'day';

  static styles = css`
    :host {
      display: inline-block;
      background: var(--zen-glass-bg);
      backdrop-filter: blur(10px);
      border: 1px solid var(--zen-glass-border);
      border-radius: var(--zen-radius-lg);
      padding: 24px;
      width: 320px;
      user-select: none;
      box-sizing: border-box;
      transition: height 0.3s ease;
    }

    /* --- Header --- */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      color: var(--zen-text-1);
      font-weight: 600;
    }

    .title {
      cursor: pointer;
      padding: 4px 8px;
      border-radius: var(--zen-radius-sm);
      transition: background 0.2s;
    }
    .title:hover { background: var(--zen-glass-bg-hover); }
    .title.disabled { cursor: default; pointer-events: none; }

    .nav-btn {
      background: transparent;
      border: 1px solid var(--zen-glass-border);
      color: var(--zen-text-2);
      border-radius: var(--zen-radius-sm);
      width: 32px;
      height: 32px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }
    .nav-btn:hover { 
      background: var(--zen-primary); 
      color: white;
      border-color: var(--zen-primary);
    }

    /* --- Grids --- */
    .grid { display: grid; gap: 4px; text-align: center; }
    
    .grid-days { grid-template-columns: repeat(7, 1fr); }
    .grid-months { grid-template-columns: repeat(3, 1fr); gap: 12px; }
    .grid-years { grid-template-columns: repeat(3, 1fr); gap: 12px; }

    /* --- Cells --- */
    .cell {
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
      border-radius: var(--zen-radius-md);
      cursor: pointer;
      color: var(--zen-text-1);
      transition: all 0.2s;
      position: relative;
    }

    .cell:hover:not(.empty) { background: var(--zen-glass-bg-hover); }
    
    .cell.selected {
      background: var(--zen-primary);
      color: #fff;
      box-shadow: var(--zen-shadow-glow);
    }
    
    .cell.today { border: 1px solid var(--zen-primary); }
    .cell.empty { cursor: default; pointer-events: none; }
    
    .grid-months .cell, .grid-years .cell { height: 48px; }

    .day-header {
      color: var(--zen-text-3);
      font-size: 0.75rem;
      padding-bottom: 8px;
      font-weight: 700;
      text-transform: uppercase;
    }
  `;

  _switchView() {
    if (!this.enableViewSwitch) return;
    if (this._view === 'day') this._view = 'month';
    else if (this._view === 'month') this._view = 'year';
    else this._view = 'day';
  }

  _prev() {
    const d = new Date(this._currentDate);
    if (this._view === 'day') d.setMonth(d.getMonth() - 1);
    else if (this._view === 'month') d.setFullYear(d.getFullYear() - 1);
    else if (this._view === 'year') d.setFullYear(d.getFullYear() - 12);
    this._currentDate = d;
  }

  _next() {
    const d = new Date(this._currentDate);
    if (this._view === 'day') d.setMonth(d.getMonth() + 1);
    else if (this._view === 'month') d.setFullYear(d.getFullYear() + 1);
    else if (this._view === 'year') d.setFullYear(d.getFullYear() + 12);
    this._currentDate = d;
  }

  _selectDay(day: number) {
    const y = this._currentDate.getFullYear();
    const m = String(this._currentDate.getMonth() + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    this.value = `${y}-${m}-${d}`;
    this.dispatchEvent(new CustomEvent('change', { detail: this.value }));
  }

  _selectMonth(monthIndex: number) {
    const d = new Date(this._currentDate);
    d.setMonth(monthIndex);
    this._currentDate = d;
    this._view = 'day';
  }

  _selectYear(year: number) {
    const d = new Date(this._currentDate);
    d.setFullYear(year);
    this._currentDate = d;
    this._view = 'month';
  }

  render() {
    return html`
      <div class="header">
        <button class="nav-btn" @click=${this._prev}>&lt;</button>
        <div 
          class="title ${this.enableViewSwitch ? '' : 'disabled'}" 
          @click=${this._switchView}
        >
          ${this._renderHeaderTitle()}
        </div>
        <button class="nav-btn" @click=${this._next}>&gt;</button>
      </div>
      
      <div class="body">
        ${this._view === 'day' ? this._renderDays() :
        this._view === 'month' ? this._renderMonths() :
          this._renderYears()}
      </div>
    `;
  }

  _renderHeaderTitle() {
    const year = this._currentDate.getFullYear();
    if (this._view === 'day') {
      const month = this._currentDate.toLocaleString('default', { month: 'long' });
      return `${month} ${year}`;
    }
    if (this._view === 'month') return `${year}`;

    
    const startYear = year - (year % 12);
    return `${startYear} - ${startYear + 11}`;
  }

  _renderDays() {
    const year = this._currentDate.getFullYear();
    const month = this._currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(html`<div class="cell empty"></div>`);
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      days.push(html`
          <div 
            class="cell ${this.value === dateStr ? 'selected' : ''} ${isCurrentMonth && today.getDate() === i ? 'today' : ''}"
            @click=${() => this._selectDay(i)}
          >
            ${i}
          </div>
        `);
    }

    return html`
      <div class="grid grid-days">
        ${['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => html`<div class="day-header">${d}</div>`)}
        ${days}
      </div>
    `;
  }

  _renderMonths() {
    const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'short' }));
    return html`
      <div class="grid grid-months">
        ${months.map((m, i) => html`
          <div class="cell ${this._currentDate.getMonth() === i ? 'selected' : ''}" @click=${() => this._selectMonth(i)}>${m}</div>
        `)}
      </div>
    `;
  }

  _renderYears() {
    const currentYear = this._currentDate.getFullYear();
    const startYear = currentYear - (currentYear % 12);
    const years = Array.from({ length: 12 }, (_, i) => startYear + i);

    return html`
      <div class="grid grid-years">
        ${years.map(y => html`
          <div class="cell ${y === currentYear ? 'selected' : ''}" @click=${() => this._selectYear(y)}>${y}</div>
        `)}
      </div>
    `;
  }
}
