#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const REPO_EXECUTIVE_SUMMARIES = {
  'zeN-UI':
    'Universal Multi-Polarity Design System (`@zen-ui-capri/system` v1.1.7), 51 UI modules, 40 vector icons, 8 Dark/Light themes, Three.js WebGL Cosmos, Web Audio Synth, W3C Custom Elements, and the `Capri` AI Co-Pilot CLI (`https://ui.lpabst.dev`).',
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
    '- **`https://ui.lpabst.dev` (`zen-ui-web`):** `@zen-ui-capri/system // CAPRI v1.1.7` Design System Showcase & 51-Module Storybook (`zeN-UI` repo).',
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

export function runWorkspaceSync(
  workspaceDir,
  writeEnabled,
  { analyzeRepo, generateStaticDocu }
) {
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
    const customSummary = REPO_EXECUTIVE_SUMMARIES[entry.name];
    const info = analyzeRepo(repoPath, customSummary);
    repoInfos.push(info);
    const docContent = generateStaticDocu(repoPath, customSummary);
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
}

export function runNpmRelease(rootDir, mode) {
  if (mode === 'publish-npm') {
    console.log('Running Capri all-subroutine audit & production build...');
    execSync('npm run capri -- all && npm run build', {
      cwd: rootDir,
      stdio: 'inherit',
    });
    console.log('Publishing @zen-ui-capri/system...');
    execSync('npm publish --access public --ignore-scripts --auth-type=web', {
      cwd: rootDir,
      stdio: 'inherit',
    });
  } else {
    execSync('npm pack --ignore-scripts', {
      cwd: rootDir,
      stdio: 'inherit',
    });
  }
}
