import eslintConfigPrettier from 'eslint-config-prettier';
import sonarjs from 'eslint-plugin-sonarjs';
import comments from './rules/comments.js';
import defaultBarrelExports, {
  barrelPagesOverride,
  barrelPlugin,
} from './rules/default-barrel-exports.js';
import {commonPlugins, commonRules, jestConfig} from './common/shared.js';
import env from './common/env.js';

export default [
  ...jestConfig,
  {
    plugins: {
      ...commonPlugins,
      ...sonarjs.configs.recommended.plugins,
      ...barrelPlugin,
    },

    languageOptions: {
      globals: {
        ...env,
      },
    },

    rules: {
      ...commonRules,
      'no-empty': [
        'error',
        {
          allowEmptyCatch: true,
        },
      ],
      ...comments,
      ...defaultBarrelExports,
      camelcase: 'error',
      'no-use-before-define': ['error', 'nofunc'],
    },
  },
  barrelPagesOverride,
  eslintConfigPrettier,
];
