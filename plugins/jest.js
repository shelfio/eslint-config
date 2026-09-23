import jestPlugin from 'eslint-plugin-jest';
import {testFiles} from '../common/files.js';
import jestRules from '../rules/jest.js';

export default [
  {
    name: 'shelf/jest',
    files: testFiles,
    plugins: {jest: jestPlugin},
    languageOptions: jestPlugin.configs['flat/recommended'].languageOptions,
    rules: {
      ...jestPlugin.configs['flat/recommended'].rules,
      ...jestPlugin.configs['flat/style'].rules,
      ...jestRules,
      'jest/no-deprecated-functions': 'off',
      'jest/prefer-jest-mocked': 'error',
      'jest/prefer-hooks-on-top': 'error',
      'jest/padding-around-all': 'error',
      'jest/prefer-called-with': 'error',
      'jest/consistent-test-it': ['error', {fn: 'it', withinDescribe: 'it'}],
      'jest/expect-expect': ['error', {assertFunctionNames: ['expect']}],
    },
  },
  {
    name: 'shelf/jest/mock-types',
    files: testFiles,
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "TSAsExpression[typeAnnotation.typeName.left.name='jest'][typeAnnotation.typeName.right.name='Mock']",
          message: 'Use jest.mocked instead of casting to jest.Mock.',
        },
      ],
    },
  },
];
