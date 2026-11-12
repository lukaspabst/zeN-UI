# zeN-UI // CAPRI Living Brain Index (`000-Index`)

Master architecture map and symptom-to-module lookup table for `@zen-ui-capri/system`.

- **Architecture Dossier:** [[CAPRI-ARCHITECTURE]]
- **Agent & Subroutine Protocol:** `AGENTS.md`

## Quick Symptom / Feature -> Owning File & Scoped Test Lookup

| Symptom / Feature | Owning Module(s) | Verification Command |
| :--- | :--- | :--- |
| React TSX components & modal/drawer focus management | `src/lib/components/ZenModal.tsx`, `src/lib/components/ZenOverlays.tsx`, `src/lib/index.ts` | `npm run build:lib && npm run test:e2e` |
| 48 built-in vector glyphs (`<ZenIcon />` & `<zen-icon>`) | `src/lib/components/ZenIcon.tsx`, `src/lib/universal/zen-universal-elements.ts` | `npm run capri -- orion` |
| 8 dark/light themes, density, radius & reduced-motion CSS | `src/lib/styles/zen-themes.css`, `src/lib/styles/zen-primitives.css`, `src/lib/theme/ZenThemeProvider.tsx` | `npm run capri -- zen` |
| W3C Custom Elements & SSR-safe universal controller | `src/lib/universal/zen-universal-core.ts`, `src/lib/universal/zen-universal-elements.ts`, `src/lib/universal/zen-universal.ts` | `npm run build:lib && npm run test:e2e` |
| Capri security firewall (`scanPromptInjection`, `sanitizeForPrompt`) | `src/lib/capri/capri-types.ts`, `src/lib/capri/capri-skills.ts`, `src/lib/capri/capri-engine.ts` | `npm run capri -- guard` |
| `npx capri` CLI audits & static architecture generator | `bin/capri.mjs`, `bin/lib/capri-subroutines.mjs`, `bin/lib/capri-audits.mjs`, `bin/lib/capri-docu.mjs` | `npm run capri -- all` |
| Interactive showcase workbench & 51-module Storybook | `src/site/App.tsx`, `src/site/sections/ComponentWorkbenchSection.tsx`, `src/site/components/ZenStorybookPlayground.tsx` | `npm run test:e2e` |
| ESM library bundling (`'use client'`, `tokens.css`, `peerDependencies`) | `vite.lib.config.ts`, `tsconfig.lib.json`, `package.json` | `npm run build` |
