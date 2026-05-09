import adapter from '@sveltejs/adapter-static';

const base = process.env.BASE_PATH ?? '';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      fallback: '404.html'
    }),
    paths: {
      base
    },
    prerender: {
      handleHttpError: ({ path, message }) => {
        if (path.startsWith('/example-screenshots/')) {
          return;
        }

        throw new Error(message);
      }
    }
  }
};

export default config;
