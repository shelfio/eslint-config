const {allowRequireInConfigs, noExplicitReturnTypeInTests} = require('./common/overrides');
const consistentTypeAssertions = require('./rules/consistent-type-assertions.json');
const consistentTypeImports = require('./rules/consistent-type-imports.json');
const vueConfig = require('./frontend-vue');
const typescriptRules = require('./rules/typescript');

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
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    'jest/lowercase-name': 'off',
    ...consistentTypeAssertions,
    ...typescriptRules,
    ...consistentTypeImports,
  },
  overrides: [allowRequireInConfigs, noExplicitReturnTypeInTests],
};
