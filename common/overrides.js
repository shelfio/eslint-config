module.exports = {
  noExplicitReturnTypeInTests: {
    files: ['**/*.test.ts'],
    // it's a bit annoying, there is no need to specify return types for test case function body it('...', fn)
    rules: {
      '@typescript-eslint/explicit-function-return-type': 0,
    },
  },
  allowRequireInConfigs: {
    files: [
      '*wallaby.config.js',
      'webpack.config.js',
      'babel.config.js',
      'next.config.js',
      'draft.js',
    ],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
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
