import {fixupPluginRules} from '@eslint/compat';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import {sourceFiles, testFiles} from '../common/files.js';

// TypeScript types the props, and Shelf frontends use function components, so
// class-only checks only cost time.
const omittedRules = new Set([
  'react/no-direct-mutation-state',
  'react/display-name',
  'react/prop-types',
]);
const recommendedRules = Object.fromEntries(
  Object.entries(react.configs.flat.recommended.rules).filter(([rule]) => !omittedRules.has(rule))
);

export default [
  {
    name: 'shelf/react',
    files: sourceFiles,
    plugins: {react: fixupPluginRules(react), 'react-hooks': reactHooks},
    languageOptions: react.configs.flat.recommended.languageOptions,
    settings: {react: {version: 'detect'}},
    rules: {
      ...recommendedRules,
      ...react.configs.flat['jsx-runtime'].rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react/self-closing-comp': 'error',
      'react/no-danger': 'error',
    },
  },
  {
    name: 'shelf/react/tests',
    files: testFiles,
    // Tests render trusted fixture HTML.
    rules: {'react/no-danger': 'off'},
  },
];
