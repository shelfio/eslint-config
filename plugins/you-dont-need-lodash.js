import {fixupPluginRules} from '@eslint/compat';
import youDontNeedLodash from 'eslint-plugin-you-dont-need-lodash-underscore';

export default {
  name: 'you-dont-need-lodash',
  plugins: {
    'you-dont-need-lodash-underscore': fixupPluginRules(youDontNeedLodash),
  },
  rules: {
    ...youDontNeedLodash.configs['compatible'].rules,
    'you-dont-need-lodash-underscore/uniq': 'off',
    'you-dont-need-lodash-underscore/last': 'off',
    'you-dont-need-lodash-underscore/omit': 'off',
    'you-dont-need-lodash-underscore/trim': 'off',
    'you-dont-need-lodash-underscore/is-string': 'off',
    'you-dont-need-lodash-underscore/is-function': 'off',
    'you-dont-need-lodash-underscore/get': 'error',
    'you-dont-need-lodash-underscore/every': 'error',
    'you-dont-need-lodash-underscore/map': 'error',
    'you-dont-need-lodash-underscore/filter': 'error',
    'you-dont-need-lodash-underscore/size': 'error',
    'you-dont-need-lodash-underscore/includes': 'error',
  },
};
