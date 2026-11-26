import {defineConfig} from 'eslint/config';
import ignores from './plugins/ignores.js';
import eslint from './plugins/eslint.js';
import typescript from './plugins/typescript.js';
import youDontNeedLodash from './plugins/you-dont-need-lodash.js';
import imports from './plugins/imports.js';
import jest from './plugins/jest.js';
import react from './plugins/react.js';
import testingLibrary from './plugins/testing-library.js';
import sonar from './plugins/sonar.js';
import shelf from './plugins/shelf.js';
import formatting from './plugins/formatting.js';

export {default as reactCompiler} from './plugins/react-compiler.js';

export default defineConfig(
  ignores,
  eslint,
  typescript,
  youDontNeedLodash,
  imports,
  jest,
  react,
  testingLibrary,
  sonar,
  shelf,
  formatting
);
