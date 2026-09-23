import fs from 'node:fs/promises';
import path from 'node:path';
import {parseArgs} from 'node:util';
import {createRequire} from 'node:module';
import {ESLint} from 'eslint';
import {builtinRules} from 'eslint/use-at-your-own-risk';
import frontend from '../frontend.js';

const require = createRequire(import.meta.url);
const {processRules} = require(
  path.join(path.dirname(require.resolve('eslint-config-prettier/package.json')), 'bin/cli.js')
);

const {values} = parseArgs({options: {json: {type: 'string'}}});
const eslint = new ESLint({
  cwd: path.resolve(import.meta.dirname, '..'),
  overrideConfigFile: true,
  overrideConfig: frontend,
});
const scopes = [
  'src/example.js',
  'src/example.tsx',
  'src/example.test.tsx',
  'src/example.spec.ts',
  'src/__tests__/example.tsx',
  'src/mocks.ts',
  'src/types.ts',
  'src/types/example.ts',
  'pages/index.tsx',
  'eslint.config.mjs',
  'webpack.config.js',
  'scripts/example.cts',
];
const report = {
  eslint: ESLint.version,
  // Declarations show provenance; repeated IDs merge into one effective rule.
  declarations: frontend.map(({name, files, rules = {}}) => {
    return {name, files, rules};
  }),
  files: {},
};
const formatterInput = [];
let problems = 0;

for (const file of scopes) {
  const config = await eslint.calculateConfigForFile(file);
  const enabled = {};
  const disabled = [];
  const deprecated = [];
  const tsDuplicates = [];
  const typedRules = [];
  for (const [id, setting] of Object.entries(config.rules)) {
    formatterInput.push([id, setting, file]);
    if (setting[0] === 0) {
      disabled.push(id);
      continue;
    }

    const separator = id.lastIndexOf('/');
    const namespace = id.slice(0, separator);
    const name = id.slice(separator + 1);
    const rule = separator < 0 ? builtinRules.get(id) : config.plugins[namespace]?.rules[name];
    const meta = rule?.meta;
    enabled[id] = {
      setting,
      description: meta?.docs?.description,
      url: meta?.docs?.url,
      requiresTypeChecking: meta?.docs?.requiresTypeChecking ?? false,
    };
    if (meta?.deprecated) deprecated.push(id);

    if (namespace === '@typescript-eslint') {
      const extension = meta?.docs?.extendsBaseRule;
      const base = typeof extension === 'string' ? extension : name;

      if (extension && config.rules[base]?.[0] > 0) tsDuplicates.push([base, id]);

      if (meta?.docs?.requiresTypeChecking) typedRules.push(id);
    }
  }
  const {parserOptions} = config.languageOptions;
  const buildsTypeProgram = Boolean(parserOptions.project || parserOptions.projectService);
  report.files[file] = {
    enabled,
    disabled,
    deprecated,
    tsDuplicates,
    typedRules,
    buildsTypeProgram,
  };
  problems += deprecated.length + tsDuplicates.length + typedRules.length;
  if (buildsTypeProgram) problems++;
  console.log(
    `${file}: ${Object.keys(enabled).length} enabled, ${disabled.length} disabled, ` +
      `${deprecated.length} deprecated, ${tsDuplicates.length} core/TS duplicates`
  );
}

// Use the pinned helper against this preset, rather than silently auditing the
// repository's different eslint.config.js. The CLI accepts file paths, not --config.
report.formatting = processRules(formatterInput);
if (report.formatting.code !== 0) problems++;
console.log(report.formatting.stdout ?? report.formatting.stderr);
report.problems = problems;
if (values.json) {
  await fs.mkdir(path.dirname(path.resolve(values.json)), {recursive: true});
  await fs.writeFile(values.json, `${JSON.stringify(report, null, 2)}\n`);
}
console.log('Repeated flat-config declarations are overrides, not repeated execution.');
console.log('Semantic overlaps between different plugins still require source/fixture review.');
process.exitCode = problems ? 1 : 0;
