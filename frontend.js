const env = require('./common/env');
const baseConfig = require('./base');

module.exports = {
  extends: [
    './base.js',
    'plugin:react/recommended',
    'prettier',
    'plugin:react-hooks/recommended',
    'plugin:sonarjs/recommended',
  ],
  plugins: ['react', 'import', 'sonarjs', 'react-hooks'],
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
    'no-console': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'sonarjs/cognitive-complexity': ['error', 18],
    'multiline-comment-style': 'off',
    'no-unreachable': 'error',
  },
};
