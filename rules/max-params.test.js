import assert from 'node:assert/strict';
import test from 'node:test';
import tsParser from '@typescript-eslint/parser';
import {ESLint} from 'eslint';
import noPrettierConfig from '../typescript-no-prettier.js';
import frontendNoPrettierConfig from '../frontend-typescript-no-prettier.js';
import maxParams from './max-params.js';

const maxParamsMessages = async code => {
  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: {files: ['**/*.ts'], languageOptions: {parser: tsParser}, rules: maxParams},
  });
  const [result] = await eslint.lintText(code, {filePath: 'src/index.ts'});

  return result.messages.filter(message => message.ruleId === 'max-params');
};

test('the typescript configs allow at most three parameters', async () => {
  for (const config of [noPrettierConfig, frontendNoPrettierConfig]) {
    const eslint = new ESLint({overrideConfigFile: true, overrideConfig: config});

    for (const filePath of ['src/index.ts', 'src/index.test.ts', 'src/index.tsx']) {
      const resolved = await eslint.calculateConfigForFile(filePath);

      assert.deepEqual(resolved.rules['max-params'], [2, {max: 3}]);
    }
  }
});

test('the rule reports a function with four positional parameters', async () => {
  const messages = await maxParamsMessages(
    'export function request(identity, target, method, path) {\n  return {identity, target, method, path};\n}\n'
  );

  assert.deepEqual(
    messages.map(({message}) => message),
    ["Function 'request' has too many parameters (4). Maximum allowed is 3."]
  );
});

test('the rule accepts one params object and one options object', async () => {
  const messages = await maxParamsMessages(
    'export function request({identity, target, method, path}, options = {}) {\n  return {identity, target, method, path, options};\n}\n'
  );

  assert.deepEqual(messages, []);
});
