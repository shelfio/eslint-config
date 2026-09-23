import testingLibrary from 'eslint-plugin-testing-library';
import {sourceFiles, testFiles} from '../common/files.js';

export default [
  {
    name: 'shelf/testing-library/jsx-identifiers',
    files: sourceFiles,
    plugins: {'testing-library': testingLibrary},
    rules: {
      'testing-library/consistent-data-testid': ['error', {testIdPattern: '^(([a-z])+(-)*)+$'}],
    },
  },
  {
    name: 'shelf/testing-library/tests',
    files: testFiles,
    rules: {
      ...testingLibrary.configs['flat/react'].rules,
      'testing-library/no-debugging-utils': 'error',
      'testing-library/prefer-query-matchers': [
        'error',
        {validEntries: [{matcher: 'toBeVisible', query: 'get'}]},
      ],
    },
  },
];
