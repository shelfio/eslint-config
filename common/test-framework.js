import {readFileSync} from 'node:fs';
import {join} from 'node:path';

const readPackageJson = cwd => {
  try {
    return JSON.parse(readFileSync(join(cwd, 'package.json'), 'utf8'));
  } catch {
    return {};
  }
};

// Vitest when the project in `cwd` depends on it, else Jest.
export const defaultTestFramework = (cwd = process.cwd()) => {
  const {dependencies, devDependencies} = readPackageJson(cwd);

  return {...dependencies, ...devDependencies}.vitest ? 'vitest' : 'jest';
};
