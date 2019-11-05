const importOrder = require('./rules/import-order');

module.exports = {
  extends: ['@shelf/eslint-config', 'plugin:prettier/recommended', 'plugin:vue/essential'],
  plugins: ['vue', 'babel', 'jsx', 'import'],
  env: {
    browser: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'import/order': importOrder
  }
};
