import {
  ZEN_THEMES,
  type ZenDensityMode,
  type ZenRadiusMode,
  type ZenThemeId,
} from '../theme/zen-theme-core';
import { CAPRI_SUBROUTINE_SKILLS, PROMPT_THREAT_RULES } from './capri-skills';
import type {
  CapriArchitectureDocu,
  CapriAuditReport,
  CapriAuditViolation,
  CapriComponentInventory,
  CapriEngineListener,
  CapriLandmarkNode,
  CapriPromptGuardResult,
  CapriPromptInjectionThreat,
  CapriSubroutineId,
  CapriSubroutineSkill,
  CapriTelemetrySnapshot,
  CapriUserFlowStep,
} from './capri-types';

export { CAPRI_SUBROUTINE_SKILLS } from './capri-skills';
export type {
  CapriSubroutineId,
  CapriAuditViolationCode,
  CapriAuditViolation,
  CapriThreatCategory,
  CapriPromptInjectionThreat,
  CapriPromptGuardResult,
  CapriAuditReport,
  CapriTelemetrySnapshot,
  CapriLandmarkNode,
  CapriUserFlowStep,
  CapriComponentInventory,
  CapriArchitectureDocu,
  CapriSubroutineSkill,
  CapriEngineListener,
} from './capri-types';

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
      const mermaidDiagram = 'flowchart TD\n  Root["App Root (SSR)"] --> UI["@zen-ui-capri/system"]';
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
      `Generated by \`@zen-ui-capri/system\` // \`capri.docu()\` at \`${new Date().toISOString()}\``,
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
      `# @zen-ui-capri/system // CAPRI AI SKILL & ARCHITECTURE CONTEXT`,
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
