import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './ui-hover-card';
import { ZenHoverCard } from './ui-hover-card';

describe('ZenHoverCard', () => {
    let card: ZenHoverCard;

    beforeEach(async () => {
        card = document.createElement('zen-hover-card') as ZenHoverCard;
        card.innerHTML = '<div style="width: 200px; height: 150px;">Card Content</div>';
        document.body.appendChild(card);
        await card.updateComplete;
    });

    afterEach(() => {
        card.remove();
    });

    it('should create the component', () => {
        expect(card).toBeInstanceOf(ZenHoverCard);
    });

    it('should have default properties', () => {
        expect(card.intensity).toBe(15);
        expect(card.glare).toBe(true);
    });

    it('should render card container', () => {
        const cardDiv = card.shadowRoot?.querySelector('.card');
        expect(cardDiv).not.toBeNull();
    });

    it('should render content container', () => {
        const content = card.shadowRoot?.querySelector('.content');
        expect(content).not.toBeNull();
    });

    it('should render glare layer', () => {
        const glare = card.shadowRoot?.querySelector('.glare');
        expect(glare).not.toBeNull();
    });

    it('should update rotation on mouse move', async () => {
        const cardDiv = card.shadowRoot?.querySelector('.card') as HTMLElement;

        // Mock getBoundingClientRect
        card.getBoundingClientRect = () => ({
            left: 0,
            top: 0,
            width: 200,
            height: 150,
            right: 200,
            bottom: 150,
            x: 0,
            y: 0,
            toJSON: () => ({})
        });

        const moveEvent = new MouseEvent('mousemove', {
            clientX: 150, // right of center
            clientY: 50,  // above center
            bubbles: true
        });

        (card as unknown as { _handleMouseMove: (e: MouseEvent) => void })._handleMouseMove(moveEvent);
        await card.updateComplete;

        expect((card as unknown as { _rotateY: number })._rotateY).not.toBe(0);
        expect((card as unknown as { _opacity: number })._opacity).toBe(1);
    });

    it('should reset rotation on mouse leave', async () => {
        // First move mouse
        card.getBoundingClientRect = () => ({
            left: 0,
            top: 0,
            width: 200,
            height: 150,
            right: 200,
            bottom: 150,
            x: 0,
            y: 0,
            toJSON: () => ({})
        });

        const moveEvent = new MouseEvent('mousemove', {
            clientX: 150,
            clientY: 50,
            bubbles: true
        });

        (card as unknown as { _handleMouseMove: (e: MouseEvent) => void })._handleMouseMove(moveEvent);
        await card.updateComplete;

        // Then leave
        (card as unknown as { _handleMouseLeave: () => void })._handleMouseLeave();
        await card.updateComplete;

        expect((card as unknown as { _rotateX: number })._rotateX).toBe(0);
        expect((card as unknown as { _rotateY: number })._rotateY).toBe(0);
        expect((card as unknown as { _opacity: number })._opacity).toBe(0);
    });

    it('should update glare position on mouse move', async () => {
        card.getBoundingClientRect = () => ({
            left: 0,
            top: 0,
            width: 200,
            height: 150,
            right: 200,
            bottom: 150,
            x: 0,
            y: 0,
            toJSON: () => ({})
        });

        const moveEvent = new MouseEvent('mousemove', {
            clientX: 100, // center
            clientY: 75,  // center
            bubbles: true
        });

        (card as unknown as { _handleMouseMove: (e: MouseEvent) => void })._handleMouseMove(moveEvent);
        await card.updateComplete;

        // Center should result in 50% for glare position
        expect((card as unknown as { _glareX: number })._glareX).toBe(50);
        expect((card as unknown as { _glareY: number })._glareY).toBe(50);
    });

    it('should apply intensity to rotation', async () => {
        card.intensity = 30;
        await card.updateComplete;

        card.getBoundingClientRect = () => ({
            left: 0,
            top: 0,
            width: 200,
            height: 100,
            right: 200,
            bottom: 100,
            x: 0,
            y: 0,
            toJSON: () => ({})
        });

        const moveEvent = new MouseEvent('mousemove', {
            clientX: 200, // far right (full rotation)
            clientY: 50,  // center
            bubbles: true
        });

        (card as unknown as { _handleMouseMove: (e: MouseEvent) => void })._handleMouseMove(moveEvent);
        await card.updateComplete;

        // At far right edge, rotateY should be close to intensity value
        expect((card as unknown as { _rotateY: number })._rotateY).toBe(30);
    });

    it('should hide glare when glare prop is false', async () => {
        card.glare = false;
        await card.updateComplete;

        const glare = card.shadowRoot?.querySelector('.glare') as HTMLElement;
        expect(glare.style.cssText).toContain('opacity: 0');
    });
});
