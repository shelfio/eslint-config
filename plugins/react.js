import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

const files = ['**/*.{jsx,tsx}'];

export default [
  {files, name: 'react-recommended', ...react.configs.flat['recommended']},
  {files, name: 'react-jsx-runtime', ...react.configs.flat['jsx-runtime']},
  {...reactHooks.configs['recommended-latest']},
  {
    name: 'shelf-frontend-globals',
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },
  {
    name: 'shelf-react-overrides',
    rules: {
      'react/display-name': 'off',
      'react/prop-types': 'off',
      'react/self-closing-comp': 'error',
      'react/no-unused-prop-types': 'error',
      'react/no-danger': 'error',
    },
  },
];
