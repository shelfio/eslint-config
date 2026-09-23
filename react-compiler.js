import reactHooks from 'eslint-plugin-react-hooks';
import {sourceFiles} from './common/files.js';

export const compilerRules = Object.fromEntries(
  Object.entries(reactHooks.configs.flat.recommended.rules).filter(
    ([rule]) => !['react-hooks/rules-of-hooks', 'react-hooks/exhaustive-deps'].includes(rule)
  )
);

export default {
  name: 'shelf/react-compiler',
  files: sourceFiles,
  plugins: {'react-hooks': reactHooks},
  rules: compilerRules,
};
