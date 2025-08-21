import jestPlugin from 'eslint-plugin-jest';

export const files = ['**/*.test.*', '**/*.spec.*'];

export default [
  {name: 'jest-recommended', files, ...jestPlugin.configs['flat/recommended']},
  {name: 'jest-style', files, ...jestPlugin.configs['flat/style']},
  {
    name: 'shelf-jest-overrides',
    files,
    rules: {
      'jest/no-deprecated-functions': 'off', // we are not using any of this, so disable to save extra ms to run
      'jest/prefer-jest-mocked': 'error',
      'jest/prefer-hooks-on-top': 'error',
      'jest/padding-around-all': 'error',
      'jest/prefer-called-with': 'error',
      'jest/consistent-test-it': ['error', {fn: 'it', withinDescribe: 'it'}],
      'jest/expect-expect': ['error', {assertFunctionNames: ['expect']}],
    },
  },
];
