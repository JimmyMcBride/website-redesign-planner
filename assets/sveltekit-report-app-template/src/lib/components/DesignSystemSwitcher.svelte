<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { Check } from 'lucide-svelte';
  import { applyDesignSystem, initializeDesignSystem, selectedSystemSlug } from '$lib/design-system-state';
  import { designSystems } from '$lib/report-data';

  let { compact = false }: { compact?: boolean } = $props();

  $effect(() => {
    initializeDesignSystem(page.url.searchParams.get('system'));
  });

  async function choose(slug: string) {
    applyDesignSystem(slug);
    const params = new URLSearchParams(page.url.searchParams);
    params.set('system', slug);
    await goto(`${page.url.pathname}?${params.toString()}`, {
      keepFocus: true,
      noScroll: true,
      replaceState: false
    });
  }
</script>

<div class={compact ? 'grid gap-2' : 'grid gap-3'} aria-label="Design system selector">
  {#if !compact}
    <p class="eyebrow">Design system</p>
  {/if}
  <div class={compact ? 'grid grid-cols-1 gap-2 sm:grid-cols-3' : 'grid grid-cols-1 gap-2 lg:grid-cols-3'}>
    {#each designSystems as system}
      <button
        type="button"
        class={`system-button flex items-center justify-between gap-3 px-3 py-2 text-left text-sm ${$selectedSystemSlug === system.slug ? 'is-selected' : ''}`}
        aria-pressed={$selectedSystemSlug === system.slug}
        onclick={() => void choose(system.slug)}
      >
        <span class="min-w-0">
          <span class="block font-bold">{system.name}</span>
          {#if !compact}
            <span class="block text-xs" style="color: var(--system-muted)">{system.motion}</span>
          {/if}
        </span>
        {#if $selectedSystemSlug === system.slug}
          <Check size={17} aria-hidden="true" />
        {/if}
      </button>
    {/each}
  </div>
</div>
