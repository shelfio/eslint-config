import {fixupPluginRules} from '@eslint/compat';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import {sourceFiles} from '../common/files.js';

export default {
  name: 'shelf/react',
  files: sourceFiles,
  plugins: {react: fixupPluginRules(react), 'react-hooks': reactHooks},
  languageOptions: react.configs.flat.recommended.languageOptions,
  settings: {react: {version: 'detect'}},
  rules: {
    ...react.configs.flat.recommended.rules,
    ...react.configs.flat['jsx-runtime'].rules,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'react/self-closing-comp': 'error',
    'react/no-unused-prop-types': 'error',
    'react/no-danger': 'error',
  },
};
