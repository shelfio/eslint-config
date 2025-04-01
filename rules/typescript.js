export default {
  '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
  '@typescript-eslint/no-use-before-define': 'off',
  '@typescript-eslint/no-unused-vars': 'error',
  '@typescript-eslint/camelcase': 'off',
  'sonarjs/no-unused-vars': 'off', // @typescript-eslint/no-unused-vars handles it in more flexible way
  // '@typescript-eslint/require-await': 'error',
  // '@typescript-eslint/return-await': 'error',
  // '@typescript-eslint/promise-function-async': 'error',
  // '@typescript-eslint/consistent-type-exports': 'error',
  'max-params': 'off',
  '@typescript-eslint/max-params': 'error',

  //   TODO: move into es6
  'no-useless-return': 'error',
  'no-else-return': 'error',
  eqeqeq: ['error', 'always'],
  'no-console': 'error',
  'require-await': 'error',
};
