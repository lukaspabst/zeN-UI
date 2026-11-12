import { useState } from 'react';
import {
  ZEN_UI_VERSION,
  ZenBadge,
  ZenBreadcrumbs,
  ZenButton,
  ZenCard,
  ZenCheckbox,
  ZenChipFilter,
  ZenCopyButton,
  ZenDivider,
  ZenDropdown,
  ZenFileUpload,
  ZenHeading,
  ZenIcon,
  ZenIconButton,
  ZenInput,
  ZenKbd,
  ZenNumberStepper,
  ZenPagination,
  ZenRadioGroup,
  ZenSidebar,
  ZenSlider,
  ZenStepper,
  ZenSwitch,
  ZenTabs,
  ZenTextarea,
  ZenTooltip,
  useZenTheme,
  type ZenAudioSynthController,
  type ZenSidebarItem,
  type ZenToastItem,
  type ZenUploadedFile,
} from '../../lib';
import {
  CATALOG_TABS,
  DEPLOY_REGION_OPTIONS,
  FILTER_CHIPS,
  FRAMEWORK_OPTIONS,
  INSTALL_SNIPPETS,
  INSTALL_STACK_SEGMENTS,
  WORKFLOW_STEPS,
  type CatalogSectionTab,
  type InstallStackId,
} from '../data/studioWorkbenchData';
import { WorkbenchOverlaysAndData } from './WorkbenchOverlaysAndData';

export { INSTALL_SNIPPETS, INSTALL_STACK_SEGMENTS, type InstallStackId };

const SIDEBAR_ITEMS: readonly ZenSidebarItem[] = [
  {
    id: 'overview',
    label: 'Package Overview',
    icon: <ZenIcon name="cpu" size="md" />,
    badge: `v${ZEN_UI_VERSION}`,
  },
  {
    id: 'deployments',
    label: 'UI Primitives',
    icon: <ZenIcon name="layers" size="md" />,
    badge: 51,
  },
  {
    id: 'telemetry',
    label: 'CSS Token Matrix',
    icon: <ZenIcon name="activity" size="md" />,
  },
  {
    id: 'security',
    label: 'Capri Guard CLI',
    icon: <ZenIcon name="shield" size="md" />,
    badge: 'PASS',
  },
  {
    id: 'settings',
    label: 'TS / Build Config',
    icon: <ZenIcon name="sliders" size="md" />,
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
            iconLeft={<ZenIcon name="bolt" size="md" />}
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
            iconLeft={<ZenIcon name="sliders" size="md" tone="accent" />}
          >
            Secondary Glass
          </ZenButton>

          <ZenButton
            variant="ghost"
            mono
            onClick={onOpenCommandPalette}
            iconLeft={<ZenIcon name="terminal" size="md" />}
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
            iconLeft={<ZenIcon name="trash" size="md" />}
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
              <ZenIcon name="command" size="md" tone="accent" />
            </ZenIconButton>
          </ZenTooltip>

          <ZenTooltip content="Open Slide-Over Inspector Drawer">
            <ZenIconButton
              ariaLabel="Open Slide-Over Drawer"
              onClick={onOpenDrawer}
            >
              <ZenIcon name="panel-right" size="md" tone="accent" />
            </ZenIconButton>
          </ZenTooltip>

          <ZenTooltip content="Switch Theme Polarity">
            <ZenIconButton
              ariaLabel="Switch Theme Polarity"
              onClick={togglePolarity}
            >
              {polarity === 'dark' ? (
                <ZenIcon name="sun" size="md" tone="accent" />
              ) : (
                <ZenIcon name="moon" size="md" tone="accent" />
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
                iconLeft={<ZenIcon name="folder" size="md" />}
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

      <WorkbenchOverlaysAndData
        showOverlays={showOverlays}
        showData={showData}
        showFeedback={showFeedback}
        audio={audio}
        polarity={polarity}
        themeMeta={themeMeta}
        gpuAllocation={gpuAllocation}
        alertVisible={alertVisible}
        setAlertVisible={setAlertVisible}
        pushToast={pushToast}
        onOpenDrawer={onOpenDrawer}
        onOpenModal={onOpenModal}
        installStack={installStack}
        setInstallStack={setInstallStack}
      />
    </section>
  );
}
