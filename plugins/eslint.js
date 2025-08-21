import eslint from '@eslint/js';

export default [
  eslint.configs.recommended,
  {
    name: 'shelf-js-overrides',
    rules: {
      'no-useless-return': 'error',
      'no-else-return': 'error',
      eqeqeq: ['error', 'always'],
      'no-console': 'error',
      'require-await': 'error',
      'prefer-template': 'error',
      'prefer-object-spread': 'error',
      'prefer-destructuring': [
        'error',
        {
          array: false,
          object: true,
        },
        {
          enforceForRenamedProperties: false,
        },
      ],
    },
  },
];
