import {sourceFiles} from '../common/files.js';

// Oxfmt owns layout. This is the only enabled rule that a formatter can contradict;
// `pnpm audit:rules` fails when another one appears.
export default {
  name: 'shelf/formatting/oxfmt-compatibility',
  files: sourceFiles,
  rules: {'no-unexpected-multiline': 'off'},
};
