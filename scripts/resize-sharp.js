#!/usr/bin/env node
import { mkdir, appendFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const OUTPUT_ROOT = path.resolve('outputs');

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith('--')) continue;
    const key = token.slice(2);
    const value = argv[i + 1];
    if (typeof value === 'undefined' || value.startsWith('--')) {
      args[key] = true;
      continue;
    }
    args[key] = value;
    i += 1;
  }
  return args;
}

function parseSizes(input) {
  if (!input) return [1024, 512, 256, 128];
  return input
    .split(',')
    .map((size) => Number.parseInt(size.trim(), 10))
    .filter((size) => Number.isFinite(size) && size > 0);
}

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true });
  return dir;
}

async function appendRunLog(entry) {
  const logPath = path.join(OUTPUT_ROOT, 'run-log.md');
  await ensureDir(OUTPUT_ROOT);
  await appendFile(logPath, `${entry}\n`, { encoding: 'utf8' });
}

async function resizeImage({ inputPath, sizes, slug }) {
  const baseName = slug ?? path.parse(inputPath).name;
  const outputs = [];

  for (const size of sizes) {
    const targetDir = await ensureDir(path.join(OUTPUT_ROOT, 'images', 'final', String(size)));
    const pngPath = path.join(targetDir, `${baseName}.png`);
    const webpPath = path.join(targetDir, `${baseName}.webp`);

    const pipeline = sharp(inputPath).resize(size, size, {
      fit: 'cover',
      position: 'centre'
    });

    await pipeline.clone().png({ quality: 95, compressionLevel: 9 }).toFile(pngPath);
    await pipeline.clone().webp({ quality: 95 }).toFile(webpPath);

    outputs.push({
      size,
      png: path.relative(OUTPUT_ROOT, pngPath),
      webp: path.relative(OUTPUT_ROOT, webpPath)
    });
  }

  return outputs;
}

async function main() {
  try {
    const args = parseArgs(process.argv.slice(2));
    const input = args.input ?? args.file;
    if (!input) {
      throw new Error('Missing required --input <path> argument.');
    }

    const resolvedInput = path.resolve(input);
    const sizes = parseSizes(args.sizes);
    const slug = args.slug ?? undefined;

    console.log(`Resizing ${resolvedInput} to sizes: ${sizes.join(', ')}`);
    const outputs = await resizeImage({ inputPath: resolvedInput, sizes, slug });
    console.log('Generated assets:', outputs);

    const logEntry = [
      '\n## Sharp Resize',
      `**Source:** ${path.relative(OUTPUT_ROOT, resolvedInput)}`,
      `**Sizes:** ${sizes.join(', ')}`,
      '```json',
      JSON.stringify(outputs, null, 2),
      '```'
    ].join('\n');

    await appendRunLog(logEntry);
  } catch (error) {
    console.error('[Forge:Sharp] Error:', error.message);
    if (process.env.DEBUG) {
      console.error(error);
    }
    process.exitCode = 1;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

