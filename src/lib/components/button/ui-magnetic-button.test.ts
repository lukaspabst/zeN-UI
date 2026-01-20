import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './ui-magnetic-button';
import { ZenMagneticButton } from './ui-magnetic-button';

describe('ZenMagneticButton', () => {
    let button: ZenMagneticButton;

    beforeEach(async () => {
        button = document.createElement('zen-magnetic-button') as ZenMagneticButton;
        button.innerHTML = 'Click Me';
        document.body.appendChild(button);
        await button.updateComplete;
    });

    afterEach(() => {
        button.remove();
    });

    it('should create the component', () => {
        expect(button).toBeInstanceOf(ZenMagneticButton);
    });

    it('should have default properties', () => {
        expect(button.strength).toBe(0.4);
        expect(button.variant).toBe('primary');
        expect(button.disabled).toBe(false);
    });

    it('should render magnetic wrapper', () => {
        const wrapper = button.shadowRoot?.querySelector('.magnetic-wrapper');
        expect(wrapper).not.toBeNull();
    });

    it('should render button', () => {
        const btn = button.shadowRoot?.querySelector('button');
        expect(btn).not.toBeNull();
    });

    it('should update translation on mouse move', async () => {
        button.getBoundingClientRect = () => ({
            left: 0,
            top: 0,
            width: 100,
            height: 50,
            right: 100,
            bottom: 50,
            x: 0,
            y: 0,
            toJSON: () => ({})
        });

        const moveEvent = new MouseEvent('mousemove', {
            clientX: 80, // 30 from center
            clientY: 25, // 0 from center
            bubbles: true
        });

        (button as unknown as { _handleMouseMove: (e: MouseEvent) => void })._handleMouseMove(moveEvent);
        await button.updateComplete;

        // Center is at (50, 25), so deltaX = (80-50) * 0.4 = 12
        expect((button as unknown as { _translateX: number })._translateX).toBe(12);
        expect((button as unknown as { _translateY: number })._translateY).toBe(0);
    });

    it('should not move when disabled', async () => {
        button.disabled = true;
        await button.updateComplete;

        button.getBoundingClientRect = () => ({
            left: 0,
            top: 0,
            width: 100,
            height: 50,
            right: 100,
            bottom: 50,
            x: 0,
            y: 0,
            toJSON: () => ({})
        });

        const moveEvent = new MouseEvent('mousemove', {
            clientX: 80,
            clientY: 25,
            bubbles: true
        });

        (button as unknown as { _handleMouseMove: (e: MouseEvent) => void })._handleMouseMove(moveEvent);
        await button.updateComplete;

        expect((button as unknown as { _translateX: number })._translateX).toBe(0);
    });

    it('should reset translation on mouse leave', async () => {
        // First move
        button.getBoundingClientRect = () => ({
            left: 0,
            top: 0,
            width: 100,
            height: 50,
            right: 100,
            bottom: 50,
            x: 0,
            y: 0,
            toJSON: () => ({})
        });

        const moveEvent = new MouseEvent('mousemove', {
            clientX: 80,
            clientY: 25,
            bubbles: true
        });

        (button as unknown as { _handleMouseMove: (e: MouseEvent) => void })._handleMouseMove(moveEvent);
        await button.updateComplete;

        expect((button as unknown as { _translateX: number })._translateX).not.toBe(0);

        // Then leave
        (button as unknown as { _handleMouseLeave: () => void })._handleMouseLeave();
        await button.updateComplete;

        expect((button as unknown as { _translateX: number })._translateX).toBe(0);
        expect((button as unknown as { _translateY: number })._translateY).toBe(0);
    });

    it('should create ripple on click', async () => {
        const btn = button.shadowRoot?.querySelector('button') as HTMLElement;
        btn.getBoundingClientRect = () => ({
            left: 0,
            top: 0,
            width: 100,
            height: 50,
            right: 100,
            bottom: 50,
            x: 0,
            y: 0,
            toJSON: () => ({})
        });

        const clickEvent = new MouseEvent('click', {
            clientX: 50,
            clientY: 25,
            bubbles: true
        });

        (button as unknown as { _handleClick: (e: MouseEvent) => void })._handleClick(clickEvent);
        await button.updateComplete;

        const ripple = button.shadowRoot?.querySelector('.ripple');
        expect(ripple).not.toBeNull();
    });

    it('should not create ripple when disabled', async () => {
        button.disabled = true;
        await button.updateComplete;

        const clickEvent = new MouseEvent('click', {
            clientX: 50,
            clientY: 25,
            bubbles: true
        });

        (button as unknown as { _handleClick: (e: MouseEvent) => void })._handleClick(clickEvent);
        await button.updateComplete;

        const ripple = button.shadowRoot?.querySelector('.ripple');
        expect(ripple).toBeNull();
    });

    it('should support different variants', async () => {
        const variants = ['primary', 'gradient', 'outline', 'glow'] as const;

        for (const v of variants) {
            button.variant = v;
            await button.updateComplete;
            expect(button.variant).toBe(v);
        }
    });

    it('should apply strength to translation', async () => {
        button.strength = 1.0;
        await button.updateComplete;

        button.getBoundingClientRect = () => ({
            left: 0,
            top: 0,
            width: 100,
            height: 50,
            right: 100,
            bottom: 50,
            x: 0,
            y: 0,
            toJSON: () => ({})
        });

        const moveEvent = new MouseEvent('mousemove', {
            clientX: 80, // 30 from center
            clientY: 25, // 0 from center
            bubbles: true
        });

        (button as unknown as { _handleMouseMove: (e: MouseEvent) => void })._handleMouseMove(moveEvent);
        await button.updateComplete;

        // With strength 1.0: deltaX = (80-50) * 1.0 = 30
        expect((button as unknown as { _translateX: number })._translateX).toBe(30);
    });
});
