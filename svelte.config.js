import adapter from '@sveltejs/adapter-static';

const dev = process.argv.includes('dev');

export default {
  kit: {
    adapter: adapter(),

    prerender: {
      // allow static pages to be exported
      handleHttpError: "ignore"
    },

    paths: {
      base: dev ? "" : "/personal_page"
    }
  }
};
