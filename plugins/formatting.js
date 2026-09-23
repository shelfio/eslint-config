import eslintConfigPrettier from 'eslint-config-prettier';
import {sourceFiles} from '../common/files.js';

export default {
  name: 'shelf/formatting/oxfmt-compatibility',
  files: sourceFiles,
  rules: eslintConfigPrettier.rules,
};
