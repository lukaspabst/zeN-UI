import { useState } from 'react';
import {
  Activity,
  Bell,
  Code2,
  Command,
  Cpu,
  Database,
  FolderGit2,
  Layers,
  Moon,
  PanelRightOpen,
  Plus,
  Settings,
  Shield,
  Sliders,
  Sun,
  Terminal,
  Trash2,
  Zap,
} from 'lucide-react';
import {
  ZEN_UI_VERSION,
  ZenAccordion,
  ZenAlert,
  ZenAudioController,
  ZenAvatar,
  ZenBadge,
  ZenBreadcrumbs,
  ZenButton,
  ZenCard,
  ZenCheckbox,
  ZenChipFilter,
  ZenCircularGauge,
  ZenCodeBlock,
  ZenCopyButton,
  ZenDataTable,
  ZenDivider,
  ZenDropdown,
  ZenEmptyState,
  ZenFileUpload,
  ZenHeading,
  ZenIconButton,
  ZenInput,
  ZenKbd,
  ZenKpiCard,
  ZenNumberStepper,
  ZenPagination,
  ZenProgressBar,
  ZenRadioGroup,
  ZenSegmentedControl,
  ZenSidebar,
  ZenSkeleton,
  ZenSlider,
  ZenStepper,
  ZenSwitch,
  ZenTabs,
  ZenTextarea,
  ZenTimelineCard,
  ZenTooltip,
  useZenTheme,
  type ZenAudioSynthController,
  type ZenSidebarItem,
  type ZenTableColumn,
  type ZenToastItem,
  type ZenUploadedFile,
} from '../../lib';
import {
  CATALOG_TABS,
  COMPONENT_BENCHMARKS,
  DEPLOY_REGION_OPTIONS,
  FILTER_CHIPS,
  FRAMEWORK_OPTIONS,
  INSTALL_SNIPPETS,
  INSTALL_STACK_SEGMENTS,
  ORION_ACCORDION_ITEMS,
  WORKFLOW_STEPS,
  type CatalogSectionTab,
  type ComponentBenchmarkRow,
  type InstallStackId,
} from '../data/studioWorkbenchData';

export { INSTALL_SNIPPETS, INSTALL_STACK_SEGMENTS, type InstallStackId };

const SIDEBAR_ITEMS: readonly ZenSidebarItem[] = [
  {
    id: 'overview',
    label: 'Package Overview',
    icon: <Cpu className="w-4 h-4" />,
    badge: `v${ZEN_UI_VERSION}`,
  },
  {
    id: 'deployments',
    label: 'UI Primitives',
    icon: <Layers className="w-4 h-4" />,
    badge: 51,
  },
  {
    id: 'telemetry',
    label: 'CSS Token Matrix',
    icon: <Activity className="w-4 h-4" />,
  },
  {
    id: 'security',
    label: 'Capri Guard CLI',
    icon: <Shield className="w-4 h-4" />,
    badge: 'PASS',
  },
  {
    id: 'settings',
    label: 'TS / Build Config',
    icon: <Settings className="w-4 h-4" />,
  },
];

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

export interface ComponentWorkbenchSectionProps {
  readonly audio: ZenAudioSynthController;
  readonly pushToast: (toast: Omit<ZenToastItem, 'id'>) => void;
  readonly onOpenCommandPalette: () => void;
  readonly onOpenDrawer: () => void;
  readonly onOpenModal: () => void;
  readonly installStack: InstallStackId;
  readonly setInstallStack: (stack: InstallStackId) => void;
}

export function ComponentWorkbenchSection({
  audio,
  pushToast,
  onOpenCommandPalette,
  onOpenDrawer,
  onOpenModal,
  installStack,
  setInstallStack,
}: ComponentWorkbenchSectionProps) {
  const { polarity, themeMeta, togglePolarity, density, radius } = useZenTheme();

  const [catalogTab, setCatalogTab] = useState<CatalogSectionTab>('all');
  const [projectName, setProjectName] = useState('JourneyLink Web Workspace');
  const [systemPrompt, setSystemPrompt] = useState(
    'Enforce strict TypeScript (0 any), readonly T[] arrays, WCAG 2.2 AA contrast, and SQLi/XSS/Prompt firewall checks via npx capri guard.'
  );
  const [selectedFramework, setSelectedFramework] = useState('react-19');
  const [workerCount, setWorkerCount] = useState(8);
  const [gpuAllocation, setGpuAllocation] = useState(72);
  const [selectedRegion, setSelectedRegion] = useState('eu-central');
  const [activeChips, setActiveChips] = useState<readonly string[]>([
    'wcag-aa',
    'roving-tab',
    'tabular-nums',
  ]);
  const [uploadedFiles, setUploadedFiles] = useState<readonly ZenUploadedFile[]>([
    { name: 'zen-tokens.config.json', sizeBytes: 4320 },
  ]);
  const [checkAll, setCheckAll] = useState(true);
  const [checkPartial, setCheckPartial] = useState(true);
  const [edgeCacheEnabled, setEdgeCacheEnabled] = useState(true);
  const [strictTypesEnabled, setStrictTypesEnabled] = useState(true);

  const [activeSidebarId, setActiveSidebarId] = useState('overview');
  const [currentPage, setCurrentPage] = useState(2);
  const [activeStepIndex, setActiveStepIndex] = useState(2);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(true);

  const handleTriggerDeploy = () => {
    audio.playMicroClick(680);
    setButtonLoading(true);
    window.setTimeout(() => {
      setButtonLoading(false);
      pushToast({
        title: 'Configuration Synchronized',
        detail: `${projectName} compiled with ${themeMeta.name} (${radius} radius, ${density} density).`,
        tone: 'success',
      });
    }, 600);
  };

  const showForms = catalogTab === 'all' || catalogTab === 'forms';
  const showNavigation = catalogTab === 'all' || catalogTab === 'navigation';
  const showOverlays = catalogTab === 'all' || catalogTab === 'overlays';
  const showData = catalogTab === 'all' || catalogTab === 'data';
  const showFeedback = catalogTab === 'all' || catalogTab === 'feedback';

  return (
    <section id="component-catalog" className="space-y-10">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <ZenHeading
          as="h2"
          size="section"
          eyebrow="03 // GENERAL COMPONENT OVERVIEW (ALL SUITES)"
          accentText="Overview"
        >
          Interactive Component Workbench
        </ZenHeading>

        <ZenTabs
          ariaLabel="Filter Component Suites"
          tabs={CATALOG_TABS}
          activeTab={catalogTab}
          onChange={(next) => {
            audio.playMicroClick(520);
            setCatalogTab(next);
          }}
        />
      </div>

      <ZenCard variant="static" padding="md" className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="zen-telemetry-label text-[var(--zen-accent-primary)]">
              SUITE 01 // ACTIONS, TRIGGERS, BADGES & TOOLTIPS
            </span>
            <h3 className="zen-font-display text-lg font-bold text-[var(--zen-ink-primary)]">
              Buttons, Icon Triggers, Keyboard Badges & Instant Tooltips
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <ZenBadge tone="gold">SPRING PRESS 0.985x</ZenBadge>
            <ZenBadge tone="emerald">WCAG AA FOCUS RING</ZenBadge>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <ZenButton
            variant="primary"
            onClick={handleTriggerDeploy}
            loading={buttonLoading}
            iconLeft={<Zap className="w-4 h-4" />}
          >
            Primary Action
          </ZenButton>

          <ZenButton
            variant="secondary"
            onClick={() =>
              pushToast({
                title: 'Secondary Triggered',
                detail: 'Tactile glass button with 1px specular border.',
                tone: 'info',
              })
            }
            iconLeft={<Sliders className="w-4 h-4 text-[var(--zen-accent-primary)]" />}
          >
            Secondary Glass
          </ZenButton>

          <ZenButton
            variant="ghost"
            mono
            onClick={onOpenCommandPalette}
            iconLeft={<Terminal className="w-4 h-4" />}
          >
            Ghost Mono
          </ZenButton>

          <ZenButton
            variant="danger"
            onClick={() =>
              pushToast({
                title: 'Destructive Action Guarded',
                detail: 'Danger variant uses semantic --zen-status-danger tokens.',
                tone: 'warning',
              })
            }
            iconLeft={<Trash2 className="w-4 h-4" />}
          >
            Danger Purge
          </ZenButton>

          <ZenCopyButton
            value="npm install @zen-ui-capri/system"
            label="COPY INSTALL CMD"
            copiedLabel="COPIED TO CLIPBOARD"
          />

          <ZenTooltip content="Launch Global Command Palette (Ctrl+K)">
            <ZenIconButton
              ariaLabel="Open Command Palette"
              onClick={onOpenCommandPalette}
            >
              <Command className="w-4 h-4 text-[var(--zen-accent-primary)]" />
            </ZenIconButton>
          </ZenTooltip>

          <ZenTooltip content="Open Slide-Over Inspector Drawer">
            <ZenIconButton
              ariaLabel="Open Slide-Over Drawer"
              onClick={onOpenDrawer}
            >
              <PanelRightOpen className="w-4 h-4 text-[var(--zen-accent-primary)]" />
            </ZenIconButton>
          </ZenTooltip>

          <ZenTooltip content="Switch Theme Polarity">
            <ZenIconButton
              ariaLabel="Switch Theme Polarity"
              onClick={togglePolarity}
            >
              {polarity === 'dark' ? (
                <Sun className="w-4 h-4 text-[var(--zen-accent-primary)]" />
              ) : (
                <Moon className="w-4 h-4 text-[var(--zen-accent-primary)]" />
              )}
            </ZenIconButton>
          </ZenTooltip>
        </div>

        <ZenDivider label="BADGES, TAG LISTS & KEYBOARD SHORTCUTS" />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <ZenBadge tone="gold" pulse>
              v{ZEN_UI_VERSION} STABLE
            </ZenBadge>
            <ZenBadge tone="emerald">BUILD PASSING</ZenBadge>
            <ZenBadge tone="amber">33.9 KB GZIP</ZenBadge>
            <ZenBadge tone="coral">SQLi / XSS GUARD</ZenBadge>
            <ZenBadge tone="cyan">SSR READY</ZenBadge>
            <ZenBadge tone="neutral">READ-ONLY</ZenBadge>
          </div>

          <div className="flex items-center gap-2">
            <span className="zen-font-mono text-xs text-[var(--zen-ink-muted)]">
              Shortcuts:
            </span>
            <ZenKbd keys={['Ctrl', 'K']} />
            <ZenKbd keys={['Esc']} />
            <ZenKbd keys={['↵ Enter']} />
          </div>
        </div>
      </ZenCard>

      {showForms && (
        <div id="forms-inputs" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <ZenCard variant="static" padding="md" className="lg:col-span-6 space-y-5">
            <div className="space-y-1">
              <span className="zen-telemetry-label text-[var(--zen-accent-primary)]">
                SUITE 02A // TEXT, NUMERIC & DROPDOWN CONTROLS
              </span>
              <h3 className="zen-font-display text-lg font-bold text-[var(--zen-ink-primary)]">
                Inputs, Textarea, IEEE-754 Stepper, Slider & Dropdown
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ZenInput
                label="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                hint="Used in package.json & dossier header"
                iconLeft={<FolderGit2 className="w-4 h-4" />}
              />

              <ZenDropdown
                label="Target Architecture"
                options={FRAMEWORK_OPTIONS}
                value={selectedFramework}
                onChange={(val) => {
                  audio.playMicroClick(540);
                  setSelectedFramework(val);
                }}
              />
            </div>

            <ZenTextarea
              label="Capri Guard & Architect Rule"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              maxLengthCount={240}
              hint="Validated by npx capri guard in CI/CD"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-1">
              <ZenNumberStepper
                label="Parallel Test Workers"
                value={workerCount}
                min={1}
                max={64}
                step={1}
                unit="workers"
                onChange={setWorkerCount}
              />

              <ZenSlider
                label="Coverage Threshold"
                value={gpuAllocation}
                min={10}
                max={100}
                step={2}
                formatValue={(val) => `${val}%`}
                onChange={setGpuAllocation}
              />
            </div>
          </ZenCard>

          <ZenCard variant="static" padding="md" className="lg:col-span-6 space-y-5">
            <div className="space-y-1">
              <span className="zen-telemetry-label text-[var(--zen-accent-primary)]">
                SUITE 02B // SELECTION, CHIPS, SWITCHES & FILE DROPZONE
              </span>
              <h3 className="zen-font-display text-lg font-bold text-[var(--zen-ink-primary)]">
                Radio Group, Checkboxes, Multi-Chips & Upload
              </h3>
            </div>

            <ZenRadioGroup
              label="Package Consumption Strategy"
              options={DEPLOY_REGION_OPTIONS}
              value={selectedRegion}
              onChange={(val) => {
                audio.playMicroClick(560);
                setSelectedRegion(val);
              }}
            />

            <ZenChipFilter
              label="Active Governance Gates"
              options={FILTER_CHIPS}
              selected={activeChips}
              onChange={(next) => {
                audio.playMicroClick(620);
                setActiveChips(next);
              }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="space-y-2.5 p-3 rounded-2xl border border-[var(--zen-border-subtle)] bg-[var(--zen-surface-subtle)]">
                <ZenCheckbox
                  label="Enforce WCAG 2.2 AA Floor"
                  description="11px min mono & >= 4.5:1 contrast"
                  checked={checkAll}
                  onChange={setCheckAll}
                />
                <ZenCheckbox
                  label="Partial Hydration Mode"
                  description="Indeterminate state demonstration"
                  checked={checkPartial}
                  indeterminate={checkPartial}
                  onChange={setCheckPartial}
                />
              </div>

              <div className="space-y-2.5 p-3 rounded-2xl border border-[var(--zen-border-subtle)] bg-[var(--zen-surface-subtle)]">
                <ZenSwitch
                  label="CSS Token Persistence"
                  description="Save theme in localStorage"
                  checked={edgeCacheEnabled}
                  onChange={setEdgeCacheEnabled}
                />
                <ZenSwitch
                  label="Strict TypeScript Gate"
                  description="Forbid any & enforce readonly T[]"
                  checked={strictTypesEnabled}
                  onChange={setStrictTypesEnabled}
                />
              </div>
            </div>

            <ZenFileUpload
              label="Upload Theme Manifest or Token JSON"
              files={uploadedFiles}
              onFilesChange={(nextFiles) => {
                setUploadedFiles(nextFiles);
                pushToast({
                  title: 'Workspace Artifacts Updated',
                  detail: `${nextFiles.length} file(s) currently attached.`,
                  tone: 'info',
                });
              }}
            />
          </ZenCard>
        </div>
      )}

      {showNavigation && (
        <ZenCard id="navigation" variant="static" padding="md" className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="zen-telemetry-label text-[var(--zen-accent-primary)]">
                SUITE 03 // NAVIGATION, WAYFINDING, STEPPERS & SIDEBARS
              </span>
              <h3 className="zen-font-display text-lg font-bold text-[var(--zen-ink-primary)]">
                Breadcrumbs, Multi-Step Progress, Sidebar Rail & Pagination
              </h3>
            </div>

            <ZenBreadcrumbs
              items={[
                { id: 'root', label: '@zen-ui-capri/system', onClick: () => setActiveSidebarId('overview') },
                { id: 'cluster', label: `v${ZEN_UI_VERSION}`, onClick: () => setActiveSidebarId('deployments') },
                { id: 'node', label: activeSidebarId.toUpperCase() },
              ]}
            />
          </div>

          <ZenStepper
            steps={WORKFLOW_STEPS}
            activeStepIndex={activeStepIndex}
            onStepClick={(idx) => {
              audio.playMicroClick(550);
              setActiveStepIndex(idx);
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pt-2">
            <div className="lg:col-span-4">
              <ZenSidebar
                title="WORKSPACE NAVIGATION"
                items={SIDEBAR_ITEMS}
                activeId={activeSidebarId}
                onSelect={(id) => {
                  audio.playMicroClick(520);
                  setActiveSidebarId(id);
                }}
              />
            </div>

            <div className="lg:col-span-8 p-5 rounded-3xl border border-[var(--zen-border-subtle)] bg-[var(--zen-surface-subtle)] flex flex-col justify-between space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="zen-telemetry-label text-[var(--zen-accent-primary)]">
                    ACTIVE VIEW // {activeSidebarId.toUpperCase()}
                  </span>
                  <h4 className="zen-font-display text-base font-bold text-[var(--zen-ink-primary)]">
                    Synchronized Sidebar & Paginated Table Controls
                  </h4>
                </div>
                <ZenBadge tone="gold">PAGE {currentPage} OF 6</ZenBadge>
              </div>

              <p className="text-xs sm:text-sm text-[var(--zen-ink-secondary)] leading-relaxed">
                Every navigation primitive (<code className="zen-font-mono text-xs">&lt;ZenNavbar /&gt;</code>, <code className="zen-font-mono text-xs">&lt;ZenSidebar /&gt;</code>, <code className="zen-font-mono text-xs">&lt;ZenBreadcrumbs /&gt;</code>, <code className="zen-font-mono text-xs">&lt;ZenStepper /&gt;</code>, <code className="zen-font-mono text-xs">&lt;ZenTabs /&gt;</code>, and <code className="zen-font-mono text-xs">&lt;ZenPagination /&gt;</code>) uses semantic ARIA landmarks and tabular-nums counters so layout widths never shift when numbers change.
              </p>

              <div className="pt-3 border-t border-[var(--zen-border-subtle)] flex flex-wrap items-center justify-between gap-4">
                <span className="zen-font-mono text-[11px] text-[var(--zen-ink-muted)]">
                  Showing records {(currentPage - 1) * 25 + 1}–{currentPage * 25} of 150
                </span>
                <ZenPagination
                  currentPage={currentPage}
                  totalPages={6}
                  onPageChange={(page) => {
                    audio.playMicroClick(560);
                    setCurrentPage(page);
                  }}
                />
              </div>
            </div>
          </div>
        </ZenCard>
      )}

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
                  iconLeft={<PanelRightOpen className="w-3.5 h-3.5 text-[var(--zen-accent-primary)]" />}
                >
                  Open Drawer
                </ZenButton>
                <ZenButton
                  variant="secondary"
                  size="sm"
                  mono
                  onClick={onOpenModal}
                  iconLeft={<Code2 className="w-3.5 h-3.5 text-[var(--zen-accent-primary)]" />}
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
                <ZenCircularGauge
                  value={100}
                  label="Strict TS"
                />
                <ZenCircularGauge
                  value={gpuAllocation}
                  label="Test Target"
                />
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
                iconLeft={<Bell className="w-3.5 h-3.5 text-[var(--zen-accent-primary)]" />}
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
                icon={<Database className="w-6 h-6" />}
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
                    iconLeft={<Plus className="w-4 h-4" />}
                  >
                    Load Defaults
                  </ZenButton>
                }
              />
            </div>
          </div>
        </ZenCard>
      )}
    </section>
  );
}
