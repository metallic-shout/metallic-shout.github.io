// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  typescript: {
    tsConfig: {
      include: ['../lib/**/*.ts', '../modules/**/*', '../data/**/*'],
    },
  },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/tailwind.css'],
  tailwindcss: {
    // configPath / cssPath などを変える時だけ触る
  },
});
