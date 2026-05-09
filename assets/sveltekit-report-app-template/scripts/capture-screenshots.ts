import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from 'playwright';
import { designSystems, examples } from '../src/lib/report-data';

const host = '127.0.0.1';
const port = Number(process.env.PORT ?? 4173);
const origin = `http://${host}:${port}`;
const outputDir = resolve('static/example-screenshots');

async function waitForServer(url: string, getLogs: () => string) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {
      // Server is still starting.
    }

    await new Promise((resolveWait) => setTimeout(resolveWait, 250));
  }

  throw new Error(`Timed out waiting for preview server at ${url}\n${getLogs()}`);
}

const server = spawn('bun', ['run', 'preview', '--', '--host', host, '--port', String(port)], {
  env: process.env,
  stdio: ['ignore', 'pipe', 'pipe']
});

let logs = '';
server.stdout.on('data', (chunk) => {
  logs += chunk.toString();
});
server.stderr.on('data', (chunk) => {
  logs += chunk.toString();
});

try {
  await mkdir(outputDir, { recursive: true });
  await waitForServer(origin, () => logs);

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 980 }, deviceScaleFactor: 1 });

  for (const system of designSystems) {
    for (const example of examples) {
      const url = `${origin}/examples/${example.id}/?system=${system.slug}`;
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.screenshot({
        path: resolve(outputDir, `example-${example.id}-${system.slug}.png`),
        fullPage: false
      });
      console.log(`Captured ${example.title} with ${system.name}`);
    }
  }

  await browser.close();
} finally {
  server.kill();
}
