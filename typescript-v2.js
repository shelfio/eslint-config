// @ts-check
import tseslint from 'typescript-eslint';
import youDontNeedLodash from './plugins/you-dont-need-lodash.js';
import imports from './plugins/imports.js';
import jest from './plugins/jest.js';
import react from './plugins/react.js';
import testingLibrary from './plugins/testing-library.js';
import typescript from './plugins/typescript.js';
import eslint from './plugins/eslint.js';

export default tseslint.config(
  eslint,
  typescript,
  youDontNeedLodash,
  imports,
  jest,
  react,
  testingLibrary,
);
