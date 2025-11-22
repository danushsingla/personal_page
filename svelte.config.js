import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({
      fallback: '404.html'
    }),
    paths: {
      // We are HARDCODING this. 
      // Do not use a variable. Do not use empty string.
      base: '/personal_page',
      
      // Explicitly tell SvelteKit NOT to use relative paths
      relative: false
    }
  }
};