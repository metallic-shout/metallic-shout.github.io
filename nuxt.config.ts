import { fileURLToPath } from 'node:url';
import { defineNuxtConfig } from 'nuxt/config';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

export const rootAlias = {
  '#root': rootDir,
};

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  alias: {
    ...rootAlias,
  },
  typescript: {
    tsConfig: {
      include: ['../lib/**/*.ts'],
    },
    nodeTsConfig: {
      compilerOptions: {
        paths: {
          '#root': ['..'],
          '#root/*': ['../*'],
        },
      },
    },
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon', '@nuxtjs/color-mode'],
  css: ['~/assets/css/tailwind.css'],
  tailwindcss: {
    // configPath / cssPath などを変える時だけ触る
  },
  colorMode: {
    preference: 'system',
    fallback: 'dark', // system 判定できない場合
    classSuffix: '',
    storage: 'localStorage',
    storageKey: 'color-mode',
  },
});
