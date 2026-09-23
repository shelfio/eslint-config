import sonarjs from 'eslint-plugin-sonarjs';
import {sourceFiles, testFiles} from '../common/files.js';
import comments from '../rules/comments.js';

// These rules have no syntax fallback when parserServices.program is absent.
export const typeServiceRules = [
  'deprecation',
  'no-ignored-return',
  'null-dereference',
  'no-selector-parameter',
  'index-of-compare-to-positive-number',
  'post-message',
  'no-array-delete',
  'no-alphabetical-sort',
  'new-operator-misuse',
  'different-types-comparison',
  'no-associative-arrays',
  'argument-type',
  'in-operator-type-error',
  'array-callback-without-return',
  'function-return-type',
  'no-misleading-array-reverse',
  'no-useless-intersection',
  'no-in-misuse',
  'no-undefined-argument',
  'no-try-promise',
  'disabled-resource-integrity',
  'no-incompatible-assertion-types',
  'unused-named-groups',
  'existing-groups',
  'jsx-no-leaked-render',
  'prefer-regexp-exec',
  'prefer-read-only-props',
  'no-async-constructor',
].map(rule => `sonarjs/${rule}`);
export const infrastructureRules = Object.keys(sonarjs.configs.recommended.rules).filter(rule =>
  rule.startsWith('sonarjs/aws-')
);
const testRules = [
  'no-skipped-tests',
  'no-empty-test-file',
  'assertions-in-tests',
  'no-fixed-wait-in-tests',
  'no-incomplete-assertions',
  'inverted-assertion-arguments',
  'no-same-argument-assert',
  'prefer-specific-assertions',
  'no-trivial-assertions',
  'test-check-exception',
  'stable-tests',
  'parameterized-tests',
  'chai-determinate-assertion',
  'no-exclusive-tests',
  'no-duplicate-test-title',
  'async-test-assertions',
  'no-empty-test-title',
  'hooks-before-test-cases',
  'assertions-in-test-cases',
  'no-debug-commands-in-ui-tests',
  'explicit-test-skip',
  'no-code-after-done',
  'disabled-timeout',
  'no-forced-browser-interaction',
  'synchronous-suite-callback',
  'no-mixed-completion-style',
  'no-interpolation-in-inline-snapshots',
].map(rule => `sonarjs/${rule}`);
const rules = {
  ...sonarjs.configs.recommended.rules,
  ...comments,
  ...Object.fromEntries([...typeServiceRules, ...infrastructureRules].map(rule => [rule, 'off'])),
  'sonarjs/cognitive-complexity': ['error', 18],
  'sonarjs/no-dead-store': 'off',
  'sonarjs/no-redundant-assignments': 'off',
  'sonarjs/unused-import': 'off',
  'sonarjs/block-scoped-var': 'off',
  'sonarjs/no-unused-vars': 'off',
  // The Lodash module owns this policy, including its deliberate exceptions.
  'sonarjs/prefer-native-lodash-alternative': 'off',
};

export default [
  {
    name: 'shelf/sonar/syntax-only',
    files: sourceFiles,
    plugins: {sonarjs},
    rules: Object.fromEntries(Object.entries(rules).filter(([rule]) => !testRules.includes(rule))),
  },
  {
    name: 'shelf/sonar/tests',
    files: testFiles,
    rules: {
      ...Object.fromEntries(Object.entries(rules).filter(([rule]) => testRules.includes(rule))),
      'sonarjs/no-duplicate-string': 'off',
    },
  },
  {
    name: 'shelf/sonar/styled-components',
    files: ['**/*.styled.{ts,tsx}'],
    rules: {'sonarjs/no-nested-template-literals': 'off'},
  },
];
