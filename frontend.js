const env = require('./common/env');
const baseConfig = require('./base');

module.exports = {
  extends: ['./base.js', 'plugin:react/recommended', 'prettier', 'plugin:react-hooks/recommended'],
  plugins: ['react', 'import'],
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
  },
};
