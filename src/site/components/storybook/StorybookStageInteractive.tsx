import {
  ZenAccordion,
  ZenAlert,
  ZenArchitectureNote,
  ZenBadge,
  ZenBreadcrumbs,
  ZenButton,
  ZenCard,
  ZenCheckbox,
  ZenCheckList,
  ZenChipFilter,
  ZenCommandPalette,
  ZenCopyButton,
  ZenDivider,
  ZenDrawer,
  ZenDropdown,
  ZenFileUpload,
  ZenHeading,
  ZenIcon,
  ZenIconButton,
  ZenInput,
  ZEN_ICON_NAMES,
  ZenKbd,
  ZenModal,
  ZenNavbar,
  ZenNumberStepper,
  ZenPagination,
  ZenRadioGroup,
  ZenSegmentedControl,
  ZenSidebar,
  ZenSlider,
  ZenStepper,
  ZenSwitch,
  ZenTabs,
  ZenTextarea,
  ZenTooltip,
  type ZenButtonSize,
  type ZenButtonVariant,
  type ZenCardPadding,
  type ZenCardVariant,
  type ZenHeadingLevel,
  type ZenHeadingSize,
  type ZenIconName,
  type ZenIconSize,
  type ZenIconTone,
} from '../../../lib';
import type { StorybookStageRendererProps } from './StorybookStageRenderer';

export function StorybookStageInteractive({
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
          iconLeft={currentArgs.iconLeft ? <ZenIcon name="bolt" size="md" /> : undefined}
          iconRight={currentArgs.iconRight ? <ZenIcon name="sparkles" size="md" /> : undefined}
          className={String(currentArgs.className ?? '')}
          onClick={() => audio.playMicroClick(620)}
        >
          {String(currentArgs.children ?? 'Execute Capricorn Protocol')}
        </ZenButton>
      );

    case 'zen-copy-button':
      return (
        <ZenCopyButton
          value={String(currentArgs.value ?? 'npm install @zen-ui-capri/system')}
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
            iconLeft={currentArgs.iconLeft ? <ZenIcon name="folder" size="md" /> : undefined}
            iconRight={currentArgs.iconRight ? <ZenIcon name="sparkles" size="md" /> : undefined}
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
              { id: 'nodes', label: 'Neural Overview', icon: <ZenIcon name="cpu" size="md" />, badge: 'LIVE' },
              { id: 'streams', label: 'Telemetry Streams', icon: <ZenIcon name="activity" size="md" />, badge: 8 },
              { id: 'shield', label: 'Blackwall Shield', icon: <ZenIcon name="shield" size="md" /> },
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

    default:
      return null;
  }
}
