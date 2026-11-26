import {defineConfig} from 'eslint/config';
import {defaultTestFramework} from './common/test-framework.js';
import {frontendIgnores} from './rules/ignores.js';
import eslint from './plugins/eslint.js';
import typescript from './plugins/typescript.js';
import youDontNeedLodash from './plugins/you-dont-need-lodash.js';
import imports from './plugins/imports.js';
import jest from './plugins/jest.js';
import vitest from './plugins/vitest.js';
import react from './plugins/react.js';
import testingLibrary from './plugins/testing-library.js';
import sonar from './plugins/sonar.js';
import shelf from './plugins/shelf.js';

export {default as reactCompiler} from './plugins/react-compiler.js';
export {defaultTestFramework} from './common/test-framework.js';

const testFrameworks = {jest, vitest};

export const defineFrontendConfig = ({testFramework = defaultTestFramework()} = {}) => {
  const tests = testFrameworks[testFramework];

  if (!tests) {
    throw new TypeError(`Unknown testFramework "${testFramework}". Use "jest" or "vitest".`);
  }

  return defineConfig(
    frontendIgnores,
    eslint,
    typescript,
    youDontNeedLodash,
    imports,
    tests,
    react,
    testingLibrary,
    sonar,
    shelf
  );
};

export default defineFrontendConfig();
