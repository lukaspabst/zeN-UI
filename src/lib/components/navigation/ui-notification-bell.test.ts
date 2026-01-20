import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './ui-notification-bell';
import { ZenNotificationBell } from './ui-notification-bell';

interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    read?: boolean;
    icon?: string;
}

describe('ZenNotificationBell', () => {
    let bell: ZenNotificationBell;

    beforeEach(async () => {
        bell = document.createElement('zen-notification-bell') as ZenNotificationBell;
        document.body.appendChild(bell);
        await bell.updateComplete;
    });

    afterEach(() => {
        bell.remove();
    });

    it('should create the component', () => {
        expect(bell).toBeInstanceOf(ZenNotificationBell);
    });

    it('should have default properties', () => {
        expect(bell.notifications).toEqual([]);
        expect(bell.open).toBe(false);
    });

    it('should toggle open on _toggle()', async () => {
        expect(bell.open).toBe(false);

        (bell as unknown as { _toggle: () => void })._toggle();
        await bell.updateComplete;

        expect(bell.open).toBe(true);
    });

    it('should calculate unread count', async () => {
        bell.notifications = [
            { id: '1', title: 'Test 1', message: 'Message 1', time: 'Now', read: false },
            { id: '2', title: 'Test 2', message: 'Message 2', time: 'Now', read: true },
            { id: '3', title: 'Test 3', message: 'Message 3', time: 'Now', read: false },
        ];
        await bell.updateComplete;

        expect((bell as unknown as { _unreadCount: number })._unreadCount).toBe(2);
    });

    it('should mark all as read', async () => {
        bell.notifications = [
            { id: '1', title: 'Test 1', message: 'Message 1', time: 'Now', read: false },
            { id: '2', title: 'Test 2', message: 'Message 2', time: 'Now', read: false },
        ];
        await bell.updateComplete;

        let eventFired = false;
        bell.addEventListener('markAllRead', () => {
            eventFired = true;
        });

        (bell as unknown as { _markAllRead: () => void })._markAllRead();
        await bell.updateComplete;

        expect((bell as unknown as { _unreadCount: number })._unreadCount).toBe(0);
        expect(bell.notifications.every((n: Notification) => n.read)).toBe(true);
        expect(eventFired).toBe(true);
    });

    it('should dispatch notificationClick event', async () => {
        const notification = { id: '1', title: 'Test', message: 'Msg', time: 'Now' };
        bell.notifications = [notification];
        await bell.updateComplete;

        let receivedNotification: Notification | undefined;
        bell.addEventListener('notificationClick', (e: Event) => {
            receivedNotification = (e as CustomEvent<Notification>).detail;
        });

        (bell as unknown as { _handleNotificationClick: (n: Notification) => void })._handleNotificationClick(notification);

        expect(receivedNotification).toBeDefined();
        expect(receivedNotification!.id).toBe('1');
    });

    it('should close on outside click', async () => {
        bell.open = true;
        await bell.updateComplete;

        const outsideElement = document.createElement('div');
        document.body.appendChild(outsideElement);

        const clickEvent = new MouseEvent('click', { bubbles: true });
        Object.defineProperty(clickEvent, 'target', { value: outsideElement });

        (bell as unknown as { _handleOutsideClick: (e: MouseEvent) => void })._handleOutsideClick(clickEvent);
        await bell.updateComplete;

        expect(bell.open).toBe(false);

        outsideElement.remove();
    });

    it('should not close when clicking inside', async () => {
        bell.open = true;
        await bell.updateComplete;

        const clickEvent = new MouseEvent('click', { bubbles: true });
        Object.defineProperty(clickEvent, 'target', { value: bell });

        (bell as unknown as { _handleOutsideClick: (e: MouseEvent) => void })._handleOutsideClick(clickEvent);
        await bell.updateComplete;

        expect(bell.open).toBe(true);
    });

    it('should render bell button', async () => {
        const button = bell.shadowRoot?.querySelector('.bell-button');
        expect(button).not.toBeNull();
    });

    it('should render dropdown', async () => {
        const dropdown = bell.shadowRoot?.querySelector('.dropdown');
        expect(dropdown).not.toBeNull();
    });

    it('should show badge when unread count > 0', async () => {
        bell.notifications = [
            { id: '1', title: 'Test', message: 'Msg', time: 'Now', read: false },
        ];
        await bell.updateComplete;
        // Wait for updated lifecycle to calculate unread count
        await new Promise(r => setTimeout(r, 50));
        await bell.updateComplete;

        const badge = bell.shadowRoot?.querySelector('.badge');
        expect(badge).not.toBeNull();
        expect(badge?.textContent).toBe('1');
    });

    it('should show 99+ for more than 99 unread', async () => {
        const notifications = [];
        for (let i = 0; i < 100; i++) {
            notifications.push({ id: String(i), title: 'Test', message: 'Msg', time: 'Now', read: false });
        }
        bell.notifications = notifications;
        await bell.updateComplete;
        await new Promise(r => setTimeout(r, 50));
        await bell.updateComplete;

        const badge = bell.shadowRoot?.querySelector('.badge');
        expect(badge?.textContent).toBe('99+');
    });

    it('should not show badge when no unread', async () => {
        bell.notifications = [
            { id: '1', title: 'Test', message: 'Msg', time: 'Now', read: true },
        ];
        await bell.updateComplete;

        const badge = bell.shadowRoot?.querySelector('.badge');
        expect(badge).toBeNull();
    });

    it('should show empty state when no notifications', async () => {
        const emptyState = bell.shadowRoot?.querySelector('.empty-state');
        expect(emptyState).not.toBeNull();
    });

    it('should render notification items', async () => {
        bell.notifications = [
            { id: '1', title: 'Test 1', message: 'Message 1', time: 'Now' },
            { id: '2', title: 'Test 2', message: 'Message 2', time: 'Now' },
        ];
        await bell.updateComplete;

        const items = bell.shadowRoot?.querySelectorAll('.notification-item');
        expect(items?.length).toBe(2);
    });

    it('should mark unread notifications with class', async () => {
        bell.notifications = [
            { id: '1', title: 'Test', message: 'Msg', time: 'Now', read: false },
        ];
        await bell.updateComplete;

        const item = bell.shadowRoot?.querySelector('.notification-item.unread');
        expect(item).not.toBeNull();
    });

    it('should show mark all read button when unread exist', async () => {
        bell.notifications = [
            { id: '1', title: 'Test', message: 'Msg', time: 'Now', read: false },
        ];
        await bell.updateComplete;
        await new Promise(r => setTimeout(r, 50));
        await bell.updateComplete;

        const markReadBtn = bell.shadowRoot?.querySelector('.mark-read');
        expect(markReadBtn).not.toBeNull();
    });
});
