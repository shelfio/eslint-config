import {fixupPluginRules} from '@eslint/compat';
import importPlugin from 'eslint-plugin-import';
import {sourceFiles} from '../common/files.js';
import importOrder from '../rules/import-order.js';
import sortImports from '../rules/sort-imports.js';
import restrictedPackages from '../rules/restricted-packages-import.js';
import defaultBarrelExports, {
  barrelPagesOverride,
  barrelPlugin,
} from '../rules/default-barrel-exports.js';

export default [
  {
    name: 'shelf/imports/policy',
    files: sourceFiles,
    plugins: {import: fixupPluginRules(importPlugin), ...barrelPlugin},
    rules: {
      ...importOrder,
      ...sortImports,
      ...restrictedPackages,
      ...defaultBarrelExports,
      // Export-map rules parse imported files again; keep the fast preset local.
      'import/no-deprecated': 'off',
    },
  },
  {name: 'shelf/imports/next-pages', ...barrelPagesOverride},
];
