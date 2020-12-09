const importOrder = require('./rules/import-order');

module.exports = {
  extends: ['@shelf/eslint-config', 'plugin:react/recommended', 'prettier/react'],
  plugins: ['react', 'import'],
  env: {
    browser: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'import/order': importOrder,
    'comma-dangle': 'error',
  },
};
