import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './ui-spotlight-card';
import { ZenSpotlightCard } from './ui-spotlight-card';

describe('ZenSpotlightCard', () => {
    let card: ZenSpotlightCard;

    beforeEach(async () => {
        card = document.createElement('zen-spotlight-card') as ZenSpotlightCard;
        card.innerHTML = '<div style="padding: 20px;">Card Content</div>';
        document.body.appendChild(card);
        await card.updateComplete;
    });

    afterEach(() => {
        card.remove();
    });

    it('should create the component', () => {
        expect(card).toBeInstanceOf(ZenSpotlightCard);
    });

    it('should have default properties', () => {
        expect(card.spotlightSize).toBe(400);
        expect(card.spotlightColor).toBe('rgba(120, 119, 198, 0.15)');
        expect(card.border).toBe(true);
    });

    it('should render card container', () => {
        const cardDiv = card.shadowRoot?.querySelector('.card');
        expect(cardDiv).not.toBeNull();
    });

    it('should render border gradient when enabled', () => {
        const border = card.shadowRoot?.querySelector('.border-gradient');
        expect(border).not.toBeNull();
    });

    it('should not render border gradient when disabled', async () => {
        card.border = false;
        await card.updateComplete;

        const border = card.shadowRoot?.querySelector('.border-gradient');
        expect(border).toBeNull();
    });

    it('should render spotlight', () => {
        const spotlight = card.shadowRoot?.querySelector('.spotlight');
        expect(spotlight).not.toBeNull();
    });

    it('should render content', () => {
        const content = card.shadowRoot?.querySelector('.content');
        expect(content).not.toBeNull();
    });

    it('should set isHovered on mouse enter', async () => {
        (card as unknown as { _handleMouseEnter: () => void })._handleMouseEnter();
        await card.updateComplete;

        expect((card as unknown as { _isHovered: boolean })._isHovered).toBe(true);
    });

    it('should reset isHovered on mouse leave', async () => {
        (card as unknown as { _handleMouseEnter: () => void })._handleMouseEnter();
        await card.updateComplete;

        (card as unknown as { _handleMouseLeave: () => void })._handleMouseLeave();
        await card.updateComplete;

        expect((card as unknown as { _isHovered: boolean })._isHovered).toBe(false);
    });

    it('should update mouse position on mouse move', async () => {
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
        await card.updateComplete;

        expect((card as unknown as { _mouseX: number })._mouseX).toBe(100);
        expect((card as unknown as { _mouseY: number })._mouseY).toBe(75);
    });

    it('should update border gradient angle on mouse move', async () => {
        card.getBoundingClientRect = () => ({
            left: 0,
            top: 0,
            width: 200,
            height: 200,
            right: 200,
            bottom: 200,
            x: 0,
            y: 0,
            toJSON: () => ({})
        });

        const moveEvent = new MouseEvent('mousemove', {
            clientX: 200, // Right edge
            clientY: 100, // Center Y
            bubbles: true
        });

        (card as unknown as { _handleMouseMove: (e: MouseEvent) => void })._handleMouseMove(moveEvent);
        await card.updateComplete;

        const borderGradient = card.shadowRoot?.querySelector('.border-gradient') as HTMLElement;
        expect(borderGradient?.style.getPropertyValue('--angle')).not.toBe('');
    });

    it('should add hovered class when hovered', async () => {
        (card as unknown as { _handleMouseEnter: () => void })._handleMouseEnter();
        await card.updateComplete;

        const cardDiv = card.shadowRoot?.querySelector('.card');
        expect(cardDiv?.classList.contains('hovered')).toBe(true);
    });

    it('should apply custom spotlight size', async () => {
        card.spotlightSize = 600;
        await card.updateComplete;

        const spotlight = card.shadowRoot?.querySelector('.spotlight') as HTMLElement;
        expect(spotlight?.style.cssText).toContain('600px');
    });

    it('should apply custom spotlight color', async () => {
        card.spotlightColor = 'rgba(255, 0, 0, 0.5)';
        await card.updateComplete;

        const spotlight = card.shadowRoot?.querySelector('.spotlight') as HTMLElement;
        expect(spotlight?.style.cssText).toContain('rgba(255, 0, 0, 0.5)');
    });
});
