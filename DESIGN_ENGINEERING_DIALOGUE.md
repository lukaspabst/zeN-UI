# `zeN-UI` — Design × Engineering Studio Transcript

**Participants:**
- **Sora** — Principal Design Systems Designer (Typography, Chromatic Polarity, Optical Elevation, Tactile Motion)
- **Marcus** — Principal Frontend Systems Engineer (Strict TypeScript, WAI-ARIA 1.2, 60fps WebGL Bridge, Web Audio Scheduling)

---

## Round 1: Auditing `portfolio` (`C:\Users\Lukas\IdeaProjects\portfolio`)

### Sora's Initial Design Critique
1. **What to Preserve (The `zeN-UI` Signature):**
   - **Chromatic Polarity:** Warm Alabaster (`#F6F2E9`) and Solar Gold (`#F5B841`) over Obsidian Void (`#070709`), framed by warm candlelit hairlines (`rgba(255, 243, 209, 0.14)`).
   - **The Typography Quartet:** `Syne` (700/800 geometric display) paired inline with italic `Instrument Serif` (editorial warmth), `Plus Jakarta Sans` (UI workhorse), and `JetBrains Mono` (tabular telemetry).
   - **Spatial Telemetry HUD & Procedural Audio:** The orbital target reticle + live telemetry card and the zero-dependency Web Audio synthesizer.
2. **What Needed Improvement for Universal Reuse:**
   - Zero semantic CSS tokens in `portfolio/src/index.css` (40+ hardcoded arbitrary hex classes in `App.tsx`).
   - Locked to dark mode only (`color-scheme: dark`). Added **`data-theme="paper"` (Atelier Paper)** using warm cotton paper (`#F6F2E9`), deep carbon ink (`#121216`), and burnished bronze (`#B45309`) so accent contrast passes WCAG 2.2 AA (`>= 4.5:1`).

### Marcus's Initial Engineering Pushback
1. **WCAG 2.2 AA Under Dynamic WebGL Bloom:**
   - In `portfolio`, `9px` and `10px` labels in `#A69F91` over `0.55` opacity cards dropped below `4.5:1` contrast whenever the bright G2V yellow star (`#FFF3D1` with Bloom `0.85`) passed behind a card.
   - **Fix:** Enforced an `11px` (`0.6875rem`) floor (`--zen-text-2xs`), raised surface alpha to `0.88`–`0.95`, and lifted muted ink to `#B5AEA0` (`8.42:1` resting contrast; `5.64:1` worst-case bloom composite).
2. **GPU Fill-Rate Budget & Reduced Motion:**
   - Stacking `backdrop-blur-2xl` (`40px`) on 10+ cards over a 6-octave 3D FBM WebGL canvas wasted GPU fill-rate, and `ChromaticSculptureScene.tsx` ignored `prefers-reduced-motion: reduce`.
   - **Fix:** Capped optical blur at `16px` (`--zen-blur-glass: 16px`) with a `1px` top-edge specular catchlight (`inset 0 1px 0 0 rgba(255, 243, 209, 0.14)`), and froze N-body orbital integration (`signedTimeRate = 0`) when `prefers-reduced-motion: reduce` is active.
3. **Eliminating `document.elementFromPoint` in `useFrame` & CV-Coupled Selectors:**
   - Replaced `.closest('a, button, [role="button"], header, #exhibition, #career')` and per-frame `document.elementFromPoint` calls with a passive `pointermove` check against `[data-zen-occlude="true"]`.

---

## Round 2: Joint Sign-Off & Locked Component Contracts

| Domain | Portfolio Implementation | `zeN-UI` Universal Resolution |
| :--- | :--- | :--- |
| **Theme Engine** | Hardcoded Tailwind hexes (`bg-[#070709]`) | Standalone `zen-tokens.css` + `<ZenThemeProvider>` (`obsidian` & `paper`) |
| **Interactive Cards** | `onMouseEnter` immediately overwrote selected dossier | **5 Orthogonal States:** Resting, Hovered (`-2px`), `:focus-visible`, `:active` (`0.985x` spring), and Selected (`data-selected="true"`) |
| **Telemetry HUD** | Monolithic 9-ref closure inside `ChromaticSculptureScene.tsx` | `<ZenTelemetryHud bridgeRef={...} />` (60fps imperative fast-path) + `<ZenTelemetryInspector />` (keyboard roving `tabIndex` + ARIA live region) |
| **Dropdowns & Tabs** | Binary button toggle; manual filter buttons | `<ZenDropdown>` with `onMouseDown` selection commit (zero blur race) + `<ZenSegmentedControl>` & `<ZenTabs>` with roving `tabIndex` |
| **Web Audio Synth** | Inline `setInterval` + per-hit `AudioBuffer` allocation | `useZenAudioSynth()` with pre-allocated snare noise `AudioBuffer`, master `GainNode` smoothing, 3 harmonic presets, and `playMicroClick()` |
