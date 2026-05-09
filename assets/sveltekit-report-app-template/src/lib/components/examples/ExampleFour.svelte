<script lang="ts">
  import { ArrowRight, CheckCircle2, ClipboardList } from 'lucide-svelte';
  import type { DesignSystem } from '$lib/report-data';
  import { businessProfile, demoContent } from '$lib/report-data';

  let { system }: { system: DesignSystem } = $props();
</script>

<section class="demo-stage px-5 py-10 md:px-10">
  <div class="mx-auto grid max-w-7xl gap-8">
    <div class="grid min-h-[640px] gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
      <div class="grid content-between rounded-lg p-6 text-white" style="background: var(--system-ink); box-shadow: var(--system-shadow)">
        <div>
          <p class="eyebrow" style="color: var(--system-secondary)">Booking theater / {system.name}</p>
          <h1 class="mt-5 text-4xl font-black leading-tight md:text-6xl">Turn the homepage into a guided quote room.</h1>
          <p class="mt-5 max-w-xl text-lg opacity-80">
            Premium framing, strong proof, and a clear booking module make the next step feel controlled.
          </p>
        </div>
        <div class="grid gap-3 sm:grid-cols-3">
          {#each demoContent.stats as stat}
            <div class="rounded-lg border border-white/20 p-4">
              <strong class="block text-2xl">{stat.value}</strong>
              <span class="text-sm opacity-75">{stat.label}</span>
            </div>
          {/each}
        </div>
      </div>

      <div class="surface grid gap-5 p-5" id="quote">
        <div class="flex items-center justify-between border-b pb-4" style="border-color: var(--system-line)">
          <div>
            <p class="eyebrow">Start quote</p>
            <h2 class="text-3xl font-black">{businessProfile.primaryCta}</h2>
          </div>
          <ClipboardList size={30} style="color: var(--system-primary)" aria-hidden="true" />
        </div>

        <div class="grid gap-3">
          {#each demoContent.process as step, index}
            <div class="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-lg border p-4" style="border-color: var(--system-line)">
              <span class="grid h-9 w-9 place-items-center rounded-md text-sm font-black text-white" style="background: var(--system-primary)">{index + 1}</span>
              <div>
                <strong>{step}</strong>
                <p class="text-sm" style="color: var(--system-muted)">Short copy explains what the visitor receives next.</p>
              </div>
              <CheckCircle2 size={19} style="color: var(--system-accent)" aria-hidden="true" />
            </div>
          {/each}
        </div>

        <div class="soft-surface grid gap-3 p-4">
          <p class="font-bold">Proof before submit</p>
          <div class="grid gap-2 sm:grid-cols-2">
            {#each demoContent.proofPoints.slice(0, 4) as proof}
              <span class="text-sm" style="color: var(--system-muted)">{proof}</span>
            {/each}
          </div>
        </div>

        <a class="primary-cta inline-flex items-center justify-center gap-2 px-5 py-3 font-bold" href="#quote">
          Continue quote
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>
    </div>
  </div>
</section>
