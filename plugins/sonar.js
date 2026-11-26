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
  'no-interpolation-in-inline-snapshots',
].map(rule => `sonarjs/${rule}`);
// Omitted rules never run; an omission needs no `off` entry in the effective config.
const omittedRules = new Set([
  ...typeServiceRules,
  ...infrastructureRules,
  // Data-flow checks. The README lists the owners of these policies.
  'sonarjs/no-dead-store',
  'sonarjs/no-redundant-assignments',
  'sonarjs/unused-import',
  'sonarjs/block-scoped-var',
  'sonarjs/no-unused-vars',
  // Syntax-only, it reports nothing in Shelf frontends and is one of the slowest Sonar rules.
  'sonarjs/no-floating-point-equality',
  // The Lodash module owns this policy, including its deliberate exceptions.
  'sonarjs/prefer-native-lodash-alternative',
]);
const rules = {
  ...Object.fromEntries(
    Object.entries(sonarjs.configs.recommended.rules).filter(
      ([rule, setting]) => setting !== 'off' && !omittedRules.has(rule)
    )
  ),
  ...comments,
  'sonarjs/cognitive-complexity': ['error', 18],
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
