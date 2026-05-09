<script lang="ts">
  import { base } from '$app/paths';
  import { ArrowRight, Palette } from 'lucide-svelte';
  import { pathWithSystem } from '$lib/design-system-state';
  import { designSystems, reportMeta } from '$lib/report-data';
</script>

<svelte:head>
  <title>Design Systems | {reportMeta.businessName}</title>
</svelte:head>

<section class="grid gap-8">
  <div class="grid gap-4 py-8">
    <p class="eyebrow">Design Systems</p>
    <h1 class="max-w-4xl text-4xl font-black leading-tight md:text-6xl">Three directions for the same business strategy</h1>
    <p class="max-w-3xl text-lg" style="color: var(--system-muted)">
      Each system changes color, rhythm, proof emphasis, motion tone, and component behavior across all four homepage examples.
    </p>
  </div>

  <div class="grid gap-5">
    {#each designSystems as system}
      <article class="card grid gap-5 p-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div class="grid gap-4">
          <div>
            <p class="eyebrow">{system.slug}</p>
            <h2 class="mt-1 text-3xl font-black">{system.name}</h2>
          </div>
          <p style="color: var(--system-muted)">{system.rationale}</p>
          <a class="primary-cta inline-flex w-fit items-center gap-2 px-5 py-3 font-bold" href={`${base}${pathWithSystem('/examples/', system.slug)}`}>
            Preview examples
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
        <div class="grid gap-4">
          <div class="grid grid-cols-5 gap-2" aria-label={`${system.name} color palette`}>
            <span class="h-16 rounded-md border" style={`border-color: var(--system-line); background: ${system.tokens.primary}`}></span>
            <span class="h-16 rounded-md border" style={`border-color: var(--system-line); background: ${system.tokens.secondary}`}></span>
            <span class="h-16 rounded-md border" style={`border-color: var(--system-line); background: ${system.tokens.accent}`}></span>
            <span class="h-16 rounded-md border" style={`border-color: var(--system-line); background: ${system.tokens.surfaceAlt}`}></span>
            <span class="h-16 rounded-md border" style={`border-color: var(--system-line); background: ${system.tokens.ink}`}></span>
          </div>
          <div class="grid gap-2 md:grid-cols-2">
            {#each system.components as component}
              <div class="soft-surface flex items-center gap-3 p-3">
                <Palette size={17} style="color: var(--system-primary)" aria-hidden="true" />
                <span class="font-bold">{component}</span>
              </div>
            {/each}
          </div>
          <p class="text-sm" style="color: var(--system-muted)">Motion tone: {system.motion}</p>
        </div>
      </article>
    {/each}
  </div>
</section>
