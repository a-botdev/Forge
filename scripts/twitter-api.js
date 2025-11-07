#!/usr/bin/env node
import { readFile, appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { TwitterApi } from 'twitter-api-v2';

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

function parseThreadMarkdown(markdown) {
  return markdown
    .split(/\n-{3,}\n/g) // allow --- separators
    .flatMap((chunk) => chunk.split(/\n{2,}/g))
    .map((tweet) => tweet.trim())
    .filter(Boolean);
}

function getTwitterClient() {
  const apiKey = process.env.TWITTER_API_KEY;
  const apiSecret = process.env.TWITTER_API_SECRET;
  const accessToken = process.env.TWITTER_ACCESS_TOKEN;
  const accessSecret = process.env.TWITTER_ACCESS_SECRET;

  if (!apiKey || !apiSecret || !accessToken || !accessSecret) {
    throw new Error('Missing Twitter API credentials in environment variables.');
  }

  return new TwitterApi({
    appKey: apiKey,
    appSecret: apiSecret,
    accessToken,
    accessSecret
  });
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

async function previewThread(filePath) {
  const content = await readFile(filePath, 'utf8');
  const tweets = parseThreadMarkdown(content);
  if (!tweets.length) {
    throw new Error(`No tweets found in ${filePath}`);
  }

  console.log(`Previewing ${tweets.length} tweets from ${filePath}\n`);
  tweets.forEach((tweet, index) => {
    const chars = [...tweet].length;
    const status = chars <= 280 ? '✅' : '❌';
    console.log(`Tweet ${index + 1} (${chars} chars) ${status}`);
    console.log(tweet);
    console.log('---');
  });
}

async function publishThread(filePath) {
  const client = getTwitterClient();
  const content = await readFile(filePath, 'utf8');
  const tweets = parseThreadMarkdown(content);

  if (!tweets.length) {
    throw new Error(`No tweets found in ${filePath}`);
  }

  console.log(`Publishing ${tweets.length} tweets...`);
  const { v2 } = client;
  let replyToId;
  const responses = [];

  for (const tweet of tweets) {
    const payload = await v2.tweet({
      text: tweet,
      reply: replyToId ? { in_reply_to_tweet_id: replyToId } : undefined
    });

    replyToId = payload.data?.id;
    responses.push(payload);
    console.log(`Posted tweet ${replyToId}`);
  }

  const logEntry = [
    '\n## Twitter Publish',
    `**Source:** ${path.relative(OUTPUT_ROOT, filePath)}`,
    '```json',
    JSON.stringify(responses, null, 2),
    '```'
  ].join('\n');

  await appendRunLog(logEntry);
}

async function main() {
  try {
    const args = parseArgs(process.argv.slice(2));
    const file = args.file ?? args.path ?? args.input ?? path.join('outputs', 'social', 'thread.md');

    if (args.preview) {
      await previewThread(path.resolve(file));
      return;
    }

    if (args.publish && typeof args.publish === 'string') {
      await publishThread(path.resolve(args.publish));
      return;
    }

    if (args.publish === true) {
      await publishThread(path.resolve(file));
      return;
    }

    console.log('Usage:');
    console.log('  node scripts/twitter-api.js --preview [--file outputs/social/thread.md]');
    console.log('  node scripts/twitter-api.js --publish <path-to-thread.md>');
  } catch (error) {
    console.error('[Forge:Twitter] Error:', error.message);
    if (process.env.DEBUG) {
      console.error(error);
    }
    process.exitCode = 1;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

