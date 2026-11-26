import jestPlugin from 'eslint-plugin-jest';
import {testFiles} from '../common/files.js';
import jestRules from '../rules/jest.js';

export default {
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
    // Assertion helpers follow the `expect*` and `assert*` naming convention.
    'jest/expect-expect': ['error', {assertFunctionNames: ['expect', 'expect*', 'assert*']}],
  },
};
