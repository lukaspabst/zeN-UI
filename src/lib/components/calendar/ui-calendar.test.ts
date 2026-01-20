import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './ui-calendar';
import { ZenCalendar } from './ui-calendar';

describe('ZenCalendar', () => {
    let calendar: ZenCalendar;

    beforeEach(async () => {
        calendar = document.createElement('zen-calendar') as ZenCalendar;
        document.body.appendChild(calendar);
        await calendar.updateComplete;
    });

    afterEach(() => {
        calendar.remove();
    });

    it('should create the component', () => {
        expect(calendar).toBeInstanceOf(ZenCalendar);
    });

    it('should have default properties', () => {
        expect(calendar.value).toBe('');
        expect(calendar.enableViewSwitch).toBe(true);
    });

    it('should start in day view', async () => {
        const view = (calendar as unknown as { _view: string })._view;
        expect(view).toBe('day');
    });

    it('should switch to month view on _switchView', async () => {
        (calendar as unknown as { _switchView: () => void })._switchView();
        await calendar.updateComplete;

        const view = (calendar as unknown as { _view: string })._view;
        expect(view).toBe('month');
    });

    it('should switch to year view on second _switchView', async () => {
        (calendar as unknown as { _switchView: () => void })._switchView();
        (calendar as unknown as { _switchView: () => void })._switchView();
        await calendar.updateComplete;

        const view = (calendar as unknown as { _view: string })._view;
        expect(view).toBe('year');
    });

    it('should cycle back to day view on third _switchView', async () => {
        (calendar as unknown as { _switchView: () => void })._switchView();
        (calendar as unknown as { _switchView: () => void })._switchView();
        (calendar as unknown as { _switchView: () => void })._switchView();
        await calendar.updateComplete;

        const view = (calendar as unknown as { _view: string })._view;
        expect(view).toBe('day');
    });

    it('should not switch view when enableViewSwitch is false', async () => {
        calendar.enableViewSwitch = false;
        await calendar.updateComplete;

        (calendar as unknown as { _switchView: () => void })._switchView();
        await calendar.updateComplete;

        const view = (calendar as unknown as { _view: string })._view;
        expect(view).toBe('day');
    });

    it('should navigate to previous month with _prev in day view', async () => {
        const initialDate = new Date((calendar as unknown as { _currentDate: Date })._currentDate);
        const initialMonth = initialDate.getMonth();

        (calendar as unknown as { _prev: () => void })._prev();
        await calendar.updateComplete;

        const newDate = (calendar as unknown as { _currentDate: Date })._currentDate;
        expect(newDate.getMonth()).toBe(initialMonth === 0 ? 11 : initialMonth - 1);
    });

    it('should navigate to next month with _next in day view', async () => {
        const initialDate = new Date((calendar as unknown as { _currentDate: Date })._currentDate);
        const initialMonth = initialDate.getMonth();

        (calendar as unknown as { _next: () => void })._next();
        await calendar.updateComplete;

        const newDate = (calendar as unknown as { _currentDate: Date })._currentDate;
        expect(newDate.getMonth()).toBe((initialMonth + 1) % 12);
    });

    it('should navigate to previous year with _prev in month view', async () => {
        (calendar as unknown as { _switchView: () => void })._switchView(); // Go to month view
        await calendar.updateComplete;

        const initialYear = (calendar as unknown as { _currentDate: Date })._currentDate.getFullYear();

        (calendar as unknown as { _prev: () => void })._prev();
        await calendar.updateComplete;

        const newYear = (calendar as unknown as { _currentDate: Date })._currentDate.getFullYear();
        expect(newYear).toBe(initialYear - 1);
    });

    it('should navigate to next year with _next in month view', async () => {
        (calendar as unknown as { _switchView: () => void })._switchView(); // Go to month view
        await calendar.updateComplete;

        const initialYear = (calendar as unknown as { _currentDate: Date })._currentDate.getFullYear();

        (calendar as unknown as { _next: () => void })._next();
        await calendar.updateComplete;

        const newYear = (calendar as unknown as { _currentDate: Date })._currentDate.getFullYear();
        expect(newYear).toBe(initialYear + 1);
    });

    it('should navigate by 12 years with _prev in year view', async () => {
        (calendar as unknown as { _switchView: () => void })._switchView();
        (calendar as unknown as { _switchView: () => void })._switchView(); // Go to year view
        await calendar.updateComplete;

        const initialYear = (calendar as unknown as { _currentDate: Date })._currentDate.getFullYear();

        (calendar as unknown as { _prev: () => void })._prev();
        await calendar.updateComplete;

        const newYear = (calendar as unknown as { _currentDate: Date })._currentDate.getFullYear();
        expect(newYear).toBe(initialYear - 12);
    });

    it('should navigate by 12 years with _next in year view', async () => {
        (calendar as unknown as { _switchView: () => void })._switchView();
        (calendar as unknown as { _switchView: () => void })._switchView(); // Go to year view
        await calendar.updateComplete;

        const initialYear = (calendar as unknown as { _currentDate: Date })._currentDate.getFullYear();

        (calendar as unknown as { _next: () => void })._next();
        await calendar.updateComplete;

        const newYear = (calendar as unknown as { _currentDate: Date })._currentDate.getFullYear();
        expect(newYear).toBe(initialYear + 12);
    });

    it('should select a day with _selectDay', async () => {
        let receivedValue = '';
        calendar.addEventListener('change', (e: Event) => {
            receivedValue = (e as CustomEvent).detail;
        });

        (calendar as unknown as { _selectDay: (day: number) => void })._selectDay(15);
        await calendar.updateComplete;

        expect(calendar.value).toContain('-15');
        expect(receivedValue).toContain('-15');
    });

    it('should select a month with _selectMonth', async () => {
        (calendar as unknown as { _switchView: () => void })._switchView();
        await calendar.updateComplete;

        (calendar as unknown as { _selectMonth: (month: number) => void })._selectMonth(5); // June
        await calendar.updateComplete;

        const view = (calendar as unknown as { _view: string })._view;
        expect(view).toBe('day');
        expect((calendar as unknown as { _currentDate: Date })._currentDate.getMonth()).toBe(5);
    });

    it('should select a year with _selectYear', async () => {
        (calendar as unknown as { _switchView: () => void })._switchView();
        (calendar as unknown as { _switchView: () => void })._switchView();
        await calendar.updateComplete;

        (calendar as unknown as { _selectYear: (year: number) => void })._selectYear(2025);
        await calendar.updateComplete;

        const view = (calendar as unknown as { _view: string })._view;
        expect(view).toBe('month');
        expect((calendar as unknown as { _currentDate: Date })._currentDate.getFullYear()).toBe(2025);
    });

    it('should render day grid in day view', async () => {
        const dayHeaders = calendar.shadowRoot?.querySelectorAll('.day-header');
        expect(dayHeaders?.length).toBe(7); // 7 days of the week
    });

    it('should render month grid in month view', async () => {
        (calendar as unknown as { _switchView: () => void })._switchView();
        await calendar.updateComplete;

        const monthGrid = calendar.shadowRoot?.querySelector('.grid-months');
        const cells = monthGrid?.querySelectorAll('.cell');
        expect(cells?.length).toBe(12); // 12 months
    });

    it('should render year grid in year view', async () => {
        (calendar as unknown as { _switchView: () => void })._switchView();
        (calendar as unknown as { _switchView: () => void })._switchView();
        await calendar.updateComplete;

        const yearGrid = calendar.shadowRoot?.querySelector('.grid-years');
        const cells = yearGrid?.querySelectorAll('.cell');
        expect(cells?.length).toBe(12); // 12 years in view
    });

    it('should mark today with today class', async () => {
        const today = new Date();
        const currentDate = (calendar as unknown as { _currentDate: Date })._currentDate;

        // Only if we're viewing the current month
        if (currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear()) {
            const todayCell = calendar.shadowRoot?.querySelector('.today');
            expect(todayCell).not.toBeNull();
        }
    });

    it('should mark selected date with selected class', async () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        calendar.value = `${year}-${month}-15`;
        await calendar.updateComplete;

        const selectedCell = calendar.shadowRoot?.querySelector('.selected');
        expect(selectedCell).not.toBeNull();
        expect(selectedCell?.textContent?.trim()).toBe('15');
    });
});
