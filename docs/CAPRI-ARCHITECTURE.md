---
project: "zeN-UI"
version: "1.1.5"
files: 47
loc: 15956
tags: [capri-docu, architecture, ideaprojects]
---
# zeN-UI // CAPRI Architecture & AI Context Dossier
> **Executive Summary:** Universal Multi-Polarity Design System (`@zen-ui-capri/system` v1.1.5), 51 UI modules, 40 vector icons, 8 Dark/Light themes, Three.js WebGL Cosmos, Web Audio Synth, W3C Custom Elements, and the `Capri` AI Co-Pilot CLI (`https://ui.lpabst.dev`).
>
> *Generated automatically via `npx capri docu` (Zero build or browser runtime overhead) · Linked to [[000-Master-Workspace-Index]]*

## 1. Project Identity & Stack Overview
- **Repository:** `zeN-UI` (`@zen-ui-capri/system`)
- **Version:** `1.1.5`
- **Detected Stack:** React 19 · Three.js / WebGL · GSAP Motion · Vite · @zen-ui-capri/system (CAPRI) · TypeScript · Docker Containerized
- **Top-Level Subsystems:** `/bin`, `/docker`, `/public`, `/src`, `/tests`
- **Container Readiness:** `docker-compose.yml` present

## 2. Codebase Metrics & Language Breakdown
- **Total Source Files Scanned:** 47
- **Total Lines of Code (LOC):** 15,956
- **File Extensions:** `.tsx` (33), `.ts` (11), `.mjs` (1), `.html` (1), `.css` (1)
- **Key Domain Symbols / Classes / Functions (45):** `ZEN_ICON_SVG_INNER`, `StoryCategory`, `StoryControlType`, `StoryArgValue`, `StoryPropDef`, `StoryEntry`, `STORYBOOK_CATALOG`, `CATEGORY_FILTERS`, `buildInitialArgs`, `StorybookStageRenderer`, `SampleRow`, `StorybookStageRendererProps`, `ZenStorybookPlayground`, `CatalogSectionTab`, `InstallStackId`, `CATALOG_TABS`, `FRAMEWORK_OPTIONS`, `DEPLOY_REGION_OPTIONS`, `FILTER_CHIPS`, `INSTALL_STACK_SEGMENTS`, `INSTALL_SNIPPETS`, `AppShell`, `AppComponent`, `TokenSwatch`, `ComponentBenchmarkRow`, `TOKEN_SWATCHES`, `COMPONENT_BENCHMARKS`, `ORION_ACCORDION_ITEMS`, `WORKFLOW_STEPS`, `SHOWCASE_DOSSIERS`, `ZenSynthPresetId`, `ZenSynthPreset`

## 4. Architecture & Subsystem Topology (`flowchart TD`)
```mermaid
flowchart TD
  Repo["zeN-UI v1.1.5"]
  Stack["Stack: React 19 · Three.js / WebGL · GSAP Motion · Vite · @zen-ui-capri/system (CAPRI)"]
  Repo --> Stack
  N0_bin["/bin"]
  Stack --> N0_bin
  N1_docker["/docker"]
  Stack --> N1_docker
  N2_public["/public"]
  Stack --> N2_public
  N3_src["/src"]
  Stack --> N3_src
  N4_tests["/tests"]
  Stack --> N4_tests
  Docker["Docker / Compose Runtime"]
  Repo -.->|"Containerized"| Docker
```

## 5. Key Domain Modules & Entrypoints Inventory
| Module Path | Lines | Extension |
| :--- | ---: | :--- |
| `bin/capri.mjs` | 1193 | `.mjs` |
| `src/components/storybook/StorybookStageRenderer.tsx` | 1052 | `.tsx` |
| `src/lib/capri/capri-engine.ts` | 940 | `.ts` |
| `src/lib/cosmos/ZenCosmosCanvas.tsx` | 932 | `.tsx` |
| `src/sections/ComponentWorkbenchSection.tsx` | 920 | `.tsx` |
| `src/components/storybook/storybookCatalog.ts` | 903 | `.ts` |
| `src/lib/universal/zen-universal.ts` | 832 | `.ts` |
| `src/App.tsx` | 687 | `.tsx` |
| `src/lib/components/ZenForms.tsx` | 665 | `.tsx` |
| `src/lib/components/ZenAIConstruct.tsx` | 595 | `.tsx` |
| `src/components/ZenStorybookPlayground.tsx` | 504 | `.tsx` |
| `src/data/studioWorkbenchData.ts` | 394 | `.ts` |

## 7. Available Build & Automation Scripts
- `npm run dev`: `vite --port 5180`
- `npm run build`: `tsc --noEmit && vite build && npm run build:lib`
- `npm run build:lib`: `tsc -p tsconfig.lib.json && vite build --config vite.lib.config.ts`
- `npm run typecheck`: `tsc --noEmit`
- `npm run preview`: `vite preview --port 5180`
- `npm run test:e2e`: `playwright test`
- `npm run capri`: `node bin/capri.mjs`
- `npm run prepublishOnly`: `npm run capri -- all && npm run build`
- `npm run publish:npm`: `node bin/capri.mjs publish-npm`

## 8. Capri AI Agent Protocol (Claude / Codex / Gemini / Antigravity)
- **Subroutine `orion` (`CAPRI // UNLEASHED`):** Use `@zen-ui-capri/system` primitives and `<ZenIcon>` (40 vector glyphs) for UI views; keep action labels concise (`1-3 words`).
- **Subroutine `architect` (`SCS // ARCHITECT`):** Enforce strict typing (zero `any`, `readonly T[]`), modular files (`< 900` lines), and `--zen-*` CSS tokens.
- **Subroutine `guard` (`CYBERPSYCHOSIS // GUARD`):** Sanitize untrusted inputs (`capri.sanitizeForPrompt()`), prevent XSS/secret leaks, bind dropdowns to `onMouseDown`, and ensure zero horizontal overflow (`320px` to `4K`).
- **Subroutine `zen` (`THEME // MATRIX`):** Maintain 4 Dark + 4 Light themes (`>= 4.5:1` AA contrast) and 60fps `--zen-ease-spring` tactile motion.
- **Subroutine `docu` (`CAPRI // AUTO-DOCU`):** Re-run `npm run capri -- docu --workspace "C:\Users\Lukas\IdeaProjects" --write` whenever architectural boundaries or modules change.
