import barrelFiles from 'eslint-plugin-barrel-files';

export default {
  files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
  plugins: {'barrel-files': barrelFiles},
  rules: {
    'import/no-default-export': 'warn',
    'import/prefer-default-export': 'off',
    'barrel-files/avoid-barrel-files': [
      'warn',
      {
        amountOfExportsToConsiderModuleAsBarrel: 0,
      },
    ],
  },
  files: ['pages/**/*.{js,jsx,ts,tsx}'],
  rules: {'import/no-default-export': 'off'},
};
