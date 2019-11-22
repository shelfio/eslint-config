const importOrder = require('./rules/import-order');

module.exports = {
  extends: [
    '@shelf/eslint-config',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:vue/essential',
    'prettier/@typescript-eslint'
  ],
  plugins: ['@typescript-eslint', 'vue', 'babel', 'jsx', 'import'],
  env: {
    browser: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'import/order': importOrder,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    'jest/lowercase-name': 'off'
  },
  overrides: [
    {
      files: ['**/*.test.ts'],
      // it's a bit annoying, there is no need to specify return types for test case function body it('...', fn)
      rules: {
        '@typescript-eslint/explicit-function-return-type': 0
      }
    },
    {
      // webpack config is written in js not typescript
      files: ['webpack.config.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 0
      }
    }
  ]
};
