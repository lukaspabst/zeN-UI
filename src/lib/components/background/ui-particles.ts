import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
}

@customElement('zen-particles')
export class ZenParticles extends LitElement {
    @property({ type: Number }) count = 50;
    @property({ type: String }) color = '#667eea';
    @property({ type: Number }) minSize = 2;
    @property({ type: Number }) maxSize = 6;
    @property({ type: Number }) speed = 1;
    @property({ type: Boolean }) connected = true;
    @property({ type: Number }) connectionDistance = 150;

    @state() private _particles: Particle[] = [];

    private _canvas: HTMLCanvasElement | null = null;
    private _ctx: CanvasRenderingContext2D | null = null;
    private _animationFrame: number | null = null;
    private _width = 0;
    private _height = 0;

    static styles = css`
    :host {
      display: block;
      position: relative;
      overflow: hidden;
    }

    .container {
      position: relative;
      width: 100%;
      height: 100%;
      min-height: 400px;
    }

    canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .content {
      position: relative;
      z-index: 1;
      height: 100%;
    }
  `;

    firstUpdated() {
        this._canvas = this.shadowRoot?.querySelector('canvas') || null;
        if (this._canvas) {
            this._ctx = this._canvas.getContext('2d');
            this._resize();
            this._initParticles();
            this._animate();
        }

        window.addEventListener('resize', this._handleResize);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this._animationFrame) {
            cancelAnimationFrame(this._animationFrame);
        }
        window.removeEventListener('resize', this._handleResize);
    }

    private _handleResize = () => {
        this._resize();
    };

    private _resize() {
        if (!this._canvas) return;
        const rect = this.getBoundingClientRect();
        this._width = rect.width;
        this._height = rect.height;
        this._canvas.width = this._width;
        this._canvas.height = this._height;
    }

    private _initParticles() {
        this._particles = [];
        for (let i = 0; i < this.count; i++) {
            this._particles.push({
                x: Math.random() * this._width,
                y: Math.random() * this._height,
                size: Math.random() * (this.maxSize - this.minSize) + this.minSize,
                speedX: (Math.random() - 0.5) * this.speed,
                speedY: (Math.random() - 0.5) * this.speed,
                opacity: Math.random() * 0.5 + 0.3,
            });
        }
    }

    private _animate = () => {
        if (!this._ctx || !this._canvas) return;

        this._ctx.clearRect(0, 0, this._width, this._height);

        
        this._particles.forEach((particle, i) => {
            
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            
            if (particle.x < 0) particle.x = this._width;
            if (particle.x > this._width) particle.x = 0;
            if (particle.y < 0) particle.y = this._height;
            if (particle.y > this._height) particle.y = 0;

            
            this._ctx!.beginPath();
            this._ctx!.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this._ctx!.fillStyle = this._hexToRgba(this.color, particle.opacity);
            this._ctx!.fill();

            
            if (this.connected) {
                for (let j = i + 1; j < this._particles.length; j++) {
                    const other = this._particles[j];
                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < this.connectionDistance) {
                        const opacity = (1 - distance / this.connectionDistance) * 0.3;
                        this._ctx!.beginPath();
                        this._ctx!.moveTo(particle.x, particle.y);
                        this._ctx!.lineTo(other.x, other.y);
                        this._ctx!.strokeStyle = this._hexToRgba(this.color, opacity);
                        this._ctx!.lineWidth = 1;
                        this._ctx!.stroke();
                    }
                }
            }
        });

        this._animationFrame = requestAnimationFrame(this._animate);
    };

    private _hexToRgba(hex: string, alpha: number): string {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (result) {
            return `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})`;
        }
        return hex;
    }

    render() {
        return html`
      <div class="container">
        <canvas></canvas>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;
    }
}
