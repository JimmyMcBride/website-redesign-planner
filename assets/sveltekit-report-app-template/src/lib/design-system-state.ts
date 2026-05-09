import { browser } from '$app/environment';
import { get } from 'svelte/store';
import { writable } from 'svelte/store';
import { defaultSystemSlug, getDesignSystem } from '$lib/report-data';

const storageKey = 'website-redesign-planner-design-system';

export const selectedSystemSlug = writable(defaultSystemSlug);

export function applyDesignSystem(slug?: string | null): string {
  const resolved = getDesignSystem(slug).slug;
  selectedSystemSlug.set(resolved);

  if (browser) {
    document.documentElement.dataset.system = resolved;
    localStorage.setItem(storageKey, resolved);
  }

  return resolved;
}

export function initializeDesignSystem(querySlug?: string | null): string {
  const stored = browser ? localStorage.getItem(storageKey) : null;
  return applyDesignSystem(querySlug || stored || get(selectedSystemSlug) || defaultSystemSlug);
}

export function pathWithSystem(path: string, slug: string): string {
  const [pathname, query = ''] = path.split('?');
  const params = new URLSearchParams(query);
  params.set('system', slug);
  const queryString = params.toString();
  return `${pathname}${queryString ? `?${queryString}` : ''}`;
}
