import testingLibrary from 'eslint-plugin-testing-library';
import {files} from './jest.js';

export default [
  {
    files,
    name: 'testing-library',
    ...testingLibrary.configs['flat/react'],
    rules: {
      ...testingLibrary.configs['flat/react'].rules,
      'testing-library/prefer-query-matchers': [
        'error',
        {validEntries: [{matcher: 'toBeVisible', query: 'get'}]},
      ],
    },
  },
];
