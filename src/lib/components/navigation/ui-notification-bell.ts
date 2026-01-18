import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    read?: boolean;
    icon?: string;
}

@customElement('zen-notification-bell')
export class ZenNotificationBell extends LitElement {
    @property({ type: Array }) notifications: Notification[] = [];
    @property({ type: Boolean, reflect: true }) open = false;

    @state() private _unreadCount = 0;

    static styles = css`
    :host {
      display: inline-block;
      position: relative;
    }

    .bell-button {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--zen-glass-bg);
      border: 1px solid var(--zen-glass-border);
      border-radius: var(--zen-radius-md);
      cursor: pointer;
      position: relative;
      transition: all 0.2s;
    }

    .bell-button:hover {
      background: var(--zen-glass-bg-hover);
      transform: scale(1.05);
    }

    .bell-icon {
      font-size: 1.25rem;
      transition: transform 0.3s;
    }

    .bell-button:hover .bell-icon {
      animation: ring 0.5s ease;
    }

    @keyframes ring {
      0%, 100% { transform: rotate(0); }
      20% { transform: rotate(15deg); }
      40% { transform: rotate(-15deg); }
      60% { transform: rotate(10deg); }
      80% { transform: rotate(-10deg); }
    }

    .badge {
      position: absolute;
      top: -4px;
      right: -4px;
      min-width: 18px;
      height: 18px;
      padding: 0 5px;
      background: #ef4444;
      color: white;
      font-size: 0.7rem;
      font-weight: 700;
      border-radius: 99px;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: pop 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @keyframes pop {
      0% { transform: scale(0); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }

    .dropdown {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      width: 360px;
      max-height: 400px;
      background: var(--zen-bg-1);
      border: 1px solid var(--zen-glass-border);
      border-radius: var(--zen-radius-lg);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px) scale(0.95);
      transform-origin: top right;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    :host([open]) .dropdown {
      opacity: 1;
      visibility: visible;
      transform: translateY(0) scale(1);
    }

    .dropdown-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      border-bottom: 1px solid var(--zen-glass-border);
    }

    .dropdown-title {
      font-weight: 600;
      color: var(--zen-text-1);
    }

    .mark-read {
      font-size: 0.8rem;
      color: var(--zen-primary);
      cursor: pointer;
      background: none;
      border: none;
      padding: 0;
    }

    .mark-read:hover {
      text-decoration: underline;
    }

    .notifications-list {
      flex: 1;
      overflow-y: auto;
    }

    .notification-item {
      display: flex;
      gap: 12px;
      padding: 16px 20px;
      cursor: pointer;
      transition: background 0.2s;
      border-bottom: 1px solid var(--zen-glass-border);
    }

    .notification-item:last-child {
      border-bottom: none;
    }

    .notification-item:hover {
      background: var(--zen-glass-bg);
    }

    .notification-item.unread {
      background: rgba(102, 126, 234, 0.1);
    }

    .notification-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--zen-glass-bg);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      flex-shrink: 0;
    }

    .notification-content {
      flex: 1;
      min-width: 0;
    }

    .notification-title {
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--zen-text-1);
      margin-bottom: 4px;
    }

    .notification-message {
      font-size: 0.8rem;
      color: var(--zen-text-2);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .notification-time {
      font-size: 0.75rem;
      color: var(--zen-text-2);
      margin-top: 4px;
    }

    .unread-dot {
      width: 8px;
      height: 8px;
      background: var(--zen-primary);
      border-radius: 50%;
      flex-shrink: 0;
      margin-top: 6px;
    }

    .empty-state {
      padding: 40px;
      text-align: center;
      color: var(--zen-text-2);
    }

    .empty-state-icon {
      font-size: 3rem;
      margin-bottom: 12px;
      opacity: 0.5;
    }

    .dropdown-footer {
      padding: 12px 20px;
      border-top: 1px solid var(--zen-glass-border);
      text-align: center;
    }

    .view-all {
      color: var(--zen-primary);
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .view-all:hover {
      text-decoration: underline;
    }
  `;

    updated(changedProps: Map<string, unknown>) {
        if (changedProps.has('notifications')) {
            this._unreadCount = this.notifications.filter(n => !n.read).length;
        }
    }

    private _toggle() {
        this.open = !this.open;
    }

    private _markAllRead() {
        this.notifications = this.notifications.map(n => ({ ...n, read: true }));
        this._unreadCount = 0;
        this.dispatchEvent(new CustomEvent('markAllRead'));
    }

    private _handleNotificationClick(notification: Notification) {
        this.dispatchEvent(new CustomEvent('notificationClick', { detail: notification }));
    }

    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('click', this._handleOutsideClick);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('click', this._handleOutsideClick);
    }

    private _handleOutsideClick = (e: MouseEvent) => {
        if (this.open && !this.contains(e.target as Node)) {
            this.open = false;
        }
    };

    render() {
        return html`
      <button class="bell-button" @click=${this._toggle}>
        <span class="bell-icon">🔔</span>
        ${this._unreadCount > 0 ? html`
          <span class="badge">${this._unreadCount > 99 ? '99+' : this._unreadCount}</span>
        ` : ''}
      </button>

      <div class="dropdown">
        <div class="dropdown-header">
          <span class="dropdown-title">Notifications</span>
          ${this._unreadCount > 0 ? html`
            <button class="mark-read" @click=${this._markAllRead}>Mark all read</button>
          ` : ''}
        </div>

        <div class="notifications-list">
          ${this.notifications.length === 0 ? html`
            <div class="empty-state">
              <div class="empty-state-icon">🔕</div>
              <p>No notifications yet</p>
            </div>
          ` : html`
            ${this.notifications.map(n => html`
              <div 
                class="notification-item ${!n.read ? 'unread' : ''}"
                @click=${() => this._handleNotificationClick(n)}
              >
                <div class="notification-icon">${n.icon || '📬'}</div>
                <div class="notification-content">
                  <div class="notification-title">${n.title}</div>
                  <div class="notification-message">${n.message}</div>
                  <div class="notification-time">${n.time}</div>
                </div>
                ${!n.read ? html`<div class="unread-dot"></div>` : ''}
              </div>
            `)}
          `}
        </div>

        ${this.notifications.length > 0 ? html`
          <div class="dropdown-footer">
            <a href="#" class="view-all">View all notifications</a>
          </div>
        ` : ''}
      </div>
    `;
    }
}
