import {
  Activity,
  Cpu,
  FolderGit2,
  Layers,
  Plus,
  Shield,
  Sparkles,
  Zap,
} from 'lucide-react';
import {
  ZenAccordion,
  ZenAIConstruct,
  ZenAlert,
  ZenArchitectureNote,
  ZenAudioController,
  ZenAvatar,
  ZenBadge,
  ZenBreadcrumbs,
  ZenButton,
  ZenCard,
  ZenCheckbox,
  ZenCheckList,
  ZenChipFilter,
  ZenCircularGauge,
  ZenCodeBlock,
  ZenCommandPalette,
  ZenCopyButton,
  ZenDataTable,
  ZenDivider,
  ZenDossierPanel,
  ZenDrawer,
  ZenDropdown,
  ZenEmptyState,
  ZenFileUpload,
  ZenHeading,
  ZenIcon,
  ZenIconButton,
  ZenInput,
  ZEN_ICON_NAMES,
  ZenKbd,
  ZenKpiCard,
  ZenMetricStrip,
  ZenModal,
  ZenNavbar,
  ZenNumberStepper,
  ZenPagination,
  ZenProgressBar,
  ZenRadioGroup,
  ZenSegmentedControl,
  ZenSidebar,
  ZenSkeleton,
  ZenSlider,
  ZenSparkline,
  ZenStepper,
  ZenSwitch,
  ZenTabs,
  ZenTagList,
  ZenTextarea,
  ZenTimelineCard,
  ZenTooltip,
  capri,
  CAPRI_SUBROUTINE_SKILLS,
  type CapriSubroutineId,
  type ZenAICameraFraming,
  type ZenAIPersonaMode,
  type ZenAlertTone,
  type ZenAudioSynthController,
  type ZenBackgroundVariant,
  type ZenBadgeTone,
  type ZenButtonSize,
  type ZenButtonVariant,
  type ZenCardPadding,
  type ZenCardVariant,
  type ZenHeadingLevel,
  type ZenHeadingSize,
  type ZenIconName,
  type ZenIconSize,
  type ZenIconTone,
  type ZenTableColumn,
  type ZenUploadedFile,
} from '../../lib';
import { SHOWCASE_DOSSIERS } from '../../data/studioWorkbenchData';
import type { StoryArgValue, StoryEntry } from './storybookCatalog';

interface SampleRow {
  readonly id: string;
  readonly node: string;
  readonly latency: string;
  readonly status: string;
}

const SAMPLE_TABLE_DATA: readonly SampleRow[] = [
  { id: 'NODE-01', node: 'Frankfurt // Blackwall-01', latency: '0.24 ms', status: 'ONLINE' },
  { id: 'NODE-02', node: 'Tokyo // Capricorn-09', latency: '0.31 ms', status: 'ONLINE' },
  { id: 'NODE-03', node: 'Virginia // Neural-04', latency: '0.42 ms', status: 'SYNCING' },
];

const SAMPLE_COLUMNS: readonly ZenTableColumn<SampleRow>[] = [
  { key: 'id', header: 'Shard ID', mono: true, sortable: true, sortValue: (r) => r.id, render: (r) => r.id },
  { key: 'node', header: 'Cluster Node', sortable: true, sortValue: (r) => r.node, render: (r) => r.node },
  { key: 'latency', header: 'P99 Latency', align: 'right', mono: true, sortable: true, sortValue: (r) => r.latency, render: (r) => r.latency },
  {
    key: 'status',
    header: 'State',
    align: 'right',
    render: (r) => (
      <ZenBadge tone={r.status === 'ONLINE' ? 'emerald' : 'gold'}>{r.status}</ZenBadge>
    ),
  },
];

export interface StorybookStageRendererProps {
  readonly activeStory: StoryEntry;
  readonly currentArgs: Record<string, StoryArgValue>;
  readonly updateArg: (propName: string, nextValue: StoryArgValue) => void;
  readonly chipValues: readonly string[];
  readonly setChipValues: (nextSelected: readonly string[]) => void;
  readonly uploadedFiles: readonly ZenUploadedFile[];
  readonly setUploadedFiles: (nextFiles: readonly ZenUploadedFile[]) => void;
  readonly setSelectedId: (id: string) => void;
  readonly togglePolarity: () => void;
  readonly audio: ZenAudioSynthController;
}

export function StorybookStageRenderer({
  activeStory,
  currentArgs,
  updateArg,
  chipValues,
  setChipValues,
  uploadedFiles,
  setUploadedFiles,
  setSelectedId,
  togglePolarity,
  audio,
}: StorybookStageRendererProps) {
  switch (activeStory.id) {
    case 'zen-button':
      return (
        <ZenButton
          variant={String(currentArgs.variant ?? 'primary') as ZenButtonVariant}
          size={String(currentArgs.size ?? 'md') as ZenButtonSize}
          pressed={Boolean(currentArgs.pressed)}
          mono={Boolean(currentArgs.mono)}
          loading={Boolean(currentArgs.loading)}
          disabled={Boolean(currentArgs.disabled)}
          iconLeft={currentArgs.iconLeft ? <Zap className="w-4 h-4" /> : undefined}
          iconRight={currentArgs.iconRight ? <Sparkles className="w-4 h-4" /> : undefined}
          className={String(currentArgs.className ?? '')}
          onClick={() => audio.playMicroClick(620)}
        >
          {String(currentArgs.children ?? 'Execute Capricorn Protocol')}
        </ZenButton>
      );

    case 'zen-copy-button':
      return (
        <ZenCopyButton
          value={String(currentArgs.value ?? 'npm install @zen-ui/system')}
          label={String(currentArgs.label ?? 'COPY INSTALL CMD')}
          copiedLabel={String(currentArgs.copiedLabel ?? 'COPIED TO CLIPBOARD')}
          variant={String(currentArgs.variant ?? 'secondary') as ZenButtonVariant}
          size={String(currentArgs.size ?? 'md') as ZenButtonSize}
          className={String(currentArgs.className ?? '')}
        />
      );

    case 'zen-icon-button':
      return (
        <ZenIconButton
          ariaLabel={String(currentArgs.ariaLabel ?? 'Trigger Neural Pulse')}
          active={Boolean(currentArgs.active)}
          disabled={Boolean(currentArgs.disabled)}
          className={String(currentArgs.className ?? '')}
          onClick={() => updateArg('active', !currentArgs.active)}
        >
          <ZenIcon name="sparkles" size="md" />
        </ZenIconButton>
      );

    case 'zen-icon': {
      const selectedIconName = String(currentArgs.name ?? 'bolt') as ZenIconName;
      const selectedSize = String(currentArgs.size ?? 'lg') as ZenIconSize;
      const selectedTone = String(currentArgs.tone ?? 'accent') as ZenIconTone;
      const strokeW = Number(currentArgs.strokeWidth ?? 1.85);
      return (
        <div className="w-full space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-4 p-4 rounded-xl bg-[var(--zen-surface-1)] border border-[var(--zen-border-default)]">
            <div className="w-14 h-14 rounded-2xl bg-[var(--zen-accent-subtle)] border border-[var(--zen-accent-border)] flex items-center justify-center">
              <ZenIcon
                name={selectedIconName}
                size={selectedSize}
                tone={selectedTone}
                strokeWidth={strokeW}
                spin={Boolean(currentArgs.spin)}
                ariaLabel={String(currentArgs.ariaLabel ?? '') || undefined}
                className={String(currentArgs.className ?? '')}
              />
            </div>
            <div className="space-y-1 text-left">
              <div className="zen-font-mono text-xs font-bold text-[var(--zen-ink-primary)]">
                &lt;ZenIcon name="{selectedIconName}" size="{selectedSize}" tone="{selectedTone}" /&gt;
              </div>
              <div className="zen-font-mono text-[11px] text-[var(--zen-ink-muted)]">
                W3C Custom Element: &lt;zen-icon name="{selectedIconName}" size="{selectedSize}" tone="{selectedTone}"&gt;&lt;/zen-icon&gt;
              </div>
            </div>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-1.5">
            {ZEN_ICON_NAMES.map((glyphName) => {
              const isCurrent = glyphName === selectedIconName;
              return (
                <button
                  key={glyphName}
                  type="button"
                  onClick={() => {
                    audio.playMicroClick(620);
                    updateArg('name', glyphName);
                  }}
                  title={`Select ${glyphName}`}
                  className={`p-2 rounded-xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer zen-focus-ring ${
                    isCurrent
                      ? 'bg-[var(--zen-accent-subtle)] border border-[var(--zen-accent-border)] text-[var(--zen-accent-primary)]'
                      : 'bg-[var(--zen-surface-1)] border border-[var(--zen-border-subtle)] text-[var(--zen-ink-secondary)] hover:text-[var(--zen-ink-primary)]'
                  }`}
                >
                  <ZenIcon
                    name={glyphName}
                    size="md"
                    tone={isCurrent ? 'accent' : 'inherit'}
                    strokeWidth={strokeW}
                  />
                  <span className="zen-font-mono text-[9px] truncate w-full text-center">
                    {glyphName}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    case 'zen-segmented-control':
      return (
        <ZenSegmentedControl
          ariaLabel={String(currentArgs.ariaLabel ?? 'Camera Framing Mode')}
          size={(String(currentArgs.size ?? 'md') as 'sm' | 'md')}
          items={[
            { value: 'portrait', label: 'Portrait' },
            { value: 'full', label: 'Full Pose' },
            { value: 'telemetry', label: 'Telemetry', count: 8 },
          ]}
          value={String(currentArgs.value ?? 'portrait')}
          onChange={(next) => updateArg('value', next)}
          className={String(currentArgs.className ?? '')}
        />
      );

    case 'zen-input':
      return (
        <div className="w-full max-w-md">
          <ZenInput
            label={String(currentArgs.label ?? 'Neural Endpoint URI')}
            value={String(currentArgs.value ?? '')}
            placeholder={String(currentArgs.placeholder ?? '')}
            hint={String(currentArgs.hint ?? '') || undefined}
            error={String(currentArgs.error ?? '') || undefined}
            mono={Boolean(currentArgs.mono)}
            disabled={Boolean(currentArgs.disabled)}
            iconLeft={currentArgs.iconLeft ? <FolderGit2 className="w-4 h-4" /> : undefined}
            iconRight={currentArgs.iconRight ? <Sparkles className="w-4 h-4" /> : undefined}
            onChange={(e) => updateArg('value', e.target.value)}
          />
        </div>
      );

    case 'zen-textarea':
      return (
        <div className="w-full max-w-md">
          <ZenTextarea
            label={String(currentArgs.label ?? 'System Directive Prompt')}
            value={String(currentArgs.value ?? '')}
            hint={String(currentArgs.hint ?? '') || undefined}
            error={String(currentArgs.error ?? '') || undefined}
            maxLengthCount={Number(currentArgs.maxLengthCount ?? 240)}
            rows={Number(currentArgs.rows ?? 3)}
            mono={Boolean(currentArgs.mono)}
            disabled={Boolean(currentArgs.disabled)}
            onChange={(e) => updateArg('value', e.target.value)}
          />
        </div>
      );

    case 'zen-dropdown':
      return (
        <div className="w-full max-w-sm">
          <ZenDropdown
            label={String(currentArgs.label ?? 'Target Deployment Node')}
            value={String(currentArgs.value ?? 'eu-central')}
            align={(String(currentArgs.align ?? 'start') as 'start' | 'end')}
            ariaLabel={String(currentArgs.ariaLabel ?? 'Select deployment node')}
            onChange={(next) => updateArg('value', next)}
            options={[
              {
                value: 'eu-central',
                label: 'EU-Central (Frankfurt // Node 01)',
                description: 'Sub-8ms routing with zero-knowledge encryption',
              },
              {
                value: 'ap-tokyo',
                label: 'AP-Northeast (Tokyo // Capricorn Lab)',
                description: 'Primary Soulkiller construct synchronization cluster',
              },
              {
                value: 'us-east',
                label: 'US-East (Virginia // Neural Relay)',
                description: 'High-availability GPU inference replica',
              },
            ]}
          />
        </div>
      );

    case 'zen-number-stepper':
      return (
        <ZenNumberStepper
          label={String(currentArgs.label ?? 'Worker Shard Replicas')}
          value={Number(currentArgs.value ?? 16)}
          min={Number(currentArgs.min ?? 1)}
          max={Number(currentArgs.max ?? 64)}
          step={Number(currentArgs.step ?? 1)}
          unit={String(currentArgs.unit ?? 'nodes')}
          disabled={Boolean(currentArgs.disabled)}
          onChange={(next) => updateArg('value', next)}
        />
      );

    case 'zen-switch':
      return (
        <div className="w-full max-w-md">
          <ZenSwitch
            label={String(currentArgs.label ?? 'Blackwall Intrusion Countermeasures')}
            description={String(currentArgs.description ?? '')}
            checked={Boolean(currentArgs.checked)}
            disabled={Boolean(currentArgs.disabled)}
            onChange={(next) => updateArg('checked', next)}
          />
        </div>
      );

    case 'zen-checkbox':
      return (
        <div className="w-full max-w-md">
          <ZenCheckbox
            label={String(currentArgs.label ?? 'Enforce WCAG 2.2 AA Contrast Floor')}
            description={String(currentArgs.description ?? '')}
            checked={Boolean(currentArgs.checked)}
            indeterminate={Boolean(currentArgs.indeterminate)}
            disabled={Boolean(currentArgs.disabled)}
            onChange={(next) => {
              updateArg('indeterminate', false);
              updateArg('checked', next);
            }}
          />
        </div>
      );

    case 'zen-radio-group':
      return (
        <div className="w-full max-w-md">
          <ZenRadioGroup
            label={String(currentArgs.label ?? 'Construct Synchronization Protocol')}
            value={String(currentArgs.value ?? 'capricorn')}
            onChange={(next) => updateArg('value', next)}
            options={[
              {
                value: 'capricorn',
                label: 'Capri // Capricorn Mixed-Construct',
                description: 'High-energy Edgerunners S2 neural co-pilot with live optical tracking.',
                badge: 'RECOMMENDED',
              },
              {
                value: 'atelier',
                label: 'Swiss Editorial Daylight Mode',
                description: 'Warm archival cotton paper stock for long-form documentation.',
                badge: 'LIGHT',
              },
            ]}
          />
        </div>
      );

    case 'zen-slider':
      return (
        <div className="w-full max-w-md">
          <ZenSlider
            label={String(currentArgs.label ?? 'GPU Raytracing & Post-Processing Budget')}
            value={Number(currentArgs.value ?? 78)}
            min={Number(currentArgs.min ?? 0)}
            max={Number(currentArgs.max ?? 100)}
            step={Number(currentArgs.step ?? 2)}
            disabled={Boolean(currentArgs.disabled)}
            formatValue={(v) => `${v}% TDP`}
            onChange={(next) => updateArg('value', next)}
          />
        </div>
      );

    case 'zen-chip-filter':
      return (
        <ZenChipFilter
          label={String(currentArgs.label ?? 'Active Architecture Guards')}
          options={[
            { value: 'wcag', label: 'WCAG 2.2 AA' },
            { value: 'strict', label: 'Zero Any TypeScript' },
            { value: 'roving', label: 'Roving TabIndex' },
            { value: 'universal', label: 'W3C Custom Elements' },
          ]}
          selected={chipValues}
          onChange={setChipValues}
        />
      );

    case 'zen-file-upload':
      return (
        <div className="w-full max-w-md">
          <ZenFileUpload
            label={String(currentArgs.label ?? 'Upload Construct Configuration Shard')}
            acceptHint={String(currentArgs.acceptHint ?? 'JSON, YAML, ICS, or PDF up to 25 MB')}
            files={uploadedFiles}
            onFilesChange={setUploadedFiles}
          />
        </div>
      );

    case 'zen-navbar':
      return (
        <div className="w-full border border-[var(--zen-border-default)] rounded-2xl overflow-hidden">
          <ZenNavbar
            className="!static"
            brandTitle={String(currentArgs.brandTitle ?? 'zeN-UI // CAPRI')}
            brandSubtitle={String(currentArgs.brandSubtitle ?? 'CAPRICORN · DARK POLARITY')}
            navSlot={
              currentArgs.navSlot ? (
                <>
                  <span className="px-2.5 py-1 text-xs zen-font-mono text-[var(--zen-accent-primary)]">01. Core</span>
                  <span className="px-2.5 py-1 text-xs zen-font-mono text-[var(--zen-ink-secondary)]">02. Themes</span>
                </>
              ) : undefined
            }
            actionsSlot={
              currentArgs.actionsSlot ? (
                <ZenButton size="sm" variant="secondary">Action</ZenButton>
              ) : undefined
            }
          />
        </div>
      );

    case 'zen-tabs':
      return (
        <ZenTabs
          ariaLabel={String(currentArgs.ariaLabel ?? 'Storybook Preview Tabs')}
          activeTab={String(currentArgs.activeTab ?? 'telemetry')}
          onChange={(next) => updateArg('activeTab', next)}
          tabs={[
            { id: 'telemetry', label: 'Live Telemetry', badge: '99.9%' },
            { id: 'tokens', label: 'CSS Tokens', badge: '8' },
            { id: 'security', label: 'Blackwall ICE', badge: 'OK' },
          ]}
        />
      );

    case 'zen-breadcrumbs':
      return (
        <ZenBreadcrumbs
          items={[
            { id: 'root', label: String(currentArgs.rootLabel ?? 'zeN-UI Workspace'), onClick: () => void 0 },
            { id: 'catalog', label: String(currentArgs.sectionLabel ?? 'Storybook Explorer'), onClick: () => void 0 },
            { id: 'active', label: String(currentArgs.currentLabel ?? 'ZenBreadcrumbs') },
          ]}
        />
      );

    case 'zen-pagination':
      return (
        <ZenPagination
          currentPage={Number(currentArgs.currentPage ?? 2)}
          totalPages={Number(currentArgs.totalPages ?? 6)}
          onPageChange={(next) => updateArg('currentPage', next)}
        />
      );

    case 'zen-stepper':
      return (
        <div className="w-full">
          <ZenStepper
            activeStepIndex={Number(currentArgs.activeStepIndex ?? 1)}
            onStepClick={(next) => updateArg('activeStepIndex', next)}
            steps={[
              { id: 'tokens', title: 'Token Matrix', subtitle: '8 Polarities' },
              { id: 'construct', title: 'Capri Link', subtitle: 'Eye Tracking' },
              { id: 'deploy', title: 'Universal Build', subtitle: 'React / NG / Vue' },
            ]}
          />
        </div>
      );

    case 'zen-sidebar':
      return (
        <div className="w-full max-w-xs">
          <ZenSidebar
            title={String(currentArgs.title ?? 'CAPRICORN NODES')}
            activeId={String(currentArgs.activeId ?? 'nodes')}
            onSelect={(next) => updateArg('activeId', next)}
            items={[
              { id: 'nodes', label: 'Neural Overview', icon: <Cpu className="w-4 h-4" />, badge: 'LIVE' },
              { id: 'streams', label: 'Telemetry Streams', icon: <Activity className="w-4 h-4" />, badge: 8 },
              { id: 'shield', label: 'Blackwall Shield', icon: <Shield className="w-4 h-4" /> },
            ]}
          />
        </div>
      );

    case 'zen-card':
      return (
        <div className="w-full max-w-md">
          <ZenCard
            variant={String(currentArgs.variant ?? 'interactive') as ZenCardVariant}
            padding={String(currentArgs.padding ?? 'md') as ZenCardPadding}
            selected={Boolean(currentArgs.selected)}
            disabled={Boolean(currentArgs.disabled)}
            selectOnHover={Boolean(currentArgs.selectOnHover)}
            onSelect={() => updateArg('selected', !currentArgs.selected)}
            className="space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="zen-telemetry-label text-[var(--zen-accent-primary)]">
                SURFACE // {String(currentArgs.variant ?? 'interactive').toUpperCase()}
              </span>
              <ZenBadge tone="gold">{String(currentArgs.padding ?? 'md').toUpperCase()} PADDING</ZenBadge>
            </div>
            <h4 className="zen-font-display text-lg font-bold">
              {String(currentArgs.children ?? 'Frosted Optical Glass Card')}
            </h4>
            <p className="text-xs text-[var(--zen-ink-secondary)] leading-relaxed">
              Uses 16px backdrop blur, top-edge specular highlight, and theme-adaptive elevation shadows.
            </p>
          </ZenCard>
        </div>
      );

    case 'zen-heading':
      return (
        <ZenHeading
          as={String(currentArgs.as ?? 'h2') as ZenHeadingLevel}
          size={String(currentArgs.size ?? 'section') as ZenHeadingSize}
          eyebrow={String(currentArgs.eyebrow ?? '') || undefined}
          accentText={String(currentArgs.accentText ?? '') || undefined}
          subtitle={String(currentArgs.subtitle ?? '') || undefined}
        >
          {String(currentArgs.children ?? 'Architectural Precision for')}
        </ZenHeading>
      );

    case 'zen-modal':
      return (
        <div className="text-center space-y-3">
          <ZenButton variant="primary" onClick={() => updateArg('open', true)}>
            Launch Focus-Trapped Modal (open={String(Boolean(currentArgs.open))})
          </ZenButton>
          <ZenModal
            open={Boolean(currentArgs.open)}
            onClose={() => updateArg('open', false)}
            eyebrow={String(currentArgs.eyebrow ?? 'STORYBOOK // MODAL STAGE')}
            title={String(currentArgs.title ?? 'Capri Construct Diagnostic Dialog')}
            subtitle={String(currentArgs.subtitle ?? '') || undefined}
            footer={
              currentArgs.footer ? (
                <ZenButton variant="primary" size="sm" onClick={() => updateArg('open', false)}>
                  Confirm & Close
                </ZenButton>
              ) : undefined
            }
          >
            <p className="text-xs sm:text-sm text-[var(--zen-ink-secondary)]">
              Press <ZenKbd keys={['Esc']} /> or click the backdrop to close this focus-managed modal overlay.
            </p>
          </ZenModal>
        </div>
      );

    case 'zen-drawer':
      return (
        <div className="text-center space-y-3">
          <ZenButton variant="primary" onClick={() => updateArg('open', true)}>
            Open Slide-Over Inspector Drawer (open={String(Boolean(currentArgs.open))})
          </ZenButton>
          <ZenDrawer
            open={Boolean(currentArgs.open)}
            onClose={() => updateArg('open', false)}
            title={String(currentArgs.title ?? 'Node Telemetry Drawer')}
            subtitle={String(currentArgs.subtitle ?? '') || undefined}
            footer={
              currentArgs.footer ? (
                <ZenButton variant="primary" size="sm" onClick={() => updateArg('open', false)}>
                  Close Drawer
                </ZenButton>
              ) : undefined
            }
          >
            <ZenAlert tone="info" title="Slide-Over Active">
              Supports Escape key and backdrop click dismissal.
            </ZenAlert>
          </ZenDrawer>
        </div>
      );

    case 'zen-command-palette':
      return (
        <div className="text-center space-y-3">
          <ZenButton variant="secondary" mono onClick={() => updateArg('open', true)}>
            Open Command Palette (open={String(Boolean(currentArgs.open))})
          </ZenButton>
          <ZenCommandPalette
            open={Boolean(currentArgs.open)}
            onClose={() => updateArg('open', false)}
            placeholder={String(currentArgs.placeholder ?? 'Execute a command or jump to a primitive...')}
            items={[
              {
                id: 'toggle-polarity',
                label: 'Toggle Dark / Light Polarity',
                group: 'Theme Engine',
                shortcut: ['CTRL', 'P'],
                onSelect: () => togglePolarity(),
              },
              {
                id: 'jump-button',
                label: 'Inspect ZenButton in Storybook',
                group: 'Storybook',
                shortcut: ['ENTER'],
                onSelect: () => setSelectedId('zen-button'),
              },
            ]}
          />
        </div>
      );

    case 'zen-accordion':
      return (
        <div className="w-full max-w-lg">
          <ZenAccordion
            key={String(currentArgs.defaultOpenId ?? 'acc-1')}
            defaultOpenId={String(currentArgs.defaultOpenId ?? 'acc-1')}
            className={String(currentArgs.className ?? '')}
            items={[
              {
                id: 'acc-1',
                title: 'Zero Blur-Race Dropdown Architecture',
                badge: 'VERIFIED',
                content: 'Option rows bind to onMouseDown so selection fires before input blur unmounts the menu.',
              },
              {
                id: 'acc-2',
                title: 'Cross-Framework Custom Elements',
                badge: 'W3C',
                content: 'All core constructs register in window.customElements for Angular 20+, Vue 3, and Svelte.',
              },
            ]}
          />
        </div>
      );

    case 'zen-tooltip':
      return (
        <ZenTooltip content={String(currentArgs.content ?? 'Sub-millisecond CSS custom property token lookup')}>
          <ZenButton variant="secondary" mono>
            Hover or Focus for Tooltip
          </ZenButton>
        </ZenTooltip>
      );

    case 'zen-divider':
      return (
        <div className="w-full max-w-md">
          <ZenDivider
            label={String(currentArgs.label ?? '') || undefined}
            className={String(currentArgs.className ?? '')}
          />
        </div>
      );

    case 'zen-architecture-note':
      return (
        <div className="w-full max-w-md">
          <ZenArchitectureNote
            label={String(currentArgs.label ?? 'SCS AUTONOMY RULE')}
            className={String(currentArgs.className ?? '')}
          >
            {String(currentArgs.children ?? 'Shared-nothing isolation enforced: zero cross-service database joins.')}
          </ZenArchitectureNote>
        </div>
      );

    case 'zen-check-list':
      return (
        <div className="w-full max-w-md">
          <ZenCheckList
            items={[
              String(currentArgs.firstItem ?? 'WCAG 2.2 AA contrast verified across all 8 themes'),
              String(currentArgs.secondItem ?? 'Zero any TypeScript compilation'),
              '320px mobile to 4K ultrawide responsive layout',
            ]}
          />
        </div>
      );

    case 'zen-data-table':
      return (
        <div className="w-full">
          <ZenDataTable<SampleRow>
            caption={String(currentArgs.caption ?? 'Active Capricorn Cluster Nodes')}
            emptyMessage={String(currentArgs.emptyMessage ?? 'No telemetry records available.')}
            columns={SAMPLE_COLUMNS}
            rows={currentArgs.showEmptyState ? [] : SAMPLE_TABLE_DATA}
            rowKey={(r) => r.id}
          />
        </div>
      );

    case 'zen-kpi-card':
      return (
        <div className="w-full max-w-sm">
          <ZenKpiCard
            label={String(currentArgs.label ?? 'NEURAL INFERENCE THROUGHPUT')}
            value={String(currentArgs.value ?? '14,820 req/s')}
            delta={String(currentArgs.delta ?? '+18.4%')}
            trend={(String(currentArgs.trend ?? 'up') as 'up' | 'down')}
            subtitle={String(currentArgs.subtitle ?? '') || undefined}
            sparkline={currentArgs.showSparkline ? [40, 48, 45, 58, 64, 61, 74, 82, 89, 96] : undefined}
          />
        </div>
      );

    case 'zen-sparkline':
      return (
        <div className="p-4 rounded-xl bg-[var(--zen-surface-1)] border border-[var(--zen-border-default)]">
          <ZenSparkline
            data={[18, 24, 21, 35, 42, 38, 54, 68, 64, 82]}
            width={Number(currentArgs.width ?? 220)}
            height={Number(currentArgs.height ?? 56)}
          />
        </div>
      );

    case 'zen-metric-strip':
      return (
        <div className="w-full">
          <ZenMetricStrip
            columns={(Number(currentArgs.columns ?? 3) as 2 | 3 | 4)}
            metrics={[
              { value: '51', label: 'Storybook Modules', accent: true },
              { value: '8 Themes', label: '4 Dark · 4 Light' },
              { value: '0.28 ms', label: 'P99 Frame Budget' },
              { value: '100%', label: 'Prop Coverage' },
            ]}
          />
        </div>
      );

    case 'zen-progress-bar':
      return (
        <div className="w-full max-w-md">
          <ZenProgressBar
            label={String(currentArgs.label ?? 'Blackwall Containment Integrity')}
            value={Number(currentArgs.value ?? 84)}
            max={Number(currentArgs.max ?? 100)}
            unit={String(currentArgs.unit ?? '%')}
          />
        </div>
      );

    case 'zen-circular-gauge':
      return (
        <ZenCircularGauge
          label={String(currentArgs.label ?? 'Compliance Score')}
          value={Number(currentArgs.value ?? 92)}
          max={Number(currentArgs.max ?? 100)}
          unit={String(currentArgs.unit ?? '%')}
          size={Number(currentArgs.size ?? 96)}
        />
      );

    case 'zen-avatar':
      return (
        <ZenAvatar
          name={String(currentArgs.name ?? 'Capri Capricorn')}
          status={(String(currentArgs.status ?? 'online') as 'online' | 'busy' | 'offline')}
          size={(String(currentArgs.size ?? 'lg') as 'sm' | 'md' | 'lg')}
          src={String(currentArgs.src ?? '') || undefined}
        />
      );

    case 'zen-code-block':
      return (
        <div className="w-full max-w-lg">
          <ZenCodeBlock
            title={String(currentArgs.title ?? 'zen-tokens.config.ts')}
            language={String(currentArgs.language ?? 'TS')}
            code={String(currentArgs.code ?? '')}
          />
        </div>
      );

    case 'zen-dossier-panel': {
      const idx = Math.max(0, Math.min(SHOWCASE_DOSSIERS.length - 1, Number(currentArgs.dossierIndex ?? 0)));
      return (
        <div className="w-full">
          <ZenDossierPanel item={SHOWCASE_DOSSIERS[idx]} />
        </div>
      );
    }

    case 'zen-timeline-card':
      return (
        <div className="w-full max-w-md">
          <ZenTimelineCard
            period={String(currentArgs.period ?? '2026 // Q4')}
            location={String(currentArgs.location ?? '8 Themes · 51 Modules')}
            title={String(currentArgs.title ?? 'Project Capricorn Neural Release')}
            institution={String(currentArgs.institution ?? '@zen-ui/system')}
            summary={String(currentArgs.summary ?? '')}
            bullets={[
              'Zero external UI dependencies; 100% strict TypeScript.',
              'Full WAI-ARIA keyboard navigation and reduced-motion compliance.',
            ]}
            tags={['React 19', 'Angular 20+', 'Vue 3', 'WCAG AA']}
          />
        </div>
      );

    case 'zen-badge':
      return (
        <ZenBadge
          tone={String(currentArgs.tone ?? 'gold') as ZenBadgeTone}
          pulse={Boolean(currentArgs.pulse)}
          icon={currentArgs.icon ? <Sparkles className="w-3 h-3" /> : undefined}
          className={String(currentArgs.className ?? '')}
        >
          {String(currentArgs.children ?? 'CAPRICORN SYNC LIVE')}
        </ZenBadge>
      );

    case 'zen-tag-list': {
      const parsedTags = String(currentArgs.csvTags ?? '@zen-ui/system, Capri // Capricorn')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      return <ZenTagList tags={parsedTags} className={String(currentArgs.className ?? '')} />;
    }

    case 'zen-kbd': {
      const parsedKeys = String(currentArgs.csvKeys ?? 'Ctrl, K')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      return <ZenKbd keys={parsedKeys} className={String(currentArgs.className ?? '')} />;
    }

    case 'zen-alert':
      return (
        <div className="w-full max-w-lg">
          <ZenAlert
            tone={String(currentArgs.tone ?? 'info') as ZenAlertTone}
            title={String(currentArgs.title ?? 'Neural Firewall Synchronized')}
            actionSlot={
              currentArgs.actionSlot ? (
                <ZenButton size="sm" variant="secondary">Acknowledge</ZenButton>
              ) : undefined
            }
          >
            {String(currentArgs.children ?? '')}
          </ZenAlert>
        </div>
      );

    case 'zen-skeleton':
      return (
        <div className="w-full max-w-md p-4 rounded-2xl bg-[var(--zen-surface-1)] border border-[var(--zen-border-default)]">
          <ZenSkeleton
            lines={Number(currentArgs.lines ?? 3)}
            className={String(currentArgs.className ?? '')}
          />
        </div>
      );

    case 'zen-empty-state':
      return (
        <div className="w-full max-w-md">
          <ZenEmptyState
            title={String(currentArgs.title ?? 'No Active Telemetry Streams')}
            description={String(currentArgs.description ?? '')}
            icon={<Layers className="w-5 h-5" />}
            actionSlot={
              currentArgs.actionSlot ? (
                <ZenButton size="sm" variant="primary" iconLeft={<Plus className="w-4 h-4" />}>
                  Provision Stream
                </ZenButton>
              ) : undefined
            }
          />
        </div>
      );

    case 'zen-ai-construct':
      return (
        <div className="w-full">
          <ZenAIConstruct
            key={`${String(currentArgs.defaultMode)}-${String(currentArgs.defaultFraming)}`}
            constructName={String(currentArgs.constructName ?? 'CAPRI // CAPRICORN')}
            subtitle={String(currentArgs.subtitle ?? 'EDGERUNNERS S2 SOULKILLER MIXED-CONSTRUCT')}
            defaultMode={String(currentArgs.defaultMode ?? 'orion') as ZenAIPersonaMode}
            defaultFraming={String(currentArgs.defaultFraming ?? 'portrait') as ZenAICameraFraming}
            compact={Boolean(currentArgs.compact)}
          />
        </div>
      );

    case 'zen-ambient-background':
      return (
        <div className="w-full max-w-md p-6 rounded-2xl border border-[var(--zen-border-default)] bg-[var(--zen-surface-1)] text-center space-y-2 relative overflow-hidden">
          <ZenBadge tone="gold">
            VARIANT: {String(currentArgs.variant ?? 'blackwall-lattice') as ZenBackgroundVariant}
          </ZenBadge>
          <p className="text-xs text-[var(--zen-ink-secondary)]">
            Interactive spotlight: <strong>{String(Boolean(currentArgs.interactive))}</strong>. Renders fixed behind the viewport (`z-index: 0`).
          </p>
        </div>
      );

    case 'zen-audio-controller':
      return (
        <ZenAudioController
          synth={audio}
          mode={(String(currentArgs.mode ?? 'deck') as 'pill' | 'deck')}
        />
      );

    case 'capri-engine': {
      const subId = String(currentArgs.subroutine ?? 'sentinel') as CapriSubroutineId;
      const docuOutput = String(currentArgs.docuOutput ?? 'markdown-dossier');
      const voiceMode = Boolean(currentArgs.voiceMode);
      const skill = CAPRI_SUBROUTINE_SKILLS[subId];
      const doc = capri.docu();
      const report = doc.audit;
      const taskStr = String(currentArgs.userTask ?? '');
      const promptGuard = capri.scanPromptInjection(taskStr);
      const payload =
        docuOutput === 'mermaid-flowchart'
          ? doc.mermaidDiagram
          : docuOutput === 'agent-skill-prompt'
            ? capri.buildAgentPrompt(subId, taskStr, voiceMode)
            : capri.exportMarkdownDocu(subId, taskStr, voiceMode);
      return (
        <div className="w-full max-w-2xl space-y-4">
          <ZenCard variant="static" padding="md" className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="zen-telemetry-label text-[var(--zen-accent-primary)]">
                  HEADLESS RUNTIME & AUTO-DOCU ENGINE // {skill.codeName}
                </div>
                <h4 className="zen-font-display text-lg font-bold text-[var(--zen-ink-primary)]">
                  {skill.title}
                </h4>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <ZenBadge tone={voiceMode ? 'gold' : 'neutral'}>
                  VOICE: {voiceMode ? 'ON (--VOICE)' : 'OFF (DEFAULT)'}
                </ZenBadge>
                <ZenBadge tone={promptGuard.safe && report.promptInjectionSafe ? 'emerald' : 'coral'}>
                  PROMPT GUARD: {promptGuard.safe && report.promptInjectionSafe ? 'CLEAN' : `${promptGuard.threatCount + report.promptThreatsCount} BLOCKED`}
                </ZenBadge>
                <ZenBadge tone={report.passed ? 'emerald' : 'coral'}>
                  AUDIT SCORE: {report.score}/100 · {report.horizontalOverflowPx}PX OVERFLOW
                </ZenBadge>
              </div>
            </div>
            <p className="text-xs text-[var(--zen-ink-secondary)] leading-relaxed">
              {voiceMode ? `“${skill.personaQuote}”` : skill.summary}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="p-2 rounded-xl bg-[var(--zen-surface-subtle)] border border-[var(--zen-border-subtle)]">
                <div className="zen-telemetry-label">LANDMARKS</div>
                <div className="zen-font-mono text-xs font-bold text-[var(--zen-ink-primary)]">
                  {doc.landmarks.length} Sections
                </div>
              </div>
              <div className="p-2 rounded-xl bg-[var(--zen-surface-subtle)] border border-[var(--zen-border-subtle)]">
                <div className="zen-telemetry-label">USER FLOWS</div>
                <div className="zen-font-mono text-xs font-bold text-[var(--zen-ink-primary)]">
                  {doc.userFlows.length} Mapped
                </div>
              </div>
              <div className="p-2 rounded-xl bg-[var(--zen-surface-subtle)] border border-[var(--zen-border-subtle)]">
                <div className="zen-telemetry-label">TRIGGERS</div>
                <div className="zen-font-mono text-xs font-bold text-[var(--zen-ink-primary)]">
                  {doc.inventory.buttons} Buttons
                </div>
              </div>
              <div className="p-2 rounded-xl bg-[var(--zen-surface-subtle)] border border-[var(--zen-border-subtle)]">
                <div className="zen-telemetry-label">FORMS & TABLES</div>
                <div className="zen-font-mono text-xs font-bold text-[var(--zen-ink-primary)]">
                  {doc.inventory.inputsAndSelects} Inputs · {doc.inventory.tables} Tables
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[var(--zen-surface-2)] border border-[var(--zen-border-default)] max-h-48 overflow-y-auto">
              <div className="zen-telemetry-label text-[var(--zen-accent-secondary)] mb-1">
                LIVE AUTO-GENERATED CONTEXT ({docuOutput.toUpperCase()})
              </div>
              <pre className="zen-font-mono text-[11px] text-[var(--zen-ink-secondary)] whitespace-pre-wrap break-words m-0">
                {payload}
              </pre>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[var(--zen-border-subtle)]">
              <span className="zen-font-mono text-[11px] text-[var(--zen-ink-muted)]">
                Preset: {skill.recommendedTheme} · {skill.recommendedRadius} · {skill.recommendedDensity}
              </span>
              <ZenCopyButton
                size="sm"
                variant="primary"
                value={payload}
                label="COPY AUTO-DOCU & AI CONTEXT"
                copiedLabel="COPIED TO CLIPBOARD"
              />
            </div>
          </ZenCard>
        </div>
      );
    }

    default:
      return null;
  }
}
