const paddingLineBetweenStatements = require('./rules/padding-line-between-statements');

module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'prettier',
    'prettier/@typescript-eslint'
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  env: {
    node: true,
    jest: true,
    es6: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': 'error',
    'padding-line-between-statements': paddingLineBetweenStatements,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/camelcase': 0
  },
  overrides: [
    {
      files: ['**/*.test.ts'],
      // it's a bit annoying, there is no need to specify return types for test case function body it('...', fn)
      rules: {
        '@typescript-eslint/explicit-function-return-type': 0
      }
    }
  ]
};
