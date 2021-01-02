module.exports = {
  extends: ['plugin:testing-library/react'],
  plugins: ['testing-library'],
  rules: {
    'testing-library/await-async-query': 'error',
    'testing-library/no-await-sync-query': 'error',
    'testing-library/no-debug': 'warn',
    'testing-library/consistent-data-testid': [
      2,
      {
        testIdPattern: '^(([a-z])+(-)*)+$',
      },
    ],
  },
};
