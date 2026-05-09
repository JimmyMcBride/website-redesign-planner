<script lang="ts">
  import { AlertTriangle, CheckCircle2 } from 'lucide-svelte';
  import { auditFindings, reportMeta } from '$lib/report-data';
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
