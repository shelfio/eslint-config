import youDontNeedLodash from 'eslint-plugin-you-dont-need-lodash-underscore';
import {sourceFiles} from '../common/files.js';
import rules from '../rules/you-dont-need-lodash.js';

export default {
  name: 'shelf/lodash/native-alternatives',
  files: sourceFiles,
  plugins: {'you-dont-need-lodash-underscore': youDontNeedLodash},
  rules: {...youDontNeedLodash.configs.compatible.rules, ...rules},
};
