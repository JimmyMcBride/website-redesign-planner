<script lang="ts">
  import { ArrowRight, BadgeCheck, CalendarClock, PhoneCall } from 'lucide-svelte';
  import type { DesignSystem } from '$lib/report-data';
  import { businessProfile, demoContent } from '$lib/report-data';

  let { system }: { system: DesignSystem } = $props();
</script>

<section class="demo-stage px-5 py-10 md:px-10">
  <div class="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
    <div class="animate-rise grid gap-7">
      <div class="eyebrow">{system.name} / {system.motion}</div>
      <div class="grid gap-5">
        <h1 class="max-w-4xl text-4xl font-black leading-tight md:text-6xl">{demoContent.heroTitle}</h1>
        <p class="max-w-2xl text-lg md:text-xl" style="color: var(--system-muted)">{demoContent.heroSubtitle}</p>
      </div>
      <div class="flex flex-wrap gap-3">
        <a class="primary-cta inline-flex items-center gap-2 px-5 py-3 font-bold" href="#quote">
          {businessProfile.primaryCta}
          <ArrowRight size={18} aria-hidden="true" />
        </a>
        <a class="secondary-cta inline-flex items-center gap-2 px-5 py-3 font-bold" href="#proof">
          {businessProfile.secondaryCta}
        </a>
      </div>
      <div class="grid gap-3 sm:grid-cols-3">
        {#each demoContent.stats as stat, index}
          <article class="card animate-rise p-4" style={`animation-delay: ${index * 120}ms`}>
            <strong class="block text-3xl">{stat.value}</strong>
            <span class="text-sm" style="color: var(--system-muted)">{stat.label}</span>
          </article>
        {/each}
      </div>
    </div>

    <div id="proof" class="relative overflow-hidden rounded-lg border p-4 shadow-lg animate-scan" style="border-color: var(--system-line); background: var(--system-surface); box-shadow: var(--system-shadow)">
      <div class="grid gap-4">
        <div class="flex items-center justify-between border-b pb-4" style="border-color: var(--system-line)">
          <div>
            <p class="eyebrow">Live decision board</p>
            <h2 class="text-2xl font-black">Ready-to-book signals</h2>
          </div>
          <div class="rounded-md px-3 py-2 text-sm font-bold text-white" style="background: var(--system-primary)">Open today</div>
        </div>
        <div class="grid gap-3">
          {#each demoContent.proofPoints as proof, index}
            <div class="flex items-start gap-3 rounded-lg border p-4" style={`border-color: var(--system-line); background: ${index % 2 === 0 ? 'var(--system-surface-alt)' : 'var(--system-surface)'}`}>
              <BadgeCheck size={20} style="color: var(--system-primary)" aria-hidden="true" />
              <div>
                <strong>{proof}</strong>
                <p class="text-sm" style="color: var(--system-muted)">Mapped to buyer risk before the CTA.</p>
              </div>
            </div>
          {/each}
        </div>
        <div id="quote" class="grid gap-3 rounded-lg p-4" style="background: var(--system-ink); color: var(--system-surface)">
          <div class="flex items-center gap-3">
            <CalendarClock size={20} aria-hidden="true" />
            <span class="font-bold">Next opening: tomorrow morning</span>
          </div>
          <div class="flex items-center gap-3">
            <PhoneCall size={20} aria-hidden="true" />
            <span>Call path, quote path, and service fit in one view.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
