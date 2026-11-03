import type {
  ZenAccordionItem,
  ZenChipOption,
  ZenDossierItem,
  ZenDropdownOption,
  ZenSegmentItem,
  ZenStepItem,
  ZenTabItem,
} from '../lib';

export type CatalogSectionTab = 'all' | 'forms' | 'navigation' | 'overlays' | 'data' | 'feedback';
export type InstallStackId = 'react' | 'angular' | 'vue' | 'vanilla';

export const CATALOG_TABS: readonly ZenTabItem<CatalogSectionTab>[] = [
  { id: 'all', label: 'All Suites', badge: '51' },
  { id: 'forms', label: 'Forms & Inputs', badge: '11' },
  { id: 'navigation', label: 'Navigation', badge: '7' },
  { id: 'overlays', label: 'Surfaces & Overlays', badge: '8' },
  { id: 'data', label: 'Data & Telemetry', badge: '16' },
  { id: 'feedback', label: 'Feedback & States', badge: '9' },
];

export const FRAMEWORK_OPTIONS: readonly ZenDropdownOption<string>[] = [
  {
    value: 'react-19',
    label: 'React 19 + Next.js / Vite',
    description: 'Native TSX primitives, hooks & 3D WebGL canvas',
  },
  {
    value: 'angular-20',
    label: 'Angular 20+ (Standalone + Signals)',
    description: 'CUSTOM_ELEMENTS_SCHEMA + ZenThemeController + tokens.css',
  },
  {
    value: 'vue-svelte',
    label: 'Vue 3 / Nuxt / Svelte 5',
    description: 'Native W3C Custom Elements + reactive theme controller',
  },
  {
    value: 'vanilla-html',
    label: 'Vanilla HTML / TypeScript / Astro',
    description: 'Zero-framework W3C Web Components + semantic CSS classes',
  },
];

export const DEPLOY_REGION_OPTIONS = [
  {
    value: 'eu-central',
    label: 'Vite / Rollup ESM Bundle (Tree-Shaken)',
    description: 'Import only the React primitives and CSS tokens your app uses (33.9 kB gzip full bundle).',
    badge: 'DEFAULT',
  },
  {
    value: 'us-east',
    label: 'Angular 20+ Native Federation Singleton',
    description: 'Share @zen-ui/system/universal and tokens.css across micro-frontend remotes.',
    badge: 'MFE',
  },
  {
    value: 'ap-northeast',
    label: 'SSR / Static HTML Custom Elements',
    description: 'Zero-hydration CSS utility classes (.zen-card, .zen-btn) + W3C Web Components.',
    badge: 'SSR',
  },
] as const;

export const FILTER_CHIPS: readonly ZenChipOption<string>[] = [
  { value: 'wcag-aa', label: 'WCAG 2.2 AA (51)' },
  { value: 'roving-tab', label: 'Roving TabIndex (14)' },
  { value: 'tabular-nums', label: 'Tabular Nums (19)' },
  { value: 'zero-dep', label: 'Zero UI Runtime Deps (51)' },
  { value: 'reduced-motion', label: 'Reduced Motion Safe (51)' },
];

export const INSTALL_STACK_SEGMENTS: readonly ZenSegmentItem<InstallStackId>[] = [
  { value: 'react', label: 'React 19' },
  { value: 'angular', label: 'Angular 20+' },
  { value: 'vue', label: 'Vue / Svelte' },
  { value: 'vanilla', label: 'Vanilla / HTML' },
];

export const INSTALL_SNIPPETS: Record<
  InstallStackId,
  { readonly title: string; readonly lang: string; readonly code: string }
> = {
  react: {
    title: 'src/App.tsx (React 19 / Next.js)',
    lang: 'TSX',
    code: `import '@zen-ui/system/tokens.css';
import {
  ZenThemeProvider,
  ZenAmbientBackground,
  ZenAIConstruct,
  ZenButton,
} from '@zen-ui/system';

export function AppShell() {
  return (
    <ZenThemeProvider defaultTheme="blackwall-crimson">
      <ZenAmbientBackground variant="blackwall-lattice" />
      <ZenAIConstruct constructName="CAPRI // CAPRICORN" />
      <ZenButton variant="primary">Initialize Node</ZenButton>
    </ZenThemeProvider>
  );
}`,
  },
  angular: {
    title: 'app.component.ts (Angular 20+ Standalone + Signals)',
    lang: 'TS',
    code: `import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, signal } from '@angular/core';
import { registerZenElements, zenTheme } from '@zen-ui/system/universal';

registerZenElements();

@Component({
  selector: 'app-root',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <zen-ambient-background variant="blackwall-lattice"></zen-ambient-background>
    <main class="zen-card">
      <zen-theme-switcher></zen-theme-switcher>
      <zen-ai-construct framing="portrait" title="CAPRI // CONSTRUCT"></zen-ai-construct>
      <button class="zen-btn-base zen-btn-primary zen-btn-md" (click)="toggleMode()">
        Active Theme: {{ activeTheme() }}
      </button>
    </main>
  \`,
})
export class AppComponent implements OnInit {
  readonly activeTheme = signal(zenTheme.getState().theme);
  ngOnInit(): void {
    zenTheme.subscribe((s) => this.activeTheme.set(s.theme));
  }
  toggleMode(): void {
    zenTheme.togglePolarity();
  }
}`,
  },
  vue: {
    title: 'App.vue (Vue 3 / Nuxt / Svelte 5)',
    lang: 'VUE',
    code: `<script setup lang="ts">
import '@zen-ui/system/tokens.css';
import { ref, onMounted, onUnmounted } from 'vue';
import { registerZenElements, zenTheme } from '@zen-ui/system/universal';

registerZenElements();
const theme = ref(zenTheme.getState().theme);
let unsub: (() => void) | null = null;
onMounted(() => { unsub = zenTheme.subscribe((s) => (theme.value = s.theme)); });
onUnmounted(() => unsub?.());
</script>

<template>
  <zen-ambient-background variant="blackwall-lattice" />
  <section class="zen-card">
    <zen-theme-switcher />
    <zen-ai-construct framing="portrait" />
    <button class="zen-btn-base zen-btn-primary zen-btn-md" @click="zenTheme.togglePolarity()">
      Switch Polarity ({{ theme }})
    </button>
  </section>
</template>`,
  },
  vanilla: {
    title: 'index.html (Vanilla HTML / Astro / HTMX)',
    lang: 'HTML',
    code: `<link rel="stylesheet" href="/node_modules/@zen-ui/system/src/lib/styles/zen-tokens.css" />
<script type="module">
  import { registerZenElements, zenTheme } from '@zen-ui/system/universal';
  registerZenElements();
  zenTheme.setTheme('blackwall-crimson');
</script>

<zen-ambient-background variant="blackwall-lattice"></zen-ambient-background>
<div class="zen-card">
  <span class="zen-badge zen-badge-accent">STACK AGNOSTIC</span>
  <zen-theme-switcher></zen-theme-switcher>
  <zen-ai-construct framing="portrait" title="CAPRI // CONSTRUCT"></zen-ai-construct>
  <input class="zen-input" placeholder="Enter neural coordinate..." />
  <button class="zen-btn-base zen-btn-primary zen-btn-md">Execute Subroutine</button>
</div>`,
  },
};

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
    darkExample: '#050508 · #070709 · #040807 · #060911',
    lightExample: '#F6F2E9 · #F8FAFC · #F3F5F0 · #F2F2F5',
    contrastNote: '4 Dark & 4 Light root backgrounds',
  },
  {
    name: 'Surface Tier 1 (Frosted Glass)',
    cssVar: '--zen-surface-1',
    darkExample: 'rgba(11, 12, 16, 0.88)',
    lightExample: 'rgba(239, 233, 220, 0.90)',
    contrastNote: '16px backdrop blur + 1px top highlight',
  },
  {
    name: 'Primary Ink',
    cssVar: '--zen-ink-primary',
    darkExample: '#F4F7FA · #F6F2E9 · #ECFDF5 · #F1F5F9',
    lightExample: '#121216 · #0F172A · #142018 · #09090D',
    contrastNote: '15.8:1 to 17.8:1 AAA text contrast',
  },
  {
    name: 'Muted Label Ink',
    cssVar: '--zen-ink-muted',
    darkExample: '#A6B3C6 · #A69F91 · #8FB8A8 · #A1B0C4',
    lightExample: '#5C564D · #475569 · #4B6052 · #525266',
    contrastNote: '>= 4.5:1 WCAG 2.2 AA floor (11px mono min)',
  },
  {
    name: 'Primary Accent',
    cssVar: '--zen-accent-primary',
    darkExample: '#FF2E93 · #F5B841 · #10B981 · #38BDF8',
    lightExample: '#B45309 · #2563EB · #15803D · #E11D48',
    contrastNote: 'Primary interactive & focus ring token',
  },
  {
    name: 'Secondary Accent',
    cssVar: '--zen-accent-secondary',
    darkExample: '#00FF66 · #FB923C · #2DD4BF · #818CF8',
    lightExample: '#C2410C · #0891B2 · #0F766E · #0284C7',
    contrastNote: 'Secondary badge, chart & status accent',
  },
];

export const COMPONENT_BENCHMARKS: readonly ComponentBenchmarkRow[] = [
  {
    id: 'capri-guard-engine',
    component: 'capri.scanPromptInjection(), <ZenInput />, <ZenTextarea />',
    category: '01 // Capri Security Firewall & Inputs',
    a11yPattern: 'Blocks SQL/NoSQL Injection, XSS & LLM Prompt Overrides live',
    renderCostMs: 0.1,
    status: 'ZERO-DEP',
  },
  {
    id: 'theme-engine',
    component: '<ZenThemeProvider /> + @zen-ui/system/tokens.css',
    category: '02 // 8-Theme CSS Variable Engine',
    a11yPattern: '4 Dark + 4 Light Themes · 3 Radii · 2 Densities · WCAG 2.2 AA',
    renderCostMs: 0.1,
    status: 'ZERO-DEP',
  },
  {
    id: 'buttons-actions',
    component: '<ZenButton />, <ZenIconButton />, <ZenCopyButton />, <ZenIcon />',
    category: '03 // Actions & 40 Vector Icons',
    a11yPattern: 'Primary / Secondary / Ghost / Danger · 40 built-in SVG glyphs',
    renderCostMs: 0.1,
    status: 'VERIFIED',
  },
  {
    id: 'forms-suite',
    component: '<ZenNumberStepper />, <ZenDropdown />, <ZenCheckbox />, <ZenRadioGroup />, <ZenSwitch />, <ZenSlider />, <ZenChipFilter />, <ZenFileUpload />',
    category: '04 // Form Controls & Selection',
    a11yPattern: 'onMouseDown commit (zero blur race) · IEEE-754 float stepper',
    renderCostMs: 0.2,
    status: 'VERIFIED',
  },
  {
    id: 'navigation-suite',
    component: '<ZenNavbar />, <ZenSidebar />, <ZenBreadcrumbs />, <ZenTabs />, <ZenSegmentedControl />, <ZenStepper />, <ZenPagination />',
    category: '05 // Navigation & Wayfinding',
    a11yPattern: 'Roving tabIndex · ArrowLeft/Right/Home/End keyboard support',
    renderCostMs: 0.2,
    status: 'VERIFIED',
  },
  {
    id: 'overlays-surfaces',
    component: '<ZenCommandPalette />, <ZenModal />, <ZenDrawer />, <ZenAccordion />, <ZenTooltip />, <ZenCard />, <ZenDossierPanel />',
    category: '06 // Overlays, Modals & Cards',
    a11yPattern: 'Ctrl+K palette · Escape focus restoration · 3-tier surfaces',
    renderCostMs: 0.2,
    status: 'VERIFIED',
  },
  {
    id: 'data-feedback',
    component: '<ZenKpiCard />, <ZenSparkline />, <ZenProgressBar />, <ZenCircularGauge />, <ZenDataTable />, <ZenCodeBlock />, <ZenAlert />, <ZenSkeleton />, <ZenEmptyState />, <ZenToastStack />',
    category: '07 // Data Tables, Charts & Feedback',
    a11yPattern: 'Sortable generic <ZenDataTable<T>> · tabular-nums · aria-live',
    renderCostMs: 0.3,
    status: 'VERIFIED',
  },
  {
    id: 'cosmos-audio-universal',
    component: '<ZenCosmosCanvas />, useZenAudioSynth(), @zen-ui/system/universal',
    category: '08 // WebGL, Web Audio & Custom Elements',
    a11yPattern: 'RK4 3-Body shader canvas · Web Components for Angular 20+ & Vue',
    renderCostMs: 0.4,
    status: 'HYBRID 60FPS',
  },
];

export const ORION_ACCORDION_ITEMS: readonly ZenAccordionItem[] = [
  {
    id: 'arch-1',
    badge: 'SINGLE PACKAGE',
    title: 'Why are the UI components, Capri security firewall, and CLI bundled in one npm package?',
    content:
      'Instead of maintaining separate packages that drift out of sync, @zen-ui/system v1.1.0 ships everything in one tree-shakeable ESM package (33.9 kB gzipped): 51 React primitives, W3C Custom Elements (@zen-ui/system/universal) for Angular 20+ and Vue 3, zen-tokens.css, and the npx capri CLI for static architecture docs and security audits.',
  },
  {
    id: 'arch-2',
    badge: 'SECURITY GUARD',
    title: 'What does Capri Guard actually check in <ZenInput /> and <ZenTextarea />?',
    content:
      'Every <ZenInput /> and <ZenTextarea /> runs capri.scanPromptInjection() on user input by default (configurable via capriGuard={false}). It detects and flags 5 real attack classes on the client before submission: SQL/NoSQL injection (tautologies, UNION SELECT, DROP TABLE, $where, $ne), XSS payloads (<script>, javascript:, onerror=), LLM system-prompt overrides, ChatML role-delimiter spoofing, and leaked API keys.',
  },
  {
    id: 'arch-3',
    badge: 'INTERACTION',
    title: 'Why do Dropdowns and Command Palettes bind selection to onMouseDown instead of onClick?',
    content:
      'In browser DOM event order, mousedown fires before blur, whereas click fires after mouseup. By committing option selection on onMouseDown with event.preventDefault(), @zen-ui/system eliminates the blur race condition where an input blur unmounts the dropdown menu before onClick can fire.',
  },
];

export const WORKFLOW_STEPS: readonly ZenStepItem[] = [
  {
    id: 'step-tokens',
    title: '1. Import tokens.css',
    subtitle: '8 Themes · 3 Radii · 2 Densities',
  },
  {
    id: 'step-provider',
    title: '2. Wrap Theme Provider',
    subtitle: 'React Provider or zenTheme.setTheme()',
  },
  {
    id: 'step-components',
    title: '3. Use 51 Primitives',
    subtitle: 'Built-in SQLi/XSS/Prompt Guard',
  },
  {
    id: 'step-ship',
    title: '4. Audit via npx capri',
    subtitle: 'Zero-runtime CLI docs & checks',
  },
];

export const SHOWCASE_DOSSIERS: readonly ZenDossierItem[] = [
  {
    id: 'zen-package-dossier',
    index: '01',
    categoryLabel: 'DESIGN SYSTEM // v1.1.0',
    year: '2026',
    title: '@zen-ui/system Unified Package',
    role: 'React 19 · Angular 20+ · W3C Custom Elements',
    subtitle:
      'Single versioned npm tarball combining 51 UI primitives, 40 vector icons, 8 CSS token themes, and the zero-runtime Capri CLI.',
    engineeringLabel: 'PACKAGE ARCHITECTURE',
    engineeringNote:
      'Ships tree-shakeable ESM (index.js, universal.js), TypeScript declarations (.d.ts), and tokens.css in 33.9 kB gzipped with zero external UI runtime dependencies.',
    highlights: [
      '51 React 19 primitives + W3C Custom Elements (<zen-icon>, <zen-theme-switcher>, <zen-ai-construct>).',
      'Client-side SQLi, XSS, and prompt-injection guards via capri.scanPromptInjection().',
    ],
    metrics: [
      { value: 'v1.1.0', label: 'NPM Release', accent: true },
      { value: '33.9 kB', label: 'ESM Gzip' },
      { value: '51', label: 'UI Modules' },
      { value: '0 any', label: 'Strict TS' },
    ],
    tags: ['React 19', 'Angular 20+', 'TypeScript 5.8', 'WCAG 2.2 AA'],
    primaryAction: {
      label: 'GitHub Repository',
      href: 'https://github.com/lukaspabst/zeN-UI',
    },
  },
];
