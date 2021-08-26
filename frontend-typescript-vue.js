const importOrder = require('./rules/import-order.json');
const sortImports = require('./rules/sort-imports.json');
const {allowRequireInConfigs, noExplicitReturnTypeInTests} = require('./rules/overrides');
const consistentTypeAssertions = require('./rules/consistent-type-assertions.json');

module.exports = {
  extends: [
    '@shelf/eslint-config',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:vue/essential',
  ],
  plugins: ['@typescript-eslint', 'vue', 'babel', 'jsx', 'import'],
  env: {
    browser: true,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    ...importOrder,
    ...sortImports,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    'jest/lowercase-name': 'off',
    'comma-dangle': 'off',
    ...consistentTypeAssertions,
  },
  overrides: [allowRequireInConfigs, noExplicitReturnTypeInTests],
};
