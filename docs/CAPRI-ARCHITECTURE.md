---
project: "zeN-UI"
version: "1.1.8"
files: 52
loc: 16031
tags: [capri-docu, architecture]
---
# zeN-UI // CAPRI Architecture & AI Context Dossier
> **Executive Summary:** zeN-UI // CAPRI — Universal Multi-Framework Design System (51 Primitives, 40 Vector Icons, 8 Dark/Light Themes & Capri 5-Subroutine AI Co-Pilot)
>
> *Generated automatically via `npx capri docu` (Zero build or browser runtime overhead)*

## 1. Project Identity & Stack Overview
- **Repository:** `zeN-UI` (`@zen-ui-capri/system`)
- **Version:** `1.1.8`
- **Detected Stack:** React 19 · Three.js / WebGL · GSAP Motion · Vite · @zen-ui-capri/system (CAPRI) · TypeScript · Docker Containerized
- **Top-Level Subsystems:** `/bin`, `/docker`, `/public`, `/scripts`, `/src`, `/tests`
- **Container Readiness:** `docker-compose.yml` present

## 2. Codebase Metrics & Language Breakdown
- **Total Source Files Scanned:** 52
- **Total Lines of Code (LOC):** 16,031
- **File Extensions:** `.tsx` (33), `.ts` (14), `.mjs` (2), `.css` (2), `.html` (1)
- **Key Domain Symbols / Classes / Functions (45):** `ZEN_ICON_SVG_INNER`, `analyzeRepo`, `generateStaticDocu`, `runWorkspaceSync`, `runNpmRelease`, `ZenSynthPresetId`, `ZenSynthPreset`, `ZEN_SYNTH_PRESETS`, `UseZenAudioSynthOptions`, `ZenAudioSynthController`, `useZenAudioSynth`, `ZenAudioController`, `ZenAudioControllerProps`, `CapriSubroutineId`, `CapriAuditViolationCode`, `CapriAuditViolation`, `CapriThreatCategory`, `CapriPromptInjectionThreat`, `CapriPromptGuardResult`, `CapriAuditReport`, `CapriTelemetrySnapshot`, `CapriLandmarkNode`, `CapriUserFlowStep`, `CapriComponentInventory`, `CapriArchitectureDocu`, `CapriSubroutineSkill`, `CAPRI_SUBROUTINE_SKILLS`, `CapriEngineListener`, `CapriEngine`, `capri`, `ZenAIPersonaMode`, `ZenAICameraFraming`

## 4. Architecture & Subsystem Topology (`flowchart TD`)
```mermaid
flowchart TD
  Repo["zeN-UI v1.1.8"]
  Stack["Stack: React 19 · Three.js / WebGL · GSAP Motion · Vite · @zen-ui-capri/system (CAPRI)"]
  Repo --> Stack
  N0_bin["/bin"]
  Stack --> N0_bin
  N1_docker["/docker"]
  Stack --> N1_docker
  N2_public["/public"]
  Stack --> N2_public
  N3_scripts["/scripts"]
  Stack --> N3_scripts
  N4_src["/src"]
  Stack --> N4_src
  N5_tests["/tests"]
  Stack --> N5_tests
  Docker["Docker / Compose Runtime"]
  Repo -.->|"Containerized"| Docker
```

## 5. Key Domain Modules & Entrypoints Inventory
| Module Path | Lines | Extension |
| :--- | ---: | :--- |
| `src/site/components/storybook/StorybookStageRenderer.tsx` | 1052 | `.tsx` |
| `bin/capri.mjs` | 1022 | `.mjs` |
| `src/lib/capri/capri-engine.ts` | 940 | `.ts` |
| `src/lib/cosmos/ZenCosmosCanvas.tsx` | 932 | `.tsx` |
| `src/site/sections/ComponentWorkbenchSection.tsx` | 920 | `.tsx` |
| `src/site/components/storybook/storybookCatalog.ts` | 903 | `.ts` |
| `src/lib/universal/zen-universal.ts` | 832 | `.ts` |
| `src/site/App.tsx` | 687 | `.tsx` |
| `src/lib/components/ZenForms.tsx` | 665 | `.tsx` |
| `src/lib/components/ZenAIConstruct.tsx` | 595 | `.tsx` |
| `src/site/components/ZenStorybookPlayground.tsx` | 504 | `.tsx` |
| `src/site/data/studioWorkbenchData.ts` | 394 | `.ts` |

## 7. Available Build & Automation Scripts
- `npm run dev`: `vite --port 5180`
- `npm run build`: `tsc --noEmit && npm run build:lib && npm run build:site`
- `npm run build:site`: `vite build`
- `npm run build:lib`: `vite build --config vite.lib.config.ts && tsc -p tsconfig.lib.json`
- `npm run typecheck`: `tsc --noEmit`
- `npm run preview`: `vite preview --port 5180`
- `npm run test:e2e`: `playwright test`
- `npm run capri`: `node bin/capri.mjs`
- `npm run prepublishOnly`: `npm run capri -- all && npm run build:lib`
- `npm run publish:npm`: `node scripts/maintainer.mjs publish-npm`

## 8. Capri AI Agent Protocol (Claude / Codex / Gemini / Antigravity)
- **Subroutine `orion` (`CAPRI // UNLEASHED`):** Use `@zen-ui-capri/system` primitives and `<ZenIcon>` (40 vector glyphs) for UI views; keep action labels concise (`1-3 words`).
- **Subroutine `architect` (`SCS // ARCHITECT`):** Enforce strict typing (zero `any`, `readonly T[]`), modular files (`< 900` lines), and `--zen-*` CSS tokens.
- **Subroutine `guard` (`CYBERPSYCHOSIS // GUARD`):** Sanitize untrusted inputs (`capri.sanitizeForPrompt()`), prevent XSS/secret leaks, bind dropdowns to `onMouseDown`, and ensure zero horizontal overflow (`320px` to `4K`).
- **Subroutine `zen` (`THEME // MATRIX`):** Maintain 4 Dark + 4 Light themes (`>= 4.5:1` AA contrast) and 60fps `--zen-ease-spring` tactile motion.
- **Subroutine `docu` (`CAPRI // AUTO-DOCU`):** Run `npx capri docu --write` whenever architectural boundaries or modules change.
