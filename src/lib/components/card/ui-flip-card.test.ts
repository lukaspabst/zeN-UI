import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './ui-flip-card';
import { ZenFlipCard } from './ui-flip-card';

describe('ZenFlipCard', () => {
    let card: ZenFlipCard;

    beforeEach(async () => {
        card = document.createElement('zen-flip-card') as ZenFlipCard;
        card.innerHTML = `
      <div slot="front">Front Content</div>
      <div slot="back">Back Content</div>
    `;
        document.body.appendChild(card);
        await card.updateComplete;
    });

    afterEach(() => {
        card.remove();
    });

    it('should create the component', () => {
        expect(card).toBeInstanceOf(ZenFlipCard);
    });

    it('should have default properties', () => {
        expect(card.trigger).toBe('hover');
        expect(card.direction).toBe('horizontal');
        expect(card.duration).toBe(0.6);
    });

    it('should render card container', () => {
        const cardDiv = card.shadowRoot?.querySelector('.card');
        expect(cardDiv).not.toBeNull();
    });

    it('should render front face', () => {
        const front = card.shadowRoot?.querySelector('.front');
        expect(front).not.toBeNull();
    });

    it('should render back face', () => {
        const back = card.shadowRoot?.querySelector('.back');
        expect(back).not.toBeNull();
    });

    it('should flip on hover trigger with mouse enter', async () => {
        card.trigger = 'hover';
        await card.updateComplete;

        (card as unknown as { _handleMouseEnter: () => void })._handleMouseEnter();
        await card.updateComplete;

        expect((card as unknown as { _isFlipped: boolean })._isFlipped).toBe(true);
        expect((card as unknown as { _isHovered: boolean })._isHovered).toBe(true);
    });

    it('should unflip on hover trigger with mouse leave', async () => {
        card.trigger = 'hover';
        await card.updateComplete;

        (card as unknown as { _handleMouseEnter: () => void })._handleMouseEnter();
        await card.updateComplete;

        (card as unknown as { _handleMouseLeave: () => void })._handleMouseLeave();
        await card.updateComplete;

        expect((card as unknown as { _isFlipped: boolean })._isFlipped).toBe(false);
        expect((card as unknown as { _isHovered: boolean })._isHovered).toBe(false);
    });

    it('should not flip on hover when trigger is click', async () => {
        card.trigger = 'click';
        await card.updateComplete;

        (card as unknown as { _handleMouseEnter: () => void })._handleMouseEnter();
        await card.updateComplete;

        expect((card as unknown as { _isFlipped: boolean })._isFlipped).toBe(false);
        expect((card as unknown as { _isHovered: boolean })._isHovered).toBe(true);
    });

    it('should toggle flip on click when trigger is click', async () => {
        card.trigger = 'click';
        await card.updateComplete;

        (card as unknown as { _handleClick: () => void })._handleClick();
        await card.updateComplete;

        expect((card as unknown as { _isFlipped: boolean })._isFlipped).toBe(true);

        (card as unknown as { _handleClick: () => void })._handleClick();
        await card.updateComplete;

        expect((card as unknown as { _isFlipped: boolean })._isFlipped).toBe(false);
    });

    it('should not toggle flip on click when trigger is hover', async () => {
        card.trigger = 'hover';
        await card.updateComplete;

        (card as unknown as { _handleClick: () => void })._handleClick();
        await card.updateComplete;

        expect((card as unknown as { _isFlipped: boolean })._isFlipped).toBe(false);
    });

    it('should add flipped class when flipped', async () => {
        card.trigger = 'hover';
        await card.updateComplete;

        (card as unknown as { _handleMouseEnter: () => void })._handleMouseEnter();
        await card.updateComplete;

        const cardDiv = card.shadowRoot?.querySelector('.card');
        expect(cardDiv?.classList.contains('flipped')).toBe(true);
    });

    it('should add hovered class when hovered', async () => {
        (card as unknown as { _handleMouseEnter: () => void })._handleMouseEnter();
        await card.updateComplete;

        const cardDiv = card.shadowRoot?.querySelector('.card');
        expect(cardDiv?.classList.contains('hovered')).toBe(true);
    });

    it('should support vertical direction', async () => {
        card.direction = 'vertical';
        await card.updateComplete;

        expect(card.getAttribute('direction')).toBe('vertical');
    });

    it('should apply custom duration', async () => {
        card.duration = 1.2;
        await card.updateComplete;

        const cardDiv = card.shadowRoot?.querySelector('.card') as HTMLElement;
        expect(cardDiv?.style.cssText).toContain('--duration: 1.2s');
    });
});
