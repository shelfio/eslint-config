import {fixupPluginRules} from '@eslint/compat';
import importPlugin from 'eslint-plugin-import';
import barrelFiles from 'eslint-plugin-barrel-files';
import {sourceFiles} from '../common/files.js';
import importOrder from '../rules/import-order.js';
import sortImports from '../rules/sort-imports.js';
import restrictedPackages from '../rules/restricted-packages-import.js';

export default [
  {
    name: 'shelf/imports/policy',
    files: sourceFiles,
    plugins: {import: fixupPluginRules(importPlugin), 'barrel-files': barrelFiles},
    rules: {
      ...importOrder,
      ...sortImports,
      ...restrictedPackages,
      'import/no-default-export': 'error',
      'barrel-files/avoid-barrel-files': ['error', {amountOfExportsToConsiderModuleAsBarrel: 0}],
    },
  },
  {
    name: 'shelf/imports/framework-entry-points',
    // Next.js, Storybook and tools load these files through their default or named exports.
    files: [
      'pages/**/*.{js,jsx,ts,tsx}',
      'src/pages/**/*.{js,jsx,ts,tsx}',
      '**/app/**/{page,layout,template,loading,error,global-error,not-found,default,opengraph-image,twitter-image,icon,apple-icon,sitemap,robots,manifest,route}.{js,jsx,ts,tsx}',
      '{middleware,instrumentation}.{js,ts}',
      'src/{middleware,instrumentation}.{js,ts}',
      '**/*.stories.{js,jsx,ts,tsx}',
      '**/.storybook/*.{js,jsx,ts,tsx,mjs}',
      '**/*.config.{js,mjs,cjs,ts,mts,cts}',
      '**/{jest,vitest}.*.{js,mjs,cjs,ts,mts,cts}',
    ],
    rules: {'import/no-default-export': 'off', 'barrel-files/avoid-barrel-files': 'off'},
  },
];
