const paddingLineBetweenStatements = require('./rules/padding-line-between-statements');
const jestRules = require('./rules/jest');

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:jest-formatting/strict',
    'plugin:jest/style',
    'plugin:jest/recommended',
    'prettier'
  ],
  plugins: ['jest-formatting', 'jest', 'prettier'],
  env: {
    node: true,
    jest: true,
    es6: true,
    'jest/globals': true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': 'error',
    'padding-line-between-statements': paddingLineBetweenStatements,
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
  }
};
