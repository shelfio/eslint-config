import assert from 'node:assert/strict';
import test from 'node:test';
import config, {recommendedIgnorePatterns} from './oxfmt.js';

test('the oxfmt config keeps the Shelf formatting options', () => {
  assert.deepEqual(config, {
    printWidth: 100,
    singleQuote: true,
    bracketSpacing: false,
    trailingComma: 'es5',
    arrowParens: 'avoid',
    sortPackageJson: false,
  });
});

test('the oxfmt config ignores coverage output and ESLint suppressions', () => {
  assert.deepEqual(recommendedIgnorePatterns, ['coverage/**', 'eslint-suppressions.json']);
});
