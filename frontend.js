const env = require('./common/env');
const baseConfig = require('./base');
const restrictedPackagesImportRules = require('./rules/restricted-packages-import.json');

module.exports = {
  extends: [
    './base.js',
    'plugin:react/recommended',
    'prettier',
    'plugin:react-hooks/recommended',
    'plugin:sonarjs/recommended',
  ],
  plugins: ['react', 'import', 'sonarjs'],
  env: {
    browser: true,
    ...env,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  overrides: [
    {
      files: ['*.test.{ts,tsx}'],
      rules: {
        'sonarjs/no-duplicate-string': 'off',
      },
    },
  ],
  rules: {
    ...baseConfig.rules,
    ...restrictedPackagesImportRules,
    'no-console': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'sonarjs/cognitive-complexity': ['error', 18],
    'multiline-comment-style': 'off',
    'no-unreachable': 'error',
    'react/react-in-jsx-scope': "off"
  },
};
