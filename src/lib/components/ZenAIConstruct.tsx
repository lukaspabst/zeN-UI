import { useEffect, useRef, useState } from 'react';
import { Sparkles, Terminal, Activity, ShieldAlert, Cpu, Radio, Maximize2, Minimize2, FileText } from 'lucide-react';
import { useZenTheme } from '../theme/ZenThemeProvider';
import {
  capri,
  CAPRI_SUBROUTINE_SKILLS,
  type CapriSubroutineId,
} from '../capri/capri-engine';
import { ZenBadge } from './ZenBadge';
import { ZenButton, ZenCopyButton } from './ZenButton';

export type ZenAIPersonaMode = CapriSubroutineId;
export type ZenAICameraFraming = 'portrait' | 'full';

export interface ZenAIDirective {
  readonly id: ZenAIPersonaMode;
  readonly label: string;
  readonly status: string;
  readonly frequency: string;
  readonly transmission: string;
  readonly metrics: readonly { readonly k: string; readonly v: string }[];
}

const AI_DIRECTIVES: readonly ZenAIDirective[] = [
  {
    id: 'orion',
    label: 'CAPRI // UNLEASHED',
    status: 'UI SYNTHESIS SUBROUTINE',
    frequency: '51 MODULES · 40 VECTOR ICONS',
    transmission:
      CAPRI_SUBROUTINE_SKILLS.orion.summary,
    metrics: [
      { k: 'AI CHAT CMD', v: '"Capri orion"' },
      { k: 'CLI CMD', v: 'npx capri skill orion' },
      { k: 'PRIMITIVES', v: '51 UNIVERSAL' },
      { k: 'PROD AVATAR', v: 'OMITTED (TREE-SHAKEN)' },
    ],
  },
  {
    id: 'architect',
    label: 'SCS // ARCHITECT',
    status: 'MULTI-STACK & TOKEN GOVERNANCE',
    frequency: 'ZERO ANY · READONLY T[] · --ZEN-*',
    transmission:
      CAPRI_SUBROUTINE_SKILLS.architect.summary,
    metrics: [
      { k: 'AI CHAT CMD', v: '"Capri architect"' },
      { k: 'CLI CMD', v: 'npx capri skill architect' },
      { k: 'TYPING', v: '0 ANY · READONLY T[]' },
      { k: 'STACKS', v: 'REACT / NG 20+ / VUE' },
    ],
  },
  {
    id: 'sentinel',
    label: 'CYBERPSYCHOSIS // GUARD',
    status: 'WCAG 2.2 AA & OVERFLOW AUDITOR',
    frequency: 'ZERO BLUR-RACE · 320PX-4K GUARD',
    transmission:
      CAPRI_SUBROUTINE_SKILLS.sentinel.summary,
    metrics: [
      { k: 'AI CHAT CMD', v: '"Capri guard"' },
      { k: 'CLI CMD', v: 'npx capri skill guard' },
      { k: 'DROPDOWNS', v: 'ONMOUSEDOWN LOCK' },
      { k: 'OVERFLOW', v: '0PX (320PX TO 4K)' },
    ],
  },
  {
    id: 'zen',
    label: 'THEME // MATRIX',
    status: '8-THEME POLARITY & 60FPS MOTION',
    frequency: '4 DARK · 4 LIGHT · SPRING PHYSICS',
    transmission:
      CAPRI_SUBROUTINE_SKILLS.zen.summary,
    metrics: [
      { k: 'AI CHAT CMD', v: '"Capri zen"' },
      { k: 'CLI CMD', v: 'npx capri skill zen' },
      { k: 'POLARITIES', v: '4 DARK · 4 LIGHT' },
      { k: 'MOTION', v: 'REDUCED-MOTION SAFE' },
    ],
  },
  {
    id: 'docu',
    label: 'CAPRI // AUTO-DOCU',
    status: 'ARCHITECTURE & USER-FLOW DOCS',
    frequency: 'MERMAID FLOWCHART · 0 MS BUILD COST',
    transmission:
      CAPRI_SUBROUTINE_SKILLS.docu.summary,
    metrics: [
      { k: 'AI CHAT CMD', v: '"Capri docu"' },
      { k: 'CLI CMD', v: 'npx capri docu' },
      { k: 'OUTPUT', v: 'MARKDOWN + MERMAID' },
      { k: 'BUILD COST', v: '0 MS (ON-DEMAND)' },
    ],
  },
];

export interface ZenAIConstructProps {
  readonly constructName?: string;
  readonly subtitle?: string;
  readonly defaultMode?: ZenAIPersonaMode;
  readonly defaultFraming?: ZenAICameraFraming;
  readonly compact?: boolean;
  readonly className?: string;
}

export function ZenAIConstruct({
  constructName = 'CAPRI // CAPRICORN',
  subtitle = 'EDGERUNNERS S2 SOULKILLER MIXED-CONSTRUCT',
  defaultMode = 'orion',
  defaultFraming = 'portrait',
  compact = false,
  className = '',
}: ZenAIConstructProps) {
  const { themeMeta, reducedMotion, setTheme, setRadius, setDensity } = useZenTheme();
  const [activeMode, setActiveMode] = useState<ZenAIPersonaMode>(defaultMode);
  const [framing, setFraming] = useState<ZenAICameraFraming>(defaultFraming);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(false);
  const [pulseBoost, setPulseBoost] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const spriteRef = useRef<HTMLImageElement | null>(null);
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const zoomInterpRef = useRef<number>(defaultFraming === 'portrait' ? 1 : 0);

  const directive =
    AI_DIRECTIVES.find((d) => d.id === activeMode) ?? AI_DIRECTIVES[0];
  const activeSkill = CAPRI_SUBROUTINE_SKILLS[activeMode];
  const activePromptPayload = voiceEnabled
    ? `${activeSkill.aiSystemPrompt}\n\n${activeSkill.aiVoiceAddendum}`
    : activeSkill.aiSystemPrompt;

  useEffect(() => {
    const img = new Image();
    img.src = '/capri-construct-base.png';
    img.onload = () => {
      spriteRef.current = img;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let time = 0;

    const render = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth || 320;
      const height = canvas.clientHeight || 340;
      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      if (!reducedMotion) {
        time += 0.026;
      }

      const targetZoom = framing === 'portrait' ? 1 : 0;
      zoomInterpRef.current += (targetZoom - zoomInterpRef.current) * 0.12;
      const z = zoomInterpRef.current;

      const crimsonRed = '#FF003C';
      const hotPink = '#FF1268';
      const acidGreen = '#00FF44';
      const irisBlue = '#19A0FF';
      const starkWhite = '#FFFFFF';

      const px = pointerRef.current.x;
      const py = pointerRef.current.y;
      const cx = width * 0.5;
      const cy = height * 0.48;
      const radiusScale = Math.min(width, height) * 0.42;

      const bgGlow = ctx.createRadialGradient(
        cx + px * 10,
        cy - 12 + py * 8,
        8,
        cx,
        cy,
        radiusScale * 1.45
      );
      bgGlow.addColorStop(0, 'rgba(255, 0, 56, 0.24)');
      bgGlow.addColorStop(0.55, 'rgba(180, 12, 72, 0.10)');
      bgGlow.addColorStop(0.85, 'rgba(110, 24, 150, 0.04)');
      bgGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      const sprite = spriteRef.current;
      if (sprite && sprite.complete && sprite.naturalWidth > 0) {
        const floatY = Math.sin(time * 1.85) * 4.0;
        const tiltRad = px * 0.028 + Math.sin(time * 0.9) * 0.008;

        const scaleMult = 1 + z * 0.64;
        const targetH = (height - 30) * 0.96 * scaleMult;
        const aspect = sprite.naturalWidth / sprite.naturalHeight;
        const targetW = targetH * aspect;

        const drawX = cx - targetW * (0.48 + z * 0.02) + px * 7;
        const drawY = (-4 - z * 6) + floatY + py * 4;

        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, width, height - 22);
        ctx.clip();

        ctx.translate(cx, cy);
        ctx.rotate(tiltRad);
        ctx.translate(-cx, -cy);

        if (pulseBoost > 0) {
          ctx.save();
          ctx.globalAlpha = 0.35;
          ctx.drawImage(
            sprite,
            drawX - 3 * pulseBoost,
            drawY,
            targetW,
            targetH
          );
          ctx.drawImage(
            sprite,
            drawX + 3 * pulseBoost,
            drawY + 1,
            targetW,
            targetH
          );
          ctx.restore();
        }

        ctx.drawImage(sprite, drawX, drawY, targetW, targetH);

        const blinkCycle = Math.sin(time * 1.1 - 1.2);
        const isBlinking = blinkCycle > 0.992;

        const eyeOffsetX = px * (2.8 + z * 1.8);
        const eyeOffsetY = py * (2.2 + z * 1.4);

        const mainEyeX = drawX + targetW * 0.5700 + eyeOffsetX;
        const mainEyeY = drawY + targetH * 0.2325 + eyeOffsetY;
        const mainEyeR = targetW * 0.0195;

        const leftEyeX = drawX + targetW * 0.4751 + eyeOffsetX * 0.65;
        const leftEyeY = drawY + targetH * 0.2472 + eyeOffsetY * 0.65;
        const leftEyeR = targetW * 0.0105;

        if (!isBlinking) {
          ctx.beginPath();
          ctx.arc(mainEyeX, mainEyeY, mainEyeR, 0, Math.PI * 2);
          ctx.fillStyle = irisBlue;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(mainEyeX, mainEyeY, mainEyeR * 0.62, 0, Math.PI * 2);
          ctx.fillStyle = '#0D1322';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(
            mainEyeX + px * 0.6,
            mainEyeY + py * 0.5,
            mainEyeR * 0.44,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = starkWhite;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(leftEyeX, leftEyeY, leftEyeR, 0, Math.PI * 2);
          ctx.fillStyle = irisBlue;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(leftEyeX, leftEyeY, leftEyeR * 0.48, 0, Math.PI * 2);
          ctx.fillStyle = starkWhite;
          ctx.fill();
        }

        ctx.restore();
      }

      const barCount = 28;
      const barWidth = (width * 0.68) / barCount;
      const startX = width * 0.16;
      const baseY = height - 13;
      ctx.globalAlpha = 0.88;
      for (let b = 0; b < barCount; b++) {
        const norm = Math.abs(b - barCount * 0.5) / (barCount * 0.5);
        const amp =
          (1 - norm * 0.72) *
          (4 +
            Math.abs(Math.sin(time * 4.2 + b * 0.45)) *
              (9 + pulseBoost * 8));
        ctx.fillStyle =
          b % 3 === 0 ? crimsonRed : b % 5 === 0 ? acidGreen : hotPink;
        ctx.fillRect(
          startX + b * barWidth,
          baseY - amp * 0.5,
          Math.max(2, barWidth - 3),
          amp
        );
      }

      ctx.restore();
      rafId = window.requestAnimationFrame(render);
    };

    rafId = window.requestAnimationFrame(render);
    return () => window.cancelAnimationFrame(rafId);
  }, [themeMeta.accentHex, themeMeta.secondaryHex, reducedMotion, pulseBoost, framing]);

  const handleSelectDirective = (next: ZenAIPersonaMode) => {
    setActiveMode(next);
    setPulseBoost(1);
    window.setTimeout(() => setPulseBoost(0), 650);
  };

  const handleApplySubroutinePreset = () => {
    capri.switchSubroutine(activeMode, {
      applyPresetTheme: true,
      onThemeChange: (nextTheme, nextRadius, nextDensity) => {
        setTheme(nextTheme);
        setRadius(nextRadius);
        setDensity(nextDensity);
      },
    });
    setPulseBoost(1);
    window.setTimeout(() => setPulseBoost(0), 650);
  };

  return (
    <div
      data-zen-occlude="true"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        pointerRef.current = {
          x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
          y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
        };
      }}
      onMouseLeave={() => {
        pointerRef.current = { x: 0, y: 0 };
      }}
      className={`zen-surface-selected overflow-hidden p-4 sm:p-6 lg:p-8 ${className}`.trim()}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div
          className={`${
            compact ? 'lg:col-span-5' : 'lg:col-span-5'
          } relative flex flex-col items-center justify-center rounded-2xl bg-[#07050B] border border-[var(--zen-accent-border)] p-2.5 sm:p-3 overflow-hidden shadow-inner`}
        >
          <div className="w-full flex flex-wrap items-center justify-between gap-2 px-2 pt-1 z-10">
            <span className="zen-telemetry-label text-[#00FF66] flex items-center gap-1.5 truncate">
              <Radio className="w-3.5 h-3.5 animate-pulse shrink-0" />
              <span className="truncate">{directive.frequency}</span>
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() =>
                  setFraming((prev) => (prev === 'portrait' ? 'full' : 'portrait'))
                }
                className="zen-focus-ring inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-[#00FF66]/45 bg-[#00FF66]/10 zen-font-mono text-[10px] text-[#00FF66] hover:bg-[#00FF66]/20 cursor-pointer transition-colors"
              >
                {framing === 'portrait' ? (
                  <>
                    <Minimize2 className="w-2.5 h-2.5" />
                    <span>FULL POSE</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-2.5 h-2.5" />
                    <span>PORTRAIT</span>
                  </>
                )}
              </button>
              <ZenBadge tone="gold" pulse>
                CAPRI LIVE
              </ZenBadge>
            </div>
          </div>

          <canvas
            ref={canvasRef}
            aria-label={`${constructName} Studio Trigger mixed-construct visualization`}
            className="w-full h-72 sm:h-96 block"
          />

          <div className="w-full flex items-center justify-between gap-2 px-2 pb-1 zen-telemetry-label text-[#c8d0dc]">
            <span className="truncate">ARASAKA // MIXED CONSTRUCT</span>
            <span className="shrink-0" style={{ color: '#00FF66' }}>
              {themeMeta.name.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col justify-between space-y-4 sm:space-y-5 min-w-0">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="zen-telemetry-label text-[var(--zen-accent-primary)] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>{subtitle}</span>
              </span>
              <span className="zen-font-mono text-xs text-[var(--zen-accent-secondary)]">
                {directive.status}
              </span>
            </div>

            <div className="flex flex-wrap items-baseline justify-between gap-2 sm:gap-3">
              <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                <h3 className="zen-font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--zen-ink-primary)]">
                  {constructName}
                </h3>
                <span className="zen-font-serif italic text-xl sm:text-2xl text-[var(--zen-accent-primary)]">
                  AI Subroutine Engine & Co-Pilot
                </span>
              </div>
              <button
                type="button"
                aria-pressed={voiceEnabled}
                onClick={() => setVoiceEnabled((prev) => !prev)}
                className={`zen-focus-ring px-2.5 py-1 rounded-full border zen-font-mono text-[11px] cursor-pointer transition-all ${
                  voiceEnabled
                    ? 'bg-[var(--zen-accent-primary)] text-[var(--zen-ink-on-accent)] border-[var(--zen-accent-primary)] font-semibold'
                    : 'bg-[var(--zen-surface-subtle)] text-[var(--zen-ink-secondary)] border-[var(--zen-border-default)] hover:text-[var(--zen-ink-primary)]'
                }`}
              >
                {voiceEnabled ? 'Persona Voice: ON (--voice)' : 'Persona Voice: OFF (Default)'}
              </button>
            </div>

            <div className="mt-3 sm:mt-4 p-3.5 sm:p-4 rounded-2xl bg-[var(--zen-surface-subtle)] border border-[var(--zen-border-default)] space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="zen-telemetry-label text-[var(--zen-accent-secondary)] flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">
                    {voiceEnabled
                      ? `PERSONA VOICE (--VOICE) // ${directive.label}`
                      : `SUBROUTINE SPECIFICATION // ${directive.label}`}
                  </span>
                </div>
                <span className="zen-font-mono text-[11px] text-[var(--zen-accent-primary)]">
                  Ask in Claude / Codex / Gemini: &ldquo;{voiceEnabled ? activeSkill.voiceCommand : activeSkill.chatCommand}&rdquo;
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--zen-ink-primary)] leading-relaxed">
                {voiceEnabled ? `“${activeSkill.personaQuote}”` : activeSkill.summary}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
            {directive.metrics.map((m) => (
              <div
                key={m.k}
                className="p-2.5 rounded-xl bg-[var(--zen-surface-subtle)] border border-[var(--zen-border-subtle)] min-w-0"
              >
                <div className="zen-telemetry-label truncate">{m.k}</div>
                <div className="zen-font-mono text-xs font-semibold text-[var(--zen-ink-primary)] mt-0.5 truncate">
                  {m.v}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[var(--zen-border-subtle)]">
            <span className="zen-telemetry-label mr-1 w-full sm:w-auto">
              5 CAPRI SUBROUTINES:
            </span>
            {AI_DIRECTIVES.map((d) => (
              <ZenButton
                key={d.id}
                size="sm"
                mono
                variant={d.id === activeMode ? 'primary' : 'secondary'}
                onClick={() => handleSelectDirective(d.id)}
                iconLeft={
                  d.id === 'orion' ? (
                    <Activity className="w-3.5 h-3.5" />
                  ) : d.id === 'architect' ? (
                    <Cpu className="w-3.5 h-3.5" />
                  ) : d.id === 'sentinel' ? (
                    <ShieldAlert className="w-3.5 h-3.5" />
                  ) : d.id === 'zen' ? (
                    <Sparkles className="w-3.5 h-3.5" />
                  ) : (
                    <FileText className="w-3.5 h-3.5" />
                  )
                }
              >
                {d.label}
              </ZenButton>
            ))}
          </div>

          <div className="p-3.5 rounded-2xl bg-[var(--zen-surface-subtle)] border border-[var(--zen-border-default)] space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="zen-telemetry-label text-[var(--zen-accent-primary)]">
                RULES ENFORCED BY {activeSkill.chatCommand.toUpperCase()} ({activeSkill.cliCommand})
              </span>
              <ZenBadge tone="emerald">
                0 MS BUILD / RUNTIME COST
              </ZenBadge>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[var(--zen-ink-secondary)]">
              {activeSkill.ruleset.map((rule) => (
                <li key={rule} className="flex items-start gap-1.5">
                  <span className="text-[var(--zen-accent-primary)] zen-font-mono">›</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1.5 border-t border-[var(--zen-border-subtle)]">
              <span className="zen-font-mono text-[11px] text-[var(--zen-ink-muted)]">
                In production apps, &lt;ZenAIConstruct /&gt; is omitted; use these 5 subroutines in Claude, Codex, Gemini, or CLI.
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <ZenButton
                  size="sm"
                  variant="secondary"
                  mono
                  onClick={handleApplySubroutinePreset}
                >
                  Switch Preset ({activeSkill.recommendedTheme})
                </ZenButton>
                <ZenCopyButton
                  size="sm"
                  variant="primary"
                  value={activePromptPayload}
                  label="COPY SKILL FOR CLAUDE / CODEX / GEMINI"
                  copiedLabel="SKILL COPIED"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
