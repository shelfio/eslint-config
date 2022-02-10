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
  rules: {
    ...baseConfig.rules,
    'no-console': 'error',
    'sonarjs/cognitive-complexity': ['error', 18],
    'multiline-comment-style': 'off',
    'no-unreachable': 'error'
  },
};
