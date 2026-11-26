# @shelf/eslint-config

## Style Guide

Read our [style guide](./docs/style-guide.md)

## Install

```bash
$ pnpm add --save-dev --save-exact @shelf/eslint-config
```

## Usage

The ESLint configs leave formatting to Oxfmt. Use them together with the Oxfmt config below.

### Backend

```js
import tsConfig from '@shelf/eslint-config/typescript.js';

export default [...tsConfig];
```

### Frontend

```js
import frontend from '@shelf/eslint-config/frontend.js';

export default frontend;
```

The preset is composed from named modules in `plugins/`: ESLint, TypeScript,
Lodash, imports, Jest or Vitest, React, Testing Library, Sonar, and Shelf rules. Each module owns its rules and file overrides. `frontend.js` is
the entrypoint for frontend projects using JavaScript or TypeScript.

This ESLint 10 preset matches JavaScript and TypeScript source files, detects React,
and keeps formatting separate. Run Oxfmt and the TypeScript checker as separate checks.
It uses the TypeScript syntax parser without building a TypeScript type graph.

typescript-eslint does not support TypeScript 7. This package installs TypeScript 6
as `@typescript/typescript6` for typescript-eslint, so your project can use TypeScript 7
for its own checker. With pnpm, typescript-eslint resolves its `typescript` peer from
this package. Plugins that your project installs itself still resolve TypeScript from
your project.

The default keeps Rules of Hooks and exhaustive dependency checks. React Compiler
diagnostics perform another parse and compiler analysis; enable them explicitly when needed:

```js
import frontend, {reactCompiler} from '@shelf/eslint-config/frontend.js';

export default [...frontend, reactCompiler];
```

#### Jest or Vitest

`frontend.js` runs the Vitest rules (`@vitest/eslint-plugin`) when the
`package.json` in the current directory has `vitest` in `dependencies` or
`devDependencies`. Otherwise, it runs the Jest rules. `typescript.js` always runs
the Jest rules.

When ESLint runs from another directory, such as the root of a monorepo, set the
test framework explicitly:

```js
import {defineFrontendConfig} from '@shelf/eslint-config/frontend.js';

export default defineFrontendConfig({testFramework: 'vitest'});
```

Add app-specific ignores and genuine policy exceptions after the preset. Consumer
overrides win, so remove obsolete compiler-rule `off` overrides when enabling the compiler.
Test-specific analysis runs in test/mock files. Test filename suffixes are
`.test`, `.spec`, `_test`, and `_spec`; names such as `useConnectionTest.tsx` stay
in production scope. Production JSX retains the `consistent-data-testid` naming
check. Custom test directory conventions can opt rules back in through a file-scoped
override.

The preset excludes AWS/CDK infrastructure checks and 28 Sonar rules that do nothing
without a TypeScript program. Use a separate appropriate configuration for infrastructure
code. Adding type-aware linting later requires an explicit rule review; do not assume
these disabled rules reactivate when setting `projectService`.

The frontend preset omits Sonar's `no-dead-store` and `no-redundant-assignments`
data-flow checks, plus the core `no-useless-assignment` check that ESLint 10
recommends. `@typescript-eslint/no-unused-vars` owns unused variables and
imports; `no-var` owns variable declaration policy. Their Sonar counterparts are
disabled. These checks cover type files and JavaScript configs too; the old blanket
unused-variable exemption for `types.ts` and `types/**` does not apply to this preset.
Consumer overrides can still add deliberate exceptions.

### Migrate from 9.x

- `typescript-no-prettier.js` is now `typescript.js`. The rules do not change.
- `frontend-typescript-no-prettier.js` and `base-no-prettier.js` are removed. Use
  `frontend.js`. To keep the React Compiler diagnostics, add `reactCompiler`.

## Oxfmt

Install `oxfmt`, and add an `oxfmt.config.ts` that extends the shared config:

```ts
import baseConfig, {recommendedIgnorePatterns} from '@shelf/eslint-config/oxfmt.js';

export default {
  ...baseConfig,
  ignorePatterns: [...recommendedIgnorePatterns],
};
```

`oxfmt.d.ts` types the import, so `oxfmt.config.ts` can stay in the TypeScript project.

## Remote Mutations

Frontend configs enforce `shelf/prefer-swr-mutation`. The rule reports React loading state that is manually toggled around an awaited `fetch`, Axios call, or Shelf API/client call:

```tsx
// Incorrect
const [isSaving, setIsSaving] = useState(false);

const save = async () => {
  setIsSaving(true);
  try {
    await ContentApi.save();
  } finally {
    setIsSaving(false);
  }
};
```

Use the mutation lifecycle as the source of truth instead:

```tsx
const {trigger: save, isMutating: isSaving} = useSWRMutation('save-content', () =>
  ContentApi.save()
);
```

Local UI state and asynchronous work that does not call a remote API remain valid.

## Rule audit and profiling

```sh
pnpm inspect-config
pnpm inspect-config:build
pnpm audit:rules --json /tmp/frontend-rule-audit.json
```

The pinned ESLint inspector shows which named module enables or overrides each
rule. The audit checks representative source, test, type, page and config paths
for enabled/deprecated rules, core/TypeScript extension duplicates, and accidental
type-aware TypeScript rules. It fails on those problems.
Repeated declarations of the same ID merge into one rule; similar rules from
different plugins need source/fixture review before removing either.
The frontend preset does not load `@stylistic` or enforce Jest
blank-line padding. Oxfmt owns whitespace formatting; the former custom blank-line
grouping requirements are intentionally removed. Import ordering remains an ESLint
policy until consumers configure equivalent Oxfmt sorting.

From this repository checkout:

```sh
pnpm lint:profile --cwd /path/to/app --output /tmp/frontend-profile.json
pnpm lint:profile --cwd /path/to/app --no-stats --output /tmp/frontend-wall-time.json
```

Use `--config /path/to/preset.js` to compare another preset. Use
`--consumer /path/to/app/eslint.config.mjs` to retain app overrides while replacing
its leading Shelf preset import in memory. This option supports a self-contained
flat config with one Shelf preset spread first; it does not modify the app.

Profiles never fix files or use an ESLint result cache. They record existing lint
failures instead of stopping at them. Default profiles include per-file parse time
and per-rule time; `--no-stats` removes instrumentation overhead for wall-time
comparisons. Use repeated fresh processes over identical input files and compare
medians. React Compiler work is shared, so its first enabled rule absorbs most of
the group's timing. Disabling only that rule moves the cost to another rule.

The developer-only profiler and audit documents are not part of the published package.

## Publish

Set the new version in `package.json` and add it to `CHANGELOG.md`. When the change merges to `master`, CI publishes the version to npm.

## License

MIT © [Shelf](https://shelf.io)
