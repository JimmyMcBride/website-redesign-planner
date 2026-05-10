<script lang="ts">
  import { AlertTriangle, CheckCircle2, ExternalLink, Gauge, Wrench } from 'lucide-svelte';
  import { lighthouseSummary } from '$lib/lighthouse-summary';
  import { auditFindings, reportMeta } from '$lib/report-data';

  const scoreCards = lighthouseSummary
    ? [
        { label: 'Performance', value: lighthouseSummary.scores.performance },
        { label: 'Accessibility', value: lighthouseSummary.scores.accessibility },
        { label: 'Best Practices', value: lighthouseSummary.scores.bestPractices },
        { label: 'SEO', value: lighthouseSummary.scores.seo }
      ]
    : [];

  const metricCards = lighthouseSummary
    ? [
        { label: 'First Contentful Paint', value: formatMilliseconds(lighthouseSummary.metrics.firstContentfulPaintMs) },
        { label: 'Largest Contentful Paint', value: formatMilliseconds(lighthouseSummary.metrics.largestContentfulPaintMs) },
        { label: 'Speed Index', value: formatMilliseconds(lighthouseSummary.metrics.speedIndexMs) },
        { label: 'Total Blocking Time', value: formatMilliseconds(lighthouseSummary.metrics.totalBlockingTimeMs) },
        { label: 'Cumulative Layout Shift', value: formatShift(lighthouseSummary.metrics.cumulativeLayoutShift) },
        { label: 'Time to First Byte', value: formatMilliseconds(lighthouseSummary.metrics.timeToFirstByteMs) }
      ]
    : [];

  const auditUrl = lighthouseSummary?.url ?? reportMeta.sourceSite.url;
  const auditCapturedAt = lighthouseSummary?.capturedAt ?? reportMeta.sourceSite.lastAuditedAt;

  function formatMilliseconds(value: number): string {
    return `${Math.round(value).toLocaleString()} ms`;
  }

  function formatShift(value: number): string {
    return value.toFixed(3);
  }

  function formatCapturedAt(value: string): string {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
  }

  function scoreColor(score: number): string {
    if (score >= 90) {
      return '#0f6a59';
    }

    if (score >= 50) {
      return '#b7791f';
    }

    return '#b34e2b';
  }
</script>

<svelte:head>
  <title>Audit | {reportMeta.businessName}</title>
</svelte:head>

<section class="grid gap-8">
  <div class="grid gap-4 py-8">
    <p class="eyebrow">Audit</p>
    <h1 class="max-w-4xl text-4xl font-black leading-tight md:text-6xl">Current-site issues and rebuild priorities</h1>
    <p class="max-w-3xl text-lg" style="color: var(--system-muted)">
      Replace these sample findings with source-site evidence, screenshots, SEO observations, accessibility notes, and priority fixes.
    </p>
  </div>

  <section class="surface grid gap-5 p-5">
    <div class="flex flex-wrap items-start justify-between gap-4">
      <div class="grid gap-3">
        <div class="flex items-center gap-3">
          <Gauge size={24} style="color: var(--system-primary)" aria-hidden="true" />
          <div>
            <p class="eyebrow">Lighthouse snapshot</p>
            <h2 class="text-2xl font-black">Homepage technical baseline</h2>
          </div>
        </div>
        <p class="max-w-3xl text-sm" style="color: var(--system-muted)">
          Use Lighthouse to ground performance, accessibility, best-practice, and SEO observations with repeatable homepage metrics.
        </p>
      </div>
      <div class="soft-surface grid gap-2 p-4 text-sm">
        <p class="font-bold">Audited homepage</p>
        <a class="inline-flex items-center gap-2 break-all font-medium" href={auditUrl} rel="noreferrer" target="_blank">
          {auditUrl}
          <ExternalLink size={14} aria-hidden="true" />
        </a>
        <p style="color: var(--system-muted)">Captured {formatCapturedAt(auditCapturedAt)}</p>
      </div>
    </div>

    {#if lighthouseSummary}
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {#each scoreCards as score}
          <article class="soft-surface grid gap-2 p-4">
            <p class="eyebrow">{score.label}</p>
            <p class="text-4xl font-black" style={`color: ${scoreColor(score.value)}`}>{score.value}</p>
            <p class="text-sm" style="color: var(--system-muted)">Score out of 100 from the latest mobile Lighthouse run.</p>
          </article>
        {/each}
      </div>

      <div class="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <section class="grid gap-4">
          <div class="flex items-center gap-3">
            <CheckCircle2 size={22} style="color: var(--system-primary)" aria-hidden="true" />
            <h3 class="text-xl font-black">Key lab metrics</h3>
          </div>
          <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {#each metricCards as metric}
              <article class="card grid gap-1 p-4">
                <p class="text-sm font-bold">{metric.label}</p>
                <p class="text-2xl font-black">{metric.value}</p>
              </article>
            {/each}
          </div>
        </section>

        <section class="grid gap-4">
          <div class="flex items-center gap-3">
            <Wrench size={22} style="color: var(--system-primary)" aria-hidden="true" />
            <h3 class="text-xl font-black">Top technical opportunities</h3>
          </div>
          <div class="grid gap-3">
            {#if lighthouseSummary.opportunities.length > 0}
              {#each lighthouseSummary.opportunities as opportunity}
                <article class="card grid gap-2 p-4">
                  <div class="flex items-start justify-between gap-3">
                    <h4 class="font-black">{opportunity.title}</h4>
                    <span class="rounded-md px-2 py-1 text-xs font-black" style="background: var(--system-surface-alt); color: var(--system-primary)">
                      {opportunity.displayValue}
                    </span>
                  </div>
                  <p class="text-sm" style="color: var(--system-muted)">{opportunity.description}</p>
                </article>
              {/each}
            {:else}
              <p class="soft-surface p-4 text-sm" style="color: var(--system-muted)">
                Lighthouse did not return prioritized opportunities in this run. Use the raw JSON report for deeper review.
              </p>
            {/if}
          </div>
        </section>
      </div>
    {:else}
      <div class="soft-surface grid gap-3 p-5">
        <p class="text-lg font-black">No Lighthouse snapshot captured yet.</p>
        <p style="color: var(--system-muted)">
          Update `reportMeta.sourceSite.url` in `src/lib/report-data.ts`, then run `bun run capture:lighthouse` to generate
          `research/lighthouse/homepage.report.json` and `src/lib/content/lighthouse-homepage.json`.
        </p>
      </div>
    {/if}
  </section>

  <div class="grid gap-4">
    {#each auditFindings as finding}
      <article class="card grid gap-4 p-5 md:grid-cols-[120px_1fr]">
        <div>
          <span class="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-black text-white" style="background: var(--system-primary)">
            <AlertTriangle size={16} aria-hidden="true" />
            {finding.priority}
          </span>
        </div>
        <div class="grid gap-2">
          <p class="eyebrow">{finding.category}</p>
          <h2 class="text-2xl font-black">{finding.title}</h2>
          <p style="color: var(--system-muted)">{finding.detail}</p>
        </div>
      </article>
    {/each}
  </div>

  <section class="surface grid gap-4 p-5">
    <div class="flex items-center gap-3">
      <CheckCircle2 size={24} style="color: var(--system-primary)" aria-hidden="true" />
      <h2 class="text-2xl font-black">Acceptance criteria for the rebuild</h2>
    </div>
    <div class="grid gap-3 md:grid-cols-2">
      <p class="soft-surface p-4">Every primary CTA is paired with proof or expectation-setting copy.</p>
      <p class="soft-surface p-4">Service, location, and FAQ pages have clear search-intent ownership.</p>
      <p class="soft-surface p-4">Forms include labels, visible focus states, and reduced-motion support.</p>
      <p class="soft-surface p-4">Trust signals are sequenced by buyer risk, not scattered as decoration.</p>
    </div>
  </section>
</section>
