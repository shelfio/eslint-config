const importOrder = require('./rules/import-order');
const {allowRequireInConfigs, noExplicitReturnTypeInTests} = require('./rules/overrides');

module.exports = {
  extends: [
    '@shelf/eslint-config',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier/react',
    'prettier/@typescript-eslint'
  ],
  globals: {
    DD_LOGS: true
  },
  plugins: ['@typescript-eslint', 'react', 'import'],
  env: {
    browser: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/camelcase': 0,
    // it fail to compile TS on react static class properties (displayName | defaultProps | etc..)
    '@typescript-eslint/explicit-member-accessibility': 0,
    // Often test name starts with component name which are always capitalized
    'jest/lowercase-name': 'off',
    'import/order': importOrder
  },
  overrides: [allowRequireInConfigs, noExplicitReturnTypeInTests]
};
