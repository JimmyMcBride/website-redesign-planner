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

  const selectedSystem = $derived(
    designSystems.find((system) => system.slug === $selectedSystemSlug) ?? designSystems[0]
  );
  const idPrefix = $derived(compact ? 'compact-design-system' : 'design-system');

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

  function handleKeydown(event: KeyboardEvent) {
    const currentIndex = designSystems.findIndex((system) => system.slug === $selectedSystemSlug);
    let nextIndex = currentIndex >= 0 ? currentIndex : 0;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (nextIndex + 1) % designSystems.length;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (nextIndex - 1 + designSystems.length) % designSystems.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = designSystems.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    const tabs = Array.from((event.currentTarget as HTMLElement).querySelectorAll<HTMLButtonElement>('[role="tab"]'));
    tabs[nextIndex]?.focus();
    void choose(designSystems[nextIndex].slug);
  }
</script>

<div class={`switcher ${compact ? 'switcher--compact' : ''}`} aria-label="Design system selector">
  {#if !compact}
    <p class="eyebrow">Design system</p>
  {/if}
  <div class="system-tabs" role="tablist" tabindex="-1" aria-label="Choose design system" aria-orientation="horizontal" onkeydown={handleKeydown}>
    {#each designSystems as system}
      {@const isSelected = $selectedSystemSlug === system.slug}
      {@const tooltipId = `${idPrefix}-${system.slug}-tip`}
      <div class="tab-shell">
        <button
          type="button"
          class={`system-tab ${isSelected ? 'is-selected' : ''}`}
          role="tab"
          aria-selected={isSelected}
          aria-describedby={tooltipId}
          onclick={() => void choose(system.slug)}
          style={`--swatch-primary: ${system.tokens.primary}; --swatch-secondary: ${system.tokens.secondary}; --swatch-accent: ${system.tokens.accent}`}
        >
          <span class="system-tab__swatch" aria-hidden="true"></span>
          <span class="system-tab__name">{system.name}</span>
          {#if isSelected}
            <Check class="system-tab__check" size={15} aria-hidden="true" />
          {/if}
        </button>
        <div class="system-tooltip" id={tooltipId} role="tooltip">
          <strong>{system.name}</strong>
          <span>{system.rationale}</span>
          <span><b>Motion:</b> {system.motion}</span>
          <span><b>Components:</b> {system.components.join(', ')}</span>
        </div>
      </div>
    {/each}
  </div>

  {#if !compact}
    <section class="selected-system-detail" aria-label={`${selectedSystem.name} design-system summary`}>
      <div class="selected-system-detail__header">
        <span
          class="selected-system-detail__swatch"
          style={`--swatch-primary: ${selectedSystem.tokens.primary}; --swatch-secondary: ${selectedSystem.tokens.secondary}; --swatch-accent: ${selectedSystem.tokens.accent}`}
          aria-hidden="true"
        ></span>
        <div>
          <p class="selected-system-detail__label">Selected</p>
          <h2>{selectedSystem.name}</h2>
        </div>
      </div>
      <p>{selectedSystem.rationale}</p>
      <p><strong>Motion:</strong> {selectedSystem.motion}</p>
      <div class="selected-system-detail__chips" aria-label={`${selectedSystem.name} component examples`}>
        {#each selectedSystem.components as component}
          <span>{component}</span>
        {/each}
      </div>
    </section>
  {/if}
</div>

<style>
  .switcher {
    container-type: inline-size;
    display: grid;
    gap: 0.75rem;
  }

  .switcher--compact {
    min-width: min(100%, 26rem);
  }

  .system-tabs {
    position: relative;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.25rem;
    border: 1px solid var(--system-line);
    border-radius: 8px;
    background: color-mix(in srgb, var(--system-surface-alt) 76%, var(--system-surface));
    padding: 0.25rem;
  }

  .tab-shell {
    position: relative;
    min-width: 0;
  }

  .system-tab {
    display: grid;
    width: 100%;
    min-height: 3.25rem;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 0.45rem;
    border: 1px solid transparent;
    border-radius: 6px;
    background: transparent;
    color: var(--system-muted);
    padding: 0.55rem 0.5rem;
    text-align: left;
    transition:
      background 160ms ease,
      border-color 160ms ease,
      color 160ms ease,
      transform 160ms ease;
  }

  .system-tab:hover,
  .system-tab:focus-visible {
    border-color: color-mix(in srgb, var(--system-primary) 42%, var(--system-line));
    background: color-mix(in srgb, var(--system-primary) 8%, var(--system-surface));
    color: var(--system-ink);
  }

  .system-tab.is-selected {
    border-color: var(--system-primary);
    background: var(--system-surface);
    color: var(--system-primary);
    box-shadow:
      inset 0 -2px 0 var(--system-primary),
      0 8px 18px rgba(17, 24, 39, 0.08);
  }

  .system-tab__swatch,
  .selected-system-detail__swatch {
    display: block;
    border: 1px solid color-mix(in srgb, var(--system-line) 70%, transparent);
    border-radius: 999px;
    background: linear-gradient(135deg, var(--swatch-primary) 0 48%, var(--swatch-secondary) 48% 74%, var(--swatch-accent) 74%);
    box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--system-surface) 78%, transparent);
  }

  .system-tab__swatch {
    width: 0.8rem;
    height: 0.8rem;
  }

  .system-tab__name {
    min-width: 0;
    font-size: 0.75rem;
    font-weight: 850;
    line-height: 1.08;
  }

  .system-tab__check {
    justify-self: end;
  }

  .system-tooltip {
    position: absolute;
    z-index: 40;
    top: calc(100% + 0.6rem);
    left: 0;
    display: grid;
    width: max-content;
    max-width: min(24rem, calc(100vw - 2rem));
    gap: 0.45rem;
    border: 1px solid color-mix(in srgb, var(--system-primary) 26%, var(--system-line));
    border-radius: 8px;
    background: color-mix(in srgb, var(--system-surface) 96%, var(--system-bg));
    box-shadow: var(--system-shadow);
    color: var(--system-ink);
    opacity: 0;
    padding: 0.8rem;
    pointer-events: none;
    text-align: left;
    transform: translateY(0.35rem);
    transition:
      opacity 150ms ease,
      transform 150ms ease;
  }

  .system-tooltip span {
    color: var(--system-muted);
    font-size: 0.78rem;
    line-height: 1.35;
  }

  .system-tooltip strong {
    font-size: 0.86rem;
    line-height: 1.2;
  }

  .tab-shell:hover .system-tooltip,
  .system-tab:focus-visible + .system-tooltip {
    opacity: 1;
    transform: translateY(0);
  }

  .tab-shell:nth-child(2) .system-tooltip {
    left: 50%;
    transform: translate(-50%, 0.35rem);
  }

  .tab-shell:nth-child(2):hover .system-tooltip,
  .tab-shell:nth-child(2) .system-tab:focus-visible + .system-tooltip {
    transform: translate(-50%, 0);
  }

  .tab-shell:nth-child(3) .system-tooltip {
    right: 0;
    left: auto;
  }

  .selected-system-detail {
    display: grid;
    gap: 0.7rem;
    border: 1px solid var(--system-line);
    border-radius: 8px;
    background: color-mix(in srgb, var(--system-surface) 92%, var(--system-bg));
    padding: 0.9rem;
  }

  .selected-system-detail__header {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 0.65rem;
  }

  .selected-system-detail__swatch {
    width: 1.1rem;
    height: 1.1rem;
  }

  .selected-system-detail__label {
    color: var(--system-primary);
    font-size: 0.68rem;
    font-weight: 850;
    line-height: 1;
    text-transform: uppercase;
  }

  .selected-system-detail h2 {
    margin: 0.12rem 0 0;
    font-size: 1rem;
    font-weight: 900;
    line-height: 1.15;
  }

  .selected-system-detail p {
    margin: 0;
    color: var(--system-muted);
    font-size: 0.84rem;
    line-height: 1.42;
  }

  .selected-system-detail p strong {
    color: var(--system-ink);
  }

  .selected-system-detail__chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .selected-system-detail__chips span {
    border: 1px solid var(--system-line);
    border-radius: 999px;
    background: var(--system-surface-alt);
    color: var(--system-ink);
    font-size: 0.7rem;
    font-weight: 750;
    line-height: 1;
    padding: 0.4rem 0.55rem;
  }

  @container (max-width: 18rem) {
    .system-tab {
      grid-template-columns: minmax(0, 1fr);
      justify-items: center;
      text-align: center;
    }

    .system-tab__check {
      display: none;
    }
  }
</style>
