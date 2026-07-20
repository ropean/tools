import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Keep the output dir the deploy scripts already expect.
  outDir: './_site',
  // Emit one standalone .html file per page (about.html, tools/json-formatter.html)
  // instead of directory-style /about/index.html.
  build: { format: 'file' },
});
