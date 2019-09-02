module.exports = {
  'jest/consistent-test-it': ['error', {fn: 'it', withinDescribe: 'it'}],
  'jest/expect-expect': ['warn', {assertFunctionNames: ['expect']}],
  'jest/lowercase-name': 'error',
  'jest/no-commented-out-tests': 'error',
  'jest/no-duplicate-hooks': 'error',
  'jest/no-empty-title': 'error',
  'jest/no-expect-resolves': 'warn',
  'jest/no-export': 'error',
  'jest/no-large-snapshots': 'warn',
  'jest/no-if': 'warn',
  'jest/no-mocks-import': 'warn',
  'jest/no-standalone-expect': 'warn',
  'jest/no-test-callback': 'error',
  'jest/no-test-return-statement': 'warn',
  'jest/no-truthy-falsy': 'off',
  'jest/no-try-expect': 'off',
  'jest/prefer-called-with': 'warn',
  'jest/prefer-inline-snapshots': 'off',
  'jest/prefer-spy-on': 'warn',
  'jest/prefer-strict-equal': 'off',
  'jest/prefer-todo': 'warn',
  'jest/require-tothrow-message': 'warn'
};