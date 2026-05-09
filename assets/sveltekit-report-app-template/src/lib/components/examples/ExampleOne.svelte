<script lang="ts">
  import type { DesignSystem } from '$lib/report-data';

  let { system }: { system: DesignSystem } = $props();
</script>

<!-- Blank scaffold: replace this whole file with a unique homepage layout built from the source site's real media, copy, CTAs, and section intent. -->
<section class="demo-stage grid min-h-screen px-5 py-10 md:px-10">
  <div class="mx-auto grid w-full max-w-7xl content-center">
    <div class="surface grid min-h-[70vh] content-center gap-6 p-6 md:p-10">
      <p class="eyebrow">Example 1 / {system.name}</p>
      <div class="grid max-w-3xl gap-4">
        <h1 class="text-4xl font-black leading-tight md:text-6xl">Build a custom homepage layout here.</h1>
        <p class="text-lg" style="color: var(--system-muted)">
          Replace this blank scaffold with one distinct layout direction using the captured homepage copy, media, navigation, proof, and CTA intent.
        </p>
      </div>
      <div class="soft-surface grid gap-3 p-5 text-sm" style="color: var(--system-muted)">
        <p><strong style="color: var(--system-ink)">Do not decorate this placeholder.</strong> Remove it and create the real prototype.</p>
        <p>Make this direction structurally different from examples 2, 3, and 4.</p>
        <p>Keep the selected design-system tokens active through CSS variables.</p>
      </div>
    </div>
  </div>
</section>
