import { defineConfig } from 'vite';

export default defineConfig({
  root: '_site',
  server: {
    proxy: {
      '/api': {
        target: 'https://api.ropean.org',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
});
