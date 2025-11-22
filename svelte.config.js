import adapter from '@sveltejs/adapter-static';

const dev = process.argv.includes('dev');

export default {
  kit: {
    adapter: adapter(),

    prerender: {
      handleHttpError: "ignore"
    },

    paths: {
      base: dev ? "" : "/personal_page",
      relative: false
    }
  }
};
