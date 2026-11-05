#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

function generateMasterWorkspaceIndex(repoInfos, workspaceDir) {
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
    'title: "Capri Master Workspace & Repository Index"',
    'tags: [capri-vault, moc, workspace-index, architecture]',
    '---',
    '# 000 — Capri Master Workspace & Repository Index',
    '> **Instant AI Context Map for Coding Agents**',
    `> Covers **${repoInfos.length} repositories**, **${totalFiles.toLocaleString(
      'en-US'
    )} source files**, and **${totalLoc.toLocaleString(
      'en-US'
    )} lines of code** across \`${workspaceDir}\`.`,
    '',
    '## 1. Master Repository Matrix',
    '| Repository Note | Files | LOC | Primary Tech Stack | Executive Purpose |',
    '| :--- | ---: | ---: | :--- | :--- |',
    ...tableRows,
    '',
    '## 2. Per-Repository Instant Context Briefs',
    ...detailBlocks,
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
    }
    summaryRows.push(
      `- **${entry.name}**: \`${outFile}\` (${info.allFiles.length} source files · ${info.totalLoc.toLocaleString('en-US')} LOC · ${info.subProjects.length} sub-projects)`
    );
  }

  const vaultArgIdx = process.argv.indexOf('--vault');
  const vaultDir =
    vaultArgIdx !== -1 && process.argv[vaultArgIdx + 1]
      ? path.resolve(process.argv[vaultArgIdx + 1])
      : null;

  if (writeEnabled && vaultDir && fs.existsSync(vaultDir)) {
    const reposIndexDir = path.join(vaultDir, 'repos-index');
    fs.mkdirSync(reposIndexDir, { recursive: true });
    for (const info of repoInfos) {
      const docContent = generateStaticDocu(info.absDir);
      fs.writeFileSync(
        path.join(reposIndexDir, `${info.repoName}.md`),
        docContent,
        'utf8'
      );
    }
    const masterIndexContent = generateMasterWorkspaceIndex(
      repoInfos,
      workspaceDir
    );
    const masterIndexPath = path.join(
      vaultDir,
      '000-Master-Workspace-Index.md'
    );
    fs.writeFileSync(masterIndexPath, masterIndexContent, 'utf8');
    summaryRows.push(
      `- **Master Obsidian Vault Index**: \`${masterIndexPath}\` (Synced ${repoInfos.length} repos)`
    );
  }

  console.log(
    `# CAPRI // AUTO-DOCU — Workspace Sync Complete (${entries.length} Repositories)\n`
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
