import { useEffect, useState } from 'react';
import {
  Activity,
  Bell,
  Code2,
  Command,
  Cpu,
  Database,
  FolderGit2,
  Layers,
  LayoutGrid,
  Moon,
  PanelRightOpen,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Shield,
  Sliders,
  Sparkles,
  Sun,
  Terminal,
  Trash2,
  Zap,
} from 'lucide-react';
import {
  ZEN_THEMES,
  ZEN_UI_VERSION,
  ZenAccordion,
  ZenAIConstruct,
  ZenAlert,
  ZenAmbientBackground,
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
  ZenCommandPalette,
  ZenCopyButton,
  ZenDataTable,
  ZenDivider,
  ZenDrawer,
  ZenDropdown,
  ZenEmptyState,
  ZenFileUpload,
  ZenHeading,
  ZenIconButton,
  ZenInput,
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
  ZenStepper,
  ZenSwitch,
  ZenTabs,
  ZenTextarea,
  ZenTimelineCard,
  ZenToastStack,
  ZenTooltip,
  registerZenElements,
  useZenAudioSynth,
  useZenTheme,
  useZenToast,
  type ZenBackgroundVariant,
  type ZenChipOption,
  type ZenCommandItem,
  type ZenDensityMode,
  type ZenDropdownOption,
  type ZenRadiusMode,
  type ZenSegmentItem,
  type ZenSidebarItem,
  type ZenTabItem,
  type ZenTableColumn,
  type ZenThemeId,
  type ZenUploadedFile,
} from './lib';
import {
  COMPONENT_BENCHMARKS,
  ORION_ACCORDION_ITEMS,
  TOKEN_SWATCHES,
  WORKFLOW_STEPS,
  type ComponentBenchmarkRow,
} from './data/studioWorkbenchData';
import { ZenStorybookPlayground } from './components/ZenStorybookPlayground';

type CatalogSectionTab = 'all' | 'forms' | 'navigation' | 'overlays' | 'data' | 'feedback';
type NavSectionId = 'orion-core' | 'theme-matrix' | 'component-catalog' | 'storybook-playground';

const NAV_SECTION_IDS: readonly NavSectionId[] = [
  'orion-core',
  'theme-matrix',
  'component-catalog',
  'storybook-playground',
];

const AMBIENT_SEGMENTS: readonly ZenSegmentItem<ZenBackgroundVariant>[] = [
  { value: 'blackwall-lattice', label: 'Blackwall Lattice' },
  { value: 'aurora-mesh', label: 'Aurora Mesh' },
  { value: 'swiss-blueprint', label: 'Swiss Blueprint' },
  { value: 'minimal-void', label: 'Minimal Void' },
];

const RADIUS_SEGMENTS: readonly ZenSegmentItem<ZenRadiusMode>[] = [
  { value: 'sharp', label: 'Sharp (2px)' },
  { value: 'architectural', label: 'Architectural (12px)' },
  { value: 'soft', label: 'Soft (20px)' },
];

const DENSITY_SEGMENTS: readonly ZenSegmentItem<ZenDensityMode>[] = [
  { value: 'comfortable', label: 'Comfortable' },
  { value: 'compact', label: 'Compact' },
];

const CATALOG_TABS: readonly ZenTabItem<CatalogSectionTab>[] = [
  { id: 'all', label: 'All Suites', badge: '51' },
  { id: 'forms', label: 'Forms & Inputs', badge: '11' },
  { id: 'navigation', label: 'Navigation', badge: '7' },
  { id: 'overlays', label: 'Surfaces & Overlays', badge: '8' },
  { id: 'data', label: 'Data & Telemetry', badge: '16' },
  { id: 'feedback', label: 'Feedback & States', badge: '9' },
];

const FRAMEWORK_OPTIONS: readonly ZenDropdownOption<string>[] = [
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

const DEPLOY_REGION_OPTIONS = [
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

const FILTER_CHIPS: readonly ZenChipOption<string>[] = [
  { value: 'wcag-aa', label: 'WCAG 2.2 AA (51)' },
  { value: 'roving-tab', label: 'Roving TabIndex (14)' },
  { value: 'tabular-nums', label: 'Tabular Nums (19)' },
  { value: 'zero-dep', label: 'Zero UI Runtime Deps (51)' },
  { value: 'reduced-motion', label: 'Reduced Motion Safe (51)' },
];

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

type InstallStackId = 'react' | 'angular' | 'vue' | 'vanilla';

const INSTALL_STACK_SEGMENTS: readonly ZenSegmentItem<InstallStackId>[] = [
  { value: 'react', label: 'React 19' },
  { value: 'angular', label: 'Angular 20+' },
  { value: 'vue', label: 'Vue / Svelte' },
  { value: 'vanilla', label: 'Vanilla / HTML' },
];

const INSTALL_SNIPPETS: Record<
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

export default function App() {
  const {
    theme,
    polarity,
    themeMeta,
    setTheme,
    togglePolarity,
    density,
    setDensity,
    radius,
    setRadius,
  } = useZenTheme();
  const audio = useZenAudioSynth({ defaultPreset: 'lofi-atelier' });
  const { toasts, pushToast, dismissToast } = useZenToast();

  const [ambientMode, setAmbientMode] = useState<ZenBackgroundVariant>('blackwall-lattice');
  const [commandOpen, setCommandOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [installStack, setInstallStack] = useState<InstallStackId>('react');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [catalogTab, setCatalogTab] = useState<CatalogSectionTab>('all');
  const [activeNavSection, setActiveNavSection] = useState<NavSectionId>('orion-core');

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

  useEffect(() => {
    registerZenElements();
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };

    const updateActiveSection = () => {
      const threshold = 180;
      let current: NavSectionId = 'orion-core';
      for (const sectionId of NAV_SECTION_IDS) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold) {
            current = sectionId;
          }
        }
      }
      setActiveNavSection(current);
    };

    updateActiveSection();
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('scroll', updateActiveSection);
    };
  }, []);

  const darkThemes = ZEN_THEMES.filter((item) => item.polarity === 'dark');
  const lightThemes = ZEN_THEMES.filter((item) => item.polarity === 'light');

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

  const commandItems: readonly ZenCommandItem[] = [
    ...ZEN_THEMES.map((t) => ({
      id: `theme-${t.id}`,
      label: `Activate Theme: ${t.name}`,
      group: `Themes (${t.polarity.toUpperCase()})`,
      shortcut: [t.polarity === 'dark' ? 'DARK' : 'LIGHT'],
      icon: t.polarity === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />,
      onSelect: () => {
        setTheme(t.id);
        pushToast({
          title: `Theme: ${t.name}`,
          detail: t.tagline,
          tone: 'info',
        });
      },
    })),
    {
      id: 'ambient-lattice',
      label: 'Background: Blackwall Lattice',
      group: 'Ambient Canvas',
      icon: <Cpu className="w-4 h-4" />,
      onSelect: () => setAmbientMode('blackwall-lattice'),
    },
    {
      id: 'ambient-aurora',
      label: 'Background: Aurora Mesh',
      group: 'Ambient Canvas',
      icon: <Sparkles className="w-4 h-4" />,
      onSelect: () => setAmbientMode('aurora-mesh'),
    },
    {
      id: 'ambient-blueprint',
      label: 'Background: Swiss Blueprint',
      group: 'Ambient Canvas',
      icon: <LayoutGrid className="w-4 h-4" />,
      onSelect: () => setAmbientMode('swiss-blueprint'),
    },
    {
      id: 'open-drawer',
      label: 'Open Slide-Over Inspector Drawer',
      group: 'Overlays',
      shortcut: ['D'],
      icon: <PanelRightOpen className="w-4 h-4" />,
      onSelect: () => setDrawerOpen(true),
    },
    {
      id: 'open-modal',
      label: 'Open Architecture Export Modal',
      group: 'Overlays',
      shortcut: ['M'],
      icon: <Code2 className="w-4 h-4" />,
      onSelect: () => setModalOpen(true),
    },
  ];

  const benchmarkColumns: readonly ZenTableColumn<ComponentBenchmarkRow>[] = [
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

  const showForms = catalogTab === 'all' || catalogTab === 'forms';
  const showNavigation = catalogTab === 'all' || catalogTab === 'navigation';
  const showOverlays = catalogTab === 'all' || catalogTab === 'overlays';
  const showData = catalogTab === 'all' || catalogTab === 'data';
  const showFeedback = catalogTab === 'all' || catalogTab === 'feedback';

  return (
    <div className="min-h-screen relative selection:bg-[var(--zen-accent-primary)] selection:text-[var(--zen-ink-on-accent)]">
      <ZenAmbientBackground variant={ambientMode} />

      <ZenCommandPalette
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
        items={commandItems}
      />

      <ZenNavbar
        brandTitle={
          <span className="inline-flex items-center gap-2.5">
            <span>zeN-UI // CAPRI</span>
            <ZenBadge tone="gold" pulse>
              v{ZEN_UI_VERSION}
            </ZenBadge>
          </span>
        }
        brandSubtitle={`${themeMeta.name.toUpperCase()} · ${polarity.toUpperCase()} POLARITY · LATEST v${ZEN_UI_VERSION}`}
        navSlot={
          <>
            <a
              href="#orion-core"
              onClick={() => setActiveNavSection('orion-core')}
              aria-current={activeNavSection === 'orion-core' ? 'location' : undefined}
              className={`px-3 py-1.5 rounded-lg zen-font-mono text-xs transition-colors ${
                activeNavSection === 'orion-core'
                  ? 'text-[var(--zen-accent-primary)] font-semibold bg-[var(--zen-accent-subtle)]'
                  : 'text-[var(--zen-ink-secondary)] hover:text-[var(--zen-ink-primary)]'
              }`}
            >
              01. Capri Core
            </a>
            <a
              href="#theme-matrix"
              onClick={() => setActiveNavSection('theme-matrix')}
              aria-current={activeNavSection === 'theme-matrix' ? 'location' : undefined}
              className={`px-3 py-1.5 rounded-lg zen-font-mono text-xs transition-colors ${
                activeNavSection === 'theme-matrix'
                  ? 'text-[var(--zen-accent-primary)] font-semibold bg-[var(--zen-accent-subtle)]'
                  : 'text-[var(--zen-ink-secondary)] hover:text-[var(--zen-ink-primary)]'
              }`}
            >
              02. 8 Themes
            </a>
            <a
              href="#component-catalog"
              onClick={() => setActiveNavSection('component-catalog')}
              aria-current={activeNavSection === 'component-catalog' ? 'location' : undefined}
              className={`px-3 py-1.5 rounded-lg zen-font-mono text-xs transition-colors ${
                activeNavSection === 'component-catalog'
                  ? 'text-[var(--zen-accent-primary)] font-semibold bg-[var(--zen-accent-subtle)]'
                  : 'text-[var(--zen-ink-secondary)] hover:text-[var(--zen-ink-primary)]'
              }`}
            >
              03. Overview
            </a>
            <a
              href="#storybook-playground"
              onClick={() => setActiveNavSection('storybook-playground')}
              aria-current={activeNavSection === 'storybook-playground' ? 'location' : undefined}
              className={`px-3 py-1.5 rounded-lg zen-font-mono text-xs transition-colors ${
                activeNavSection === 'storybook-playground'
                  ? 'text-[var(--zen-accent-primary)] font-semibold bg-[var(--zen-accent-subtle)]'
                  : 'text-[var(--zen-ink-secondary)] hover:text-[var(--zen-ink-primary)]'
              }`}
            >
              04. Storybook (51)
            </a>
          </>
        }
        actionsSlot={
          <>
            <ZenButton
              variant="secondary"
              size="sm"
              mono
              onClick={() => setCommandOpen(true)}
              iconLeft={<Search className="w-3.5 h-3.5 text-[var(--zen-accent-primary)]" />}
            >
              <span className="hidden xs:inline">Command</span>
              <span className="hidden sm:inline-flex">
                <ZenKbd keys={['Ctrl', 'K']} />
              </span>
            </ZenButton>

            <ZenButton
              variant="secondary"
              size="sm"
              mono
              onClick={() => {
                audio.playMicroClick(560);
                togglePolarity();
              }}
              iconLeft={
                polarity === 'dark' ? (
                  <Sun className="w-3.5 h-3.5 text-[var(--zen-accent-primary)]" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-[var(--zen-accent-primary)]" />
                )
              }
            >
              <span className="hidden sm:inline">
                {polarity === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </span>
              <span className="sm:hidden">
                {polarity === 'dark' ? 'Light' : 'Dark'}
              </span>
            </ZenButton>

            <ZenAudioController
              synth={audio}
              mode="pill"
              className="hidden md:inline-flex"
            />
          </>
        }
      />

      <main className="relative z-10 max-w-[90rem] mx-auto px-3 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-16 sm:pb-24 space-y-14 sm:space-y-24">
        <section id="orion-core" className="space-y-8">
          <ZenCard
            variant="selected"
            padding="lg"
            className="flex flex-col justify-between relative overflow-hidden space-y-8"
          >
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <ZenBadge tone="gold" pulse>
                  @ZEN-UI/SYSTEM v{ZEN_UI_VERSION} · LATEST NPM RELEASE
                </ZenBadge>
                <ZenBadge tone="emerald">
                  1 UNIFIED PACKAGE (UI + CAPRI AI CORE + CLI)
                </ZenBadge>
                <ZenBadge tone="neutral">51 UNIVERSAL MODULES</ZenBadge>
                <ZenBadge tone="neutral">40 VECTOR ICONS</ZenBadge>
                <ZenBadge tone="neutral">4 DARK + 4 LIGHT THEMES</ZenBadge>
              </div>

              <ZenHeading
                as="h1"
                size="hero"
                accentText="Every Future Project."
                subtitle="Universal Multi-Stack UI Primitives + Capri AI Subroutine Engine"
              >
                One Universal Design System for
              </ZenHeading>

              <p className="text-base sm:text-lg text-[var(--zen-ink-secondary)] max-w-3xl leading-relaxed">
                Ship one versioned package (<code>@zen-ui/system@v{ZEN_UI_VERSION}</code>) containing 51 React 19 TSX primitives, W3C Custom Elements for Angular 20+ / Vue 3 / HTML, 40 vector icons, 8 dark/light CSS token themes, and the zero-runtime <code>npx capri</code> CLI &amp; security guard.
              </p>
            </div>

            <div className="space-y-6">
              <ZenMetricStrip
                columns={4}
                metrics={[
                  { value: `v${ZEN_UI_VERSION}`, label: 'Unified NPM Package', accent: true },
                  { value: '51 Modules', label: 'React + W3C Elements' },
                  { value: '33.9 kB', label: 'Full ESM Bundle (Gzip)' },
                  { value: '0 any', label: 'Strict TypeScript' },
                ]}
              />

              <div className="p-3.5 rounded-2xl bg-[var(--zen-surface-subtle)] border border-[var(--zen-border-default)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="zen-telemetry-label text-[var(--zen-accent-primary)]">
                    SINGLE VERSIONED NPM PACKAGE (UI COMPONENTS + CAPRI AI CORE + CLI)
                  </div>
                  <code className="block zen-font-mono text-xs text-[var(--zen-ink-primary)] truncate mt-0.5">
                    {`npm install "@zen-ui/system@https://github.com/lukaspabst/zeN-UI/releases/download/v${ZEN_UI_VERSION}/zen-ui-system-${ZEN_UI_VERSION}.tgz"`}
                  </code>
                </div>
                <ZenCopyButton
                  value={`npm install "@zen-ui/system@https://github.com/lukaspabst/zeN-UI/releases/download/v${ZEN_UI_VERSION}/zen-ui-system-${ZEN_UI_VERSION}.tgz"`}
                  label={`COPY v${ZEN_UI_VERSION} INSTALL`}
                  copiedLabel="COPIED"
                  size="sm"
                />
              </div>

              <div className="pt-4 border-t border-[var(--zen-border-subtle)] flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <ZenButton
                    variant="primary"
                    size="md"
                    onClick={() => {
                      document
                        .getElementById('storybook-playground')
                        ?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    iconLeft={<Layers className="w-4 h-4" />}
                  >
                    Open Storybook (51)
                  </ZenButton>
                  <ZenButton
                    variant="secondary"
                    size="md"
                    mono
                    onClick={() => setCommandOpen(true)}
                    iconLeft={<Command className="w-4 h-4 text-[var(--zen-accent-primary)]" />}
                  >
                    Command Palette (Ctrl+K)
                  </ZenButton>
                  <ZenButton
                    variant="ghost"
                    size="md"
                    mono
                    onClick={() => setModalOpen(true)}
                    iconLeft={<Code2 className="w-4 h-4" />}
                  >
                    Install SDK
                  </ZenButton>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="zen-telemetry-label">AMBIENT CANVAS:</span>
                  <ZenSegmentedControl
                    ariaLabel="Select Ambient Background Mode"
                    size="sm"
                    items={AMBIENT_SEGMENTS}
                    value={ambientMode}
                    onChange={(mode) => {
                      audio.playMicroClick(500);
                      setAmbientMode(mode);
                    }}
                  />
                </div>
              </div>
            </div>
          </ZenCard>

          <ZenAIConstruct
            constructName="CAPRI // CAPRICORN"
            subtitle="EDGERUNNERS S2 SOULKILLER MIXED-CONSTRUCT · DESIGN SYSTEM CORE"
            defaultMode="orion"
          />
        </section>

        <section id="theme-matrix" className="space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <ZenHeading
              as="h2"
              size="section"
              eyebrow="02 // 8-THEME POLARITY ENGINE & GEOMETRY CONTROLS"
              accentText="Polarity"
            >
              Adaptive Dark & Light Matrix
            </ZenHeading>

            <div className="flex flex-wrap items-center gap-3">
              <ZenSegmentedControl
                ariaLabel="Border Radius Mode"
                size="sm"
                items={RADIUS_SEGMENTS}
                value={radius}
                onChange={(next) => {
                  audio.playMicroClick(540);
                  setRadius(next);
                }}
              />
              <ZenSegmentedControl
                ariaLabel="Spacing Density Mode"
                size="sm"
                items={DENSITY_SEGMENTS}
                value={density}
                onChange={(next) => {
                  audio.playMicroClick(580);
                  setDensity(next);
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ZenCard variant="static" padding="md" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Moon className="w-4 h-4 text-[var(--zen-accent-primary)]" />
                  <span className="zen-font-mono text-xs uppercase tracking-[0.16em] text-[var(--zen-ink-primary)] font-semibold">
                    Dark Polarity Themes (4)
                  </span>
                </div>
                <ZenBadge tone={polarity === 'dark' ? 'gold' : 'neutral'}>
                  {polarity === 'dark' ? 'ACTIVE POLARITY' : 'CLICK TO ACTIVATE'}
                </ZenBadge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {darkThemes.map((t) => {
                  const isSelected = theme === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      data-zen-occlude="true"
                      onClick={() => {
                        audio.playMicroClick(520);
                        setTheme(t.id as ZenThemeId);
                      }}
                      className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer zen-focus-ring ${
                        isSelected
                          ? 'border-[var(--zen-accent-primary)] bg-[var(--zen-accent-subtle)] shadow-[0_0_0_1px_var(--zen-accent-primary)]'
                          : 'border-[var(--zen-border-subtle)] bg-[var(--zen-surface-subtle)] hover:border-[var(--zen-border-strong)]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="zen-font-display text-sm font-bold text-[var(--zen-ink-primary)]">
                          {t.name}
                        </span>
                        <div className="flex items-center gap-1">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/20"
                            style={{ backgroundColor: t.canvasHex }}
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full"
                            style={{ backgroundColor: t.accentHex }}
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full"
                            style={{ backgroundColor: t.secondaryHex }}
                          />
                        </div>
                      </div>
                      <p className="text-xs text-[var(--zen-ink-secondary)] line-clamp-2 mb-2">
                        {t.tagline}
                      </p>
                      <span className="zen-telemetry-label text-[var(--zen-accent-primary)]">
                        {t.id}
                      </span>
                    </button>
                  );
                })}
              </div>
            </ZenCard>

            <ZenCard variant="static" padding="md" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-[var(--zen-accent-primary)]" />
                  <span className="zen-font-mono text-xs uppercase tracking-[0.16em] text-[var(--zen-ink-primary)] font-semibold">
                    Light Polarity Themes (4)
                  </span>
                </div>
                <ZenBadge tone={polarity === 'light' ? 'gold' : 'neutral'}>
                  {polarity === 'light' ? 'ACTIVE POLARITY' : 'CLICK TO ACTIVATE'}
                </ZenBadge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {lightThemes.map((t) => {
                  const isSelected = theme === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      data-zen-occlude="true"
                      onClick={() => {
                        audio.playMicroClick(580);
                        setTheme(t.id as ZenThemeId);
                      }}
                      className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer zen-focus-ring ${
                        isSelected
                          ? 'border-[var(--zen-accent-primary)] bg-[var(--zen-accent-subtle)] shadow-[0_0_0_1px_var(--zen-accent-primary)]'
                          : 'border-[var(--zen-border-subtle)] bg-[var(--zen-surface-subtle)] hover:border-[var(--zen-border-strong)]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="zen-font-display text-sm font-bold text-[var(--zen-ink-primary)]">
                          {t.name}
                        </span>
                        <div className="flex items-center gap-1">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/20"
                            style={{ backgroundColor: t.canvasHex }}
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full"
                            style={{ backgroundColor: t.accentHex }}
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full"
                            style={{ backgroundColor: t.secondaryHex }}
                          />
                        </div>
                      </div>
                      <p className="text-xs text-[var(--zen-ink-secondary)] line-clamp-2 mb-2">
                        {t.tagline}
                      </p>
                      <span className="zen-telemetry-label text-[var(--zen-accent-primary)]">
                        {t.id}
                      </span>
                    </button>
                  );
                })}
              </div>
            </ZenCard>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOKEN_SWATCHES.map((swatch) => (
              <ZenCard key={swatch.cssVar} variant="static" padding="sm" className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="zen-font-display text-sm font-bold text-[var(--zen-ink-primary)]">
                    {swatch.name}
                  </span>
                  <ZenCopyButton value={`var(${swatch.cssVar})`} label={swatch.cssVar} size="sm" />
                </div>
                <div className="zen-font-mono text-[11px] text-[var(--zen-ink-muted)] space-y-1">
                  <div>DARK: {swatch.darkExample}</div>
                  <div>LIGHT: {swatch.lightExample}</div>
                </div>
                <div className="pt-1 border-t border-[var(--zen-border-subtle)] flex items-center justify-between">
                  <span className="zen-font-mono text-[11px] text-[var(--zen-accent-primary)]">
                    {swatch.contrastNote}
                  </span>
                </div>
              </ZenCard>
            ))}
          </div>
        </section>

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
                onClick={() => setCommandOpen(true)}
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
                value="npm install @zen-ui/system"
                label="COPY INSTALL CMD"
                copiedLabel="COPIED TO CLIPBOARD"
              />

              <ZenTooltip content="Launch Global Command Palette (Ctrl+K)">
                <ZenIconButton
                  ariaLabel="Open Command Palette"
                  onClick={() => setCommandOpen(true)}
                >
                  <Command className="w-4 h-4 text-[var(--zen-accent-primary)]" />
                </ZenIconButton>
              </ZenTooltip>

              <ZenTooltip content="Open Slide-Over Inspector Drawer">
                <ZenIconButton
                  ariaLabel="Open Slide-Over Drawer"
                  onClick={() => setDrawerOpen(true)}
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
                    { id: 'root', label: '@zen-ui/system', onClick: () => setActiveSidebarId('overview') },
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
                      onClick={() => setDrawerOpen(true)}
                      iconLeft={<PanelRightOpen className="w-3.5 h-3.5 text-[var(--zen-accent-primary)]" />}
                    >
                      Open Drawer
                    </ZenButton>
                    <ZenButton
                      variant="secondary"
                      size="sm"
                      mono
                      onClick={() => setModalOpen(true)}
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
                    title="Unified @zen-ui/system NPM Package & Capri CLI"
                    institution="@zen-ui/system"
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
                  columns={benchmarkColumns}
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
                    title={`@zen-ui/system v${ZEN_UI_VERSION} Unified Package Ready`}
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

        <section id="storybook-playground" className="space-y-8">
          <ZenHeading
            as="h2"
            size="section"
            eyebrow="04 // STORYBOOK COMPONENT EXPLORER & FULL ATTRIBUTE ARGTYPES (51 MODULES)"
            accentText="Playground"
            subtitle="Select any single component from the sidebar tree to inspect and modify every attribute in real time across React 19, Angular 20+, and HTML/CSS."
          >
            Interactive Storybook
          </ZenHeading>

          <ZenStorybookPlayground />
        </section>
      </main>

      <ZenModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        eyebrow="ZEN-UI // MULTI-FRAMEWORK EXPORT"
        title="Install @zen-ui/system in Any Tech Stack"
        footer={
          <>
            <ZenButton variant="ghost" size="sm" onClick={() => setModalOpen(false)}>
              Close
            </ZenButton>
            <ZenCopyButton
              value={INSTALL_SNIPPETS[installStack].code}
              label="COPY STACK CODE"
              size="sm"
              variant="primary"
            />
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-xs sm:text-sm text-[var(--zen-ink-secondary)] leading-relaxed">
            Use native React 19 TSX components or import <code className="zen-font-mono text-[var(--zen-accent-primary)]">@zen-ui/system/universal</code> + <code className="zen-font-mono text-[var(--zen-accent-primary)]">@zen-ui/system/tokens.css</code> in Angular 20+, Vue 3, Svelte 5, Astro, or Vanilla HTML.
          </p>
          <ZenSegmentedControl
            ariaLabel="Select Frontend Stack"
            size="sm"
            items={INSTALL_STACK_SEGMENTS}
            value={installStack}
            onChange={(next) => {
              audio.playMicroClick(560);
              setInstallStack(next);
            }}
          />
          <ZenCodeBlock
            title={INSTALL_SNIPPETS[installStack].title}
            language={INSTALL_SNIPPETS[installStack].lang}
            code={INSTALL_SNIPPETS[installStack].code}
          />
        </div>
      </ZenModal>

      <ZenDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Active Theme & System Telemetry"
        subtitle={themeMeta.name}
        footer={
          <>
            <ZenButton variant="ghost" size="sm" onClick={() => setDrawerOpen(false)}>
              Close Drawer
            </ZenButton>
            <ZenButton
              variant="primary"
              size="sm"
              onClick={() => {
                togglePolarity();
                pushToast({
                  title: 'Polarity Switched',
                  detail: 'Runtime CSS tokens updated inside slide-over drawer.',
                  tone: 'info',
                });
              }}
              iconLeft={<RefreshCw className="w-3.5 h-3.5" />}
            >
              Toggle Polarity
            </ZenButton>
          </>
        }
      >
        <div className="space-y-5">
          <ZenAlert tone="info" title={`Active Theme: ${themeMeta.name}`}>
            {themeMeta.tagline}
          </ZenAlert>

          <div className="space-y-2">
            <span className="zen-telemetry-label">QUICK THEME SWITCHER</span>
            <div className="grid grid-cols-2 gap-2">
              {ZEN_THEMES.map((t) => (
                <ZenButton
                  key={t.id}
                  variant={theme === t.id ? 'primary' : 'secondary'}
                  size="sm"
                  mono
                  onClick={() => setTheme(t.id)}
                >
                  {t.name}
                </ZenButton>
              ))}
            </div>
          </div>

          <ZenDivider label="GEOMETRY & DENSITY" />

          <div className="space-y-3">
            <ZenSegmentedControl
              ariaLabel="Drawer Radius Control"
              size="sm"
              items={RADIUS_SEGMENTS}
              value={radius}
              onChange={setRadius}
            />
            <ZenSegmentedControl
              ariaLabel="Drawer Density Control"
              size="sm"
              items={DENSITY_SEGMENTS}
              value={density}
              onChange={setDensity}
            />
          </div>
        </div>
      </ZenDrawer>

      <ZenToastStack toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
