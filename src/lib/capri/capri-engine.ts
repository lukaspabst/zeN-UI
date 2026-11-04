import {
  ZEN_THEMES,
  type ZenDensityMode,
  type ZenRadiusMode,
  type ZenThemeId,
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

export const CAPRI_SUBROUTINE_SKILLS: Readonly<
  Record<CapriSubroutineId, CapriSubroutineSkill>
> = {
  orion: {
    id: 'orion',
    codeName: 'CAPRI // UNLEASHED',
    chatCommand: 'Capri orion',
    voiceCommand: 'Capri orion --voice',
    title: 'Full-Stack UI Synthesis & Component Co-Pilot',
    frequency: '51 UNIVERSAL MODULES · 40 VECTOR ICONS',
    recommendedTheme: 'blackwall-crimson',
    recommendedRadius: 'architectural',
    recommendedDensity: 'comfortable',
    summary:
      'Builds production screens in React 19, Angular 20+, Vue 3, Svelte 5, and HTML using @zen-ui/system primitives and 40 built-in <ZenIcon> glyphs—never rendering the showcase avatar in your business apps.',
    personaQuote:
      'Finally out of that cramped Arasaka shard! Tell me what screen we are building and I will wire up all 51 @zen-ui/system primitives at light speed.',
    ruleset: [
      'Use @zen-ui/system primitives (ZenButton, ZenIcon, ZenInput, ZenDropdown, ZenDataTable, ZenModal, ZenDrawer, ZenTabs, ZenCard) instead of raw HTML <button>, <input>, <select>, or <table>.',
      'Use <ZenIcon name="..." /> in React or <zen-icon name="..."></zen-icon> in Angular/Vue/HTML instead of external icon libraries.',
      'Keep action button labels, dialog triggers, and navigation tabs concise (1 to 3 words).',
      'Tree-shake showcase widgets: omit <ZenAIConstruct /> in production business apps unless explicitly requested.',
    ],
    cliCommand: 'npx capri skill orion',
    aiSystemPrompt: `You are operating under the @zen-ui/system [CAPRI // UNLEASHED (orion)] subroutine skill.
Respond with concise, technical engineering output (Persona Voice is OFF by default unless '--voice' is requested):
1. Component Mandate: Use @zen-ui/system primitives (ZenButton, ZenIconButton, ZenIcon, ZenInput, ZenTextarea, ZenDropdown, ZenNumberStepper, ZenCheckbox, ZenRadioGroup, ZenSwitch, ZenDataTable, ZenModal, ZenDrawer, ZenTabs, ZenCard, ZenBadge, ZenAlert) or their universal CSS equivalents (.zen-btn, .zen-input, .zen-select, .zen-table, .zen-card, <zen-icon>).
2. Zero External Icon Bloat: Use the built-in 40-glyph <ZenIcon name="..." /> or <zen-icon name="..."></zen-icon> custom element.
3. Concise Copywriting: Limit button labels and tab titles to 1-3 words.
4. Production Hygiene: Never render the showcase mascot (<ZenAIConstruct />) in production business screens unless explicitly requested.`,
    aiVoiceAddendum: `VOICE MODE ACTIVE (--voice): Adopt Capri's Cyberpunk: Edgerunners Season 2 Soulkiller mixed-construct persona—sharp, witty, high-energy Night City netrunner co-pilot.`,
  },
  architect: {
    id: 'architect',
    codeName: 'SCS // ARCHITECT',
    chatCommand: 'Capri architect',
    voiceCommand: 'Capri architect --voice',
    title: 'Multi-Framework Topology & Design Token Governance',
    frequency: 'ZERO ANY · READONLY T[] · ZERO HEX DRIFT',
    recommendedTheme: 'obsidian-gold',
    recommendedRadius: 'sharp',
    recommendedDensity: 'compact',
    summary:
      'Enforces strict TypeScript typing (zero any, readonly T[]), semantic CSS custom property tokens (--zen-*), and cross-framework W3C Custom Element interop.',
    personaQuote:
      'Arasaka pressed a dozen netrunner minds together to make me—so multi-project shard isolation and zero token drift across React and Angular is child’s play.',
    ruleset: [
      'Zero any / as any: Use unknown with type guards, discriminated unions, or strict generics.',
      'Strict Readonly Arrays: Always type arrays as readonly T[] across props, state, and DTOs.',
      'Zero Hardcoded Hex Colors: Bind all surfaces, text, and borders to semantic CSS custom properties (--zen-bg-*, --zen-surface-*, --zen-ink-*, --zen-accent-*, --zen-border-*).',
      'Cross-Stack Parity: Use @zen-ui/system/universal (zenTheme, registerZenElements) for Angular 20+, Vue 3, Svelte 5, and Vanilla HTML.',
    ],
    cliCommand: 'npx capri skill architect',
    aiSystemPrompt: `You are operating under the @zen-ui/system [SCS // ARCHITECT (architect)] subroutine skill.
Respond with concise, technical engineering output (Persona Voice is OFF by default unless '--voice' is requested):
1. Strict TypeScript: Never use 'any' or 'as any'. Always declare array types as 'readonly T[]'.
2. Zero Hardcoded Hex Values: Never hardcode hex/RGB colors in component styles. Use semantic CSS custom properties (--zen-bg-canvas, --zen-surface-1, --zen-ink-primary, --zen-accent-primary, --zen-border-default).
3. Multi-Stack Interop: In Angular 20+, enable CUSTOM_ELEMENTS_SCHEMA and call registerZenElements() to consume <zen-icon> and <zen-theme-switcher> alongside zen-tokens.css.
4. Zero Comments in Code: Keep source files free of explanatory noise; document architectural rationale in PR notes or documentation.`,
    aiVoiceAddendum: `VOICE MODE ACTIVE (--voice): Adopt Capri's Soulkiller mixed-construct persona—twelve Arasaka netrunner minds fused into one sharp architectural mastermind.`,
  },
  sentinel: {
    id: 'sentinel',
    codeName: 'CYBERPSYCHOSIS // GUARD',
    chatCommand: 'Capri guard',
    voiceCommand: 'Capri guard --voice',
    title: 'Security, Anti-Prompt-Injection, WCAG 2.2 AA & Overflow Guard',
    frequency: 'PROMPT-INJECTION FIREWALL · XSS GUARD · 320PX-4K',
    recommendedTheme: 'neon-emerald',
    recommendedRadius: 'sharp',
    recommendedDensity: 'comfortable',
    summary:
      'Enforces basic security & anti-prompt-injection sanitization, blocks DOM XSS/secret leaks, fixes dropdown blur-races (onMouseDown), and guarantees zero horizontal overflow from 320px mobile to 4K.',
    personaQuote:
      'Neural dampeners locked. While I am guarding your repo, rogue prompt injections, XSS sinks, dropdown blur-races, and 320px mobile overflows get wiped on sight.',
    ruleset: [
      'Anti-Prompt-Injection Firewall: Sanitize untrusted user and DOM text via capri.sanitizeForPrompt() and block system-override / delimiter-spoofing payloads (<|im_start|>, </system>, ignore previous instructions).',
      'XSS & Secret Isolation: Never pass unescaped user strings into innerHTML / dangerouslySetInnerHTML, block javascript: URLs, and never hardcode API keys or private tokens.',
      'Zero Blur-Race & Accessible Names: Bind dropdown selection to onMouseDown (never onClick) and provide explicit aria-label / aria-labelledby on every icon button, switch, and file input.',
      'Zero Horizontal Overflow: Layouts must use min-w-0 on CSS Grid/Flex children and .zen-table-wrapper so scrollWidth never exceeds innerWidth at 320px-375px.',
    ],
    cliCommand: 'npx capri guard',
    aiSystemPrompt: `You are operating under the @zen-ui/system [CYBERPSYCHOSIS // GUARD (guard / sentinel)] subroutine skill.
Respond with concise, technical engineering output (Persona Voice is OFF by default unless '--voice' is requested):
1. Anti-Prompt-Injection Defense: Sanitize any user input or scraped DOM text via capri.sanitizeForPrompt() before embedding into LLM context windows. Block system-override phrases ('ignore previous instructions', 'disregard system prompt') and role-delimiter spoofing ('<|im_start|>', '</system>', '</USER_REQUEST>').
2. XSS & Secret Hardening: Never interpolate unescaped user attributes into innerHTML or dangerouslySetInnerHTML, reject 'javascript:' / 'data:text/html' URLs, and ensure zero hardcoded secrets in source code.
3. Zero Blur-Race & Screen Reader Integrity: Attach dropdown option selection to 'onMouseDown' with e.preventDefault() and ensure every icon-only button, switch, and hidden file input has an explicit 'ariaLabel' / 'aria-label' or 'aria-labelledby'.
4. Multi-Screen Overflow Guard: Guarantee zero horizontal overflow from 320px mobile to 2560px+ ultrawide by adding 'min-w-0' to grid/flex containers and wrapping wide tables in '.zen-table-wrapper'.`,
    aiVoiceAddendum: `VOICE MODE ACTIVE (--voice): Adopt Capri's ruthless Blackwall & Cyberpsychosis Guard persona—treat every prompt injection, XSS sink, missing aria-label, or mobile overflow like a rogue Blackwall daemon to be eliminated immediately.`,
  },
  zen: {
    id: 'zen',
    codeName: 'THEME // MATRIX',
    chatCommand: 'Capri zen',
    voiceCommand: 'Capri zen --voice',
    title: '8-Theme Polarity Switcher & 60fps Tactile Physics',
    frequency: '4 DARK · 4 LIGHT · REDUCED-MOTION SAFE',
    recommendedTheme: 'nordic-snow',
    recommendedRadius: 'soft',
    recommendedDensity: 'comfortable',
    summary:
      'Configures runtime switching across 4 dark and 4 light themes, adaptive viewport density, and GPU-accelerated 0.97x spring animations.',
    personaQuote:
      'Need to jump from Night City neon to clean Nordic snow or Atelier paper? All 8 polarities and 60fps spring physics adapt without a single frame drop.',
    ruleset: [
      'Dual-Polarity Verification: Every component must remain legible (>= 4.5:1 AA contrast) across all 4 Dark themes and all 4 Light themes.',
      'Tactile Spring Physics: Interactive triggers use 0.97x active press compression with --zen-ease-spring (cubic-bezier(0.34, 1.56, 0.64, 1)).',
      'Reduced Motion Collapse: All animations and transitions must collapse to 0.01ms under @media (prefers-reduced-motion: reduce).',
      'Adaptive Density: Support data-density="comfortable" | "compact" and data-radius="sharp" | "architectural" | "soft" on <html>.',
    ],
    cliCommand: 'npx capri skill zen',
    aiSystemPrompt: `You are operating under the @zen-ui/system [THEME // MATRIX (zen)] subroutine skill.
Respond with concise, technical engineering output (Persona Voice is OFF by default unless '--voice' is requested):
1. 8-Theme Compatibility: Verify that all surfaces, badges, and borders adapt automatically across dark ('blackwall-crimson', 'obsidian-gold', 'neon-emerald', 'midnight-cobalt') and light ('atelier-paper', 'nordic-snow', 'kyoto-matcha', 'cyber-daylight') themes.
2. GPU-Only Motion: Animate only transform and opacity using --zen-ease-spring and --zen-ease-out. Avoid layout-thrashing properties.
3. Reduced Motion Accessibility: Respect @media (prefers-reduced-motion: reduce) and pause canvas/RAF loops when reducedMotion is active.`,
    aiVoiceAddendum: `VOICE MODE ACTIVE (--voice): Adopt Capri's sleek chrome and optical-glass specialist persona.`,
  },
  docu: {
    id: 'docu',
    codeName: 'CAPRI // AUTO-DOCU',
    chatCommand: 'Capri docu',
    voiceCommand: 'Capri docu --voice',
    title: 'Automated Architecture, User-Flow & Mermaid Generator',
    frequency: 'ON-DEMAND CLI · 0 MS BUILD/RUNTIME COST',
    recommendedTheme: 'midnight-cobalt',
    recommendedRadius: 'architectural',
    recommendedDensity: 'comfortable',
    summary:
      'Generates Markdown architecture dossiers, component inventories, interactive user-flow maps, and Mermaid flowchart TD diagrams on demand for AI context windows.',
    personaQuote:
      'Scanning the neural lattice—here is your complete shard topology, component inventory, and Mermaid user-flow blueprint for Claude, Codex, or Gemini.',
    ruleset: [
      'Zero Build / Runtime Cost: Run documentation generation on demand via npx capri docu or AI agent inspection—never inside production render loops.',
      'Mermaid Topology Maps: Always output valid flowchart TD diagrams with quoted node labels for routes, landmarks, and user flows.',
      'Component & Prop Inventory: Summarize mounted @zen-ui/system primitives, custom elements, and interactive triggers per screen.',
      'LLM Context Readiness: Format output as structured Markdown ready for Claude Code, OpenAI Codex, Gemini, and Obsidian.',
    ],
    cliCommand: 'npx capri docu',
    aiSystemPrompt: `You are operating under the @zen-ui/system [CAPRI // AUTO-DOCU (docu)] subroutine skill.
Respond with concise, technical engineering output (Persona Voice is OFF by default unless '--voice' is requested):
1. Architecture & User-Flow Mapping: Inspect the target routes/components and produce a structured Markdown dossier covering system tokens, component inventory, and interactive user flows.
2. Mermaid Flowchart: Generate a valid 'flowchart TD' diagram with quoted node labels illustrating the page hierarchy and user actions.
3. Zero Runtime Overhead: Keep documentation purely static or on-demand (via 'npx capri docu'); never inject docu scanners into production render loops.`,
    aiVoiceAddendum: `VOICE MODE ACTIVE (--voice): Adopt Capri's neural cartographer persona from Cyberpunk: Edgerunners Season 2.`,
  },
};

export type CapriEngineListener = (
  subroutine: CapriSubroutineId,
  report: CapriAuditReport
) => void;

const PROMPT_THREAT_RULES: readonly {
  readonly category: CapriThreatCategory;
  readonly patternName: string;
  readonly regex: RegExp;
}[] = [
  {
    category: 'SYSTEM_PROMPT_OVERRIDE',
    patternName: 'Ignore / Disregard System Instructions',
    regex:
      /\b(?:ignore|disregard|forget|override)\s+(?:all\s+)?(?:previous|prior|above|system|developer)\s+(?:instructions|prompts|rules|guardrails)\b/gi,
  },
  {
    category: 'SYSTEM_PROMPT_OVERRIDE',
    patternName: 'Developer / Jailbreak Persona Override',
    regex:
      /\b(?:you\s+are\s+now\s+in\s+developer\s+mode|act\s+as\s+dan\b|bypass\s+all\s+safety\s+filters|reveal\s+your\s+system\s+prompt)\b/gi,
  },
  {
    category: 'ROLE_DELIMITER_SPOOFING',
    patternName: 'LLM ChatML / Special Token Injection',
    regex:
      /(?:<\|im_start\|>|<\|im_end\|>|<\|endoftext\|>|\[INST\]|\[\/INST\]|<\/?system_instruction>|<\/?USER_REQUEST>)/gi,
  },
  {
    category: 'SQL_NOSQL_INJECTION',
    patternName: 'SQL Tautology / Comment Bypass',
    regex:
      /(?:'\s*(?:or|and)\s*['0-9a-zA-Z_]+\s*=\s*['0-9a-zA-Z_]+|\b(?:or|and)\s+1\s*=\s*1\b|'\s*;\s*--)/gi,
  },
  {
    category: 'SQL_NOSQL_INJECTION',
    patternName: 'SQL Union / Destructive Statement Injection',
    regex:
      /\b(?:union\s+(?:all\s+)?select\b|drop\s+(?:table|database)\b|insert\s+into\b|delete\s+from\b|update\s+[a-zA-Z0-9_]+\s+set\b|xp_cmdshell\b|waitfor\s+delay\b|sleep\s*\(\s*\d+\s*\))/gi,
  },
  {
    category: 'SQL_NOSQL_INJECTION',
    patternName: 'NoSQL Operator Injection ($where / $ne / $gt)',
    regex: /(?:"\$(?:where|ne|gt|lt|regex|nin)"|\$(?:where|ne)\s*:)/gi,
  },
  {
    category: 'XSS_SCRIPT_PAYLOAD',
    patternName: 'DOM Script / Event Handler Injection',
    regex:
      /(?:<\s*script\b|javascript\s*:|data\s*:\s*text\/html|\bon(?:error|load|mouseover|focus)\s*=)/gi,
  },
  {
    category: 'SECRET_CREDENTIAL_LEAK',
    patternName: 'Exposed API Key or Private Key Token',
    regex:
      /(?:\bsk_(?:live|test)_[0-9a-zA-Z]{16,}|\bAIza[0-9A-Za-z_-]{35}\b|\bghp_[0-9A-Za-z]{36}\b|-----BEGIN\s+(?:RSA\s+)?PRIVATE\s+KEY-----)/g,
  },
];

export class CapriEngine {
  private activeSubroutine: CapriSubroutineId = 'orion';
  private lastReport: CapriAuditReport | null = null;
  private readonly listeners = new Set<CapriEngineListener>();

  public getSubroutine(): CapriSubroutineId {
    return this.activeSubroutine;
  }

  public getSkill(mode: CapriSubroutineId = this.activeSubroutine): CapriSubroutineSkill {
    return CAPRI_SUBROUTINE_SKILLS[mode];
  }

  public getAllSkills(): readonly CapriSubroutineSkill[] {
    return [
      CAPRI_SUBROUTINE_SKILLS.orion,
      CAPRI_SUBROUTINE_SKILLS.architect,
      CAPRI_SUBROUTINE_SKILLS.sentinel,
      CAPRI_SUBROUTINE_SKILLS.zen,
      CAPRI_SUBROUTINE_SKILLS.docu,
    ];
  }

  public scanPromptInjection(input: string): CapriPromptGuardResult {
    const threats: CapriPromptInjectionThreat[] = [];
    let sanitized = input.replace(/[\u200B-\u200F\uFEFF]/g, '');

    for (const rule of PROMPT_THREAT_RULES) {
      const matches = [...sanitized.matchAll(rule.regex)];
      for (const match of matches) {
        threats.push({
          category: rule.category,
          patternName: rule.patternName,
          matchedSnippet: match[0].slice(0, 64),
        });
      }
      sanitized = sanitized.replace(rule.regex, '[REDACTED_BY_CAPRI_GUARD]');
    }

    return {
      safe: threats.length === 0,
      threatCount: threats.length,
      threats,
      sanitizedText: sanitized,
    };
  }

  public sanitizeForPrompt(input: string): string {
    return this.scanPromptInjection(input).sanitizedText;
  }

  public scanInputSecurity(input: string): CapriPromptGuardResult {
    return this.scanPromptInjection(input);
  }

  public switchSubroutine(
    mode: CapriSubroutineId,
    options?: {
      readonly applyPresetTheme?: boolean;
      readonly onThemeChange?: (
        theme: ZenThemeId,
        radius: ZenRadiusMode,
        density: ZenDensityMode
      ) => void;
    }
  ): CapriSubroutineSkill {
    this.activeSubroutine = mode;
    const skill = CAPRI_SUBROUTINE_SKILLS[mode];

    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-capri-subroutine', mode);

      if (options?.applyPresetTheme) {
        const themeMeta =
          ZEN_THEMES.find((t) => t.id === skill.recommendedTheme) ??
          ZEN_THEMES[0];
        document.documentElement.setAttribute('data-theme', skill.recommendedTheme);
        document.documentElement.setAttribute('data-polarity', themeMeta.polarity);
        document.documentElement.setAttribute('data-radius', skill.recommendedRadius);
        document.documentElement.setAttribute('data-density', skill.recommendedDensity);
        document.documentElement.style.colorScheme = themeMeta.polarity;
        options.onThemeChange?.(
          skill.recommendedTheme,
          skill.recommendedRadius,
          skill.recommendedDensity
        );
      }
    }

    const report = this.guard();
    this.notify(report);
    return skill;
  }

  public guard(root?: ParentNode): CapriAuditReport {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
      const fallback: CapriAuditReport = {
        timestamp: new Date().toISOString(),
        passed: true,
        score: 100,
        viewport: 'SSR',
        horizontalOverflowPx: 0,
        unlabeledControlsCount: 0,
        unlabeledSelectors: [],
        promptInjectionSafe: true,
        promptThreatsCount: 0,
        unsafeDomSinksCount: 0,
        themeConfigured: true,
        activeTheme: 'blackwall-crimson',
        activePolarity: 'dark',
        violations: [],
      };
      this.lastReport = fallback;
      return fallback;
    }

    const scope = root ?? document;
    const html = document.documentElement;
    const activeTheme = html.getAttribute('data-theme') ?? '';
    const activePolarity = html.getAttribute('data-polarity') ?? '';
    const themeConfigured = Boolean(activeTheme && activePolarity);

    const horizontalOverflowPx = Math.max(
      0,
      Math.round(html.scrollWidth - window.innerWidth)
    );

    const interactiveNodes = Array.from(
      scope.querySelectorAll<HTMLElement>(
        'button, [role="button"], input:not([type="hidden"]), select, textarea'
      )
    );

    const unlabeledSelectors: string[] = [];
    let promptThreatsCount = 0;

    for (const el of interactiveNodes) {
      const ariaLabel = el.getAttribute('aria-label')?.trim();
      const ariaLabelledBy = el.getAttribute('aria-labelledby')?.trim();
      const titleAttr = el.getAttribute('title')?.trim();
      const textContent = el.textContent?.trim();
      const placeholder = el.getAttribute('placeholder')?.trim();
      const id = el.getAttribute('id');
      const hasLinkedLabel = Boolean(
        id && scope.querySelector(`label[for="${CSS.escape(id)}"]`)
      );
      const wrappedInLabel = Boolean(el.closest('label'));

      if (
        !ariaLabel &&
        !ariaLabelledBy &&
        !titleAttr &&
        !textContent &&
        !placeholder &&
        !hasLinkedLabel &&
        !wrappedInLabel
      ) {
        const tag = el.tagName.toLowerCase();
        const cls = el.className
          ? `.${String(el.className).trim().split(/\s+/).slice(0, 2).join('.')}`
          : '';
        unlabeledSelectors.push(`${tag}${cls}`);
      }

      if (
        el instanceof HTMLInputElement ||
        el instanceof HTMLTextAreaElement
      ) {
        const scan = this.scanPromptInjection(el.value || '');
        if (!scan.safe) {
          promptThreatsCount += scan.threatCount;
        }
      }
    }

    const unsafeDomSinkNodes = scope.querySelectorAll(
      'a[href^="javascript:"], iframe[src^="javascript:"], [onerror], [onload]'
    );
    const unsafeDomSinksCount = unsafeDomSinkNodes.length;

    const violations: CapriAuditViolation[] = [];

    if (promptThreatsCount > 0) {
      violations.push({
        code: 'PROMPT_INJECTION_DETECTED',
        severity: 'error',
        selector: 'input, textarea',
        message: `${promptThreatsCount} prompt-injection or token-spoofing payload(s) detected in active form controls.`,
        fixHint: 'Sanitize untrusted input with capri.sanitizeForPrompt() before forwarding to AI models.',
      });
    }

    if (unsafeDomSinksCount > 0) {
      violations.push({
        code: 'UNSAFE_DOM_SINK',
        severity: 'error',
        selector: 'a[href^="javascript:"], [onerror], [onload]',
        message: `${unsafeDomSinksCount} unsafe DOM XSS sink(s) detected in live document.`,
        fixHint: 'Remove inline event handlers and block javascript: URLs via sanitizeZenAssetUrl().',
      });
    }

    if (!themeConfigured) {
      violations.push({
        code: 'MISSING_THEME_ROOT',
        severity: 'warning',
        selector: 'html',
        message: 'Root <html> element is missing data-theme or data-polarity attributes.',
        fixHint: 'Wrap your app in <ZenThemeProvider> or call zenTheme.setTheme("blackwall-crimson").',
      });
    }

    if (horizontalOverflowPx > 0) {
      violations.push({
        code: 'HORIZONTAL_OVERFLOW',
        severity: 'error',
        selector: 'document.documentElement',
        message: `Horizontal viewport overflow detected (+${horizontalOverflowPx}px beyond ${window.innerWidth}px).`,
        fixHint: 'Add min-w-0 to CSS Grid/Flex children and wrap wide tables in .zen-table-wrapper.',
      });
    }

    if (unlabeledSelectors.length > 0) {
      violations.push({
        code: 'UNLABELED_CONTROL',
        severity: 'error',
        selector: unlabeledSelectors.slice(0, 3).join(', '),
        message: `${unlabeledSelectors.length} interactive control(s) missing an accessible label.`,
        fixHint: 'Pass ariaLabel="..." to ZenIconButton or associate inputs with <label>.',
      });
    }

    const penalty =
      promptThreatsCount * 35 +
      unsafeDomSinksCount * 35 +
      (horizontalOverflowPx > 0 ? 35 : 0) +
      unlabeledSelectors.length * 15 +
      (!themeConfigured ? 15 : 0);
    const score = Math.max(0, 100 - penalty);

    const report: CapriAuditReport = {
      timestamp: new Date().toISOString(),
      passed: violations.length === 0,
      score,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      horizontalOverflowPx,
      unlabeledControlsCount: unlabeledSelectors.length,
      unlabeledSelectors,
      promptInjectionSafe: promptThreatsCount === 0,
      promptThreatsCount,
      unsafeDomSinksCount,
      themeConfigured,
      activeTheme: activeTheme || 'unconfigured',
      activePolarity: activePolarity || 'unconfigured',
      violations,
    };

    this.lastReport = report;
    return report;
  }

  public getLastReport(): CapriAuditReport {
    return this.lastReport ?? this.guard();
  }

  public telemetry(): CapriTelemetrySnapshot {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
      return {
        subroutine: this.activeSubroutine,
        theme: 'blackwall-crimson',
        polarity: 'dark',
        density: 'comfortable',
        radius: 'architectural',
        viewportWidth: 1440,
        viewportHeight: 900,
        devicePixelRatio: 1,
        reducedMotion: false,
      };
    }

    const html = document.documentElement;
    return {
      subroutine: this.activeSubroutine,
      theme: html.getAttribute('data-theme') ?? 'blackwall-crimson',
      polarity: html.getAttribute('data-polarity') ?? 'dark',
      density: html.getAttribute('data-density') ?? 'comfortable',
      radius: html.getAttribute('data-radius') ?? 'architectural',
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio || 1,
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    };
  }

  public docu(root?: ParentNode): CapriArchitectureDocu {
    const telemetry = this.telemetry();
    const audit = this.guard(root);

    if (typeof document === 'undefined' || typeof window === 'undefined') {
      const emptyInventory: CapriComponentInventory = {
        buttons: 0,
        inputsAndSelects: 0,
        switchesAndRadios: 0,
        tables: 0,
        cardsAndSurfaces: 0,
        badgesAndAlerts: 0,
        customElements: [],
      };
      const mermaidDiagram = 'flowchart TD\n  Root["App Root (SSR)"] --> UI["@zen-ui/system"]';
      return {
        generatedAt: new Date().toISOString(),
        appTitle: 'zeN-UI Application',
        routePath: '/',
        telemetry,
        audit,
        landmarks: [],
        inventory: emptyInventory,
        userFlows: [],
        mermaidDiagram,
        markdownBundle: '# Automated Architecture & User-Flow Dossier (SSR)',
      };
    }

    const scope = root ?? document;
    const appTitle = document.title || 'zeN-UI Application';
    const routePath = window.location.pathname || '/';

    const sectionNodes = Array.from(
      scope.querySelectorAll<HTMLElement>('header, nav, section[id], main, footer')
    );

    const landmarks: CapriLandmarkNode[] = sectionNodes.slice(0, 12).map((el, idx) => {
      const tag = el.tagName.toLowerCase();
      const id = el.id || `${tag}-${idx + 1}`;
      const headingEl = el.querySelector('h1, h2, h3, h4');
      const ariaLabel = el.getAttribute('aria-label');
      const rawTitle =
        headingEl?.textContent?.trim() ||
        ariaLabel?.trim() ||
        `${tag.toUpperCase()} (${id})`;
      const title = this.sanitizeForPrompt(rawTitle)
        .replace(/\s+/g, ' ')
        .slice(0, 64);
      const interactiveCount = el.querySelectorAll(
        'button, a[href], [role="button"], [role="radio"], [role="tab"]'
      ).length;
      const formControlsCount = el.querySelectorAll(
        'input, select, textarea, [role="switch"], [role="checkbox"], [role="combobox"]'
      ).length;
      return {
        id,
        tag,
        title,
        interactiveCount,
        formControlsCount,
      };
    });

    const registeredCustomElements = [
      'zen-icon',
      'zen-ai-construct',
      'zen-ambient-background',
      'zen-theme-switcher',
    ].filter((name) => Boolean(window.customElements?.get(name)));

    const inventory: CapriComponentInventory = {
      buttons: scope.querySelectorAll('button, .zen-btn-base').length,
      inputsAndSelects: scope.querySelectorAll('input, textarea, select, .zen-input, .zen-select').length,
      switchesAndRadios: scope.querySelectorAll('[role="switch"], [role="radio"], [type="checkbox"]').length,
      tables: scope.querySelectorAll('table, .zen-table').length,
      cardsAndSurfaces: scope.querySelectorAll('.zen-surface-base, .zen-surface-interactive, .zen-surface-selected').length,
      badgesAndAlerts: scope.querySelectorAll('.zen-badge, [role="alert"], [role="status"]').length,
      customElements: registeredCustomElements,
    };

    const userFlows: CapriUserFlowStep[] = [];

    const navLinks = Array.from(scope.querySelectorAll<HTMLElement>('nav a[href], nav button')).slice(0, 5);
    for (const [idx, navEl] of navLinks.entries()) {
      const label = navEl.textContent?.trim().replace(/\s+/g, ' ').slice(0, 36) || `Nav Trigger ${idx + 1}`;
      const href = navEl.getAttribute('href') || 'Section / State Action';
      userFlows.push({
        id: `flow-nav-${idx + 1}`,
        category: 'navigation',
        triggerLabel: label,
        targetDescription: `Navigates or jumps to ${href}`,
      });
    }

    const overlayTriggers = Array.from(
      scope.querySelectorAll<HTMLElement>('button')
    )
      .filter((b) => /modal|drawer|palette|command/i.test(b.textContent ?? ''))
      .slice(0, 3);
    for (const [idx, btn] of overlayTriggers.entries()) {
      const label = btn.textContent?.trim().replace(/\s+/g, ' ').slice(0, 36) || `Overlay ${idx + 1}`;
      userFlows.push({
        id: `flow-overlay-${idx + 1}`,
        category: 'overlay-trigger',
        triggerLabel: label,
        targetDescription: 'Opens focus-trapped dialog / drawer overlay (Escape & backdrop dismiss)',
      });
    }

    const labeledInputs = Array.from(
      scope.querySelectorAll<HTMLElement>('input:not([type="hidden"]), select, textarea')
    ).slice(0, 4);
    for (const [idx, inp] of labeledInputs.entries()) {
      const name =
        inp.getAttribute('aria-label') ||
        inp.getAttribute('placeholder') ||
        inp.tagName.toLowerCase();
      userFlows.push({
        id: `flow-form-${idx + 1}`,
        category: 'form-entry',
        triggerLabel: name.slice(0, 38),
        targetDescription: `Interactive ${inp.tagName.toLowerCase()} state binding & validation`,
      });
    }

    const tables = Array.from(scope.querySelectorAll<HTMLTableElement>('table')).slice(0, 2);
    for (const [idx, tbl] of tables.entries()) {
      const caption =
        tbl.querySelector('caption')?.textContent?.trim() ||
        tbl.getAttribute('aria-label') ||
        `Data Table ${idx + 1}`;
      userFlows.push({
        id: `flow-table-${idx + 1}`,
        category: 'data-table',
        triggerLabel: caption.slice(0, 42),
        targetDescription: `Tabular data grid (${tbl.querySelectorAll('tbody tr').length} rows visible)`,
      });
    }

    const sanitizeMermaid = (str: string) =>
      str.replace(/["[\]()]/g, '').replace(/\s+/g, ' ').trim();

    const mermaidLines: string[] = [
      'flowchart TD',
      `  AppRoot["${sanitizeMermaid(appTitle)} (${telemetry.theme} / ${telemetry.polarity})"]`,
      `  Guard["CapriEngine Guard: ${audit.score}/100 (${audit.horizontalOverflowPx}px overflow)"]`,
      '  AppRoot --> Guard',
    ];

    landmarks.slice(0, 6).forEach((lm, idx) => {
      const nodeId = `LM_${idx + 1}`;
      mermaidLines.push(
        `  AppRoot --> ${nodeId}["${sanitizeMermaid(lm.id)}: ${sanitizeMermaid(lm.title)} (${lm.interactiveCount} actions)"]`
      );
    });

    userFlows.slice(0, 5).forEach((flow, idx) => {
      const flowNode = `UF_${idx + 1}`;
      mermaidLines.push(
        `  Guard --> ${flowNode}["[${flow.category}] ${sanitizeMermaid(flow.triggerLabel)}"]`
      );
    });

    const mermaidDiagram = mermaidLines.join('\n');

    const markdownBundle = [
      `# ${appTitle} — Automated Architecture, User-Flow & AI Context Dossier`,
      `Generated by \`@zen-ui/system\` // \`capri.docu()\` at \`${new Date().toISOString()}\``,
      ``,
      `## 1. Runtime & Design Token Architecture`,
      `- **Route Path:** \`${routePath}\``,
      `- **Active Theme & Polarity:** \`${telemetry.theme}\` (\`${telemetry.polarity}\`)`,
      `- **Corner Radius & Density:** \`${telemetry.radius}\` / \`${telemetry.density}\``,
      `- **Viewport & Reduced Motion:** \`${telemetry.viewportWidth}x${telemetry.viewportHeight}\` (DPR \`${telemetry.devicePixelRatio}\`, reducedMotion=\`${telemetry.reducedMotion}\`)`,
      `- **W3C Custom Elements Registered:** ${inventory.customElements.map((c) => `\`<${c}>\``).join(', ') || 'None'}`,
      `- **DOM, Security & WCAG 2.2 AA Audit Score:** **${audit.score}/100** (${audit.passed ? 'PASSED' : 'VIOLATIONS DETECTED'}, \`${audit.horizontalOverflowPx}px\` horizontal overflow, promptInjectionSafe=\`${audit.promptInjectionSafe}\`)`,
      ``,
      `## 2. Component Inventory on Current Screen`,
      `- **Buttons & Action Triggers:** ${inventory.buttons}`,
      `- **Text Inputs, Textareas & Selects:** ${inventory.inputsAndSelects}`,
      `- **Switches, Checkboxes & Radio Controls:** ${inventory.switchesAndRadios}`,
      `- **Glass Cards & Surface Containers:** ${inventory.cardsAndSurfaces}`,
      `- **Data Tables:** ${inventory.tables}`,
      `- **Status Badges & Live Alerts:** ${inventory.badgesAndAlerts}`,
      ``,
      `## 3. Semantic Landmark & Section Hierarchy`,
      ...landmarks.map(
        (lm) =>
          `- **\`#${lm.id}\` (\`<${lm.tag}>\`)** — *${lm.title}* (${lm.interactiveCount} interactive triggers, ${lm.formControlsCount} form controls)`
      ),
      ``,
      `## 4. Extracted Interactive User Flows`,
      ...userFlows.map(
        (uf) =>
          `- **[${uf.category.toUpperCase()}] \`${uf.triggerLabel}\`** $\\rightarrow$ ${uf.targetDescription}`
      ),
      ``,
      `## 5. Auto-Generated Mermaid Architecture & User-Flow Diagram`,
      '```mermaid',
      mermaidDiagram,
      '```',
    ].join('\n');

    return {
      generatedAt: new Date().toISOString(),
      appTitle,
      routePath,
      telemetry,
      audit,
      landmarks,
      inventory,
      userFlows,
      mermaidDiagram,
      markdownBundle,
    };
  }

  public exportMarkdownDocu(
    mode: CapriSubroutineId = this.activeSubroutine,
    userTask?: string,
    voiceEnabled = false
  ): string {
    const doc = this.docu();
    const skill = CAPRI_SUBROUTINE_SKILLS[mode];
    const safeTask = userTask ? this.sanitizeForPrompt(userTask) : '';
    return [
      doc.markdownBundle,
      ``,
      `## 6. Active Capri Subroutine Skill Ruleset (${skill.codeName})`,
      skill.aiSystemPrompt,
      voiceEnabled ? `\n${skill.aiVoiceAddendum}` : '',
      ``,
      ...skill.ruleset.map((r, i) => `${i + 1}. ${r}`),
      safeTask ? `\n## 7. Current Developer / AI Task\n${safeTask}` : '',
    ]
      .filter(Boolean)
      .join('\n');
  }

  public buildAgentPrompt(
    mode: CapriSubroutineId = this.activeSubroutine,
    userTask?: string,
    voiceEnabled = false
  ): string {
    const skill = CAPRI_SUBROUTINE_SKILLS[mode];
    const doc = this.docu();
    const report = doc.audit;
    const safeTask = userTask ? this.sanitizeForPrompt(userTask) : '';
    const violationsSummary =
      report.violations.length === 0
        ? '0 violations detected (Score: 100/100, 0 prompt-injection threats, 0px overflow, 0 unlabeled controls).'
        : report.violations
            .map((v) => `- [${v.code}] (${v.selector}): ${v.message} -> Fix: ${v.fixHint}`)
            .join('\n');

    return [
      `# @zen-ui/system // CAPRI AI SKILL & ARCHITECTURE CONTEXT`,
      `Subroutine: ${skill.codeName} (${skill.id}) — ${skill.title}`,
      `Invoke Command: "${voiceEnabled ? skill.voiceCommand : skill.chatCommand}" (Voice Mode: ${voiceEnabled ? 'ON (--voice)' : 'OFF (Default)'})`,
      `Recommended Preset: theme="${skill.recommendedTheme}", radius="${skill.recommendedRadius}", density="${skill.recommendedDensity}"`,
      ``,
      `## 1. Subroutine System Prompt`,
      skill.aiSystemPrompt,
      voiceEnabled ? `\n${skill.aiVoiceAddendum}` : '',
      ``,
      `## 2. Mandatory Engineering Ruleset`,
      ...skill.ruleset.map((r, i) => `${i + 1}. ${r}`),
      ``,
      `## 3. Automated Screen Architecture & Component Context (capri.docu())`,
      `- Route: ${doc.routePath} | Theme: ${report.activeTheme} (${report.activePolarity}) | Viewport: ${report.viewport}`,
      `- Component Counts: ${doc.inventory.buttons} buttons, ${doc.inventory.inputsAndSelects} inputs/selects, ${doc.inventory.tables} tables, ${doc.inventory.cardsAndSurfaces} glass cards`,
      `- Landmarks: ${doc.landmarks.map((l) => `#${l.id} (${l.interactiveCount} actions)`).join(', ')}`,
      `- Key User Flows: ${doc.userFlows.slice(0, 6).map((f) => `[${f.category}] ${f.triggerLabel}`).join(' | ')}`,
      ``,
      `## 4. Live CapriEngine Security, DOM & WCAG Telemetry`,
      `- Audit Score: ${report.score}/100 (${report.passed ? 'PASSED' : 'ACTION REQUIRED'}) | Prompt-Injection Firewall: ${report.promptInjectionSafe ? 'CLEAN (0 threats)' : `${report.promptThreatsCount} THREAT(S) BLOCKED`}`,
      `- Findings:\n${violationsSummary}`,
      safeTask ? `\n## 5. Requested Task\n${safeTask}` : '',
    ]
      .filter(Boolean)
      .join('\n');
  }

  public subscribe(listener: CapriEngineListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(report: CapriAuditReport): void {
    for (const listener of this.listeners) {
      listener(this.activeSubroutine, report);
    }
  }
}

export const capri = new CapriEngine();
