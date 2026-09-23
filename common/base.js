import eslintConfigPrettier from 'eslint-config-prettier';
import sonarjs from 'eslint-plugin-sonarjs';
import comments from '../rules/comments.js';
import defaultBarrelExports, {
  barrelPagesOverride,
  barrelPlugin,
} from '../rules/default-barrel-exports.js';
import {commonPlugins, commonRules, jestConfig} from './shared.js';
import env from './env.js';

export function createBaseConfig({prettierConfig} = {}) {
  const prettier = Boolean(prettierConfig);

  return [
    ...jestConfig,
    ...(prettier ? [prettierConfig] : []),
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
    ...(!prettier ? [eslintConfigPrettier] : []),
  ];
}
