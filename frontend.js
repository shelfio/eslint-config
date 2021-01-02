const importOrder = require('./rules/import-order');
const env = require('./common/env');

module.exports = {
  extends: ['@shelf/eslint-config', 'plugin:react/recommended', 'prettier/react'],
  plugins: ['react', 'import'],
  env: {
    browser: true,
    ...env,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'import/order': importOrder,
    'comma-dangle': 'off',
  },
};
