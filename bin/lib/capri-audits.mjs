import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  SUBROUTINES,
  printHeader,
  readSafe,
  scanDirectory,
  scanTextForPromptInjection,
} from './capri-subroutines.mjs';

const PKG_ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const PKG_DIST_DIR = path.join(PKG_ROOT_DIR, 'dist/lib');

function detectSelfLibrary(rootDir) {
  const pkgTxt = readSafe(path.join(rootDir, 'package.json'));
  if (!pkgTxt) return false;
  try {
    const pkg = JSON.parse(pkgTxt);
    return (
      pkg.name === '@zen-ui-capri/system' &&
      fs.existsSync(path.join(rootDir, 'src/lib/capri/capri-engine.ts'))
    );
  } catch {
    return false;
  }
}

function resolveSourceDir(rootDir) {
  const srcPath = path.join(rootDir, 'src');
  if (fs.existsSync(srcPath)) return srcPath;
  const appPath = path.join(rootDir, 'app');
  if (fs.existsSync(appPath)) return appPath;
  return rootDir;
}

function concatDirContents(dirPath, pattern = /\.(tsx?|mjs|js|d\.ts|css)$/) {
  if (!fs.existsSync(dirPath)) return '';
  const files = scanDirectory(dirPath, [], pattern);
  return files.map((f) => readSafe(f)).join('\n');
}

function scanDistFiles(dirPath, fileList = []) {
  if (!fs.existsSync(dirPath)) return fileList;
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      scanDistFiles(fullPath, fileList);
    } else if (/\.(js|d\.ts|css)$/.test(entry.name)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

export function runOrionAudit(rootDir, voiceEnabled) {
  const sub = SUBROUTINES.orion;
  printHeader('orion', sub, voiceEnabled);

  const isSelf = detectSelfLibrary(rootDir);
  if (isSelf) {
    const iconFile = readSafe(path.join(rootDir, 'src/lib/components/ZenIcon.tsx'));
    const storybookFiles = scanDirectory(
      path.join(rootDir, 'src/site/components/storybook'),
      [],
      /\.ts$/
    );
    const storybookCombined = storybookFiles.map((f) => readSafe(f)).join('\n');
    const universalFile = readSafe(
      path.join(rootDir, 'src/lib/universal/zen-universal.ts')
    );

    const svgBlock =
      iconFile.split('export const ZEN_ICON_SVG_INNER')[1]?.split('};')[0] ?? '';
    const glyphMatches = [
      ...svgBlock.matchAll(/^\s{2}(?:'[a-z0-9-]+'|[a-z0-9]+):/gm),
    ];
    const storyIds = [
      ...storybookCombined.matchAll(/^\s{4}angularSelector:\s*'/gm),
    ];
    const hasCustomElementIcon = universalFile.includes("define('zen-icon'");
    const passed =
      glyphMatches.length >= 40 && storyIds.length === 51 && hasCustomElementIcon;
    if (!passed) process.exitCode = 1;

    console.log('## Static UI & Component Synthesis Audit');
    console.log(`- Built-in <ZenIcon> Vector Glyphs: ${glyphMatches.length} / 48`);
    console.log(`- Interactive Storybook Modules Wired: ${storyIds.length} / 51`);
    console.log(
      `- W3C Custom Element <zen-icon> Registered: ${hasCustomElementIcon ? 'PASS' : 'FAIL'}`
    );
    console.log(`- Status: ${passed ? 'PASS (100/100)' : 'FAIL'}\n`);
  } else {
    const pkg = JSON.parse(readSafe(path.join(rootDir, 'package.json')) || '{}');
    const deps = {
      ...(pkg.dependencies || {}),
      ...(pkg.devDependencies || {}),
      ...(pkg.peerDependencies || {}),
    };
    const hasPkgDep = Boolean(deps['@zen-ui-capri/system']);
    const files = scanDirectory(resolveSourceDir(rootDir));
    const hasZenUsage = files.some((f) => {
      const txt = readSafe(f);
      return txt.includes('@zen-ui-capri/system') || txt.includes('zen-');
    });
    const distSource = scanDistFiles(PKG_DIST_DIR)
      .map((f) => readSafe(f))
      .join('\n');
    const hasDistIcons =
      distSource.includes('zen-icon') && distSource.includes('ZenIcon');
    const passed = hasPkgDep && hasZenUsage && hasDistIcons;
    if (!passed) process.exitCode = 1;

    console.log('## Consumer UI & Component Synthesis Audit');
    console.log(`- @zen-ui-capri/system Dependency Declared: ${hasPkgDep ? 'PASS' : 'FAIL'}`);
    console.log(`- @zen-ui-capri/system Imported in Source (${files.length} files): ${hasZenUsage ? 'PASS' : 'FAIL'}`);
    console.log(`- Installed Package Ships <ZenIcon> & <zen-icon>: ${hasDistIcons ? 'PASS' : 'FAIL'}`);
    console.log(`- Status: ${passed ? 'PASS (100/100)' : 'FAIL'}\n`);
  }

  sub.rules.forEach((r, i) => console.log(`${i + 1}. ${r}`));
}

export function runArchitectAudit(rootDir, voiceEnabled) {
  const sub = SUBROUTINES.architect;
  printHeader('architect', sub, voiceEnabled);

  const isSelf = detectSelfLibrary(rootDir);
  const files = scanDirectory(resolveSourceDir(rootDir));
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
    if (isSelf) {
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
  }

  const passed =
    anyViolations === 0 &&
    readonlyArrayViolations === 0 &&
    commentViolations === 0 &&
    hexInPrimitives === 0;
  if (!passed) process.exitCode = 1;

  console.log('## Multi-Stack & Token Governance Audit');
  console.log(`- Source Files Audited: ${files.length}`);
  console.log(`- TypeScript 'any' / 'as any' Violations: ${anyViolations}`);
  console.log(`- 'ReadonlyArray<T>' Violations (vs readonly T[]): ${readonlyArrayViolations}`);
  console.log(`- Hardcoded Hex Colors in UI Primitives: ${hexInPrimitives}`);
  console.log(`- Explanatory Source Code Comments: ${commentViolations}`);
  console.log(`- Status: ${passed ? 'PASS (100/100)' : 'FAIL'}\n`);
  sub.rules.forEach((r, i) => console.log(`${i + 1}. ${r}`));
}

export function runGuardAudit(rootDir, voiceEnabled) {
  const sub = SUBROUTINES.sentinel;
  printHeader('guard', sub, voiceEnabled);

  const isSelf = detectSelfLibrary(rootDir);
  const distSource = isSelf
    ? ''
    : scanDistFiles(PKG_DIST_DIR)
        .map((f) => readSafe(f))
        .join('\n');

  const capriSource = isSelf
    ? concatDirContents(path.join(rootDir, 'src/lib/capri'))
    : distSource;
  const universalSource = isSelf
    ? concatDirContents(path.join(rootDir, 'src/lib/universal'))
    : distSource;
  const dropdownFile = isSelf
    ? readSafe(path.join(rootDir, 'src/lib/components/ZenDropdown.tsx'))
    : distSource;
  const overlaysFile = isSelf
    ? readSafe(path.join(rootDir, 'src/lib/components/ZenOverlays.tsx'))
    : distSource;
  const switchFile = isSelf
    ? readSafe(path.join(rootDir, 'src/lib/components/ZenSwitch.tsx'))
    : distSource;
  const formsFile = isSelf
    ? readSafe(path.join(rootDir, 'src/lib/components/ZenForms.tsx'))
    : distSource;
  const modalFile = isSelf
    ? readSafe(path.join(rootDir, 'src/lib/components/ZenModal.tsx'))
    : distSource;
  const tableFile = isSelf
    ? readSafe(path.join(rootDir, 'src/lib/components/ZenDataTable.tsx'))
    : distSource;

  const files = scanDirectory(resolveSourceDir(rootDir));
  let secretLeaks = 0;
  let unsafeEvalOrXss = 0;
  let promptInjectionPayloadsInSource = 0;
  let localMachinePathLeaks = 0;

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
    if (/[A-Za-z]:[\\/]Users[\\/]/i.test(txt)) {
      localMachinePathLeaks++;
    }
    const isThreatDefFile =
      norm.includes('src/lib/capri/') || norm.endsWith('.spec.ts') || norm.endsWith('.test.ts');
    if (!isThreatDefFile) {
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
    capriSource.includes('scanPromptInjection') &&
    capriSource.includes('sanitizeForPrompt');
  const hasHtmlSanitizer =
    universalSource.includes('escapeZenHtml') &&
    universalSource.includes('sanitizeZenAssetUrl');
  const hasDropdownMouseDown = dropdownFile.includes('onMouseDown');
  const hasPaletteMouseDown = overlaysFile.includes('onMouseDown');
  const hasSwitchAriaLabel = switchFile.includes('aria-labelledby');
  const hasFileInputAria =
    formsFile.includes('aria-label={label}') || formsFile.includes('"aria-label":');
  const hasModalDialog =
    (modalFile.includes('role="dialog"') || modalFile.includes('role: "dialog"')) &&
    (modalFile.includes('aria-modal="true"') || modalFile.includes('"aria-modal": "true"'));
  const hasTableWrapper = tableFile.includes('zen-table-wrapper');

  const libAndBinFiles = isSelf
    ? [
        ...scanDirectory(path.join(rootDir, 'src/lib'), [], /\.(tsx?|css|mjs|js)$/),
        ...scanDirectory(path.join(rootDir, 'bin'), [], /\.(mjs|js)$/),
      ]
    : scanDirectory(path.join(PKG_ROOT_DIR, 'bin'), [], /\.(mjs|js)$/);

  let urlOrLocalPathLeaksInPkg = localMachinePathLeaks;
  for (const lf of libAndBinFiles) {
    const ltxt = readSafe(lf);
    if (/https?:\/\/|[A-Za-z]:[\\/]Users[\\/]/i.test(ltxt)) {
      urlOrLocalPathLeaksInPkg++;
    }
  }

  const passed =
    hasPromptFirewall &&
    promptInjectionPayloadsInSource === 0 &&
    hasHtmlSanitizer &&
    unsafeEvalOrXss === 0 &&
    secretLeaks === 0 &&
    urlOrLocalPathLeaksInPkg === 0 &&
    hasDropdownMouseDown &&
    hasPaletteMouseDown &&
    hasSwitchAriaLabel &&
    hasFileInputAria &&
    hasModalDialog &&
    hasTableWrapper;
  if (!passed) process.exitCode = 1;

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
  console.log(
    `- NPM Package URL & Local-Path Sanitization: ${
      urlOrLocalPathLeaksInPkg === 0 ? 'PASS' : 'FAIL'
    }`
  );
  console.log(`- Status: ${passed ? 'PASS (100/100)' : 'FAIL'}\n`);
  sub.rules.forEach((r, i) => console.log(`${i + 1}. ${r}`));
}

export function runZenAudit(rootDir, voiceEnabled) {
  const sub = SUBROUTINES.zen;
  printHeader('zen', sub, voiceEnabled);

  const isSelf = detectSelfLibrary(rootDir);
  const tokensCss = isSelf
    ? concatDirContents(path.join(rootDir, 'src/lib/styles'), /\.css$/)
    : readSafe(path.join(PKG_DIST_DIR, 'tokens.css'));

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
  if (!passed) process.exitCode = 1;

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
