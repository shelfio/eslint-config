import barrelFiles from 'eslint-plugin-barrel-files';

export const barrelPlugin = {'barrel-files': barrelFiles};

const defaultBarrelExports = {
  'import/no-default-export': 'warn',
  'import/prefer-default-export': 'off',
  'barrel-files/avoid-barrel-files': [
    'warn',
    {
      amountOfExportsToConsiderModuleAsBarrel: 0,
    },
  ],
};

export const barrelPagesOverride = {
  files: ['pages/**/*.{js,jsx,ts,tsx}'],
  rules: {'import/no-default-export': 'off'},
};

export default defaultBarrelExports;
