## 10.0.0

- **Breaking:** remove `frontend-typescript-no-prettier.js` and `base-no-prettier.js`. Use `frontend.js`. To keep the React Compiler diagnostics, add `reactCompiler`.
- **Breaking:** rename `typescript-no-prettier.js` to `typescript.js`. The package `main` is now `typescript.js`. The rules do not change.
- **Breaking:** remove the `eslint-config-prettier` dependency. Oxfmt owns formatting, and the configs do not enable rules that conflict with it.

- Add the `frontend.js` preset for ESLint 10. One module in `plugins/` owns the rules and file overrides of each plugin. The preset uses the TypeScript syntax parser without a type graph; run Oxfmt and the TypeScript checker as separate checks.
- Add the opt-in `reactCompiler` config for the React Compiler diagnostics. Import it from `frontend.js`.
- `frontend.js` makes `import/no-default-export` and `barrel-files/avoid-barrel-files` errors. Framework entry points, Storybook files, and tool configs can keep their default exports.
- typescript-eslint now runs on TypeScript 6 that this package installs (`@typescript/typescript6`). A project can use TypeScript 7 for its own checker. This works with pnpm, which resolves the `typescript` peer of the typescript-eslint packages from this package.
- Update the dependencies. `eslint-plugin-sonarjs` 4.2.2 adds `sonarjs/no-debounce-throttle-in-render` to its recommended rules: it reports a debounced or throttled function that a component creates again on each render. The preset no longer enables `sonarjs/no-mixed-completion-style`, because Sonar removed it from its recommended rules.

## 9.1.0

- `no-restricted-imports` no longer blocks `natural-orderby`. `@shelf/fast-natural-order-by` 2.0.0 only re-exports it, so import `natural-orderby` directly. The `javascript-natural-sort` message now recommends `natural-orderby`.

## 9.0.0

- Add the shared Oxfmt config as `@shelf/eslint-config/oxfmt.js`, with types in `oxfmt.d.ts`. It replaces `@shelf/prettier-config/oxfmt`: change the import in `oxfmt.config.ts` and remove `@shelf/prettier-config`.
- **Breaking:** remove the Prettier entrypoints `base.js`, `typescript.js`, and `frontend-typescript.js`, and the `eslint-plugin-prettier` dependency. `prettier` is no longer a peer dependency. Use `typescript-no-prettier.js` or `frontend-typescript-no-prettier.js` with Oxfmt.
- **Breaking:** the package `main` is now `typescript-no-prettier.js` instead of `base.js`.

## 8.0.0

- `common/overrides.js` no longer lists `*wallaby.config.js` in `allowRequireInConfigs`. Shelf repositories do not use Wallaby anymore.
- **Breaking:** `typescript-no-prettier.js` now enforces `curly` (`all`) again. `eslint-config-prettier` turned it off, so repos on Oxfmt accepted `if` statements without braces. Run `eslint --fix`, then Oxfmt, to add the braces.

## 7.0.0

- **Breaking:** Frontend configs now enforce `shelf/prefer-swr-mutation` for manually managed remote loading state.

## 3.0.0

Override recommended no explicit type any in tests

## 2.0.0

Removed separate file for testing-library, added testing-library rules to `frontend-typescript.js`.
Extended `frontend.js` in `frontend-typescript.js` and `frontend-typescript-vue.js`.

## 1.0.0

Breaking changes of the eslint-config-prettier 8.0.0
