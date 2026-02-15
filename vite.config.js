import { defineConfig } from 'vite';

export default defineConfig({
  root: '_site',
  server: {
    port: 8080,
    host: true,
  },
});
