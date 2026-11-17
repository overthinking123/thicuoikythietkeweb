import fs from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const ROOT = process.cwd();

const REQUIRED_FILES = [
  'index.html',
  'shop.html',
  'cart.html',
  'checkout.html',
  'css/style.css',
  'css/shop.css',
  'css/cart.css',
  'css/responsive.css',
  'js/main.js',
  'js/i18n.js',
  'js/products.js',
  'js/cart.js',
  'js/checkout.js',
  'js/search.js',
  'js/recommendations.js',
  'assets/images/hero_nova_studio.jpg',
  'assets/images/prod_monolith_speaker.jpg',
  'assets/images/prod_arc_lamp.jpg',
  'assets/images/prod_chrono_clock.jpg',
  'assets/images/prod_studio_headphones.jpg',
  'assets/images/prod_modular_dock.jpg',
  'assets/images/prod_ambient_lantern.jpg',
];

const FORBIDDEN_EXTENSIONS = new Set(['.ts', '.tsx', '.jsx']);
const IGNORED_DIRS = new Set(['node_modules', '.git', '.playwright-cli', '.aistudio']);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (IGNORED_DIRS.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

async function main() {
  for (const rel of REQUIRED_FILES) {
    try {
      await fs.access(path.join(ROOT, rel));
    } catch {
      throw new Error(`Missing required file: ${rel}`);
    }
  }

  const allFiles = await walk(ROOT);
  const jsFiles = [];
  for (const file of allFiles) {
    const ext = path.extname(file).toLowerCase();
    if (FORBIDDEN_EXTENSIONS.has(ext)) {
      throw new Error(`Forbidden TypeScript/JSX file detected: ${path.relative(ROOT, file)}`);
    }
    if (ext === '.js' || ext === '.mjs') {
      jsFiles.push(file);
    }
  }

  for (const jsFile of jsFiles) {
    await execFileAsync(process.execPath, ['--check', jsFile]);
  }

  const { stdout, stderr } = await execFileAsync(process.execPath, ['--test', 'tests/shop.test.js']);
  if (stdout) process.stdout.write(stdout);
  if (stderr) process.stderr.write(stderr);

  console.log(`Verified ${REQUIRED_FILES.length} required files and ${jsFiles.length} ES6+ JS modules with zero TypeScript/React/JSX.`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
