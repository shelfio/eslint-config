const paddingLineBetweenStatements = require('./rules/padding-line-between-statements');
const jestRules = require('./rules/jest');

module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'plugin:jest-formatting/strict',
    'plugin:jest/style',
    'plugin:jest/recommended',
    'prettier',
    'prettier/@typescript-eslint'
  ],
  plugins: ['@typescript-eslint', 'jest-formatting', 'jest', 'prettier'],
  env: {
    node: true,
    jest: true,
    es6: true,
    'jest/globals': true
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
    '@typescript-eslint/camelcase': 0,
    ...jestRules,
    'prefer-destructuring': [
      'error',
      {array: false, object: true},
      {enforceForRenamedProperties: false}
    ],
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
      }
    ]
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
