#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  SUBROUTINES,
  printHeader,
  scanTextForPromptInjection,
} from './lib/capri-subroutines.mjs';
import {
  runArchitectAudit,
  runGuardAudit,
  runOrionAudit,
  runZenAudit,
} from './lib/capri-audits.mjs';
import { analyzeRepo, generateStaticDocu } from './lib/capri-docu.mjs';

export { analyzeRepo, generateStaticDocu };

const isDirectExecution =
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isDirectExecution) {
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
  const maintainerScriptPath = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '../scripts/maintainer.mjs'
  );

  if (command === 'docu') {
    if (workspaceDir && fs.existsSync(workspaceDir) && fs.existsSync(maintainerScriptPath)) {
      const maintainer = await import(pathToFileURL(maintainerScriptPath).href);
      maintainer.runWorkspaceSync(workspaceDir, writeEnabled, {
        analyzeRepo,
        generateStaticDocu,
      });
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
        console.log(`Wrote Capri Architecture Dossier to: ${path.relative(targetPath, outFile).replace(/\\/g, '/')}`);
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
    console.log('## Prompt-Injection & Security Payload Scan');
    console.log(`- Safe: ${res.safe ? 'TRUE (CLEAN)' : 'FALSE (BLOCKED)'}`);
    console.log(`- Threats Detected: ${res.threats.length}`);
    for (const t of res.threats) {
      console.log(`  * [${t.category}] ${t.patternName}: "${t.snippet}"`);
    }
    console.log(`- Sanitized Output: ${res.sanitized}`);
  } else if (
    (command === 'pack-npm' || command === 'publish-npm') &&
    fs.existsSync(maintainerScriptPath)
  ) {
    const maintainer = await import(pathToFileURL(maintainerScriptPath).href);
    maintainer.runNpmRelease(rootDir, command);
  } else if (command === 'skill') {
    const rawKey = rawArg.toLowerCase();
    const key = rawKey === 'guard' ? 'sentinel' : rawKey;
    const sub = SUBROUTINES[key] || SUBROUTINES.orion;
    printHeader(rawKey, sub, voiceEnabled);
    sub.rules.forEach((r, i) => console.log(`${i + 1}. ${r}`));
  } else {
    console.log(`@zen-ui-capri/system // CAPRI AI Co-Pilot CLI (On-Demand · Zero Build Overhead)
Usage:
  npx capri docu [--write]                Generate static architecture, component & user-flow Markdown
  npx capri orion [--voice]               Run UI & Component Synthesis audit (51 modules, 48 icons)
  npx capri architect [--voice]           Run TypeScript & CSS Token Governance audit (zero any, zero hex)
  npx capri guard [--voice]               Run Security, Anti-Prompt-Injection, WCAG & Overflow Guard audit
  npx capri zen [--voice]                 Run 8-Theme Polarity & 60fps Motion audit
  npx capri all [--voice]                 Run all 4 audit subroutines (orion, architect, guard, zen)
  npx capri scan "<text>" [--voice]       Scan and sanitize untrusted text for prompt injection / XSS
  npx capri skill <subroutine> [--voice]  Print ruleset for: guard | orion | architect | sentinel | zen | docu`);
  }
}
