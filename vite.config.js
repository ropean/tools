import { defineConfig } from 'vite'

export default defineConfig({
  preview: {
    port: 8080,
    host: true,
    open: true
  },
  server: {
    port: 8080,
    host: true,
    open: true
  },
  build: {
    outDir: '_site',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        main: './_site/index.html'
      }
    }
  }
})
