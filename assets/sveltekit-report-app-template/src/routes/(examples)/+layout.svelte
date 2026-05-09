<script lang="ts">
  import { base } from '$app/paths';
  import { page } from '$app/state';
  import { ArrowLeft } from 'lucide-svelte';
  import type { Snippet } from 'svelte';
  import DesignSystemSwitcher from '$lib/components/DesignSystemSwitcher.svelte';
  import { initializeDesignSystem, pathWithSystem, selectedSystemSlug } from '$lib/design-system-state';
  import { getDesignSystem, reportMeta, themeStyle } from '$lib/report-data';

  let { children }: { children: Snippet } = $props();

  $effect(() => {
    initializeDesignSystem(page.url.searchParams.get('system'));
  });
</script>

<div class="min-h-screen" style={themeStyle(getDesignSystem($selectedSystemSlug))}>
  <header class="border-b" style="border-color: var(--system-line); background: var(--system-surface)">
    <div class="mx-auto grid max-w-7xl gap-4 px-5 py-4 lg:grid-cols-[1fr_auto] lg:items-center">
      <a class="system-button inline-flex w-fit items-center gap-2 px-3 py-2 text-sm font-bold no-underline" href={`${base}${pathWithSystem('/examples/', $selectedSystemSlug)}`}>
        <ArrowLeft size={16} aria-hidden="true" />
        Back to examples
      </a>
      <div class="grid gap-3 lg:grid-cols-[auto_520px] lg:items-center">
        <p class="hidden text-sm font-bold lg:block">{reportMeta.businessName}</p>
        <DesignSystemSwitcher compact />
      </div>
    </div>
  </header>
  {@render children()}
</div>
