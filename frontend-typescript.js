module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    '@shelf/eslint-config',
    'plugin:react/recommended',
    'prettier/react',
    'prettier/@typescript-eslint'
  ],
  plugins: ['@typescript-eslint', 'react'],
  env: {
    browser: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/camelcase': 0,
    // it fail to compile TS on react static class properties (displayName | defaultProps | etc..)
    '@typescript-eslint/explicit-member-accessibility': 0
  },
  overrides: [
    {
      files: ['**/*.test.ts'],
      // it's a bit annoying, there is no need to specify return types for test case function body it('...', fn)
      rules: {
        '@typescript-eslint/explicit-function-return-type': 0
      }
    },
    {
      // webpack config is written in js not typescript
      files: ['webpack.config.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 0
      }
    }
  ]
};
