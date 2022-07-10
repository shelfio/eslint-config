const env = require('./common/env');
const paddingLineBetweenStatements = require('./rules/padding-line-between-statements.json');
const jestRules = require('./rules/jest.json');
const preferES6Features = require('./rules/prefer-es6.json');
const importOrder = require('./rules/import-order.json');
const sortImports = require('./rules/sort-imports.json');

module.exports = {
  extends: [
    './base.js',
    'plugin:react/recommended',
    'prettier',
    'plugin:react-hooks/recommended',
    'plugin:sonarjs/recommended',
  ],
  plugins: ['react', 'import', 'sonarjs'],
  env: {
    browser: true,
    ...env,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  overrides: [
    {
      files: ['*.test.{ts,tsx}'],
      rules: {
        'sonarjs/no-duplicate-string': 'off',
      },
    },
  ],
  rules: {
    'prettier/prettier': 'error',
    ...paddingLineBetweenStatements,
    ...jestRules,
    ...preferES6Features,
    'no-empty': ['error', {allowEmptyCatch: true}],
    ...importOrder,
    ...sortImports,
    'comma-dangle': 'off',
    camelcase: 'error',
    eqeqeq: ['error', 'smart'],
    'new-cap': 'error',
    'no-extend-native': 'error',
    'no-use-before-define': ['error', 'nofunc'],
    'require-await': 'error',
    'no-console': 'error',
    'sonarjs/cognitive-complexity': ['error', 18],
    'multiline-comment-style': 'off',
    'no-unreachable': 'error',
  },
};
