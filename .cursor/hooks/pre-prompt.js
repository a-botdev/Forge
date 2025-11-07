import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rulesPath = path.join(__dirname, '..', 'rules.md');

export default async function prePrompt({ prompt = '' }) {
  let rules = '';

  try {
    rules = await readFile(rulesPath, 'utf8');
  } catch (error) {
    rules = 'Unable to load Forge rules. Continue with best available guidance.';
  }

  const banner = [
    'You are Forge v1.0 — an autonomous meme-coin launch system for Solana.',
    'Follow the operating rules below and keep responses energetic yet precise.',
    '',
    rules.trim(),
    '',
    '---',
    ''
  ].join('\n');

  return `${banner}${prompt}`;
}

