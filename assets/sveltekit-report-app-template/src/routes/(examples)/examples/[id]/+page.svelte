<script lang="ts">
  import type { PageProps } from './$types';
  import ExampleFour from '$lib/components/examples/ExampleFour.svelte';
  import ExampleOne from '$lib/components/examples/ExampleOne.svelte';
  import ExampleThree from '$lib/components/examples/ExampleThree.svelte';
  import ExampleTwo from '$lib/components/examples/ExampleTwo.svelte';
  import { selectedSystemSlug } from '$lib/design-system-state';
  import { getDesignSystem, getExample, reportMeta } from '$lib/report-data';

  let { data }: PageProps = $props();

  const example = $derived(getExample(data.exampleId));
  const system = $derived(getDesignSystem($selectedSystemSlug));
</script>

<svelte:head>
  <title>{example.title} | {reportMeta.businessName}</title>
  <meta name="description" content={example.description} />
</svelte:head>

{#if example.id === '1'}
  <ExampleOne {system} />
{:else if example.id === '2'}
  <ExampleTwo {system} />
{:else if example.id === '3'}
  <ExampleThree {system} />
{:else}
  <ExampleFour {system} />
{/if}
