import { fileURLToPath } from 'node:url';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  alias: {
    '@root': fileURLToPath(new URL('./', import.meta.url)),
  },
  typescript: {
    tsConfig: {
      include: ['../lib/**/*.ts', '../modules/**/*', '../data/**/*'],
    },
  },
});
