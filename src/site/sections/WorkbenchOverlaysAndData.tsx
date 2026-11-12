import {
  ZEN_UI_VERSION,
  ZenAccordion,
  ZenAlert,
  ZenAudioController,
  ZenAvatar,
  ZenBadge,
  ZenButton,
  ZenCard,
  ZenCircularGauge,
  ZenCodeBlock,
  ZenDataTable,
  ZenEmptyState,
  ZenIcon,
  ZenKpiCard,
  ZenProgressBar,
  ZenSegmentedControl,
  ZenSkeleton,
  ZenTimelineCard,
  type ZenAudioSynthController,
  type ZenTableColumn,
  type ZenThemeMetadata,
  type ZenToastItem,
} from '../../lib';
import {
  COMPONENT_BENCHMARKS,
  INSTALL_SNIPPETS,
  INSTALL_STACK_SEGMENTS,
  ORION_ACCORDION_ITEMS,
  type ComponentBenchmarkRow,
  type InstallStackId,
} from '../data/studioWorkbenchData';

const BENCHMARK_COLUMNS: readonly ZenTableColumn<ComponentBenchmarkRow>[] = [
  {
    key: 'component',
    header: 'Component Primitive',
    sortable: true,
    sortValue: (row) => row.component,
    render: (row) => (
      <span className="zen-font-mono text-xs font-medium text-[var(--zen-accent-primary)]">
        {row.component}
      </span>
    ),
  },
  {
    key: 'category',
    header: 'Domain Suite',
    sortable: true,
    sortValue: (row) => row.category,
    render: (row) => (
      <span className="text-xs text-[var(--zen-ink-secondary)]">{row.category}</span>
    ),
  },
  {
    key: 'a11yPattern',
    header: 'Interaction & Accessibility Contract',
    render: (row) => (
      <span className="zen-font-mono text-[11px] text-[var(--zen-ink-muted)]">
        {row.a11yPattern}
      </span>
    ),
  },
  {
    key: 'renderCostMs',
    header: 'Frame Budget',
    align: 'right',
    sortable: true,
    sortValue: (row) => row.renderCostMs,
    render: (row) => (
      <span className="zen-font-mono text-xs text-[var(--zen-ink-primary)]">
        {row.renderCostMs.toFixed(1)} ms
      </span>
    ),
  },
  {
    key: 'status',
    header: 'Gate Status',
    align: 'right',
    render: (row) => (
      <ZenBadge tone={row.status === 'HYBRID 60FPS' ? 'gold' : 'emerald'}>
        {row.status}
      </ZenBadge>
    ),
  },
];

export interface WorkbenchOverlaysAndDataProps {
  readonly showOverlays: boolean;
  readonly showData: boolean;
  readonly showFeedback: boolean;
  readonly audio: ZenAudioSynthController;
  readonly polarity: 'dark' | 'light';
  readonly themeMeta: ZenThemeMetadata;
  readonly gpuAllocation: number;
  readonly alertVisible: boolean;
  readonly setAlertVisible: (visible: boolean) => void;
  readonly pushToast: (toast: Omit<ZenToastItem, 'id'>) => void;
  readonly onOpenDrawer: () => void;
  readonly onOpenModal: () => void;
  readonly installStack: InstallStackId;
  readonly setInstallStack: (stack: InstallStackId) => void;
}

export function WorkbenchOverlaysAndData({
  showOverlays,
  showData,
  showFeedback,
  audio,
  polarity,
  themeMeta,
  gpuAllocation,
  alertVisible,
  setAlertVisible,
  pushToast,
  onOpenDrawer,
  onOpenModal,
  installStack,
  setInstallStack,
}: WorkbenchOverlaysAndDataProps) {
  return (
    <>
      {showOverlays && (
        <div id="overlays" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <ZenCard variant="static" padding="md" className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="zen-telemetry-label text-[var(--zen-accent-primary)]">
                  SUITE 04A // ACCORDIONS, MODALS, DRAWERS & COMMAND PALETTE
                </span>
                <h3 className="zen-font-display text-lg font-bold text-[var(--zen-ink-primary)]">
                  Developer Architecture FAQ & Focus-Restoring Overlays
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <ZenButton
                  variant="secondary"
                  size="sm"
                  mono
                  onClick={onOpenDrawer}
                  iconLeft={<ZenIcon name="panel-right" size="sm" tone="accent" />}
                >
                  Open Drawer
                </ZenButton>
                <ZenButton
                  variant="secondary"
                  size="sm"
                  mono
                  onClick={onOpenModal}
                  iconLeft={<ZenIcon name="code" size="sm" tone="accent" />}
                >
                  Open Modal
                </ZenButton>
              </div>
            </div>

            <ZenAccordion items={ORION_ACCORDION_ITEMS} defaultOpenId="arch-1" />
          </ZenCard>

          <ZenCard variant="static" padding="md" className="lg:col-span-5 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="zen-telemetry-label text-[var(--zen-accent-primary)]">
                  SUITE 04B // RELEASE CHANGELOG & WEB AUDIO SYNTH
                </span>
                <h3 className="zen-font-display text-lg font-bold text-[var(--zen-ink-primary)]">
                  Release Timeline Card & Zero-Asset Audio Deck
                </h3>
              </div>

              <ZenTimelineCard
                period={`RELEASE v${ZEN_UI_VERSION} // UNIFIED PACKAGE`}
                location="8 Themes · 51 Modules · 40 Icons"
                title="Unified @zen-ui-capri/system NPM Package & Capri CLI"
                institution="@zen-ui-capri/system"
                summary="Consolidated all 51 React 19 primitives, W3C Custom Elements, 40 vector icons, 8 CSS token themes, and the Capri AI CLI into one versioned npm tarball with zero external UI runtime dependencies."
                bullets={[
                  '33.9 kB gzipped ESM library bundle + 6.96 kB CSS token sheet.',
                  'Includes SQLi, XSS, and prompt-injection scanners via npx capri guard.',
                ]}
                tags={['React 19', 'Angular 20+', 'W3C Custom Elements', 'Capri CLI']}
              />
            </div>

            <ZenAudioController synth={audio} mode="deck" />
          </ZenCard>
        </div>
      )}

      {showData && (
        <div id="data-display" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <ZenKpiCard
              label="ESM LIBRARY BUNDLE (GZIP)"
              value="33.9 kB"
              delta="0 UI Deps"
              trend="up"
              subtitle="51 modules + 40 SVG icons + Capri core"
              sparkline={[48, 44, 41, 39, 37, 36, 35, 34.4, 34.1, 33.9]}
            />
            <ZenKpiCard
              label="CAPRI GUARD SCAN LATENCY"
              value="0.12 ms"
              delta="Zero-Runtime"
              trend="up"
              subtitle="SQLi, XSS & prompt-injection static check"
              sparkline={[0.35, 0.28, 0.24, 0.2, 0.18, 0.16, 0.15, 0.14, 0.13, 0.12]}
            />
            <ZenKpiCard
              label="ACTIVE THEME CONTRAST FLOOR"
              value="8.42 : 1"
              delta="WCAG AAA"
              trend="up"
              subtitle={`Verified on ${themeMeta.name}`}
              sparkline={[8.4, 8.4, 8.4, 8.4, 8.4, 8.4]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <ZenCard variant="static" padding="md" className="lg:col-span-5 space-y-5 flex flex-col justify-between">
              <div className="space-y-1">
                <span className="zen-telemetry-label text-[var(--zen-accent-primary)]">
                  SUITE 05A // GAUGES, PROGRESS BARS & AVATARS
                </span>
                <h3 className="zen-font-display text-lg font-bold text-[var(--zen-ink-primary)]">
                  Quality Gate Gauges & Presence Indicators
                </h3>
              </div>

              <div className="flex flex-wrap items-center justify-around gap-4 py-2">
                <ZenCircularGauge value={100} label="Strict TS" />
                <ZenCircularGauge value={gpuAllocation} label="Test Target" />
              </div>

              <div className="space-y-3">
                <ZenProgressBar
                  label="WCAG 2.2 AA Contrast Verification (8/8 Themes)"
                  value={100}
                />
                <ZenProgressBar
                  label="Capri Guard Security & A11y Audit"
                  value={100}
                />
                <ZenProgressBar
                  label="Tree-Shaken Consumer Footprint (Portfolio App)"
                  value={32}
                />
              </div>

              <div className="pt-3 border-t border-[var(--zen-border-subtle)] flex items-center justify-between gap-3">
                <span className="zen-telemetry-label">MAINTAINERS & AGENTS:</span>
                <div className="flex items-center gap-2.5">
                  <ZenAvatar name="Lukas Pabst" status="online" size="md" />
                  <ZenAvatar name="Capri Guard" status="online" size="md" />
                  <ZenAvatar name="Capri Architect" status="busy" size="md" />
                  <ZenAvatar name="CI Runner" status="offline" size="md" />
                </div>
              </div>
            </ZenCard>

            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="zen-telemetry-label text-[var(--zen-accent-primary)]">
                  MULTI-STACK TARGET // SELECT FRAMEWORK
                </span>
                <ZenSegmentedControl
                  ariaLabel="Select Quickstart Stack"
                  size="sm"
                  items={INSTALL_STACK_SEGMENTS}
                  value={installStack}
                  onChange={(next) => {
                    audio.playMicroClick(560);
                    setInstallStack(next);
                  }}
                />
              </div>
              <ZenCodeBlock
                title={`QUICKSTART // ${INSTALL_SNIPPETS[installStack].title.toUpperCase()}`}
                language={INSTALL_SNIPPETS[installStack].lang}
                code={INSTALL_SNIPPETS[installStack].code}
              />
            </div>
          </div>

          <ZenCard variant="static" padding="md" className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="zen-telemetry-label text-[var(--zen-accent-primary)]">
                  SUITE 05B // SORTABLE GENERIC DATA TABLE
                </span>
                <h3 className="zen-font-display text-lg font-bold text-[var(--zen-ink-primary)]">
                  Component Architecture & Accessibility Contract Registry
                </h3>
              </div>
              <ZenBadge tone="gold">CLICK HEADERS TO SORT</ZenBadge>
            </div>

            <ZenDataTable
              caption="zeN-UI Universal Component Registry"
              columns={BENCHMARK_COLUMNS}
              rows={COMPONENT_BENCHMARKS}
              rowKey={(row) => row.id}
            />
          </ZenCard>
        </div>
      )}

      {showFeedback && (
        <ZenCard id="feedback" variant="static" padding="md" className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="zen-telemetry-label text-[var(--zen-accent-primary)]">
                SUITE 06 // FEEDBACK, ALERTS, SKELETONS & EMPTY STATES
              </span>
              <h3 className="zen-font-display text-lg font-bold text-[var(--zen-ink-primary)]">
                Actionable System Alerts, Shimmer Placeholders & Zero-Data States
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <ZenButton
                variant="secondary"
                size="sm"
                mono
                onClick={() =>
                  pushToast({
                    title: 'Telemetry Snapshot Saved',
                    detail: `Active theme ${themeMeta.name} synchronized.`,
                    tone: 'info',
                  })
                }
                iconLeft={<ZenIcon name="radio" size="sm" tone="accent" />}
              >
                Trigger Toast
              </ZenButton>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alertVisible ? (
              <ZenAlert
                tone="info"
                title={`@zen-ui-capri/system v${ZEN_UI_VERSION} Unified Package Ready`}
                actionSlot={
                  <ZenButton
                    variant="ghost"
                    size="sm"
                    mono
                    onClick={() => setAlertVisible(false)}
                  >
                    Dismiss
                  </ZenButton>
                }
              >
                All 8 themes and 51 modules share one CSS Custom Property sheet (<code>tokens.css</code>) with zero runtime style recalculation.
              </ZenAlert>
            ) : (
              <ZenAlert
                tone="info"
                title="Alert Banner Dismissed"
                actionSlot={
                  <ZenButton
                    variant="secondary"
                    size="sm"
                    mono
                    onClick={() => setAlertVisible(true)}
                  >
                    Restore Alert
                  </ZenButton>
                }
              >
                Click restore to re-mount the alert banner.
              </ZenAlert>
            )}

            <ZenAlert tone="success" title="WCAG 2.2 AA Contrast Verified">
              All 4 dark and 4 light themes maintain &gt;= 4.5:1 body contrast and &gt;= 5.1:1 primary button ink contrast.
            </ZenAlert>

            <ZenAlert tone="warning" title="Compact Density Mode Available">
              Switch density to Compact in Section 02 to tighten vertical padding for data-heavy tables, logs, or financial views.
            </ZenAlert>

            <ZenAlert tone="danger" title="Capri Guard SQLi / XSS / Prompt Firewall">
              Run <code>npx capri guard</code> in CI or call <code>capri.scanSqlInjection()</code> / <code>capri.sanitizeForPrompt()</code> on untrusted inputs.
            </ZenAlert>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pt-2">
            <div className="lg:col-span-5 p-5 rounded-3xl border border-[var(--zen-border-subtle)] bg-[var(--zen-surface-subtle)] space-y-4">
              <div className="flex items-center justify-between">
                <span className="zen-telemetry-label text-[var(--zen-accent-primary)]">
                  SHIMMER SKELETON PLACEHOLDERS
                </span>
                <ZenBadge tone="neutral">ARIA-BUSY</ZenBadge>
              </div>
              <ZenSkeleton lines={4} />
            </div>

            <div className="lg:col-span-7">
              <ZenEmptyState
                title="No Custom Token Overrides Loaded"
                description="Upload a JSON token manifest or select one of the 8 built-in dark and light themes to preview live CSS variable overrides."
                icon={<ZenIcon name="database" size="xl" />}
                actionSlot={
                  <ZenButton
                    variant="primary"
                    size="sm"
                    onClick={() =>
                      pushToast({
                        title: 'Default Tokens Verified',
                        detail: `Loaded ${themeMeta.name} (${polarity} polarity) token defaults.`,
                        tone: 'success',
                      })
                    }
                    iconLeft={<ZenIcon name="plus" size="md" />}
                  >
                    Load Defaults
                  </ZenButton>
                }
              />
            </div>
          </div>
        </ZenCard>
      )}
    </>
  );
}
