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
};
