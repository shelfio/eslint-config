import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {performance} from 'node:perf_hooks';
import {parseArgs} from 'node:util';

const {values} = parseArgs({
  options: {
    cwd: {type: 'string'},
    config: {type: 'string'},
    consumer: {type: 'string'},
    output: {type: 'string'},
    label: {type: 'string'},
    pattern: {type: 'string'},
    disable: {type: 'string'},
    'no-compiler': {type: 'boolean'},
    'no-aws': {type: 'boolean'},
    'no-stats': {type: 'boolean'},
    'jest-version': {type: 'string'},
    help: {type: 'boolean'},
  },
});

if (values.help) {
  console.log(`Profile a Shelf ESLint preset on real source without fixing files or caching results.

node scripts/profile-eslint.mjs --cwd /path/to/app --output /tmp/profile.json

--config PATH     Preset to measure (default: this checkout's frontend.js)
--consumer PATH   App flat config with one leading Shelf preset import/spread;
                  replaces that preset in memory and preserves local overrides.
--pattern GLOB    Files under --cwd (default: src/**/*.{js,jsx,ts,tsx})
--no-stats        Measure wall time/RSS without per-rule instrumentation overhead
--no-compiler     Disable the entire React Compiler diagnostic group
--no-aws          Disable Sonar AWS/CDK rules
--disable IDS     Comma-separated rule IDs for isolated experiments
--label TEXT      Label saved in the report
--jest-version N  Explicit Jest version (default: installed version under --cwd)

Default output: profile.json in the command's working directory.
Existing lint findings are recorded; they do not fail the profiling command.
TIMING/--stats includes shared compiler cost under its first enabled rule.
Compare fresh processes, identical files/config/dependencies, repeated medians.
`);
  process.exit(0);
}

const option = (name, fallback) => values[name] ?? fallback;
const started = performance.now();
const cwd = path.resolve(option('cwd', process.cwd()));
const configPath = path.resolve(
  option('config', fileURLToPath(new URL('../frontend.js', import.meta.url)))
);
const output = path.resolve(option('output', 'profile.json'));
const require = createRequire(configPath);
const {ESLint} = require('eslint');
const config = (await import(pathToFileURL(configPath))).default;
let tail = [];

if (option('consumer')) {
  const consumerPath = path.resolve(option('consumer'));
  const source = await fs.readFile(consumerPath, 'utf8');
  const specifier = source.match(/from ['"](@shelf\/eslint-config\/[^'"]+)['"]/)?.[1];

  if (!specifier) throw new Error('Consumer must import one Shelf preset directly.');

  // Repoint the single preset import in memory: do not load a second installed
  // version of every plugin, or write to the app being measured.
  const rewritten = source.replace(specifier, pathToFileURL(configPath).href);
  const consumer = (
    await import(`data:text/javascript;base64,${Buffer.from(rewritten).toString('base64')}`)
  ).default;

  if (!config.every((entry, i) => consumer[i] === entry)) {
    throw new Error('Consumer must spread its Shelf preset first; cannot safely substitute it.');
  }
  tail = consumer.slice(config.length);
}

const defaults = {react: {version: 'detect'}};
let jestVersion = values['jest-version'];

if (!jestVersion) {
  try {
    jestVersion = createRequire(path.join(cwd, 'package.json'))('jest/package.json').version;
  } catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') throw error;
  }
}

if (jestVersion) defaults.jest = {version: jestVersion};

// Defaults precede the preset and consumer so explicit settings keep winning.
const override = {files: ['**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}']};
let configuration = [{settings: defaults}, ...config, override, ...tail];
const probe = new ESLint({cwd, overrideConfigFile: true, overrideConfig: configuration});
const representative = await probe.calculateConfigForFile(path.join(cwd, 'src/__profile__.tsx'));
const disabled = option('disable', '').split(',').filter(Boolean);

if (values['no-compiler']) {
  disabled.push(
    ...Object.keys(representative.plugins['react-hooks']?.rules ?? {})
      .filter(id => !['rules-of-hooks', 'exhaustive-deps'].includes(id))
      .map(id => `react-hooks/${id}`)
  );
}

if (values['no-aws']) {
  disabled.push(...Object.keys(representative.rules).filter(id => id.startsWith('sonarjs/aws-')));
}

if (disabled.length)
  configuration = [...configuration, {rules: Object.fromEntries(disabled.map(id => [id, 'off']))}];

const instrumented = !values['no-stats'];
const eslint = new ESLint({
  cwd,
  overrideConfigFile: true,
  overrideConfig: configuration,
  stats: instrumented,
  cache: false,
  fix: false,
});
const setupMs = performance.now() - started;
const lintStarted = performance.now();
const results = await eslint.lintFiles([option('pattern', 'src/**/*.{js,jsx,ts,tsx}')]);
const lintMs = performance.now() - lintStarted;
const rules = {};
const files = [];
let parseMs = 0;
let lintTotalMs = 0;
for (const result of results) {
  let fileParse = 0;
  let fileRules = 0;
  for (const pass of result.stats?.times?.passes ?? []) {
    fileParse += pass.parse?.total ?? 0;
    lintTotalMs += pass.total ?? 0;
    for (const [id, timing] of Object.entries(pass.rules ?? {})) {
      rules[id] ??= {ms: 0, files: 0, findings: 0};
      rules[id].ms += timing.total;
      rules[id].files += 1;
      fileRules += timing.total;
    }
  }
  for (const message of result.messages) {
    if (message.ruleId) {
      rules[message.ruleId] ??= {ms: 0, files: 0, findings: 0};
      rules[message.ruleId].findings++;
    }
  }
  parseMs += fileParse;
  files.push({
    path: path.relative(cwd, result.filePath),
    parseMs: fileParse,
    rulesMs: fileRules,
    errors: result.errorCount,
    warnings: result.warningCount,
    fatal: result.fatalErrorCount,
    ...(result.fatalErrorCount ? {fatalMessages: result.messages.filter(m => m.fatal)} : {}),
  });
}
const inventory = {};
for (const file of [
  'src/__profile__.ts',
  'src/__profile__.tsx',
  'src/__profile__.test.tsx',
  'src/__profile__.spec.ts',
  'pages/__profile__.tsx',
  'eslint.config.mjs',
]) {
  const effective = await eslint.calculateConfigForFile(path.join(cwd, file));

  if (!effective) continue;
  for (const [id, setting] of Object.entries(effective.rules)) {
    if (setting[0] === 0) continue;

    let rule;
    const slash = id.lastIndexOf('/');

    if (slash > 0) rule = effective.plugins[id.slice(0, slash)]?.rules[id.slice(slash + 1)];
    else rule = require('eslint/use-at-your-own-risk').builtinRules.get(id);
    inventory[id] ??= {
      description: rule?.meta?.docs?.description,
      url: rule?.meta?.docs?.url,
      type: rule?.meta?.type,
      requiresTypeChecking: rule?.meta?.docs?.requiresTypeChecking ?? false,
      deprecated: Boolean(rule?.meta?.deprecated),
      scopes: {},
    };
    inventory[id].scopes[file] = setting;
  }
}
const report = {
  label: option('label', 'profile'),
  cwd,
  config: configPath,
  consumer: option('consumer', null),
  pattern: option('pattern', 'src/**/*.{js,jsx,ts,tsx}'),
  node: process.version,
  eslint: ESLint.version,
  date: new Date().toISOString(),
  disabled,
  instrumented,
  parserOptions: representative.languageOptions.parserOptions,
  summary: {
    files: results.length,
    setupMs,
    lintMs,
    wallMs: performance.now() - started,
    parseMs: instrumented ? parseMs : null,
    ruleMs: instrumented ? Object.values(rules).reduce((sum, r) => sum + r.ms, 0) : null,
    lintTotalMs: instrumented ? lintTotalMs : null,
    errors: results.reduce((sum, r) => sum + r.errorCount, 0),
    warnings: results.reduce((sum, r) => sum + r.warningCount, 0),
    fatal: results.reduce((sum, r) => sum + r.fatalErrorCount, 0),
    maxRssKiB: process.resourceUsage().maxRSS,
  },
  inventory,
  rules,
  files,
};
await fs.mkdir(path.dirname(output), {recursive: true});
await fs.writeFile(output, `${JSON.stringify(report, null, 2)}\n`);
console.log(
  JSON.stringify(
    {
      label: report.label,
      ...report.summary,
      ...(instrumented
        ? {
            top: Object.entries(rules)
              .sort((a, b) => b[1].ms - a[1].ms)
              .slice(0, 12),
          }
        : {}),
    },
    null,
    2
  )
);
