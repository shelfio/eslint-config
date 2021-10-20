const {allowRequireInConfigs, noExplicitReturnTypeInTests} = require('./rules/overrides');
const consistentTypeAssertions = require('./rules/consistent-type-assertions.json');
const vueConfig = require('./frontend-vue');

module.exports = {
  extends: [
    './frontend-vue',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint', ...vueConfig.plugins],
  parserOptions: {
    ...vueConfig.parserOptions,
    parser: '@typescript-eslint/parser',
  },
  rules: {
    ...vueConfig.rules,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    'jest/lowercase-name': 'off',
    ...consistentTypeAssertions,
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
  },
  overrides: [allowRequireInConfigs, noExplicitReturnTypeInTests],
};
