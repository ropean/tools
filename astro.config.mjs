import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Keep the output dir the deploy scripts already expect.
  outDir: './_site',
  // Emit one standalone .html file per page (about.html, tools/json-formatter.html)
  // instead of directory-style /about/index.html.
  build: { format: 'file' },
  vite: {
    // Dev-only proxy so tools that call a relative /api path (e.g. DNS Checker on
    // localhost) reach the real API. Production uses absolute URLs directly.
    server: {
      proxy: {
        '/api': {
          target: 'https://api.ropean.org',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  },
});
