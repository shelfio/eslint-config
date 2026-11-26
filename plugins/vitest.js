import vitestPlugin from '@vitest/eslint-plugin';
import {testFiles} from '../common/files.js';
import vitestRules from '../rules/vitest.js';

export default {
  name: 'shelf/vitest',
  files: testFiles,
  plugins: {vitest: vitestPlugin},
  languageOptions: vitestPlugin.configs.env.languageOptions,
  rules: {
    ...vitestPlugin.configs.recommended.rules,
    // The rules of the Jest `recommended` and `style` configs that Vitest does not recommend.
    'vitest/no-alias-methods': 'error',
    'vitest/no-disabled-tests': 'warn',
    'vitest/no-test-prefixes': 'error',
    'vitest/prefer-to-be': 'error',
    'vitest/prefer-to-contain': 'error',
    'vitest/prefer-to-have-length': 'error',
    ...vitestRules,
    'vitest/prefer-vi-mocked': 'error',
    'vitest/prefer-hooks-on-top': 'error',
    // Assertion helpers follow the `expect*` and `assert*` naming convention.
    'vitest/expect-expect': ['error', {assertFunctionNames: ['expect', 'expect*', 'assert*']}],
  },
};
