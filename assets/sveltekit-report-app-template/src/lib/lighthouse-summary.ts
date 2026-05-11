type LighthouseCategoryScores = {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
};

type LighthouseMetrics = {
  firstContentfulPaintMs: number;
  largestContentfulPaintMs: number;
  speedIndexMs: number;
  totalBlockingTimeMs: number;
  cumulativeLayoutShift: number;
  timeToFirstByteMs: number;
};

type LighthouseOpportunity = {
  title: string;
  displayValue: string;
  description: string;
};

export type LighthouseSummary = {
  status: 'success' | 'failed';
  url: string;
  capturedAt: string;
  formFactor: string;
  scores: LighthouseCategoryScores;
  metrics: LighthouseMetrics;
  opportunities: LighthouseOpportunity[];
  runtimeError?: {
    code: string;
    message: string;
  };
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function isOpportunity(value: unknown): value is LighthouseOpportunity {
  return (
    isRecord(value) &&
    typeof value.title === 'string' &&
    typeof value.displayValue === 'string' &&
    typeof value.description === 'string'
  );
}

function isScoreBlock(value: unknown): value is LighthouseCategoryScores {
  return (
    isRecord(value) &&
    isFiniteNumber(value.performance) &&
    isFiniteNumber(value.accessibility) &&
    isFiniteNumber(value.bestPractices) &&
    isFiniteNumber(value.seo)
  );
}

function isMetricBlock(value: unknown): value is LighthouseMetrics {
  return (
    isRecord(value) &&
    isFiniteNumber(value.firstContentfulPaintMs) &&
    isFiniteNumber(value.largestContentfulPaintMs) &&
    isFiniteNumber(value.speedIndexMs) &&
    isFiniteNumber(value.totalBlockingTimeMs) &&
    isFiniteNumber(value.cumulativeLayoutShift) &&
    isFiniteNumber(value.timeToFirstByteMs)
  );
}

export function parseLighthouseSummary(value: unknown): LighthouseSummary | null {
  if (!isRecord(value)) {
    return null;
  }

  if (
    value.status !== 'success' &&
    value.status !== 'failed'
  ) {
    return null;
  }

  if (
    typeof value.url !== 'string' ||
    typeof value.capturedAt !== 'string' ||
    typeof value.formFactor !== 'string' ||
    !isScoreBlock(value.scores) ||
    !isMetricBlock(value.metrics) ||
    !Array.isArray(value.opportunities) ||
    !value.opportunities.every(isOpportunity)
  ) {
    return null;
  }

  return {
    status: value.status,
    url: value.url,
    capturedAt: value.capturedAt,
    formFactor: value.formFactor,
    scores: value.scores,
    metrics: value.metrics,
    opportunities: value.opportunities,
    runtimeError:
      isRecord(value.runtimeError) &&
      typeof value.runtimeError.code === 'string' &&
      typeof value.runtimeError.message === 'string'
        ? {
            code: value.runtimeError.code,
            message: value.runtimeError.message
          }
        : undefined
  };
}

const summaryModules = import.meta.glob('./content/lighthouse-homepage.json', {
  eager: true
}) as Record<string, { default: unknown }>;

export const lighthouseSummary = parseLighthouseSummary(
  summaryModules['./content/lighthouse-homepage.json']?.default ?? null
);
