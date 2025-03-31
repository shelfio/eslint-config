export default {
  disableExplicitsInTests: {
    name: 'not-explicit-any-in-tests',
    files: ['**/*.test.ts', '**/*mock?(s).ts'],
    // It's a bit annoying
    rules: {
      // There is no need to specify return types for test case function body it('...', fn)
      '@typescript-eslint/explicit-function-return-type': 'off',
      // There is no mandatory to specify types in tests
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  allowRequireInConfigs: {
    name: 'shelf-allow-require-in-configs',
    files: [
      '*wallaby.config.js',
      'webpack.config.js',
      'babel.config.js',
      'next.config.js',
      '**/*.cjs',
    ],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  noTSRulesWithJSON: {
    files: ['*.json'],
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
  noCastWithJestMock: {
    files: ['**/*.test.{ts,tsx}', '**/*mock?(s).{ts,tsx}'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "TSAsExpression[typeAnnotation.typeName.left.name='jest'][typeAnnotation.typeName.right.name='Mock']",
          message:
            "Don't cast to mock type with jest.Mock, use jest.mocked instead: https://jestjs.io/docs/mock-function-api/#jestmockedsource-options",
        },
      ],
    },
  },
};
