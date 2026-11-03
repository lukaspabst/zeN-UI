import type { ZenAccordionItem, ZenDossierItem, ZenStepItem } from '../lib';

export interface TokenSwatch {
  readonly name: string;
  readonly cssVar: string;
  readonly darkExample: string;
  readonly lightExample: string;
  readonly contrastNote: string;
}

export interface ComponentBenchmarkRow {
  readonly id: string;
  readonly component: string;
  readonly category: string;
  readonly a11yPattern: string;
  readonly renderCostMs: number;
  readonly status: 'VERIFIED' | 'HYBRID 60FPS' | 'ZERO-DEP';
}

export const TOKEN_SWATCHES: readonly TokenSwatch[] = [
  {
    name: 'Canvas Ground',
    cssVar: '--zen-bg-canvas',
    darkExample: '#070709 · #060508 · #040908 · #04070E',
    lightExample: '#F6F2E9 · #F8FAFC · #F3F6F1 · #F4F5F8',
    contrastNote: '4 Dark & 4 Light Polarity Grounds',
  },
  {
    name: 'Surface Tier 1 (16px Glass)',
    cssVar: '--zen-surface-1',
    darkExample: 'rgba(11, 12, 16, 0.88)',
    lightExample: 'rgba(239, 233, 220, 0.90)',
    contrastNote: '16px optical blur + 1px specular catchlight',
  },
  {
    name: 'Primary Ink',
    cssVar: '--zen-ink-primary',
    darkExample: '#F6F2E9 · #FFF0F3 · #ECFEF8 · #F0F6FF',
    lightExample: '#121216 · #0F172A · #142218 · #0D0F14',
    contrastNote: '15.8:1 to 17.8:1 AAA Contrast',
  },
  {
    name: 'Muted Telemetry Ink',
    cssVar: '--zen-ink-muted',
    darkExample: '#B5AEA0 · #C4A6AE · #99B8AE · #98ABC4',
    lightExample: '#5C564D · #475569 · #4A5D50 · #525866',
    contrastNote: '>= 5.64:1 WCAG 2.2 AA Floor (11px min)',
  },
  {
    name: 'Primary Neural Accent',
    cssVar: '--zen-accent-primary',
    darkExample: '#FF2E93 · #F5B841 · #10B981 · #38BDF8',
    lightExample: '#B45309 · #2563EB · #15803D · #E11D48',
    contrastNote: 'Adaptive chromatic focus & action accent',
  },
  {
    name: 'Secondary Harmonic Accent',
    cssVar: '--zen-accent-secondary',
    darkExample: '#00FF66 · #FB923C · #2DD4BF · #818CF8',
    lightExample: '#C2410C · #0891B2 · #0F766E · #0284C7',
    contrastNote: 'Secondary telemetry & gradient vector',
  },
];

export const SHOWCASE_DOSSIERS: readonly (ZenDossierItem & {
  readonly domain: 'saas' | 'ai' | 'fintech';
  readonly story: string;
  readonly statusPill: string;
})[] = [
  {
    id: 'orion-neural-console',
    index: '01',
    domain: 'ai',
    categoryLabel: 'AI AGENT & TELEMETRY WORKBENCH',
    statusPill: 'CAPRI // CAPRICORN Core',
    year: 'ZEN-UI // AI',
    title: 'Autonomous Neural Operations Console',
    role: 'Capri Mixed-Construct + Command Palette + Live KPI Streams',
    subtitle: 'Built for AI Orchestration, LLM Observability & Cybernetic Dashboards',
    story:
      'Combines <ZenAIConstruct />, <ZenCommandPalette />, <ZenKpiCard />, and <ZenCodeBlock /> into a high-density command deck for real-time agent swarms and model inference monitoring.',
    engineeringNote:
      'Uses CSS Custom Properties and zero-dependency canvas/SVG primitives so any React 19 or micro-frontend host can mount telemetry views at 60fps.',
    highlights: [
      'Interactive hyper-angular mixed-construct (<ZenAIConstruct />) modeled after Capri (Project Capricorn).',
      'Global Ctrl+K <ZenCommandPalette /> with instant fuzzy filtering and keyboard navigation.',
      'Real-time SVG <ZenSparkline /> and <ZenCircularGauge /> with tabular-nums precision.',
    ],
    metrics: [
      { value: '42+', label: 'Components', accent: true },
      { value: '8 Themes', label: '4 Dark · 4 Light' },
      { value: '0.2 ms', label: 'Render Overhead' },
      { value: 'WCAG AA', label: 'Contrast Floor' },
    ],
    tags: [
      'ZenAIConstruct',
      'ZenCommandPalette',
      'ZenKpiCard',
      'ZenSparkline',
      'ZenCodeBlock',
    ],
    primaryAction: {
      label: 'Explore Data Display',
      href: '#data-display',
    },
  },
  {
    id: 'universal-saas-platform',
    index: '02',
    domain: 'saas',
    categoryLabel: 'ENTERPRISE SAAS & WORKFLOW SUITE',
    statusPill: 'Multi-Step & Forms',
    year: 'ZEN-UI // SAAS',
    title: 'Multi-Tenant SaaS & Workflow Engine',
    role: 'Forms, Steppers, Drawers, Sidebars & Data Tables',
    subtitle: 'Complete CRUD, Onboarding, Filtering & Settings Primitives',
    story:
      'Provides every form control and navigation pattern required for modern web apps: <ZenInput />, <ZenTextarea />, <ZenNumberStepper />, <ZenDropdown />, <ZenCheckbox />, <ZenRadioGroup />, <ZenSlider />, <ZenChipFilter />, and <ZenFileUpload />.',
    engineeringNote:
      'Dropdown and Command Palette rows commit on onMouseDown to prevent blur race conditions; <ZenNumberStepper /> normalizes IEEE-754 floating-point steps cleanly.',
    highlights: [
      'Collapsible <ZenSidebar /> + <ZenBreadcrumbs /> + <ZenStepper /> + <ZenPagination />.',
      'Slide-over <ZenDrawer />, <ZenModal />, and <ZenAccordion /> with Escape focus restoration.',
      'Sortable <ZenDataTable<T> /> with custom cell renderers and empty states.',
    ],
    metrics: [
      { value: '11 Controls', label: 'Form Suite', accent: true },
      { value: '3 Radii', label: 'Sharp / Arch / Soft' },
      { value: '2 Densities', label: 'Comfort / Compact' },
      { value: '0 any', label: 'Strict TypeScript' },
    ],
    tags: [
      'ZenForms',
      'ZenNavigation',
      'ZenDrawer',
      'ZenDataTable',
      'ZenFileUpload',
    ],
    primaryAction: {
      label: 'Inspect Form Controls',
      href: '#forms-inputs',
    },
  },
  {
    id: 'fintech-quant-terminal',
    index: '03',
    domain: 'fintech',
    categoryLabel: 'QUANTITATIVE ANALYTICS & FINTECH',
    statusPill: 'High-Density Mode',
    year: 'ZEN-UI // QUANT',
    title: 'Algorithmic Ledger & Risk Terminal',
    role: 'Compact Density + Sharp Radius + Tabular Telemetry',
    subtitle: 'Instant Polarity Switching from Midnight Cobalt to Nordic Snow',
    story:
      'Engineered for high-density financial terminals, booking engines, and infrastructure monitors where compact spacing, crisp 2px corners, and zero layout shift are mandatory.',
    engineeringNote:
      'Every numeric readout enforces font-variant-numeric: tabular-nums and a minimum 11px (0.6875rem) mono floor across all 8 dark and light themes.',
    highlights: [
      'Switch between 4 Dark themes and 4 Light themes at runtime with zero page reload.',
      'Independent Radius (Sharp 2px, Architectural 12px, Soft 20px) and Density modes.',
      'Procedural <ZenAmbientBackground /> with 4 canvas modes that automatically adapt to theme polarity.',
    ],
    metrics: [
      { value: 'tabular-nums', label: 'Zero Jitter', accent: true },
      { value: '4 Canvases', label: 'Ambient Modes' },
      { value: '11px Floor', label: 'Mono Telemetry' },
      { value: '100%', label: 'Tree-Shakeable' },
    ],
    tags: [
      'ZenThemeProvider',
      'ZenAmbientBackground',
      'ZenCircularGauge',
      'ZenAlert',
      'ZenSkeleton',
    ],
    primaryAction: {
      label: 'Configure Theme Matrix',
      href: '#theme-matrix',
    },
  },
];

export const COMPONENT_BENCHMARKS: readonly ComponentBenchmarkRow[] = [
  {
    id: 'orion-construct',
    component: '<ZenAIConstruct /> & <ZenAmbientBackground />',
    category: '01 // AI & Ambient Canvas',
    a11yPattern: '3D Point-Cloud Engram · 4 Canvas Modes · Reduced-Motion Safe',
    renderCostMs: 0.4,
    status: 'HYBRID 60FPS',
  },
  {
    id: 'theme-engine',
    component: '<ZenThemeProvider /> (8 Themes × 3 Radii × 2 Densities)',
    category: '02 // Theme & Token Engine',
    a11yPattern: '4 Dark + 4 Light Polarity · WCAG 2.2 AA Verified',
    renderCostMs: 0.1,
    status: 'ZERO-DEP',
  },
  {
    id: 'buttons-actions',
    component: '<ZenButton />, <ZenIconButton />, <ZenCopyButton />',
    category: '03 // Actions & Triggers',
    a11yPattern: 'Primary / Secondary / Ghost / Danger · Loading · Spring Press',
    renderCostMs: 0.1,
    status: 'VERIFIED',
  },
  {
    id: 'forms-suite',
    component: '<ZenInput />, <ZenTextarea />, <ZenNumberStepper />, <ZenDropdown />',
    category: '04 // Text & Numeric Forms',
    a11yPattern: 'onMouseDown Commit · IEEE-754 Stepper · aria-invalid',
    renderCostMs: 0.2,
    status: 'VERIFIED',
  },
  {
    id: 'selection-controls',
    component: '<ZenCheckbox />, <ZenRadioGroup />, <ZenSwitch />, <ZenSlider />, <ZenChipFilter />, <ZenFileUpload />',
    category: '05 // Selection & Upload',
    a11yPattern: 'Indeterminate Check · Roving Radio TabIndex · Drag & Drop Zone',
    renderCostMs: 0.2,
    status: 'VERIFIED',
  },
  {
    id: 'navigation-suite',
    component: '<ZenNavbar />, <ZenSidebar />, <ZenBreadcrumbs />, <ZenTabs />, <ZenSegmentedControl />, <ZenStepper />, <ZenPagination />',
    category: '06 // Navigation & Wayfinding',
    a11yPattern: 'Roving tabIndex · ArrowLeft/Right · Collapsible Rail',
    renderCostMs: 0.2,
    status: 'VERIFIED',
  },
  {
    id: 'overlays-surfaces',
    component: '<ZenCommandPalette />, <ZenModal />, <ZenDrawer />, <ZenAccordion />, <ZenTooltip />, <ZenCard />, <ZenDossierPanel />',
    category: '07 // Overlays & Surfaces',
    a11yPattern: 'Ctrl+K Palette · Escape Focus Restore · 5-State Glass Matrix',
    renderCostMs: 0.3,
    status: 'VERIFIED',
  },
  {
    id: 'data-feedback',
    component: '<ZenKpiCard />, <ZenSparkline />, <ZenProgressBar />, <ZenCircularGauge />, <ZenDataTable />, <ZenCodeBlock />, <ZenAvatar />, <ZenAlert />, <ZenSkeleton />, <ZenEmptyState />, <ZenToastStack />',
    category: '08 // Data Display & Feedback',
    a11yPattern: 'Unique SVG useId() · Flatline Guard · aria-live Polite Toasts',
    renderCostMs: 0.3,
    status: 'VERIFIED',
  },
];

export const ORION_ACCORDION_ITEMS: readonly ZenAccordionItem[] = [
  {
    id: 'arch-1',
    badge: 'THEMING',
    title: 'How do the 8 Dark & Light themes and Radius/Density tokens work across projects?',
    content:
      'ZenThemeProvider sets [data-theme], [data-polarity], [data-radius], and [data-density] attributes on document.documentElement. Every component reads exclusively from --zen-* CSS custom properties in zen-tokens.css, enabling instant switching between 4 Dark themes (Capri // Capricorn, Obsidian Gold, Bio-Emerald Terminal, Midnight Cobalt) and 4 Light themes (Atelier Paper, Nordic Snow, Kyoto Matcha, Arasaka Daylight) with zero runtime style recalculations.',
  },
  {
    id: 'arch-2',
    badge: 'CAPRI // CAPRICORN',
    title: 'Can <ZenAIConstruct /> and <ZenAmbientBackground /> be customized or disabled?',
    content:
      'Yes. <ZenAIConstruct /> is a self-contained Soulkiller mixed-construct companion component featuring Capri’s hyper-angular hot-pink & acid-green geometry, cursor-tracking eyes, and 4 interactive subroutines. <ZenAmbientBackground /> offers 4 procedural canvas engines (Blackwall Lattice, Aurora Mesh, Swiss Blueprint, Minimal Void) that automatically adapt to the active theme and respect prefers-reduced-motion.',
  },
  {
    id: 'arch-3',
    badge: 'INTERACTION',
    title: 'Why do Dropdowns and Command Palettes use onMouseDown instead of onClick?',
    content:
      'In browser event order, mousedown fires before blur, whereas click fires after mouseup. By committing option selection on onMouseDown with event.preventDefault(), zeN-UI eliminates the classic race condition where input blur unmounts the popover menu before the click handler registers.',
  },
];

export const WORKFLOW_STEPS: readonly ZenStepItem[] = [
  {
    id: 'step-tokens',
    title: 'Import zen-tokens.css',
    subtitle: '8 Themes · 3 Radii · 2 Densities',
  },
  {
    id: 'step-provider',
    title: 'Wrap <ZenThemeProvider />',
    subtitle: 'Runtime polarity & audio hooks',
  },
  {
    id: 'step-components',
    title: 'Compose 44 Primitives',
    subtitle: 'Forms, Data, Overlays & AI Core',
  },
  {
    id: 'step-ship',
    title: 'Deploy Universal Apps',
    subtitle: 'SaaS, AI Consoles & FinTech',
  },
];
