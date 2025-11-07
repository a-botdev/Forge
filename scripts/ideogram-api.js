#!/usr/bin/env node
import { mkdir, writeFile, appendFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import fetch from 'node-fetch';

const IDEOGRAM_ENDPOINT = 'https://api.ideogram.ai/v1/images';
const OUTPUT_ROOT = path.resolve('outputs');

function parseArgs(argv) {
  const args = {};

  for (let i = 0; i < argv.length; i += 1) {
    const current = argv[i];
    if (!current.startsWith('--')) continue;

    const key = current.slice(2);
    const next = argv[i + 1];

    if (typeof next === 'undefined' || next.startsWith('--')) {
      args[key] = true;
      continue;
    }

    args[key] = next;
    i += 1;
  }

  return args;
}

function invariant(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function callIdeogram({ prompt, aspect, apiKey }) {
  const response = await fetch(IDEOGRAM_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      prompt,
      aspect_ratio: aspect ?? '1:1'
    })
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Ideogram API error ${response.status}: ${errorBody}`);
  }

  const payload = await response.json();
  const [{ url }] = payload.data ?? [];

  invariant(url, 'Ideogram API returned no image URL.');

  const imageResponse = await fetch(url);

  if (!imageResponse.ok) {
    throw new Error(`Failed to download Ideogram image: ${imageResponse.statusText}`);
  }

  const buffer = Buffer.from(await imageResponse.arrayBuffer());

  return { buffer, metadata: payload };
}

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true });
  return dir;
}

async function appendRunLog(entry) {
  const logPath = path.join(OUTPUT_ROOT, 'run-log.md');
  const timestamp = new Date().toISOString();
  const header = `\n## Ideogram Run — ${timestamp}\n`;
  await ensureDir(OUTPUT_ROOT);
  await appendFile(logPath, `${header}${entry}\n`, { encoding: 'utf8' });
}

async function main() {
  try {
    const args = parseArgs(process.argv.slice(2));
    const prompt = args.prompt;
    const outDir = args.outDir ?? 'outputs/images/raw';
    const aspect = args.aspect ?? '1:1';
    const slug = args.slug ?? 'forge';
    const apiKey = process.env.IDEOGRAM_API_KEY;

    invariant(prompt, 'Missing required --prompt argument.');
    invariant(apiKey, 'IDEOGRAM_API_KEY environment variable is not set.');

    const outputDir = await ensureDir(path.resolve(outDir));
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `${slug}-${timestamp}-${randomUUID().slice(0, 8)}.png`;
    const filePath = path.join(outputDir, fileName);

    console.log(`Generating Ideogram image for prompt: ${prompt}`);
    const { buffer, metadata } = await callIdeogram({ prompt, aspect, apiKey });

    await writeFile(filePath, buffer);
    console.log(`Saved image to ${filePath}`);

    const logEntry = [
      `**Prompt:** ${prompt}`,
      `**Aspect Ratio:** ${aspect}`,
      `**Output:** ${path.relative(OUTPUT_ROOT, filePath)}`,
      '```json',
      JSON.stringify(metadata, null, 2),
      '```'
    ].join('\n');

    await appendRunLog(logEntry);
  } catch (error) {
    console.error('[Forge:Ideogram] Error:', error.message);
    if (process.env.DEBUG) {
      console.error(error);
    }
    process.exitCode = 1;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

