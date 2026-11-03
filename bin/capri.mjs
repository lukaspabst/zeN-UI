#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const SUBROUTINES = {
  orion: {
    codeName: 'CAPRI // UNLEASHED',
    title: 'Full-Stack UI Synthesis & Component Co-Pilot',
    voice:
      '“Finally out of that cramped Arasaka shard! Tell me what screen we are building and I will wire up all 51 @zen-ui/system primitives at light speed.”',
    preset: 'theme="blackwall-crimson" · radius="architectural" · density="comfortable"',
    rules: [
      'Use @zen-ui/system primitives (ZenButton, ZenIcon, ZenInput, ZenDropdown, ZenDataTable, ZenModal, ZenDrawer, ZenTabs, ZenCard) or universal classes (.zen-btn, .zen-input, .zen-table, <zen-icon>).',
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
      'In Angular 20+ / Vue 3 / Vanilla HTML, use @zen-ui/system/universal (zenTheme, registerZenElements).',
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
  'coverage',
  'storybook-static',
  '.git',
  '.idea',
  '.angular',
  '.gradle',
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
]);

function scanAllRepoFiles(dirPath, fileList = [], depth = 0) {
  if (!fs.existsSync(dirPath) || depth > 5) return fileList;
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
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      scanAllRepoFiles(fullPath, fileList, depth + 1);
    } else if (
      /\.(tsx?|jsx?|mjs|cjs|py|kt|java|go|rs|vue|svelte|html|css|scss|ps1|sh|sql)$/.test(
        entry.name
      ) &&
      !entry.name.endsWith('.min.js') &&
      !entry.name.endsWith('.d.ts')
    ) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function generateStaticDocu(targetDir) {
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

    const symMatches = content.matchAll(
      /\bexport\s+(?:async\s+)?(?:function|class|const|interface|type)\s+([A-Za-z0-9_]+)/g
    );
    for (const m of symMatches) {
      if (!m[1].endsWith('Props') && exportedSymbols.size < 45) {
        exportedSymbols.add(m[1]);
      }
    }

    const pyMatches = content.matchAll(/^(?:async\s+)?(?:def|class)\s+([A-Za-z0-9_]+)/gm);
    for (const m of pyMatches) {
      if (!m[1].startsWith('_') && exportedSymbols.size < 45) {
        exportedSymbols.add(m[1]);
      }
    }

    const ktMatches = content.matchAll(
      /\b(?:class|interface|fun|object)\s+([A-Za-z0-9_]+)/g
    );
    for (const m of ktMatches) {
      if (exportedSymbols.size < 45) {
        exportedSymbols.add(m[1]);
      }
    }

    const routeMatches = content.matchAll(
      /@(?:GetMapping|PostMapping|PutMapping|DeleteMapping|RequestMapping)\(\s*["']([^"']+)["']|\b(?:app|router)\.(?:get|post|put|delete)\(\s*["']([^"']+)["']/g
    );
    for (const m of routeMatches) {
      const route = m[1] || m[2];
      if (route && routesAndEndpoints.size < 25) {
        routesAndEndpoints.add(route);
      }
    }
  }

  fileStats.sort((a, b) => b.lines - a.lines);
  const topFiles = fileStats.slice(0, 12);

  let topSubdirs = [];
  try {
    topSubdirs = fs
      .readdirSync(absDir, { withFileTypes: true })
      .filter(
        (e) =>
          e.isDirectory() &&
          !e.name.startsWith('.') &&
          !IGNORED_DIRS.has(e.name)
      )
      .map((e) => e.name);
  } catch {
    topSubdirs = [];
  }

  const stackTags = [];
  if (pkg) {
    const allDeps = {
      ...(pkg.dependencies || {}),
      ...(pkg.devDependencies || {}),
    };
    if (allDeps.react) stackTags.push(`React ${allDeps.react}`);
    if (allDeps['@angular/core']) stackTags.push(`Angular ${allDeps['@angular/core']}`);
    if (allDeps.three) stackTags.push('Three.js / WebGL');
    if (allDeps.gsap) stackTags.push('GSAP Motion');
    if (allDeps.vite) stackTags.push('Vite');
    if (allDeps.express) stackTags.push('Express / Node.js');
    if (allDeps['discord.js']) stackTags.push('Discord.js');
    if (allDeps['@zen-ui/system'] || pkg.name === '@zen-ui/system') {
      stackTags.push('@zen-ui/system (CAPRI)');
    }
    if (allDeps.typescript) stackTags.push('TypeScript');
  }
  if (reqTxt || extCounts['.py']) stackTags.push('Python');
  if (extCounts['.kt']) stackTags.push('Kotlin / Spring Boot');
  if (extCounts['.ps1']) stackTags.push('PowerShell');
  if (extCounts['.html'] && !pkg) stackTags.push('Static HTML5 / CSS3 / JS');
  if (hasDockerCompose || hasDockerfile) stackTags.push('Docker Containerized');
  if (stackTags.length === 0) stackTags.push('Polyglot / Custom');

  const extSummary = Object.entries(extCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([ext, count]) => `\`${ext}\` (${count})`)
    .join(', ');

  const mermaidLines = ['flowchart TD'];
  const safeId = (s, idx) => `N${idx}_${s.replace(/[^A-Za-z0-9]/g, '')}`;
  mermaidLines.push(
    `  Repo["${repoName}${pkg?.version ? ` v${pkg.version}` : ''}"]`
  );
  mermaidLines.push(`  Stack["Stack: ${stackTags.slice(0, 4).join(' · ')}"]`);
  mermaidLines.push('  Repo --> Stack');

  if (topSubdirs.length > 0) {
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

  const scriptsList = pkg?.scripts
    ? Object.entries(pkg.scripts)
        .map(([k, v]) => `- \`npm run ${k}\`: \`${v}\``)
        .join('\n')
    : '- Standalone / Non-NPM execution (`Dockerfile` / scripts / native)';

  const topFilesTable = [
    '| Module Path | Lines | Extension |',
    '| :--- | ---: | :--- |',
    ...topFiles.map((f) => `| \`${f.rel}\` | ${f.lines} | \`${f.ext}\` |`),
  ].join('\n');

  const symbolsPreview =
    exportedSymbols.size > 0
      ? [...exportedSymbols].slice(0, 30).map((s) => `\`${s}\``).join(', ')
      : 'Internal / Script-level entrypoints';

  const routesSection =
    routesAndEndpoints.size > 0
      ? `\n## 5. Detected HTTP / API Endpoints\n${[...routesAndEndpoints]
          .map((r) => `- \`${r}\``)
          .join('\n')}\n`
      : '';

  return [
    `# ${repoName} // CAPRI Automated Architecture & AI Context Dossier`,
    '> Generated on demand via `npx capri docu` (Zero build or browser runtime overhead)',
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
    `- **Key Exported Symbols / Classes / Functions (${exportedSymbols.size}):** ${symbolsPreview}`,
    '',
    '## 3. Architecture & Subsystem Topology (`flowchart TD`)',
    '```mermaid',
    mermaidLines.join('\n'),
    '```',
    '',
    '## 4. Largest Modules & Entrypoints Inventory',
    topFilesTable,
    routesSection,
    '## 6. Available Build & Automation Scripts',
    scriptsList,
    '',
    '## 7. Capri AI Agent Protocol (Claude / Codex / Gemini / Antigravity)',
    '- **Subroutine `orion` (`CAPRI // UNLEASHED`):** Use `@zen-ui/system` primitives and `<ZenIcon>` (40 vector glyphs) for UI views; keep action labels concise (`1-3 words`).',
    '- **Subroutine `architect` (`SCS // ARCHITECT`):** Enforce strict typing (zero `any`, `readonly T[]`), modular files (`< 900` lines), and `--zen-*` CSS tokens.',
    '- **Subroutine `guard` (`CYBERPSYCHOSIS // GUARD`):** Sanitize untrusted inputs (`capri.sanitizeForPrompt()`), prevent XSS/secret leaks, bind dropdowns to `onMouseDown`, and ensure zero horizontal overflow (`320px` to `4K`).',
    '- **Subroutine `zen` (`THEME // MATRIX`):** Maintain 4 Dark + 4 Light themes (`>= 4.5:1` AA contrast) and 60fps `--zen-ease-spring` tactile motion.',
    '- **Subroutine `docu` (`CAPRI // AUTO-DOCU`):** Re-run `npx capri docu --write` whenever architectural boundaries or modules change.',
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
    for (const entry of entries) {
      const repoPath = path.join(workspaceDir, entry.name);
      const docContent = generateStaticDocu(repoPath);
      const outDir = path.join(repoPath, 'docs');
      const outFile = path.join(outDir, 'CAPRI-ARCHITECTURE.md');
      if (writeEnabled) {
        fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(outFile, docContent, 'utf8');
      }
      const filesCount = scanAllRepoFiles(repoPath).length;
      summaryRows.push(
        `- **${entry.name}**: \`${outFile}\` (${filesCount} source files analyzed)`
      );
    }
    console.log(
      `# CAPRI // AUTO-DOCU — Workspace Batch Documentation Complete (${entries.length} Repositories)\n`
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
} else if (command === 'skill') {
  const rawKey = rawArg.toLowerCase();
  const key = rawKey === 'guard' ? 'sentinel' : rawKey;
  const sub = SUBROUTINES[key] || SUBROUTINES.orion;
  printHeader(rawKey, sub, voiceEnabled);
  sub.rules.forEach((r, i) => console.log(`${i + 1}. ${r}`));
} else {
  console.log(`@zen-ui/system // CAPRI AI Co-Pilot CLI (On-Demand · Zero Build Overhead)
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
