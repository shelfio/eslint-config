import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import test from 'node:test';
import {mkdtempSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {ESLint} from 'eslint';
import frontend, {defaultTestFramework, defineFrontendConfig} from './frontend.js';
import compiler, {compilerRules} from './plugins/react-compiler.js';
import {infrastructureRules, typeServiceRules} from './plugins/sonar.js';

const createESLint = (config = frontend) =>
  new ESLint({
    overrideConfigFile: true,
    overrideConfig: [...config, {settings: {jest: {version: 29}, react: {version: '18.3'}}}],
  });

const severity = (config, rule) => config.rules[rule]?.[0] ?? 0;
const lint = async (source, filePath, config) => {
  const [result] = await createESLint(config).lintText(source, {filePath});
  assert.equal(result.fatalErrorCount, 0);

  return result.messages.map(message => message.ruleId);
};

test('frontend lints source extensions without a consumer files or parser override', async () => {
  const eslint = createESLint();
  for (const extension of ['js', 'jsx', 'mjs', 'cjs', 'ts', 'tsx', 'mts', 'cts']) {
    const config = await eslint.calculateConfigForFile(`src/example.${extension}`);
    assert.ok(config);
    assert.equal(config.languageOptions.parserOptions.project, undefined);
    assert.equal(config.languageOptions.parserOptions.projectService, undefined);
    const [result] = await eslint.lintText('const value = 1; void value;\n', {
      filePath: `src/example.${extension}`,
    });
    assert.equal(result.fatalErrorCount, 0);
  }
  assert.equal(await eslint.calculateConfigForFile('src/example.json'), undefined);
});

test('canonical frontend excludes compiler, infrastructure and inert typed rules', async () => {
  const config = await createESLint().calculateConfigForFile('src/View.tsx');
  for (const rule of [...Object.keys(compilerRules), ...infrastructureRules, ...typeServiceRules]) {
    assert.equal(severity(config, rule), 0, rule);
  }
  assert.equal(severity(config, 'react-hooks/rules-of-hooks'), 2);
  assert.equal(severity(config, 'react-hooks/exhaustive-deps'), 2);
  assert.equal(severity(config, 'sonarjs/no-collection-size-mischeck'), 2);
  assert.equal(severity(config, 'testing-library/consistent-data-testid'), 2);
});

test('test rules are scoped to tests, test directories and existing mock conventions', async () => {
  const eslint = createESLint();
  const source = await eslint.calculateConfigForFile('src/View.tsx');
  for (const rule of [
    'jest/no-focused-tests',
    'sonarjs/no-exclusive-tests',
    'sonarjs/no-code-after-done',
    'sonarjs/disabled-timeout',
    'sonarjs/no-forced-browser-interaction',
    'sonarjs/synchronous-suite-callback',
    'sonarjs/no-interpolation-in-inline-snapshots',
  ]) {
    assert.equal(severity(source, rule), 0);
    for (const file of ['src/useConnectionTest.tsx', 'src/DocumentSpec.ts']) {
      assert.equal(severity(await eslint.calculateConfigForFile(file), rule), 0, file);
    }
    for (const file of [
      'src/View.test.tsx',
      'src/View.spec.tsx',
      'src/__tests__/View.tsx',
      'src/View_test.ts',
      'src/mocks.ts',
      'src/View.test.mts',
      'src/View.test.cts',
      'src/View.test.mjs',
      'src/View.test.cjs',
      'src/__mocks__/helper.ts',
    ]) {
      assert.equal(severity(await eslint.calculateConfigForFile(file), rule), 2, file);
    }
  }
});

test('pages, config and test overrides remain effective', async () => {
  const eslint = createESLint();
  for (const [file, rule] of [
    ['pages/index.tsx', 'import/no-default-export'],
    ['app/(main)/page.tsx', 'import/no-default-export'],
    ['vite.config.ts', 'import/no-default-export'],
    ['eslint.config.mjs', 'barrel-files/avoid-barrel-files'],
    ['app/api/items/route.ts', 'barrel-files/avoid-barrel-files'],
    ['jest.globalSetup.ts', 'import/no-default-export'],
    ['src/Button.stories.tsx', 'import/no-default-export'],
    ['webpack.config.js', '@typescript-eslint/no-require-imports'],
    ['src/example.test.ts', '@typescript-eslint/no-explicit-any'],
    ['src/example.styled.tsx', 'sonarjs/no-nested-template-literals'],
  ]) {
    assert.equal(severity(await eslint.calculateConfigForFile(file), rule), 0, file);
  }
  assert.equal(
    severity(await eslint.calculateConfigForFile('src/View.tsx'), 'import/no-default-export'),
    2
  );
  assert.equal(
    severity(
      await eslint.calculateConfigForFile('src/index.ts'),
      'barrel-files/avoid-barrel-files'
    ),
    2
  );
});

test('frontend keeps one unused-import and var check without assignment data-flow checks', async () => {
  for (const file of ['src/View.tsx', 'src/types.ts', 'src/types/schema.ts', 'eslint.config.mjs']) {
    const rules = await lint(
      `import {unused} from './module.js';
       export function value() {
         var count = 1;
         count = 2;
         count = 2;
         return count;
       }`,
      file
    );
    assert.ok(rules.includes('@typescript-eslint/no-unused-vars'), file);
    assert.ok(rules.includes('no-var'), file);
    for (const rule of [
      'no-useless-assignment',
      'sonarjs/no-dead-store',
      'sonarjs/no-redundant-assignments',
      'sonarjs/unused-import',
      'sonarjs/block-scoped-var',
      'no-unused-vars',
    ]) {
      assert.ok(!rules.includes(rule), `${file}: ${rule}`);
    }
  }
});

test('core Hooks and Shelf checks still execute with syntax-only parsing', async () => {
  const source = `
    import {useState} from 'react';
    export function SaveButton({enabled}: {enabled: boolean}) {
      if (enabled) useState(false);
      const [isSaving, setIsSaving] = useState(false);
      const save = async () => {
        setIsSaving(true);
        await fetch('/save');
        setIsSaving(false);
      };
      return <button onClick={save}>{String(isSaving)}</button>;
    }
  `;
  const rules = await lint(source, 'src/SaveButton.tsx');
  assert.ok(rules.includes('react-hooks/rules-of-hooks'));
  assert.ok(rules.includes('shelf/prefer-swr-mutation'));
  const testRules = await lint(
    `it('renders', () => {expect(screen.getByTestId('widget')).toBeInTheDocument();});`,
    'src/View.test.tsx'
  );
  assert.ok(testRules.includes('shelf/no-testid-only-tests'));
});

test('compiler diagnostics are opt-in and execute when appended', async () => {
  const source = `
    import {useEffect, useState} from 'react';
    export function View() {
      const [value, setValue] = useState(0);
      useEffect(() => {setValue(1);}, []);
      return <div>{value}</div>;
    }
  `;
  assert.ok(!(await lint(source, 'src/View.tsx')).includes('react-hooks/set-state-in-effect'));
  assert.ok(
    (await lint(source, 'src/View.tsx', [...frontend, compiler])).includes(
      'react-hooks/set-state-in-effect'
    )
  );
});

test('React consumer rules using removed APIs remain compatible with ESLint 10', async () => {
  const rules = await lint('export const View = () => <div />;', 'src/View.jsx', [
    ...frontend,
    {rules: {'react/jsx-filename-extension': ['error', {extensions: ['.tsx']}]}},
  ]);
  assert.ok(rules.includes('react/jsx-filename-extension'));
});

test('every entrypoint lints independently without a formatter plugin', async () => {
  for (const preset of ['typescript', 'frontend']) {
    const config = (await import(`./${preset}.js`)).default;
    const rules = await lint('export const value=1;', 'src/example.js', config);
    assert.ok(!rules.includes('prettier/prettier'), preset);
  }
});

test('frontend does not load Prettier or the replaced Jest formatting plugin', () => {
  const result = spawnSync(
    process.execPath,
    [
      '--input-type=module',
      '-e',
      `import './frontend.js';
       import {createRequire} from 'node:module';
       const require = createRequire(import.meta.url);
       const redundant = ['eslint-plugin-prettier', 'eslint-plugin-jest-formatting'];
       process.exit(Object.keys(require.cache).some(path => redundant.some(name => path.includes(name))) ? 1 : 0);`,
    ],
    {cwd: import.meta.dirname, encoding: 'utf8'}
  );
  assert.equal(result.status, 0, result.stderr);
});

test('frontend policies execute and Lodash exceptions have one owner', async () => {
  const sourceRules = await lint(
    `import {uniq} from 'lodash';
     export function View(a: string, b: string, c: string, d: string, e: string) {
       return <div dangerouslySetInnerHTML={{__html: uniq([a, b, c, d, e]).join('')}} />;
     }`,
    'src/View.tsx'
  );
  assert.ok(sourceRules.includes('@typescript-eslint/max-params'));
  assert.ok(sourceRules.includes('react/no-danger'));
  assert.ok(!sourceRules.includes('max-params'));
  assert.ok(!sourceRules.some(rule => rule?.includes('lodash')));
  const testRules = await lint(
    `it('one', () => { expect(true).toBe(true); });
     it('two', () => { expect(true).toBe(true); });`,
    'src/View.test.tsx'
  );
  assert.ok(!testRules.includes('jest/padding-around-all'));
  const config = await createESLint().calculateConfigForFile('src/View.test.tsx');
  assert.equal(config.plugins['@stylistic'], undefined);
  assert.equal(severity(config, '@stylistic/padding-line-between-statements'), 0);
  assert.ok(!testRules.some(rule => rule?.startsWith('jest-formatting/')));
});

test('frontend ignores build and test output', async () => {
  const eslint = createESLint();
  for (const file of [
    '.next/server/page.js',
    'apps/web/out/index.js',
    'coverage/lcov.js',
    'dist/index.js',
    'next-env.d.ts',
  ]) {
    assert.ok(await eslint.isPathIgnored(file), file);
  }
});

test('frontend allows trusted HTML and Testing Library gaps where they do not apply', async () => {
  const eslint = new ESLint({overrideConfigFile: 'frontend.js'});
  const test = await eslint.calculateConfigForFile('src/a.test.tsx');
  const e2e = await eslint.calculateConfigForFile('playwright/tests/a.spec.ts');
  const jestConfig = await eslint.calculateConfigForFile('jest.config.js');
  assert.equal(test.rules['react/no-danger'][0], 0);
  assert.equal(test.rules['you-dont-need-lodash-underscore/throttle']?.[0] ?? 0, 0);
  assert.equal(e2e.rules['testing-library/prefer-screen-queries'], undefined);
  assert.equal(jestConfig.rules['@typescript-eslint/no-require-imports'][0], 0);
});

test('defaultTestFramework picks Vitest only when the project depends on it', () => {
  const cwd = mkdtempSync(join(tmpdir(), 'test-framework-'));
  try {
    assert.equal(defaultTestFramework(cwd), 'jest');
    writeFileSync(join(cwd, 'package.json'), JSON.stringify({devDependencies: {jest: '30'}}));
    assert.equal(defaultTestFramework(cwd), 'jest');
    writeFileSync(join(cwd, 'package.json'), JSON.stringify({devDependencies: {vitest: '5'}}));
    assert.equal(defaultTestFramework(cwd), 'vitest');
  } finally {
    rmSync(cwd, {recursive: true});
  }
});

test('defineFrontendConfig runs the rules of one test framework', async () => {
  const jestConfig = await createESLint(
    defineFrontendConfig({testFramework: 'jest'})
  ).calculateConfigForFile('src/View.test.tsx');
  const vitestConfig = await createESLint(
    defineFrontendConfig({testFramework: 'vitest'})
  ).calculateConfigForFile('src/View.test.tsx');

  assert.equal(severity(jestConfig, 'jest/no-focused-tests'), 2);
  assert.equal(severity(jestConfig, 'vitest/no-focused-tests'), 0);
  assert.equal(severity(vitestConfig, 'vitest/no-focused-tests'), 2);
  assert.equal(severity(vitestConfig, 'jest/no-focused-tests'), 0);
  assert.ok('vi' in vitestConfig.languageOptions.globals);
  assert.ok(!('jest' in vitestConfig.languageOptions.globals));
  assert.throws(() => defineFrontendConfig({testFramework: 'mocha'}), /Unknown testFramework/);
});

test('the Vitest rules check tests that import from vitest', async () => {
  const source = `import {describe, expect, test} from 'vitest';

describe('Suite', () => {
  test('Title', () => {
    expect(1).toEqual(1);
  });
});
`;
  const rules = await lint(
    source,
    'src/View.test.ts',
    defineFrontendConfig({testFramework: 'vitest'})
  );

  assert.ok(rules.includes('vitest/prefer-lowercase-title'));
  assert.ok(rules.includes('vitest/consistent-test-it'));
});
