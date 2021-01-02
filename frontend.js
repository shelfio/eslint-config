const importOrder = require('./rules/import-order.json');
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
    ...importOrder,
    'comma-dangle': 'off',
  },
};
