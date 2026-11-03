import { useMemo, useState } from 'react';
import {
  Activity,
  Code2,
  Cpu,
  Eye,
  FolderGit2,
  Layers,
  Plus,
  RotateCcw,
  Search,
  Shield,
  Sliders,
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
  useZenAudioSynth,
  useZenTheme,
  type CapriSubroutineId,
  type ZenAICameraFraming,
  type ZenAIPersonaMode,
  type ZenAlertTone,
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
  type ZenSegmentItem,
  type ZenTableColumn,
  type ZenUploadedFile,
} from '../lib';
import { SHOWCASE_DOSSIERS } from '../data/studioWorkbenchData';

export type StoryCategory =
  | 'all'
  | 'actions'
  | 'forms'
  | 'navigation'
  | 'overlays'
  | 'data'
  | 'feedback';

type ViewportPreset = 'full' | 'tablet' | 'mobile';
type CanvasBackdrop = 'grid' | 'surface' | 'void';
type CodeStackTab = 'react' | 'angular' | 'html';

export type StoryControlType = 'select' | 'boolean' | 'text' | 'number' | 'readonly';
export type StoryArgValue = string | number | boolean;

export interface StoryPropDef {
  readonly name: string;
  readonly type: string;
  readonly required?: boolean;
  readonly defaultValue: StoryArgValue;
  readonly description: string;
  readonly control: StoryControlType;
  readonly options?: readonly string[];
  readonly min?: number;
  readonly max?: number;
  readonly step?: number;
}

export interface StoryEntry {
  readonly id: string;
  readonly name: string;
  readonly angularSelector: string;
  readonly category: Exclude<StoryCategory, 'all'>;
  readonly categoryLabel: string;
  readonly summary: string;
  readonly a11yNotes: readonly string[];
  readonly cssTokens: readonly string[];
  readonly propDefs: readonly StoryPropDef[];
}

export const STORYBOOK_CATALOG: readonly StoryEntry[] = [
  {
    id: 'zen-button',
    name: 'ZenButton',
    angularSelector: 'button.zen-btn-base',
    category: 'actions',
    categoryLabel: 'Actions & Triggers',
    summary: 'Primary tactile action trigger with 0.97x spring compression, 4 semantic variants, 3 sizes, and loading lock.',
    a11yNotes: ['Native <button type="button">', 'aria-pressed toggle support', '2px high-contrast focus-visible ring'],
    cssTokens: ['--zen-accent-primary', '--zen-ink-on-accent', '--zen-shadow-btn-primary', '--zen-ease-spring'],
    propDefs: [
      { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'danger'", defaultValue: 'primary', description: 'Visual surface and emphasis style', control: 'select', options: ['primary', 'secondary', 'ghost', 'danger'] },
      { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: 'md', description: 'Height and horizontal padding scale', control: 'select', options: ['sm', 'md', 'lg'] },
      { name: 'children', type: 'ReactNode', required: true, defaultValue: 'Execute Capricorn Protocol', description: 'Button text or inner content', control: 'text' },
      { name: 'pressed', type: 'boolean', defaultValue: false, description: 'Sets aria-pressed state for toggle buttons', control: 'boolean' },
      { name: 'mono', type: 'boolean', defaultValue: false, description: 'Switches font to JetBrains Mono', control: 'boolean' },
      { name: 'loading', type: 'boolean', defaultValue: false, description: 'Locks button and renders spinning loader', control: 'boolean' },
      { name: 'disabled', type: 'boolean', defaultValue: false, description: 'Disables pointer and keyboard interaction', control: 'boolean' },
      { name: 'iconLeft', type: 'ReactNode', defaultValue: true, description: 'Leading icon slot before label', control: 'boolean' },
      { name: 'iconRight', type: 'ReactNode', defaultValue: false, description: 'Trailing icon slot after label', control: 'boolean' },
      { name: 'className', type: 'string', defaultValue: '', description: 'Custom utility classes', control: 'text' },
    ],
  },
  {
    id: 'zen-copy-button',
    name: 'ZenCopyButton',
    angularSelector: 'zen-copy-button',
    category: 'actions',
    categoryLabel: 'Actions & Triggers',
    summary: 'Clipboard action button with 2000ms auto-reset checkmark state and monospace telemetry styling.',
    a11yNotes: ['Uses navigator.clipboard API', 'Visual + text state confirmation', 'Keyboard Enter/Space trigger'],
    cssTokens: ['--zen-accent-primary', '--zen-surface-subtle', '--zen-border-control'],
    propDefs: [
      { name: 'value', type: 'string', required: true, defaultValue: 'npm install @zen-ui/system', description: 'Payload string written to clipboard', control: 'text' },
      { name: 'label', type: 'string', defaultValue: 'COPY INSTALL CMD', description: 'Resting button label', control: 'text' },
      { name: 'copiedLabel', type: 'string', defaultValue: 'COPIED TO CLIPBOARD', description: 'Confirmation label shown for 2000ms', control: 'text' },
      { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'danger'", defaultValue: 'secondary', description: 'Button visual style', control: 'select', options: ['primary', 'secondary', 'ghost', 'danger'] },
      { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: 'md', description: 'Button size scale', control: 'select', options: ['sm', 'md', 'lg'] },
      { name: 'className', type: 'string', defaultValue: '', description: 'Custom CSS classes', control: 'text' },
    ],
  },
  {
    id: 'zen-icon-button',
    name: 'ZenIconButton',
    angularSelector: 'button.zen-icon-btn',
    category: 'actions',
    categoryLabel: 'Actions & Triggers',
    summary: 'Square icon-only trigger with mandatory ariaLabel enforcement and active state highlighting.',
    a11yNotes: ['Mandatory ariaLabel prop mapped to aria-label', 'aria-pressed bound to active prop'],
    cssTokens: ['--zen-surface-subtle', '--zen-border-control', '--zen-accent-primary'],
    propDefs: [
      { name: 'ariaLabel', type: 'string', required: true, defaultValue: 'Trigger Neural Pulse', description: 'Accessible screen-reader label', control: 'text' },
      { name: 'active', type: 'boolean', defaultValue: true, description: 'Highlights button in active accent state', control: 'boolean' },
      { name: 'disabled', type: 'boolean', defaultValue: false, description: 'Disables click and focus interaction', control: 'boolean' },
      { name: 'children', type: 'ReactNode', required: true, defaultValue: '<ZenIcon name="sparkles" />', description: 'SVG icon element', control: 'readonly' },
      { name: 'className', type: 'string', defaultValue: '', description: 'Additional CSS classes', control: 'text' },
    ],
  },
  {
    id: 'zen-icon',
    name: 'ZenIcon',
    angularSelector: 'zen-icon',
    category: 'actions',
    categoryLabel: 'Actions & Triggers',
    summary: 'Built-in zero-dependency SVG icon primitive with 40 typed vector glyphs (ZenIconName), 5 sizes, 8 semantic theme tones, and <zen-icon> W3C Custom Element support.',
    a11yNotes: ['aria-hidden="true" when decorative; role="img" + aria-label when ariaLabel is provided', 'Registered as <zen-icon> Custom Element for Angular 20+, Vue 3, and Vanilla HTML'],
    cssTokens: ['--zen-accent-primary', '--zen-ink-primary', '--zen-status-success', '--zen-status-danger'],
    propDefs: [
      { name: 'name', type: 'ZenIconName (40 glyphs)', required: true, defaultValue: 'bolt', description: 'Typed icon glyph key from ZEN_ICON_NAMES', control: 'select', options: ZEN_ICON_NAMES },
      { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", defaultValue: 'lg', description: 'Pixel dimension scale (12px, 14px, 16px, 20px, 24px)', control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
      { name: 'tone', type: "'inherit' | 'primary' | 'secondary' | 'muted' | 'accent' | 'success' | 'warning' | 'danger'", defaultValue: 'accent', description: 'Semantic CSS custom property stroke color', control: 'select', options: ['inherit', 'primary', 'secondary', 'muted', 'accent', 'success', 'warning', 'danger'] },
      { name: 'strokeWidth', type: 'number', defaultValue: 1.85, description: 'SVG vector stroke thickness', control: 'number', min: 1, max: 3, step: 0.25 },
      { name: 'spin', type: 'boolean', defaultValue: false, description: 'Applies continuous 360deg rotation animation', control: 'boolean' },
      { name: 'ariaLabel', type: 'string', defaultValue: '', description: 'Optional accessible label (switches from decorative to role="img")', control: 'text' },
      { name: 'className', type: 'string', defaultValue: '', description: 'Custom CSS classes', control: 'text' },
    ],
  },
  {
    id: 'zen-segmented-control',
    name: 'ZenSegmentedControl',
    angularSelector: 'zen-segmented-control',
    category: 'actions',
    categoryLabel: 'Actions & Triggers',
    summary: 'Single-choice pill segmented switcher with roving tabIndex and ArrowLeft/ArrowRight/Home/End navigation.',
    a11yNotes: ['role="radiogroup" & role="radio"', 'Roving tabIndex (0 on active, -1 on inactive)', 'Arrow key navigation'],
    cssTokens: ['--zen-surface-1', '--zen-accent-primary', '--zen-radius-pill'],
    propDefs: [
      { name: 'value', type: 'T extends string', required: true, defaultValue: 'portrait', description: 'Currently selected segment value', control: 'select', options: ['portrait', 'full', 'telemetry'] },
      { name: 'size', type: "'sm' | 'md'", defaultValue: 'md', description: 'Segment pill sizing', control: 'select', options: ['sm', 'md'] },
      { name: 'ariaLabel', type: 'string', required: true, defaultValue: 'Camera Framing Mode', description: 'Accessible label for radiogroup', control: 'text' },
      { name: 'items', type: 'readonly ZenSegmentItem<T>[]', required: true, defaultValue: '3 items', description: 'Array of { value, label, count, disabled }', control: 'readonly' },
      { name: 'onChange', type: '(nextValue: T) => void', required: true, defaultValue: 'fn(nextValue)', description: 'Callback fired when active segment changes', control: 'readonly' },
      { name: 'className', type: 'string', defaultValue: '', description: 'Custom container classes', control: 'text' },
    ],
  },
  {
    id: 'zen-input',
    name: 'ZenInput',
    angularSelector: 'input.zen-input',
    category: 'forms',
    categoryLabel: 'Forms & Inputs',
    summary: 'Single-line text and telemetry input with label, hint, error validation state, and optional left/right icon slots.',
    a11yNotes: ['Programmatic <label htmlFor> association', 'aria-invalid and aria-describedby bindings'],
    cssTokens: ['--zen-surface-2', '--zen-border-control', '--zen-accent-border', '--zen-status-danger'],
    propDefs: [
      { name: 'label', type: 'string', required: true, defaultValue: 'Neural Endpoint URI', description: 'Field label above input', control: 'text' },
      { name: 'value', type: 'string', defaultValue: 'capri://neural-node-01.arasaka.net', description: 'Controlled input value', control: 'text' },
      { name: 'placeholder', type: 'string', defaultValue: 'Enter shard endpoint...', description: 'Input placeholder text', control: 'text' },
      { name: 'hint', type: 'string', defaultValue: 'Zero-knowledge encrypted shard route', description: 'Helper text below input', control: 'text' },
      { name: 'error', type: 'string', defaultValue: '', description: 'Validation error message (overrides hint)', control: 'text' },
      { name: 'mono', type: 'boolean', defaultValue: true, description: 'Uses JetBrains Mono font inside input', control: 'boolean' },
      { name: 'disabled', type: 'boolean', defaultValue: false, description: 'Disables editing', control: 'boolean' },
      { name: 'iconLeft', type: 'ReactNode', defaultValue: true, description: 'Leading icon inside input frame', control: 'boolean' },
      { name: 'iconRight', type: 'ReactNode', defaultValue: false, description: 'Trailing icon inside input frame', control: 'boolean' },
    ],
  },
  {
    id: 'zen-textarea',
    name: 'ZenTextarea',
    angularSelector: 'textarea.zen-textarea',
    category: 'forms',
    categoryLabel: 'Forms & Inputs',
    summary: 'Multi-line prompt and configuration input with live character counter and validation states.',
    a11yNotes: ['Linked label & hint IDs', 'Live character count readout'],
    cssTokens: ['--zen-surface-2', '--zen-border-control', '--zen-ink-primary'],
    propDefs: [
      { name: 'label', type: 'string', required: true, defaultValue: 'System Directive Prompt', description: 'Field label', control: 'text' },
      { name: 'value', type: 'string', defaultValue: 'Verify all 49 primitives under Capri // Capricorn dark and Atelier Paper light polarities.', description: 'Controlled text value', control: 'text' },
      { name: 'hint', type: 'string', defaultValue: 'Injected into Capri construct context window', description: 'Helper caption', control: 'text' },
      { name: 'error', type: 'string', defaultValue: '', description: 'Validation error string', control: 'text' },
      { name: 'maxLengthCount', type: 'number', defaultValue: 240, description: 'Maximum character quota counter', control: 'number', min: 20, max: 1000, step: 10 },
      { name: 'rows', type: 'number', defaultValue: 3, description: 'Visible text rows', control: 'number', min: 2, max: 10, step: 1 },
      { name: 'mono', type: 'boolean', defaultValue: false, description: 'Monospace typography toggle', control: 'boolean' },
      { name: 'disabled', type: 'boolean', defaultValue: false, description: 'Disables textarea', control: 'boolean' },
    ],
  },
  {
    id: 'zen-dropdown',
    name: 'ZenDropdown',
    angularSelector: 'select.zen-select',
    category: 'forms',
    categoryLabel: 'Forms & Inputs',
    summary: 'Custom listbox select menu engineered with onMouseDown selection to prevent input blur race conditions.',
    a11yNotes: ['aria-haspopup="listbox" & aria-expanded', 'Zero blur-race via onMouseDown trigger', 'Escape key dismissal'],
    cssTokens: ['--zen-surface-2', '--zen-border-strong', '--zen-shadow-hud'],
    propDefs: [
      { name: 'label', type: 'string', defaultValue: 'Target Deployment Node', description: 'Visible label above dropdown trigger', control: 'text' },
      { name: 'value', type: 'T extends string', required: true, defaultValue: 'eu-central', description: 'Currently selected option key', control: 'select', options: ['eu-central', 'ap-tokyo', 'us-east'] },
      { name: 'align', type: "'start' | 'end'", defaultValue: 'start', description: 'Popover horizontal alignment', control: 'select', options: ['start', 'end'] },
      { name: 'ariaLabel', type: 'string', defaultValue: 'Select deployment node', description: 'Fallback accessible label when label is omitted', control: 'text' },
      { name: 'options', type: 'readonly ZenDropdownOption<T>[]', required: true, defaultValue: '3 options', description: 'Array of { value, label, description, icon, disabled }', control: 'readonly' },
      { name: 'onChange', type: '(nextValue: T) => void', required: true, defaultValue: 'fn(nextValue)', description: 'Selection handler', control: 'readonly' },
    ],
  },
  {
    id: 'zen-number-stepper',
    name: 'ZenNumberStepper',
    angularSelector: 'zen-number-stepper',
    category: 'forms',
    categoryLabel: 'Forms & Inputs',
    summary: 'Precision numeric stepper with min/max boundary clamping, custom step increments, and unit suffix.',
    a11yNotes: ['Dedicated Decrement/Increment aria-labels', 'Tabular numeric readout (tabular-nums)'],
    cssTokens: ['--zen-font-mono', '--zen-surface-1', '--zen-border-control'],
    propDefs: [
      { name: 'label', type: 'string', required: true, defaultValue: 'Worker Shard Replicas', description: 'Stepper label', control: 'text' },
      { name: 'value', type: 'number', required: true, defaultValue: 16, description: 'Current numeric value', control: 'number', min: 1, max: 64, step: 1 },
      { name: 'min', type: 'number', defaultValue: 1, description: 'Minimum allowed value', control: 'number', min: 0, max: 50, step: 1 },
      { name: 'max', type: 'number', defaultValue: 64, description: 'Maximum allowed value', control: 'number', min: 10, max: 256, step: 1 },
      { name: 'step', type: 'number', defaultValue: 1, description: 'Increment/decrement step delta', control: 'number', min: 1, max: 16, step: 1 },
      { name: 'unit', type: 'string', defaultValue: 'nodes', description: 'Unit label appended to number', control: 'text' },
      { name: 'disabled', type: 'boolean', defaultValue: false, description: 'Disables stepper buttons', control: 'boolean' },
    ],
  },
  {
    id: 'zen-switch',
    name: 'ZenSwitch',
    angularSelector: 'zen-switch',
    category: 'forms',
    categoryLabel: 'Forms & Inputs',
    summary: 'Tactile boolean switch with spring thumb translation, label, description, and role="switch" semantics.',
    a11yNotes: ['role="switch" & aria-checked', 'Full row click target with keyboard Space/Enter toggle'],
    cssTokens: ['--zen-accent-primary', '--zen-surface-3', '--zen-ease-spring'],
    propDefs: [
      { name: 'label', type: 'ReactNode', required: true, defaultValue: 'Blackwall Intrusion Countermeasures', description: 'Primary switch label', control: 'text' },
      { name: 'description', type: 'string', defaultValue: 'Isolate anomalous packets before UI thread jitter occurs.', description: 'Secondary helper caption', control: 'text' },
      { name: 'checked', type: 'boolean', required: true, defaultValue: true, description: 'Current boolean toggle state', control: 'boolean' },
      { name: 'disabled', type: 'boolean', defaultValue: false, description: 'Disables switch interaction', control: 'boolean' },
      { name: 'onChange', type: '(nextChecked: boolean) => void', required: true, defaultValue: 'fn(nextChecked)', description: 'Toggle callback', control: 'readonly' },
    ],
  },
  {
    id: 'zen-checkbox',
    name: 'ZenCheckbox',
    angularSelector: 'zen-checkbox',
    category: 'forms',
    categoryLabel: 'Forms & Inputs',
    summary: 'Tri-state boolean checkbox supporting checked, unchecked, and indeterminate states with description text.',
    a11yNotes: ['role="checkbox"', 'aria-checked="mixed" support for indeterminate parent toggles'],
    cssTokens: ['--zen-accent-primary', '--zen-border-control', '--zen-radius-sm'],
    propDefs: [
      { name: 'label', type: 'ReactNode', required: true, defaultValue: 'Enforce WCAG 2.2 AA Contrast Floor', description: 'Primary checkbox label', control: 'text' },
      { name: 'description', type: 'string', defaultValue: 'Verifies >= 4.5:1 body text contrast across all 8 themes.', description: 'Helper subtitle', control: 'text' },
      { name: 'checked', type: 'boolean', required: true, defaultValue: true, description: 'Checked state', control: 'boolean' },
      { name: 'indeterminate', type: 'boolean', defaultValue: false, description: 'Mixed/partial selection state (aria-checked="mixed")', control: 'boolean' },
      { name: 'disabled', type: 'boolean', defaultValue: false, description: 'Disables checkbox', control: 'boolean' },
      { name: 'onChange', type: '(nextChecked: boolean) => void', required: true, defaultValue: 'fn(nextChecked)', description: 'Change callback', control: 'readonly' },
    ],
  },
  {
    id: 'zen-radio-group',
    name: 'ZenRadioGroup',
    angularSelector: 'zen-radio-group',
    category: 'forms',
    categoryLabel: 'Forms & Inputs',
    summary: 'Mutually exclusive card radio group with badge tags, descriptions, and keyboard arrow cycling.',
    a11yNotes: ['role="radiogroup" & role="radio"', 'Arrow key roving focus'],
    cssTokens: ['--zen-accent-subtle', '--zen-accent-primary', '--zen-surface-subtle'],
    propDefs: [
      { name: 'label', type: 'string', required: true, defaultValue: 'Construct Synchronization Protocol', description: 'Radio group legend label', control: 'text' },
      { name: 'value', type: 'T extends string', required: true, defaultValue: 'capricorn', description: 'Selected option value', control: 'select', options: ['capricorn', 'atelier'] },
      { name: 'options', type: 'readonly ZenRadioOption<T>[]', required: true, defaultValue: '2 options', description: 'Array of { value, label, description, badge, disabled }', control: 'readonly' },
      { name: 'onChange', type: '(nextValue: T) => void', required: true, defaultValue: 'fn(nextValue)', description: 'Selection callback', control: 'readonly' },
    ],
  },
  {
    id: 'zen-slider',
    name: 'ZenSlider',
    angularSelector: 'zen-slider',
    category: 'forms',
    categoryLabel: 'Forms & Inputs',
    summary: 'Range allocation slider with live percentage fill track and tabular-nums value badge.',
    a11yNotes: ['Native <input type="range"> keyboard support', 'Linked label and formatted output'],
    cssTokens: ['--zen-accent-primary', '--zen-surface-3'],
    propDefs: [
      { name: 'label', type: 'string', required: true, defaultValue: 'GPU Raytracing & Post-Processing Budget', description: 'Slider label', control: 'text' },
      { name: 'value', type: 'number', required: true, defaultValue: 78, description: 'Current numeric value', control: 'number', min: 0, max: 100, step: 2 },
      { name: 'min', type: 'number', defaultValue: 0, description: 'Minimum range bound', control: 'number', min: 0, max: 50, step: 5 },
      { name: 'max', type: 'number', defaultValue: 100, description: 'Maximum range bound', control: 'number', min: 50, max: 500, step: 10 },
      { name: 'step', type: 'number', defaultValue: 2, description: 'Step granularity', control: 'number', min: 1, max: 25, step: 1 },
      { name: 'disabled', type: 'boolean', defaultValue: false, description: 'Disables slider thumb', control: 'boolean' },
    ],
  },
  {
    id: 'zen-chip-filter',
    name: 'ZenChipFilter',
    angularSelector: 'zen-chip-filter',
    category: 'forms',
    categoryLabel: 'Forms & Inputs',
    summary: 'Multi-select filter pill group for toggling tags, capabilities, and query facets.',
    a11yNotes: ['role="group" with aria-pressed on each toggle chip'],
    cssTokens: ['--zen-accent-subtle', '--zen-accent-primary', '--zen-radius-pill'],
    propDefs: [
      { name: 'label', type: 'string', defaultValue: 'Active Architecture Guards', description: 'Group header label', control: 'text' },
      { name: 'options', type: 'readonly ZenChipOption<T>[]', required: true, defaultValue: '4 chips', description: 'Array of { value, label }', control: 'readonly' },
      { name: 'selected', type: 'readonly T[]', required: true, defaultValue: '["wcag", "strict"]', description: 'Currently active chip keys', control: 'readonly' },
      { name: 'onChange', type: '(nextSelected: readonly T[]) => void', required: true, defaultValue: 'fn(nextSelected)', description: 'Multi-select change handler', control: 'readonly' },
    ],
  },
  {
    id: 'zen-file-upload',
    name: 'ZenFileUpload',
    angularSelector: 'zen-file-upload',
    category: 'forms',
    categoryLabel: 'Forms & Inputs',
    summary: 'Drag-and-drop file attachment zone with keyboard Enter/Space trigger and removable file list.',
    a11yNotes: ['role="button" dropzone with keyboard activation', 'Accessible remove buttons per file'],
    cssTokens: ['--zen-border-strong', '--zen-accent-subtle', '--zen-surface-subtle'],
    propDefs: [
      { name: 'label', type: 'string', required: true, defaultValue: 'Upload Construct Configuration Shard', description: 'Dropzone label', control: 'text' },
      { name: 'acceptHint', type: 'string', defaultValue: 'JSON, YAML, ICS, or PDF up to 25 MB', description: 'Accepted format caption inside dropzone', control: 'text' },
      { name: 'files', type: 'readonly ZenUploadedFile[]', required: true, defaultValue: '1 file attached', description: 'Controlled list of { name, sizeBytes }', control: 'readonly' },
      { name: 'onFilesChange', type: '(nextFiles: readonly ZenUploadedFile[]) => void', required: true, defaultValue: 'fn(nextFiles)', description: 'Callback when files are added or removed', control: 'readonly' },
    ],
  },
  {
    id: 'zen-navbar',
    name: 'ZenNavbar',
    angularSelector: 'zen-navbar',
    category: 'navigation',
    categoryLabel: 'Navigation & Wayfinding',
    summary: 'Fixed frosted-glass application header with responsive mobile hamburger drawer and action slots.',
    a11yNotes: ['aria-label="Primary navigation"', 'Collapsible mobile drawer with aria-expanded'],
    cssTokens: ['--zen-surface-header', '--zen-blur-glass', '--zen-border-subtle'],
    propDefs: [
      { name: 'brandTitle', type: 'ReactNode', required: true, defaultValue: 'zeN-UI // CAPRI', description: 'Primary brand title', control: 'text' },
      { name: 'brandSubtitle', type: 'ReactNode', defaultValue: 'CAPRICORN · DARK POLARITY', description: 'Telemetry subtitle next to brand', control: 'text' },
      { name: 'navSlot', type: 'ReactNode', defaultValue: true, description: 'Navigation links slot (collapses into mobile drawer)', control: 'boolean' },
      { name: 'actionsSlot', type: 'ReactNode', defaultValue: true, description: 'Right-aligned action buttons slot', control: 'boolean' },
    ],
  },
  {
    id: 'zen-tabs',
    name: 'ZenTabs',
    angularSelector: 'zen-tabs',
    category: 'navigation',
    categoryLabel: 'Navigation & Wayfinding',
    summary: 'Horizontal tabbed navigation bar with badge counts, icon slots, and roving keyboard focus.',
    a11yNotes: ['role="tablist" & role="tab"', 'ArrowLeft / ArrowRight / Home / End keyboard navigation'],
    cssTokens: ['--zen-accent-primary', '--zen-surface-1', '--zen-ink-on-accent'],
    propDefs: [
      { name: 'activeTab', type: 'T extends string', required: true, defaultValue: 'telemetry', description: 'Active tab ID', control: 'select', options: ['telemetry', 'tokens', 'security'] },
      { name: 'ariaLabel', type: 'string', required: true, defaultValue: 'Storybook Preview Tabs', description: 'Accessible label for tablist', control: 'text' },
      { name: 'tabs', type: 'readonly ZenTabItem<T>[]', required: true, defaultValue: '3 tabs', description: 'Array of { id, label, icon, badge, disabled }', control: 'readonly' },
      { name: 'onChange', type: '(nextTab: T) => void', required: true, defaultValue: 'fn(nextTab)', description: 'Tab activation callback', control: 'readonly' },
    ],
  },
  {
    id: 'zen-breadcrumbs',
    name: 'ZenBreadcrumbs',
    angularSelector: 'zen-breadcrumbs',
    category: 'navigation',
    categoryLabel: 'Navigation & Wayfinding',
    summary: 'Hierarchical route trail with interactive parent nodes and aria-current="page" active terminal node.',
    a11yNotes: ['<nav aria-label="Breadcrumb">', 'aria-current="page" on active segment'],
    cssTokens: ['--zen-font-mono', '--zen-accent-primary', '--zen-ink-muted'],
    propDefs: [
      { name: 'rootLabel', type: 'string (items[0].label)', defaultValue: 'zeN-UI Workspace', description: 'First breadcrumb node label', control: 'text' },
      { name: 'sectionLabel', type: 'string (items[1].label)', defaultValue: 'Storybook Explorer', description: 'Middle breadcrumb node label', control: 'text' },
      { name: 'currentLabel', type: 'string (items[2].label)', defaultValue: 'ZenBreadcrumbs', description: 'Terminal active page label', control: 'text' },
      { name: 'items', type: 'readonly ZenBreadcrumbItem[]', required: true, defaultValue: '3 items', description: 'Array of { id, label, href, onClick }', control: 'readonly' },
    ],
  },
  {
    id: 'zen-pagination',
    name: 'ZenPagination',
    angularSelector: 'zen-pagination',
    category: 'navigation',
    categoryLabel: 'Navigation & Wayfinding',
    summary: 'Responsive page index navigator with smart boundary guards and tabular numeric buttons.',
    a11yNotes: ['aria-current="page" on active page button', 'Disabled boundary guards on Prev/Next'],
    cssTokens: ['--zen-accent-primary', '--zen-surface-subtle', '--zen-border-subtle'],
    propDefs: [
      { name: 'currentPage', type: 'number', required: true, defaultValue: 2, description: '1-based active page index', control: 'number', min: 1, max: 8, step: 1 },
      { name: 'totalPages', type: 'number', required: true, defaultValue: 6, description: 'Total number of pages', control: 'number', min: 1, max: 12, step: 1 },
      { name: 'onPageChange', type: '(page: number) => void', required: true, defaultValue: 'fn(page)', description: 'Page change handler', control: 'readonly' },
    ],
  },
  {
    id: 'zen-stepper',
    name: 'ZenStepper',
    angularSelector: 'zen-stepper',
    category: 'navigation',
    categoryLabel: 'Navigation & Wayfinding',
    summary: 'Multi-stage workflow progress stepper with completed checkmarks, active highlight, and responsive grid.',
    a11yNotes: ['aria-current="step" on active stage', 'Visual & semantic completion checkmarks'],
    cssTokens: ['--zen-accent-primary', '--zen-accent-subtle', '--zen-border-subtle'],
    propDefs: [
      { name: 'activeStepIndex', type: 'number', required: true, defaultValue: 1, description: '0-based active workflow step index', control: 'number', min: 0, max: 2, step: 1 },
      { name: 'steps', type: 'readonly ZenStepItem[]', required: true, defaultValue: '3 steps', description: 'Array of { id, title, subtitle }', control: 'readonly' },
      { name: 'onStepClick', type: '(index: number) => void', defaultValue: 'fn(index)', description: 'Optional click handler per step', control: 'readonly' },
    ],
  },
  {
    id: 'zen-sidebar',
    name: 'ZenSidebar',
    angularSelector: 'zen-sidebar',
    category: 'navigation',
    categoryLabel: 'Navigation & Wayfinding',
    summary: 'Vertical navigation rail with icon slots, live telemetry badges, and active route indicator.',
    a11yNotes: ['<aside aria-label={title}> landmark with aria-current="page"'],
    cssTokens: ['--zen-surface-1', '--zen-accent-subtle', '--zen-accent-primary'],
    propDefs: [
      { name: 'title', type: 'string', required: true, defaultValue: 'CAPRICORN NODES', description: 'Header label and aria-label for sidebar', control: 'text' },
      { name: 'activeId', type: 'string', required: true, defaultValue: 'nodes', description: 'Currently selected navigation item ID', control: 'select', options: ['nodes', 'streams', 'shield'] },
      { name: 'items', type: 'readonly ZenSidebarItem[]', required: true, defaultValue: '3 items', description: 'Array of { id, label, icon, badge }', control: 'readonly' },
      { name: 'onSelect', type: '(id: string) => void', required: true, defaultValue: 'fn(id)', description: 'Selection callback', control: 'readonly' },
    ],
  },
  {
    id: 'zen-card',
    name: 'ZenCard',
    angularSelector: 'div.zen-card',
    category: 'overlays',
    categoryLabel: 'Surfaces & Overlays',
    summary: 'Frosted-glass surface container supporting static, interactive (hover lift + press), and selected glow variants.',
    a11yNotes: ['Automatic role="button" + Enter/Space handler when interactive or onSelect is passed'],
    cssTokens: ['--zen-surface-1', '--zen-blur-glass', '--zen-shadow-resting', '--zen-radius-card'],
    propDefs: [
      { name: 'variant', type: "'static' | 'interactive' | 'selected'", defaultValue: 'interactive', description: 'Surface interaction and border glow mode', control: 'select', options: ['static', 'interactive', 'selected'] },
      { name: 'padding', type: "'none' | 'sm' | 'md' | 'lg'", defaultValue: 'md', description: 'Internal card spacing scale', control: 'select', options: ['none', 'sm', 'md', 'lg'] },
      { name: 'selected', type: 'boolean', defaultValue: false, description: 'Forces selected accent border & glow shadow', control: 'boolean' },
      { name: 'disabled', type: 'boolean', defaultValue: false, description: 'Dims card and disables pointer interaction', control: 'boolean' },
      { name: 'selectOnHover', type: 'boolean', defaultValue: false, description: 'Triggers onSelect automatically on mouseEnter', control: 'boolean' },
      { name: 'children', type: 'ReactNode', required: true, defaultValue: 'Frosted Optical Glass Card', description: 'Card body content', control: 'text' },
    ],
  },
  {
    id: 'zen-heading',
    name: 'ZenHeading',
    angularSelector: 'zen-heading',
    category: 'overlays',
    categoryLabel: 'Surfaces & Overlays',
    summary: 'Swiss editorial & display heading combining Syne geometric bold with Instrument Serif italic accent text.',
    a11yNotes: ['Configurable semantic heading level (h1, h2, h3, h4)'],
    cssTokens: ['--zen-font-display', '--zen-font-serif', '--zen-accent-primary'],
    propDefs: [
      { name: 'as', type: "'h1' | 'h2' | 'h3' | 'h4'", defaultValue: 'h2', description: 'Semantic HTML heading tag', control: 'select', options: ['h1', 'h2', 'h3', 'h4'] },
      { name: 'size', type: "'hero' | 'display' | 'section' | 'title' | 'subtitle'", defaultValue: 'section', description: 'Typographic scale preset', control: 'select', options: ['hero', 'display', 'section', 'title', 'subtitle'] },
      { name: 'eyebrow', type: 'ReactNode', defaultValue: 'TYPOGRAPHY // SYNE + INSTRUMENT SERIF', description: 'Monospace uppercase eyebrow label', control: 'text' },
      { name: 'children', type: 'ReactNode', required: true, defaultValue: 'Architectural Precision for', description: 'Primary Syne display heading text', control: 'text' },
      { name: 'accentText', type: 'ReactNode', defaultValue: 'Capricorn', description: 'Inline Instrument Serif italic accent phrase', control: 'text' },
      { name: 'subtitle', type: 'ReactNode', defaultValue: 'Balanced display and editorial serif pairing.', description: 'Secondary italic subtitle below heading', control: 'text' },
    ],
  },
  {
    id: 'zen-modal',
    name: 'ZenModal',
    angularSelector: 'zen-modal',
    category: 'overlays',
    categoryLabel: 'Surfaces & Overlays',
    summary: 'Accessible dialog modal with backdrop blur, Escape dismissal, focus restoration, and footer action bar.',
    a11yNotes: ['role="dialog" & aria-modal="true"', 'Auto-focus on mount + Escape key close'],
    cssTokens: ['--zen-surface-2', '--zen-shadow-hud', '--zen-blur-glass'],
    propDefs: [
      { name: 'open', type: 'boolean', required: true, defaultValue: false, description: 'Controls modal visibility', control: 'boolean' },
      { name: 'eyebrow', type: 'string', defaultValue: 'STORYBOOK // MODAL STAGE', description: 'Top monospace eyebrow header', control: 'text' },
      { name: 'title', type: 'ReactNode', required: true, defaultValue: 'Capri Construct Diagnostic Dialog', description: 'Dialog heading', control: 'text' },
      { name: 'subtitle', type: 'ReactNode', defaultValue: 'Soulkiller Shard Telemetry', description: 'Optional serif subtitle', control: 'text' },
      { name: 'footer', type: 'ReactNode', defaultValue: true, description: 'Renders bottom action button bar', control: 'boolean' },
      { name: 'onClose', type: '() => void', required: true, defaultValue: 'fn()', description: 'Backdrop & Escape key close handler', control: 'readonly' },
    ],
  },
  {
    id: 'zen-drawer',
    name: 'ZenDrawer',
    angularSelector: 'zen-drawer',
    category: 'overlays',
    categoryLabel: 'Surfaces & Overlays',
    summary: 'Slide-over side inspector panel for deep telemetry configuration and contextual forms.',
    a11yNotes: ['role="dialog" & aria-modal="true"', 'Escape key & backdrop click dismissal'],
    cssTokens: ['--zen-surface-1', '--zen-border-default', '--zen-shadow-hud'],
    propDefs: [
      { name: 'open', type: 'boolean', required: true, defaultValue: false, description: 'Controls slide-over visibility', control: 'boolean' },
      { name: 'title', type: 'ReactNode', required: true, defaultValue: 'Node Telemetry Drawer', description: 'Drawer header title', control: 'text' },
      { name: 'subtitle', type: 'ReactNode', defaultValue: 'STORYBOOK ISOLATED OVERLAY', description: 'Drawer subtitle', control: 'text' },
      { name: 'footer', type: 'ReactNode', defaultValue: true, description: 'Renders sticky bottom footer bar', control: 'boolean' },
      { name: 'onClose', type: '() => void', required: true, defaultValue: 'fn()', description: 'Dismiss handler', control: 'readonly' },
    ],
  },
  {
    id: 'zen-command-palette',
    name: 'ZenCommandPalette',
    angularSelector: 'zen-command-palette',
    category: 'overlays',
    categoryLabel: 'Surfaces & Overlays',
    summary: 'Ctrl+K global command launcher with instant fuzzy filtering, grouped actions, and Up/Down/Enter keyboard control.',
    a11yNotes: ['Full keyboard navigation (ArrowDown, ArrowUp, Enter, Escape)', 'Auto-focus search input'],
    cssTokens: ['--zen-surface-2', '--zen-accent-subtle', '--zen-shadow-hud'],
    propDefs: [
      { name: 'open', type: 'boolean', required: true, defaultValue: false, description: 'Controls command palette visibility', control: 'boolean' },
      { name: 'placeholder', type: 'string', defaultValue: 'Execute a command or jump to a primitive...', description: 'Search combobox placeholder', control: 'text' },
      { name: 'items', type: 'readonly ZenCommandItem[]', required: true, defaultValue: '2 commands', description: 'Array of { id, label, group, shortcut, icon, onSelect }', control: 'readonly' },
      { name: 'onClose', type: '() => void', required: true, defaultValue: 'fn()', description: 'Close callback', control: 'readonly' },
    ],
  },
  {
    id: 'zen-accordion',
    name: 'ZenAccordion',
    angularSelector: 'zen-accordion',
    category: 'overlays',
    categoryLabel: 'Surfaces & Overlays',
    summary: 'Collapsible disclosure stack with badge metadata and smooth chevron rotation.',
    a11yNotes: ['aria-expanded on each disclosure header button'],
    cssTokens: ['--zen-surface-1', '--zen-border-default', '--zen-accent-primary'],
    propDefs: [
      { name: 'defaultOpenId', type: 'string', defaultValue: 'acc-1', description: 'Initially expanded item ID', control: 'select', options: ['acc-1', 'acc-2'] },
      { name: 'items', type: 'readonly ZenAccordionItem[]', required: true, defaultValue: '2 items', description: 'Array of { id, title, badge, content }', control: 'readonly' },
      { name: 'className', type: 'string', defaultValue: '', description: 'Custom container class', control: 'text' },
    ],
  },
  {
    id: 'zen-tooltip',
    name: 'ZenTooltip',
    angularSelector: 'zen-tooltip',
    category: 'overlays',
    categoryLabel: 'Surfaces & Overlays',
    summary: 'Contextual floating tooltip triggered on hover and keyboard focus with Escape dismissal.',
    a11yNotes: ['role="tooltip" bound via aria-describedby', 'Triggers on both mouseEnter and focus'],
    cssTokens: ['--zen-bg-elevated', '--zen-border-strong', '--zen-shadow-hud'],
    propDefs: [
      { name: 'content', type: 'string', required: true, defaultValue: 'Sub-millisecond CSS custom property token lookup', description: 'Tooltip text content', control: 'text' },
      { name: 'children', type: 'ReactNode', required: true, defaultValue: '<ZenButton>Hover or Focus</ZenButton>', description: 'Trigger element wrapped by tooltip', control: 'readonly' },
    ],
  },
  {
    id: 'zen-divider',
    name: 'ZenDivider',
    angularSelector: 'zen-divider',
    category: 'overlays',
    categoryLabel: 'Surfaces & Overlays',
    summary: 'Architectural hairline horizontal rule with optional centered monospace telemetry label.',
    a11yNotes: ['Semantic <hr> when unlabeled'],
    cssTokens: ['--zen-border-subtle', '--zen-font-mono'],
    propDefs: [
      { name: 'label', type: 'string', defaultValue: 'SECTION BOUNDARY // 01', description: 'Optional centered monospace label (leave empty for plain <hr>)', control: 'text' },
      { name: 'className', type: 'string', defaultValue: '', description: 'Additional CSS classes', control: 'text' },
    ],
  },
  {
    id: 'zen-architecture-note',
    name: 'ZenArchitectureNote',
    angularSelector: 'zen-architecture-note',
    category: 'overlays',
    categoryLabel: 'Surfaces & Overlays',
    summary: 'Highlighted callout box for architectural decisions, invariants, and system warnings.',
    a11yNotes: ['High-contrast telemetry header + body copy'],
    cssTokens: ['--zen-accent-secondary', '--zen-surface-subtle'],
    propDefs: [
      { name: 'label', type: 'string', defaultValue: 'SCS AUTONOMY RULE', description: 'Top monospace callout header', control: 'text' },
      { name: 'children', type: 'ReactNode', required: true, defaultValue: 'Shared-nothing isolation enforced: zero cross-service database joins.', description: 'Callout body text', control: 'text' },
      { name: 'className', type: 'string', defaultValue: '', description: 'Custom CSS classes', control: 'text' },
    ],
  },
  {
    id: 'zen-check-list',
    name: 'ZenCheckList',
    angularSelector: 'zen-check-list',
    category: 'overlays',
    categoryLabel: 'Surfaces & Overlays',
    summary: 'Structured verification checklist with accent check icons and high-legibility body copy.',
    a11yNotes: ['Semantic <ul> / <li> structure'],
    cssTokens: ['--zen-accent-primary', '--zen-ink-secondary'],
    propDefs: [
      { name: 'firstItem', type: 'string (items[0])', defaultValue: 'WCAG 2.2 AA contrast verified across all 8 themes', description: 'First checklist line item', control: 'text' },
      { name: 'secondItem', type: 'string (items[1])', defaultValue: 'Zero any TypeScript compilation', description: 'Second checklist line item', control: 'text' },
      { name: 'items', type: 'readonly string[]', required: true, defaultValue: '3 items', description: 'Array of checklist strings', control: 'readonly' },
    ],
  },
  {
    id: 'zen-data-table',
    name: 'ZenDataTable',
    angularSelector: 'table.zen-table',
    category: 'data',
    categoryLabel: 'Data & Telemetry',
    summary: 'Sortable tabular data grid with custom cell renderers, column alignment, and empty state message.',
    a11yNotes: ['aria-sort="ascending|descending|none" on sortable headers', 'Horizontal scroll wrapper for mobile'],
    cssTokens: ['--zen-table-py', '--zen-table-px', '--zen-border-default'],
    propDefs: [
      { name: 'caption', type: 'string', defaultValue: 'Active Capricorn Cluster Nodes', description: 'Accessible <caption> above table', control: 'text' },
      { name: 'emptyMessage', type: 'string', defaultValue: 'No telemetry records available.', description: 'Displayed when rows array is empty', control: 'text' },
      { name: 'showEmptyState', type: 'boolean (demo toggle)', defaultValue: false, description: 'Simulate empty rows=[] to preview emptyMessage', control: 'boolean' },
      { name: 'columns', type: 'readonly ZenTableColumn<T>[]', required: true, defaultValue: '4 columns', description: 'Column definitions with key, header, sortable, render', control: 'readonly' },
      { name: 'rows', type: 'readonly T[]', required: true, defaultValue: '3 rows', description: 'Data records array', control: 'readonly' },
      { name: 'rowKey', type: '(row: T) => string', required: true, defaultValue: '(r) => r.id', description: 'Unique row key extractor', control: 'readonly' },
    ],
  },
  {
    id: 'zen-kpi-card',
    name: 'ZenKpiCard',
    angularSelector: 'zen-kpi-card',
    category: 'data',
    categoryLabel: 'Data & Telemetry',
    summary: 'Executive telemetry card featuring tabular metric readout, trend delta pill, and embedded SVG sparkline.',
    a11yNotes: ['Tabular numerals prevent layout jitter during live updates'],
    cssTokens: ['--zen-font-display', '--zen-status-success', '--zen-status-danger'],
    propDefs: [
      { name: 'label', type: 'string', required: true, defaultValue: 'NEURAL INFERENCE THROUGHPUT', description: 'Top telemetry metric title', control: 'text' },
      { name: 'value', type: 'string', required: true, defaultValue: '14,820 req/s', description: 'Primary display KPI value', control: 'text' },
      { name: 'delta', type: 'string', required: true, defaultValue: '+18.4%', description: 'Delta badge string', control: 'text' },
      { name: 'trend', type: "'up' | 'down'", defaultValue: 'up', description: 'Controls trend icon & green/red semantic color', control: 'select', options: ['up', 'down'] },
      { name: 'subtitle', type: 'string', defaultValue: 'vs. previous 24h rolling window', description: 'Comparison caption below value', control: 'text' },
      { name: 'showSparkline', type: 'boolean (sparkline)', defaultValue: true, description: 'Renders inline SVG sparkline', control: 'boolean' },
    ],
  },
  {
    id: 'zen-sparkline',
    name: 'ZenSparkline',
    angularSelector: 'zen-sparkline',
    category: 'data',
    categoryLabel: 'Data & Telemetry',
    summary: 'Zero-dependency SVG vector sparkline with gradient area fill and automatic min/max normalization.',
    a11yNotes: ['aria-hidden="true" decorative vector chart'],
    cssTokens: ['--zen-accent-primary'],
    propDefs: [
      { name: 'width', type: 'number', defaultValue: 220, description: 'SVG viewport width in px', control: 'number', min: 80, max: 420, step: 20 },
      { name: 'height', type: 'number', defaultValue: 56, description: 'SVG viewport height in px', control: 'number', min: 24, max: 140, step: 8 },
      { name: 'data', type: 'readonly number[]', required: true, defaultValue: '[18, 24, 21, 35, 42, 38, 54, 68, 64, 82]', description: 'Numeric time-series array', control: 'readonly' },
    ],
  },
  {
    id: 'zen-metric-strip',
    name: 'ZenMetricStrip',
    angularSelector: 'zen-metric-strip',
    category: 'data',
    categoryLabel: 'Data & Telemetry',
    summary: 'Multi-column KPI summary bar (2, 3, or 4 columns) for hero headers and telemetry dashboards.',
    a11yNotes: ['Responsive CSS grid collapsing cleanly on mobile viewports'],
    cssTokens: ['--zen-surface-subtle', '--zen-accent-primary', '--zen-border-subtle'],
    propDefs: [
      { name: 'columns', type: '2 | 3 | 4', defaultValue: 3, description: 'Grid column count on desktop', control: 'select', options: ['2', '3', '4'] },
      { name: 'metrics', type: 'readonly ZenMetricItem[]', required: true, defaultValue: '3 items', description: 'Array of { value, label, accent }', control: 'readonly' },
    ],
  },
  {
    id: 'zen-progress-bar',
    name: 'ZenProgressBar',
    angularSelector: 'zen-progress-bar',
    category: 'data',
    categoryLabel: 'Data & Telemetry',
    summary: 'Linear progress and quota bar with aria-valuenow bindings and unit suffix.',
    a11yNotes: ['role="progressbar" with aria-valuenow, aria-valuemin, aria-valuemax'],
    cssTokens: ['--zen-accent-primary', '--zen-surface-subtle'],
    propDefs: [
      { name: 'label', type: 'string', required: true, defaultValue: 'Blackwall Containment Integrity', description: 'Progress bar label', control: 'text' },
      { name: 'value', type: 'number', required: true, defaultValue: 84, description: 'Current progress value', control: 'number', min: 0, max: 100, step: 2 },
      { name: 'max', type: 'number', defaultValue: 100, description: 'Maximum value denominator', control: 'number', min: 10, max: 500, step: 10 },
      { name: 'unit', type: 'string', defaultValue: '%', description: 'Unit suffix displayed next to value', control: 'text' },
    ],
  },
  {
    id: 'zen-circular-gauge',
    name: 'ZenCircularGauge',
    angularSelector: 'zen-circular-gauge',
    category: 'data',
    categoryLabel: 'Data & Telemetry',
    summary: 'Radial SVG circular gauge for GPU utilization, WCAG compliance scores, and SLA health.',
    a11yNotes: ['role="meter" with aria-valuenow, aria-valuemin, aria-valuemax'],
    cssTokens: ['--zen-accent-primary', '--zen-border-subtle'],
    propDefs: [
      { name: 'label', type: 'string', required: true, defaultValue: 'Compliance Score', description: 'Caption below circular meter', control: 'text' },
      { name: 'value', type: 'number', required: true, defaultValue: 92, description: 'Current meter value', control: 'number', min: 0, max: 100, step: 2 },
      { name: 'max', type: 'number', defaultValue: 100, description: 'Maximum meter value', control: 'number', min: 10, max: 200, step: 10 },
      { name: 'unit', type: 'string', defaultValue: '%', description: 'Unit string inside ring', control: 'text' },
      { name: 'size', type: 'number', defaultValue: 96, description: 'SVG diameter in pixels', control: 'number', min: 64, max: 160, step: 8 },
    ],
  },
  {
    id: 'zen-avatar',
    name: 'ZenAvatar',
    angularSelector: 'zen-avatar',
    category: 'data',
    categoryLabel: 'Data & Telemetry',
    summary: 'Operator identity avatar with automatic initials extraction, optional image src, and presence dot.',
    a11yNotes: ['aria-label bound to operator full name'],
    cssTokens: ['--zen-accent-subtle', '--zen-status-success', '--zen-status-danger'],
    propDefs: [
      { name: 'name', type: 'string', required: true, defaultValue: 'Capri Capricorn', description: 'Operator name (extracts initials when src is empty)', control: 'text' },
      { name: 'status', type: "'online' | 'busy' | 'offline'", defaultValue: 'online', description: 'Presence indicator dot state', control: 'select', options: ['online', 'busy', 'offline'] },
      { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: 'lg', description: 'Avatar circle dimension', control: 'select', options: ['sm', 'md', 'lg'] },
      { name: 'src', type: 'string', defaultValue: '', description: 'Optional image URL (falls back to initials on error)', control: 'text' },
    ],
  },
  {
    id: 'zen-code-block',
    name: 'ZenCodeBlock',
    angularSelector: 'zen-code-block',
    category: 'data',
    categoryLabel: 'Data & Telemetry',
    summary: 'Monospace code inspector with language badge, header bar, and integrated clipboard copy button.',
    a11yNotes: ['Scrollable <pre><code> container with keyboard copy trigger'],
    cssTokens: ['--zen-font-mono', '--zen-surface-2', '--zen-border-default'],
    propDefs: [
      { name: 'title', type: 'string', required: true, defaultValue: 'zen-tokens.config.ts', description: 'Filename or snippet title in header bar', control: 'text' },
      { name: 'language', type: 'string', defaultValue: 'TS', description: 'Language badge tag', control: 'text' },
      { name: 'code', type: 'string', required: true, defaultValue: "import { zenTheme } from '@zen-ui/system/universal';\nzenTheme.setTheme('blackwall-crimson');", description: 'Raw code string rendered & copied', control: 'text' },
    ],
  },
  {
    id: 'zen-dossier-panel',
    name: 'ZenDossierPanel',
    angularSelector: 'zen-dossier-panel',
    category: 'data',
    categoryLabel: 'Data & Telemetry',
    summary: 'Master-detail architecture specification panel with metrics strip, system notes, and checklist.',
    a11yNotes: ['aria-live="polite" region updates smoothly when blueprint selection changes'],
    cssTokens: ['--zen-surface-active', '--zen-accent-border', '--zen-shadow-selected'],
    propDefs: [
      { name: 'dossierIndex', type: 'number (item selector)', defaultValue: 0, description: 'Switch between the 3 reference blueprint dossiers (0, 1, 2)', control: 'number', min: 0, max: 2, step: 1 },
      { name: 'item', type: 'ZenDossierItem', required: true, defaultValue: 'SHOWCASE_DOSSIERS[0]', description: 'Structured dossier specification object', control: 'readonly' },
    ],
  },
  {
    id: 'zen-timeline-card',
    name: 'ZenTimelineCard',
    angularSelector: 'zen-timeline-card',
    category: 'data',
    categoryLabel: 'Data & Telemetry',
    summary: 'Chronological milestone card with period stamp, location, institution, checklist bullets, and tags.',
    a11yNotes: ['Structured heading hierarchy + tag list'],
    cssTokens: ['--zen-surface-1', '--zen-accent-primary'],
    propDefs: [
      { name: 'period', type: 'string', required: true, defaultValue: '2026 // Q4', description: 'Timestamp or release phase label', control: 'text' },
      { name: 'location', type: 'string', required: true, defaultValue: '8 Themes · 49 Modules', description: 'Right-aligned location or scope label', control: 'text' },
      { name: 'title', type: 'string', required: true, defaultValue: 'Project Capricorn Neural Release', description: 'Card title', control: 'text' },
      { name: 'institution', type: 'string', required: true, defaultValue: '@zen-ui/system', description: 'Italic serif subtitle', control: 'text' },
      { name: 'summary', type: 'string', required: true, defaultValue: 'Unified 8 dark and light themes with zero-runtime CSS custom properties.', description: 'Body summary paragraph', control: 'text' },
    ],
  },
  {
    id: 'zen-badge',
    name: 'ZenBadge',
    angularSelector: 'span.zen-badge',
    category: 'feedback',
    categoryLabel: 'Feedback, Badges & AI Core',
    summary: 'Compact status and polarity pill badge with 6 semantic tones, optional icon, and live pulse dot.',
    a11yNotes: ['High-contrast uppercase monospace label'],
    cssTokens: ['--zen-accent-subtle', '--zen-status-success', '--zen-status-danger'],
    propDefs: [
      { name: 'tone', type: "'gold' | 'amber' | 'emerald' | 'coral' | 'cyan' | 'neutral'", defaultValue: 'gold', description: 'Semantic color palette for pill and dot', control: 'select', options: ['gold', 'amber', 'emerald', 'coral', 'cyan', 'neutral'] },
      { name: 'children', type: 'ReactNode', required: true, defaultValue: 'CAPRICORN SYNC LIVE', description: 'Badge text content', control: 'text' },
      { name: 'pulse', type: 'boolean', defaultValue: true, description: 'Renders animated pulsing status dot', control: 'boolean' },
      { name: 'icon', type: 'ReactNode', defaultValue: false, description: 'Optional leading icon inside pill', control: 'boolean' },
      { name: 'className', type: 'string', defaultValue: '', description: 'Custom CSS classes', control: 'text' },
    ],
  },
  {
    id: 'zen-tag-list',
    name: 'ZenTagList',
    angularSelector: 'zen-tag-list',
    category: 'feedback',
    categoryLabel: 'Feedback, Badges & AI Core',
    summary: 'Flex-wrapped monospace tag cluster for technology stacks and metadata labels.',
    a11yNotes: ['High-contrast border & subtle glass background'],
    cssTokens: ['--zen-surface-subtle', '--zen-border-default', '--zen-font-mono'],
    propDefs: [
      { name: 'csvTags', type: 'readonly string[] (tags)', required: true, defaultValue: '@zen-ui/system, Capri // Capricorn, Angular 20+, React 19, Zero-Any TS', description: 'Comma-separated list of tags rendered as pills', control: 'text' },
      { name: 'className', type: 'string', defaultValue: '', description: 'Custom wrapper classes', control: 'text' },
    ],
  },
  {
    id: 'zen-kbd',
    name: 'ZenKbd',
    angularSelector: 'kbd.zen-kbd',
    category: 'feedback',
    categoryLabel: 'Feedback, Badges & AI Core',
    summary: 'Tactile hardware keycap shortcut indicator supporting multi-key combinations (e.g. Ctrl + K).',
    a11yNotes: ['Native <kbd> element per keycap'],
    cssTokens: ['--zen-surface-2', '--zen-border-control', '--zen-font-mono'],
    propDefs: [
      { name: 'csvKeys', type: 'readonly string[] (keys)', required: true, defaultValue: 'Ctrl, K', description: 'Comma-separated keycap labels', control: 'text' },
      { name: 'className', type: 'string', defaultValue: '', description: 'Custom CSS classes', control: 'text' },
    ],
  },
  {
    id: 'zen-alert',
    name: 'ZenAlert',
    angularSelector: 'div.zen-alert',
    category: 'feedback',
    categoryLabel: 'Feedback, Badges & AI Core',
    summary: 'Contextual status banner (info, success, warning, danger) with icon, title, and optional actionSlot.',
    a11yNotes: ['role="alert" on warning/danger, role="status" on info/success'],
    cssTokens: ['--zen-status-info', '--zen-status-success', '--zen-status-warning', '--zen-status-danger'],
    propDefs: [
      { name: 'tone', type: "'info' | 'success' | 'warning' | 'danger'", defaultValue: 'info', description: 'Alert severity and color token', control: 'select', options: ['info', 'success', 'warning', 'danger'] },
      { name: 'title', type: 'string', required: true, defaultValue: 'Neural Firewall Synchronized', description: 'Bold monospace alert title', control: 'text' },
      { name: 'children', type: 'ReactNode', required: true, defaultValue: 'All 49 components expose their complete attribute controls in the Storybook Playground.', description: 'Alert body message', control: 'text' },
      { name: 'actionSlot', type: 'ReactNode', defaultValue: true, description: 'Renders right-aligned action button', control: 'boolean' },
    ],
  },
  {
    id: 'zen-skeleton',
    name: 'ZenSkeleton',
    angularSelector: 'zen-skeleton',
    category: 'feedback',
    categoryLabel: 'Feedback, Badges & AI Core',
    summary: 'Multi-line shimmer loading placeholder with configurable line count for async data states.',
    a11yNotes: ['role="status" & aria-busy="true"'],
    cssTokens: ['--zen-surface-subtle-hover'],
    propDefs: [
      { name: 'lines', type: 'number', defaultValue: 3, description: 'Number of shimmer placeholder rows', control: 'number', min: 1, max: 8, step: 1 },
      { name: 'className', type: 'string', defaultValue: '', description: 'Custom CSS classes', control: 'text' },
    ],
  },
  {
    id: 'zen-empty-state',
    name: 'ZenEmptyState',
    angularSelector: 'zen-empty-state',
    category: 'feedback',
    categoryLabel: 'Feedback, Badges & AI Core',
    summary: 'Zero-data placeholder panel with icon badge, explanation copy, and primary recovery actionSlot.',
    a11yNotes: ['Clear recovery call-to-action slot'],
    cssTokens: ['--zen-surface-subtle', '--zen-border-strong', '--zen-accent-primary'],
    propDefs: [
      { name: 'title', type: 'string', required: true, defaultValue: 'No Active Telemetry Streams', description: 'Empty state heading', control: 'text' },
      { name: 'description', type: 'string', required: true, defaultValue: 'Provision a neural relay node to begin capturing real-time frame metrics.', description: 'Helper explanation text', control: 'text' },
      { name: 'actionSlot', type: 'ReactNode', defaultValue: true, description: 'Renders primary recovery button', control: 'boolean' },
    ],
  },
  {
    id: 'zen-ai-construct',
    name: 'ZenAIConstruct (Capri)',
    angularSelector: 'zen-ai-construct',
    category: 'feedback',
    categoryLabel: 'Feedback, Badges & AI Core',
    summary: 'Interactive Capri (Project Capricorn) mixed-construct co-pilot with live cursor-tracking eyes, Portrait/Full Pose toggle, and 4 subroutines.',
    a11yNotes: ['Available as <ZenAIConstruct /> in React and <zen-ai-construct> W3C Custom Element in Angular/Vue/HTML'],
    cssTokens: ['--zen-accent-primary', '--zen-accent-secondary', '--zen-surface-active'],
    propDefs: [
      { name: 'constructName', type: 'string', defaultValue: 'CAPRI // CAPRICORN', description: 'Construct display name', control: 'text' },
      { name: 'subtitle', type: 'string', defaultValue: 'EDGERUNNERS S2 SOULKILLER MIXED-CONSTRUCT', description: 'Top telemetry subtitle', control: 'text' },
      { name: 'defaultMode', type: "'orion' | 'architect' | 'sentinel' | 'zen' | 'docu'", defaultValue: 'orion', description: 'Initial active subroutine skill', control: 'select', options: ['orion', 'architect', 'sentinel', 'zen', 'docu'] },
      { name: 'defaultFraming', type: "'portrait' | 'full'", defaultValue: 'portrait', description: 'Initial camera framing mode', control: 'select', options: ['portrait', 'full'] },
      { name: 'compact', type: 'boolean', defaultValue: true, description: 'Compact grid layout mode', control: 'boolean' },
    ],
  },
  {
    id: 'zen-ambient-background',
    name: 'ZenAmbientBackground',
    angularSelector: 'zen-ambient-background',
    category: 'feedback',
    categoryLabel: 'Feedback, Badges & AI Core',
    summary: 'Procedural atmospheric background canvas with 4 modes (Blackwall Lattice, Aurora Mesh, Swiss Blueprint, Minimal Void).',
    a11yNotes: ['aria-hidden="true" non-interactive background layer', 'Available as <zen-ambient-background> Custom Element'],
    cssTokens: ['--zen-bg-canvas', '--zen-accent-rgb', '--zen-secondary-rgb'],
    propDefs: [
      { name: 'variant', type: "'blackwall-lattice' | 'aurora-mesh' | 'swiss-blueprint' | 'minimal-void'", defaultValue: 'blackwall-lattice', description: 'Atmospheric procedural pattern variant', control: 'select', options: ['blackwall-lattice', 'aurora-mesh', 'swiss-blueprint', 'minimal-void'] },
      { name: 'interactive', type: 'boolean', defaultValue: true, description: 'Tracks pointer coordinates for radial spotlight', control: 'boolean' },
    ],
  },
  {
    id: 'zen-audio-controller',
    name: 'ZenAudioController',
    angularSelector: 'zen-audio-controller',
    category: 'feedback',
    categoryLabel: 'Feedback, Badges & AI Core',
    summary: 'Web Audio API synthesizer controller with 4 procedural ambient presets and pill/deck display modes.',
    a11yNotes: ['Zero external audio asset dependencies', 'Instant mute/unmute toggle'],
    cssTokens: ['--zen-accent-primary', '--zen-surface-1'],
    propDefs: [
      { name: 'mode', type: "'pill' | 'deck'", defaultValue: 'deck', description: 'Compact navbar pill vs full synthesizer deck UI', control: 'select', options: ['pill', 'deck'] },
      { name: 'synth', type: 'ZenAudioSynthController', required: true, defaultValue: 'useZenAudioSynth()', description: 'Web Audio synthesizer controller instance', control: 'readonly' },
    ],
  },
  {
    id: 'capri-engine',
    name: 'CapriEngine (Headless & AI Skill)',
    angularSelector: 'capri (Headless Runtime & AI Skill)',
    category: 'feedback',
    categoryLabel: 'Feedback, Badges & AI Core',
    summary: 'Headless runtime engine, automated architecture/user-flow documentation generator (capri.docu()), and AI coding skill ruleset provider for Claude, Codex, Cursor, and Antigravity.',
    a11yNotes: ['Zero visual avatar rendered in production apps', 'Auto-generates Markdown architecture dossier, Mermaid user-flow diagrams & WCAG reports'],
    cssTokens: ['--zen-accent-primary', '--zen-status-success', '--zen-status-danger'],
    propDefs: [
      { name: 'subroutine', type: "'orion' | 'architect' | 'sentinel' | 'zen' | 'docu'", required: true, defaultValue: 'sentinel', description: 'Active Capri subroutine & AI skill ruleset', control: 'select', options: ['orion', 'architect', 'sentinel', 'zen', 'docu'] },
      { name: 'docuOutput', type: "'markdown-dossier' | 'mermaid-flowchart' | 'agent-skill-prompt'", defaultValue: 'markdown-dossier', description: 'Selects automated documentation or AI context payload to inspect & copy', control: 'select', options: ['markdown-dossier', 'mermaid-flowchart', 'agent-skill-prompt'] },
      { name: 'voiceMode', type: 'boolean (--voice)', defaultValue: false, description: 'OFF by default. When true (--voice), activates Capri Edgerunners S2 persona voice', control: 'boolean' },
      { name: 'applyPresetTheme', type: 'boolean', defaultValue: false, description: 'Automatically switches page theme, radius & density to the subroutine preset', control: 'boolean' },
      { name: 'userTask', type: 'string', defaultValue: 'Audit this component for WCAG 2.2 AA and 320px mobile overflow compliance.', description: 'Custom task appended to capri.exportMarkdownDocu() / capri.buildAgentPrompt()', control: 'text' },
    ],
  },
] as const;

const CATEGORY_FILTERS: readonly { readonly id: StoryCategory; readonly label: string }[] = [
  { id: 'all', label: 'All (51)' },
  { id: 'actions', label: 'Actions & Icons (5)' },
  { id: 'forms', label: 'Forms (10)' },
  { id: 'navigation', label: 'Navigation (6)' },
  { id: 'overlays', label: 'Surfaces & Overlays (10)' },
  { id: 'data', label: 'Data & Telemetry (10)' },
  { id: 'feedback', label: 'Feedback & AI (10)' },
];

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

function buildInitialArgs(): Record<string, Record<string, StoryArgValue>> {
  const map: Record<string, Record<string, StoryArgValue>> = {};
  for (const story of STORYBOOK_CATALOG) {
    const entryArgs: Record<string, StoryArgValue> = {};
    for (const prop of story.propDefs) {
      entryArgs[prop.name] = prop.defaultValue;
    }
    map[story.id] = entryArgs;
  }
  return map;
}

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
      react: `import { ${activeStory.name.split(' ')[0]} } from '@zen-ui/system';

export function ${activeStory.name.split(' ')[0]}Story() {
  return (
    <${activeStory.name.split(' ')[0]}${reactPropsBlock}/>
  );
}`,
      angular: `<${tagBase}${classPart}${angularAttrs ? `\n  ${angularAttrs}\n` : ''}></${tagBase}>`,
      html: `<${tagBase}${classPart}${angularAttrs ? `\n  ${angularAttrs.replace(/\[|\]/g, '')}\n` : ''}></${tagBase}>`,
    };
  }, [activeStory, currentArgs]);

  const renderIsolatedStage = () => {
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
                { value: '49', label: 'Storybook Modules', accent: true },
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
              location={String(currentArgs.location ?? '8 Themes · 49 Modules')}
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
  };

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
                {renderIsolatedStage()}
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
