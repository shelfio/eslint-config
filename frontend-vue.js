const importOrder = require('./rules/import-order.json');

module.exports = {
  extends: ['@shelf/eslint-config', 'plugin:prettier/recommended', 'plugin:vue/essential'],
  plugins: ['vue', 'babel', 'jsx', 'import'],
  env: {
    browser: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    ...importOrder,
    'comma-dangle': 'off',
  },
};
