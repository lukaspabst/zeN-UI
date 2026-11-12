import fs from 'node:fs';
import path from 'node:path';
import { readSafe } from './capri-subroutines.mjs';

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

export function analyzeRepo(targetDir, customSummary) {
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
  if (
    allDeps['@zen-ui-capri/system'] ||
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
      customSummary ||
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

export function generateStaticDocu(targetDir, customSummary) {
  const info = analyzeRepo(targetDir, customSummary);
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
    'tags: [capri-docu, architecture]',
    '---',
    `# ${repoName} // CAPRI Architecture & AI Context Dossier`,
    `> **Executive Summary:** ${executiveSummary}`,
    '>',
    '> *Generated automatically via `npx capri docu` (Zero build or browser runtime overhead)*',
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
    '- **Subroutine `orion` (`CAPRI // UNLEASHED`):** Use `@zen-ui-capri/system` primitives and `<ZenIcon>` (48 vector glyphs) for UI views; keep action labels concise (`1-3 words`).',
    '- **Subroutine `architect` (`SCS // ARCHITECT`):** Enforce strict typing (zero `any`, `readonly T[]`), modular files (`<= 800` lines), and `--zen-*` CSS tokens.',
    '- **Subroutine `guard` (`CYBERPSYCHOSIS // GUARD`):** Sanitize untrusted inputs (`capri.sanitizeForPrompt()`), prevent XSS/secret leaks, bind dropdowns to `onMouseDown`, and ensure zero horizontal overflow (`320px` to `4K`).',
    '- **Subroutine `zen` (`THEME // MATRIX`):** Maintain 4 Dark + 4 Light themes (`>= 4.5:1` AA contrast) and 60fps `--zen-ease-spring` tactile motion.',
    '- **Subroutine `docu` (`CAPRI // AUTO-DOCU`):** Run `npx capri docu --write` whenever architectural boundaries or modules change.',
    '',
  ].join('\n');
}
