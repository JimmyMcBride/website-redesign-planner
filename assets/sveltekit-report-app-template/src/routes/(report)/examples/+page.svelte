<script lang="ts">
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import { ArrowRight, ImageIcon } from 'lucide-svelte';
  import { pathWithSystem, selectedSystemSlug } from '$lib/design-system-state';
  import { examples, getDesignSystem, reportMeta } from '$lib/report-data';

  const placeholder = `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750">
      <rect width="1200" height="750" fill="#f2efe7"/>
      <rect x="80" y="80" width="1040" height="590" rx="18" fill="#ffffff" stroke="#d8ddd6"/>
      <rect x="135" y="140" width="370" height="44" rx="8" fill="#17201d"/>
      <rect x="135" y="220" width="760" height="28" rx="8" fill="#d8ddd6"/>
      <rect x="135" y="275" width="610" height="28" rx="8" fill="#d8ddd6"/>
      <rect x="135" y="370" width="230" height="70" rx="12" fill="#0f6a59"/>
      <rect x="410" y="370" width="230" height="70" rx="12" fill="#b34e2b"/>
      <rect x="685" y="370" width="230" height="70" rx="12" fill="#254f8d"/>
      <text x="135" y="570" fill="#5a6660" font-family="Arial, sans-serif" font-size="34" font-weight="700">Screenshot generated after Playwright capture</text>
    </svg>
  `)}`;

  let mounted = $state(false);

  onMount(() => {
    mounted = true;
  });

  function screenshotFor(exampleId: string) {
    return mounted ? `${base}/example-screenshots/example-${exampleId}-${$selectedSystemSlug}.png` : placeholder;
  }

  function usePlaceholder(event: Event) {
    const image = event.currentTarget as HTMLImageElement;
    image.src = placeholder;
  }
</script>

<svelte:head>
  <title>Examples | {reportMeta.businessName}</title>
</svelte:head>

<section class="grid gap-8">
  <div class="grid gap-4 py-8">
    <p class="eyebrow">Examples</p>
    <h1 class="max-w-4xl text-4xl font-black leading-tight md:text-6xl">Four homepage demos, one switchable design system</h1>
    <p class="max-w-3xl text-lg" style="color: var(--system-muted)">
      Cards use real screenshots generated from the rendered demo routes. Current system: {getDesignSystem($selectedSystemSlug).name}.
    </p>
  </div>

  <div class="grid gap-5 md:grid-cols-2">
    {#each examples as example}
      <article class="card overflow-hidden">
        <div class="relative aspect-[16/10] overflow-hidden border-b" style="border-color: var(--system-line); background: var(--system-surface-alt)">
          <img
            class="h-full w-full object-cover"
            src={screenshotFor(example.id)}
            alt={`${example.title} homepage screenshot using ${getDesignSystem($selectedSystemSlug).name}`}
            onerror={usePlaceholder}
          />
          <div class="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-black text-white" style="background: var(--system-primary)">
            <ImageIcon size={15} aria-hidden="true" />
            {getDesignSystem($selectedSystemSlug).name}
          </div>
        </div>
        <div class="grid gap-4 p-5">
          <div>
            <p class="eyebrow">{example.label}</p>
            <h2 class="mt-1 text-2xl font-black">{example.title}</h2>
          </div>
          <p style="color: var(--system-muted)">{example.description}</p>
          <p class="text-sm"><strong>Motion:</strong> <span style="color: var(--system-muted)">{example.animation}</span></p>
          <a class="primary-cta inline-flex w-fit items-center gap-2 px-5 py-3 font-bold" href={`${base}${pathWithSystem(`/examples/${example.id}/`, $selectedSystemSlug)}`}>
            Open demo
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </article>
    {/each}
  </div>
</section>
