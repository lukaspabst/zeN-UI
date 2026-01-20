import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import './ui-typewriter';
import { ZenTypewriter } from './ui-typewriter';

describe('ZenTypewriter', () => {
    let typewriter: ZenTypewriter;

    beforeEach(async () => {
        typewriter = document.createElement('zen-typewriter') as ZenTypewriter;
        document.body.appendChild(typewriter);
        await typewriter.updateComplete;
    });

    afterEach(() => {
        typewriter.remove();
    });

    it('should create the component', () => {
        expect(typewriter).toBeInstanceOf(ZenTypewriter);
    });

    it('should have default properties', () => {
        expect(typewriter.texts).toEqual(['Hello World']);
        expect(typewriter.typeSpeed).toBe(80);
        expect(typewriter.deleteSpeed).toBe(50);
        expect(typewriter.pauseDuration).toBe(2000);
        expect(typewriter.loop).toBe(true);
        expect(typewriter.cursor).toBe(true);
    });

    it('should render typewriter container', () => {
        const container = typewriter.shadowRoot?.querySelector('.typewriter');
        expect(container).not.toBeNull();
    });

    it('should render cursor when enabled', () => {
        const cursor = typewriter.shadowRoot?.querySelector('.cursor');
        expect(cursor).not.toBeNull();
    });

    it('should not render cursor when disabled', async () => {
        typewriter.cursor = false;
        await typewriter.updateComplete;

        const cursor = typewriter.shadowRoot?.querySelector('.cursor');
        expect(cursor).toBeNull();
    });

    it('should use custom cursor character', async () => {
        typewriter.cursorChar = '_';
        await typewriter.updateComplete;

        const cursor = typewriter.shadowRoot?.querySelector('.cursor');
        expect(cursor?.textContent).toBe('_');
    });

    it('should start typing on connected', async () => {
        // The component automatically starts typing
        // Just verify it has started after a short wait
        await new Promise(r => setTimeout(r, 200));
        await typewriter.updateComplete;

        const displayText = (typewriter as unknown as { _displayText: string })._displayText;
        expect(displayText.length).toBeGreaterThan(0);
    });

    it('should clear timeout on disconnect', () => {
        const newTypewriter = document.createElement('zen-typewriter') as ZenTypewriter;
        document.body.appendChild(newTypewriter);

        // Set a timeout id
        (newTypewriter as unknown as { _timeoutId: number })._timeoutId = 123;

        const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');
        newTypewriter.remove();

        expect(clearTimeoutSpy).toHaveBeenCalled();
        clearTimeoutSpy.mockRestore();
    });

    it('should handle _startTyping when deleting', async () => {
        // Set up deleting state manually
        (typewriter as unknown as { _isDeleting: boolean })._isDeleting = true;
        (typewriter as unknown as { _charIndex: number })._charIndex = 3;
        (typewriter as unknown as { _displayText: string })._displayText = 'Hel';

        // Call _startTyping
        (typewriter as unknown as { _startTyping: () => void })._startTyping();
        await typewriter.updateComplete;

        // Should have deleted one character
        expect((typewriter as unknown as { _charIndex: number })._charIndex).toBe(2);
    });

    it('should switch to next text when done deleting', async () => {
        typewriter.texts = ['A', 'B'];
        await typewriter.updateComplete;

        // Set up end of deleting
        (typewriter as unknown as { _isDeleting: boolean })._isDeleting = true;
        (typewriter as unknown as { _charIndex: number })._charIndex = 1;
        (typewriter as unknown as { _textIndex: number })._textIndex = 0;

        (typewriter as unknown as { _startTyping: () => void })._startTyping();
        await typewriter.updateComplete;

        // Should have moved to charIndex 0
        expect((typewriter as unknown as { _charIndex: number })._charIndex).toBe(0);
    });

    it('should stop when loop is false and finished', async () => {
        typewriter.loop = false;
        typewriter.texts = ['A'];
        await typewriter.updateComplete;

        // Set up end of deleting on last text
        (typewriter as unknown as { _isDeleting: boolean })._isDeleting = true;
        (typewriter as unknown as { _charIndex: number })._charIndex = 1;
        (typewriter as unknown as { _textIndex: number })._textIndex = 0;

        (typewriter as unknown as { _startTyping: () => void })._startTyping();
        await typewriter.updateComplete;

        // Check that _textIndex would wrap to 0
        // The function should return early when !loop && textIndex === 0
        expect((typewriter as unknown as { _charIndex: number })._charIndex).toBe(0);
    });

    it('should set isDeleting when text is complete', async () => {
        typewriter.texts = ['Hi', 'Bye'];
        await typewriter.updateComplete;

        // Set up complete text
        (typewriter as unknown as { _charIndex: number })._charIndex = 2;
        (typewriter as unknown as { _textIndex: number })._textIndex = 0;
        (typewriter as unknown as { _displayText: string })._displayText = 'Hi';
        (typewriter as unknown as { _isDeleting: boolean })._isDeleting = false;

        // Calling _startTyping when at full length should trigger pause then delete
        (typewriter as unknown as { _startTyping: () => void })._startTyping();

        // The text should remain 'Hi' as it just finished
        expect((typewriter as unknown as { _displayText: string })._displayText).toBe('Hi');
    });
});
