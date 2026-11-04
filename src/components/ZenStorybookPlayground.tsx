import { useMemo, useState } from 'react';
import { Code2, Eye, RotateCcw, Search, Shield, Sliders } from 'lucide-react';
import {
  ZenBadge,
  ZenButton,
  ZenCard,
  ZenCodeBlock,
  ZenSegmentedControl,
  capri,
  useZenAudioSynth,
  useZenTheme,
  type CapriSubroutineId,
  type ZenSegmentItem,
  type ZenUploadedFile,
} from '../lib';
import {
  CATEGORY_FILTERS,
  STORYBOOK_CATALOG,
  buildInitialArgs,
  type StoryArgValue,
  type StoryCategory,
  type StoryControlType,
  type StoryEntry,
  type StoryPropDef,
} from './storybook/storybookCatalog';
import { StorybookStageRenderer } from './storybook/StorybookStageRenderer';

export {
  STORYBOOK_CATALOG,
  type StoryArgValue,
  type StoryCategory,
  type StoryControlType,
  type StoryEntry,
  type StoryPropDef,
};

type ViewportPreset = 'full' | 'tablet' | 'mobile';
type CanvasBackdrop = 'grid' | 'surface' | 'void';
type CodeStackTab = 'react' | 'angular' | 'html';

const VIEWPORT_ITEMS: readonly ZenSegmentItem<ViewportPreset>[] = [
  { value: 'full', label: 'Desktop (100%)' },
  { value: 'tablet', label: 'Tablet (768px)' },
  { value: 'mobile', label: 'Mobile (375px)' },
];

const CODE_STACK_ITEMS: readonly ZenSegmentItem<CodeStackTab>[] = [
  { value: 'react', label: 'React 19 TSX' },
  { value: 'angular', label: 'Angular 20+' },
  { value: 'html', label: 'HTML + CSS' },
];

export function ZenStorybookPlayground() {
  const { togglePolarity, setTheme, setRadius, setDensity } = useZenTheme();
  const audio = useZenAudioSynth({ defaultPreset: 'lofi-atelier' });

  const [selectedId, setSelectedId] = useState<string>('zen-button');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<StoryCategory>('all');
  const [viewport, setViewport] = useState<ViewportPreset>('full');
  const [backdrop, setBackdrop] = useState<CanvasBackdrop>('grid');
  const [codeStack, setCodeStack] = useState<CodeStackTab>('react');

  const [storyArgs, setStoryArgs] = useState<Record<string, Record<string, StoryArgValue>>>(
    () => buildInitialArgs()
  );

  const [chipValues, setChipValues] = useState<readonly string[]>(['wcag', 'strict']);
  const [uploadedFiles, setUploadedFiles] = useState<readonly ZenUploadedFile[]>([
    { name: 'capri-construct-shard.bin', sizeBytes: 18432 },
  ]);

  const filteredStories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return STORYBOOK_CATALOG.filter((item) => {
      const matchesCat = categoryFilter === 'all' || item.category === categoryFilter;
      const matchesQuery =
        q.length === 0 ||
        item.name.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [searchQuery, categoryFilter]);

  const activeStory = useMemo(
    () =>
      STORYBOOK_CATALOG.find((item) => item.id === selectedId) ??
      STORYBOOK_CATALOG[0],
    [selectedId]
  );

  const currentArgs = storyArgs[activeStory.id] ?? {};

  const updateArg = (propName: string, nextValue: StoryArgValue) => {
    setStoryArgs((prev) => {
      const nextEntry = {
        ...prev[activeStory.id],
        [propName]: nextValue,
      };
      if (activeStory.id === 'capri-engine') {
        const subId = String(nextEntry.subroutine ?? 'sentinel') as CapriSubroutineId;
        const shouldApply = Boolean(nextEntry.applyPresetTheme);
        capri.switchSubroutine(subId, {
          applyPresetTheme: shouldApply,
          onThemeChange: (nextTheme, nextRadius, nextDensity) => {
            setTheme(nextTheme);
            setRadius(nextRadius);
            setDensity(nextDensity);
          },
        });
      }
      return {
        ...prev,
        [activeStory.id]: nextEntry,
      };
    });
  };

  const handleResetCurrentStory = () => {
    audio.playMicroClick(520);
    const freshDefaults: Record<string, StoryArgValue> = {};
    for (const p of activeStory.propDefs) {
      freshDefaults[p.name] = p.defaultValue;
    }
    setStoryArgs((prev) => ({
      ...prev,
      [activeStory.id]: freshDefaults,
    }));
  };

  const generatedCode = useMemo((): Record<CodeStackTab, string> => {
    const editableProps = activeStory.propDefs.filter((p) => p.control !== 'readonly');
    const reactPropsLines = editableProps
      .map((p) => {
        const val = currentArgs[p.name];
        if (val === '' || val === false) return null;
        if (val === true) return `  ${p.name}`;
        if (typeof val === 'number') return `  ${p.name}={${val}}`;
        return `  ${p.name}="${String(val)}"`;
      })
      .filter((line): line is string => line !== null);

    const reactPropsBlock =
      reactPropsLines.length > 0 ? `\n${reactPropsLines.join('\n')}\n` : ' ';

    const angularAttrs = editableProps
      .map((p) => {
        const val = currentArgs[p.name];
        if (val === '' || val === false) return null;
        if (typeof val === 'boolean') return `[${p.name}]="${String(val)}"`;
        if (typeof val === 'number') return `[${p.name}]="${val}"`;
        return `${p.name}="${String(val)}"`;
      })
      .filter((item): item is string => item !== null)
      .join('\n  ');

    const tagBase = activeStory.angularSelector.split('.')[0];
    const classPart = activeStory.angularSelector.includes('.')
      ? ` class="${activeStory.angularSelector.split('.')[1]}"`
      : '';

    return {
      react: `import { ${activeStory.name.split(' ')[0]} } from '@zen-ui-capri/system';

export function ${activeStory.name.split(' ')[0]}Story() {
  return (
    <${activeStory.name.split(' ')[0]}${reactPropsBlock}/>
  );
}`,
      angular: `<${tagBase}${classPart}${angularAttrs ? `\n  ${angularAttrs}\n` : ''}></${tagBase}>`,
      html: `<${tagBase}${classPart}${angularAttrs ? `\n  ${angularAttrs.replace(/\[|\]/g, '')}\n` : ''}></${tagBase}>`,
    };
  }, [activeStory, currentArgs]);

  return (
    <div className="space-y-6" data-testid="zen-storybook-playground">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {CATEGORY_FILTERS.map((cat) => {
            const active = categoryFilter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  audio.playMicroClick(520);
                  setCategoryFilter(cat.id);
                }}
                className={`px-3 py-1.5 rounded-full zen-font-mono text-xs transition-all cursor-pointer zen-focus-ring ${
                  active
                    ? 'bg-[var(--zen-accent-primary)] text-[var(--zen-ink-on-accent)] font-semibold shadow-[var(--zen-shadow-btn-primary)]'
                    : 'bg-[var(--zen-surface-1)] text-[var(--zen-ink-secondary)] border border-[var(--zen-border-subtle)] hover:text-[var(--zen-ink-primary)]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <ZenBadge tone="emerald">100% ATTRIBUTE COVERAGE</ZenBadge>
          <ZenBadge tone="gold">{filteredStories.length} SELECTABLE</ZenBadge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <ZenCard
          variant="static"
          padding="sm"
          className="lg:col-span-3 space-y-3 max-h-[48rem] flex flex-col min-w-0"
        >
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[var(--zen-ink-muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              aria-label="Filter components in Storybook sidebar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find component (51)..."
              className="zen-input pl-8 py-1.5 text-xs"
            />
          </div>

          <div
            role="listbox"
            aria-label="Storybook Component Explorer"
            className="overflow-y-auto space-y-1 pr-1 flex-1 max-h-[42rem]"
          >
            {filteredStories.map((story) => {
              const isSelected = story.id === activeStory.id;
              return (
                <button
                  key={story.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    audio.playMicroClick(560);
                    setSelectedId(story.id);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between gap-2 cursor-pointer zen-focus-ring ${
                    isSelected
                      ? 'bg-[var(--zen-accent-subtle)] border border-[var(--zen-accent-border)] text-[var(--zen-ink-primary)]'
                      : 'hover:bg-[var(--zen-surface-subtle-hover)] text-[var(--zen-ink-secondary)] border border-transparent'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="zen-font-mono text-xs font-semibold truncate">
                      {story.name}
                    </div>
                    <div className="text-[10px] text-[var(--zen-ink-muted)] truncate">
                      {story.categoryLabel} · {story.propDefs.length} attrs
                    </div>
                  </div>
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      isSelected
                        ? 'bg-[var(--zen-accent-primary)]'
                        : 'bg-[var(--zen-border-strong)]'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </ZenCard>

        <div className="lg:col-span-9 space-y-6 min-w-0">
          <ZenCard variant="selected" padding="md" className="space-y-5 min-w-0 overflow-hidden">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--zen-border-subtle)] pb-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="zen-telemetry-label text-[var(--zen-accent-primary)]">
                    {activeStory.categoryLabel.toUpperCase()}
                  </span>
                  <ZenBadge tone="neutral">{activeStory.angularSelector}</ZenBadge>
                  <ZenBadge tone="gold">{activeStory.propDefs.length} ATTRIBUTES</ZenBadge>
                </div>
                <h3 className="zen-font-display text-2xl font-extrabold text-[var(--zen-ink-primary)]">
                  {activeStory.name}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--zen-ink-secondary)] max-w-2xl">
                  {activeStory.summary}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <ZenSegmentedControl
                  ariaLabel="Stage Viewport Width"
                  size="sm"
                  items={VIEWPORT_ITEMS}
                  value={viewport}
                  onChange={setViewport}
                />
                <ZenButton
                  size="sm"
                  variant="secondary"
                  mono
                  onClick={() =>
                    setBackdrop((prev) =>
                      prev === 'grid' ? 'surface' : prev === 'surface' ? 'void' : 'grid'
                    )
                  }
                  iconLeft={<Eye className="w-3.5 h-3.5" />}
                >
                  Canvas: {backdrop.toUpperCase()}
                </ZenButton>
              </div>
            </div>

            <div
              className={`rounded-2xl border border-[var(--zen-border-default)] p-6 sm:p-10 min-h-[15rem] flex items-center justify-center transition-all overflow-x-auto ${
                backdrop === 'grid'
                  ? 'bg-[var(--zen-bg-elevated)] [background-image:radial-gradient(var(--zen-border-strong)_1px,transparent_1px)] [background-size:20px_20px]'
                  : backdrop === 'surface'
                    ? 'bg-[var(--zen-surface-2)]'
                    : 'bg-[#050508]'
              }`}
            >
              <div
                className={`w-full flex items-center justify-center transition-all duration-300 ${
                  viewport === 'mobile'
                    ? 'max-w-[375px] border-x border-dashed border-[var(--zen-accent-border)] px-3 py-4'
                    : viewport === 'tablet'
                      ? 'max-w-[768px] border-x border-dashed border-[var(--zen-accent-border)] px-4 py-4'
                      : 'w-full'
                }`}
              >
                <StorybookStageRenderer
                  activeStory={activeStory}
                  currentArgs={currentArgs}
                  updateArg={updateArg}
                  chipValues={chipValues}
                  setChipValues={setChipValues}
                  uploadedFiles={uploadedFiles}
                  setUploadedFiles={setUploadedFiles}
                  setSelectedId={setSelectedId}
                  togglePolarity={togglePolarity}
                  audio={audio}
                />
              </div>
            </div>

            <div className="space-y-3 pt-2 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="zen-telemetry-label text-[var(--zen-accent-primary)] flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>
                    STORYBOOK ARGTYPES & ATTRIBUTE CONTROLS ({activeStory.propDefs.length} PROPS)
                  </span>
                </span>
                <button
                  type="button"
                  onClick={handleResetCurrentStory}
                  className="zen-font-mono text-xs text-[var(--zen-ink-muted)] hover:text-[var(--zen-ink-primary)] inline-flex items-center gap-1.5 cursor-pointer px-2.5 py-1 rounded-lg border border-[var(--zen-border-subtle)] bg-[var(--zen-surface-2)]"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Defaults</span>
                </button>
              </div>

              <div className="zen-table-wrapper">
                <table className="zen-table" aria-label={`${activeStory.name} Attribute Controls`}>
                  <thead>
                    <tr>
                      <th>Attribute / Prop</th>
                      <th>Type & Default</th>
                      <th>Description</th>
                      <th>Live Control</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeStory.propDefs.map((prop) => {
                      const val = currentArgs[prop.name] ?? prop.defaultValue;
                      const controlLabel = `${activeStory.name} ${prop.name} control`;
                      return (
                        <tr key={prop.name} data-testid="storybook-prop-row">
                          <td className="zen-font-mono text-xs font-semibold text-[var(--zen-ink-primary)] whitespace-nowrap">
                            <span>{prop.name}</span>
                            {prop.required && (
                              <span className="ml-1 text-[var(--zen-accent-primary)]" title="Required attribute">
                                *
                              </span>
                            )}
                          </td>
                          <td className="zen-font-mono text-[11px] text-[var(--zen-ink-secondary)]">
                            <div className="text-[var(--zen-accent-primary)]">{prop.type}</div>
                            <div className="text-[var(--zen-ink-muted)]">
                              default: {String(prop.defaultValue === '' ? '""' : prop.defaultValue)}
                            </div>
                          </td>
                          <td className="text-xs text-[var(--zen-ink-secondary)] max-w-xs">
                            {prop.description}
                          </td>
                          <td className="min-w-[12rem]">
                            {prop.control === 'select' && prop.options ? (
                              <select
                                aria-label={controlLabel}
                                value={String(val)}
                                onChange={(e) => updateArg(prop.name, e.target.value)}
                                className="zen-select text-xs py-1.5"
                              >
                                {prop.options.map((opt) => (
                                  <option key={opt} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                              </select>
                            ) : prop.control === 'boolean' ? (
                              <label className="inline-flex items-center gap-2 text-xs zen-font-mono cursor-pointer">
                                <input
                                  type="checkbox"
                                  aria-label={controlLabel}
                                  checked={Boolean(val)}
                                  onChange={(e) => updateArg(prop.name, e.target.checked)}
                                />
                                <span>{Boolean(val) ? 'true' : 'false'}</span>
                              </label>
                            ) : prop.control === 'number' ? (
                              <input
                                type="number"
                                aria-label={controlLabel}
                                value={Number(val)}
                                min={prop.min}
                                max={prop.max}
                                maxLength={4}
                                step={prop.step ?? 1}
                                onChange={(e) => updateArg(prop.name, Number(e.target.value))}
                                className="zen-input py-1.5 text-xs zen-font-mono"
                              />
                            ) : prop.control === 'text' ? (
                              <input
                                type="text"
                                aria-label={controlLabel}
                                value={String(val)}
                                onChange={(e) => updateArg(prop.name, e.target.value)}
                                className="zen-input py-1.5 text-xs"
                              />
                            ) : (
                              <span className="zen-badge">{String(prop.defaultValue)}</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--zen-surface-2)] border border-[var(--zen-border-default)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="zen-telemetry-label text-[var(--zen-accent-secondary)] flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  <span>ANGULAR CDK / WCAG 2.2 AA SPEC</span>
                </span>
                <div className="flex flex-wrap gap-3 text-xs text-[var(--zen-ink-secondary)]">
                  {activeStory.a11yNotes.map((note) => (
                    <span key={note} className="inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--zen-accent-primary)]" />
                      <span>{note}</span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 shrink-0">
                {activeStory.cssTokens.map((tok) => (
                  <span key={tok} className="zen-badge">
                    {tok}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="zen-telemetry-label text-[var(--zen-accent-primary)] flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>LIVE CODE GENERATOR ({activeStory.name.toUpperCase()})</span>
                </span>
                <ZenSegmentedControl
                  ariaLabel="Select Code Stack"
                  size="sm"
                  items={CODE_STACK_ITEMS}
                  value={codeStack}
                  onChange={setCodeStack}
                />
              </div>

              <ZenCodeBlock
                title={`${activeStory.name} — ${codeStack.toUpperCase()} SNIPPET`}
                language={codeStack.toUpperCase()}
                code={generatedCode[codeStack]}
              />
            </div>
          </ZenCard>
        </div>
      </div>
    </div>
  );
}
