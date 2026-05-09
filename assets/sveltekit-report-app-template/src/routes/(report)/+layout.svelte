<script lang="ts">
  import { base } from '$app/paths';
  import { page } from '$app/state';
  import { BarChart3, LayoutGrid, Palette, ShieldCheck } from 'lucide-svelte';
  import type { Snippet } from 'svelte';
  import DesignSystemSwitcher from '$lib/components/DesignSystemSwitcher.svelte';
  import { initializeDesignSystem, pathWithSystem, selectedSystemSlug } from '$lib/design-system-state';
  import { getDesignSystem, reportMeta, themeStyle } from '$lib/report-data';

  let { children }: { children: Snippet } = $props();

  const navItems = [
    { href: '/', label: 'Analysis', icon: BarChart3 },
    { href: '/audit/', label: 'Audit', icon: ShieldCheck },
    { href: '/design-systems/', label: 'Design Systems', icon: Palette },
    { href: '/examples/', label: 'Examples', icon: LayoutGrid }
  ];

  $effect(() => {
    initializeDesignSystem(page.url.searchParams.get('system'));
  });

  function routePath() {
    const pathname = page.url.pathname;
    return base && pathname.startsWith(base) ? pathname.slice(base.length) || '/' : pathname;
  }

  function isActive(href: string) {
    const current = routePath();
    return href === '/' ? current === '/' : current.startsWith(href);
  }

  function hrefFor(path: string) {
    return `${base}${pathWithSystem(path, $selectedSystemSlug)}`;
  }
</script>

<svelte:head>
  <title>{reportMeta.businessName} Website Report</title>
  <meta name="description" content={reportMeta.summary} />
</svelte:head>

<div class="report-shell min-h-screen" style={themeStyle(getDesignSystem($selectedSystemSlug))}>
  <header class="border-b" style="border-color: var(--system-line); background: color-mix(in srgb, var(--system-surface) 94%, transparent)">
    <div class="mx-auto grid max-w-7xl gap-5 px-5 py-5 lg:grid-cols-[1fr_auto] lg:items-center">
      <div>
        <p class="eyebrow">{reportMeta.preparedFor}</p>
        <a href={hrefFor('/')} class="mt-1 block text-xl font-black no-underline">{reportMeta.businessName}</a>
      </div>
      <nav class="flex flex-wrap gap-2" aria-label="Report navigation">
        {#each navItems as item}
          {@const Icon = item.icon}
          <a
            class={`system-button inline-flex items-center gap-2 px-3 py-2 text-sm font-bold no-underline ${isActive(item.href) ? 'is-selected' : ''}`}
            href={hrefFor(item.href)}
            aria-current={isActive(item.href) ? 'page' : undefined}
          >
            <Icon size={16} aria-hidden="true" />
            {item.label}
          </a>
        {/each}
      </nav>
    </div>
  </header>

  <main>
    <div class="mx-auto grid max-w-7xl gap-8 px-5 py-8 lg:grid-cols-[1fr_320px]">
      <div class="min-w-0">
        {@render children()}
      </div>
      <aside class="grid h-fit gap-5 lg:sticky lg:top-6">
        <DesignSystemSwitcher />
        <div class="soft-surface grid gap-2 p-4 text-sm">
          <p class="font-bold">Report status</p>
          <p style="color: var(--system-muted)">Replace sample content with captured research before client handoff.</p>
        </div>
      </aside>
    </div>
  </main>
</div>
