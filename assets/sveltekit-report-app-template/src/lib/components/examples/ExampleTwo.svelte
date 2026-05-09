<script lang="ts">
  import { ArrowRight, Images, Quote } from 'lucide-svelte';
  import type { DesignSystem } from '$lib/report-data';
  import { businessProfile, demoContent } from '$lib/report-data';

  let { system }: { system: DesignSystem } = $props();
</script>

<section class="demo-stage px-5 py-10 md:px-10">
  <div class="mx-auto grid max-w-7xl gap-8">
    <div class="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
      <div class="grid gap-4">
        <p class="eyebrow">Proof story / {system.name}</p>
        <h1 class="text-4xl font-black leading-tight md:text-6xl">See the work, understand the promise, book with confidence.</h1>
      </div>
      <p class="max-w-2xl text-lg" style="color: var(--system-muted)">
        This direction makes the homepage feel like a guided case story: problem, proof, process, and quote path.
      </p>
    </div>

    <div class="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
      <div class="surface overflow-hidden">
        <div class="grid min-h-[520px] gap-0 md:grid-cols-2">
          <div class="grid content-between p-6" style="background: var(--system-ink); color: var(--system-surface)">
            <div class="flex items-center gap-3">
              <Images size={22} aria-hidden="true" />
              <span class="font-bold">Before the decision</span>
            </div>
            <div>
              <p class="text-5xl font-black">Unclear scope</p>
              <p class="mt-3 text-sm opacity-80">Visitors see service claims, but not enough proof to choose.</p>
            </div>
          </div>
          <div class="grid content-between p-6" style="background: var(--system-surface-alt)">
            <div class="flex items-center gap-3">
              <Quote size={22} style="color: var(--system-primary)" aria-hidden="true" />
              <span class="font-bold">After the redesign</span>
            </div>
            <div>
              <p class="text-5xl font-black">Visible proof</p>
              <p class="mt-3 text-sm" style="color: var(--system-muted)">The homepage tells buyers exactly why the next step is low risk.</p>
            </div>
          </div>
        </div>
      </div>

      <aside class="grid gap-4">
        {#each demoContent.process as step, index}
          <article class="card animate-rise p-5" style={`animation-delay: ${index * 110}ms`}>
            <span class="text-sm font-bold" style="color: var(--system-secondary)">0{index + 1}</span>
            <h2 class="mt-2 text-xl font-black">{step}</h2>
            <p class="mt-2 text-sm" style="color: var(--system-muted)">A homepage section that earns the next click before asking for it.</p>
          </article>
        {/each}
      </aside>
    </div>

    <div id="quote" class="surface flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
      <div>
        <p class="eyebrow">Recommended CTA</p>
        <h2 class="text-2xl font-black">{businessProfile.primaryCta}</h2>
      </div>
      <a class="primary-cta inline-flex items-center justify-center gap-2 px-5 py-3 font-bold" href="#quote">
        Start the guided path
        <ArrowRight size={18} aria-hidden="true" />
      </a>
    </div>
  </div>
</section>
