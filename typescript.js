const paddingLineBetweenStatements = require('./rules/padding-line-between-statements');
const jestRules = require('./rules/jest');
const importOrder = require('./rules/import-order');
const sortImports = require('./rules/sort-imports');
const commonPlugins = require('./common/plugins');
const commonExtends = require('./rules/extends-common');
const preferDestructuring = require('./rules/prefer-destructuring');
const tsParser = require('./common/ts-parser');
const env = require('./common/env');
const {allowRequireInConfigs, noExplicitReturnTypeInTests} = require('./rules/overrides');

module.exports = {
  extends: commonExtends,
  plugins: commonPlugins,
  env,
  ...tsParser,
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/camelcase': 0,
    'padding-line-between-statements': paddingLineBetweenStatements,
    ...jestRules,
    ...preferDestructuring,
    'sort-imports': sortImports,
    'prefer-template': 'error',
    'prefer-object-spread': 'error',
    ...importOrder,
    '@typescript-eslint/no-unused-vars': 'error',
    'comma-dangle': 'off',
  },
  overrides: [allowRequireInConfigs, noExplicitReturnTypeInTests],
};
