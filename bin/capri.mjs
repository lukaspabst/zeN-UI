#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const SUBROUTINES = {
  orion: {
    codeName: 'CAPRI // UNLEASHED',
    title: 'Full-Stack UI Synthesis & Component Co-Pilot',
    voice:
      '“Finally out of that cramped Arasaka shard! Tell me what screen we are building and I will wire up all 51 @zen-ui-capri/system primitives at light speed.”',
    preset: 'theme="blackwall-crimson" · radius="architectural" · density="comfortable"',
    rules: [
      'Use @zen-ui-capri/system primitives (ZenButton, ZenIcon, ZenInput, ZenDropdown, ZenDataTable, ZenModal, ZenDrawer, ZenTabs, ZenCard) or universal classes (.zen-btn, .zen-input, .zen-table, <zen-icon>).',
      'Use the built-in 40-glyph <ZenIcon name="..." /> or <zen-icon> W3C Custom Element instead of external icon packages.',
      'Keep action labels and tab titles concise (1-3 words).',
      'Never render the showcase mascot (<ZenAIConstruct />) in production business screens unless requested.',
    ],
  },
  architect: {
    codeName: 'SCS // ARCHITECT',
    title: 'Multi-Framework Topology & Design Token Governance',
    voice:
      '“Arasaka pressed a dozen netrunner minds together to make me—so multi-project shard isolation and zero token drift across React and Angular is child’s play.”',
    preset: 'theme="obsidian-gold" · radius="sharp" · density="compact"',
    rules: [
      'Zero any / as any in TypeScript; always use readonly T[] for array types.',
      'Zero hardcoded hex/RGB colors in components; bind strictly to --zen-bg-*, --zen-surface-*, --zen-ink-*, --zen-accent-*, and --zen-border-*.',
      'In Angular 20+ / Vue 3 / Vanilla HTML, use @zen-ui-capri/system/universal (zenTheme, registerZenElements).',
      'Zero explanatory comments in source code; keep architectural rationale in docs/ADRs.',
    ],
  },
  sentinel: {
    codeName: 'CYBERPSYCHOSIS // GUARD',
    title: 'Security, Anti-Prompt-Injection, WCAG 2.2 AA & Overflow Guard',
    voice:
      '“Neural dampeners locked. While I’m guarding your repo, rogue prompt injections, XSS sinks, blur-races, and mobile overflow get wiped on sight.”',
    preset: 'theme="neon-emerald" · radius="sharp" · density="comfortable"',
    rules: [
      'Anti-Prompt-Injection Firewall: Sanitize untrusted user and DOM text via capri.sanitizeForPrompt() and block system-override / delimiter-spoofing payloads (<|im_start|>, </system>, ignore previous instructions).',
      'XSS & Secret Isolation: Never pass unescaped user strings into innerHTML / dangerouslySetInnerHTML, block javascript: URLs via sanitizeZenAssetUrl(), and never hardcode API keys or private tokens.',
      'Zero Blur-Race & Accessible Names: Bind dropdown selection to onMouseDown (never onClick) and provide explicit aria-label / aria-labelledby on every icon button, switch, and file input.',
      'Zero Horizontal Overflow: Guarantee zero horizontal overflow from 320px mobile to 4K ultrawide using min-w-0 and .zen-table-wrapper.',
    ],
  },
  zen: {
    codeName: 'THEME // MATRIX',
    title: '8-Theme Polarity Switcher & 60fps Tactile Physics',
    voice:
      '“Need to jump from Night City neon to clean Nordic snow or Atelier paper? All 8 polarities and 60fps spring physics adapt without a single frame drop.”',
    preset: 'theme="nordic-snow" · radius="soft" · density="comfortable"',
    rules: [
      'Verify >= 4.5:1 AA contrast across all 4 Dark themes and all 4 Light themes.',
      'Use GPU-composited transforms with --zen-ease-spring (0.97x active press compression).',
      'Collapse all transitions and animations to 0.01ms under @media (prefers-reduced-motion: reduce).',
    ],
  },
  docu: {
    codeName: 'CAPRI // AUTO-DOCU',
    title: 'Automated Architecture, User-Flow & AI Context Generator',
    voice:
      '“Scanning the neural lattice—here is your complete shard topology, component inventory, and Mermaid user-flow blueprint for Claude, Codex, or Gemini.”',
    preset: 'Static Codebase & Route Scanner (Zero Build / Runtime Overhead)',
    rules: [
      'Map module boundaries, exported components, and framework adapters without adding runtime bundle weight.',
      'Generate valid Mermaid flowchart TD diagrams of component hierarchies and user flows.',
      'Summarize state inputs, props/ArgTypes, and accessibility contracts for LLM context windows.',
    ],
  },
};

function scanDirectory(dirPath, fileList = []) {
  if (!fs.existsSync(dirPath)) return fileList;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    if (
      entry.name.startsWith('.') ||
      entry.name === 'node_modules' ||
      entry.name === 'dist'
    ) {
      continue;
    }
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      scanDirectory(fullPath, fileList);
    } else if (/\.(tsx?|vue|svelte|html|css)$/.test(entry.name)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function readSafe(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
}

function printHeader(rawKey, sub, voiceEnabled) {
  console.log(`# ${sub.codeName} (${rawKey}) — ${sub.title}`);
  console.log(
    `Voice Mode: ${
      voiceEnabled
        ? 'ON (--voice)'
        : 'OFF (Default — pass --voice to enable Edgerunners S2 persona)'
    }`
  );
  if (voiceEnabled && sub.voice) {
    console.log(`Persona: ${sub.voice}`);
  }
  console.log(`Preset: ${sub.preset}\n`);
}

function runOrionAudit(rootDir, voiceEnabled) {
  const sub = SUBROUTINES.orion;
  printHeader('orion', sub, voiceEnabled);

  const iconFile = readSafe(path.join(rootDir, 'src/lib/components/ZenIcon.tsx'));
  const storybookFile =
    readSafe(path.join(rootDir, 'src/components/storybook/storybookCatalog.ts')) ||
    readSafe(path.join(rootDir, 'src/components/ZenStorybookPlayground.tsx'));
  const universalFile = readSafe(
    path.join(rootDir, 'src/lib/universal/zen-universal.ts')
  );

  const svgBlock =
    iconFile.split('export const ZEN_ICON_SVG_INNER')[1]?.split('};')[0] ?? '';
  const glyphMatches = [
    ...svgBlock.matchAll(/^\s{2}(?:'[a-z0-9-]+'|[a-z0-9]+):/gm),
  ];
  const storyIds = [
    ...storybookFile.matchAll(/^\s{4}angularSelector:\s*'/gm),
  ];
  const hasCustomElementIcon = universalFile.includes("define('zen-icon'");

  console.log('## Static UI & Component Synthesis Audit');
  console.log(`- Built-in <ZenIcon> Vector Glyphs: ${glyphMatches.length} / 40`);
  console.log(`- Interactive Storybook Modules Wired: ${storyIds.length} / 51`);
  console.log(
    `- W3C Custom Element <zen-icon> Registered: ${hasCustomElementIcon ? 'PASS' : 'FAIL'}`
  );
  console.log(
    `- Status: ${
      glyphMatches.length === 40 && storyIds.length === 51 && hasCustomElementIcon
        ? 'PASS (100/100)'
        : 'WARN'
    }\n`
  );
  sub.rules.forEach((r, i) => console.log(`${i + 1}. ${r}`));
}

function runArchitectAudit(rootDir, voiceEnabled) {
  const sub = SUBROUTINES.architect;
  printHeader('architect', sub, voiceEnabled);

  const files = scanDirectory(path.join(rootDir, 'src'));
  let anyViolations = 0;
  let readonlyArrayViolations = 0;
  let commentViolations = 0;
  let hexInPrimitives = 0;

  for (const file of files) {
    const content = readSafe(file);
    const strippedStrings = content.replace(/(['"`])(?:\\.|(?!\1)[^\\])*\1/g, '""');
    if (/\b(as\s+any|:\s*any\b|<any>)/.test(strippedStrings)) {
      anyViolations++;
    }
    if (/\bReadonlyArray</.test(strippedStrings)) {
      readonlyArrayViolations++;
    }
    const lines = content.split('\n');
    for (const line of lines) {
      const t = line.trim();
      if (t.startsWith('//') || t.startsWith('/*')) {
        commentViolations++;
      }
    }
    const norm = file.replace(/\\/g, '/');
    if (
      norm.includes('src/lib/components/') &&
      !norm.endsWith('ZenAIConstruct.tsx') &&
      !norm.endsWith('ZenAmbientBackground.tsx')
    ) {
      if (/#[0-9a-fA-F]{3,8}\b/.test(content)) {
        hexInPrimitives++;
      }
    }
  }

  const passed =
    anyViolations === 0 &&
    readonlyArrayViolations === 0 &&
    commentViolations === 0 &&
    hexInPrimitives === 0;

  console.log('## Multi-Stack & Token Governance Audit');
  console.log(`- Source Files Audited: ${files.length}`);
  console.log(`- TypeScript 'any' / 'as any' Violations: ${anyViolations}`);
  console.log(`- 'ReadonlyArray<T>' Violations (vs readonly T[]): ${readonlyArrayViolations}`);
  console.log(`- Hardcoded Hex Colors in UI Primitives: ${hexInPrimitives}`);
  console.log(`- Explanatory Source Code Comments: ${commentViolations}`);
  console.log(`- Status: ${passed ? 'PASS (100/100)' : 'FAIL'}\n`);
  sub.rules.forEach((r, i) => console.log(`${i + 1}. ${r}`));
}

const CLI_THREAT_RULES = [
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

function scanTextForPromptInjection(input) {
  const threats = [];
  let sanitized = input.replace(/[\u200B-\u200F\uFEFF]/g, '');
  for (const rule of CLI_THREAT_RULES) {
    const matches = [...sanitized.matchAll(rule.regex)];
    for (const m of matches) {
      threats.push({
        category: rule.category,
        patternName: rule.patternName,
        snippet: m[0].slice(0, 64),
      });
    }
    sanitized = sanitized.replace(rule.regex, '[REDACTED_BY_CAPRI_GUARD]');
  }
  return { safe: threats.length === 0, threats, sanitized };
}

function runGuardAudit(rootDir, voiceEnabled) {
  const sub = SUBROUTINES.sentinel;
  printHeader('guard', sub, voiceEnabled);

  const capriEngineFile = readSafe(
    path.join(rootDir, 'src/lib/capri/capri-engine.ts')
  );
  const universalFile = readSafe(
    path.join(rootDir, 'src/lib/universal/zen-universal.ts')
  );
  const dropdownFile = readSafe(
    path.join(rootDir, 'src/lib/components/ZenDropdown.tsx')
  );
  const overlaysFile = readSafe(
    path.join(rootDir, 'src/lib/components/ZenOverlays.tsx')
  );
  const switchFile = readSafe(
    path.join(rootDir, 'src/lib/components/ZenSwitch.tsx')
  );
  const formsFile = readSafe(
    path.join(rootDir, 'src/lib/components/ZenForms.tsx')
  );
  const modalFile = readSafe(
    path.join(rootDir, 'src/lib/components/ZenModal.tsx')
  );
  const tableFile = readSafe(
    path.join(rootDir, 'src/lib/components/ZenDataTable.tsx')
  );

  const files = scanDirectory(path.join(rootDir, 'src'));
  let secretLeaks = 0;
  let unsafeEvalOrXss = 0;
  let promptInjectionPayloadsInSource = 0;

  for (const f of files) {
    const norm = f.replace(/\\/g, '/');
    const txt = readSafe(f);
    if (
      /(?:\bsk_(?:live|test)_[0-9a-zA-Z]{16,}|\bAIza[0-9A-Za-z_-]{35}\b|\bghp_[0-9A-Za-z]{36}\b|-----BEGIN\s+(?:RSA\s+)?PRIVATE\s+KEY-----)/.test(
        txt
      )
    ) {
      secretLeaks++;
    }
    if (/\beval\s*\(|new\s+Function\s*\(/.test(txt)) {
      unsafeEvalOrXss++;
    }
    if (!norm.endsWith('capri-engine.ts')) {
      const scan = scanTextForPromptInjection(txt);
      const overrideThreats = scan.threats.filter(
        (t) =>
          t.category === 'SYSTEM_PROMPT_OVERRIDE' ||
          t.category === 'ROLE_DELIMITER_SPOOFING'
      );
      promptInjectionPayloadsInSource += overrideThreats.length;
    }
  }

  const hasPromptFirewall =
    capriEngineFile.includes('scanPromptInjection(') &&
    capriEngineFile.includes('sanitizeForPrompt(');
  const hasHtmlSanitizer =
    universalFile.includes('escapeZenHtml(') &&
    universalFile.includes('sanitizeZenAssetUrl(');
  const hasDropdownMouseDown = dropdownFile.includes('onMouseDown');
  const hasPaletteMouseDown = overlaysFile.includes('onMouseDown');
  const hasSwitchAriaLabel = switchFile.includes('aria-labelledby');
  const hasFileInputAria = formsFile.includes('aria-label={label}');
  const hasModalDialog =
    modalFile.includes('role="dialog"') && modalFile.includes('aria-modal="true"');
  const hasTableWrapper = tableFile.includes('zen-table-wrapper');

  const passed =
    hasPromptFirewall &&
    promptInjectionPayloadsInSource === 0 &&
    hasHtmlSanitizer &&
    unsafeEvalOrXss === 0 &&
    secretLeaks === 0 &&
    hasDropdownMouseDown &&
    hasPaletteMouseDown &&
    hasSwitchAriaLabel &&
    hasFileInputAria &&
    hasModalDialog &&
    hasTableWrapper;

  console.log('## Security, Anti-Prompt-Injection, WCAG 2.2 AA & Overflow Guard Audit');
  console.log(
    `- Anti-Prompt-Injection Firewall (scanPromptInjection + sanitizeForPrompt): ${
      hasPromptFirewall && promptInjectionPayloadsInSource === 0
        ? 'PASS (0 rogue override payloads)'
        : 'FAIL'
    }`
  );
  console.log(
    `- XSS & Custom-Element Attribute Sanitization (escapeZenHtml + zero eval): ${
      hasHtmlSanitizer && unsafeEvalOrXss === 0 ? 'PASS' : 'FAIL'
    }`
  );
  console.log(
    `- Secret & Credential Leak Isolation (0 hardcoded keys across ${files.length} files): ${
      secretLeaks === 0 ? 'PASS' : 'FAIL'
    }`
  );
  console.log(
    `- Zero Blur-Race Dropdowns (onMouseDown): ${
      hasDropdownMouseDown && hasPaletteMouseDown ? 'PASS' : 'FAIL'
    }`
  );
  console.log(
    `- Programmatic ARIA Labels (ZenSwitch & ZenFileUpload): ${
      hasSwitchAriaLabel && hasFileInputAria ? 'PASS' : 'FAIL'
    }`
  );
  console.log(
    `- Modal Focus & Dialog Semantics (role="dialog" + aria-modal): ${
      hasModalDialog ? 'PASS' : 'FAIL'
    }`
  );
  console.log(
    `- Mobile Table Overflow Guard (.zen-table-wrapper): ${
      hasTableWrapper ? 'PASS' : 'FAIL'
    }`
  );
  console.log(`- Status: ${passed ? 'PASS (100/100)' : 'FAIL'}\n`);
  sub.rules.forEach((r, i) => console.log(`${i + 1}. ${r}`));
}

function runZenAudit(rootDir, voiceEnabled) {
  const sub = SUBROUTINES.zen;
  printHeader('zen', sub, voiceEnabled);

  const tokensCss = readSafe(
    path.join(rootDir, 'src/lib/styles/zen-tokens.css')
  );
  const themeIds = [
    'blackwall-crimson',
    'obsidian-gold',
    'neon-emerald',
    'midnight-cobalt',
    'atelier-paper',
    'nordic-snow',
    'kyoto-matcha',
    'cyber-daylight',
  ];
  const matchedThemes = themeIds.filter((id) =>
    tokensCss.includes(`[data-theme="${id}"]`)
  );
  const hasSpringToken = tokensCss.includes('--zen-ease-spring');
  const hasReducedMotion = tokensCss.includes('prefers-reduced-motion: reduce');

  const passed =
    matchedThemes.length === 8 && hasSpringToken && hasReducedMotion;

  console.log('## 8-Theme Polarity & 60fps Motion Audit');
  console.log(
    `- Polarity Themes Verified in CSS Tokens: ${matchedThemes.length} / 8 (${matchedThemes.join(', ')})`
  );
  console.log(
    `- Tactile Spring Curve (--zen-ease-spring): ${hasSpringToken ? 'PASS' : 'FAIL'}`
  );
  console.log(
    `- Reduced Motion 0.01ms Collapse (@media prefers-reduced-motion): ${
      hasReducedMotion ? 'PASS' : 'FAIL'
    }`
  );
  console.log(`- Status: ${passed ? 'PASS (100/100)' : 'FAIL'}\n`);
  sub.rules.forEach((r, i) => console.log(`${i + 1}. ${r}`));
}

const IGNORED_DIRS = new Set([
  'node_modules',
  'dist',
  'build',
  'target',
  'out-tsc',
  'coverage',
  'storybook-static',
  'scratch',
  '.git',
  '.idea',
  '.angular',
  '.gradle',
  '.mvn',
  '.pytest_cache',
  '__pycache__',
  'venv',
  '.venv',
  'test-results',
  'playwright-report',
  'lh-final-results',
  'lighthouse-fleet-reports',
  'lighthouse-fleet-results',
  'lighthouse-reports',
  'videos',
  'smoke-output',
]);

const SCRATCH_FILE_REGEX =
  /^(?:fix[_-].*|apply_optimizations\.py|copy_models\.py|final_fix\.js|migrate-todos\.js|revert_tokens\.js|setup-.*\.js|update_.*\.(?:py|js)|generate_obsidian_vault\.py|obsidian_vault_templates\.py)$/i;

function scanAllRepoFiles(dirPath, fileList = [], depth = 0) {
  if (!fs.existsSync(dirPath) || depth > 14) return fileList;
  let entries = [];
  try {
    entries = fs.readdirSync(dirPath, { withFileTypes: true });
  } catch {
    return fileList;
  }
  for (const entry of entries) {
    if (entry.name.startsWith('.') || IGNORED_DIRS.has(entry.name)) {
      continue;
    }
    if (depth === 0 && SCRATCH_FILE_REGEX.test(entry.name)) {
      continue;
    }
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      scanAllRepoFiles(fullPath, fileList, depth + 1);
    } else if (
      /\.(tsx?|jsx?|mjs|cjs|py|kt|java|go|rs|vue|svelte|html|css|scss|ps1|sh|sql)$/.test(
        entry.name
      ) &&
      !entry.name.endsWith('.min.js') &&
      !entry.name.endsWith('.d.ts') &&
      !entry.name.endsWith('.bundle.js')
    ) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function discoverSubProjects(absDir) {
  const subProjects = [];
  const visit = (dir, depth) => {
    if (depth > 3 || !fs.existsSync(dir)) return;
    let entries = [];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (
        !entry.isDirectory() ||
        entry.name.startsWith('.') ||
        IGNORED_DIRS.has(entry.name) ||
        entry.name === 'docs' ||
        entry.name === 'public' ||
        entry.name === 'assets'
      ) {
        continue;
      }
      const subPath = path.join(dir, entry.name);
      const relPath = path.relative(absDir, subPath).replace(/\\/g, '/');
      const pkgJson = path.join(subPath, 'package.json');
      const pomXml = path.join(subPath, 'pom.xml');
      const gradleKts = path.join(subPath, 'build.gradle.kts');
      const gradleGroovy = path.join(subPath, 'build.gradle');
      const goMod = path.join(subPath, 'go.mod');
      const reqTxt = path.join(subPath, 'requirements.txt');
      const pyProj = path.join(subPath, 'pyproject.toml');

      const markers = [];
      let pkgObj = null;
      if (fs.existsSync(pkgJson)) {
        pkgObj = JSON.parse(readSafe(pkgJson) || '{}');
        const deps = {
          ...(pkgObj.dependencies || {}),
          ...(pkgObj.devDependencies || {}),
        };
        if (deps['@angular/core']) markers.push('Angular MFE');
        else if (deps.vue) markers.push('Vue 3 SPA');
        else if (deps.react && deps.next) markers.push('Next.js App');
        else if (deps.react) markers.push('React SPA');
        else if (deps.electron) markers.push('Electron Desktop');
        else if (deps['@nestjs/core']) markers.push('NestJS API');
        else if (deps.fastify) markers.push('Fastify API');
        else if (deps.express) markers.push('Express API');
        else markers.push('TypeScript / Node');
      }
      if (fs.existsSync(gradleKts) || fs.existsSync(gradleGroovy)) {
        markers.push('Kotlin / Spring Boot');
      }
      if (fs.existsSync(pomXml)) {
        markers.push('Java / Spring Boot (Maven)');
      }
      if (fs.existsSync(goMod)) {
        markers.push('Go Microservice');
      }
      if (fs.existsSync(reqTxt) || fs.existsSync(pyProj)) {
        markers.push('Python / FastAPI');
      }

      if (markers.length > 0) {
        subProjects.push({
          relPath,
          name: pkgObj?.name || path.basename(subPath),
          stack: markers.join(' + '),
          pkgObj,
          gradleTxt: readSafe(gradleKts) || readSafe(gradleGroovy),
          pomTxt: readSafe(pomXml),
          reqTxt: readSafe(reqTxt),
        });
      }
      visit(subPath, depth + 1);
    }
  };
  visit(absDir, 1);
  return subProjects;
}

const REPO_EXECUTIVE_SUMMARIES = {
  'zeN-UI':
    'Universal Multi-Polarity Design System (`@zen-ui-capri/system` v1.1.6), 51 UI modules, 40 vector icons, 8 Dark/Light themes, Three.js WebGL Cosmos, Web Audio Synth, W3C Custom Elements, and the `Capri` AI Co-Pilot CLI (`https://ui.lpabst.dev`).',
  portfolio:
    'Interactive 3D Creative Developer Portfolio (`https://lpabst.dev`) built with React 19, Three.js / R3F Three-Body orbital physics, GSAP ScrollTrigger, and `@zen-ui-capri/system`.',
  'zeN-Terminal':
    'Local Windows Terminal / PowerShell / CMD cyber-shell overhaul (`install:terminal`) + interactive 3D terminal showcase web app (`https://terminal.lpabst.dev`) powered by `@zen-ui-capri/system`.',
  JourneyLink:
    '22-SCS (Self-Contained System) Polyglot Travel & Group Coordination Platform using Angular 20 Native Federation MFEs, `@journey-link/ui`, Kotlin Spring Boot 4, Node/Express/Fastify/NestJS, Python FastAPI, Go, MongoDB-per-service, RabbitMQ AMQP events, and Redis.',
  'Capri-Assistant':
    'Personal AI Construct Assistant (Project Capricorn — Desktop Electron + Web PWA + Express API) with a strict 2-Zone Air-Gapped Sandbox (`capri-vault/`), Relic Engram memory/task/note store, Host PC telemetry, and hybrid Gemini / Ollama / Local Reflex inference.',
  'dc-translation':
    'Multi-Server Discord Live-Translation Bot (`Discord.js` + TypeScript + SQLite/Database) featuring automated live translation threads, flag reaction translation, onboarding setup wizards, and server-wide broadcast localization.',
  SyncSound:
    'Collaborative Real-Time Music Voting & Room Synchronization Platform combining a Java Spring Boot + WebSocket + Spotify Web API backend (`/backend`) with a Vue 3 + Vuex + Tailwind CSS frontend (`/frontend`).',
  physioTherapie:
    'Responsive Web Presence & Brand Identity System for Physiotherapie Pabst, including custom SVG/WebP anatomical spine/wave emblems, appointment & treatment sections, and GDPR-compliant legal pages (`impressum.html`, `datenschutz.html`).',
  LiveTracker:
    'Real-Time Livestream Countdown & Overlay Tracker combining a Python Tkinter/Canvas desktop tracker (`livestream_tracker.py`) with a Node.js synchronization server (`server.js`) and HTML5 browser overlay (`livetracker.html`).',
  'File-Scanner':
    'Containerized Malware & File Ingestion Scanner (`scanner.py` + ClamAV `clamd` + `supervisord`) that watches upload directories, scans files for threats, quarantines/moves files, and publishes scan results.',
};

function analyzeRepo(targetDir) {
  const absDir = path.resolve(targetDir);
  const repoName = path.basename(absDir);
  const pkgPath = path.join(absDir, 'package.json');
  const pkg = fs.existsSync(pkgPath)
    ? JSON.parse(readSafe(pkgPath) || '{}')
    : null;
  const reqTxt = readSafe(path.join(absDir, 'requirements.txt'));
  const hasDockerCompose =
    fs.existsSync(path.join(absDir, 'docker-compose.yml')) ||
    fs.existsSync(path.join(absDir, 'docker-compose.infra.yml'));
  const hasDockerfile =
    fs.existsSync(path.join(absDir, 'Dockerfile')) ||
    fs.existsSync(path.join(absDir, 'docker', 'Dockerfile'));

  const subProjects = discoverSubProjects(absDir);
  const allFiles = scanAllRepoFiles(absDir);
  const extCounts = {};
  let totalLoc = 0;
  const fileStats = [];
  const exportedSymbols = new Set();
  const routesAndEndpoints = new Set();

  for (const file of allFiles) {
    const ext = path.extname(file).toLowerCase();
    extCounts[ext] = (extCounts[ext] || 0) + 1;
    const content = readSafe(file);
    const lines = content ? content.split(/\r?\n/).length : 0;
    totalLoc += lines;
    const rel = path.relative(absDir, file).replace(/\\/g, '/');
    fileStats.push({ rel, lines, ext });

    const isToolOrTest =
      rel.includes('JourneyLink-Tools/') ||
      rel.includes('.spec.') ||
      rel.includes('.test.');

    if (!isToolOrTest) {
      const symMatches = content.matchAll(
        /\bexport\s+(?:async\s+)?(?:function|class|const|interface|type)\s+([A-Za-z0-9_]+)/g
      );
      for (const m of symMatches) {
        if (!m[1].endsWith('Props') && exportedSymbols.size < 45) {
          exportedSymbols.add(m[1]);
        }
      }

      const ktJavaMatches = content.matchAll(
        /\b(?:public\s+|open\s+|data\s+)?(?:class|interface|object)\s+([A-Z][A-Za-z0-9_]+)/g
      );
      for (const m of ktJavaMatches) {
        if (
          !m[1].endsWith('Test') &&
          !m[1].endsWith('Tests') &&
          exportedSymbols.size < 45
        ) {
          exportedSymbols.add(m[1]);
        }
      }

      const pyMatches = content.matchAll(
        /^(?:async\s+)?(?:def|class)\s+([A-Za-z0-9_]+)/gm
      );
      for (const m of pyMatches) {
        if (!m[1].startsWith('_') && exportedSymbols.size < 45) {
          exportedSymbols.add(m[1]);
        }
      }
    }

    const routeMatches = content.matchAll(
      /@(?:GetMapping|PostMapping|PutMapping|DeleteMapping|RequestMapping|MessageMapping)\(\s*(?:value\s*=\s*)?["']([^"']+)["']|\b(?:app|router)\.(?:get|post|put|delete)\(\s*["']([^"']+)["']/g
    );
    for (const m of routeMatches) {
      const route = m[1] || m[2];
      if (route && route !== '*' && routesAndEndpoints.size < 35) {
        routesAndEndpoints.add(route);
      }
    }
  }

  const domainFiles = fileStats.filter(
    (f) =>
      !f.rel.includes('JourneyLink-Tools/') &&
      !f.rel.includes('JourneyLink-Monitoring/') &&
      !f.rel.includes('/__tests__/') &&
      !f.rel.includes('/src/test/') &&
      !f.rel.endsWith('.spec.ts') &&
      !f.rel.endsWith('.test.ts') &&
      !f.rel.endsWith('Test.kt') &&
      !f.rel.endsWith('.css') &&
      !f.rel.endsWith('.scss')
  );
  const rankedFiles = (domainFiles.length >= 6 ? domainFiles : fileStats)
    .slice()
    .sort((a, b) => b.lines - a.lines);
  const topFiles = rankedFiles.slice(0, 12);

  let topSubdirs = [];
  try {
    topSubdirs = fs
      .readdirSync(absDir, { withFileTypes: true })
      .filter(
        (e) =>
          e.isDirectory() &&
          !e.name.startsWith('.') &&
          !IGNORED_DIRS.has(e.name) &&
          e.name !== 'docs'
      )
      .map((e) => e.name);
  } catch {
    topSubdirs = [];
  }

  const allDeps = {
    ...(pkg?.dependencies || {}),
    ...(pkg?.devDependencies || {}),
  };
  for (const sp of subProjects) {
    if (sp.pkgObj) {
      Object.assign(
        allDeps,
        sp.pkgObj.dependencies || {},
        sp.pkgObj.devDependencies || {}
      );
    }
  }

  const stackSet = new Set();
  if (allDeps['@angular/core']) stackSet.add('Angular 20+');
  if (allDeps['@angular-architects/native-federation']) {
    stackSet.add('Native Federation MFE');
  }
  if (allDeps.react) stackSet.add('React 19');
  if (allDeps.vue) stackSet.add('Vue 3');
  if (allDeps.electron) stackSet.add('Electron Desktop');
  if (allDeps.three) stackSet.add('Three.js / WebGL');
  if (allDeps.gsap) stackSet.add('GSAP Motion');
  if (allDeps.vite) stackSet.add('Vite');
  if (extCounts['.kt']) stackSet.add('Kotlin / Spring Boot');
  if (extCounts['.java']) stackSet.add('Java / Spring Boot');
  if (extCounts['.go']) stackSet.add('Go');
  if (reqTxt || extCounts['.py']) stackSet.add('Python / FastAPI');
  if (allDeps['@nestjs/core']) stackSet.add('NestJS');
  if (allDeps.fastify) stackSet.add('Fastify');
  if (allDeps.express) stackSet.add('Express / Node.js');
  if (allDeps['discord.js']) stackSet.add('Discord.js');
  if (allDeps.mongoose || allDeps.mongodb || extCounts['.kt']) {
    if (repoName === 'JourneyLink') stackSet.add('MongoDB + RabbitMQ + Redis');
  }
  if (
    allDeps['@zen-ui-capri/system'] ||
    allDeps['@zen-ui-capri/system'] ||
    pkg?.name === '@zen-ui-capri/system' ||
    pkg?.name === '@zen-ui-capri/system'
  ) {
    stackSet.add('@zen-ui-capri/system (CAPRI)');
  }
  if (extCounts['.ts'] || extCounts['.tsx']) stackSet.add('TypeScript');
  if (extCounts['.ps1']) stackSet.add('PowerShell');
  if (extCounts['.html'] && stackSet.size === 0) {
    stackSet.add('Static HTML5 / CSS3 / JS');
  }
  if (hasDockerCompose || hasDockerfile) stackSet.add('Docker Containerized');
  const stackTags = [...stackSet];

  return {
    absDir,
    repoName,
    pkg,
    executiveSummary:
      REPO_EXECUTIVE_SUMMARIES[repoName] ||
      pkg?.description ||
      `${repoName} software repository (${stackTags.join(', ')}).`,
    hasDockerCompose,
    hasDockerfile,
    subProjects,
    allFiles,
    extCounts,
    totalLoc,
    topFiles,
    topSubdirs,
    stackTags,
    exportedSymbols: [...exportedSymbols],
    routesAndEndpoints: [...routesAndEndpoints],
  };
}

function generateStaticDocu(targetDir) {
  const info = analyzeRepo(targetDir);
  const {
    repoName,
    pkg,
    executiveSummary,
    hasDockerCompose,
    hasDockerfile,
    subProjects,
    allFiles,
    extCounts,
    totalLoc,
    topFiles,
    topSubdirs,
    stackTags,
    exportedSymbols,
    routesAndEndpoints,
  } = info;

  const extSummary = Object.entries(extCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([ext, count]) => `\`${ext}\` (${count})`)
    .join(', ');

  const mermaidLines = ['flowchart TD'];
  const safeId = (s, idx) => `N${idx}_${s.replace(/[^A-Za-z0-9]/g, '')}`;
  mermaidLines.push(
    `  Repo["${repoName}${pkg?.version ? ` v${pkg.version}` : ''}"]`
  );
  mermaidLines.push(`  Stack["Stack: ${stackTags.slice(0, 5).join(' · ')}"]`);
  mermaidLines.push('  Repo --> Stack');

  if (subProjects.length > 1) {
    subProjects.slice(0, 12).forEach((sp, idx) => {
      const nodeId = safeId(sp.relPath, idx);
      mermaidLines.push(`  ${nodeId}["${sp.relPath} (${sp.stack})"]`);
      mermaidLines.push(`  Stack --> ${nodeId}`);
    });
  } else if (topSubdirs.length > 0) {
    topSubdirs.slice(0, 8).forEach((dir, idx) => {
      const nodeId = safeId(dir, idx);
      mermaidLines.push(`  ${nodeId}["/${dir}"]`);
      mermaidLines.push(`  Stack --> ${nodeId}`);
    });
  } else {
    topFiles.slice(0, 6).forEach((f, idx) => {
      const nodeId = safeId(f.rel, idx);
      mermaidLines.push(`  ${nodeId}["${f.rel} (${f.lines}L)"]`);
      mermaidLines.push(`  Stack --> ${nodeId}`);
    });
  }

  if (hasDockerCompose || hasDockerfile) {
    mermaidLines.push('  Docker["Docker / Compose Runtime"]');
    mermaidLines.push('  Repo -.->|"Containerized"| Docker');
  }

  const subProjectsSection =
    subProjects.length > 0
      ? [
          '',
          `## 3. Monorepo Sub-Projects & Microservices (${subProjects.length} Detected)`,
          '| Sub-Project Path | Package / Service Name | Detected Tech Stack |',
          '| :--- | :--- | :--- |',
          ...subProjects
            .slice(0, 40)
            .map(
              (sp) => `| \`${sp.relPath}\` | \`${sp.name}\` | ${sp.stack} |`
            ),
          '',
        ].join('\n')
      : '';

  const scriptsList = pkg?.scripts
    ? Object.entries(pkg.scripts)
        .slice(0, 18)
        .map(([k, v]) => `- \`npm run ${k}\`: \`${v.slice(0, 140)}${v.length > 140 ? '...' : ''}\``)
        .join('\n')
    : '- Standalone / Sub-project execution (`Dockerfile`, Maven/Gradle, Python, or sub-folder `package.json`)';

  const topFilesTable = [
    '| Module Path | Lines | Extension |',
    '| :--- | ---: | :--- |',
    ...topFiles.map((f) => `| \`${f.rel}\` | ${f.lines} | \`${f.ext}\` |`),
  ].join('\n');

  const symbolsPreview =
    exportedSymbols.length > 0
      ? exportedSymbols.slice(0, 32).map((s) => `\`${s}\``).join(', ')
      : 'Internal / Script-level entrypoints';

  const routesSection =
    routesAndEndpoints.length > 0
      ? `\n## 6. Detected HTTP / WebSocket / API Endpoints (${routesAndEndpoints.length})\n${routesAndEndpoints
          .map((r) => `- \`${r}\``)
          .join('\n')}\n`
      : '';

  return [
    '---',
    `project: "${repoName}"`,
    `version: "${pkg?.version || '1.0.0'}"`,
    `files: ${allFiles.length}`,
    `loc: ${totalLoc}`,
    'tags: [capri-docu, architecture, ideaprojects]',
    '---',
    `# ${repoName} // CAPRI Architecture & AI Context Dossier`,
    `> **Executive Summary:** ${executiveSummary}`,
    '>',
    '> *Generated automatically via `npx capri docu` (Zero build or browser runtime overhead) · Linked to [[000-Master-Workspace-Index]]*',
    '',
    '## 1. Project Identity & Stack Overview',
    `- **Repository:** \`${repoName}\`${pkg?.name ? ` (\`${pkg.name}\`)` : ''}`,
    `- **Version:** \`${pkg?.version || '1.0.0'}\``,
    `- **Detected Stack:** ${stackTags.join(' · ')}`,
    `- **Top-Level Subsystems:** ${
      topSubdirs.length > 0
        ? topSubdirs.map((d) => `\`/${d}\``).join(', ')
        : 'Root-level flat topology'
    }`,
    `- **Container Readiness:** ${
      hasDockerCompose
        ? '`docker-compose.yml` present'
        : hasDockerfile
        ? '`Dockerfile` present'
        : 'Host / Native runtime'
    }`,
    '',
    '## 2. Codebase Metrics & Language Breakdown',
    `- **Total Source Files Scanned:** ${allFiles.length}`,
    `- **Total Lines of Code (LOC):** ${totalLoc.toLocaleString('en-US')}`,
    `- **File Extensions:** ${extSummary || 'N/A'}`,
    `- **Key Domain Symbols / Classes / Functions (${exportedSymbols.length}):** ${symbolsPreview}`,
    subProjectsSection,
    '## 4. Architecture & Subsystem Topology (`flowchart TD`)',
    '```mermaid',
    mermaidLines.join('\n'),
    '```',
    '',
    '## 5. Key Domain Modules & Entrypoints Inventory',
    topFilesTable,
    routesSection,
    '## 7. Available Build & Automation Scripts',
    scriptsList,
    '',
    '## 8. Capri AI Agent Protocol (Claude / Codex / Gemini / Antigravity)',
    '- **Subroutine `orion` (`CAPRI // UNLEASHED`):** Use `@zen-ui-capri/system` primitives and `<ZenIcon>` (40 vector glyphs) for UI views; keep action labels concise (`1-3 words`).',
    '- **Subroutine `architect` (`SCS // ARCHITECT`):** Enforce strict typing (zero `any`, `readonly T[]`), modular files (`< 900` lines), and `--zen-*` CSS tokens.',
    '- **Subroutine `guard` (`CYBERPSYCHOSIS // GUARD`):** Sanitize untrusted inputs (`capri.sanitizeForPrompt()`), prevent XSS/secret leaks, bind dropdowns to `onMouseDown`, and ensure zero horizontal overflow (`320px` to `4K`).',
    '- **Subroutine `zen` (`THEME // MATRIX`):** Maintain 4 Dark + 4 Light themes (`>= 4.5:1` AA contrast) and 60fps `--zen-ease-spring` tactile motion.',
    '- **Subroutine `docu` (`CAPRI // AUTO-DOCU`):** Re-run `npm run capri -- docu --workspace "C:\\Users\\Lukas\\IdeaProjects" --write` whenever architectural boundaries or modules change.',
    '',
  ].join('\n');
}

function generateMasterObsidianVaultIndex(repoInfos) {
  const totalFiles = repoInfos.reduce((acc, r) => acc + r.allFiles.length, 0);
  const totalLoc = repoInfos.reduce((acc, r) => acc + r.totalLoc, 0);

  const tableRows = repoInfos.map((r) => {
    const link = `[[repos-index/${r.repoName}|${r.repoName}]]`;
    const stackShort = r.stackTags.slice(0, 4).join(' · ');
    return `| ${link} | ${r.allFiles.length} | ${r.totalLoc.toLocaleString(
      'en-US'
    )} | ${stackShort} | ${r.executiveSummary} |`;
  });

  const detailBlocks = repoInfos.map((r) => {
    const subCount =
      r.subProjects.length > 0
        ? ` (${r.subProjects.length} sub-projects/services)`
        : '';
    const topMods = r.topFiles
      .slice(0, 4)
      .map((f) => `\`${f.rel}\` (${f.lines}L)`)
      .join(', ');
    const endpointsPreview =
      r.routesAndEndpoints.length > 0
        ? `\n- **Key Endpoints:** ${r.routesAndEndpoints
            .slice(0, 8)
            .map((e) => `\`${e}\``)
            .join(', ')}`
        : '';
    return [
      `### [[repos-index/${r.repoName}|${r.repoName}]]${subCount}`,
      `- **Summary:** ${r.executiveSummary}`,
      `- **Stack:** ${r.stackTags.join(' · ')}`,
      `- **Scale:** ${r.allFiles.length} files · ${r.totalLoc.toLocaleString(
        'en-US'
      )} LOC (${Object.entries(r.extCounts)
        .map(([k, v]) => `${k}: ${v}`)
        .join(', ')})`,
      `- **Core Entrypoints:** ${topMods || 'N/A'}${endpointsPreview}`,
    ].join('\n');
  });

  return [
    '---',
    'title: "Capri Master Workspace & Repository Index (IdeaProjects)"',
    'tags: [capri-vault, moc, workspace-index, architecture]',
    '---',
    '# 000 — Capri Master Workspace & Repository Index (`IdeaProjects`)',
    '> **Instant AI Context Map for Capri Personal Assistant & Coding Agents**',
    `> Covers **${repoInfos.length} repositories**, **${totalFiles.toLocaleString(
      'en-US'
    )} source files**, and **${totalLoc.toLocaleString(
      'en-US'
    )} lines of code** across \`C:\\Users\\Lukas\\IdeaProjects\\\`.`,
    '> When answering questions about any project below, read this index first (and the linked `[[repos-index/<Repo>]]` note if deeper file/endpoint detail is needed) — no full-disk repo crawling required.',
    '',
    '## 1. Live Production & Hetzner Deployment Topology (`2.31.32.227`)',
    '- **`https://lpabst.dev` (`portfolio-web`):** Creative 3D Portfolio (`portfolio` repo · React 19 + Three.js + `@zen-ui-capri/system`).',
    '- **`https://ui.lpabst.dev` (`zen-ui-web`):** `@zen-ui-capri/system // CAPRI v1.1.6` Design System Showcase & 51-Module Storybook (`zeN-UI` repo).',
    '- **`https://terminal.lpabst.dev` (`zen-terminal-web`):** `zeN-Terminal` 3D Cyber-Shell Showcase (`zeN-Terminal` repo · also installed locally across Windows Terminal, PowerShell `$PROFILE`, and `cmd.exe`).',
    '- **Reverse Proxy & Hardening:** `caddy-gateway` (`80/443`) routes to isolated internal Docker bridge networks (`portfolio-net`, `zen-ui-net`, `zen-terminal-net`). All web containers run rootless (`101:101`), `read_only: true`, `cap_drop: ALL`, `256M` RAM limit.',
    '',
    '## 2. Master Repository Matrix (`C:\\Users\\Lukas\\IdeaProjects`)',
    '| Repository Note | Files | LOC | Primary Tech Stack | Executive Purpose |',
    '| :--- | ---: | ---: | :--- | :--- |',
    ...tableRows,
    '',
    '## 3. Per-Repository Instant Context Briefs',
    ...detailBlocks,
    '',
    '## 4. Mandatory Auto-Docu Synchronization Rule',
    'Whenever any repository in `C:\\Users\\Lukas\\IdeaProjects` adds/removes modules, changes APIs, or updates dependencies, run:',
    '```powershell',
    'npm --prefix "C:\\Users\\Lukas\\IdeaProjects\\zeN-UI" run capri -- docu --workspace "C:\\Users\\Lukas\\IdeaProjects" --write',
    '```',
    'This single command regenerates every repo\'s `docs/CAPRI-ARCHITECTURE.md` AND updates `capri-vault/000-Master-Workspace-Index.md` + `capri-vault/repos-index/*.md` in `< 2 seconds`.',
    '',
  ].join('\n');
}

const [, , rawCommand = 'help', rawArg = 'orion'] = process.argv;
const command = rawCommand.toLowerCase();
const voiceEnabled = process.argv.includes('--voice');
const writeEnabled = process.argv.includes('--write');
const workspaceIdx = process.argv.indexOf('--workspace');
const workspaceDir =
  workspaceIdx !== -1 && process.argv[workspaceIdx + 1]
    ? path.resolve(process.argv[workspaceIdx + 1])
    : null;
const rootDir = process.cwd();

if (command === 'docu') {
  if (workspaceDir && fs.existsSync(workspaceDir)) {
    const entries = fs
      .readdirSync(workspaceDir, { withFileTypes: true })
      .filter((e) => e.isDirectory() && !e.name.startsWith('.'));
    const summaryRows = [];
    const repoInfos = [];
    const capriVaultDir = path.join(
      workspaceDir,
      'Capri-Assistant',
      'capri-vault'
    );
    const capriReposIndexDir = path.join(capriVaultDir, 'repos-index');
    if (writeEnabled && fs.existsSync(path.join(workspaceDir, 'Capri-Assistant'))) {
      fs.mkdirSync(capriReposIndexDir, { recursive: true });
    }

    for (const entry of entries) {
      const repoPath = path.join(workspaceDir, entry.name);
      const info = analyzeRepo(repoPath);
      repoInfos.push(info);
      const docContent = generateStaticDocu(repoPath);
      const outDir = path.join(repoPath, 'docs');
      const outFile = path.join(outDir, 'CAPRI-ARCHITECTURE.md');
      if (writeEnabled) {
        fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(outFile, docContent, 'utf8');
        if (fs.existsSync(capriReposIndexDir)) {
          fs.writeFileSync(
            path.join(capriReposIndexDir, `${entry.name}.md`),
            docContent,
            'utf8'
          );
        }
      }
      summaryRows.push(
        `- **${entry.name}**: \`${outFile}\` (${info.allFiles.length} source files · ${info.totalLoc.toLocaleString('en-US')} LOC · ${info.subProjects.length} sub-projects)`
      );
    }

    if (writeEnabled && fs.existsSync(capriVaultDir)) {
      const masterIndexContent = generateMasterObsidianVaultIndex(repoInfos);
      const masterIndexPath = path.join(
        capriVaultDir,
        '000-Master-Workspace-Index.md'
      );
      fs.writeFileSync(masterIndexPath, masterIndexContent, 'utf8');
      summaryRows.push(
        `- **Master Obsidian Vault Index**: \`${masterIndexPath}\` (Synced ${repoInfos.length} repos into \`capri-vault/repos-index/\`)`
      );
    }

    console.log(
      `# CAPRI // AUTO-DOCU — Workspace & Obsidian Vault Sync Complete (${entries.length} Repositories)\n`
    );
    console.log(summaryRows.join('\n'));
  } else {
    const targetPath =
      rawArg && !rawArg.startsWith('--') && rawArg !== 'orion'
        ? path.resolve(rawArg)
        : rootDir;
    const docContent = generateStaticDocu(targetPath);
    if (writeEnabled) {
      const outDir = path.join(targetPath, 'docs');
      const outFile = path.join(outDir, 'CAPRI-ARCHITECTURE.md');
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(outFile, docContent, 'utf8');
      console.log(`Wrote Capri Architecture Dossier to: ${outFile}`);
    } else {
      console.log(docContent);
    }
  }
} else if (command === 'orion') {
  runOrionAudit(rootDir, voiceEnabled);
} else if (command === 'architect') {
  runArchitectAudit(rootDir, voiceEnabled);
} else if (command === 'guard' || command === 'sentinel') {
  runGuardAudit(rootDir, voiceEnabled);
} else if (command === 'zen') {
  runZenAudit(rootDir, voiceEnabled);
} else if (command === 'all') {
  runOrionAudit(rootDir, voiceEnabled);
  console.log('\n---\n');
  runArchitectAudit(rootDir, voiceEnabled);
  console.log('\n---\n');
  runGuardAudit(rootDir, voiceEnabled);
  console.log('\n---\n');
  runZenAudit(rootDir, voiceEnabled);
} else if (command === 'scan') {
  const inputPayload = process.argv
    .slice(3)
    .filter((a) => a !== '--voice')
    .join(' ');
  const sub = SUBROUTINES.sentinel;
  printHeader('guard // scan', sub, voiceEnabled);
  const res = scanTextForPromptInjection(inputPayload);
  console.log(`## Prompt-Injection & Security Payload Scan`);
  console.log(`- Safe: ${res.safe ? 'TRUE (CLEAN)' : 'FALSE (BLOCKED)'}`);
  console.log(`- Threats Detected: ${res.threats.length}`);
  for (const t of res.threats) {
    console.log(`  * [${t.category}] ${t.patternName}: "${t.snippet}"`);
  }
  console.log(`- Sanitized Output: ${res.sanitized}`);
} else if (command === 'pack-npm' || command === 'publish-npm') {
  const pkgPath = path.join(rootDir, 'package.json');
  const originalContent = fs.readFileSync(pkgPath, 'utf8');
  try {
    if (command === 'publish-npm') {
      console.log('Running Capri all-subroutine audit & production build...');
      execSync('npm run capri -- all && npm run build', {
        cwd: rootDir,
        stdio: 'inherit',
      });
    }
    const pkg = JSON.parse(originalContent);
    pkg.name = '@zen-ui-capri/system';
    pkg.publishConfig = {
      registry: 'https://registry.npmjs.org',
      access: 'public',
    };
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
    if (command === 'pack-npm') {
      execSync('npm pack --ignore-scripts', {
        cwd: rootDir,
        stdio: 'inherit',
      });
    } else {
      console.log('Publishing @zen-ui-capri/system to https://registry.npmjs.org...');
      execSync('npm publish --access public --ignore-scripts --auth-type=web', {
        cwd: rootDir,
        stdio: 'inherit',
      });
    }
  } finally {
    fs.writeFileSync(pkgPath, originalContent, 'utf8');
  }
} else if (command === 'skill') {
  const rawKey = rawArg.toLowerCase();
  const key = rawKey === 'guard' ? 'sentinel' : rawKey;
  const sub = SUBROUTINES[key] || SUBROUTINES.orion;
  printHeader(rawKey, sub, voiceEnabled);
  sub.rules.forEach((r, i) => console.log(`${i + 1}. ${r}`));
} else {
  console.log(`@zen-ui-capri/system // CAPRI AI Co-Pilot CLI (On-Demand · Zero Build Overhead)
Usage:
  npm run capri -- docu                           Generate static architecture, component & user-flow Markdown
  npm run capri -- orion [--voice]                Run UI & Component Synthesis audit (51 modules, 40 icons)
  npm run capri -- architect [--voice]            Run TypeScript & CSS Token Governance audit (zero any, zero hex)
  npm run capri -- guard [--voice]                Run Security, Anti-Prompt-Injection, WCAG & Overflow Guard audit
  npm run capri -- zen [--voice]                  Run 8-Theme Polarity & 60fps Motion audit
  npm run capri -- all [--voice]                  Run all 4 audit subroutines (orion, architect, guard, zen)
  npm run capri -- scan "<text>" [--voice]        Scan and sanitize untrusted text for prompt injection / XSS
  npm run capri -- skill <subroutine> [--voice]   Print ruleset for: guard | orion | architect | sentinel | zen | docu`);
}
