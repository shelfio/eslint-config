import tseslint from 'typescript-eslint';

export default [
  tseslint.configs.recommended,
  {
    name: 'shelf-typescript-overrides',
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-unused-vars': ['error', {ignoreRestSiblings: true}],
      '@typescript-eslint/camelcase': 'off',
      'sonarjs/no-unused-vars': 'off', // @typescript-eslint/no-unused-vars handles it in more flexible way
      'max-params': 'off',
      '@typescript-eslint/max-params': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
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
];
