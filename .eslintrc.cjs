/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    'plugin:vue/recommended',
    'plugin:prettier-vue/recommended',
  ],
  ignorePatterns: ['src/utils/*.ts'],
  rules: {
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    semi: ['error', 'never'],
    quotes: [2, 'single', 'avoid-escape'],
    'prettier-vue/prettier': ['warn'],
  },
  settings: {
    'prettier-vue': {
      SFCBlocks: {
        template: true,
        script: true,
        style: true,

        customBlocks: {
          docs: { lang: 'markdown' },
          config: { lang: 'json' },
          module: { lang: 'js' },
          comments: false,
        },
      },
      usePrettierrc: true,
    },
  },
}
