import {
  useRef,
  useImperativeHandle,
  type Ref,
} from 'react';
import { ZenSegmentedControl } from '../components/ZenSegmentedControl';

export interface CelestialCatalogEntry {
  readonly id: string;
  readonly badge: string;
  readonly name: string;
  readonly shortName: string;
  readonly classification: string;
  readonly massLabel: string;
  readonly tempLumLabel: string;
  readonly accentHex: string;
  readonly hitRadius: number;
  readonly reticleSize: number;
}

export const DEFAULT_CELESTIAL_CATALOG: readonly CelestialCatalogEntry[] = [
  {
    id: 'alpha-cen-a',
    badge: 'STELLAR CORE 01 · PRIMARY',
    name: 'Alpha Centauri A (Rigil Kentaurus)',
    shortName: 'Alpha Cen A',
    classification: 'G2V Main-Sequence Yellow Star',
    massLabel: '1.100 M☉ (2.19 × 10³⁰ kg)',
    tempLumLabel: '5,790 K · 1.519 L☉',
    accentHex: '#FBBF24',
    hitRadius: 0.56,
    reticleSize: 132,
  },
  {
    id: 'alpha-cen-b',
    badge: 'STELLAR CORE 02 · SECONDARY',
    name: 'Alpha Centauri B (Toliman)',
    shortName: 'Alpha Cen B',
    classification: 'K1V Main-Sequence Orange Star',
    massLabel: '0.907 M☉ (1.80 × 10³⁰ kg)',
    tempLumLabel: '5,260 K · 0.500 L☉',
    accentHex: '#FB923C',
    hitRadius: 0.45,
    reticleSize: 106,
  },
  {
    id: 'proxima-c',
    badge: 'STELLAR CORE 03 · TERTIARY',
    name: 'Proxima Centauri (Alpha Cen C)',
    shortName: 'Proxima C',
    classification: 'M5.5Ve Red Dwarf Flare Star',
    massLabel: '0.540 M☉ (Trisolaran Active Flare)',
    tempLumLabel: '3,042 K · 0.080 L☉',
    accentHex: '#F87171',
    hitRadius: 0.36,
    reticleSize: 86,
  },
  {
    id: 'trisolaris',
    badge: 'TRISOLARAN HOMEWORLD',
    name: 'Planet Trisolaris',
    shortName: 'Trisolaris',
    classification: 'Silicate-Basalt Rocky Exoplanet',
    massLabel: '1.08 M⊕ (6.45 × 10²⁴ kg)',
    tempLumLabel: '3-Sun Tidal & Radiative Flux',
    accentHex: '#60A5FA',
    hitRadius: 0.36,
    reticleSize: 86,
  },
];

export interface ZenTelemetryPayload {
  readonly badge: string;
  readonly name: string;
  readonly classification: string;
  readonly accentHex: string;
  readonly reticleSize: number;
  readonly screenX: number;
  readonly screenY: number;
  readonly massLabel: string;
  readonly tempLumLabel: string;
  readonly velocityLabel: string;
  readonly statusLabel: string;
}

export interface ZenTelemetryBridge {
  readonly commitFrame: (payload: ZenTelemetryPayload | null) => void;
  readonly isOccludedTarget: (target: EventTarget | null) => boolean;
}

export interface ZenTelemetryHudProps {
  readonly bridgeRef?: Ref<ZenTelemetryBridge>;
  readonly declarativeData?: Omit<
    ZenTelemetryPayload,
    'screenX' | 'screenY' | 'reticleSize'
  > | null;
}

const OCCLUDE_SELECTOR =
  '[data-zen-occlude="true"], a, button, input, select, textarea, [role="button"], [role="radiogroup"], [role="tablist"], [role="listbox"], [role="dialog"]';

export function ZenTelemetryHud({
  bridgeRef,
  declarativeData,
}: ZenTelemetryHudProps) {
  const hudContainerRef = useRef<HTMLDivElement | null>(null);
  const reticleRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLSpanElement | null>(null);
  const nameRef = useRef<HTMLDivElement | null>(null);
  const classRef = useRef<HTMLDivElement | null>(null);
  const massRef = useRef<HTMLSpanElement | null>(null);
  const tempLumRef = useRef<HTMLSpanElement | null>(null);
  const velRef = useRef<HTMLSpanElement | null>(null);
  const statusRef = useRef<HTMLSpanElement | null>(null);

  useImperativeHandle(
    bridgeRef,
    () => ({
      isOccludedTarget: (target: EventTarget | null) => {
        const el = target as HTMLElement | null;
        return Boolean(el?.closest?.(OCCLUDE_SELECTOR));
      },
      commitFrame: (payload: ZenTelemetryPayload | null) => {
        const hudEl = hudContainerRef.current;
        const retEl = reticleRef.current;
        if (!hudEl || !retEl) return;

        if (!payload) {
          hudEl.style.opacity = '0';
          retEl.style.opacity = '0';
          return;
        }

        const {
          screenX,
          screenY,
          reticleSize,
          accentHex,
          badge,
          name,
          classification,
          massLabel,
          tempLumLabel,
          velocityLabel,
          statusLabel,
        } = payload;

        retEl.style.opacity = '1';
        retEl.style.width = `${reticleSize}px`;
        retEl.style.height = `${reticleSize}px`;
        retEl.style.borderColor = accentHex;
        retEl.style.transform = `translate3d(${screenX - reticleSize * 0.5}px, ${
          screenY - reticleSize * 0.5
        }px, 0)`;

        const cardX = Math.min(
          Math.max(screenX + reticleSize * 0.5 + 16, 16),
          window.innerWidth - 336
        );
        const cardY = Math.min(
          Math.max(screenY - 76, 88),
          window.innerHeight - 200
        );

        hudEl.style.opacity = '1';
        hudEl.style.transform = `translate3d(${cardX}px, ${cardY}px, 0)`;
        hudEl.style.borderColor = `${accentHex}77`;

        if (badgeRef.current) {
          badgeRef.current.textContent = badge;
          badgeRef.current.style.color = accentHex;
        }
        if (nameRef.current) {
          nameRef.current.textContent = name;
        }
        if (classRef.current) {
          classRef.current.textContent = classification;
        }
        if (massRef.current) {
          massRef.current.textContent = massLabel;
        }
        if (tempLumRef.current) {
          tempLumRef.current.textContent = tempLumLabel;
        }
        if (velRef.current) {
          velRef.current.textContent = velocityLabel;
        }
        if (statusRef.current) {
          statusRef.current.textContent = statusLabel;
        }
      },
    }),
    []
  );

  return (
    <>
      <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
        <div
          ref={reticleRef}
          style={{ opacity: 0 }}
          className="fixed top-0 left-0 rounded-full border border-dashed transition-opacity duration-150"
        />

        <div
          ref={hudContainerRef}
          style={{ opacity: 0 }}
          className="fixed top-0 left-0 w-80 rounded-2xl border bg-[var(--zen-bg-elevated)]/95 backdrop-blur-md p-4 text-[var(--zen-ink-primary)] shadow-[var(--zen-shadow-hud)] transition-opacity duration-150"
        >
          <div className="flex items-center justify-between gap-2 mb-1">
            <span
              ref={badgeRef}
              className="zen-telemetry-label font-semibold"
            />
            <span className="zen-telemetry-label">LIVE TELEMETRY</span>
          </div>
          <div
            ref={nameRef}
            className="zen-font-display font-bold text-sm tracking-tight text-[var(--zen-ink-primary)] leading-snug"
          />
          <div
            ref={classRef}
            className="zen-font-mono text-xs text-[var(--zen-ink-secondary)] mb-2.5"
          />

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[var(--zen-border-subtle)] zen-font-mono text-xs">
            <div>
              <div className="zen-telemetry-label">Mass</div>
              <span
                ref={massRef}
                className="text-[var(--zen-ink-primary)] font-medium"
              />
            </div>
            <div>
              <div className="zen-telemetry-label">Thermal / Lum</div>
              <span
                ref={tempLumRef}
                className="text-[var(--zen-ink-primary)] font-medium"
              />
            </div>
            <div>
              <div className="zen-telemetry-label">Orbital Speed</div>
              <span
                ref={velRef}
                className="text-[var(--zen-accent-primary)] font-semibold"
              />
            </div>
            <div>
              <div className="zen-telemetry-label">State</div>
              <span
                ref={statusRef}
                className="text-[var(--zen-ink-secondary)] truncate block"
              />
            </div>
          </div>
        </div>
      </div>

      {declarativeData && (
        <div
          role="region"
          aria-live="polite"
          aria-label="Locked celestial telemetry inspector"
          data-zen-occlude="true"
          style={{ borderColor: `${declarativeData.accentHex}77` }}
          className="w-full rounded-2xl border bg-[var(--zen-surface-2)] p-5 text-[var(--zen-ink-primary)] shadow-[var(--zen-shadow-resting)]"
        >
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span
              style={{ color: declarativeData.accentHex }}
              className="zen-telemetry-label font-semibold"
            >
              {declarativeData.badge}
            </span>
            <span className="zen-telemetry-label">DECLARATIVE LOCK · A11Y</span>
          </div>
          <div className="zen-font-display font-bold text-lg text-[var(--zen-ink-primary)]">
            {declarativeData.name}
          </div>
          <div className="zen-font-mono text-xs text-[var(--zen-ink-secondary)] mb-3">
            {declarativeData.classification}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[var(--zen-border-subtle)] zen-font-mono text-xs">
            <div>
              <div className="zen-telemetry-label">Mass</div>
              <span className="text-[var(--zen-ink-primary)] font-medium">
                {declarativeData.massLabel}
              </span>
            </div>
            <div>
              <div className="zen-telemetry-label">Thermal / Lum</div>
              <span className="text-[var(--zen-ink-primary)] font-medium">
                {declarativeData.tempLumLabel}
              </span>
            </div>
            <div>
              <div className="zen-telemetry-label">Orbital Speed</div>
              <span className="text-[var(--zen-accent-primary)] font-semibold">
                {declarativeData.velocityLabel}
              </span>
            </div>
            <div>
              <div className="zen-telemetry-label">State</div>
              <span className="text-[var(--zen-ink-secondary)]">
                {declarativeData.statusLabel}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export type ZenTelemetryTargetId =
  | 'auto'
  | 'alpha-cen-a'
  | 'alpha-cen-b'
  | 'proxima-c'
  | 'trisolaris';

export interface ZenTelemetryInspectorProps {
  readonly activeTarget: ZenTelemetryTargetId;
  readonly onSelectTarget: (target: ZenTelemetryTargetId) => void;
  readonly catalog?: readonly CelestialCatalogEntry[];
  readonly className?: string;
}

export function ZenTelemetryInspector({
  activeTarget,
  onSelectTarget,
  catalog = DEFAULT_CELESTIAL_CATALOG,
  className = '',
}: ZenTelemetryInspectorProps) {
  const selectedEntry = catalog.find((c) => c.id === activeTarget) ?? null;

  return (
    <div className={`space-y-4 ${className}`.trim()}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="zen-telemetry-label text-[var(--zen-accent-primary)]">
            SPATIAL TELEMETRY TARGET SELECTOR
          </div>
          <p className="text-xs text-[var(--zen-ink-secondary)] mt-0.5">
            Hover celestial bodies in 3D space or lock a target below via keyboard roving tabindex.
          </p>
        </div>

        <ZenSegmentedControl<ZenTelemetryTargetId>
          ariaLabel="Select celestial telemetry target"
          size="sm"
          value={activeTarget}
          onChange={onSelectTarget}
          items={[
            { value: 'auto', label: 'Pointer Raycast' },
            ...catalog.map((c) => ({
              value: c.id as ZenTelemetryTargetId,
              label: c.shortName,
            })),
          ]}
        />
      </div>

      {selectedEntry && (
        <ZenTelemetryHud
          declarativeData={{
            badge: selectedEntry.badge,
            name: selectedEntry.name,
            classification: selectedEntry.classification,
            accentHex: selectedEntry.accentHex,
            massLabel: selectedEntry.massLabel,
            tempLumLabel: selectedEntry.tempLumLabel,
            velocityLabel:
              selectedEntry.id === 'trisolaris' ? '47.2 km/s' : '24.6 km/s',
            statusLabel:
              selectedEntry.id === 'trisolaris'
                ? 'STABLE ERA · TEMPERATE (Pull: Alpha Cen A)'
                : 'Barycentric N-Body Integration Active',
          }}
        />
      )}
    </div>
  );
}
