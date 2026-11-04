import { useEffect, useState } from 'react';
import {
  Code2,
  Command,
  Cpu,
  Layers,
  LayoutGrid,
  Moon,
  PanelRightOpen,
  RefreshCw,
  Search,
  Sparkles,
  Sun,
} from 'lucide-react';
import {
  ZEN_THEMES,
  ZEN_UI_VERSION,
  ZenAIConstruct,
  ZenAlert,
  ZenAmbientBackground,
  ZenAudioController,
  ZenBadge,
  ZenButton,
  ZenCard,
  ZenCodeBlock,
  ZenCommandPalette,
  ZenCopyButton,
  ZenDivider,
  ZenDrawer,
  ZenHeading,
  ZenKbd,
  ZenMetricStrip,
  ZenModal,
  ZenNavbar,
  ZenSegmentedControl,
  ZenToastStack,
  registerZenElements,
  useZenAudioSynth,
  useZenTheme,
  useZenToast,
  type ZenBackgroundVariant,
  type ZenCommandItem,
  type ZenSegmentItem,
} from './lib';
import { ZenStorybookPlayground } from './components/ZenStorybookPlayground';
import {
  DENSITY_SEGMENTS,
  RADIUS_SEGMENTS,
  ThemeMatrixSection,
} from './sections/ThemeMatrixSection';
import {
  ComponentWorkbenchSection,
  INSTALL_SNIPPETS,
  INSTALL_STACK_SEGMENTS,
  type InstallStackId,
} from './sections/ComponentWorkbenchSection';

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
  const [imprintOpen, setImprintOpen] = useState(false);
  const [installStack, setInstallStack] = useState<InstallStackId>('react');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeNavSection, setActiveNavSection] = useState<NavSectionId>('orion-core');

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
          <span className="inline-flex items-center gap-1.5 sm:gap-2.5">
            <span className="pr-0.5">zeN-UI // CAPRI</span>
            <ZenBadge tone="gold" pulse className="shrink-0">
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
              aria-label="Open Command Palette (Ctrl+K)"
              className="!px-2.5 sm:!px-3.5 !gap-0 sm:!gap-2"
              onClick={() => setCommandOpen(true)}
              iconLeft={<Search className="w-3.5 h-3.5 text-[var(--zen-accent-primary)]" />}
            >
              <span className="hidden sm:inline">Command</span>
              <span className="hidden md:inline-flex sm:ml-1.5">
                <ZenKbd keys={['Ctrl', 'K']} />
              </span>
            </ZenButton>

            <ZenButton
              variant="secondary"
              size="sm"
              mono
              aria-label={polarity === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="!px-2.5 sm:!px-3.5 !gap-0 min-[360px]:!gap-1.5 sm:!gap-2"
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
              <span className="hidden min-[360px]:inline sm:hidden">
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
        mobileActionsSlot={
          <>
            <ZenAudioController
              synth={audio}
              mode="pill"
              className="flex-1 justify-center"
            />
            <ZenButton
              variant="secondary"
              size="sm"
              mono
              onClick={() => setCommandOpen(true)}
              iconLeft={<Search className="w-3.5 h-3.5 text-[var(--zen-accent-primary)]" />}
            >
              Command
            </ZenButton>
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
                  @ZEN-UI-CAPRI/SYSTEM v{ZEN_UI_VERSION} · LATEST NPM RELEASE
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
                Ship one versioned package (<code>@zen-ui-capri/system@v{ZEN_UI_VERSION}</code>) containing 51 React 19 TSX primitives, W3C Custom Elements for Angular 20+ / Vue 3 / HTML, 40 vector icons, 8 dark/light CSS token themes, and the zero-runtime <code>npx capri</code> CLI &amp; security guard.
              </p>
            </div>

            <div className="space-y-6">
              <ZenMetricStrip
                columns={4}
                metrics={[
                  { value: `v${ZEN_UI_VERSION}`, label: 'Unified NPM Package', accent: true },
                  { value: '51 Modules', label: 'React + W3C Elements' },
                  { value: '0 Deps', label: 'Zero Runtime Bloat' },
                  { value: '0 any', label: 'Strict TypeScript' },
                ]}
              />

              <div className="p-3.5 rounded-2xl bg-[var(--zen-surface-subtle)] border border-[var(--zen-border-default)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="zen-telemetry-label text-[var(--zen-accent-primary)]">
                    SINGLE VERSIONED NPM PACKAGE (UI COMPONENTS + CAPRI AI CORE + CLI)
                  </div>
                  <code className="block zen-font-mono text-xs text-[var(--zen-ink-primary)] truncate mt-0.5">
                    {`npm install @zen-ui-capri/system@${ZEN_UI_VERSION}`}
                  </code>
                </div>
                <ZenCopyButton
                  value={`npm install @zen-ui-capri/system@${ZEN_UI_VERSION}`}
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

        <ThemeMatrixSection audio={audio} />

        <ComponentWorkbenchSection
          audio={audio}
          pushToast={pushToast}
          onOpenCommandPalette={() => setCommandOpen(true)}
          onOpenDrawer={() => setDrawerOpen(true)}
          onOpenModal={() => setModalOpen(true)}
          installStack={installStack}
          setInstallStack={setInstallStack}
        />

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

        <footer className="pt-8 border-t border-[var(--zen-border-subtle)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 zen-font-mono text-xs text-[var(--zen-ink-muted)]">
          <div className="flex flex-wrap items-center gap-3">
            <span>© {new Date().getFullYear()} Lukas Pabst</span>
            <span>·</span>
            <span>MIT License</span>
            <span>·</span>
            <span>Sissach, CH</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://lpabst.dev"
              className="hover:text-[var(--zen-ink-primary)] transition-colors"
            >
              lpabst.dev
            </a>
            <a
              href="https://terminal.lpabst.dev"
              className="hover:text-[var(--zen-ink-primary)] transition-colors"
            >
              terminal.lpabst.dev
            </a>
            <a
              href="https://github.com/lukaspabst/zeN-UI"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--zen-ink-primary)] transition-colors"
            >
              GitHub
            </a>
            <button
              type="button"
              onClick={() => setImprintOpen(true)}
              className="zen-focus-ring text-[var(--zen-accent-primary)] hover:underline cursor-pointer"
            >
              Imprint &amp; Privacy / Impressum
            </button>
          </div>
        </footer>
      </main>

      <ZenModal
        open={imprintOpen}
        onClose={() => setImprintOpen(false)}
        eyebrow="LEGAL NOTICE · SWITZERLAND & EU"
        title="Imprint & Privacy / Impressum & Datenschutz"
        subtitle="ui.lpabst.dev · lpabst.dev"
        footer={
          <ZenButton
            variant="secondary"
            size="sm"
            mono
            onClick={() => setImprintOpen(false)}
          >
            Close / Schließen
          </ZenButton>
        }
      >
        <div className="space-y-4 text-sm text-[var(--zen-ink-secondary)] leading-relaxed">
          <div>
            <div className="zen-telemetry-label text-[var(--zen-ink-primary)] mb-1">
              RESPONSIBLE FOR CONTENT / VERANTWORTLICH FÜR DEN INHALT
            </div>
            <p className="text-[var(--zen-ink-primary)] font-medium">
              Lukas Pabst
            </p>
            <p>4450 Sissach, Kanton Basel-Landschaft, Switzerland</p>
            <p className="mt-1">
              E-Mail:{' '}
              <a
                href="mailto:lukas.pabst@outlook.de"
                className="text-[var(--zen-accent-primary)] hover:underline"
              >
                lukas.pabst@outlook.de
              </a>
            </p>
          </div>

          <div>
            <div className="zen-telemetry-label text-[var(--zen-ink-primary)] mb-1">
              PURPOSE / ZWECK DIESER WEBSITE
            </div>
            <p>
              Non-commercial open-source documentation and interactive component playground for <code>@zen-ui-capri/system</code> (MIT License). / Nicht-kommerzielle Open-Source-Dokumentation und Komponenten-Vorschau für <code>@zen-ui-capri/system</code> (MIT-Lizenz).
            </p>
          </div>

          <div>
            <div className="zen-telemetry-label text-[var(--zen-ink-primary)] mb-1">
              PRIVACY &amp; HOSTING (CH-nDSG / GDPR)
            </div>
            <p>
              Zero tracking cookies, zero analytics scripts, and no advertising trackers. Hosted on a dedicated Linux server at Hetzner Online GmbH (Germany/EU) behind Cloudflare DNS/TLS protection. Standard technical server logs (IP address, timestamp, requested path) are processed solely to ensure secure operation and mitigate abuse.
            </p>
          </div>
        </div>
      </ZenModal>

      <ZenModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        eyebrow="ZEN-UI // MULTI-FRAMEWORK EXPORT"
        title="Install @zen-ui-capri/system in Any Tech Stack"
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
            Use native React 19 TSX components or import <code className="zen-font-mono text-[var(--zen-accent-primary)]">@zen-ui-capri/system/universal</code> + <code className="zen-font-mono text-[var(--zen-accent-primary)]">@zen-ui-capri/system/tokens.css</code> in Angular 20+, Vue 3, Svelte 5, Astro, or Vanilla HTML.
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
