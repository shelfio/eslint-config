const importOrder = require('./rules/import-order.json');
const sortImports = require('./rules/sort-imports.json');
const {allowRequireInConfigs, noExplicitReturnTypeInTests} = require('./rules/overrides');
const consistentTypeAssertions = require('./rules/consistent-type-assertions.json');
const vueConfig = require('./frontend-vue');

module.exports = {
  extends: [
    vueConfig,
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
  },
  overrides: [allowRequireInConfigs, noExplicitReturnTypeInTests],
};
