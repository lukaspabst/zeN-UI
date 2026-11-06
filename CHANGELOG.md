# Changelog

## 2026-11-12 00:41
- Clarify cookie-free Cloudflare Web Analytics disclosure in the showcase privacy modal

## 2026-11-06 15:53
- Add media transport and equalizer glyphs to `ZenIcon` (v1.2.2)

## 2026-10-27 16:29
- Replace remaining `lucide-react` usages with built-in `ZenIcon` SVGs and drop peer dependencies (v1.2.1)

## 2026-10-16 11:42
- Extract portfolio-specific 3D cosmos scene out of the published library bundle (v1.2.0)
- Separate showcase app code from `src/lib` build output

## 2026-10-02 14:20
- Add crimson-gold `LP.` favicon for the showcase site
- Decouple `zen-tokens.css` from Tailwind imports so plain CSS and Angular consumers work standalone

## 2026-09-17 15:08
- Decouple universal theme controller from the React runtime
- Move host framework packages to optional peer dependencies for zero runtime dependencies

## 2026-09-01 10:34
- Switch npm release workflow to OIDC trusted publishing
- Skip redundant browser package installs in CI Playwright runs

## 2026-08-13 14:32
- Split `App` and `ZenStorybookPlayground` into smaller section modules
- Fix mobile header layout and drawer actions on 320px-375px viewports
- Sync WebKit scrollbar colors with active dark and light themes

## 2026-07-24 16:15
- Add MIT license and footer legal modal
- Adjust light-mode contrast on the `ZenAIConstruct` stage

## 2026-07-07 11:28
- Display active package version in the workbench header and fix active nav state
- Publish initial GitHub Release tarball artifacts

## 2026-06-12 09:47
- Initial `@zen-ui-capri/system` architecture with 51 UI components, 40 vector icons, W3C custom elements, and 8 dark/light themes
