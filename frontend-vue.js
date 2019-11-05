const importOrder = require('./rules/import-order');

module.exports = {
  extends: ['@shelf/eslint-config', 'plugin:prettier/recommended'],
  plugins: ['vue', 'babel', 'jsx', 'import'],
  env: {
    browser: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    vue: {
      pragma: 'h'
    }
  },
  rules: {
    'import/order': importOrder,
    'no-unused-vars': ['error', {vars: 'all', argsIgnorePattern: '^h$'}]
  }
};
