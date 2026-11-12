import type {
  ZenDensityMode,
  ZenRadiusMode,
  ZenThemeId,
} from '../theme/zen-theme-core';

export type CapriSubroutineId =
  | 'orion'
  | 'architect'
  | 'sentinel'
  | 'zen'
  | 'docu';

export type CapriAuditViolationCode =
  | 'PROMPT_INJECTION_DETECTED'
  | 'UNSAFE_DOM_SINK'
  | 'HORIZONTAL_OVERFLOW'
  | 'UNLABELED_CONTROL'
  | 'MISSING_THEME_ROOT';

export interface CapriAuditViolation {
  readonly code: CapriAuditViolationCode;
  readonly severity: 'warning' | 'error';
  readonly selector: string;
  readonly message: string;
  readonly fixHint: string;
}

export type CapriThreatCategory =
  | 'SYSTEM_PROMPT_OVERRIDE'
  | 'ROLE_DELIMITER_SPOOFING'
  | 'SQL_NOSQL_INJECTION'
  | 'XSS_SCRIPT_PAYLOAD'
  | 'SECRET_CREDENTIAL_LEAK';

export interface CapriPromptInjectionThreat {
  readonly category: CapriThreatCategory;
  readonly patternName: string;
  readonly matchedSnippet: string;
}

export interface CapriPromptGuardResult {
  readonly safe: boolean;
  readonly threatCount: number;
  readonly threats: readonly CapriPromptInjectionThreat[];
  readonly sanitizedText: string;
}

export interface CapriAuditReport {
  readonly timestamp: string;
  readonly passed: boolean;
  readonly score: number;
  readonly viewport: string;
  readonly horizontalOverflowPx: number;
  readonly unlabeledControlsCount: number;
  readonly unlabeledSelectors: readonly string[];
  readonly promptInjectionSafe: boolean;
  readonly promptThreatsCount: number;
  readonly unsafeDomSinksCount: number;
  readonly themeConfigured: boolean;
  readonly activeTheme: string;
  readonly activePolarity: string;
  readonly violations: readonly CapriAuditViolation[];
}

export interface CapriTelemetrySnapshot {
  readonly subroutine: CapriSubroutineId;
  readonly theme: string;
  readonly polarity: string;
  readonly density: string;
  readonly radius: string;
  readonly viewportWidth: number;
  readonly viewportHeight: number;
  readonly devicePixelRatio: number;
  readonly reducedMotion: boolean;
}

export interface CapriLandmarkNode {
  readonly id: string;
  readonly tag: string;
  readonly title: string;
  readonly interactiveCount: number;
  readonly formControlsCount: number;
}

export interface CapriUserFlowStep {
  readonly id: string;
  readonly category:
    | 'navigation'
    | 'form-entry'
    | 'overlay-trigger'
    | 'data-table'
    | 'theme-control';
  readonly triggerLabel: string;
  readonly targetDescription: string;
}

export interface CapriComponentInventory {
  readonly buttons: number;
  readonly inputsAndSelects: number;
  readonly switchesAndRadios: number;
  readonly tables: number;
  readonly cardsAndSurfaces: number;
  readonly badgesAndAlerts: number;
  readonly customElements: readonly string[];
}

export interface CapriArchitectureDocu {
  readonly generatedAt: string;
  readonly appTitle: string;
  readonly routePath: string;
  readonly telemetry: CapriTelemetrySnapshot;
  readonly audit: CapriAuditReport;
  readonly landmarks: readonly CapriLandmarkNode[];
  readonly inventory: CapriComponentInventory;
  readonly userFlows: readonly CapriUserFlowStep[];
  readonly mermaidDiagram: string;
  readonly markdownBundle: string;
}

export interface CapriSubroutineSkill {
  readonly id: CapriSubroutineId;
  readonly codeName: string;
  readonly chatCommand: string;
  readonly voiceCommand: string;
  readonly title: string;
  readonly frequency: string;
  readonly recommendedTheme: ZenThemeId;
  readonly recommendedRadius: ZenRadiusMode;
  readonly recommendedDensity: ZenDensityMode;
  readonly summary: string;
  readonly personaQuote: string;
  readonly ruleset: readonly string[];
  readonly cliCommand: string;
  readonly aiSystemPrompt: string;
  readonly aiVoiceAddendum: string;
}

export type CapriEngineListener = (
  subroutine: CapriSubroutineId,
  report: CapriAuditReport
) => void;
