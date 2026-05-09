<script lang="ts">
  import { ArrowRight, MapPin, Navigation } from 'lucide-svelte';
  import type { DesignSystem } from '$lib/report-data';
  import { businessProfile, demoContent } from '$lib/report-data';

  let { system }: { system: DesignSystem } = $props();
</script>

<section class="demo-stage px-5 py-10 md:px-10">
  <div class="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
    <div class="grid gap-6">
      <p class="eyebrow">Service map / {system.name}</p>
      <h1 class="text-4xl font-black leading-tight md:text-6xl">Find the right help by issue, area, and urgency.</h1>
      <p class="text-lg" style="color: var(--system-muted)">
        A spatial homepage for local service businesses where coverage, speed, and fit decide the sale.
      </p>
      <div class="grid gap-3 sm:grid-cols-2">
        {#each demoContent.services as service}
          <div class="system-button flex items-center gap-3 px-4 py-3 font-bold">
            <MapPin size={18} style="color: var(--system-primary)" aria-hidden="true" />
            {service}
          </div>
        {/each}
      </div>
      <a class="primary-cta inline-flex w-fit items-center gap-2 px-5 py-3 font-bold" href="#coverage">
        Check coverage
        <ArrowRight size={18} aria-hidden="true" />
      </a>
    </div>

    <div class="surface relative min-h-[560px] overflow-hidden p-5" id="coverage">
      <div class="absolute inset-0 opacity-50" style="background-image: linear-gradient(var(--system-line) 1px, transparent 1px), linear-gradient(90deg, var(--system-line) 1px, transparent 1px); background-size: 44px 44px"></div>
      <svg class="absolute inset-8 h-[calc(100%-4rem)] w-[calc(100%-4rem)]" viewBox="0 0 600 430" role="img" aria-label="Animated service area path">
        <path class="route-path" d="M45 340 C150 240 190 360 285 218 S410 116 550 168" fill="none" stroke="var(--system-primary)" stroke-width="8" stroke-linecap="round" />
        <path d="M75 75 H500 V355 H75 Z" fill="none" stroke="var(--system-line)" stroke-width="2" />
      </svg>

      <div class="relative grid h-full min-h-[520px] content-between">
        <div class="flex items-center justify-between">
          <div class="rounded-lg p-4 text-white" style="background: var(--system-primary)">
            <Navigation size={22} aria-hidden="true" />
            <p class="mt-2 font-bold">Response zone active</p>
          </div>
          <div class="soft-surface p-4 text-right">
            <strong>{businessProfile.serviceArea}</strong>
            <p class="text-sm" style="color: var(--system-muted)">Replace with real service map</p>
          </div>
        </div>

        <div class="grid gap-3 md:grid-cols-3">
          {#each demoContent.stats as stat}
            <div class="card animate-pulse-mark p-4">
              <strong class="text-2xl">{stat.value}</strong>
              <p class="text-sm" style="color: var(--system-muted)">{stat.label}</p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>
