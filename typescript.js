const commonExtends = require('./common/extends.json');
const commonPlugins = require('./common/plugins');
const env = require('./common/env');
const importOrder = require('./rules/import-order.json');
const jestRules = require('./rules/jest.json');
const paddingLineBetweenStatements = require('./rules/padding-line-between-statements.json');
const preferES6Features = require('./rules/prefer-es6.json');
const sortImports = require('./rules/sort-imports.json');
const tsParser = require('./common/ts-parser');
const {allowRequireInConfigs, noExplicitReturnTypeInTests} = require('./common/overrides');
const consistentTypeAssertions = require('./rules/consistent-type-assertions.json');
const consistentTypeImports = require('./rules/consistent-type-imports.json');
const youDontNeedLodashRules = require('./rules/you-dont-need-lodash.json');
const typescriptRules = require('./rules/typescript');

module.exports = {
  extends: [...commonExtends, 'plugin:you-dont-need-lodash-underscore/compatible'],
  plugins: commonPlugins,
  env,
  ...tsParser,
  rules: {
    complexity: ['warn', {max: 5}],
    'multiline-ternary': ['error', 'never'],
    curly: 'error',
    'no-nested-ternary': 'error',
    'prettier/prettier': 'error',
    ...paddingLineBetweenStatements,
    ...jestRules,
    ...preferES6Features,
    ...importOrder,
    ...sortImports,
    'comma-dangle': 'off',
    ...consistentTypeAssertions,
    camelcase: [
      'error',
      {properties: 'never', ignoreGlobals: true, allow: ['hash_key', 'range_key']},
    ],
    eqeqeq: ['error', 'smart'],
    'new-cap': 'error',
    'no-extend-native': 'error',
    'no-use-before-define': 'off',
    ...consistentTypeImports,
    'multiline-comment-style': ['error', 'separate-lines'],
    'arrow-body-style': ['error', 'as-needed', {requireReturnForObjectLiteral: true}],
    'no-unreachable': 'error',
    'require-await': 'error',
    ...youDontNeedLodashRules,
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off', // we want to allow using the "!" operator
    ...typescriptRules,
  },
  overrides: [allowRequireInConfigs, noExplicitReturnTypeInTests],
};
