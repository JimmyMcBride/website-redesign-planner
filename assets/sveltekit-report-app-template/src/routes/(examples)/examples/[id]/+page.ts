import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageLoad } from './$types';
import { examples } from '$lib/report-data';

export const entries: EntryGenerator = () => examples.map((example) => ({ id: example.id }));

export const load = (({ params }) => {
  if (!examples.some((example) => example.id === params.id)) {
    error(404, 'Example not found');
  }

  return {
    exampleId: params.id
  };
}) satisfies PageLoad;
