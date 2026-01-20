import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './ui-tilt-card';
import { ZenTiltCard } from './ui-tilt-card';

describe('ZenTiltCard', () => {
    let card: ZenTiltCard;

    beforeEach(async () => {
        card = document.createElement('zen-tilt-card') as ZenTiltCard;
        card.innerHTML = '<div style="width: 200px; height: 150px; padding: 20px;">Card Content</div>';
        document.body.appendChild(card);
        await card.updateComplete;
    });

    afterEach(() => {
        card.remove();
    });

    it('should create the component', () => {
        expect(card).toBeInstanceOf(ZenTiltCard);
    });

    it('should have default properties', () => {
        expect(card.intensity).toBe(20);
        expect(card.glare).toBe(true);
        expect(card.border).toBe(true);
        expect(card.parallax).toBe(true);
        expect(card.variant).toBe('glass');
    });

    it('should render card container', () => {
        const cardDiv = card.shadowRoot?.querySelector('.card');
        expect(cardDiv).not.toBeNull();
    });

    it('should render content container', () => {
        const content = card.shadowRoot?.querySelector('.content');
        expect(content).not.toBeNull();
    });

    it('should render glare when enabled', () => {
        const glare = card.shadowRoot?.querySelector('.glare');
        expect(glare).not.toBeNull();
    });

    it('should not render glare when disabled', async () => {
        card.glare = false;
        await card.updateComplete;

        const glare = card.shadowRoot?.querySelector('.glare');
        expect(glare).toBeNull();
    });

    it('should render border glow when enabled', () => {
        const border = card.shadowRoot?.querySelector('.border-glow');
        expect(border).not.toBeNull();
    });

    it('should not render border glow when disabled', async () => {
        card.border = false;
        await card.updateComplete;

        const border = card.shadowRoot?.querySelector('.border-glow');
        expect(border).toBeNull();
    });

    it('should set isHovered on mouse enter', async () => {
        (card as unknown as { _handleMouseEnter: () => void })._handleMouseEnter();
        await card.updateComplete;

        expect((card as unknown as { _isHovered: boolean })._isHovered).toBe(true);
    });

    it('should reset on mouse leave', async () => {
        (card as unknown as { _handleMouseEnter: () => void })._handleMouseEnter();
        await card.updateComplete;

        (card as unknown as { _handleMouseLeave: () => void })._handleMouseLeave();
        await card.updateComplete;

        expect((card as unknown as { _isHovered: boolean })._isHovered).toBe(false);
        expect((card as unknown as { _rotateX: number })._rotateX).toBe(0);
        expect((card as unknown as { _rotateY: number })._rotateY).toBe(0);
    });

    it('should update rotation on mouse move', async () => {
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

        expect((card as unknown as { _rotateY: number })._rotateY).not.toBe(0);
        expect((card as unknown as { _mouseX: number })._mouseX).toBe(0.75);
    });

    it('should apply parallax when enabled', async () => {
        card.parallax = true;
        await card.updateComplete;

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
            clientX: 100,
            clientY: 75,
            bubbles: true
        });

        (card as unknown as { _handleMouseMove: (e: MouseEvent) => void })._handleMouseMove(moveEvent);
        // _applyParallax is called internally

        expect((card as unknown as { _mouseX: number })._mouseX).toBe(0.5);
        expect((card as unknown as { _mouseY: number })._mouseY).toBe(0.5);
    });

    it('should reset parallax on mouse leave', async () => {
        // Add a parallax element
        const parallaxEl = document.createElement('div');
        parallaxEl.setAttribute('data-depth', '2');
        parallaxEl.style.transform = 'translateX(10px)';
        card.appendChild(parallaxEl);
        await card.updateComplete;

        (card as unknown as { _resetParallax: () => void })._resetParallax();
        await card.updateComplete;

        // Transform should be cleared
        expect(parallaxEl.style.transform).toBe('');
    });

    it('should add hovered class when hovered', async () => {
        (card as unknown as { _handleMouseEnter: () => void })._handleMouseEnter();
        await card.updateComplete;

        const cardDiv = card.shadowRoot?.querySelector('.card');
        expect(cardDiv?.classList.contains('hovered')).toBe(true);
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
            clientX: 200, // Far right
            clientY: 50,  // Center
            bubbles: true
        });

        (card as unknown as { _handleMouseMove: (e: MouseEvent) => void })._handleMouseMove(moveEvent);
        await card.updateComplete;

        expect((card as unknown as { _rotateY: number })._rotateY).toBe(30);
    });

    it('should support different variants', async () => {
        const variants = ['glass', 'solid', 'gradient', 'neon'] as const;

        for (const v of variants) {
            card.variant = v;
            await card.updateComplete;
            expect(card.variant).toBe(v);
        }
    });
});
