import {
  ZenAIConstruct,
  ZenAlert,
  ZenAudioController,
  ZenAvatar,
  ZenBadge,
  ZenButton,
  ZenCard,
  ZenCircularGauge,
  ZenCodeBlock,
  ZenCopyButton,
  ZenDataTable,
  ZenDossierPanel,
  ZenEmptyState,
  ZenIcon,
  ZenKbd,
  ZenKpiCard,
  ZenMetricStrip,
  ZenProgressBar,
  ZenSkeleton,
  ZenSparkline,
  ZenTagList,
  ZenTimelineCard,
  capri,
  CAPRI_SUBROUTINE_SKILLS,
  type CapriSubroutineId,
  type ZenAICameraFraming,
  type ZenAIPersonaMode,
  type ZenAlertTone,
  type ZenBackgroundVariant,
  type ZenBadgeTone,
  type ZenTableColumn,
} from '../../../lib';
import { SHOWCASE_DOSSIERS } from '../../data/studioWorkbenchData';
import type { StorybookStageRendererProps } from './StorybookStageRenderer';

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

export function StorybookStageTelemetry({
  activeStory,
  currentArgs,
  audio,
}: StorybookStageRendererProps) {
  switch (activeStory.id) {
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
            institution={String(currentArgs.institution ?? '@zen-ui-capri/system')}
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
          icon={currentArgs.icon ? <ZenIcon name="sparkles" size="xs" /> : undefined}
          className={String(currentArgs.className ?? '')}
        >
          {String(currentArgs.children ?? 'CAPRICORN SYNC LIVE')}
        </ZenBadge>
      );

    case 'zen-tag-list': {
      const parsedTags = String(currentArgs.csvTags ?? '@zen-ui-capri/system, Capri // Capricorn')
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
            icon={<ZenIcon name="layers" size="lg" />}
            actionSlot={
              currentArgs.actionSlot ? (
                <ZenButton size="sm" variant="primary" iconLeft={<ZenIcon name="plus" size="md" />}>
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
