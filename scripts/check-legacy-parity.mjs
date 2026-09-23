import assert from 'node:assert/strict';
import {resolve} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {ESLint} from 'eslint';
import {fixupPluginRules} from '@eslint/compat';
import importPlugin from 'eslint-plugin-import';
import sonarjs from 'eslint-plugin-sonarjs';

const baseline = process.argv[2];
assert.ok(baseline, 'Usage: node scripts/check-legacy-parity.mjs /path/to/baseline');
const cwd = fileURLToPath(new URL('../', import.meta.url));
const scopes = [
  'src/example.js',
  'src/example.ts',
  'src/example.tsx',
  'src/example.test.ts',
  'src/example.test.tsx',
  'src/__tests__/example.tsx',
  'src/types.ts',
  'src/types/example.ts',
  'pages/index.tsx',
  'webpack.config.js',
  'src/example.styled.tsx',
  'src/mocks.ts',
  'src/mock.js',
  'package.json',
];
const presets = [
  'base',
  'base-no-prettier',
  'typescript',
  'typescript-no-prettier',
  'frontend-typescript',
  'frontend-typescript-no-prettier',
];
const patches = [
  {files: ['**/*.{js,jsx,ts,tsx,json}']},
  {settings: {jest: {version: 29}, react: {version: '18.3'}}},
];
const cases = [];

for (const preset of presets) {
  const original = (await import(pathToFileURL(resolve(baseline, `${preset}.js`)))).default;
  const current = (await import(pathToFileURL(resolve(cwd, `${preset}.js`)))).default;
  // The old base configs enable import/Sonar rules without registering the
  // plugins. Supply only those missing registrations to inspect their rules.
  const baselinePlugins = preset.startsWith('base')
    ? [{plugins: {import: fixupPluginRules(importPlugin), ...sonarjs.configs.recommended.plugins}}]
    : [];
  const before = new ESLint({
    cwd,
    overrideConfigFile: true,
    overrideConfig: [...original, ...baselinePlugins, ...patches],
  });
  const after = new ESLint({
    cwd,
    overrideConfigFile: true,
    overrideConfig: [...current, ...patches],
  });

  for (const scope of scopes) {
    const oldConfig = await before.calculateConfigForFile(scope);
    const newConfig = await after.calculateConfigForFile(scope);
    const rules = new Set([...Object.keys(oldConfig.rules), ...Object.keys(newConfig.rules)]);
    const changes = [...rules]
      .filter(
        rule => JSON.stringify(oldConfig.rules[rule]) !== JSON.stringify(newConfig.rules[rule])
      )
      .map(rule => {
        return {rule, before: oldConfig.rules[rule], after: newConfig.rules[rule]};
      });
    cases.push({preset, scope, changes});
  }
}

const differences = cases.filter(result => result.changes.length);
console.log(
  JSON.stringify(
    {
      checked: cases.length,
      assumptions: {
        comparison: 'Effective rule severity and options; not parser or settings identity',
        sourceFiles: patches[0].files,
        settings: patches[1].settings,
        baselineBasePluginsAdded: ['import', 'sonarjs'],
      },
      differences,
    },
    null,
    2
  )
);
process.exitCode = differences.length ? 1 : 0;
