// The Vitest counterpart of `rules/jest.js`. Keep the two policies in sync.
export default {
  'vitest/consistent-test-it': [
    'error',
    {
      fn: 'it',
      withinDescribe: 'it',
    },
  ],
  'vitest/expect-expect': [
    'warn',
    {
      assertFunctionNames: ['expect'],
    },
  ],
  'vitest/prefer-lowercase-title': 'error',
  'vitest/no-commented-out-tests': 'error',
  'vitest/no-duplicate-hooks': 'error',
  'vitest/no-large-snapshots': 'warn',
  'vitest/no-conditional-in-test': 'warn',
  'vitest/no-mocks-import': 'warn',
  'vitest/no-standalone-expect': 'warn',
  'vitest/no-done-callback': 'error',
  'vitest/no-test-return-statement': 'warn',
  'vitest/prefer-called-with': 'warn',
  'vitest/prefer-spy-on': 'warn',
  'vitest/prefer-todo': 'warn',
  'vitest/require-to-throw-message': 'warn',
  'vitest/valid-title': 'error',
  'vitest/no-conditional-expect': 'off',
};
