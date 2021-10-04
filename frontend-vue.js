module.exports = {
  extends: ['./base.js', 'plugin:vue/essential'],
  plugins: ['vue', 'babel', 'jsx', 'import'],
  env: {
    browser: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaFeatures: {
      jsx: true,
    },
  },
};
