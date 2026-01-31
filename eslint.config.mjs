// eslint.config.mjs
import nuxt from "@nuxt/eslint-config";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...nuxt,
  {
    rules: {
      //   "vue/multi-word-component-names": "off",
      //   "@typescript-eslint/no-explicit-any": "off",
    },
  },
];
