import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('zen-typewriter')
export class ZenTypewriter extends LitElement {
    @property({ type: Array }) texts: string[] = ['Hello World'];
    @property({ type: Number }) typeSpeed = 80;
    @property({ type: Number }) deleteSpeed = 50;
    @property({ type: Number }) pauseDuration = 2000;
    @property({ type: Boolean }) loop = true;
    @property({ type: Boolean }) cursor = true;
    @property({ type: String }) cursorChar = '|';

    @state() private _displayText = '';
    @state() private _isDeleting = false;
    @state() private _textIndex = 0;
    @state() private _charIndex = 0;

    private _timeoutId: number | null = null;

    connectedCallback() {
        super.connectedCallback();
        this._startTyping();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this._timeoutId) {
            clearTimeout(this._timeoutId);
        }
    }

    private _startTyping() {
        const currentText = this.texts[this._textIndex] || '';

        if (this._isDeleting) {
            
            this._displayText = currentText.substring(0, this._charIndex - 1);
            this._charIndex--;

            if (this._charIndex === 0) {
                this._isDeleting = false;
                this._textIndex = (this._textIndex + 1) % this.texts.length;

                if (!this.loop && this._textIndex === 0) {
                    return; 
                }
            }

            this._timeoutId = window.setTimeout(() => this._startTyping(), this.deleteSpeed);
        } else {
            
            this._displayText = currentText.substring(0, this._charIndex + 1);
            this._charIndex++;

            if (this._charIndex === currentText.length) {
                
                if (this.texts.length > 1 || this.loop) {
                    this._timeoutId = window.setTimeout(() => {
                        this._isDeleting = true;
                        this._startTyping();
                    }, this.pauseDuration);
                }
                return;
            }

            this._timeoutId = window.setTimeout(() => this._startTyping(), this.typeSpeed);
        }
    }

    static styles = css`
    :host {
      display: inline;
    }

    .typewriter {
      display: inline;
    }

    .cursor {
      display: inline-block;
      animation: blink 1s step-end infinite;
      margin-left: 2px;
      font-weight: 100;
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }

    /* Gradient text support */
    :host([gradient]) .text {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
      background-size: 200% 200%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: gradientShift 3s ease infinite;
    }

    @keyframes gradientShift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
  `;

    render() {
        return html`
      <span class="typewriter">
        <span class="text">${this._displayText}</span>${this.cursor ? html`<span class="cursor">${this.cursorChar}</span>` : ''}
      </span>
    `;
    }
}
