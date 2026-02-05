import { defineVitestConfig } from '@nuxt/test-utils/config';
import { rootAlias } from './nuxt.config';

export default defineVitestConfig({
  test: {
    environment: 'node',
  },
  resolve: {
    alias: {
      ...rootAlias,
    },
  },
});
