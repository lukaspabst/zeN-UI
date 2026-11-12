import { useEffect, useRef } from 'react';
import { useZenTheme } from '../theme/ZenThemeProvider';

export type ZenBackgroundVariant =
  | 'blackwall-lattice'
  | 'aurora-mesh'
  | 'swiss-blueprint'
  | 'minimal-void';

export interface ZenAmbientBackgroundProps {
  readonly variant?: ZenBackgroundVariant;
  readonly interactive?: boolean;
  readonly paused?: boolean;
}

interface DataNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  phase: number;
}

export function ZenAmbientBackground({
  variant = 'blackwall-lattice',
  interactive = true,
  paused = false,
}: ZenAmbientBackgroundProps) {
  const { themeMeta, reducedMotion } = useZenTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.35 });

  useEffect(() => {
    if (!interactive) return;
    const onMove = (e: PointerEvent) => {
      pointerRef.current = {
        x: e.clientX / Math.max(1, window.innerWidth),
        y: e.clientY / Math.max(1, window.innerHeight),
      };
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [interactive]);

  useEffect(() => {
    if (variant === 'minimal-void') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const nodes: DataNode[] = Array.from({ length: 56 }, (_, idx) => ({
      x: (idx * 73) % 1000,
      y: (idx * 137) % 1000,
      vx: ((idx % 5) - 2) * 0.22,
      vy: -0.35 - (idx % 4) * 0.18,
      size: 1.2 + (idx % 3) * 0.9,
      phase: idx * 0.6,
    }));

    let rafId = 0;
    let time = 0;

    const render = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      if (!reducedMotion && !paused) {
        time += 0.014;
      }

      const primary = themeMeta.accentHex;
      const secondary = themeMeta.secondaryHex;
      const isDark = themeMeta.polarity === 'dark';
      const px = pointerRef.current.x * w;
      const py = pointerRef.current.y * h;

      if (variant === 'aurora-mesh') {
        const g1 = ctx.createRadialGradient(
          w * (0.25 + Math.sin(time * 0.7) * 0.12),
          h * (0.28 + Math.cos(time * 0.5) * 0.1),
          20,
          w * 0.35,
          h * 0.35,
          Math.max(w, h) * 0.55
        );
        g1.addColorStop(0, `${primary}${isDark ? '24' : '18'}`);
        g1.addColorStop(1, 'transparent');
        ctx.fillStyle = g1;
        ctx.fillRect(0, 0, w, h);

        const g2 = ctx.createRadialGradient(
          w * (0.75 + Math.cos(time * 0.6) * 0.12),
          h * (0.65 + Math.sin(time * 0.8) * 0.1),
          20,
          w * 0.7,
          h * 0.65,
          Math.max(w, h) * 0.5
        );
        g2.addColorStop(0, `${secondary}${isDark ? '20' : '14'}`);
        g2.addColorStop(1, 'transparent');
        ctx.fillStyle = g2;
        ctx.fillRect(0, 0, w, h);
      } else if (variant === 'swiss-blueprint') {
        const step = 48;
        ctx.strokeStyle = isDark ? `${primary}14` : `${primary}16`;
        ctx.lineWidth = 1;

        for (let x = 0; x < w; x += step) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
          ctx.stroke();
        }
        for (let y = 0; y < h; y += step) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }

        for (let x = step; x < w; x += step * 2) {
          for (let y = step; y < h; y += step * 2) {
            const dist = Math.hypot(x - px, y - py);
            const highlight = Math.max(0, 1 - dist / 280);
            ctx.fillStyle = highlight > 0.2 ? primary : secondary;
            ctx.globalAlpha = (isDark ? 0.22 : 0.28) + highlight * 0.55;
            ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
          }
        }
      } else {
        const spot = ctx.createRadialGradient(px, py, 10, px, py, 460);
        spot.addColorStop(0, `${primary}${isDark ? '1c' : '14'}`);
        spot.addColorStop(0.5, `${secondary}${isDark ? '0d' : '08'}`);
        spot.addColorStop(1, 'transparent');
        ctx.fillStyle = spot;
        ctx.fillRect(0, 0, w, h);

        const horizonY = h * 0.52;
        ctx.strokeStyle = `${primary}${isDark ? '1f' : '22'}`;
        ctx.lineWidth = 1;

        const cols = 18;
        for (let i = -cols; i <= cols; i++) {
          const topX = w * 0.5 + i * (w / cols) * 0.32;
          const botX = w * 0.5 + i * (w / cols) * 1.45;
          ctx.beginPath();
          ctx.moveTo(topX, horizonY);
          ctx.lineTo(botX, h);
          ctx.stroke();
        }

        const rows = 10;
        const offset = (time * 0.8) % 1;
        for (let r = 0; r < rows; r++) {
          const p = Math.pow((r + offset) / rows, 1.75);
          const y = horizonY + p * (h - horizonY);
          ctx.globalAlpha = p * (isDark ? 0.35 : 0.28);
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }

        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          if (!reducedMotion && !paused) {
            n.x = (n.x + n.vx + 1000) % 1000;
            n.y = (n.y + n.vy + 1000) % 1000;
          }
          const nx = (n.x / 1000) * w;
          const ny = (n.y / 1000) * h;

          ctx.globalAlpha =
            (isDark ? 0.35 : 0.4) + Math.sin(time * 2 + n.phase) * 0.2;
          ctx.fillStyle = i % 3 === 0 ? secondary : primary;
          ctx.fillRect(nx, ny, n.size, n.size * 3.2);
        }
      }

      ctx.restore();
      rafId = window.requestAnimationFrame(render);
    };

    rafId = window.requestAnimationFrame(render);
    return () => window.cancelAnimationFrame(rafId);
  }, [variant, themeMeta, reducedMotion, paused]);

  if (variant === 'minimal-void') {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
