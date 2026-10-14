import assert from 'node:assert/strict';
import test from 'node:test';
import {ESLint} from 'eslint';
import typescriptConfig from './typescript.js';
import noPrettierConfig from './typescript-no-prettier.js';

const resolvedRule = async (config, rule) => {
  const eslint = new ESLint({overrideConfigFile: true, overrideConfig: config});
  const resolved = await eslint.calculateConfigForFile('src/index.ts');

  return resolved.rules[rule];
};

test('typescript configs require braces around every block', async () => {
  assert.deepEqual(await resolvedRule(typescriptConfig, 'curly'), [2, 'all']);
  assert.deepEqual(await resolvedRule(noPrettierConfig, 'curly'), [2, 'all']);
});
