const importOrder = require('./rules/import-order');
const {allowRequireInConfigs, noExplicitReturnTypeInTests} = require('./rules/overrides');

module.exports = {
  extends: [
    '@shelf/eslint-config',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:vue/essential',
    'prettier/@typescript-eslint',
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
    'import/order': importOrder,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    'jest/lowercase-name': 'off',
    'comma-dangle': 'off',
  },
  overrides: [allowRequireInConfigs, noExplicitReturnTypeInTests],
};
