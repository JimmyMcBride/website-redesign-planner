<script lang="ts">
  import { base } from '$app/paths';
  import { ArrowRight, Search, Target, Trophy } from 'lucide-svelte';
  import { pathWithSystem, selectedSystemSlug } from '$lib/design-system-state';
  import { analysis, businessProfile, reportMeta } from '$lib/report-data';
</script>

<section class="grid gap-8">
  <div class="grid gap-5 py-8">
    <p class="eyebrow">Analysis</p>
    <h1 class="max-w-4xl text-4xl font-black leading-tight md:text-6xl">{reportMeta.businessName} competitive website analysis</h1>
    <p class="max-w-3xl text-lg md:text-xl" style="color: var(--system-muted)">{reportMeta.summary}</p>
    <div class="flex flex-wrap gap-3">
      <a class="primary-cta inline-flex items-center gap-2 px-5 py-3 font-bold" href={`${base}${pathWithSystem('/examples/', $selectedSystemSlug)}`}>
        Review homepage examples
        <ArrowRight size={18} aria-hidden="true" />
      </a>
      <a class="secondary-cta inline-flex items-center gap-2 px-5 py-3 font-bold" href={`${base}${pathWithSystem('/design-systems/', $selectedSystemSlug)}`}>
        Compare systems
      </a>
    </div>
  </div>

  <section class="surface grid gap-5 p-5">
    <div class="flex items-start gap-3">
      <Target size={26} style="color: var(--system-primary)" aria-hidden="true" />
      <div>
        <p class="eyebrow">Primary recommendation</p>
        <h2 class="mt-1 text-3xl font-black">{analysis.recommendation}</h2>
      </div>
    </div>
    <div class="grid gap-4 md:grid-cols-3">
      <article class="soft-surface p-4">
        <strong>Offer</strong>
        <p class="mt-2 text-sm" style="color: var(--system-muted)">{businessProfile.offer}</p>
      </article>
      <article class="soft-surface p-4">
        <strong>Audience</strong>
        <p class="mt-2 text-sm" style="color: var(--system-muted)">{businessProfile.audience}</p>
      </article>
      <article class="soft-surface p-4">
        <strong>Conversion goal</strong>
        <p class="mt-2 text-sm" style="color: var(--system-muted)">{businessProfile.conversionGoal}</p>
      </article>
    </div>
  </section>

  <section class="grid gap-4">
    <div class="flex items-center gap-3">
      <Search size={24} style="color: var(--system-primary)" aria-hidden="true" />
      <h2 class="text-2xl font-black">Research-backed insights</h2>
    </div>
    <div class="grid gap-4 md:grid-cols-3">
      {#each analysis.insights as insight}
        <article class="card p-5">
          <h3 class="text-xl font-black">{insight.title}</h3>
          <p class="mt-3 text-sm" style="color: var(--system-muted)">{insight.detail}</p>
        </article>
      {/each}
    </div>
  </section>

  <section class="grid gap-4">
    <div class="flex items-center gap-3">
      <Trophy size={24} style="color: var(--system-primary)" aria-hidden="true" />
      <h2 class="text-2xl font-black">Competitor signals</h2>
    </div>
    <div class="overflow-x-auto rounded-lg border" style="border-color: var(--system-line)">
      <table class="w-full min-w-[760px] border-collapse text-sm">
        <thead style="background: var(--system-surface-alt)">
          <tr>
            <th class="p-3 text-left">Brand</th>
            <th class="p-3 text-left">Offer</th>
            <th class="p-3 text-left">Proof</th>
            <th class="p-3 text-left">SEO Signals</th>
            <th class="p-3 text-left">Confidence</th>
          </tr>
        </thead>
        <tbody>
          {#each analysis.competitorSignals as competitor}
            <tr class="border-t" style="border-color: var(--system-line)">
              <td class="p-3 font-bold">{competitor.name}</td>
              <td class="p-3">{competitor.offer}</td>
              <td class="p-3">{competitor.proof}</td>
              <td class="p-3">{competitor.seo}</td>
              <td class="p-3">{competitor.confidence}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>

  <section class="soft-surface grid gap-3 p-5">
    <p class="eyebrow">Sources and limits</p>
    {#each analysis.sources as source}
      <p class="text-sm" style="color: var(--system-muted)">{source}</p>
    {/each}
  </section>
</section>
