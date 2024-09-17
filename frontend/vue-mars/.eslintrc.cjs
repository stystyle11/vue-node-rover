/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  rules: {
    eqeqeq: 'off',
    curly: 'off',
    'no-inline-comments': 1,
    'no-async-promise-executor': 2,
    'no-console': 1,
    'no-prototype-builtins': 2,
    'no-self-assign': 2,
    'no-unreachable': 2,
    'no-useless-escape': 2,
    'prefer-const': 0,
    'vue/valid-v-slot': [
      'error',
      {
        allowModifiers: true
      }
    ],
    'vue/singleline-html-element-content-newline': 'off',
    'padding-line-between-statements': [
      2,
      { blankLine: 'always', prev: 'if', next: '*' },
      { blankLine: 'always', prev: '*', next: 'if' },
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: '*', next: 'function' },
      { blankLine: 'always', prev: 'function', next: '*' }
    ],
    semi: ['error', 'always']
  },
  overrides: [
    {
      files: ['cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}', 'cypress/support/**/*.{js,ts,jsx,tsx}'],
      extends: ['plugin:cypress/recommended']
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
};

