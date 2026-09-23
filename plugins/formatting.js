import eslintConfigPrettier from 'eslint-config-prettier';
import stylistic from '@stylistic/eslint-plugin';
import {sourceFiles} from '../common/files.js';
import paddingLineRules from '../rules/padding-line-between-statements.js';

export default [
  {
    name: 'shelf/formatting/block-spacing',
    files: sourceFiles,
    plugins: {'@stylistic': stylistic},
    rules: paddingLineRules,
  },
  {
    name: 'shelf/formatting/oxfmt-compatibility',
    files: sourceFiles,
    rules: eslintConfigPrettier.rules,
  },
];
