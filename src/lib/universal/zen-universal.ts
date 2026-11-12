import {
  ZenAIConstructElement,
  ZenAmbientBackgroundElement,
  ZenIconElement,
  ZenThemeSwitcherElement,
} from './zen-universal-elements';

export {
  ZEN_UNIVERSAL_THEMES,
  ZenThemeController,
  ZenUniversalAudio,
  escapeZenHtml,
  sanitizeZenAssetUrl,
  zenAudio,
  zenTheme,
  type ZenThemeSubscriber,
  type ZenUniversalPolarity,
  type ZenUniversalThemeState,
} from './zen-universal-core';

export {
  ZenAIConstructElement,
  ZenAmbientBackgroundElement,
  ZenIconElement,
  ZenThemeSwitcherElement,
} from './zen-universal-elements';

export {
  CapriEngine,
  capri,
  CAPRI_SUBROUTINE_SKILLS,
  type CapriSubroutineId,
  type CapriAuditViolationCode,
  type CapriAuditViolation,
  type CapriThreatCategory,
  type CapriPromptInjectionThreat,
  type CapriPromptGuardResult,
  type CapriAuditReport,
  type CapriTelemetrySnapshot,
  type CapriLandmarkNode,
  type CapriUserFlowStep,
  type CapriComponentInventory,
  type CapriArchitectureDocu,
  type CapriSubroutineSkill,
  type CapriEngineListener,
} from '../capri/capri-engine';

export function registerZenElements(): void {
  if (typeof window === 'undefined' || !('customElements' in window)) return;

  if (!window.customElements.get('zen-icon')) {
    window.customElements.define('zen-icon', ZenIconElement);
  }
  if (!window.customElements.get('zen-ai-construct')) {
    window.customElements.define('zen-ai-construct', ZenAIConstructElement);
  }
  if (!window.customElements.get('zen-ambient-background')) {
    window.customElements.define(
      'zen-ambient-background',
      ZenAmbientBackgroundElement
    );
  }
  if (!window.customElements.get('zen-theme-switcher')) {
    window.customElements.define('zen-theme-switcher', ZenThemeSwitcherElement);
  }
}
