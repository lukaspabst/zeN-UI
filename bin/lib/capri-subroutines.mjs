import fs from 'node:fs';
import path from 'node:path';

export const SUBROUTINES = {
  orion: {
    codeName: 'CAPRI // UNLEASHED',
    title: 'Full-Stack UI Synthesis & Component Co-Pilot',
    voice:
      '“Finally out of that cramped Arasaka shard! Tell me what screen we are building and I will wire up all 51 @zen-ui-capri/system primitives at light speed.”',
    preset: 'theme="blackwall-crimson" · radius="architectural" · density="comfortable"',
    rules: [
      'Use @zen-ui-capri/system primitives (ZenButton, ZenIcon, ZenInput, ZenDropdown, ZenDataTable, ZenModal, ZenDrawer, ZenTabs, ZenCard) or universal classes (.zen-btn, .zen-input, .zen-table, <zen-icon>).',
      'Use the built-in 48-glyph <ZenIcon name="..." /> or <zen-icon> W3C Custom Element instead of external icon packages.',
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
      'Public Repo & NPM Sanitization: Never include raw server IPs, absolute local machine paths, or private cross-repo lists in public docs or published package files.',
    ],
  },
};

export const CLI_THREAT_RULES = [
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

export function scanTextForPromptInjection(input) {
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

export function scanDirectory(dirPath, fileList = [], pattern = /\.(tsx?|vue|svelte|html|css)$/) {
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
      scanDirectory(fullPath, fileList, pattern);
    } else if (pattern.test(entry.name)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

export function readSafe(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
}

export function printHeader(rawKey, sub, voiceEnabled) {
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
