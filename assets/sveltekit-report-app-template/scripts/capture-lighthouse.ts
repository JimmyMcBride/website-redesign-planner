import { spawn } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from 'playwright';
import { reportMeta } from '../src/lib/report-data';
import type { LighthouseSummary } from '../src/lib/lighthouse-summary';

type LighthouseAudit = {
  title?: string;
  description?: string;
  displayValue?: string;
  numericValue?: number;
  details?: {
    type?: string;
    overallSavingsMs?: number;
  };
};

type LighthouseReport = {
  requestedUrl?: string;
  finalUrl?: string;
  fetchTime?: string;
  configSettings?: {
    formFactor?: string;
  };
  categories?: Record<string, { score?: number | null }>;
  audits?: Record<string, LighthouseAudit>;
};

const rawReportPath = resolve('research/lighthouse/homepage.report.json');
const summaryPath = resolve('src/lib/content/lighthouse-homepage.json');
const url = reportMeta.sourceSite.url.trim();

if (!/^https?:\/\//.test(url)) {
  throw new Error(
    `Set reportMeta.sourceSite.url in src/lib/report-data.ts to the real homepage before running capture:lighthouse. Received: "${reportMeta.sourceSite.url}"`
  );
}

async function runLighthouse(targetUrl: string) {
  const chromePath = chromium.executablePath();
  const binary =
    process.platform === 'win32'
      ? resolve('node_modules/.bin/lighthouse.cmd')
      : resolve('node_modules/.bin/lighthouse');

  const args = [
    targetUrl,
    '--output=json',
    `--output-path=${rawReportPath}`,
    '--quiet',
    '--form-factor=mobile',
    '--screenEmulation.mobile=true',
    '--screenEmulation.width=390',
    '--screenEmulation.height=844',
    '--screenEmulation.deviceScaleFactor=2',
    '--only-categories=performance,accessibility,best-practices,seo',
    '--chrome-flags=--headless=new'
  ];

  await new Promise<void>((resolveRun, rejectRun) => {
    const child = spawn(binary, args, {
      env: {
        ...process.env,
        CHROME_PATH: chromePath
      },
      stdio: ['ignore', 'pipe', 'pipe']
    });

    let logs = '';

    child.stdout.on('data', (chunk) => {
      logs += chunk.toString();
    });

    child.stderr.on('data', (chunk) => {
      logs += chunk.toString();
    });

    child.on('error', (error) => {
      rejectRun(error);
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolveRun();
        return;
      }

      rejectRun(new Error(`Lighthouse exited with code ${code ?? 'unknown'}\n${logs}`));
    });
  });
}

function roundMetric(value: number, digits = 0): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function getScore(report: LighthouseReport, key: string): number {
  const score = report.categories?.[key]?.score;
  return typeof score === 'number' ? Math.round(score * 100) : 0;
}

function getMetric(report: LighthouseReport, ...auditIds: string[]): number {
  for (const auditId of auditIds) {
    const value = report.audits?.[auditId]?.numericValue;
    if (typeof value === 'number' && Number.isFinite(value)) {
      return roundMetric(value);
    }
  }

  return 0;
}

function getShiftMetric(report: LighthouseReport, auditId: string): number {
  const value = report.audits?.[auditId]?.numericValue;
  return typeof value === 'number' && Number.isFinite(value) ? roundMetric(value, 3) : 0;
}

function getOpportunities(report: LighthouseReport): LighthouseSummary['opportunities'] {
  return Object.values(report.audits ?? {})
    .filter((audit) => audit.details?.type === 'opportunity')
    .sort((left, right) => (right.details?.overallSavingsMs ?? 0) - (left.details?.overallSavingsMs ?? 0))
    .slice(0, 4)
    .map((audit) => ({
      title: audit.title ?? 'Untitled opportunity',
      displayValue:
        audit.displayValue?.trim()
          ? audit.displayValue.trim()
          : typeof audit.details?.overallSavingsMs === 'number' && audit.details.overallSavingsMs > 0
            ? `${roundMetric(audit.details.overallSavingsMs)} ms potential savings`
            : 'Potential improvement',
      description: audit.description ?? 'Review this opportunity in the full Lighthouse report.'
    }));
}

function normalizeReport(report: LighthouseReport): LighthouseSummary {
  return {
    url: report.finalUrl ?? report.requestedUrl ?? url,
    capturedAt: report.fetchTime ?? new Date().toISOString(),
    formFactor: report.configSettings?.formFactor ?? 'mobile',
    scores: {
      performance: getScore(report, 'performance'),
      accessibility: getScore(report, 'accessibility'),
      bestPractices: getScore(report, 'best-practices'),
      seo: getScore(report, 'seo')
    },
    metrics: {
      firstContentfulPaintMs: getMetric(report, 'first-contentful-paint'),
      largestContentfulPaintMs: getMetric(report, 'largest-contentful-paint'),
      speedIndexMs: getMetric(report, 'speed-index'),
      totalBlockingTimeMs: getMetric(report, 'total-blocking-time'),
      cumulativeLayoutShift: getShiftMetric(report, 'cumulative-layout-shift'),
      timeToFirstByteMs: getMetric(report, 'server-response-time', 'network-server-latency', 'document-latency')
    },
    opportunities: getOpportunities(report)
  };
}

await mkdir(resolve('research/lighthouse'), { recursive: true });
await mkdir(resolve('src/lib/content'), { recursive: true });

await runLighthouse(url);

const rawReport = JSON.parse(await readFile(rawReportPath, 'utf8')) as LighthouseReport;
const summary = normalizeReport(rawReport);

await writeFile(summaryPath, `${JSON.stringify(summary, null, 2)}\n`);

console.log(`Saved Lighthouse report for ${summary.url}`);
console.log(`Raw report: ${rawReportPath}`);
console.log(`Summary: ${summaryPath}`);
