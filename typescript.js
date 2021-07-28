const commonExtends = require('./rules/extends-common.json');
const commonPlugins = require('./common/plugins');
const env = require('./common/env');
const importOrder = require('./rules/import-order.json');
const jestRules = require('./rules/jest.json');
const paddingLineBetweenStatements = require('./rules/padding-line-between-statements');
const preferDestructuring = require('./rules/prefer-destructuring');
const sortImports = require('./rules/sort-imports.json');
const tsParser = require('./common/ts-parser');
const {allowRequireInConfigs, noExplicitReturnTypeInTests} = require('./rules/overrides');

module.exports = {
  extends: commonExtends,
  plugins: commonPlugins,
  env,
  ...tsParser,
  rules: {
    complexity: ['warn', {max: 6}],
    'prettier/prettier': 'error',
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/camelcase': 0,
    'padding-line-between-statements': paddingLineBetweenStatements,
    ...jestRules,
    ...preferDestructuring,
    'prefer-template': 'error',
    'prefer-object-spread': 'error',
    ...importOrder,
    ...sortImports,
    '@typescript-eslint/no-unused-vars': 'error',
    'comma-dangle': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
  overrides: [allowRequireInConfigs, noExplicitReturnTypeInTests],
};
